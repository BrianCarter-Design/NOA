'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const VERT = `
  attribute vec2 a_pos;
  varying vec2 v_uv;
  void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;
  uniform sampler2D u_video;
  uniform vec2  u_mouse;
  uniform vec2  u_velocity;
  uniform float u_aspect;
  uniform float u_decay;
  varying vec2 v_uv;

  void main() {
    vec2 uv = v_uv;
    vec2 d = uv - u_mouse;
    d.x *= u_aspect;
    float dist = length(d);

    float strength = exp(-dist * dist * 8.0);
    vec2 warp = u_velocity * strength * 0.38;

    float ring = exp(-pow(dist - 0.08, 2.0) * 300.0) * u_decay;
    vec2 radial = (d / (u_aspect + 0.0001)) * ring * 0.055;

    float bulge = strength * u_decay * 0.028;
    vec2 lensDir = -normalize(d + 0.0001) / vec2(u_aspect, 1.0);
    vec2 lens = lensDir * bulge;

    vec2 displaced = clamp(uv + warp + radial + lens, 0.001, 0.999);
    gl_FragColor = texture2D(u_video, displaced);
  }
`;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const video  = videoRef.current!;
    const gl     = canvas.getContext('webgl', { alpha: false })!;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER,   VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.uniform1i(gl.getUniformLocation(prog, 'u_video'), 0);
    const uMouse    = gl.getUniformLocation(prog, 'u_mouse');
    const uVelocity = gl.getUniformLocation(prog, 'u_velocity');
    const uAspect   = gl.getUniformLocation(prog, 'u_aspect');
    const uDecay    = gl.getUniformLocation(prog, 'u_decay');

    let rawX = 0.5, rawY = 0.5;
    let smoothX = 0.5, smoothY = 0.5;
    let prevSX  = 0.5, prevSY  = 0.5;
    let decay = 0;

    const onMove = (e: MouseEvent) => {
      rawX =  e.clientX / window.innerWidth;
      rawY = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove);

    const resize = () => {
      canvas.width  = window.innerWidth  * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width  = window.innerWidth  + 'px';
      canvas.style.height = window.innerHeight + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    const frame = () => {
      rafRef.current = requestAnimationFrame(frame);

      prevSX = smoothX; prevSY = smoothY;
      smoothX += (rawX - smoothX) * 0.09;
      smoothY += (rawY - smoothY) * 0.09;

      const vx    = (smoothX - prevSX) * 60;
      const vy    = (smoothY - prevSY) * 60;
      const speed = Math.sqrt(vx * vx + vy * vy);

      decay += (speed - decay) * 0.12;
      if (speed < 0.001) decay *= 0.92;

      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      }

      const aspect = canvas.width / canvas.height;
      gl.uniform2f(uMouse,    smoothX, smoothY);
      gl.uniform2f(uVelocity, vx * 0.003, vy * 0.003);
      gl.uniform1f(uAspect,   aspect);
      gl.uniform1f(uDecay,    Math.min(decay, 1.0));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    frame();

    video.play().catch(() => {
      const resume = () => { video.play(); };
      document.addEventListener('mousemove', resume, { once: true });
      document.addEventListener('click',     resume, { once: true });
    });

    gsap.to('.line-inner', {
      y: '0%',
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.12,
      delay: 0.4,
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
      >
        <source src="/assets/wind.mp4" type="video/mp4" />
      </video>

      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />

      {/* Headline */}
      <div className="absolute z-10" style={{ bottom: '12%', left: '5%', pointerEvents: 'none' }}>
        <h1 style={{ color: '#fff', fontSize: '96px', fontWeight: 400, lineHeight: 1.01, letterSpacing: '-0.05em' }}>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em' }}>
            <span className="line-inner" style={{ display: 'block', transform: 'translateY(110%)' }}>A different</span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em' }}>
            <span className="line-inner" style={{ display: 'block', transform: 'translateY(110%)' }}>kind of energy</span>
          </span>
        </h1>
      </div>
    </section>
  );
}
