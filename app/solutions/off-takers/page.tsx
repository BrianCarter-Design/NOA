'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Link from 'next/link';
import Footer from '@/components/Footer';

/* ── Assets ───────────────────────────────────────────────────────────────── */
const imgHalo         = 'https://www.figma.com/api/mcp/asset/de2e24c8-23e3-4b2e-8264-ead6fb92b099';
const imgSolutionBg1  = 'https://www.figma.com/api/mcp/asset/5ad29400-a5bb-410f-9cd9-89ecd40b0541';
const imgSolutionBg2  = 'https://www.figma.com/api/mcp/asset/d5830dc8-5425-4359-a3ef-c199c826a14c';
const imgProcess1     = 'https://www.figma.com/api/mcp/asset/06630870-73a3-466a-a3e6-8f1538ac5de7';
const imgProcess2     = 'https://www.figma.com/api/mcp/asset/f676741a-62fd-41e1-9e5d-c94b4390ccb9';
const imgProcess3     = 'https://www.figma.com/api/mcp/asset/2bd82b42-88f2-4fb9-9daa-66eb3827bc06';
const imgProcess4     = 'https://www.figma.com/api/mcp/asset/d139d6b9-9342-4e95-82be-2746359da869';
const imgOutcomeCard  = 'https://www.figma.com/api/mcp/asset/f1b7dd75-7c31-4d66-9fd5-12966354b8ab'; // green-house icon
const imgBatteriesEnergy = 'https://www.figma.com/api/mcp/asset/86034c64-cc4e-4955-841d-dcb2c6e16003';
const imgHydroPower   = 'https://www.figma.com/api/mcp/asset/cdd51ea4-bb46-4257-9395-96f35636c2e9';
const imgWindPower    = 'https://www.figma.com/api/mcp/asset/cf7a2d55-25a7-49cc-9c5f-53754309c846';
const imgSolarPanel   = 'https://www.figma.com/api/mcp/asset/56604f1f-83e8-405c-ac29-dd7faba8b90e';
const imgCostGraph    = 'https://www.figma.com/api/mcp/asset/2283b604-86f1-47d8-9064-195d2ba161de';
const imgEsgBg        = 'https://www.figma.com/api/mcp/asset/b36059f8-4c08-4d87-a560-8e3b16fdf5a9';
const imgEsgBg2       = 'https://www.figma.com/api/mcp/asset/fb424f6c-6308-4583-a4ad-27bb6b153cb5';
const imgEllipseAccent = 'https://www.figma.com/api/mcp/asset/1f27aedf-ffa8-4f2a-97a6-3d9ac863eb6a';
const imgHaloOutcomes = 'https://www.figma.com/api/mcp/asset/76ee71d2-6c3e-4cff-b68e-22291e21276a';
const imgCtaIcon      = 'https://www.figma.com/api/mcp/asset/4681af22-827c-485e-81da-e396e19dbf7b';
const imgArrowDown    = 'https://www.figma.com/api/mcp/asset/17841239-4402-450c-a5a4-95ffd3e69fd2';

/* ── Types ────────────────────────────────────────────────────────────────── */
interface ProcessStep {
  num:   string;
  title: string;
  desc:  string;
  img:   string;
}

/* ── Page data (swap these per sub-page) ─────────────────────────────────── */
const PAGE = {
  audience:        'OFF-TAKERS',
  heroHeading:     'Take control of your energy supply',
  heroDesc:        'Energy should be something you can plan around. Access renewable power that is cost-effective, reliable, and delivered through the grid you already use. No on-site infrastructure. No operational disruption.',
  challengeHeading:'When energy becomes a risk to your business.',
  challengeRight:  'Electricity is no longer predictable.',
  solutionHeading: 'Renewable energy, made accessible',
  solutionDesc:    'NOA gives you access to renewable energy generated from solar and wind projects, delivered to your business through the national grid.',
  processHeading:  'Your path to reliable energy',
  outcomesHeading: 'Energy that works for your business',
  ctaHeading:      'Take the next step toward reliable energy',
};

const PROCESS_STEPS: ProcessStep[] = [
  { num: '01', title: 'Consultation',    img: imgProcess1, desc: 'We start by understanding your business, your energy usage patterns, and what you are trying to achieve. This includes cost, reliability, and sustainability priorities.' },
  { num: '02', title: 'Analysis',        img: imgProcess2, desc: 'Your consumption data is reviewed alongside available renewable generation options. This step identifies the most efficient way to match supply to your operational demand.' },
  { num: '03', title: 'Solution design', img: imgProcess3, desc: 'A tailored energy solution is structured around your needs. This includes how energy will be sourced, how it will be delivered through the grid, and how it aligns with your business requirements.' },
  { num: '04', title: 'Supply',          img: imgProcess4, desc: 'Once agreed, renewable energy is delivered through the existing grid infrastructure. Your business begins receiving a cleaner, more stable energy supply with ongoing performance monitoring.' },
];

const ENERGY_ICONS = [imgOutcomeCard, imgBatteriesEnergy, imgHydroPower, imgWindPower, imgSolarPanel];

/* ── Shared style tokens ─────────────────────────────────────────────────── */
const sw: React.CSSProperties = { fontFamily: 'Switzer, sans-serif' };
const it: React.CSSProperties = { fontFamily: 'Inter, Switzer, sans-serif' };

/* ── Sub-components ──────────────────────────────────────────────────────── */
function MaskLine({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
      <div className="anim-mask-line" style={{ display: 'block', willChange: 'transform' }}>{children}</div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', surname: '', company: '', helpType: '', email: '', phone: '', message: '' });
  const field: React.CSSProperties = { background: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: 16, height: 55, padding: '0 16px', border: 'none', width: '100%', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const };
  const placeholder: React.CSSProperties = { ...it, fontSize: 14, color: '#00c0b5' };
  return (
    <div style={{ display: 'flex', gap: 10, width: 1010, maxWidth: '100%' }}>
      {/* Left column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <input placeholder="Name*" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={{ ...field, flex: 1 }} />
          <input placeholder="Surname*" value={form.surname} onChange={e => setForm(f => ({ ...f, surname: e.target.value }))} style={{ ...field, flex: 1 }} />
        </div>
        <input placeholder="Company name*" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} style={field} />
        <div style={{ ...field, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
          <span style={placeholder}>How can we help?*</span>
          <img src={imgArrowDown} alt="" style={{ width: 24, height: 24, flexShrink: 0 }} />
        </div>
        <input placeholder="Email address*" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={field} />
        <input placeholder="Phone number*" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={field} />
        {/* Captcha placeholder */}
        <div style={{ ...field, display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #013b3e' }}>
          <div style={{ width: 35, height: 35, background: '#014448', borderRadius: 6, flexShrink: 0 }} />
          <span style={{ ...it, fontSize: 16, color: 'rgba(255,255,255,0.3)' }}>I am not a robot</span>
          <span style={{ ...it, fontSize: 16, color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>Captcha</span>
        </div>
      </div>
      {/* Right column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          style={{ ...field, height: 316, padding: '16px', resize: 'none', verticalAlign: 'top' } as React.CSSProperties}
        />
        <button style={{ height: 58, borderRadius: 16, background: '#00c0b5', border: 'none', cursor: 'pointer', ...it, fontWeight: 500, fontSize: 20, color: '#000b0d', width: '100%' }}>
          Get expert advice
        </button>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function OffTakers() {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    gsap.set('.anim-mask-line', { y: '110%' });
    gsap.set('.anim-fade',      { opacity: 0, y: 32 });
    gsap.set('.anim-card',      { opacity: 0, y: 56 });
    gsap.set('.anim-image',     { opacity: 0, scale: 1.06 });

    /* Hero label + heading */
    gsap.to('.sol-label',   { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    gsap.to('.sol-heading', { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out', delay: 0.35 });
    gsap.to('.sol-sub',     { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.55 });

    /* Masked headings */
    gsap.utils.toArray<Element>('.anim-heading').forEach(el => {
      gsap.to(el.querySelectorAll('.anim-mask-line'), {
        y: '0%', duration: 1.05, ease: 'power4.out', stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 87%', once: true },
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
    <>
      {/* ── Pulsing halo keyframes ────────────────────────────────────────── */}
      <style>{`
        @keyframes haloPulse {
          0%, 100% { transform: scale(1);   opacity: 0.10; }
          50%       { transform: scale(1.08); opacity: 0.18; }
        }
        .halo-pulse { animation: haloPulse 4s ease-in-out infinite; }
        .sol-label, .sol-heading, .sol-sub { opacity: 0; transform: translateY(32px); }
      `}</style>

      <div style={{ background: '#fff', overflowX: 'hidden' }}>

        {/* ═══ HERO ══════════════════════════════════════════════════════════ */}
        <section style={{ position: 'relative', height: 804, background: '#00676d', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 96px 124px' }}>

          {/* Pulsing halo */}
          <div className="halo-pulse" style={{ position: 'absolute', top: -100, left: 230, width: 980, height: 980, pointerEvents: 'none', zIndex: 0 }}>
            <img src={imgHalo} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>

          {/* Centred content */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: '100%', maxWidth: 1312 }}>

            {/* Gradient audience label */}
            <p className="sol-label" style={{ ...sw, fontWeight: 500, fontSize: 60, letterSpacing: '-1.2px', lineHeight: '72px', marginBottom: 0,
              background: 'linear-gradient(to bottom, #00c0b5 45%, #00676d 86%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {PAGE.audience}
            </p>

            {/* Main heading */}
            <h1 className="sol-heading" style={{ ...sw, fontWeight: 400, fontSize: 80, color: '#fff', letterSpacing: '-1.6px', lineHeight: '80px', textAlign: 'center', maxWidth: 828, margin: '0 0 80px' }}>
              {PAGE.heroHeading}
            </h1>

            {/* CTAs + description row */}
            <div className="sol-sub" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48 }}>
              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                <Link href="/contact" style={{ display: 'flex', alignItems: 'center', height: 60, padding: '0 25px', borderRadius: 16, background: '#fff', textDecoration: 'none', backdropFilter: 'blur(21.5px)' }}>
                  <span style={{ ...it, fontWeight: 500, fontSize: 20, color: '#000b0d', whiteSpace: 'nowrap' }}>Talk to an expert</span>
                </Link>
                <Link href="/how-it-works" style={{ display: 'flex', alignItems: 'center', height: 60, padding: '0 25px 0 34px', borderRadius: 16, background: 'rgba(0,0,0,0.17)', textDecoration: 'none', backdropFilter: 'blur(21.5px)' }}>
                  <span style={{ ...it, fontWeight: 500, fontSize: 20, color: '#fff', whiteSpace: 'nowrap' }}>Explore our model</span>
                </Link>
              </div>
              {/* Description */}
              <p style={{ ...it, fontWeight: 400, fontSize: 16, color: '#fff', lineHeight: '24px', maxWidth: 451, margin: 0, textAlign: 'right' }}>
                {PAGE.heroDesc}
              </p>
            </div>
          </div>
        </section>

        {/* ═══ THE CHALLENGE ════════════════════════════════════════════════ */}
        <section style={{ background: '#fff', padding: '88px 96px 80px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 741 }}>
            <p className="anim-fade" style={{ ...it, fontWeight: 400, fontSize: 20, color: '#737373', margin: 0 }}>The challenge</p>
            <h2 className="anim-heading-words" style={{ ...sw, fontWeight: 400, fontSize: 48, color: '#000b0d', letterSpacing: '-0.96px', lineHeight: '60px', margin: 0, maxWidth: 510 }}>
              {PAGE.challengeHeading}
            </h2>
          </div>
          <p className="anim-fade" style={{ ...sw, fontWeight: 400, fontSize: 30, color: '#737373', lineHeight: '38px', maxWidth: 372, textAlign: 'right', margin: 0, flexShrink: 0 }}>
            {PAGE.challengeRight}
          </p>
        </section>

        {/* ═══ THE SOLUTION (full-bleed image) ══════════════════════════════ */}
        <section style={{ position: 'relative', height: 923, overflow: 'hidden', borderRadius: 20 }}>
          {/* Layered background images */}
          <img src={imgSolutionBg1} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom', borderRadius: 20 }} />
          <img src={imgSolutionBg2} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 20, mixBlendMode: 'normal' }} />
          {/* Dark overlay for legibility */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 60%)', borderRadius: 20 }} />

          {/* Content — anchored to bottom */}
          <div className="anim-fade" style={{ position: 'absolute', bottom: 64, left: 0, right: 0, padding: '0 96px', display: 'flex', flexDirection: 'column', gap: 64 }}>
            {/* Top row: eyebrow + heading */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <p style={{ ...it, fontWeight: 400, fontSize: 20, color: 'rgba(255,255,255,0.7)', margin: 0 }}>The solution</p>
              <p style={{ ...sw, fontWeight: 400, fontSize: 48, color: '#fff', letterSpacing: '-0.96px', lineHeight: '60px', textAlign: 'right', maxWidth: 495, margin: 0 }}>
                {PAGE.solutionHeading}
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 2, background: '#a3a3a3', width: '100%' }} />

            {/* Counter + description */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <p style={{ ...sw, fontWeight: 400, fontSize: 30, color: '#e5e5e5', lineHeight: '38px', margin: 0 }}>01/03</p>
              <p style={{ ...sw, fontWeight: 400, fontSize: 30, color: '#e5e5e5', lineHeight: '38px', textAlign: 'right', maxWidth: 570, margin: 0 }}>
                {PAGE.solutionDesc}
              </p>
            </div>
          </div>
        </section>

        {/* ═══ THE PROCESS — sticky scroll ══════════════════════════════════ */}
        <section style={{ background: '#fff', borderRadius: '40px 40px 0 0', marginTop: -40, position: 'relative', zIndex: 2, padding: '200px 80px 88px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 64, alignItems: 'flex-start', maxWidth: 1280, margin: '0 auto' }}>

            {/* Sticky left */}
            <div style={{ flex: '1 0 0', position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 23 }}>
              <p style={{ ...it, fontWeight: 400, fontSize: 20, color: '#737373', margin: 0 }}>The process</p>
              <h2 style={{ ...sw, fontWeight: 400, fontSize: 48, color: '#000b0d', letterSpacing: '-0.96px', lineHeight: '60px', margin: 0, maxWidth: 403 }}>
                {PAGE.processHeading}
              </h2>
            </div>

            {/* Scrolling steps */}
            <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 88 }}>
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className="anim-fade" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {/* Image */}
                  <div style={{ borderRadius: 24, overflow: 'hidden', height: i < 3 ? 468 : 368, flexShrink: 0 }}>
                    <img src={step.img} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  {/* Text */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <p style={{ ...sw, fontWeight: 400, fontSize: 30, color: '#000b0d', lineHeight: '38px', margin: 0 }}>
                      ({step.num}) {step.title}
                    </p>
                    <p style={{ ...it, fontWeight: 400, fontSize: 18, color: '#737373', lineHeight: '24px', margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ THE OUTCOMES — bento grid ════════════════════════════════════ */}
        <section style={{ background: '#f4f0eb', borderRadius: '30px 30px 0 0', padding: '124px 64px 148px', display: 'flex', flexDirection: 'column', gap: 124, alignItems: 'center' }}>

          {/* Section heading */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', textAlign: 'center' }}>
            <p className="anim-fade" style={{ ...it, fontWeight: 400, fontSize: 20, color: '#737373', margin: 0 }}>The outcomes</p>
            <h2 className="anim-heading-words" style={{ ...sw, fontWeight: 400, fontSize: 48, color: '#000b0d', letterSpacing: '-0.96px', lineHeight: '60px', margin: 0 }}>
              {PAGE.outcomesHeading}
            </h2>
          </div>

          {/* Bento grid */}
          <div className="anim-card-group" style={{ display: 'flex', gap: 32, width: '100%', maxWidth: 1312, alignItems: 'stretch' }}>

            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 547, flexShrink: 0 }}>

              {/* Card 1: Lower carbon footprint */}
              <div className="anim-card" style={{ background: '#fff', borderRadius: 24, padding: '64px 32px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 588, boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <p style={{ ...sw, fontWeight: 400, fontSize: 30, color: '#000b0d', lineHeight: '38px', margin: 0 }}>Lower carbon footprint</p>
                  <p style={{ ...it, fontWeight: 400, fontSize: 18, color: '#737373', lineHeight: '24px', margin: 0, maxWidth: 387 }}>Cut emissions with access to verified renewable energy.</p>
                </div>
                {/* Energy source icon row */}
                <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                  {ENERGY_ICONS.map((icon, i) => (
                    <div key={i} style={{ width: 72, height: 72, borderRadius: '50%', background: '#e9f2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <img src={icon} alt="" style={{ width: 35, height: 35, objectFit: 'contain' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: More predictable costs (dark) */}
              <div className="anim-card" style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 10, flex: 1 }}>
                {/* Background */}
                <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 24 }}>
                  <img src={imgCostGraph} alt="" style={{ position: 'absolute', width: '118%', height: '120%', top: '-20%', left: '-9%', objectFit: 'cover' }} />
                </div>
                {/* Halo overlay */}
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 24 }}>
                  <img src={imgHaloOutcomes} alt="" style={{ position: 'absolute', width: '111%', height: '112%', top: '-2%', left: '-2%' }} />
                </div>
                {/* Text */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <p style={{ ...sw, fontWeight: 400, fontSize: 30, color: '#fff', lineHeight: '38px', margin: 0 }}>More predictable costs</p>
                  <p style={{ ...it, fontWeight: 400, fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: '24px', margin: 0, maxWidth: 375 }}>Move away from volatile pricing and plan with greater confidence.</p>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>

              {/* Card 3: ESG progress (tall image card) */}
              <div className="anim-card" style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', height: 694, flexShrink: 0 }}>
                {/* Background images */}
                <img src={imgEsgBg} alt="" style={{ position: 'absolute', width: '209%', height: '124%', top: '-24%', left: '-42%', objectFit: 'cover' }} />
                <img src={imgEsgBg2} alt="" style={{ position: 'absolute', width: '192%', height: '100%', top: 0, left: '-38%', objectFit: 'cover', opacity: 0.7 }} />
                {/* Halo */}
                <img src={imgHaloOutcomes} alt="" style={{ position: 'absolute', width: '110%', height: '110%', top: '-2%', left: '-2%', opacity: 0.6 }} />
                {/* Gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,40,43,0.85) 0%, transparent 55%)' }} />
                {/* Text at bottom */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 32, display: 'flex', flexDirection: 'column', gap: 17, alignItems: 'flex-end', textAlign: 'right' }}>
                  <p style={{ ...sw, fontWeight: 400, fontSize: 30, color: '#fff', lineHeight: '38px', margin: 0, whiteSpace: 'nowrap' }}>Clear progress toward ESG goals</p>
                  <p style={{ ...it, fontWeight: 400, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: '24px', margin: 0, maxWidth: 444 }}>Back up sustainability commitments with measurable action.</p>
                </div>
              </div>

              {/* Card 4: Operational certainty (white) */}
              <div className="anim-card" style={{ background: '#fff', borderRadius: 24, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 32px', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                  <p style={{ ...sw, fontWeight: 400, fontSize: 30, color: '#000b0d', lineHeight: '38px', margin: 0, whiteSpace: 'nowrap' }}>Greater operational</p>
                  <img src={imgEllipseAccent} alt="" style={{ width: 48, height: 48, flexShrink: 0 }} />
                  <p style={{ ...sw, fontWeight: 400, fontSize: 30, color: '#000b0d', lineHeight: '38px', margin: 0, whiteSpace: 'nowrap' }}>certainty</p>
                </div>
                <p style={{ ...it, fontWeight: 400, fontSize: 18, color: '#737373', lineHeight: '24px', margin: 0, whiteSpace: 'nowrap' }}>Reduce exposure to supply disruption and improve continuity.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CONTACT CTA / FORM ═══════════════════════════════════════════ */}
        <section style={{ background: '#005458', borderRadius: '40px 40px 0 0', padding: '22px 215px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34, overflow: 'hidden' }}>

          {/* Icon */}
          <div className="anim-fade" style={{ width: 58, height: 58, position: 'relative', marginTop: 24 }}>
            <img src={imgCtaIcon} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>

          {/* Heading */}
          <h2 className="anim-fade" style={{ ...sw, fontWeight: 400, fontSize: 48, color: '#fff', letterSpacing: '-0.96px', lineHeight: '60px', textAlign: 'center', maxWidth: 1010, margin: 0 }}>
            {PAGE.ctaHeading}
          </h2>

          {/* Form */}
          <div className="anim-fade">
            <ContactForm />
          </div>
        </section>

        {/* ═══ FOOTER REVEAL SPACER + FOOTER ══════════════════════════════ */}
        <div style={{ height: 821 }} />
        <Footer />
      </div>
    </>
  );
}
