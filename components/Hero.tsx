'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function Hero() {
  useEffect(() => {
    gsap.to('.line-inner', {
      y:        '0%',
      duration: 1.1,
      ease:     'power4.out',
      stagger:  0.12,
      delay:    0.4,
    });
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
      >
        <source src="/assets/loop.mp4" type="video/mp4" />
      </video>

      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', pointerEvents: 'none' }} />

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
