'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import HeroBg from '@/components/HeroBg';

/* ── Figma assets ─────────────────────────────────────────────────────────── */
const imgBackground   = 'https://www.figma.com/api/mcp/asset/742bf7d4-cc54-476d-811a-04b20a8506a6';
const imgBgSection    = 'https://www.figma.com/api/mcp/asset/67c7911a-3652-443c-82dc-b7210e7355ef';
const imgHeadingBg    = 'https://www.figma.com/api/mcp/asset/41c7bf8b-687e-4848-a7b1-c3c2253fd74e';
const imgWave         = 'https://www.figma.com/api/mcp/asset/c3a62ee4-3cdb-4738-bdb9-c1cd546f05b1';
const imgArrow        = 'https://www.figma.com/api/mcp/asset/7355a331-d76b-4702-8d6a-506dbf34614f';
const imgArrowLight   = 'https://www.figma.com/api/mcp/asset/db07f5ed-749d-4f0b-b118-4dd38415aaa6';
const imgArrowGrey    = 'https://www.figma.com/api/mcp/asset/a1335ee4-1e9a-4e67-a291-f1c22ada49f1';
const imgArrowGreen   = 'https://www.figma.com/api/mcp/asset/c3dae58a-8b4e-4ce5-a42a-673ec53bea8d';
const imgArrowCTA     = 'https://www.figma.com/api/mcp/asset/9f7395ac-d0bc-4329-894a-e944f04aac1e';
const imgAvatar       = 'https://www.figma.com/api/mcp/asset/e0689173-fc46-4da6-9ad0-12bdc6d48d56';
const imgCompanyLogo  = 'https://www.figma.com/api/mcp/asset/fd8577db-b188-45a3-8ac4-d4437af17f3a';
const imgChevron      = 'https://www.figma.com/api/mcp/asset/9277d041-3819-42ae-90a6-da9e63598321';
const imgMail         = 'https://www.figma.com/api/mcp/asset/78eb588d-c9e2-44eb-a10d-1d87cce4a3a2';
const imgPhone        = 'https://www.figma.com/api/mcp/asset/e75350cf-61c2-4c4f-9e00-4825d555eb1c';
const imgLinkedIn     = 'https://www.figma.com/api/mcp/asset/82307a4c-67e0-42d5-b9bb-fb5ed088724f';
const imgLogo         = 'https://www.figma.com/api/mcp/asset/8b774586-47e6-4c02-bc8a-b7980fe934aa';

/* ── Data ─────────────────────────────────────────────────────────────────── */
const stakeholders = [
  {
    num: '01', title: 'Investors', dark: true,
    desc: 'People or organisations who fund NOA\'s projects and earn returns from their performance.',
    href: '/solutions/investors',
  },
  {
    num: '02', title: 'IPPs', dark: false,
    desc: 'Energy producers who develop and operate power projects, often working alongside NOA.',
    href: '/solutions/ipps',
  },
  {
    num: '03', title: 'Off-takers', dark: false,
    desc: 'Businesses that buy the energy generated through long-term supply agreements.',
    href: '/solutions/off-takers',
  },
  {
    num: '04', title: 'Partners', dark: false,
    desc: 'Companies that work with NOA to help build, deliver, or scale energy projects.',
    href: '/solutions/partners',
  },
];

const differentiators = [
  {
    title: 'Aggregator Model',
    body: 'NOA aggregates renewable energy from wind, solar PV and battery energy generation facilities situated in optimal locations across South Africa to provide significantly higher and consistent volumes of renewable energy.',
  },
  {
    title: 'Customisation',
    body: 'Every energy solution is designed around your specific consumption profile, site requirements, and commercial objectives — no two contracts are identical.',
  },
  {
    title: 'Flexible Solutions',
    body: 'From short-term supply agreements to long-term PPAs, NOA structures contracts that fit your business model and risk appetite.',
  },
  {
    title: 'Speed of Supply',
    body: 'Through NOA\'s established network of generation assets and grid connections, we can deliver wheeled renewable energy faster than traditional development timelines.',
  },
  {
    title: 'Balance Sheet Friendly',
    body: 'Our off-balance-sheet structures mean you get the benefits of renewable energy without the capital expenditure associated with owning generation assets.',
  },
];

const faqs = [
  {
    q: 'Do I need to own energy assets to work with NOA?',
    a: 'No. NOA enables access to renewable energy whether you generate it, purchase it, or manage energy across multiple sites.',
  },
  {
    q: 'What makes NOA different from traditional energy providers?',
    a: 'NOA combines an aggregator model with a licensed trading platform, enabling greater renewable penetration, better pricing, and flexible supply structures that traditional utilities cannot offer.',
  },
  {
    q: 'Can NOA solutions be scaled across multiple locations?',
    a: 'Yes. Our wheeling infrastructure and aggregator model are designed to serve multi-site businesses, with consolidated billing and reporting across all locations.',
  },
];

/* ── Shared primitives ────────────────────────────────────────────────────── */
function MaskLine({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ overflow: 'hidden', paddingBottom: '0.05em', ...style }}>
      <div className="anim-mask-line" style={{ display: 'block', willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}

function Label({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div className="anim-fade" style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 12px', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
      <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 14, letterSpacing: '0.05em', color: dark ? '#fff' : '#868686', whiteSpace: 'nowrap' }}>
        {text}
      </span>
    </div>
  );
}

function GlassCTA({ label, href = '#' }: { label: string; href?: string }) {
  return (
    <Link href={href} className="anim-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 84, borderRadius: 24, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(54px)', WebkitBackdropFilter: 'blur(54px)', textDecoration: 'none', width: '100%', flexShrink: 0 }}>
      <span style={{ fontFamily: 'Switzer, sans-serif', fontSize: 32, color: '#fff', letterSpacing: '-1px', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ width: 30, height: 30, transform: 'rotate(135deg)', flexShrink: 0 }}>
        <img src={imgArrow} alt="" style={{ width: '100%', height: '100%' }} />
      </div>
    </Link>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#fff', padding: '0 24px 24px' }}>
      <div style={{ background: '#013436', borderRadius: 30, padding: '88px 88px 20px', display: 'flex', flexDirection: 'column', gap: 120 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 20, color: '#fff', lineHeight: 1.67, maxWidth: 423, margin: 0 }}>
              NOA is a South African renewable energy IPP, aggregator and energy trader delivering flexible clean energy solutions with a licensed trading platform.
            </p>
            <Link href="/about" className="anim-fade" style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>LEARN MORE ABOUT US</span>
              <div style={{ height: 2, background: '#fff' }} />
            </Link>
          </div>
          <div className="anim-card-group" style={{ display: 'flex', gap: 80, alignItems: 'flex-start', flexShrink: 0 }}>
            {[
              { label: 'Company', links: ['How it works', 'About', 'Projects', 'Insights', 'Careers'] },
              { label: 'Solutions', links: ['Overview', 'Investors', 'IPPs', 'Off-takers', 'Partners'] },
            ].map(col => (
              <div key={col.label} className="anim-card" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#82dfda', margin: 0 }}>{col.label}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {col.links.map(item => (
                    <Link key={item} href={`/${item.toLowerCase().replace(/ /g, '-')}`} style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap' }}>{item}</Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="anim-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 200 }}>
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#82dfda', margin: 0 }}>Contact us</p>
              {[{ icon: imgMail, label: 'contact@noa.com' }, { icon: imgPhone, label: '(000) 000 - 0000' }, { icon: imgLinkedIn, label: 'LinkedIn' }].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 4, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img src={icon} alt="" style={{ width: 24, height: 24 }} />
                  </div>
                  <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: '#fff', textDecoration: 'underline', whiteSpace: 'nowrap' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="anim-fade" style={{ width: '100%', aspectRatio: '359/119' }}>
            <img src={imgLogo} alt="NOA" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'left' }} />
          </div>
          <div style={{ borderTop: '1px solid #737373', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, paddingBottom: 24 }}>
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#fff', textDecoration: 'underline', margin: 0 }}>Copyright © 2026 NOA Group</p>
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#fff', margin: 0 }}>
              All Rights Reserved <span style={{ textDecoration: 'underline' }}>|</span> <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms and Conditions</span> <span style={{ textDecoration: 'underline' }}>|</span> <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function SolutionsOverview() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [openFaq, setOpenFaq]     = useState<number | null>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.anim-mask-line', { y: '110%' });
    gsap.set('.anim-fade',      { opacity: 0, y: 32 });
    gsap.set('.anim-card',      { opacity: 0, y: 56 });
    gsap.set('.anim-image',     { opacity: 0, scale: 1.07 });

    /* Hero headline */
    gsap.to('.sol-hero-line', { y: '0%', duration: 1.15, ease: 'power4.out', stagger: 0.1, delay: 0.35 });

    /* Masked headings */
    gsap.utils.toArray<Element>('.anim-heading').forEach(heading => {
      gsap.to(heading.querySelectorAll('.anim-mask-line'), {
        y: '0%', duration: 1.05, ease: 'power4.out', stagger: 0.1,
        scrollTrigger: { trigger: heading, start: 'top 87%', once: true },
      });
    });

    /* Fade-up */
    gsap.utils.toArray<Element>('.anim-fade').forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 91%', once: true },
      });
    });

    /* Staggered cards */
    gsap.utils.toArray<Element>('.anim-card-group').forEach(group => {
      gsap.to(group.querySelectorAll('.anim-card'), {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: group, start: 'top 84%', once: true },
      });
    });

    /* Image reveals */
    gsap.utils.toArray<Element>('.anim-image').forEach(el => {
      gsap.to(el, {
        opacity: 1, scale: 1, duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    /* Parallax */
    gsap.utils.toArray<Element>('.anim-parallax').forEach(el => {
      gsap.fromTo(el,
        { yPercent: -8 },
        { yPercent: 8, ease: 'none', scrollTrigger: { trigger: (el as HTMLElement).closest('[data-parallax-section]') || el, start: 'top bottom', end: 'bottom top', scrub: 1.5 } }
      );
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  /* Swap differentiator content with a quick GSAP crossfade */
  const handleDiffClick = (i: number) => {
    if (i === activeIdx) return;
    const panel = document.getElementById('diff-panel');
    if (!panel) { setActiveIdx(i); return; }
    gsap.to(panel, { opacity: 0, y: 12, duration: 0.2, ease: 'power2.in', onComplete: () => {
      setActiveIdx(i);
      gsap.fromTo(panel, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' });
    }});
  };

  return (
    <div style={{ background: 'transparent', overflowX: 'hidden' }}>

      <HeroBg overlay="rgba(1,52,54,0.5)">
        <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}>
          <source src="/assets/43633-436237650_medium.mp4" type="video/mp4" />
        </video>
      </HeroBg>

      {/* ═══ HERO ════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', background: 'transparent', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 96px 80px' }}>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
          <div style={{ flex: '1 0 0' }}>
            <div style={{ marginBottom: 20 }}><Label text="SOLUTIONS" dark /></div>
            <h1 style={{ margin: 0, fontFamily: 'Switzer, sans-serif', fontWeight: 400, lineHeight: 1 }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <div className="sol-hero-line" style={{ fontSize: 'clamp(48px, 5.5vw, 80px)', color: '#fff', letterSpacing: '-0.04em', transform: 'translateY(110%)', willChange: 'transform' }}>Powering every part</div>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <div className="sol-hero-line" style={{ fontSize: 'clamp(48px, 5.5vw, 80px)', color: '#fff', letterSpacing: '-0.04em', transform: 'translateY(110%)', willChange: 'transform' }}>of the energy value chain</div>
              </div>
            </h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48, flexShrink: 0, width: 376 }}>
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#fff', lineHeight: 1.6, textAlign: 'right', margin: 0 }}>
              We make it easier to generate, trade, and use renewable energy across different parts of the market through flexible, connected solutions.
            </p>
            <GlassCTA label="Talk to an expert" href="/contact" />
          </div>
        </div>
      </section>

      {/* ═══ WHO WE WORK WITH ════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', background: '#fff', borderRadius: '30px 30px 0 0', marginTop: -30, zIndex: 2, padding: '88px 64px', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 60 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Label text="WHO WE WORK WITH" />
            <div className="anim-heading">
              <MaskLine>
                <h2 style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(44px, 5vw, 72px)', color: '#00696e', letterSpacing: '-4.8px', lineHeight: 1.1, margin: 0, maxWidth: 1007 }}>
                  Bringing together key stakeholders across the energy ecosystem.
                </h2>
              </MaskLine>
            </div>
          </div>

          {/* Stakeholder cards */}
          <div className="anim-card-group" style={{ display: 'flex', gap: 12 }}>
            {stakeholders.map(({ num, title, dark, desc, href }) => (
              <Link
                key={num}
                href={href}
                className="anim-card"
                style={{
                  flex: '1 0 0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: 350,
                  padding: 40,
                  borderRadius: 24,
                  background: dark ? '#013436' : 'rgba(0,0,0,0.05)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'Switzer, sans-serif', fontSize: 24, color: dark ? '#fff' : 'rgba(0,0,0,0.5)' }}>{num}</span>
                  <img src={dark ? imgArrowLight : imgArrowGrey} alt="" style={{ width: 30, height: 30 }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: dark ? '#fff' : '#00696e', letterSpacing: '-0.4px', lineHeight: 1, margin: 0 }}>{title}</p>
                  <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: dark ? '#fff' : 'rgba(0,0,0,0.5)', letterSpacing: '-0.4px', lineHeight: 1.5, margin: 0 }}>{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY NOA ═════════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '88px 64px 124px', borderRadius: '0 0 30px 30px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 123 }}>

          {/* Top row: label + description */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Label text="WHY NOA?" />
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: 'rgba(0,0,0,0.5)', letterSpacing: '-1px', lineHeight: 1.28, textAlign: 'right', maxWidth: 637, margin: 0 }}>
              NOA differentiates itself by offering its portfolio of customers cutting-edge solutions.
            </p>
          </div>

          {/* Interactive differentiators */}
          <div style={{ display: 'flex', gap: 88, alignItems: 'flex-start' }}>
            {/* Left: list */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 0 }}>
              {differentiators.map((d, i) => (
                <button
                  key={d.title}
                  onClick={() => handleDiffClick(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 16,
                    padding: '12px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'right',
                    borderBottom: i < differentiators.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                  }}
                >
                  {i === activeIdx && (
                    <div style={{ width: 30, height: 30, transform: 'rotate(135deg)', flexShrink: 0, opacity: 1 }}>
                      <img src={imgArrowGreen} alt="" style={{ width: '100%', height: '100%' }} />
                    </div>
                  )}
                  <span
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      fontWeight: 400,
                      fontSize: 'clamp(36px, 3.8vw, 52px)',
                      letterSpacing: '-1px',
                      lineHeight: 1.25,
                      color: i === activeIdx ? '#00696e' : 'rgba(125,151,152,0.5)',
                      transition: 'color 0.3s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {d.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Right: content panel */}
            <div id="diff-panel" style={{ flexShrink: 0, width: 436, display: 'flex', flexDirection: 'column', gap: 51 }}>
              {/* Wave image */}
              <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '1420/910', position: 'relative', background: '#e9f2f2' }}>
                <img src={imgWave} alt="" className="anim-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {/* Description */}
              <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 20, color: '#5f7374', letterSpacing: '-1px', lineHeight: 1.4, margin: 0 }}>
                {differentiators[activeIdx].body}
              </p>
              {/* See our story CTA */}
              <Link
                href="/about"
                className="anim-fade"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 32px',
                  borderRadius: 24,
                  background: '#e9f2f2',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontFamily: 'Switzer, sans-serif', fontSize: 32, color: '#00696e', letterSpacing: '-1px' }}>See our story</span>
                <div style={{ width: 30, height: 30, transform: 'rotate(135deg)', flexShrink: 0 }}>
                  <img src={imgArrowCTA} alt="" style={{ width: '100%', height: '100%' }} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BUILT ON REAL-WORLD OUTCOMES ════════════════════════════════════ */}
      <section data-parallax-section style={{ position: 'relative', background: '#013436', overflow: 'hidden', padding: '180px 96px 96px', display: 'flex', flexDirection: 'column', gap: 120, alignItems: 'center' }}>
        <img src={imgBgSection} alt="" className="anim-parallax" style={{ position: 'absolute', inset: 0, width: '160%', height: '150%', top: 0, left: 0, objectFit: 'cover', objectPosition: 'top left', pointerEvents: 'none', opacity: 0.8 }} />

        {/* Heading with background-clip image fill */}
        <div className="anim-heading" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 826 }}>
          <MaskLine>
            <h2
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(56px, 6.5vw, 96px)',
                letterSpacing: '-4.8px',
                lineHeight: 0.85,
                backgroundImage: `url('${imgHeadingBg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
                textAlign: 'center',
              }}
            >
              Built on real-world outcomes
            </h2>
          </MaskLine>
        </div>

        {/* Testimonial card */}
        <div
          className="anim-fade"
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: 1200,
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            borderRadius: 32,
            padding: 48,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {/* Quote + link */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 48 }}>
              <blockquote style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#7d9798', letterSpacing: '-1px', lineHeight: 1.25, margin: 0, maxWidth: 849 }}>
                <span style={{ color: '#fff' }}>"Lorem ipsum dolor sit amet consectetur. Dolor venenatis lectus nec aliquam tristique vitae id</span>
                {'. Pulvinar amet eu mauris aliquam non. Dictum lectus risus vestibulum.'}
                <span style={{ color: '#fff' }}>"</span>
              </blockquote>
              <Link href="/projects" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 24, borderRadius: 24, textDecoration: 'none', flexShrink: 0, whiteSpace: 'nowrap' }}>
                <span style={{ fontFamily: 'Switzer, sans-serif', fontSize: 24, color: '#fff', letterSpacing: '-1px' }}>See project</span>
                <div style={{ width: 30, height: 30, transform: 'rotate(180deg)', flexShrink: 0 }}>
                  <img src={imgArrow} alt="" style={{ width: '100%', height: '100%' }} />
                </div>
              </Link>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.15)' }} />

            {/* Attribution */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ width: 56, height: 56, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                <img src={imgAvatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: '#fff', margin: '0 0 4px' }}>John Clark</p>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#fff', margin: 0 }}>Sustainability leadership at Project name</p>
              </div>
              <img src={imgCompanyLogo} alt="" style={{ height: 22, width: 'auto', flexShrink: 0 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═════════════════════════════════════════════════════════════ */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 60, padding: '88px 96px', background: '#fff', borderRadius: '30px 30px 0 0', marginTop: -30, position: 'relative', zIndex: 2 }}>
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
          {faqs.map((faq, i) => (
            <div key={i} className="anim-card" style={{ background: 'rgba(0,0,0,0.05)', borderRadius: 24, overflow: 'hidden' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', gap: 24, alignItems: 'flex-start', padding: '24px 28px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <p style={{ flex: 1, fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: '#000', letterSpacing: '-0.36px', lineHeight: 1.28, margin: 0 }}>{faq.q}</p>
                <div style={{ flexShrink: 0, width: 32, height: 22, borderRadius: 12, background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)', transform: openFaq === i ? 'none' : 'rotate(180deg)' }}>
                  <img src={imgChevron} alt="" style={{ width: 14, height: 14 }} />
                </div>
              </button>
              <div style={{ overflow: 'hidden', maxHeight: openFaq === i ? 200 : 0, transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)' }}>
                <div style={{ padding: '0 28px 24px' }}>
                  <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: 'rgba(0,0,0,0.4)', letterSpacing: '-0.3px', lineHeight: 1.38, margin: 0 }}>{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
