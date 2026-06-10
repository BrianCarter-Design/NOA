'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Link from 'next/link';
import Footer from '@/components/Footer';

/* ── Assets (from Figma node 310:1481) ───────────────────────────────────── */
const imgWhatIs       = 'https://www.figma.com/api/mcp/asset/ec3a067b-cb47-497f-b735-2dc762506ab5';
const imgREWBg        = '/assets/REW2.jpg';
const imgBenefitsBg   = 'https://www.figma.com/api/mcp/asset/920d7ab8-4e2c-43a4-b8e5-6fc4edabdbd4';
// Benefit card icons — from Figma node 420-1378
const imgBioEnergy    = 'https://www.figma.com/api/mcp/asset/8829a963-b247-46fa-ae06-933e81dbb271';
const imgWindTurbine  = 'https://www.figma.com/api/mcp/asset/4b1316f0-9823-4232-bf85-6a3b97704113';
const imgShieldEnergy = 'https://www.figma.com/api/mcp/asset/7dbe2c11-5782-4e11-9f4c-3d369b4381fe';
const imgSolarEnergy  = 'https://www.figma.com/api/mcp/asset/186c52fd-a5fd-4a28-b36a-03a2e878a23f';
// Wheeling vs Onsite Solar section icons
const imgSolarPanel   = 'https://www.figma.com/api/mcp/asset/cfff42d8-21b6-4cc8-a012-26f0a19441aa';
const imgElectricHome = 'https://www.figma.com/api/mcp/asset/db13fd69-a2db-487f-8458-96a6f7d19bad';
const imgContactBg    = 'https://www.figma.com/api/mcp/asset/894c7cb2-153c-4b6e-9e52-0cfcb548a9ef';
const imgChevron      = 'https://www.figma.com/api/mcp/asset/99914746-8324-41b2-ad90-8f7717a53885';

/* ── Data ────────────────────────────────────────────────────────────────── */
const REW_STEPS = [
  { num: '01', label: 'Energy source',     desc: 'Wheeling is the transportation of energy from a renewable energy generating source, such as a wind or solar PV plant.' },
  { num: '02', label: 'Grid transmission', desc: 'The electricity travels via an existing distribution and transmission grid across the country.' },
  { num: '03', label: 'End user delivery', desc: 'Delivered to an end user in a different location, using the national grid.' },
];

const BENEFITS_CARDS = [
  { icon: imgBioEnergy,    title: 'Decarbonisation targets\nand ESG metrics', desc: "Our solution design allows NOA's portfolio of customers to reduce Scope 1 and Scope 2 emissions significantly. NOA's aggregator model allows for higher renewable energy penetration, utilising wheeling to enable large-scale renewable energy delivery." },
  { icon: imgWindTurbine,  title: 'Energy cost savings',                    desc: "NOA's wheeled renewable energy solutions can offer 10–50% cost savings versus Eskom's WEPS tariff. In addition, NOA's energy prices are inflation-linked, ensuring predictable and manageable long-term energy costs." },
  { icon: imgShieldEnergy, title: 'Reliable',                               desc: 'With NOA aggregating renewable energy from multiple sites, customers have a more reliable supply. Wheeling enables NOA to develop large-scale projects at optimal locations throughout South Africa and reliably supply this energy to customers.' },
  { icon: imgSolarEnergy,  title: 'Quicker and simple',                     desc: "NOA is developing its own assets and has agreements to purchase energy from trusted third-party IPPs. Over the next few years, NOA's fleet of generation facilities will reach commercial operations, enabling faster onboarding." },
];

const FAQS = [
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

/* ── Primitives ──────────────────────────────────────────────────────────── */
const sw: React.CSSProperties = { fontFamily: 'Switzer, sans-serif' };
const inter: React.CSSProperties = { fontFamily: 'Inter, Switzer, sans-serif' };

function Label({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div className="anim-fade" style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 12px', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
      <span style={{ ...sw, fontWeight: 500, fontSize: 14, letterSpacing: '0.05em', color: dark ? 'rgba(255,255,255,0.5)' : '#737373' }}>{text}</span>
    </div>
  );
}

function MaskLine({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ overflow: 'hidden', paddingBottom: '0.05em', ...style }}>
      <div className="anim-mask-line" style={{ display: 'block', willChange: 'transform' }}>{children}</div>
    </div>
  );
}

function Arrow({ size = 18, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={size} height={size} style={{ transform: 'rotate(-135deg)', flexShrink: 0 }}>
      <line x1="3" y1="13" x2="13" y2="3" /><polyline points="6 3 13 3 13 10" />
    </svg>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
/* ── Page ────────────────────────────────────────────────────────────────── */
export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    gsap.set('.anim-fade',  { opacity: 0, y: 24 });
    gsap.set('.anim-card',  { opacity: 0, y: 48 });
    gsap.set('.anim-image', { opacity: 0, scale: 1.06 });
    gsap.set('.anim-line',  { scaleX: 0, transformOrigin: 'left' });

    /* Hero lines — fire on load */
    gsap.to('.hiw-hero-line', { y: '0%', duration: 1.15, ease: 'power4.out', stagger: 0.1, delay: 0.3 });

    /* Section headings — word-by-word mask-up (matches home page) */
    const wordInstances: SplitText[] = [];
    gsap.utils.toArray<Element>('.anim-heading-words').forEach(el => {
      const split = new SplitText(el, { type: 'words' });
      wordInstances.push(split);
      split.words.forEach((word: Element) => {
        const shell = document.createElement('span');
        shell.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;';
        word.parentNode!.insertBefore(shell, word);
        shell.appendChild(word);
        (word as HTMLElement).style.display = 'inline-block';
      });
      gsap.set(split.words, { y: '110%', opacity: 0 });
      gsap.to(split.words, {
        y: '0%', opacity: 1,
        duration: 0.85, ease: 'power3.out', stagger: 0.055,
        scrollTrigger: { trigger: el, start: 'top 87%', once: true },
      });
    });
    gsap.utils.toArray<Element>('.anim-fade').forEach(el => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 91%', once: true },
      });
    });
    gsap.utils.toArray<Element>('.anim-card-group').forEach(group => {
      gsap.to(group.querySelectorAll('.anim-card'), {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: group, start: 'top 84%', once: true },
      });
    });
    gsap.utils.toArray<Element>('.anim-image').forEach(el => {
      gsap.to(el, { opacity: 1, scale: 1, duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
    gsap.utils.toArray<Element>('.anim-parallax').forEach(el => {
      gsap.fromTo(el, { yPercent: -8 }, {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: (el as HTMLElement).closest('[data-parallax-section]') || el, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
    });
    gsap.utils.toArray<Element>('.anim-line').forEach(el => {
      gsap.to(el, { scaleX: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });

    /* ── Benefits parallax ──────────────────────────────────────────────────
        Section is 100vh. Right-hand cards column starts off-screen below and
        translates upward as the user scrolls through the section, so all
        cards pass through the viewport before the next section appears.
    ── */
    const benefitsSection  = document.querySelector<HTMLElement>('.benefits-section');
    const benefitsParallax = document.querySelector<HTMLElement>('.benefits-parallax');
    const benefitsHeading  = document.querySelector<HTMLElement>('.benefits-heading');
    if (benefitsSection && benefitsParallax) {
      const setParallax = () => {
        const vh        = window.innerHeight;
        const cardsH    = benefitsParallax.scrollHeight;
        // Cards start at top:140vh (well below the section). Travel must move
        // them all the way past the top of the section so every card passes through.
        const startOffset = 1.4 * vh;          // matches `top: 140vh` above
        const travel      = startOffset + cardsH;

        gsap.fromTo(benefitsParallax,
          { y: 0 },
          {
            y: -travel,
            ease: 'none',
            scrollTrigger: {
              trigger: benefitsSection,
              start:   'top bottom',
              end:     'bottom top',
              scrub:   1,
              invalidateOnRefresh: true,
            },
          }
        );

        // Heading drifts downward subtly so it stays in view as cards rise.
        if (benefitsHeading) {
          gsap.fromTo(benefitsHeading,
            { y: 0 },
            {
              y: 0.45 * vh,           // ~45% of viewport over full scroll range
              ease: 'none',
              scrollTrigger: {
                trigger: benefitsSection,
                start:   'top bottom',
                end:     'bottom top',
                scrub:   1,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      };
      setParallax();
    }

    const splitInstances: SplitText[] = [];
    gsap.utils.toArray<Element>('.anim-text-reveal').forEach(el => {
      const split = new SplitText(el, { type: 'words' });
      splitInstances.push(split);
      gsap.set(split.words, { color: '#d4d4d4' });
      gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 40%', scrub: 1 },
      }).to(split.words, { color: '#262626', stagger: 0.1, ease: 'none' });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      wordInstances.forEach(s => s.revert());
      splitInstances.forEach(s => s.revert());
    };
  }, []);

  return (
    <>
    <div style={{
      background: '#000b0d',
      position: 'relative',
      zIndex: 1,
      display: 'flow-root', // prevents child margins from collapsing out of the wrap and leaving the fixed footer exposed
    }}>

      {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'clip' }}>
        <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="/assets/8925160-uhd_4096_2160_24fps.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(46deg, rgba(0,0,0,0.64) 3%, rgba(0,0,0,0) 47%)' }} />

        <div style={{ position: 'relative', zIndex: 1, padding: '0 96px 80px' }}>
          {/* Label */}
          <p className="anim-fade" style={{ ...inter, fontWeight: 400, fontSize: 20, color: 'rgba(255,255,255,0.5)', margin: '0 0 20px', letterSpacing: '-0.4px' }}>How it works</p>

          {/* Heading */}
          <h1 style={{ margin: '0 0 32px', ...sw, fontWeight: 400, lineHeight: 1 }}>
            <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
              <div className="hiw-hero-line" style={{ fontSize: 'clamp(52px, 5.5vw, 80px)', color: '#fff', letterSpacing: '-0.04em', transform: 'translateY(110%)', willChange: 'transform' }}>
                The system that
              </div>
            </div>
            <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
              <div className="hiw-hero-line" style={{ fontSize: 'clamp(52px, 5.5vw, 80px)', color: '#fff', letterSpacing: '-0.04em', transform: 'translateY(110%)', willChange: 'transform' }}>
                powers it all
              </div>
            </div>
          </h1>

          {/* Subtitle + CTAs */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
            <p className="anim-fade" style={{ ...inter, fontWeight: 400, fontSize: 20, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, margin: 0, maxWidth: 600 }}>
              Renewable energy wheeling is reshaping how renewable power is shared and accessed across existing electricity networks.
            </p>
            <div className="anim-fade" style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', height: 60, padding: '0 25px',
                background: '#fff', borderRadius: 16, textDecoration: 'none',
              }}>
                <span style={{ ...inter, fontWeight: 500, fontSize: 20, color: '#000b0d', whiteSpace: 'nowrap' }}>Talk to an expert</span>
              </Link>
              <Link href="/solutions" style={{
                display: 'inline-flex', alignItems: 'center', height: 60, padding: '0 25px 0 34px',
                background: 'rgba(0,0,0,0.17)', backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
                borderRadius: 16, textDecoration: 'none', gap: 10,
              }}>
                <span style={{ ...inter, fontWeight: 500, fontSize: 20, color: '#fff', whiteSpace: 'nowrap' }}>Explore solutions</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT IS WHEELING ════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderRadius: '40px 40px 0 0', position: 'relative', zIndex: 2, display: 'flex', gap: 96, alignItems: 'stretch', padding: '88px 0 88px 117px', overflow: 'clip', minHeight: 700 }}>
        {/* Left */}
        <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 24, paddingBottom: 32 }}>
          <p className="anim-fade" style={{ ...inter, fontWeight: 400, fontSize: 20, color: '#737373', margin: 0 }}>What is wheeling?</p>
          <p className="anim-fade" style={{ ...sw, fontWeight: 500, fontSize: 'clamp(20px, 2vw, 24px)', color: '#262626', lineHeight: 1.42, letterSpacing: '-0.4px', margin: 0, maxWidth: 535 }}>
            Simply stated, wheeling is the transportation of energy from a generation site to an energy user via the existing Eskom or municipal grid.
          </p>
        </div>

        {/* Right: image + play button */}
        <div style={{ flex: '1 0 0', position: 'relative', borderRadius: '24px 0 0 24px', overflow: 'clip', minHeight: 500 }}>
          <img src={imgWhatIs} alt="" className="anim-image" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 48, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 48px' }}>
            <button className="anim-fade" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60, padding: '0 24px',
              background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(54px)', WebkitBackdropFilter: 'blur(54px)',
              borderRadius: 16, border: 'none', cursor: 'pointer', minWidth: 188,
            }}>
              <span style={{ ...inter, fontWeight: 500, fontSize: 20, color: '#fff', whiteSpace: 'nowrap' }}>Play video</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ REW — STICKY LEFT / SCROLLING RIGHT ════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'clip' }}>
        <div style={{ display: 'flex', position: 'relative' }}>

          {/* LEFT — sticky heading with background image */}
          <div style={{
            width: '50%', flexShrink: 0,
            position: 'sticky', top: 0, height: '100vh',
            overflow: 'clip',
          }}>
            <img src={imgREWBg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.2) 100%)' }} />
            <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 64px 80px' }}>
              <p className="anim-fade" style={{ ...inter, fontWeight: 400, fontSize: 16, color: 'rgba(255,255,255,0.5)', margin: '0 0 16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>How it works</p>
              <h2 className="anim-heading-words" style={{ ...sw, fontWeight: 400, fontSize: 52, color: '#fff', letterSpacing: '-1.6px', lineHeight: '60px', margin: 0 }}>
                Renewable<br />energy wheeling
              </h2>
            </div>
          </div>

          {/* RIGHT — scrolling step cards */}
          <div style={{
            flex: 1,
            background: '#111',
            display: 'flex', flexDirection: 'column',
            padding: '30vh 64px',
            gap: 0,
          }}>
            {REW_STEPS.map((step) => (
              <div key={step.num} style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
                <div className="anim-fade" style={{
                  background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                  borderRadius: 24, padding: '48px 56px',
                  display: 'flex', flexDirection: 'column', gap: 20, width: '100%',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ ...sw, fontWeight: 400, fontSize: 28, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.3, margin: 0 }}>{step.label}</h3>
                    <span style={{ ...inter, fontWeight: 500, fontSize: 14, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>{step.num}</span>
                  </div>
                  <p style={{ ...inter, fontWeight: 400, fontSize: 18, color: '#a3a3a3', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══ WHY IT MATTERS ═════════════════════════════════════════════════ */}
      <section style={{ background: '#f5f5f5', borderRadius: '40px 40px 40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '240px 32px 300px', textAlign: 'center', position: 'relative', zIndex: 3, marginBottom: -220 }}>
        <p className="anim-fade" style={{ ...inter, fontWeight: 400, fontSize: 20, color: '#737373', margin: 0 }}>Why it matters?</p>
          <p className="anim-text-reveal" style={{ ...sw, fontWeight: 500, fontSize: 32, color: '#d4d4d4', lineHeight: '42px', textAlign: 'center', maxWidth: 832, margin: 0 }}>
            In 2022, DMRE removed the need for independent power producers to require a license to produce electricity. This has opened the national grid and enabled the private sector to generate large-scale electricity. This energy can now be 'wheeled' to businesses across South Africa.
          </p>
      </section>

      {/* ═══ BENEFITS — 100vh stage; right cards parallax upward over the bg ═══ */}
      <section className="benefits-section" style={{
        position: 'relative', zIndex: 2,
        height: 'calc(100vh + 440px)', width: '100%',
        overflow: 'hidden',
        marginBottom: -200,
      }}>
        {/* Background */}
        <img src={imgBenefitsBg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(153deg, rgba(0,0,0,0.7) 26%, rgba(0,0,0,0.25) 65%)' }} />

        {/* Left — heading, anchored toward the top; drifts down subtly via parallax */}
        <div className="benefits-heading" style={{
          position: 'absolute', left: 96, top: 'calc(110px + 4vh)',
          display: 'flex', flexDirection: 'column',
          width: 680, zIndex: 2,
          willChange: 'transform',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p className="anim-fade" style={{ ...inter, fontWeight: 400, fontSize: 16, color: 'rgba(255,255,255,0.5)', margin: 0 }}>Benefits</p>
            <h2 className="anim-heading-words" style={{ ...sw, fontWeight: 400, fontSize: 52, color: '#fff', letterSpacing: '-1.6px', lineHeight: '60px', margin: 0 }}>
              It's cleaner, cost-effective,<br />and more reliable than<br />Eskom-generated fossil<br />fuel energy
            </h2>
          </div>
        </div>

        {/* Right — parallax cards column. Sits absolutely on the right; translates
            upward as the section scrolls through the viewport. */}
        <div style={{ position: 'absolute', top: 0, right: 96, bottom: 0, width: 560, zIndex: 3, pointerEvents: 'none' }}>
          <div className="benefits-parallax" style={{
            position: 'absolute', top: '140vh', left: 0, width: '100%',
            display: 'flex', flexDirection: 'column', gap: 40,
            pointerEvents: 'auto',
            willChange: 'transform',
          }}>
            {BENEFITS_CARDS.map((card, i) => (
              <div key={i} style={{
                position: 'relative',
                width: '100%',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(54px)', WebkitBackdropFilter: 'blur(54px)',
                borderRadius: 24, padding: '52px 50px', boxSizing: 'border-box',
                display: 'flex', flexDirection: 'column', gap: 24,
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <img src={card.icon} alt="" style={{ width: 36, height: 36, flexShrink: 0, opacity: 0.9 }} />
                  <h3 style={{ ...sw, fontWeight: 400, fontSize: 28, color: '#fff', letterSpacing: '-0.5px', lineHeight: '36px', margin: 0, whiteSpace: 'pre-line' }}>{card.title}</h3>
                </div>
                <button aria-label="Expand" style={{
                  position: 'absolute', top: 20, right: 20,
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', padding: 0,
                }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="8" y1="2.5" x2="8" y2="13.5" />
                    <line x1="2.5" y1="8" x2="13.5" y2="8" />
                  </svg>
                </button>
                <p style={{ ...inter, fontWeight: 400, fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: '24px', margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHEELING VS ONSITE SOLAR ════════════════════════════════════════ */}
      <section style={{ background: '#f5f5f5', borderRadius: 40, position: 'relative', zIndex: 3, padding: '124px 96px', display: 'flex', flexDirection: 'column', gap: 88 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p className="anim-fade" style={{ ...inter, fontWeight: 400, fontSize: 20, color: '#737373', margin: 0 }}>Wheeling vs Onsite solar</p>
          <h2 className="anim-heading-words" style={{ ...sw, fontWeight: 400, fontSize: 52, color: '#000b0d', letterSpacing: '-1.6px', lineHeight: '60px', margin: 0, maxWidth: 586 }}>
            Different models, different energy outcomes
          </h2>
        </div>

        <div className="anim-card-group" style={{ display: 'flex', gap: 88 }}>
          <div className="anim-card" style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <img src={imgSolarPanel} alt="" style={{ width: 32, height: 32 }} />
            <h3 style={{ ...sw, fontWeight: 400, fontSize: 30, color: '#000b0d', letterSpacing: '-0.4px', margin: 0, lineHeight: 1.27 }}>Onsite solar</h3>
            <div className="anim-line" style={{ height: 1, background: 'rgba(0,0,0,0.12)' }} />
            <p style={{ ...inter, fontWeight: 500, fontSize: 18, color: '#737373', lineHeight: 1.33, margin: 0 }}>
              Onsite renewable energy supply, such as rooftop solar PV ('behind the meter'), has been used extensively. Still, the amount of clean energy that can be supplied is often limited and capital-intensive.
            </p>
          </div>
          <div className="anim-card" style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <img src={imgElectricHome} alt="" style={{ width: 32, height: 32 }} />
            <h3 style={{ ...sw, fontWeight: 400, fontSize: 30, color: '#000b0d', letterSpacing: '-0.4px', margin: 0, lineHeight: 1.27 }}>Wheeling</h3>
            <div className="anim-line" style={{ height: 1, background: 'rgba(0,0,0,0.12)' }} />
            <p style={{ ...inter, fontWeight: 500, fontSize: 18, color: '#737373', lineHeight: 1.33, margin: 0 }}>
              Wheeling eliminates these arduous requirements by facilitating energy transportation from one or multiple energy-generating sites located anywhere in South Africa to the end user through the national grid.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '64px', background: '#fff' }}>
        <div style={{ background: '#f4f0eb', borderRadius: 24, padding: '88px 64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 60 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, maxWidth: 670, textAlign: 'center' }}>
            <p className="anim-fade" style={{ ...inter, fontWeight: 400, fontSize: 20, color: '#737373', margin: 0 }}>FAQ</p>
            <h2 className="anim-heading-words" style={{ ...sw, fontWeight: 400, fontSize: 52, color: '#000b0d', letterSpacing: '-1.6px', lineHeight: '60px', margin: 0 }}>
              What you need to know
            </h2>
          </div>

          <div className="anim-card-group" style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 1070 }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="anim-card" style={{ background: '#fff', borderRadius: 24, overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: '100%', display: 'flex', gap: 24, alignItems: 'flex-start',
                  padding: '24px 28px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                }}>
                  <p style={{ flex: 1, ...inter, fontWeight: 500, fontSize: 16, color: '#000b0d', letterSpacing: '-0.3px', lineHeight: 1.5, margin: 0 }}>{faq.q}</p>
                  <div style={{
                    flexShrink: 0, width: 32, height: 22, borderRadius: 12,
                    background: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
                    transform: openFaq === i ? 'none' : 'rotate(180deg)',
                  }}>
                    <img src={imgChevron} alt="" style={{ width: 14, height: 14 }} />
                  </div>
                </button>
                <div style={{ overflow: 'hidden', maxHeight: openFaq === i ? 200 : 0, transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)' }}>
                  <div style={{ padding: '0 28px 24px' }}>
                    <p style={{ ...inter, fontWeight: 400, fontSize: 16, color: '#737373', letterSpacing: '-0.3px', lineHeight: 1.5, margin: 0 }}>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT CTA ════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff' }}>
        <div style={{ position: 'relative', overflow: 'clip', borderRadius: '40px 40px 0 0', minHeight: 619, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '64px 64px 105px' }}>
          <img src={imgContactBg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(0,0,0,0.2) 39%, rgba(102,102,102,0.2) 60%)' }} />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
            <h2 className="anim-heading-words" style={{ ...sw, fontWeight: 400, fontSize: 52, color: '#fff', letterSpacing: '-1.6px', lineHeight: '60px', margin: 0, maxWidth: 622 }}>
              Ready to see what this could look like for you?
            </h2>
            {/* Decorative line */}
            <div className="anim-line" style={{ height: 1, background: 'rgba(255,255,255,0.6)', width: 292 }} />
          </div>

          <Link href="/contact" className="anim-fade" style={{
            position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', height: 60, padding: '0 24px',
            background: '#beaa3d', borderRadius: 16, textDecoration: 'none', flexShrink: 0,
          }}>
            <span style={{ ...inter, fontWeight: 500, fontSize: 20, color: '#fff', whiteSpace: 'nowrap' }}>See what's possible</span>
          </Link>
        </div>
      </section>

    </div>

    {/* ═══ FOOTER REVEAL SPACER ════════════════════════════════════════════
       100vh of transparent space outside the wrap so the fixed footer beneath
       becomes visible only when the user scrolls past the last content section. */}
    <div style={{ height: '100vh' }} />

    {/* ═══ FOOTER ═════════════════════════════════════════════════════════ */}
    <Footer />
    </>
  );
}
