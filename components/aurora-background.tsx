'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

// Aurora borealis — smooth flowing color bands, not noise
const FRAGMENT_SHADER = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  // Smooth flowing wave function
  float wave(vec2 uv, float freq, float speed, float phase) {
    return sin(uv.x * freq + u_time * speed + phase)
         * cos(uv.x * freq * 0.7 + u_time * speed * 0.8 + phase * 1.3)
         * 0.5 + 0.5;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float t = u_time;

    // Mouse influence — gently warp UV space near cursor
    vec2 mouse = u_mouse;
    float mouseDist = length(uv - mouse);
    float mouseWarp = smoothstep(0.5, 0.0, mouseDist) * 0.08;
    vec2 warped = uv + (uv - mouse) * mouseWarp;

    // 4 aurora bands — each is a horizontal flowing ribbon
    // Band shape: gaussian-ish vertical profile × horizontal wave
    float band1 = exp(-pow((warped.y - 0.7 - sin(warped.x * 2.0 + t * 0.3) * 0.08) * 6.0, 2.0));
    float band2 = exp(-pow((warped.y - 0.5 - sin(warped.x * 1.5 + t * 0.25 + 1.0) * 0.1) * 5.0, 2.0));
    float band3 = exp(-pow((warped.y - 0.35 - sin(warped.x * 2.5 + t * 0.35 + 2.0) * 0.06) * 7.0, 2.0));
    float band4 = exp(-pow((warped.y - 0.6 - cos(warped.x * 1.8 + t * 0.2 + 3.0) * 0.09) * 5.5, 2.0));

    // Internal shimmer — finer wave detail within each band
    float shimmer1 = wave(warped, 4.0, 0.5, 0.0) * band1;
    float shimmer2 = wave(warped, 3.0, 0.4, 2.0) * band2;
    float shimmer3 = wave(warped, 5.0, 0.6, 4.0) * band3;
    float shimmer4 = wave(warped, 3.5, 0.35, 6.0) * band4;

    // Colors — vibrant aurora palette
    vec3 cyan   = vec3(0.2, 0.85, 1.0);
    vec3 purple = vec3(0.55, 0.35, 1.0);
    vec3 pink   = vec3(1.0, 0.3, 0.6);
    vec3 green  = vec3(0.2, 1.0, 0.65);

    // Slowly cycle which color each band uses
    float colorShift = t * 0.1;
    vec3 col1 = mix(cyan, green, sin(colorShift) * 0.5 + 0.5);
    vec3 col2 = mix(purple, pink, sin(colorShift + 1.5) * 0.5 + 0.5);
    vec3 col3 = mix(green, cyan, sin(colorShift + 3.0) * 0.5 + 0.5);
    vec3 col4 = mix(pink, purple, sin(colorShift + 4.5) * 0.5 + 0.5);

    // Composite all bands
    vec3 color = col1 * shimmer1 * 1.2
               + col2 * shimmer2 * 1.0
               + col3 * shimmer3 * 0.9
               + col4 * shimmer4 * 0.8;

    // Mouse glow — warm bright spot near cursor
    float glow = smoothstep(0.35, 0.0, mouseDist);
    vec3 glowColor = mix(cyan, purple, sin(t * 0.5) * 0.5 + 0.5);
    color += glowColor * glow * 0.3;

    // Brightness — saturated and vibrant
    float intensity = (band1 + band2 + band3 + band4) * 0.4;
    intensity += glow * 0.15;
    intensity = clamp(intensity, 0.0, 1.0);

    // Subtle vertical gradient — brighter in upper portion
    float vertFade = smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.5, uv.y);
    intensity *= mix(0.6, 1.0, vertFade);

    gl_FragColor = vec4(color, intensity * 0.45);
  }
`

function initWebGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
  if (!gl) return null

  function compileShader(src: string, type: number) {
    const shader = gl!.createShader(type)!
    gl!.shaderSource(shader, src)
    gl!.compileShader(shader)
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl!.getShaderInfoLog(shader))
      return null
    }
    return shader
  }

  const vs = compileShader(VERTEX_SHADER, gl.VERTEX_SHADER)
  const fs = compileShader(FRAGMENT_SHADER, gl.FRAGMENT_SHADER)
  if (!vs || !fs) return null

  const program = gl.createProgram()!
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program))
    return null
  }

  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

  const pos = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(pos)
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  return {
    gl,
    uniforms: {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      mouse: gl.getUniformLocation(program, 'u_mouse'),
    },
  }
}

export function LiquidSurface() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 })
  const animRef = useRef<number>(0)
  const [ready, setReady] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: 1.0 - e.clientY / window.innerHeight,
    }
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!e.touches[0]) return
    mouseRef.current = {
      x: e.touches[0].clientX / window.innerWidth,
      y: 1.0 - e.touches[0].clientY / window.innerHeight,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = initWebGL(canvas)
    if (!ctx) return

    setReady(true)

    function resize() {
      if (!canvas || !ctx) return
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.gl.viewport(0, 0, canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    const startTime = performance.now()

    function render() {
      if (!ctx) return
      const { gl, uniforms } = ctx
      const time = (performance.now() - startTime) / 1000

      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.03
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.03

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uniforms.resolution, canvas!.width, canvas!.height)
      gl.uniform1f(uniforms.time, time)
      gl.uniform2f(uniforms.mouse, smoothMouseRef.current.x, smoothMouseRef.current.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      animRef.current = requestAnimationFrame(render)
    }

    animRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [handleMouseMove, handleTouchMove])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.8s ease' }}
    />
  )
}
