'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Link from 'next/link';

const sw: React.CSSProperties = { fontFamily: 'Switzer, sans-serif' };
const it: React.CSSProperties = { fontFamily: 'Inter, Switzer, sans-serif' };

export default function Hero() {
  const h1Ref      = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctasRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);
    if (!h1Ref.current) return;

    const split = new SplitText(h1Ref.current, { type: 'words,chars' });

    gsap.set(split.chars, {
      filter: 'blur(12px)',
      opacity: 0,
      willChange: 'filter',
    });
    gsap.to(split.chars, {
      filter: 'blur(0px)',
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      stagger: { amount: 0.65, from: 'start' },
      delay: 0.2,
      onComplete: () => split.chars.forEach((c: Element) => { (c as HTMLElement).style.willChange = 'auto'; }),
    });

    gsap.fromTo(subRef.current,  { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.95 });
    gsap.fromTo(ctasRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 1.15 });

    return () => { split.revert(); };
  }, []);

  return (
    <section style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '100vh', overflow: 'clip', background: '#000b0d', zIndex: 0 }}>

      {/* Hero video */}
      <video
        autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
      >
        <source src="/assets/vecteezy_female-enjoying-music-outdoors_2015085.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay — bottom-left dark, fades right */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(46.3deg, rgba(0,0,0,0.64) 3.24%, rgba(0,0,0,0) 46.62%)',
      }} />

      {/* Content — bottom-left */}
      <div style={{ position: 'absolute', bottom: 100, left: 96, display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 575 }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h1
            ref={h1Ref}
            style={{ ...sw, color: '#fff', fontSize: 80, fontWeight: 400, lineHeight: '80px', letterSpacing: '-1.6px', margin: 0 }}
          >
            A different<br />kind of energy
          </h1>
          <p
            ref={subRef}
            style={{ ...it, fontWeight: 400, fontSize: 20, lineHeight: '30px', color: '#fff', margin: 0, maxWidth: 474, opacity: 0 }}
          >
            Reduce energy costs and reliance on unreliable power with scalable renewable energy solutions.
          </p>
        </div>

        <div ref={ctasRef} style={{ display: 'flex', gap: 24, alignItems: 'center', opacity: 0 }}>
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', height: 60, padding: '0 25px',
            background: '#fff', backdropFilter: 'blur(21.5px)', WebkitBackdropFilter: 'blur(21.5px)',
            borderRadius: 16, textDecoration: 'none', flexShrink: 0,
          }}>
            <span style={{ ...it, fontWeight: 500, fontSize: 20, color: '#000b0d', whiteSpace: 'nowrap' }}>Talk to an expert</span>
          </Link>
          <Link href="/solutions" style={{
            display: 'inline-flex', alignItems: 'center', height: 60, padding: '0 34px 0 25px',
            background: 'rgba(0,0,0,0.17)', backdropFilter: 'blur(21.5px)', WebkitBackdropFilter: 'blur(21.5px)',
            borderRadius: 16, textDecoration: 'none', flexShrink: 0,
          }}>
            <span style={{ ...it, fontWeight: 500, fontSize: 20, color: '#fff', whiteSpace: 'nowrap' }}>Explore solutions</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
