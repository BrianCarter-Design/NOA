'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Hero from '@/components/Hero';

/* ── Assets ──────────────────────────────────────────────────────────────── */
const imgArrow      = 'https://www.figma.com/api/mcp/asset/164142f7-378f-432b-80e6-ec479194d958';
const imgChevron    = 'https://www.figma.com/api/mcp/asset/b391184c-4327-498a-8ef9-09dcad13662a';
const imgMail       = 'https://www.figma.com/api/mcp/asset/e676b7b3-a51f-441d-8392-a5c217c68fa5';
const imgPhone      = 'https://www.figma.com/api/mcp/asset/39cfb49a-2657-4a1b-b924-192c9d0c68f0';
const imgLinkedIn   = 'https://www.figma.com/api/mcp/asset/aa6e2db1-c486-4a49-92a4-ff907a47dc6a';
const imgLogo       = '/assets/noa-logo.svg';
const imgContactBg  = 'https://www.figma.com/api/mcp/asset/28ef7975-1abd-4d82-8024-5a12bf333115';
const imgSustainBg  = 'https://www.figma.com/api/mcp/asset/7ad37436-7b4c-4486-b545-e82e9e2c58ad';
const imgGlassBg    = 'https://www.figma.com/api/mcp/asset/32adb5e8-c450-45de-9b9a-50b4a4a3f5d8';
const imgWave1      = 'https://www.figma.com/api/mcp/asset/4c8b5f32-14f2-4d67-a3e8-ae8273b0f801';
const imgWave2      = 'https://www.figma.com/api/mcp/asset/d695c935-a79d-49c3-a2ee-ef98e9315cde';
const imgAbstractWhy= 'https://www.figma.com/api/mcp/asset/318dc82b-976a-445a-bb75-71ccf0765384';
const imgArticle1   = 'https://www.figma.com/api/mcp/asset/582f4d1c-732a-46b7-bbe1-342554613091';
const imgArticle1b  = 'https://www.figma.com/api/mcp/asset/8c15eafb-cb6e-4115-a8f3-7ffc49376e93';
const imgWindIcon   = 'https://www.figma.com/api/mcp/asset/27ebf678-122a-415d-a291-c5d7d756f030';

/* ── Data ────────────────────────────────────────────────────────────────── */
const WHY_NOA = [
  {
    label: 'Aggregator Model',
    desc:  'NOA aggregates renewable energy from wind, solar PV and battery energy generation facilities situated in optimal locations across South Africa to provide significantly higher and consistent volumes of renewable energy.',
  },
  {
    label: 'Customisation',
    desc:  'Every solution is tailored to the unique energy requirements of each client. We design flexible structures that fit your consumption profile and procurement strategy.',
  },
  {
    label: 'Flexible Solutions',
    desc:  'From short-term supply agreements to long-term PPAs, our commercial models adapt to your business needs and risk appetite.',
  },
  {
    label: 'Speed of Supply',
    desc:  'Our aggregator model and existing project pipeline allow us to deliver renewable energy significantly faster than traditional procurement routes.',
  },
  {
    label: 'Balance Sheet Friendly',
    desc:  "NOA's off-balance sheet structures allow businesses to access clean energy without capital expenditure, preserving financial flexibility.",
  },
];

const STAKEHOLDERS = [
  { num: '01', label: 'Investors',  desc: "People or organisations who fund NOA's projects and earn returns from their performance." },
  { num: '02', label: 'IPPs',       desc: 'Energy producers who develop and operate power projects, often working alongside NOA.' },
  { num: '03', label: 'Off-takers', desc: 'Businesses that buy the energy generated through long-term supply agreements.' },
  { num: '04', label: 'Partners',   desc: 'Companies that work with NOA to help build, deliver, or scale energy projects.' },
];

const FAQS = [
  {
    q: 'How does the process work?',
    a: 'Our process typically starts with an initial consultation, followed by solution design, project development, and implementation, with continued support throughout.',
  },
  {
    q: 'Can your solutions be customised?',
    a: 'Yes. Every engagement is tailored to your specific energy requirements, consumption profile, and commercial objectives.',
  },
  {
    q: 'How long does it take to get started?',
    a: 'Timelines vary by project scope, but our aggregator model means we can often begin delivering renewable energy faster than traditional procurement routes.',
  },
];

/* ── Primitives ──────────────────────────────────────────────────────────── */
function Label({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div
      className="anim-fade"
      style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 12px', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
    >
      <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 14, letterSpacing: '0.05em', color: dark ? '#fff' : '#868686', whiteSpace: 'nowrap' }}>
        {text}
      </span>
    </div>
  );
}

function MaskLine({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ overflow: 'hidden', paddingBottom: '0.05em', ...style }}>
      <div className="anim-mask-line" style={{ display: 'block', willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
const imgFooterLogo = 'https://www.figma.com/api/mcp/asset/a78da3e2-6568-4d37-aa8a-0f996daf6432';
const imgMailIcon   = 'https://www.figma.com/api/mcp/asset/3a5fd7fd-ae44-4558-b2af-1a67bc5fc3e5';
const imgPhoneIcon  = 'https://www.figma.com/api/mcp/asset/9649184c-4ffb-4099-a68a-b12a3c39f652';
const imgLinkedInIcon = 'https://www.figma.com/api/mcp/asset/febbed90-8813-42bd-939b-dd917812b227';

function Footer() {
  const txt: React.CSSProperties = { fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: '22px', margin: 0 };
  return (
    <footer style={{ background: '#fff', padding: '0 24px 24px', height: '100vh', boxSizing: 'border-box' }}>
      <div style={{ background: '#013436', borderRadius: 30, padding: '79px 88px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxSizing: 'border-box' }}>
        {/* Menu row */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <p className="anim-fade" style={{ ...txt, maxWidth: 398 }}>
              NOA is a South African renewable energy IPP, aggregator and energy trader delivering flexible clean energy solutions with a licensed trading platform.
            </p>
          </div>
          <div className="anim-card-group" style={{ display: 'flex', justifyContent: 'space-between', width: 557, flexShrink: 0 }}>
            {[
              { label: 'Company',   links: [{ t: 'How it works', h: '/how-it-works' }, { t: 'About', h: '/about' }, { t: 'Projects', h: '/projects' }, { t: 'Insights', h: '/insights' }, { t: 'Careers', h: '/careers' }] },
              { label: 'Solutions', links: [{ t: 'Overview', h: '/solutions' }, { t: 'Investors', h: '/solutions/investors' }, { t: 'IPPs', h: '/solutions/ipp' }, { t: 'Off-takers', h: '/solutions/off-takers' }, { t: 'Partners', h: '/solutions/partners' }] },
            ].map(col => (
              <div key={col.label} className="anim-card" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#82dfda', lineHeight: '22px', margin: 0, whiteSpace: 'nowrap' }}>{col.label}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {col.links.map(({ t, h }) => (
                    <Link key={t} href={h} style={{ ...txt, textDecoration: 'none', whiteSpace: 'nowrap' }}>{t}</Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="anim-card" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#82dfda', lineHeight: '22px', margin: 0, whiteSpace: 'nowrap' }}>Contact us</p>
              {[{ icon: imgMailIcon, label: 'contact@noa.com' }, { icon: imgPhoneIcon, label: '(000) 000 - 0000' }, { icon: imgLinkedInIcon, label: 'LinkedIn' }].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <img src={icon} alt="" style={{ width: 24, height: 24, flexShrink: 0 }} />
                  <span style={{ ...txt, whiteSpace: 'nowrap' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Logo + bottom bar */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="anim-fade" style={{ aspectRatio: '359/119', marginBottom: -60, overflow: 'hidden', position: 'relative', width: '100%' }}>
            <img alt="NOA" src={imgFooterLogo} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, paddingBottom: 24 }}>
            <p className="anim-fade" style={{ ...txt }}>Copyright © 2026 NOA Group</p>
            <p className="anim-fade" style={{ ...txt, whiteSpace: 'nowrap' }}>
              All Rights Reserved | <span style={{ cursor: 'pointer' }}>Terms and Conditions</span> | <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Home() {
  const [activeWhy,   setActiveWhy]   = useState(0);
  const [openFaq,     setOpenFaq]     = useState<number | null>(0);
  const [form, setForm] = useState({ name: '', surname: '', company: '', help: '', email: '', phone: '', message: '' });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.anim-mask-line', { y: '110%' });
    gsap.set('.anim-fade',      { opacity: 0, y: 32 });
    gsap.set('.anim-card',      { opacity: 0, y: 56 });
    gsap.set('.anim-image',     { opacity: 0, scale: 1.06 });

    /* Masked headings */
    gsap.utils.toArray<Element>('.anim-heading').forEach(heading => {
      gsap.to(heading.querySelectorAll('.anim-mask-line'), {
        y: '0%', duration: 1.05, ease: 'power4.out', stagger: 0.1,
        scrollTrigger: { trigger: heading, start: 'top 87%', once: true },
      });
    });

    /* Fade-up elements */
    gsap.utils.toArray<Element>('.anim-fade').forEach(el => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 91%', once: true },
      });
    });

    /* Staggered card groups */
    gsap.utils.toArray<Element>('.anim-card-group').forEach(group => {
      gsap.to(group.querySelectorAll('.anim-card'), {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      });
    });

    /* Image reveals */
    gsap.utils.toArray<Element>('.anim-image').forEach(el => {
      gsap.to(el, { opacity: 1, scale: 1, duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    /* Parallax */
    gsap.utils.toArray<Element>('.anim-parallax').forEach(el => {
      gsap.fromTo(el, { yPercent: -8 }, {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: (el as HTMLElement).closest('[data-parallax-section]') || el, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <div style={{ background: '#fff', overflowX: 'hidden' }}>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <Hero />

      {/* ══ INTRO ═════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderRadius: '30px 30px 0 0', marginTop: -30, position: 'relative', zIndex: 2, padding: '88px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, minHeight: 480 }}>

        <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#7d9798', lineHeight: 1.4, letterSpacing: '-1px', maxWidth: 500, margin: 0, flex: '0 0 auto' }}>
          NOA is a pioneer in the South African renewable energy industry.
          <br /><br />
          We build energy infrastructure with sustainability at its core.
        </p>

        {/* Large gradient stat number */}
        <div className="anim-fade" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 32 }}>
          <span style={{
            fontFamily:   'Switzer, sans-serif',
            fontWeight:   200,
            fontSize:     'clamp(160px, 18vw, 260px)',
            lineHeight:   1,
            letterSpacing: '-0.08em',
            background:   'linear-gradient(to bottom, #99ddd8, #fff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'block',
          }}>
            39%
          </span>
        </div>
      </section>

      {/* ══ WHY NOA ═══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '88px 64px 88px 117px', display: 'flex', flexDirection: 'column', gap: 100 }}>

        {/* Header row */}
        <div className="anim-fade" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Label text="WHY NOA?" />
          <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: 'rgba(0,0,0,0.5)', letterSpacing: '-1px', lineHeight: 1.4, maxWidth: 500, margin: 0, textAlign: 'right' }}>
            NOA differentiates itself by offering its portfolio of customers cutting-edge solutions.
          </p>
        </div>

        {/* Interactive list + image/text */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 64 }}>

          {/* Left: differentiator list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 560, flexShrink: 0 }}>
            {WHY_NOA.map((item, i) => (
              <button
                key={item.label}
                onClick={() => setActiveWhy(i)}
                style={{
                  background:    'none',
                  border:        'none',
                  cursor:        'pointer',
                  padding:       '8px 0',
                  display:       'flex',
                  alignItems:    'center',
                  gap:           16,
                  textAlign:     'right',
                  justifyContent: 'flex-end',
                }}
              >
                {i === activeWhy && (
                  <svg viewBox="0 0 16 16" fill="none" stroke="#00696e" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={20} height={20} style={{ transform: 'rotate(-135deg)', flexShrink: 0 }}>
                    <line x1="3" y1="13" x2="13" y2="3" /><polyline points="6 3 13 3 13 10" />
                  </svg>
                )}
                <span style={{
                  fontFamily:    'Switzer, sans-serif',
                  fontWeight:    400,
                  fontSize:      'clamp(36px, 3.8vw, 52px)',
                  color:         i === activeWhy ? '#00696e' : 'rgba(125,151,152,0.5)',
                  letterSpacing: '-1px',
                  lineHeight:    1.1,
                  transition:    'color 0.3s ease',
                  whiteSpace:    'nowrap',
                }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Right: abstract image + description */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 48, minWidth: 0 }}>
            <div className="anim-image" style={{ borderRadius: '20px 0 0 20px', overflow: 'hidden', aspectRatio: '1420/910', position: 'relative', background: '#e9f2f2' }}>
              <img src={imgAbstractWhy} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ padding: '0 24px' }}>
              <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 20, color: '#5f7374', lineHeight: 1.6, letterSpacing: '-0.5px', margin: 0 }}>
                {WHY_NOA[activeWhy].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ RENEWABLE ENERGY WHEELING ══════════════════════════════════════════ */}
      <section data-parallax-section style={{ background: '#e9f2f2', borderRadius: 30, margin: '0 0 0', padding: '88px 0 0', overflow: 'hidden', position: 'relative' }}>

        {/* Centered heading */}
        <div className="anim-heading" style={{ textAlign: 'center', padding: '0 64px 72px' }}>
          <MaskLine>
            <h2 style={{
              fontFamily:   'Switzer, sans-serif',
              fontWeight:   400,
              fontSize:     'clamp(56px, 6.5vw, 96px)',
              letterSpacing: '-4.8px',
              lineHeight:   0.9,
              background:   'linear-gradient(to bottom, #00696e, rgba(0,105,110,0.22))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
            }}>
              Renewable<br />Energy Wheeling
            </h2>
          </MaskLine>
        </div>

        {/* Layered wave cards with content */}
        <div style={{ position: 'relative', margin: '0 64px', borderRadius: 30, overflow: 'hidden', minHeight: 680 }}>
          <img src={imgWave2} alt="" className="anim-parallax" style={{ position: 'absolute', inset: 0, width: '100%', height: '116%', top: '-8%', objectFit: 'cover', objectPosition: 'bottom' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(153,221,216,0.15)' }} />
          <img src={imgWave1} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom' }} />

          <div style={{ position: 'relative', zIndex: 1, padding: '120px 88px 88px' }}>
            <div className="anim-heading" style={{ marginBottom: 32 }}>
              <MaskLine>
                <div style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(56px, 6.5vw, 96px)', color: '#fff', letterSpacing: '-4.8px', lineHeight: 1.2 }}>
                  1. Energy Source
                </div>
              </MaskLine>
            </div>
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#e9f2f2', lineHeight: 1.25, letterSpacing: '-1px', maxWidth: 638, margin: '0 0 64px' }}>
              Wheeling is the transportation of energy from a renewable energy generating source, such as a wind or solar PV plant.
            </p>
            {/* CTA */}
            <div style={{ display: 'inline-grid', position: 'relative' }}>
              <div style={{ backdropFilter: 'blur(21px)', WebkitBackdropFilter: 'blur(21px)', background: 'rgba(0,0,0,0.17)', borderRadius: 24, height: 102, width: 436, gridColumn: 1, gridRow: 1 }} />
              <div style={{ gridColumn: 1, gridRow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>
                <Link href="/how-it-works" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 32, color: '#fff', letterSpacing: '-1px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  How it Works
                </Link>
                <svg viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={28} height={28} style={{ transform: 'rotate(-135deg)', flexShrink: 0 }}>
                  <line x1="3" y1="13" x2="13" y2="3" /><polyline points="6 3 13 3 13 10" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHO WE WORK WITH ══════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '88px 64px 64px', display: 'flex', flexDirection: 'column', gap: 60 }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Label text="WHO WE WORK WITH" />
          <div className="anim-heading">
            <MaskLine>
              <h2 style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(44px, 5vw, 72px)', color: '#00696e', letterSpacing: '-4.8px', margin: 0, lineHeight: 1, maxWidth: 800 }}>
                Bringing together key stakeholders across the energy ecosystem.
              </h2>
            </MaskLine>
          </div>
        </div>

        {/* 4 cards */}
        <div className="anim-card-group" style={{ display: 'flex', gap: 12 }}>
          {STAKEHOLDERS.map(s => (
            <div key={s.num} className="anim-card" style={{ flex: '1 0 0', background: 'rgba(0,0,0,0.05)', borderRadius: 24, padding: 40, minHeight: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 24, color: '#00696e', lineHeight: 1 }}>
                {s.num}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#00696e', letterSpacing: '-0.4px', margin: 0, lineHeight: 1 }}>
                  {s.label}
                </p>
                <div style={{ height: 1, background: 'rgba(0,0,0,0.12)' }} />
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: 'rgba(0,0,0,0.5)', letterSpacing: '-0.4px', lineHeight: 1.6, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Expert Advice CTA */}
        <div className="anim-fade" style={{ display: 'inline-flex', position: 'relative' }}>
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <div style={{ background: '#e9f2f2', borderRadius: 24, height: 86, width: 436, position: 'absolute', inset: 0 }} />
            <Link href="/contact" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 86, width: 436, textDecoration: 'none' }}>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#00696e', letterSpacing: '-1px', whiteSpace: 'nowrap' }}>Get Expert Advice</span>
              <svg viewBox="0 0 16 16" fill="none" stroke="#00696e" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={26} height={26} style={{ transform: 'rotate(-135deg)', flexShrink: 0 }}>
                <line x1="3" y1="13" x2="13" y2="3" /><polyline points="6 3 13 3 13 10" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ ESG / SUSTAINABILITY SNAPSHOT ═════════════════════════════════════ */}
      <section data-parallax-section style={{ position: 'relative', minHeight: 800, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        {/* Background photo */}
        <img src={imgSustainBg} alt="" className="anim-parallax" style={{ position: 'absolute', inset: 0, width: '100%', height: '116%', top: '-8%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, padding: '88px 64px', width: '100%', boxSizing: 'border-box' }}>

          {/* Left: Label + text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 469, flexShrink: 0 }}>
            <Label text="ESG / SUSTAINABILITY SNAPSHOT" dark />
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#fff', lineHeight: 1.3, letterSpacing: '-1px', margin: 0 }}>
              We build energy infrastructure with sustainability at its core.
            </p>
          </div>

          {/* Right: Glass stat card */}
          <div className="anim-fade" style={{ position: 'relative', width: 620, flexShrink: 0, borderRadius: 54, overflow: 'hidden', backdropFilter: 'blur(54px)', WebkitBackdropFilter: 'blur(54px)', background: 'rgba(255,255,255,0.1)', padding: '48px 56px 56px' }}>
            {/* Blurred image behind glass */}
            <img src={imgGlassBg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
              {/* Company tag */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 28 }}>
                <img src={imgWindIcon} alt="" style={{ width: 56, height: 56, objectFit: 'contain' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 24, color: '#99ddd8', lineHeight: 1 }}>Wind</span>
                  <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 24, color: '#fff', lineHeight: 1 }}>Acme Capital</span>
                </div>
              </div>
              {/* Big number */}
              <div style={{ overflow: 'hidden' }}>
                <span style={{
                  fontFamily:   'Switzer, sans-serif',
                  fontWeight:   200,
                  fontSize:     'clamp(120px, 14vw, 200px)',
                  lineHeight:   0.9,
                  letterSpacing: '-0.08em',
                  background:   'linear-gradient(to bottom, #fff, #99ddd8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'block',
                }}>
                  37%
                </span>
              </div>
              {/* Learn more */}
              <Link href="/about" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 24, color: '#fff', letterSpacing: '-0.5px' }}>LEARN MORE</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={22} height={22} style={{ transform: 'rotate(180deg)', flexShrink: 0 }}>
                  <line x1="3" y1="13" x2="13" y2="3" /><polyline points="6 3 13 3 13 10" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ INSIGHTS ══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '88px 64px', display: 'flex', flexDirection: 'column', gap: 60 }}>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
          {/* Left: heading + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 48 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Label text="INSIGHTS" />
              <div className="anim-heading">
                <MaskLine>
                  <h2 style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(44px, 5vw, 72px)', color: '#00696e', letterSpacing: '-4.8px', lineHeight: 1, margin: 0, maxWidth: 420 }}>
                    Thinking beyond the grid
                  </h2>
                </MaskLine>
              </div>
            </div>
            <div className="anim-fade" style={{ position: 'relative', display: 'inline-flex' }}>
              <div style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.05), rgba(0,0,0,0.05)), linear-gradient(90deg, #e9f2f2, #e9f2f2)', borderRadius: 24, height: 86, width: 396, position: 'absolute', inset: 0 }} />
              <Link href="/insights" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: 86, width: 396, textDecoration: 'none' }}>
                <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#00696e', letterSpacing: '-1px', whiteSpace: 'nowrap' }}>View all insights</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="#00696e" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={24} height={24} style={{ transform: 'rotate(-135deg)', flexShrink: 0 }}>
                  <line x1="3" y1="13" x2="13" y2="3" /><polyline points="6 3 13 3 13 10" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: Article cards */}
          <div className="anim-card-group" style={{ flex: 1, display: 'flex', gap: 32, maxWidth: 900 }}>
            {/* Article 1 */}
            <Link href="/insights/1" className="anim-card" style={{ flex: '1 0 0', background: 'rgba(0,0,0,0.05)', borderRadius: 30, padding: 24, display: 'flex', flexDirection: 'column', gap: 24, textDecoration: 'none', overflow: 'hidden', minHeight: 480 }}>
              <div style={{ flex: 1, borderRadius: 24, overflow: 'hidden', position: 'relative', minHeight: 260 }}>
                <img src={imgArticle1} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <img src={imgArticle1b} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 24, color: '#000', lineHeight: 1.4, margin: 0 }}>
                  NERSA grants trading license to NOA Trading
                </p>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: 'rgba(0,0,0,0.5)', lineHeight: 1.6, margin: 0 }}>
                  Approval granted at NERSA's Executive Committee Meeting on 31 January 2025.
                </p>
              </div>
            </Link>

            {/* Article 2 */}
            <Link href="/insights/2" className="anim-card" style={{ flex: '1 0 0', background: 'rgba(0,0,0,0.05)', borderRadius: 30, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 24, textDecoration: 'none', overflow: 'hidden', minHeight: 480 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 24, color: '#000', lineHeight: 1.4, margin: 0 }}>
                  Interview: Why energy strategy is core to mining
                </p>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: 'rgba(0,0,0,0.5)', lineHeight: 1.6, margin: 0 }}>
                  Derik Coetzer, Head of Growth, interviewed at Mining Indaba.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FAQ ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '88px 64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 60 }}>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, maxWidth: 670 }}>
          <Label text="FAQ" />
          <div className="anim-heading" style={{ textAlign: 'center', width: '100%' }}>
            <MaskLine>
              <h2 style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: 'rgba(0,0,0,0.5)', letterSpacing: '-1px', textAlign: 'center', lineHeight: 1.28, margin: 0 }}>
                What you need to know
              </h2>
            </MaskLine>
          </div>
        </div>

        <div className="anim-card-group" style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 670 }}>
          {FAQS.map((faq, i) => (
            <div key={i} className="anim-card" style={{ background: 'rgba(0,0,0,0.05)', borderRadius: 24, overflow: 'hidden' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', gap: 24, alignItems: 'flex-start', padding: '24px 28px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <p style={{ flex: 1, fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: '#000', letterSpacing: '-0.36px', lineHeight: 1.28, margin: 0 }}>
                  {faq.q}
                </p>
                <div style={{
                  flexShrink: 0, width: 32, height: 22, borderRadius: 12,
                  background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
                  transform: openFaq === i ? 'none' : 'rotate(180deg)',
                }}>
                  <img src={imgChevron} alt="" style={{ width: 14, height: 14 }} />
                </div>
              </button>
              <div style={{ overflow: 'hidden', maxHeight: openFaq === i ? 200 : 0, transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)' }}>
                <div style={{ padding: '0 28px 24px' }}>
                  <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: 'rgba(0,0,0,0.4)', letterSpacing: '-0.3px', lineHeight: 1.55, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CONTACT ════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '32px', background: '#fff' }}>
        <div style={{ position: 'relative', borderRadius: 30, overflow: 'hidden', minHeight: 880, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '240px 32px 32px' }}>
          {/* Background */}
          <img src={imgContactBg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 30 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', borderRadius: 30 }} />

          {/* Heading */}
          <div className="anim-heading" style={{ position: 'absolute', top: 64, left: 64, maxWidth: 760, zIndex: 1 }}>
            <MaskLine>
              <h2 style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(56px, 6.5vw, 96px)', color: '#82dfda', letterSpacing: '-4.8px', lineHeight: 0.96, margin: 0, display: 'block' }}>
                Take the next step toward
              </h2>
            </MaskLine>
            <MaskLine>
              <h2 style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(56px, 6.5vw, 96px)', color: '#82dfda', letterSpacing: '-4.8px', lineHeight: 0.96, margin: 0, display: 'block' }}>
                reliable energy
              </h2>
            </MaskLine>
          </div>

          {/* Form card */}
          <div className="anim-fade" style={{ position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', borderRadius: 32, padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Row 1: Name / Surname */}
            <div style={{ display: 'flex', gap: 48 }}>
              {(['Name*', 'Surname*'] as const).map(label => (
                <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <label style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: '#fff', letterSpacing: '-0.36px' }}>{label}</label>
                  <input
                    placeholder="Type here"
                    value={label === 'Name*' ? form.name : form.surname}
                    onChange={e => setForm(f => ({ ...f, [label === 'Name*' ? 'name' : 'surname']: e.target.value }))}
                    style={{ background: 'rgba(0,0,0,0.15)', border: 'none', borderRadius: 24, padding: '20px 24px', fontFamily: 'Switzer, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.5)', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
            </div>

            {/* Row 2: Company / How Can We Help */}
            <div style={{ display: 'flex', gap: 48 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: '#fff', letterSpacing: '-0.36px' }}>Company Name*</label>
                <input
                  placeholder="Type here"
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  style={{ background: 'rgba(0,0,0,0.15)', border: 'none', borderRadius: 24, padding: '20px 24px', fontFamily: 'Switzer, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.5)', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: '#fff', letterSpacing: '-0.36px' }}>How Can We Help?*</label>
                <select
                  value={form.help}
                  onChange={e => setForm(f => ({ ...f, help: e.target.value }))}
                  style={{ background: 'rgba(0,0,0,0.15)', border: 'none', borderRadius: 24, padding: '20px 24px', fontFamily: 'Switzer, sans-serif', fontSize: 16, color: form.help ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)', outline: 'none', width: '100%', boxSizing: 'border-box', cursor: 'pointer', appearance: 'none' }}
                >
                  <option value="" disabled>Select</option>
                  <option value="energy-trading">Energy Trading</option>
                  <option value="renewable-supply">Renewable Energy Supply</option>
                  <option value="project-dev">Project Development</option>
                  <option value="general">General Enquiry</option>
                </select>
              </div>
            </div>

            {/* Row 3: Email+Phone (left) / Message (right) */}
            <div style={{ display: 'flex', gap: 48, alignItems: 'stretch' }}>
              {/* Left: Email + Phone stacked */}
              <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  { label: 'Email Address *', key: 'email', placeholder: 'Type here' },
                  { label: 'Phone Number *',  key: 'phone', placeholder: 'Type here' },
                ].map(({ label, key, placeholder }) => (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <label style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: '#fff', letterSpacing: '-0.36px' }}>{label}</label>
                    <input
                      placeholder={placeholder}
                      value={form[key as 'email' | 'phone']}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      style={{ background: 'rgba(0,0,0,0.15)', border: 'none', borderRadius: 24, padding: '20px 24px', fontFamily: 'Switzer, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.5)', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                    />
                  </div>
                ))}
              </div>
              {/* Right: Message textarea */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: '#fff', letterSpacing: '-0.36px' }}>Message</label>
                <textarea
                  placeholder="Type here"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ background: 'rgba(0,0,0,0.15)', border: 'none', borderRadius: 24, padding: '20px 24px', fontFamily: 'Switzer, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.5)', outline: 'none', width: '100%', boxSizing: 'border-box', resize: 'none', flex: 1, minHeight: 120 }}
                />
              </div>
            </div>

            {/* Submit */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 34px', height: 84, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(54px)', WebkitBackdropFilter: 'blur(54px)', border: 'none', borderRadius: 24, cursor: 'pointer' }}
              >
                <span style={{ fontFamily: 'Switzer, sans-serif', fontSize: 24, color: '#fff', letterSpacing: '-1px', whiteSpace: 'nowrap' }}>Submit</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={22} height={22} style={{ transform: 'rotate(180deg)', flexShrink: 0 }}>
                  <line x1="3" y1="13" x2="13" y2="3" /><polyline points="6 3 13 3 13 10" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}
