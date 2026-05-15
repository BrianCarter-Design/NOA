'use client';
import { useEffect, useRef, ReactNode } from 'react';

export default function HeroBg({ overlay, children }: { overlay: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      el.style.visibility = window.scrollY >= window.innerHeight ? 'hidden' : 'visible';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div ref={ref} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      {children}
      <div style={{ position: 'absolute', inset: 0, background: overlay }} />
    </div>
  );
}
