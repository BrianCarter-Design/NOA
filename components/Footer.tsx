'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';

/* ── Assets (from Figma node 462-5075) ──────────────────────────────────── */
const imgPhone    = 'https://www.figma.com/api/mcp/asset/10a43fea-15ce-4079-9838-be94d81b1d6b';
const imgLinkedIn = 'https://www.figma.com/api/mcp/asset/eb7fc5c0-f928-4327-a6c1-09eb79db1914';
const imgWordmark = 'https://www.figma.com/api/mcp/asset/54d04dcb-f61e-40f6-90d7-d1120f6b6251';

/* ── Data ───────────────────────────────────────────────────────────────── */
const COMPANY_LINKS = [
  { t: 'Home',         h: '/' },
  { t: 'How it works', h: '/how-it-works' },
  { t: 'About',        h: '/about' },
  { t: 'Projects',     h: '/projects' },
  { t: 'Insights',     h: '/insights' },
  { t: 'Careers',      h: '/careers' },
];

const SOLUTIONS_LINKS = [
  { t: 'Overview',   h: '/solutions' },
  { t: 'Investors',  h: '/solutions/investors' },
  { t: 'IPPs',       h: '/solutions/ipp' },
  { t: 'Off-takers', h: '/solutions/off-takers' },
  { t: 'Partners',   h: '/solutions/partners' },
];

const LEGAL_LINKS = [
  { t: 'Terms of use',    h: '#' },
  { t: 'Privacy policy',  h: '#' },
  { t: 'Cookie policy',   h: '#' },
  { t: 'Trading licence', h: '#' },
];

/* ── Styles ─────────────────────────────────────────────────────────────── */
const inter: React.CSSProperties = { fontFamily: 'Inter, Switzer, sans-serif' };

const linkTxt: React.CSSProperties = {
  ...inter, fontWeight: 400, fontSize: 18,
  color: 'rgba(255,255,255,0.6)', lineHeight: '24px',
  textDecoration: 'none', margin: 0,
};

const colHeading: React.CSSProperties = {
  ...inter, fontWeight: 400, fontSize: 18,
  color: '#00c0b5', lineHeight: '24px', margin: 0,
};

const descTxt: React.CSSProperties = {
  ...inter, fontWeight: 400, fontSize: 18,
  color: 'rgba(255,255,255,0.6)', lineHeight: '24px', margin: 0,
};

const copyrightTxt: React.CSSProperties = {
  ...inter, fontWeight: 400, fontSize: 18,
  color: '#00676d', lineHeight: '24px', margin: 0,
};

/* ── Component ──────────────────────────────────────────────────────────── */
export default function Footer() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const footerRef   = useRef<HTMLElement>(null);
  const [spotlight, setSpotlight] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const footer   = footerRef.current;
    const wordmark = wordmarkRef.current;
    if (!footer || !wordmark) return;

    const onMove = (e: MouseEvent) => {
      const rect = wordmark.getBoundingClientRect();
      setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const onLeave = () => setSpotlight(null);

    footer.addEventListener('mousemove', onMove);
    footer.addEventListener('mouseleave', onLeave);
    return () => {
      footer.removeEventListener('mousemove', onMove);
      footer.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        height: 582,
        zIndex: 0, // lowest layer — sits behind opaque page content
      }}
    >
      <div style={{
        background: '#002223',
        padding: '70px 88px 0',
        height: '100%', boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
      }}>

        {/* ── Top: 5-column grid ─────────────────────────────────────────── */}
        <div className="anim-card-group" style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          gap: 24, width: '100%', position: 'relative', zIndex: 2,
        }}>

          {/* Col 1 — description + copyright */}
          <div className="anim-fade" style={{
            display: 'flex', flexDirection: 'column', gap: 13,
            width: 393, flexShrink: 0,
          }}>
            <p style={{ ...descTxt, maxWidth: 388 }}>
              NOA is a South African renewable energy IPP, aggregator and energy trader delivering flexible clean energy solutions with a licensed trading platform.
            </p>
            <p style={copyrightTxt}>Copyright © 2026 NOA Group</p>
          </div>

          {/* Col 2 — Company */}
          <div className="anim-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 130, flexShrink: 0 }}>
            <p style={colHeading}>Company</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {COMPANY_LINKS.map(({ t, h }) => (
                <Link key={t} href={h} style={linkTxt}>{t}</Link>
              ))}
            </div>
          </div>

          {/* Col 3 — Solutions */}
          <div className="anim-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 130, flexShrink: 0 }}>
            <p style={colHeading}>Solutions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SOLUTIONS_LINKS.map(({ t, h }) => (
                <Link key={t} href={h} style={linkTxt}>{t}</Link>
              ))}
            </div>
          </div>

          {/* Col 4 — Legal */}
          <div className="anim-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 130, flexShrink: 0 }}>
            <p style={colHeading}>Legal</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {LEGAL_LINKS.map(({ t, h }) => (
                <Link key={t} href={h} style={linkTxt}>{t}</Link>
              ))}
            </div>
          </div>

          {/* Col 5 — Contact us */}
          <div className="anim-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 160, flexShrink: 0 }}>
            <p style={colHeading}>Contact us</p>
            <Link href="/contact" style={linkTxt}>Contact form</Link>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <img src={imgPhone} alt="" style={{ width: 24, height: 24, flexShrink: 0 }} />
              <span style={linkTxt}>021 010 0480</span>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <img src={imgLinkedIn} alt="" style={{ width: 24, height: 24, flexShrink: 0 }} />
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={linkTxt}>LinkedIn</a>
            </div>
          </div>
        </div>

        {/* ── Decorative oversized wordmark, anchored to bottom of viewport ─── */}
        <div
          ref={wordmarkRef}
          className="anim-fade"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 176px)', // matches px-88 of the footer
            maxWidth: 1264,
            aspectRatio: '1264 / 350',
            pointerEvents: 'none',
          }}
        >
          <img alt="NOA" src={imgWordmark} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
          {/* Spotlight — clipped to the wordmark's letter paths */}
          {spotlight && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: `radial-gradient(circle 260px at ${spotlight.x}px ${spotlight.y}px,
                  rgba(0,192,181,0.55) 0%,
                  rgba(0,192,181,0.2) 40%,
                  transparent 70%)`,
                WebkitMaskImage: `url(${imgWordmark})`,
                maskImage: `url(${imgWordmark})`,
                WebkitMaskSize: '100% 100%',
                maskSize: '100% 100%',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
              }}
            />
          )}
        </div>

      </div>
    </footer>
  );
}
