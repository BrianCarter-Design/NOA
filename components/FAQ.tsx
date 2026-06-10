'use client';

import { useState } from 'react';

/* ── Assets ──────────────────────────────────────────────────────────────── */
const imgChevronDown  = 'https://www.figma.com/api/mcp/asset/2e41c385-e05e-4da9-acbe-4b9f87e26d57';
const imgChevronRight = 'https://www.figma.com/api/mcp/asset/f2f25c36-f81b-4696-a4d5-2a2f39af9921';

/* ── Styles ─────────────────────────────────────────────────────────────── */
const sw: React.CSSProperties = { fontFamily: 'Switzer, sans-serif' };
const it: React.CSSProperties = { fontFamily: 'Inter, Switzer, sans-serif' };

/* ── Types ───────────────────────────────────────────────────────────────── */
export interface FAQItem { q: string; a: string; }

/* ── Component ───────────────────────────────────────────────────────────── */
export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section style={{ padding: '64px', background: '#fff' }}>
      <div style={{ background: '#f4f0eb', borderRadius: 24, padding: '88px 64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 60 }}>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, maxWidth: 670, textAlign: 'center' }}>
          <p className="anim-fade" style={{ ...it, fontWeight: 400, fontSize: 16, color: '#737373', margin: 0 }}>FAQ</p>
          <h2 className="anim-heading-words" style={{ ...sw, fontWeight: 400, fontSize: 52, color: '#000b0d', letterSpacing: '-1.6px', lineHeight: '60px', margin: 0 }}>
            What you need to know
          </h2>
        </div>

        <div className="anim-card-group" style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 1070 }}>
          {items.map((faq, i) => (
            <div key={i} className="anim-card" style={{ background: '#fff', borderRadius: 24, overflow: 'hidden' }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{ width: '100%', display: 'flex', gap: 24, alignItems: 'flex-start', padding: '24px 28px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <p style={{ flex: 1, ...it, fontWeight: 500, fontSize: 16, color: '#000b0d', letterSpacing: '-0.3px', lineHeight: 1.5, margin: 0 }}>{faq.q}</p>
                <img
                  src={openIdx === i ? imgChevronDown : imgChevronRight}
                  alt=""
                  style={{ width: 32, height: 22, flexShrink: 0, transition: 'transform 0.3s', transform: openIdx === i ? 'none' : 'rotate(180deg)' }}
                />
              </button>
              <div style={{ overflow: 'hidden', maxHeight: openIdx === i ? 200 : 0, transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)' }}>
                <div style={{ padding: '0 28px 24px' }}>
                  <p style={{ ...it, fontWeight: 400, fontSize: 16, color: '#737373', letterSpacing: '-0.3px', lineHeight: 1.55, margin: 0 }}>{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
