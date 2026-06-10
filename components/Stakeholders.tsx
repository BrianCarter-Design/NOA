'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ── Assets ──────────────────────────────────────────────────────────────── */
const imgArrowUpRight = 'https://www.figma.com/api/mcp/asset/48910a28-a9c8-4c7e-9eaf-b7f15d205cef';

/* ── Styles ─────────────────────────────────────────────────────────────── */
const sw: React.CSSProperties = { fontFamily: 'Switzer, sans-serif' };
const it: React.CSSProperties = { fontFamily: 'Inter, Switzer, sans-serif' };

/* ── Data ────────────────────────────────────────────────────────────────── */
const STAKEHOLDERS = [
  { num: '01', label: 'Investors',  desc: "People or organisations who fund NOA's projects and earn returns from their performance.", href: '/solutions/investors'  },
  { num: '02', label: 'IPPs',       desc: 'Energy producers who develop and operate power projects, often working alongside NOA.',    href: '/solutions/ipp'        },
  { num: '03', label: 'Off-takers', desc: 'Businesses that buy the energy generated through long-term supply agreements.',           href: '/solutions/off-takers' },
  { num: '04', label: 'Partners',   desc: 'Companies that work with NOA to help build, deliver, or scale energy projects.',          href: '/solutions/partners'   },
];

/* ── Props ───────────────────────────────────────────────────────────────── */
interface StakeholdersProps {
  /** Extra styles applied to the outer <section> — use to add marginTop/borderRadius for overlap effects */
  sectionStyle?: React.CSSProperties;
}

/* ── Component ───────────────────────────────────────────────────────────── */
export default function Stakeholders({ sectionStyle }: StakeholdersProps) {
  const [hoverStake, setHoverStake] = useState<number | null>(null);

  return (
    <section style={{
      background: '#fff', padding: '0 32px 48px',
      position: 'relative', zIndex: 10,
      borderRadius: '0 0 40px 40px',
      ...sectionStyle,
    }}>
      <div style={{ background: '#f5f5f5', borderRadius: 32, padding: '88px 64px', display: 'flex', flexDirection: 'column', gap: 56 }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p className="anim-fade" style={{ ...it, fontWeight: 400, fontSize: 16, color: '#737373', margin: 0 }}>Who we work with</p>
            <h2 className="anim-heading-words" style={{ ...sw, fontWeight: 400, fontSize: 52, color: '#000b0d', letterSpacing: '-1.6px', lineHeight: '60px', margin: 0 }}>
              Bringing together key stakeholders<br />across the energy ecosystem
            </h2>
          </div>
          <div className="anim-fade" style={{ flexShrink: 0 }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, height: 52, padding: '0 22px',
              background: '#fff', borderRadius: 14, textDecoration: 'none', border: 'none',
            }}>
              <span style={{ ...it, fontWeight: 500, fontSize: 16, color: '#000b0d', letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>Get Expert Advice</span>
              <img src={imgArrowUpRight} alt="" style={{ width: 18, height: 18 }} />
            </Link>
          </div>
        </div>

        {/* 4-column cards — white default, teal on hover, 3D tilt-follow */}
        <div className="anim-card-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, perspective: '1400px' }}>
          {STAKEHOLDERS.map((s, i) => {
            const isHover = hoverStake === i;
            return (
              <Link
                key={s.num}
                href={s.href}
                className="anim-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transition = 'background-color 0.35s ease, transform 0.12s linear, box-shadow 0.35s ease';
                  setHoverStake(i);
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const px = (e.clientX - rect.left) / rect.width - 0.5;
                  const py = (e.clientY - rect.top)  / rect.height - 0.5;
                  const max = 8;
                  card.style.transform = `translateY(-6px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transition = 'background-color 0.35s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease';
                  e.currentTarget.style.transform = '';
                  setHoverStake(prev => (prev === i ? null : prev));
                }}
                style={{
                  position: 'relative',
                  background: isHover ? '#00676d' : '#fff',
                  borderRadius: 24, padding: '36px 32px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  textDecoration: 'none', minHeight: 340, boxSizing: 'border-box',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  boxShadow: isHover
                    ? '0 30px 50px -18px rgba(0,103,109,0.45), 0 8px 18px -6px rgba(0,0,0,0.15)'
                    : '0 2px 6px rgba(0,0,0,0.04)',
                  transition: 'background-color 0.35s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease',
                }}
              >
                <img
                  src={imgArrowUpRight}
                  alt=""
                  style={{
                    position: 'absolute', top: 32, right: 32, width: 20, height: 20,
                    opacity: isHover ? 1 : 0.5,
                    filter: isHover ? 'brightness(0) invert(1)' : 'none',
                    transform: isHover ? 'translateZ(24px)' : 'translateZ(0)',
                    transition: 'opacity 0.35s ease, filter 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                  <span style={{ ...it, fontWeight: 400, fontSize: 13, color: isHover ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)', letterSpacing: '0.04em', transition: 'color 0.35s ease' }}>
                    {s.num}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <h3 style={{ ...sw, fontWeight: 400, fontSize: 'clamp(24px, 2.5vw, 36px)', color: isHover ? '#fff' : '#000b0d', letterSpacing: '-1.5px', lineHeight: 1.1, margin: 0, transition: 'color 0.35s ease' }}>
                    {s.label}
                  </h3>
                  <div style={{ height: 1, background: isHover ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', transition: 'background-color 0.35s ease' }} />
                  <p style={{ ...it, fontWeight: 400, fontSize: 14, color: isHover ? 'rgba(255,255,255,0.65)' : '#737373', lineHeight: 1.6, margin: 0, transition: 'color 0.35s ease' }}>
                    {s.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
