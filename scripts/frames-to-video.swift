#!/usr/bin/env swift

// Encode a directory of equally-sized PNG/JPEG frames into a browser-ready
// H.264 MP4 using only macOS system frameworks.
//
// Usage:
//   /usr/bin/swift scripts/frames-to-video.swift \
//     --input artifacts/project-capture/fuzzy/<run>/frames \
//     --output public/media/projects/fuzzy/demo.mp4 \
//     --fps 8

import AVFoundation
import CoreGraphics
import Foundation
import ImageIO

struct Options {
  let input: URL
  let output: URL
  let fps: Int32
}

func fail(_ message: String) -> Never {
  FileHandle.standardError.write(Data("error: \(message)\n".utf8))
  exit(1)
}

func parseOptions() -> Options {
  let arguments = Array(CommandLine.arguments.dropFirst())
  var input: String?
  var output: String?
  var fps: Int32 = 8
  var index = 0

  while index < arguments.count {
    guard index + 1 < arguments.count else {
      fail("Missing value for \(arguments[index]).")
    }
    switch arguments[index] {
    case "--input":
      input = arguments[index + 1]
    case "--output":
      output = arguments[index + 1]
    case "--fps":
      guard let parsed = Int32(arguments[index + 1]), parsed > 0, parsed <= 60 else {
        fail("--fps must be an integer between 1 and 60.")
      }
      fps = parsed
    default:
      fail("Unknown argument: \(arguments[index])")
    }
    index += 2
  }

  guard let input, let output else {
    fail("Usage: frames-to-video.swift --input <frames-dir> --output <video.mp4> [--fps 8]")
  }

  return Options(
    input: URL(fileURLWithPath: input).standardizedFileURL,
    output: URL(fileURLWithPath: output).standardizedFileURL,
    fps: fps
  )
}

func loadImage(_ url: URL) -> CGImage {
  guard
    let source = CGImageSourceCreateWithURL(url as CFURL, nil),
    let image = CGImageSourceCreateImageAtIndex(source, 0, nil)
  else {
    fail("Could not decode frame \(url.path).")
  }
  return image
}

func makePixelBuffer(
  from image: CGImage,
  width: Int,
  height: Int,
  pool: CVPixelBufferPool
) -> CVPixelBuffer {
  var optionalBuffer: CVPixelBuffer?
  let status = CVPixelBufferPoolCreatePixelBuffer(nil, pool, &optionalBuffer)
  guard status == kCVReturnSuccess, let buffer = optionalBuffer else {
    fail("Could not allocate a video pixel buffer (CoreVideo status \(status)).")
  }

  CVPixelBufferLockBaseAddress(buffer, [])
  defer { CVPixelBufferUnlockBaseAddress(buffer, []) }

  guard
    let baseAddress = CVPixelBufferGetBaseAddress(buffer),
    let context = CGContext(
      data: baseAddress,
      width: width,
      height: height,
      bitsPerComponent: 8,
      bytesPerRow: CVPixelBufferGetBytesPerRow(buffer),
      space: CGColorSpaceCreateDeviceRGB(),
      bitmapInfo: CGBitmapInfo.byteOrder32Little.rawValue |
        CGImageAlphaInfo.premultipliedFirst.rawValue
    )
  else {
    fail("Could not create the frame drawing context.")
  }

  context.setFillColor(CGColor(gray: 0.0, alpha: 1.0))
  context.fill(CGRect(x: 0, y: 0, width: width, height: height))
  context.draw(image, in: CGRect(x: 0, y: 0, width: width, height: height))
  return buffer
}

let options = parseOptions()
let fileManager = FileManager.default
var isDirectory: ObjCBool = false
guard fileManager.fileExists(atPath: options.input.path, isDirectory: &isDirectory), isDirectory.boolValue else {
  fail("Input directory does not exist: \(options.input.path)")
}

let allowedExtensions = Set(["png", "jpg", "jpeg"])
let frames = (try? fileManager.contentsOfDirectory(
  at: options.input,
  includingPropertiesForKeys: nil,
  options: [.skipsHiddenFiles]
))?.filter { allowedExtensions.contains($0.pathExtension.lowercased()) }.sorted {
  $0.lastPathComponent.localizedStandardCompare($1.lastPathComponent) == .orderedAscending
} ?? []

guard !frames.isEmpty else {
  fail("No PNG/JPEG frames found in \(options.input.path).")
}

let firstImage = loadImage(frames[0])
let width = firstImage.width
let height = firstImage.height
guard width > 0, height > 0, width % 2 == 0, height % 2 == 0 else {
  fail("H.264 requires positive even dimensions; first frame is \(width)×\(height).")
}

try? fileManager.createDirectory(
  at: options.output.deletingLastPathComponent(),
  withIntermediateDirectories: true
)
if fileManager.fileExists(atPath: options.output.path) {
  do {
    try fileManager.removeItem(at: options.output)
  } catch {
    fail("Could not replace existing output: \(error.localizedDescription)")
  }
}

let writer: AVAssetWriter
do {
  writer = try AVAssetWriter(outputURL: options.output, fileType: .mp4)
} catch {
  fail("Could not create AVAssetWriter: \(error.localizedDescription)")
}
writer.shouldOptimizeForNetworkUse = true

let compression: [String: Any] = [
  AVVideoAverageBitRateKey: 5_500_000,
  AVVideoMaxKeyFrameIntervalKey: Int(options.fps) * 2,
  AVVideoExpectedSourceFrameRateKey: Int(options.fps)
]
let settings: [String: Any] = [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: width,
  AVVideoHeightKey: height,
  AVVideoCompressionPropertiesKey: compression
]

let input = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(
  assetWriterInput: input,
  sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: Int(kCVPixelFormatType_32BGRA),
    kCVPixelBufferWidthKey as String: width,
    kCVPixelBufferHeightKey as String: height,
    kCVPixelBufferIOSurfacePropertiesKey as String: [:]
  ]
)

guard writer.canAdd(input) else {
  fail("AVAssetWriter cannot add the H.264 video input.")
}
writer.add(input)
guard writer.startWriting() else {
  fail("AVAssetWriter could not start: \(writer.error?.localizedDescription ?? "unknown error")")
}
writer.startSession(atSourceTime: .zero)
guard let pool = adaptor.pixelBufferPool else {
  fail("AVAssetWriter did not create a pixel-buffer pool.")
}

for (index, frameURL) in frames.enumerated() {
  let image = loadImage(frameURL)
  guard image.width == width, image.height == height else {
    fail(
      "Frame dimensions differ: \(frameURL.lastPathComponent) is \(image.width)×\(image.height); expected \(width)×\(height)."
    )
  }

  while !input.isReadyForMoreMediaData {
    if writer.status == .failed {
      fail("Encoding failed: \(writer.error?.localizedDescription ?? "unknown error")")
    }
    Thread.sleep(forTimeInterval: 0.002)
  }

  let buffer = makePixelBuffer(from: image, width: width, height: height, pool: pool)
  let presentationTime = CMTime(value: CMTimeValue(index), timescale: options.fps)
  guard adaptor.append(buffer, withPresentationTime: presentationTime) else {
    fail("Could not append \(frameURL.lastPathComponent): \(writer.error?.localizedDescription ?? "unknown error")")
  }
}

input.markAsFinished()
let completion = DispatchSemaphore(value: 0)
writer.finishWriting { completion.signal() }
completion.wait()

guard writer.status == .completed else {
  fail("Encoding did not complete: \(writer.error?.localizedDescription ?? "unknown error")")
}

// AVAssetWriter can leave a full-size `.sb-*` sibling beside a completed MP4.
// It is an implementation sidecar, not a second deliverable.
let sidecarPrefix = options.output.lastPathComponent + ".sb-"
if let siblings = try? fileManager.contentsOfDirectory(
  at: options.output.deletingLastPathComponent(),
  includingPropertiesForKeys: nil,
  options: [.skipsHiddenFiles]
) {
  for sibling in siblings where sibling.lastPathComponent.hasPrefix(sidecarPrefix) {
    try? fileManager.removeItem(at: sibling)
  }
}

let duration = Double(frames.count) / Double(options.fps)
print("Encoded \(frames.count) frames at \(options.fps) fps (\(String(format: "%.2f", duration))s), \(width)×\(height): \(options.output.path)")
