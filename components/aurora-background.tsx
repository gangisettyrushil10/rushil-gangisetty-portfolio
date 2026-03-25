'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

interface AuroraBackgroundProps {
  children: ReactNode
  className?: string
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float t = u_time * 0.25;

    // Multi-octave liquid noise
    float n1 = snoise(uv * 2.5 + vec2(t * 0.4, t * 0.3));
    float n2 = snoise(uv * 4.0 - vec2(t * 0.3, t * 0.5));
    float n3 = snoise(uv * 1.5 + vec2(t * 0.2, -t * 0.35));
    float n4 = snoise(uv * 6.0 + vec2(-t * 0.15, t * 0.25));

    // Mouse ripple
    vec2 mouse = u_mouse;
    float mouseDist = length(uv - mouse);
    float mouseWave = sin(mouseDist * 15.0 - u_time * 4.0) * smoothstep(0.6, 0.0, mouseDist) * 0.5;

    float displacement = n1 * 0.45 + n2 * 0.3 + n3 * 0.2 + n4 * 0.1 + mouseWave;

    // Color palette
    vec3 cyan   = vec3(0.263, 0.843, 1.0);
    vec3 purple = vec3(0.616, 0.549, 1.0);
    vec3 pink   = vec3(1.0, 0.424, 0.671);
    vec3 green  = vec3(0.408, 0.969, 0.769);

    // Color mixing based on displacement and time
    float phase = displacement * 2.0 + t * 0.3;
    vec3 col = mix(cyan, purple, smoothstep(-0.4, 0.4, sin(phase * 3.0)));
    col = mix(col, pink, smoothstep(-0.3, 0.5, sin(phase * 2.1 + 1.5)));
    col = mix(col, green, smoothstep(-0.2, 0.6, sin(phase * 1.7 + 3.0)));

    // Highlights
    float highlight = smoothstep(0.15, 0.55, displacement) * 0.4;
    col += highlight;

    // Edge fade
    float edgeFade = smoothstep(0.0, 0.2, uv.x) * smoothstep(1.0, 0.8, uv.x)
                   * smoothstep(0.0, 0.25, uv.y) * smoothstep(1.0, 0.6, uv.y);

    // Mouse glow — brighter near cursor
    float mouseGlow = smoothstep(0.4, 0.0, mouseDist) * 0.25;

    // Final alpha — much more visible
    float alpha = (0.25 + displacement * 0.12 + mouseGlow) * edgeFade;
    alpha = clamp(alpha, 0.0, 0.55);

    gl_FragColor = vec4(col * (1.0 + mouseGlow), alpha);
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

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 })
  const animRef = useRef<number>(0)
  const [ready, setReady] = useState(false)
  const [fallback, setFallback] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: 1.0 - (e.clientY - rect.top) / rect.height,
    }
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect || !e.touches[0]) return
    mouseRef.current = {
      x: (e.touches[0].clientX - rect.left) / rect.width,
      y: 1.0 - (e.touches[0].clientY - rect.top) / rect.height,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = initWebGL(canvas)
    if (!ctx) {
      setFallback(true)
      return
    }

    setReady(true)

    function resize() {
      if (!canvas || !ctx) return
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.gl.viewport(0, 0, canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    const startTime = performance.now()

    function render() {
      if (!ctx) return
      const { gl, uniforms } = ctx
      const time = (performance.now() - startTime) / 1000

      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.04
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.04

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
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className={`relative overflow-hidden ${className ?? ''}`}
    >
      {/* WebGL canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.5s' }}
      />

      {/* CSS fallback */}
      {fallback && (
        <div className="absolute inset-0 aurora-backdrop opacity-50 pointer-events-none" />
      )}

      {/* Always show subtle static gradient as base layer */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 30% 40%, rgba(67, 215, 255, 0.08), transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(157, 140, 255, 0.06), transparent 50%)',
      }} />

      <div className="relative z-10">{children}</div>
    </div>
  )
}
