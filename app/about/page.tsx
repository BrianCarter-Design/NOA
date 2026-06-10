'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Link from 'next/link';
import HeroBg from '@/components/HeroBg';
import Stakeholders from '@/components/Stakeholders';
import WhyNoa from '@/components/WhyNoa';
import Footer from '@/components/Footer';

/* ── Assets ───────────────────────────────────────────────────────────────── */
const imgEllipse25         = 'https://www.figma.com/api/mcp/asset/3c224ab1-d1cf-45d9-b1dc-04f5fddf35f2';
const imgEllipse26         = 'https://www.figma.com/api/mcp/asset/52e7d6ef-98b5-4a4d-9799-08ee29461416';
const imgEllipse27         = 'https://www.figma.com/api/mcp/asset/c6bd7ccf-9001-4999-8d22-bf876bcffe82';
const imgGroup1            = 'https://www.figma.com/api/mcp/asset/3e6dc271-b657-4b8e-a83b-989d3676e5cf';
const imgGroup2            = 'https://www.figma.com/api/mcp/asset/a89095f3-21dd-468c-baae-623253256738';
const imgJoshHild          = 'https://www.figma.com/api/mcp/asset/3841fe58-fda4-4b78-8ad5-3febe251a9a3';
const imgRectangle         = 'https://www.figma.com/api/mcp/asset/5efeeac2-7178-4fa1-96e6-fb310513186b';
const imgRectangle1        = 'https://www.figma.com/api/mcp/asset/a98dd132-bb78-483b-899f-d04439a2412c';
const imgItem              = 'https://www.figma.com/api/mcp/asset/e76fa9a6-229f-46c8-9055-f8fe4987523d';
const imgItem1             = 'https://www.figma.com/api/mcp/asset/d460f11a-e32a-4651-832e-9f86b7d6ced6';
const imgItem2             = 'https://www.figma.com/api/mcp/asset/5c3d9f1e-0c56-4161-99ed-73756318e5cf';
const imgContact           = 'https://www.figma.com/api/mcp/asset/ea19b520-6286-4517-80ab-bec950629323';
const imgPath513           = 'https://www.figma.com/api/mcp/asset/9d7fe976-e154-4f59-8d43-db673ccd4f19';
const imgPower             = 'https://www.figma.com/api/mcp/asset/3960246f-76b7-45c7-aa15-340665358fea';
const imgArrowUpRight03    = 'https://www.figma.com/api/mcp/asset/d91afa3e-bc36-4b98-a526-5eea17676573';
const imgArrowUpRight4     = 'https://www.figma.com/api/mcp/asset/5e261bcb-8f99-476f-a694-0327f72e2ad5';
const img3DScale           = 'https://www.figma.com/api/mcp/asset/c35c5bae-fdb7-49f0-abc0-32c66d2494f0';
const imgCoins02           = 'https://www.figma.com/api/mcp/asset/276426dd-0206-4f95-a1ba-5bad0bd4ce2e';
const imgEarth             = 'https://www.figma.com/api/mcp/asset/09271362-68aa-40d6-a10b-67f5c5f13411';
const imgAward01           = 'https://www.figma.com/api/mcp/asset/e32ddffe-9fd8-4695-ab17-1fca4ede9271';
const imgArrowDownLeft     = 'https://www.figma.com/api/mcp/asset/95a4041f-0882-4776-af57-771d84353bba';
const imgArrowDownLeft1    = 'https://www.figma.com/api/mcp/asset/99753c83-6de9-40ad-9a21-51f8cfc13aa2';
const imgUserSharing       = 'https://www.figma.com/api/mcp/asset/2c98f5db-4d83-4f32-b6c6-094dc0c714b7';
const imgMail01            = 'https://www.figma.com/api/mcp/asset/46a5f927-f600-4f93-9bdc-6a0878fcc3e1';
const imgTelephone1        = 'https://www.figma.com/api/mcp/asset/aeefc41a-f159-4cb3-9de7-45e3ce8eb8f5';
const imgVector25          = 'https://www.figma.com/api/mcp/asset/47825d1d-66f2-4c5b-b10d-b2a524a32ce4';
const imgVector26          = 'https://www.figma.com/api/mcp/asset/fea0762e-6705-4006-92db-56ca93b21a23';

/* ── Data ─────────────────────────────────────────────────────────────────── */

const TEAM = [
  {
    name:  'Karel Cornelissen',
    title: 'CEO & Co-founder',
    dark:  true,
    bio:   'As the CEO of NOA Group, Karel leads NOA\'s vision and strategic direction in the renewable energy sector. With a profound commitment to sustainability and innovation, he drives the company\'s mission to revolutionise the energy landscape.',
  },
  { name: 'Iqbal Sirkot',  title: 'Chief Financial Officer',  dark: false },
  { name: 'Lesedi Modise', title: 'Chief Investment Officer', dark: false },
  { name: 'Erica Hannath', title: 'Head of People',           dark: false },
];

/* ── Primitives ───────────────────────────────────────────────────────────── */
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
      <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 14, letterSpacing: '0.05em', color: dark ? '#fff' : '#868686', whiteSpace: 'nowrap' }}>{text}</span>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function About() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    gsap.set('.anim-mask-line', { y: '110%' });
    gsap.set('.anim-fade',      { opacity: 0, y: 32 });
    gsap.set('.anim-card',      { opacity: 0, y: 56 });
    gsap.set('.anim-image',     { opacity: 0, scale: 1.06 });

    /* Hero headline */
    gsap.to('.abt-hero-line', { y: '0%', duration: 1.15, ease: 'power4.out', stagger: 0.1, delay: 0.3 });

    /* Masked headings */
    gsap.utils.toArray<Element>('.anim-heading').forEach(heading => {
      gsap.to(heading.querySelectorAll('.anim-mask-line'), {
        y: '0%', duration: 1.05, ease: 'power4.out', stagger: 0.1,
        scrollTrigger: { trigger: heading, start: 'top 87%', once: true },
      });
    });

    /* Fade-up */
    gsap.utils.toArray<Element>('.anim-fade').forEach(el => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 91%', once: true },
      });
    });

    /* Staggered cards */
    gsap.utils.toArray<Element>('.anim-card-group').forEach(group => {
      gsap.to(group.querySelectorAll('.anim-card'), {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
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
      gsap.fromTo(el,
        { yPercent: -8 },
        { yPercent: 8, ease: 'none', scrollTrigger: {
          trigger: (el as HTMLElement).closest('[data-parallax-section]') || el,
          start: 'top bottom', end: 'bottom top', scrub: 1.5,
        }}
      );
    });

    /* Word-by-word headings */
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

      <HeroBg overlay="linear-gradient(170deg, rgba(1,52,54,0.65) 0%, rgba(0,0,0,0.15) 60%)">
        <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}>
          <source src="/assets/11168-228530158_medium.mp4" type="video/mp4" />
        </video>
      </HeroBg>

      {/* ═══ HERO ════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', background: 'transparent', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 96px 80px' }}>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
          <div style={{ flex: '1 0 0' }}>
            <div style={{ marginBottom: 20 }}><Label text="ABOUT" dark /></div>
            <h1 style={{ margin: 0, fontFamily: 'Switzer, sans-serif', fontWeight: 400, lineHeight: 1.02 }}>
              {['Reimagining energy', 'from the ground up'].map((line, i) => (
                <div key={i} style={{ overflow: 'hidden', paddingBottom: '0.04em' }}>
                  <div className="abt-hero-line" style={{ fontSize: 'clamp(48px, 5.5vw, 80px)', color: '#fff', letterSpacing: '-0.04em', transform: 'translateY(110%)', willChange: 'transform', display: 'block' }}>
                    {line}
                  </div>
                </div>
              ))}
            </h1>
          </div>

          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-end', width: 376 }}>
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#fff', lineHeight: 1.6, textAlign: 'right', margin: 0 }}>
              We operate across the full energy value chain, from renewable generation to energy trading, enabling a more flexible and resilient power system for South Africa.
            </p>
            {/* White "Explore our model" CTA */}
            <Link href="/how-it-works" className="anim-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 84, borderRadius: 24, background: '#fff', textDecoration: 'none', width: '100%', flexShrink: 0 }}>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontSize: 32, color: '#013436', letterSpacing: '-1px', whiteSpace: 'nowrap' }}>Explore our model</span>
              <div style={{ width: 30, height: 30, transform: 'rotate(135deg)', flexShrink: 0 }}>
                <img src={imgArrowUpRight4} alt="" style={{ width: '100%', height: '100%', filter: 'invert(1) brightness(0)' }} />
              </div>
            </Link>
            {/* Glass "Talk to an expert" CTA */}
            <Link href="/contact" className="anim-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 84, borderRadius: 24, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(54px)', WebkitBackdropFilter: 'blur(54px)', textDecoration: 'none', width: '100%', flexShrink: 0 }}>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontSize: 32, color: '#fff', letterSpacing: '-1px', whiteSpace: 'nowrap' }}>Talk to an expert</span>
              <div style={{ width: 30, height: 30, transform: 'rotate(135deg)', flexShrink: 0 }}>
                <img src={imgArrowUpRight03} alt="" style={{ width: '100%', height: '100%' }} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ WHO IS NOA ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderRadius: '30px 30px 0 0', marginTop: -30, position: 'relative', zIndex: 2, padding: '96px 96px 80px', display: 'flex', gap: 64, alignItems: 'flex-start' }}>

        {/* Left: eyebrow + heading + text */}
        <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Label text="WHO IS NOA" />
            <h2 className="anim-heading-words" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(40px, 4.5vw, 60px)', color: '#000b0d', letterSpacing: '-2px', lineHeight: 1.05, margin: 0 }}>
              More than an energy company
            </h2>
          </div>
          <div className="anim-fade" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontFamily: 'Inter, Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#737373', lineHeight: 1.65, margin: 0 }}>
              Established in 2022, NOA is a leading renewable energy independent power producer, aggregator and energy trader, with a trading license from the National Energy Regulator of South Africa.
            </p>
            <p style={{ fontFamily: 'Inter, Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#737373', lineHeight: 1.65, margin: 0 }}>
              NOA&apos;s best-in-class management team has extensive experience in building and scaling large-scale energy businesses. NOA has raised R3.9 billion in equity capital from Old Mutual&apos;s African Infrastructure Investment Managers, enabling NOA Trading to expedite the purchase of electrons from trusted independent power producers and fast-track the construction of its fleet of generation facilities.
            </p>
            <p style={{ fontFamily: 'Inter, Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#737373', lineHeight: 1.65, margin: 0 }}>
              NOA Trading procures energy from NOA-owned wind, solar PV and battery energy storage sites and trusted third-party IPPs to offer market-leading renewable energy solutions — with customised flexibility in size, contract tenor and security requirements.
            </p>
          </div>
        </div>

        {/* Right: decorative circles + hero image */}
        <div className="anim-image" style={{ flexShrink: 0, width: '46%', position: 'relative', aspectRatio: '1 / 1.05' }}>
          {/* Decorative ellipses */}
          <img src={imgEllipse25} alt="" style={{ position: 'absolute', top: '-8%', right: '-5%', width: '55%', pointerEvents: 'none', zIndex: 0 }} />
          <img src={imgEllipse26} alt="" style={{ position: 'absolute', bottom: '8%', left: '-4%', width: '40%', pointerEvents: 'none', zIndex: 0 }} />
          <img src={imgEllipse27} alt="" style={{ position: 'absolute', bottom: '-4%', right: '10%', width: '30%', pointerEvents: 'none', zIndex: 0 }} />
          {/* Main group image */}
          <img src={imgGroup1} alt="" style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 32, display: 'block' }} />
        </div>
      </section>

      {/* ═══ WHO WE WORK WITH — shared Stakeholders component ══════════════ */}
      <Stakeholders />

      {/* ═══ VISION / MISSION BENTO ══════════════════════════════════════════ */}
      <section style={{ background: '#f4f0eb', padding: '88px 96px', display: 'flex', gap: 24, alignItems: 'stretch' }}>

        {/* Left: large image card with overlay text */}
        <div className="anim-image" style={{ flex: '0 0 52%', borderRadius: 32, overflow: 'hidden', position: 'relative', minHeight: 500 }}>
          <img src={imgRectangle} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <img src={imgRectangle1} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply', opacity: 0.5 }} />
          {/* Overlay text */}
          <div style={{ position: 'absolute', inset: 0, padding: '48px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(to top, rgba(1,52,54,0.85) 0%, transparent 60%)' }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 13, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Vision / Mission</span>
            </div>
            <h2 className="anim-heading" style={{ margin: 0 }}>
              <MaskLine>
                <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(36px, 3.8vw, 52px)', color: '#fff', letterSpacing: '-2px', lineHeight: 1.1, display: 'block' }}>
                  What drives us forward
                </span>
              </MaskLine>
            </h2>
          </div>
        </div>

        {/* Right: Vision + Mission stacked cards */}
        <div className="anim-card-group" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Vision card */}
          <div className="anim-card" style={{ flex: 1, background: '#fff', borderRadius: 32, padding: '40px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <img src={imgEarth} alt="" style={{ width: 32, height: 32, flexShrink: 0 }} />
            <div>
              <h3 style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 28, color: '#000b0d', letterSpacing: '-0.5px', margin: '0 0 16px' }}>Vision</h3>
              <img src={imgVector25} alt="" style={{ width: '100%', height: 'auto', display: 'block', marginBottom: 16 }} />
              <p style={{ fontFamily: 'Inter, Switzer, sans-serif', fontWeight: 300, fontSize: 15, color: '#737373', lineHeight: 1.65, margin: 0 }}>
                As a proud South African company, NOA believes in a post-load-shedding future with a vibrant, growing economy fuelled by access to reliable renewable energy.
              </p>
            </div>
          </div>

          {/* Mission card */}
          <div className="anim-card" style={{ flex: 1, background: '#fff', borderRadius: 32, padding: '40px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <img src={imgAward01} alt="" style={{ width: 32, height: 32, flexShrink: 0 }} />
            <div>
              <h3 style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 28, color: '#000b0d', letterSpacing: '-0.5px', margin: '0 0 16px' }}>Mission</h3>
              <img src={imgVector26} alt="" style={{ width: '100%', height: 'auto', display: 'block', marginBottom: 16 }} />
              <p style={{ fontFamily: 'Inter, Switzer, sans-serif', fontWeight: 300, fontSize: 15, color: '#737373', lineHeight: 1.65, margin: 0 }}>
                NOA supplies businesses across South Africa with clean, cost-effective renewable energy. We aim to develop, finance and operate a portfolio exceeding 2.5 GW of renewable energy assets over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ESG / SUSTAINABILITY ════════════════════════════════════════════ */}
      <section data-parallax-section style={{ position: 'relative', background: '#013436', overflow: 'hidden', padding: '96px 96px', display: 'flex', gap: 48, alignItems: 'stretch', minHeight: 560 }}>
        {/* Parallax bg */}
        <img src={imgJoshHild} alt="" className="anim-parallax" style={{ position: 'absolute', inset: 0, width: '100%', height: '116%', top: '-8%', objectFit: 'cover', pointerEvents: 'none', opacity: 0.55 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(1,30,32,0.5)', pointerEvents: 'none' }} />

        {/* Left: text */}
        <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 24 }}>
          <Label text="ESG / SUSTAINABILITY SNAPSHOT" dark />
          <div className="anim-heading">
            <MaskLine>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(28px, 3.2vw, 44px)', color: '#fff', letterSpacing: '-1px', lineHeight: 1.15, display: 'block', maxWidth: 420 }}>
                Scaling renewable energy in South Africa
              </span>
            </MaskLine>
          </div>
        </div>

        {/* Right: two frosted glass stat cards */}
        <div className="anim-card-group" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0, width: 480 }}>

          {/* Stat 1: 600+ MW */}
          <div className="anim-card" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', borderRadius: 28, padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <img src={img3DScale} alt="" style={{ width: 40, height: 40, objectFit: 'contain' }} />
            <div>
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 'clamp(52px, 5.5vw, 72px)', color: '#fff', letterSpacing: '-3px', lineHeight: 0.95, margin: '0 0 8px' }}>600+ MW</p>
              <p style={{ fontFamily: 'Inter, Switzer, sans-serif', fontWeight: 300, fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, margin: 0 }}>
                Of NOA-owned renewable energy assets currently under construction
              </p>
            </div>
          </div>

          {/* Stat 2: 3.9+ Billion */}
          <div className="anim-card" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', borderRadius: 28, padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <img src={imgCoins02} alt="" style={{ width: 40, height: 40, objectFit: 'contain' }} />
            <div>
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 'clamp(52px, 5.5vw, 72px)', color: '#fff', letterSpacing: '-3px', lineHeight: 0.95, margin: '0 0 8px' }}>R3.9+ Bn</p>
              <p style={{ fontFamily: 'Inter, Switzer, sans-serif', fontWeight: 300, fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, margin: 0 }}>
                Raised in equity capital from African Infrastructure Investment Managers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY NOA — shared component ══════════════════════════════════════ */}
      <WhyNoa />

      {/* ═══ MEET THE TEAM ═══════════════════════════════════════════════════ */}
      <section style={{ background: '#e9f2f2', padding: '96px 96px 80px', display: 'flex', flexDirection: 'column', gap: 56 }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Label text="MEET THE TEAM" />
            <h2 className="anim-heading-words" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(36px, 4vw, 52px)', color: '#000b0d', letterSpacing: '-2px', lineHeight: 1.05, margin: 0, maxWidth: 600 }}>
              Built by energy experts with decades of experience
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, flexShrink: 0, maxWidth: 380, alignItems: 'flex-end' }}>
            <p className="anim-fade" style={{ fontFamily: 'Inter, Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#4a5f60', lineHeight: 1.65, margin: 0, textAlign: 'right' }}>
              Our team brings together industry veterans, driven professionals and specialists united by a shared purpose: to make a meaningful impact by shaping Africa&apos;s energy future.
            </p>
            {/* Nav arrows */}
            <div className="anim-fade" style={{ display: 'flex', gap: 12 }}>
              <button style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(0,0,0,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={imgArrowDownLeft} alt="prev" style={{ width: 22, height: 22 }} />
              </button>
              <button style={{ width: 52, height: 52, borderRadius: '50%', background: '#013436', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={imgArrowDownLeft1} alt="next" style={{ width: 22, height: 22 }} />
              </button>
            </div>
          </div>
        </div>

        {/* Team cards */}
        <div className="anim-card-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="anim-card"
              style={{
                borderRadius: 24, overflow: 'hidden', position: 'relative',
                aspectRatio: '3 / 4',
                background: member.dark ? '#013436' : 'transparent',
                display: 'flex', flexDirection: 'column',
                justifyContent: member.dark ? 'space-between' : 'flex-end',
              }}
            >
              {/* Background photo */}
              {!member.dark && (
                <img src={imgItem2} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
              {member.dark && (
                <img src={imgItem1} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
              )}

              {member.dark ? (
                <div style={{ position: 'relative', zIndex: 1, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 22, color: '#82dfda', letterSpacing: '-0.5px', margin: 0 }}>{member.name}</p>
                    <p style={{ fontFamily: 'Inter, Switzer, sans-serif', fontWeight: 300, fontSize: 15, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.3px', lineHeight: 1.3, margin: 0 }}>{member.title}</p>
                  </div>
                  {member.bio && (
                    <p style={{ fontFamily: 'Inter, Switzer, sans-serif', fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.2px', lineHeight: 1.6, margin: 0 }}>
                      {member.bio} <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Read more</span>
                    </p>
                  )}
                </div>
              ) : (
                <div style={{ position: 'relative', zIndex: 1, margin: 16 }}>
                  <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: 16, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 20, color: '#fff', letterSpacing: '-0.3px', margin: 0 }}>{member.name}</p>
                    <p style={{ fontFamily: 'Inter, Switzer, sans-serif', fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.2px', lineHeight: 1.4, margin: 0 }}>{member.title}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TEAM CONTACT ════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '80px 96px' }}>
        <div className="anim-card-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 24, overflow: 'hidden' }}>

          {[
            { icon: imgUserSharing, heading: 'Team contact',  sub: 'Your go-to for all team-related inquiries.', cta: 'Derik Coetzer, Head of Growth' },
            { icon: imgMail01,      heading: 'Email',          sub: 'Drop us a line any time.',                   cta: 'derik@noagroup.africa' },
            { icon: imgTelephone1,  heading: 'Phone',          sub: 'Mon–Fri from 8am to 5pm.',                   cta: '021 010 0480' },
          ].map((col, i, arr) => (
            <div
              key={col.heading}
              className="anim-card"
              style={{
                padding: '48px 40px',
                display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start',
                borderRight: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src={col.icon} alt="" style={{ width: 24, height: 24 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 18, color: '#000b0d', letterSpacing: '-0.3px', margin: 0 }}>{col.heading}</p>
                <p style={{ fontFamily: 'Inter, Switzer, sans-serif', fontWeight: 300, fontSize: 15, color: '#868686', lineHeight: 1.55, margin: 0 }}>{col.sub}</p>
              </div>
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: '#013436', margin: 0 }}>{col.cta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CAREERS CTA ═════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '0 0 0' }}>
        <div className="anim-fade" style={{ position: 'relative', minHeight: 480, borderRadius: '40px 40px 0 0', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '72px 96px' }}>
          <img src={imgContact} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(1,52,54,0.75) 0%, rgba(0,0,0,0.3) 100%)' }} />
          {/* Heading */}
          <p style={{ position: 'relative', zIndex: 1, fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(44px, 5vw, 72px)', color: '#fff', letterSpacing: '-3px', lineHeight: 1.05, maxWidth: 680, margin: 0 }}>
            Want to join our team? Have a look at our open roles.
          </p>
          {/* Gold CTA button */}
          <Link href="/careers" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16, padding: '20px 32px', borderRadius: 20, background: '#beaa3d', textDecoration: 'none', flexShrink: 0 }}>
            <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 20, color: '#fff', letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>See what&apos;s possible</span>
            <img src={imgPath513} alt="" style={{ width: 20, height: 20 }} />
          </Link>
        </div>
      </section>

      {/* ═══ FOOTER REVEAL SPACER + FOOTER ══════════════════════════════════ */}
      <div style={{ height: 821 }} />
      <Footer />
    </div>
  );
}
