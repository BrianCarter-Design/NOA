'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Link from 'next/link';
import HeroBg from '@/components/HeroBg';
import Stakeholders from '@/components/Stakeholders';
import WhyNoa from '@/components/WhyNoa';
import FAQ, { FAQItem } from '@/components/FAQ';
import Footer from '@/components/Footer';

/* ── Figma assets ─────────────────────────────────────────────────────────── */
const imgBgSection    = 'https://www.figma.com/api/mcp/asset/67c7911a-3652-443c-82dc-b7210e7355ef';
const imgHeadingBg    = 'https://www.figma.com/api/mcp/asset/41c7bf8b-687e-4848-a7b1-c3c2253fd74e';
const imgArrow        = 'https://www.figma.com/api/mcp/asset/7355a331-d76b-4702-8d6a-506dbf34614f';
const imgAvatar       = 'https://www.figma.com/api/mcp/asset/e0689173-fc46-4da6-9ad0-12bdc6d48d56';
const imgCompanyLogo  = 'https://www.figma.com/api/mcp/asset/fd8577db-b188-45a3-8ac4-d4437af17f3a';


const SOLUTION_FAQS: FAQItem[] = [
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


/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function SolutionsOverview() {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

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

    /* anim-heading-words — used by Stakeholders component */
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
        y: '0%', opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.055,
        scrollTrigger: { trigger: el, start: 'top 87%', once: true },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      wordInstances.forEach(s => s.revert());
    };
  }, []);


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

      {/* ═══ WHO WE WORK WITH — shared Stakeholders component ══════════════ */}
      <Stakeholders sectionStyle={{ marginTop: -30, borderRadius: '30px 30px 40px 40px' }} />

      {/* ═══ WHY NOA — shared WhyNoa component ══════════════════════════════ */}
      <WhyNoa />

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

      {/* ═══ FAQ — shared component ══════════════════════════════════════════ */}
      <FAQ items={SOLUTION_FAQS} />

      {/* ═══ FOOTER REVEAL SPACER + FOOTER ══════════════════════════════════ */}
      <div style={{ height: 821 }} />
      <Footer />
    </div>
  );
}
