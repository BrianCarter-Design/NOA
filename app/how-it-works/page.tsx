'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import HeroBg from '@/components/HeroBg';

const imgBackground = 'https://www.figma.com/api/mcp/asset/fd414098-c960-46ad-9b20-bb6a7d27987a';
const imgWheeling   = 'https://www.figma.com/api/mcp/asset/790d8452-c44b-4d33-84f3-d7e05be4937a';
const imgWave2      = 'https://www.figma.com/api/mcp/asset/ee13d354-716e-46ff-95fc-bd9762ee8217';
const imgWave1      = 'https://www.figma.com/api/mcp/asset/a74f6981-b7b2-4c4f-97ca-0ca4c5e41c37';
const imgHighway    = 'https://www.figma.com/api/mcp/asset/f358b8fa-c60f-4bda-abaa-f98b891b6575';
const imgContact    = 'https://www.figma.com/api/mcp/asset/5ab19176-d17a-4cd0-9db6-a789f6e690b5';
const imgArrow      = 'https://www.figma.com/api/mcp/asset/fc3db088-ab6f-49d6-99e7-44ea880eab93';
const imgPlay       = 'https://www.figma.com/api/mcp/asset/68949f0a-cb2d-4b4b-9201-f865cce7aa87';
const imgEcoEnergy  = 'https://www.figma.com/api/mcp/asset/1dba07c8-48aa-4801-a985-a409e890c76b';
const imgCoins      = 'https://www.figma.com/api/mcp/asset/c0f112b8-0d69-49f7-a45f-19b2b36f1c21';
const imgHomeIcon   = 'https://www.figma.com/api/mcp/asset/444a3fe9-4f91-4604-ade8-eeaf42c73cbd';
const imgSolarPanel = 'https://www.figma.com/api/mcp/asset/06fe5933-5e49-44b5-8d1d-16fddf8df5e5';
const imgMail       = 'https://www.figma.com/api/mcp/asset/b6a2d617-9c37-42a4-90fa-7e14072981a3';
const imgPhone      = 'https://www.figma.com/api/mcp/asset/e2eb0a77-365f-4b33-8c2e-89eb1f794f0f';
const imgLinkedIn   = 'https://www.figma.com/api/mcp/asset/cc6fc065-3469-43be-8a97-c22e8970cb72';
const imgLogo       = 'https://www.figma.com/api/mcp/asset/236b8d55-a004-496c-b0e2-2ca63c7e7ba8';
const imgChevron    = 'https://www.figma.com/api/mcp/asset/99914746-8324-41b2-ad90-8f7717a53885';

const faqs = [
  {
    q: 'Do I need to change my existing infrastructure to access wheeled energy?',
    a: 'No. Wheeling uses the existing national grid, so no major on-site infrastructure changes are required to start receiving renewable energy.',
  },
  {
    q: "Can renewable energy supply match my business's changing demand?",
    a: 'Yes. NOA designs energy solutions tailored to your consumption profile, with flexibility to accommodate seasonal and operational changes in demand.',
  },
  {
    q: 'Can wheeled renewable energy fully replace Eskom supply?',
    a: "In many cases, yes — particularly for large commercial and industrial users. NOA structures blended supply agreements that maximise renewable penetration while maintaining supply security.",
  },
];

/* ── Reusable masked-line component ──────────────────────────────────────── */
function MaskLine({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ overflow: 'hidden', paddingBottom: '0.05em', ...style }}>
      <div className="anim-mask-line" style={{ display: 'block', willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}

/* ── Label pill ──────────────────────────────────────────────────────────── */
function Label({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div
      className="anim-fade"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '8px 12px',
        borderRadius: 8,
        background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      }}
    >
      <span style={{
        fontFamily: 'Switzer, sans-serif',
        fontWeight: 500,
        fontSize: 14,
        letterSpacing: '0.05em',
        color: dark ? '#fff' : '#868686',
        whiteSpace: 'nowrap',
      }}>
        {text}
      </span>
    </div>
  );
}

/* ── Glass CTA button ────────────────────────────────────────────────────── */
function GlassCTA({ label, href = '#' }: { label: string; href?: string }) {
  return (
    <Link
      href={href}
      className="anim-fade"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 84,
        borderRadius: 24,
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(54px)',
        WebkitBackdropFilter: 'blur(54px)',
        textDecoration: 'none',
        width: '100%',
        flexShrink: 0,
      }}
    >
      <span style={{ fontFamily: 'Switzer, sans-serif', fontSize: 32, color: '#fff', letterSpacing: '-1px', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <div style={{ width: 30, height: 30, transform: 'rotate(135deg)', flexShrink: 0 }}>
        <img src={imgArrow} alt="" style={{ width: '100%', height: '100%' }} />
      </div>
    </Link>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* Set initial states immediately so no flash on paint */
    gsap.set('.anim-mask-line',  { y: '110%' });
    gsap.set('.anim-fade',       { opacity: 0, y: 32 });
    gsap.set('.anim-card',       { opacity: 0, y: 56 });
    gsap.set('.anim-image',      { opacity: 0, scale: 1.07 });

    /* ── Hero headline (immediate, no scroll) ── */
    gsap.to('.hiw-hero-line', {
      y: '0%',
      duration: 1.15,
      ease: 'power4.out',
      stagger: 0.12,
      delay: 0.35,
    });

    /* ── Masked heading reveals (grouped by .anim-heading parent) ── */
    gsap.utils.toArray<Element>('.anim-heading').forEach((heading) => {
      const lines = heading.querySelectorAll('.anim-mask-line');
      gsap.to(lines, {
        y: '0%',
        duration: 1.05,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: heading,
          start: 'top 87%',
          once: true,
        },
      });
    });

    /* ── Fade-up elements ── */
    gsap.utils.toArray<Element>('.anim-fade').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 91%',
          once: true,
        },
      });
    });

    /* ── Staggered card groups ── */
    gsap.utils.toArray<Element>('.anim-card-group').forEach((group) => {
      const cards = group.querySelectorAll('.anim-card');
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.18,
        scrollTrigger: {
          trigger: group,
          start: 'top 84%',
          once: true,
        },
      });
    });

    /* ── Image reveals ── */
    gsap.utils.toArray<Element>('.anim-image').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      });
    });

    /* ── Parallax backgrounds (scrub) ── */
    gsap.utils.toArray<Element>('.anim-parallax').forEach((el) => {
      gsap.fromTo(el,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: (el as HTMLElement).closest('[data-parallax-section]') || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    });

    /* ── "Why wheeling" paragraph text fade ── */
    gsap.utils.toArray<Element>('.anim-text-reveal').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div style={{ background: 'transparent', overflowX: 'hidden' }}>

      <HeroBg overlay="rgba(1,52,54,0.45)">
        <img src={imgBackground} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </HeroBg>

      {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 96px 80px',
        }}
      >

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
          {/* Left: heading */}
          <div style={{ flex: '1 0 0' }}>
            <div style={{ marginBottom: 20 }}>
              <Label text="HOW IT WORKS" dark />
            </div>
            <h1 style={{ margin: 0, fontFamily: 'Switzer, sans-serif', fontWeight: 400, lineHeight: 1 }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <div className="hiw-hero-line" style={{ fontSize: 'clamp(52px, 5.6vw, 80px)', color: '#fff', letterSpacing: '-0.04em', transform: 'translateY(110%)', willChange: 'transform' }}>
                  The system that
                </div>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <div className="hiw-hero-line" style={{ fontSize: 'clamp(52px, 5.6vw, 80px)', color: '#fff', letterSpacing: '-0.04em', transform: 'translateY(110%)', willChange: 'transform' }}>
                  powers it all
                </div>
              </div>
            </h1>
          </div>

          {/* Right: description + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48, flexShrink: 0, width: 376 }}>
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: '#fff', lineHeight: 1.6, textAlign: 'right', margin: 0 }}>
              Renewable energy wheeling is reshaping how renewable power is shared and accessed across existing electricity networks.
            </p>
            <GlassCTA label="Talk to an expert" href="/contact" />
          </div>
        </div>
      </section>

      {/* ═══ WHAT IS WHEELING ═══════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          background: '#fff',
          borderRadius: '30px 30px 0 0',
          marginTop: -30,
          display: 'flex',
          gap: 96,
          alignItems: 'stretch',
          padding: '88px 0 88px 96px',
          overflow: 'hidden',
          minHeight: 700,
          zIndex: 2,
        }}
      >
        <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 24, paddingBottom: 32 }}>
          <Label text="WHAT IS WHEELING" />
          <div className="anim-heading">
            <MaskLine style={{ marginBottom: 0 }}>
              <p style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(24px, 2.2vw, 32px)', fontWeight: 400, color: '#7d9798', lineHeight: 1.44, letterSpacing: '-1px', margin: 0 }}>
                Simply stated, wheeling is the transportation of energy from a generation site to an energy user via the existing Eskom or municipal grid.
              </p>
            </MaskLine>
          </div>
        </div>

        {/* Right: image with play button */}
        <div style={{ flex: '1 0 0', position: 'relative', borderRadius: '30px 0 0 30px', overflow: 'hidden', minHeight: 500 }}>
          <div style={{ position: 'absolute', inset: 0, background: '#013436' }} />
          <img
            src={imgWheeling}
            alt=""
            className="anim-image"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', bottom: 48, left: 0, right: 0, padding: '0 48px' }}>
            <button
              className="anim-fade"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 24px',
                height: 84,
                width: '100%',
                borderRadius: 24,
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(54px)',
                WebkitBackdropFilter: 'blur(54px)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 24, color: '#fff', letterSpacing: '-1px' }}>
                Play video
              </span>
              <img src={imgPlay} alt="" style={{ width: 24, height: 24 }} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══ RENEWABLE ENERGY WHEELING ══════════════════════════════════════ */}
      <section
        data-parallax-section
        style={{ position: 'relative', background: '#e9f2f2', padding: '80px 0 0', overflow: 'hidden' }}
      >
        {/* Gradient headline */}
        <div className="anim-heading" style={{ textAlign: 'center', padding: '0 96px 80px' }}>
          <MaskLine>
            <h2 style={{
              fontFamily: 'Switzer, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(48px, 6.7vw, 96px)',
              letterSpacing: '-4.8px',
              lineHeight: 0.9,
              background: 'linear-gradient(to bottom, #00696e, rgba(0,105,110,0.22))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
            }}>
              Renewable<br />Energy Wheeling
            </h2>
          </MaskLine>
        </div>

        {/* Layered wave cards with "1. Energy Source" */}
        <div style={{ position: 'relative', margin: '0 73px', borderRadius: 30, overflow: 'hidden', minHeight: 620 }}>
          <img
            src={imgWave2}
            alt=""
            className="anim-parallax"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '116%', top: '-8%', objectFit: 'cover', objectPosition: 'bottom' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(153,221,216,0.15)' }} />
          <img
            src={imgWave1}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom' }}
          />

          <div style={{ position: 'relative', zIndex: 1, padding: '120px 93px 88px' }}>
            <div className="anim-heading" style={{ marginBottom: 37 }}>
              <MaskLine>
                <div style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(60px, 6.7vw, 96px)', color: '#fff', letterSpacing: '-4.8px', lineHeight: 1.36 }}>
                  1. Energy Source
                </div>
              </MaskLine>
            </div>
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 32, color: '#e9f2f2', lineHeight: 1.25, letterSpacing: '-1px', maxWidth: 638, margin: 0 }}>
              Wheeling is the transportation of energy from a renewable energy generating source, such as a wind or solar PV plant.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ WHY DOES WHEELING MATTER ═══════════════════════════════════════ */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 60,
          padding: '88px 96px',
          background: '#fff',
        }}
      >
        <div className="anim-heading" style={{ maxWidth: 670, textAlign: 'center' }}>
          <MaskLine>
            <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 24, color: 'rgba(0,0,0,0.5)', letterSpacing: '-1px', lineHeight: 1.6, margin: 0 }}>
              Why does wheeling matter in South Africa?
            </p>
          </MaskLine>
        </div>
        <p className="anim-text-reveal" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(24px, 2.8vw, 40px)', color: '#00696e', lineHeight: 1.4, textAlign: 'center', maxWidth: 1000, margin: 0 }}>
          In 2022, DMRE removed the need for independent power producers to require a license to produce electricity. This has opened the national grid and enabled the private sector{' '}
          <span style={{ color: 'rgba(0,105,110,0.3)' }}>
            to participate in renewable energy distribution at scale...
          </span>
        </p>
      </section>

      {/* ═══ BENEFITS ═══════════════════════════════════════════════════════ */}
      <section
        data-parallax-section
        style={{ position: 'relative', background: '#fff', minHeight: 1060, overflow: 'hidden' }}
      >
        <img
          src={imgHighway}
          alt=""
          className="anim-parallax"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '116%', top: '-8%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(1,52,54,0.55)' }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', gap: 88, padding: '248px 96px 88px' }}>
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: 469 }}>
            <Label text="BENEFITS" dark />
            <div className="anim-heading">
              <MaskLine>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 'clamp(28px, 2.5vw, 36px)', color: '#fff', lineHeight: 1.11, letterSpacing: '-1px', margin: 0 }}>
                  It's cleaner, cost-effective, and more reliable than Eskom-generated fossil fuel energy
                </p>
              </MaskLine>
            </div>
          </div>

          {/* Right: cards */}
          <div className="anim-card-group" style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 48 }}>
            <div
              className="anim-card"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(54px)',
                WebkitBackdropFilter: 'blur(54px)',
                borderRadius: 54,
                padding: 64,
                display: 'flex',
                flexDirection: 'column',
                gap: 48,
                minHeight: 440,
              }}
            >
              <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                <img src={imgEcoEnergy} alt="" style={{ width: 72, height: 72, flexShrink: 0 }} />
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#fff', lineHeight: 1.46, margin: 0, maxWidth: 347 }}>
                  Decarbonisation targets &amp; ESG metrics
                </p>
              </div>
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 20, color: '#fff', lineHeight: 1.4, letterSpacing: '0.4px', margin: 0 }}>
                Our solution design allows NOA's portfolio of customers to reduce Scope 1 and Scope 2 emissions significantly. NOA's aggregator model allows for higher renewable energy penetration, utilising wheeling to enable large-scale...{' '}
                <span style={{ color: '#82dfda', textDecoration: 'underline', fontWeight: 500, cursor: 'pointer' }}>Read more</span>
              </p>
            </div>

            <div
              className="anim-card"
              style={{
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: 54,
                padding: 64,
                display: 'flex',
                flexDirection: 'column',
                gap: 48,
              }}
            >
              <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                <img src={imgCoins} alt="" style={{ width: 72, height: 72, flexShrink: 0 }} />
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#fff', lineHeight: 1.46, margin: 0 }}>
                  Energy cost savings
                </p>
              </div>
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 18, color: '#fff', lineHeight: 1.4, margin: 0, textAlign: 'justify' }}>
                NOA's wheeled renewable energy solutions can offer 10–50% cost savings versus Eskom's WEPS (Wholesale Energy Price System) tariff. In addition, NOA's energy prices are inflation-linked, ensuring predictable and manageable cost increases. Due to Eskom's often unpredictable and sharp price increases, NOA's portfolio of customers experience material cost savings over the length of their contracts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHEELING VS ONSITE SOLAR ════════════════════════════════════════ */}
      <section
        style={{
          background: '#fff',
          borderRadius: '30px 30px 0 0',
          marginTop: -30,
          position: 'relative',
          zIndex: 2,
          padding: '124px 96px',
          display: 'flex',
          gap: 88,
          alignItems: 'flex-start',
        }}
      >
        <div style={{ paddingTop: 16, flexShrink: 0 }}>
          <Label text="WHEELING VS ONSITE SOLAR" />
        </div>

        <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 88 }}>
          <div className="anim-heading">
            <MaskLine>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(40px, 4.4vw, 64px)', color: '#00696e', letterSpacing: '-4.8px', lineHeight: 1.0, display: 'block' }}>
                Different models,
              </span>
            </MaskLine>
            <MaskLine>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(40px, 4.4vw, 64px)', color: '#00696e', letterSpacing: '-4.8px', lineHeight: 1.0, display: 'block' }}>
                different energy outcomes
              </span>
            </MaskLine>
          </div>

          <div className="anim-card-group" style={{ display: 'flex', gap: 64 }}>
            <div className="anim-card" style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <img src={imgHomeIcon} alt="" style={{ width: 32, height: 32 }} />
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#00696e', letterSpacing: '-0.4px', margin: 0, lineHeight: 1 }}>Wheeling</p>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.12)' }} />
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: 'rgba(0,0,0,0.5)', letterSpacing: '-0.4px', lineHeight: 1.5, margin: 0 }}>
                Wheeling eliminates these arduous requirements by facilitating energy transportation from one or multiple energy-generating sites located anywhere in South Africa to the end user through the national grid.
              </p>
            </div>

            <div className="anim-card" style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <img src={imgSolarPanel} alt="" style={{ width: 32, height: 32 }} />
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#00696e', letterSpacing: '-0.4px', margin: 0, lineHeight: 1 }}>Onsite solar</p>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.12)' }} />
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: 'rgba(0,0,0,0.5)', letterSpacing: '-0.4px', lineHeight: 1.5, margin: 0 }}>
                Onsite renewable energy supply, such as rooftop solar PV ('behind the meter'), has been used extensively. Still, the amount of clean energy that can be supplied is often limited and capital-intensive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 60,
          padding: '88px 96px',
          background: '#fff',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, maxWidth: 670 }}>
          <Label text="FAQ" />
          <div className="anim-heading" style={{ textAlign: 'center', width: '100%' }}>
            <MaskLine>
              <h2 style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 30, color: 'rgba(0,0,0,0.5)', letterSpacing: '-1px', textAlign: 'center', lineHeight: 1.28, margin: 0 }}>
                What you need to know
              </h2>
            </MaskLine>
          </div>
        </div>

        <div className="anim-card-group" style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 670 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="anim-card"
              style={{ background: 'rgba(0,0,0,0.05)', borderRadius: 24, overflow: 'hidden' }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  gap: 24,
                  alignItems: 'flex-start',
                  padding: '24px 28px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <p style={{ flex: 1, fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 17, color: '#000', letterSpacing: '-0.36px', lineHeight: 1.28, margin: 0 }}>
                  {faq.q}
                </p>
                <div
                  style={{
                    flexShrink: 0,
                    width: 32,
                    height: 22,
                    borderRadius: 12,
                    background: 'rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
                    transform: openFaq === i ? 'none' : 'rotate(180deg)',
                  }}
                >
                  <img src={imgChevron} alt="" style={{ width: 14, height: 14 }} />
                </div>
              </button>
              <div
                style={{
                  overflow: 'hidden',
                  maxHeight: openFaq === i ? 200 : 0,
                  transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)',
                }}
              >
                <div style={{ padding: '0 28px 24px' }}>
                  <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 15, color: 'rgba(0,0,0,0.4)', letterSpacing: '-0.3px', lineHeight: 1.38, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CONTACT CTA ════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: 32 }}>
        <div
          style={{
            position: 'relative',
            borderRadius: 30,
            overflow: 'hidden',
            minHeight: 463,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: 64,
          }}
        >
          <img
            src={imgContact}
            alt=""
            className="anim-image"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="anim-heading" style={{ position: 'relative', maxWidth: 764 }}>
            <MaskLine>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(44px, 5vw, 72px)', color: '#82dfda', letterSpacing: '-4.8px', lineHeight: 0.96, display: 'block' }}>
                Ready to see what this
              </span>
            </MaskLine>
            <MaskLine>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(44px, 5vw, 72px)', color: '#82dfda', letterSpacing: '-4.8px', lineHeight: 0.96, display: 'block' }}>
                could look like for you?
              </span>
            </MaskLine>
          </div>
          <div style={{ position: 'relative', flexShrink: 0, width: 376 }}>
            <GlassCTA label="See what's possible" href="/contact" />
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═════════════════════════════════════════════════════════ */}
      <footer style={{ background: '#fff', padding: '0 24px 24px' }}>
        <div
          style={{
            background: '#013436',
            borderRadius: 30,
            padding: '88px 88px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 120,
          }}
        >
          <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 21.6, color: '#fff', lineHeight: 1.67, maxWidth: 423, margin: 0 }}>
                NOA is a South African renewable energy IPP, aggregator and energy trader delivering flexible clean energy solutions with a licensed trading platform.
              </p>
              <Link href="/about" className="anim-fade" style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 17.2, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                  LEARN MORE ABOUT US
                </span>
                <div style={{ height: 2, background: '#fff', width: '100%' }} />
              </Link>
            </div>

            <div className="anim-card-group" style={{ display: 'flex', gap: 80, alignItems: 'flex-start', flexShrink: 0 }}>
              <div className="anim-card" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#82dfda', margin: 0 }}>Company</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {['How it works', 'About', 'Projects', 'Insights', 'Careers'].map(item => (
                    <Link key={item} href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                      style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                      {item}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="anim-card" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#82dfda', margin: 0 }}>Solutions</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {['Overview', 'Investors', 'IPPs', 'Off-takers', 'Partners'].map(item => (
                    <Link key={item} href={`/solutions/${item.toLowerCase()}`}
                      style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                      {item}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="anim-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 200 }}>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#82dfda', margin: 0 }}>Contact us</p>
                {[
                  { icon: imgMail,     label: 'contact@noa.com' },
                  { icon: imgPhone,    label: '(000) 000 - 0000' },
                  { icon: imgLinkedIn, label: 'LinkedIn' },
                ].map(({ icon, label }) => (
                  <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 4, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <img src={icon} alt="" style={{ width: 24, height: 24 }} />
                    </div>
                    <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: '#fff', textDecoration: 'underline', whiteSpace: 'nowrap' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="anim-fade" style={{ width: '100%', aspectRatio: '359/119', overflow: 'hidden' }}>
              <img src={imgLogo} alt="NOA" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'left' }} />
            </div>
            <div style={{ borderTop: '1px solid #737373', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, paddingBottom: 24 }}>
              <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#fff', textDecoration: 'underline', margin: 0 }}>
                Copyright © 2026 NOA Group
              </p>
              <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#fff', margin: 0 }}>
                All Rights Reserved{' '}
                <span style={{ textDecoration: 'underline' }}>|</span>{' '}
                <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms and Conditions</span>{' '}
                <span style={{ textDecoration: 'underline' }}>|</span>{' '}
                <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
