'use client';

import Link from 'next/link';
import { useState } from 'react';

/* ── Assets ─────────────────────────────────────────────────────────────── */
const imgWordmark  = 'https://www.figma.com/api/mcp/asset/01998855-d264-412b-afb1-21ef050bc73b';
const imgPhone     = 'https://www.figma.com/api/mcp/asset/8bb33137-d786-4857-aa49-241b7f824a21';
const imgLinkedIn  = 'https://www.figma.com/api/mcp/asset/8314d96c-7e8c-4c97-b13f-c3a09c776d31';
const imgLocation  = 'https://www.figma.com/api/mcp/asset/ec9a4790-1d7f-4d1d-87e6-b617247db167';

/* ── Data ───────────────────────────────────────────────────────────────── */
const COMPANY_LINKS = [
  { t: 'Home',               h: '/' },
  { t: 'What we do',         h: '/how-it-works' },
  { t: 'Customer Solutions', h: '/solutions' },
  { t: 'Our electrons',      h: '/how-it-works' },
  { t: 'Who we are',         h: '/about' },
  { t: 'News and Insights',  h: '/insights' },
  { t: 'Your career',        h: '/careers' },
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
  ...inter, fontWeight: 400, fontSize: 14,
  color: 'rgba(255,255,255,0.6)', lineHeight: '20px',
  textDecoration: 'none', margin: 0,
};

const colHeading: React.CSSProperties = {
  ...inter, fontWeight: 400, fontSize: 18,
  color: '#00c0b5', lineHeight: '24px', margin: 0,
};

/* ── Component ──────────────────────────────────────────────────────────── */
export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        height: 821,
        zIndex: -100,
      }}
    >
      <div style={{
        background: '#002223',
        padding: '70px 88px 48px',
        height: '100%', boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>

        {/* ── Wordmark — oversized, anchored to bottom ─────────────────── */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: 1264, height: 350,
          pointerEvents: 'none',
        }}>
          <img alt="NOA" src={imgWordmark} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
        </div>

        {/* ── Top: columns ─────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          width: '100%', position: 'relative', zIndex: 2,
        }}>

          {/* Col 1 — description + newsletter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48, width: 393, flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ ...inter, fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: '20px', margin: 0 }}>
                NOA is a leading South African renewable energy independent power producer, aggregator and trader. The company enables commercial and industrial customers to decarbonise while securing long-term, competitively priced electricity.
              </p>
              <p style={{ ...inter, fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: '20px', margin: 0 }}>
                Backed by experienced infrastructure investors and led by a team of seasoned energy market professionals, NOA combines owned generation assets with long-term offtake partnerships to build a diversified national renewable portfolio.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ ...inter, fontWeight: 400, fontSize: 18, color: '#00c0b5', lineHeight: '24px', margin: 0 }}>
                Stay in the loop — subscribe to our newsletter
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    flex: 1, height: 55, borderRadius: 16, border: 'none', outline: 'none',
                    background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)',
                    padding: '0 16px', ...inter, fontSize: 14, color: '#00c0b5',
                    boxSizing: 'border-box',
                  }}
                />
                <button style={{
                  height: 55, padding: '0 24px', borderRadius: 16, border: 'none',
                  background: '#00c0b5', cursor: 'pointer',
                  ...inter, fontWeight: 400, fontSize: 14, color: '#000b0d', whiteSpace: 'nowrap',
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Right columns group */}
          <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexShrink: 0 }}>

            {/* Col 2 — Company */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={colHeading}>Company</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {COMPANY_LINKS.map(({ t, h }) => (
                  <Link key={t} href={h} style={linkTxt}>{t}</Link>
                ))}
              </div>
            </div>

            {/* Col 3 — Legal */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 130 }}>
              <p style={colHeading}>Legal</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {LEGAL_LINKS.map(({ t, h }) => (
                  <Link key={t} href={h} style={linkTxt}>{t}</Link>
                ))}
              </div>
            </div>

            {/* Col 4 — Let's talk */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 415 }}>
              <p style={colHeading}>Let&apos;s talk</p>
              <Link href="/contact" style={linkTxt}>Contact form</Link>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <img src={imgPhone} alt="" style={{ width: 24, height: 24, flexShrink: 0 }} />
                <span style={linkTxt}>021 010 0480</span>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <img src={imgLinkedIn} alt="" style={{ width: 24, height: 24, flexShrink: 0 }} />
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={linkTxt}>LinkedIn</a>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <img src={imgLocation} alt="" style={{ width: 24, height: 24, flexShrink: 0, marginTop: 2 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <span style={linkTxt}>8th Floor, The Edge, 3 Howick Close, Tyger Waterfront, Cape Town 7530</span>
                  <span style={linkTxt}>7th Floor, Fire Station Building, 16 Baker Street, Rosebank, Johannesburg 2196</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'relative', zIndex: 2,
          ...inter, fontWeight: 400, fontSize: 16, color: '#00676d', lineHeight: '24px',
        }}>
          <p style={{ margin: 0 }}>Copyright © 2026 NOA Group</p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span>All Rights Reserved</span>
            <span>|</span>
            <Link href="#" style={{ ...inter, fontSize: 16, color: '#00676d', textDecoration: 'none' }}>Terms and Conditions</Link>
            <span>|</span>
            <Link href="#" style={{ ...inter, fontSize: 16, color: '#00676d', textDecoration: 'none' }}>Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
