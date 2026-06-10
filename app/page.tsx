'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import Link from 'next/link';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import REW2 from '@/components/REW2';
import WhyNoa from '@/components/WhyNoa';
import Stakeholders from '@/components/Stakeholders';
import FAQ from '@/components/FAQ';

/* ── Assets ──────────────────────────────────────────────────────────────── */
// Arrow icons
const imgArrowUpRight  = 'https://www.figma.com/api/mcp/asset/48910a28-a9c8-4c7e-9eaf-b7f15d205cef';
const imgArrowUpRight2 = 'https://www.figma.com/api/mcp/asset/7ff455a6-dd82-4e9e-9bd9-6f148a1ad8bc';
// ESG
const imgESGBg         = 'https://www.figma.com/api/mcp/asset/a49dd77c-ec56-4db0-9520-47bab68778da'; // solar panel bg
const imgESGRing       = 'https://www.figma.com/api/mcp/asset/2eb7f0d3-7f8a-430f-aa7d-5c0f06ef428a'; // thin arc ring
// Projects
const imgProjCard1  = 'https://www.figma.com/api/mcp/asset/419793e3-ecca-412e-904a-7b931831ef3f'; // from Figma 474-1558
const imgProjCard2  = '/assets/p1.jpg';
const imgProjArrow  = 'https://www.figma.com/api/mcp/asset/9cc21ad1-c352-4644-9371-8f8b5d1d1e21'; // diagonal arrow
// Insights — local assets (no expiry)
const imgArticle1      = '/assets/insight1.jpg'; // man on phone
const imgArticle2      = '/assets/insight2.jpg'; // two women
const imgArticle3      = '/assets/insight3.jpg'; // woman, curly hair
const imgArrowDown01   = 'https://www.figma.com/api/mcp/asset/c6efd98d-5546-4def-b88d-aab746b33ae4'; // Figma node 462-5036
// Form ring/loader logo at top of the contact CTA
const imgFormLogo      = 'https://www.figma.com/api/mcp/asset/f087ad06-7f0a-49f7-af75-513b4ffd62bb';

/* ── Data ────────────────────────────────────────────────────────────────── */
const STATS = [
  { label: 'Energy experience',       display: '100+', desc: 'Years combined expertise of the senior leadership team.',           border: '#00c0b5' },
  { label: 'Energy under construction', display: '1,5GW', desc: 'Assets currently under construction across South Africa.',       border: '#d4d4d4' },
  { label: 'Energy allocated',        display: '1GW',  desc: 'Clean energy already contracted to our portfolio of customers.',    border: '#d4d4d4' },
];


const PROJECTS = [
  {
    img:   imgProjCard2,
    title: 'Khauta solar energy facility',
    desc:  'Our Khauta solar energy facility is under construction near Welkom. Find project information here',
    stats: [['Location', 'Welkom'], ['Status', 'In progress'], ['Capacity (MW)', '504MW'], ['Date', 'Feb, May, 2026']] as [string, string][],
  },
  {
    img:   imgProjCard1,
    title: 'Wind Garden energy facility',
    desc:  'A landmark wind energy facility in the heart of the Eastern Cape.',
    stats: [['Location', 'Makhanda, EC'], ['Status', 'Completed'], ['Capacity', '86 MW'], ['Date', 'Feb 2026']] as [string, string][],
  },
];

const FAQS = [
  { q: 'How does the process work?',            a: 'Our process typically starts with an initial consultation, followed by solution design, project development, and implementation, with continued support throughout.' },
  { q: 'Can your solutions be customised?',     a: 'Yes. Every engagement is tailored to your specific energy requirements, consumption profile, and commercial objectives.' },
  { q: 'How long does it take to get started?', a: 'Timelines vary by project scope, but our aggregator model means we can often begin delivering renewable energy faster than traditional procurement routes.' },
];

/* ── Shared style shorthand ──────────────────────────────────────────────── */
const sw: React.CSSProperties = { fontFamily: 'Switzer, sans-serif' };
const it: React.CSSProperties = { fontFamily: 'Inter, Switzer, sans-serif' };

/* Form input style — Figma 462-5036 (refresh) */
const formInput: React.CSSProperties = {
  background: 'rgba(0,0,0,0.15)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: 'none',
  borderRadius: 16,
  height: 55,
  padding: '18px 16px',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '20px',
  color: '#fff',
  outline: 'none',
  width: '100%',
  flex: 1,
  minWidth: 0,
  boxSizing: 'border-box',
};

/* ── Primitives ──────────────────────────────────────────────────────────── */
function Label({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div className="anim-fade" style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 12px', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
      <span style={{ ...it, fontWeight: 400, fontSize: 14, letterSpacing: '0.01em', color: dark ? 'rgba(255,255,255,0.5)' : '#737373' }}>{text}</span>
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

/* ── Stat number — mask slide-up (same motion as anim-heading-words) ─────── */
function StatNumber({ value }: { value: string }) {
  return (
    <div style={{ overflow: 'hidden', padding: '6px 0' }}>
      <p className="anim-stat-num" style={{
        ...it,
        fontWeight: 300,
        fontSize: 96,
        letterSpacing: '-2.88px',
        lineHeight: 1,
        margin: 0,
        textAlign: 'center',
        background: 'linear-gradient(to top, #878787, #212121)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>{value}</p>
    </div>
  );
}

/* ── Glow card ───────────────────────────────────────────────────────────── */
function GlowCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // Nearest point on the card rectangle to the mouse
      const cx = Math.max(0, Math.min(mx, rect.width));
      const cy = Math.max(0, Math.min(my, rect.height));

      // Distance from mouse to nearest border
      const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
      const intensity = Math.max(0, 1 - dist / 180);

      if (intensity <= 0) {
        el.style.background = '#D4D4D4';
        el.style.boxShadow = 'none';
        return;
      }

      // Interpolate opaque rgb between gray #D4D4D4 and teal #00c0b5 — avoids white alpha banding
      const r    = Math.round(212 * (1 - intensity));
      const g    = Math.round(212 - 20 * intensity);
      const b    = Math.round(212 - 31 * intensity);
      const size = 60 + intensity * 220;
      el.style.background = `radial-gradient(${size}px circle at ${cx}px ${cy}px, rgb(${r},${g},${b}), #D4D4D4 75%)`;
      el.style.boxShadow  = 'none';
    };

    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        padding: 1,
        borderRadius: 24,
        background: '#D4D4D4',
        width: 296,
        height: 282,
        flexShrink: 0,
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        background: '#fff',
        borderRadius: 23,
        width: '100%',
        height: '100%',
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}>
        {children}
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Home() {
  const [showHero, setShowHero] = useState(true);
  const [form, setForm]           = useState({ name: '', surname: '', company: '', help: '', email: '', phone: '', message: '' });
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    /* ── Initial states ── */
    // anim-mask-line removed — replaced by .anim-heading-words
    gsap.set('.anim-fade',      { opacity: 0, y: 24 });
    gsap.set('.anim-card',      { opacity: 0, y: 48 });
    gsap.set('.anim-stat-num',  { y: '115%' });
    gsap.set('.anim-image',     { opacity: 0, scale: 1.06 });
    gsap.set('.anim-line',      { scaleX: 0, transformOrigin: 'left' });

    // .anim-heading / MaskLine removed — headings now use .anim-heading-words below
    gsap.utils.toArray<Element>('.anim-fade').forEach(el => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 91%', once: true },
      });
    });
    gsap.utils.toArray<Element>('.anim-card-group').forEach(group => {
      const cards = group.querySelectorAll('.anim-card');
      // Cards float in — slower, more breathing room
      gsap.to(cards, {
        opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', stagger: 0.18,
        scrollTrigger: { trigger: group, start: 'top 82%', once: true },
      });
      // Numbers slide up from mask — staggered in sync with their parent card
      const nums = group.querySelectorAll('.anim-stat-num');
      if (nums.length) {
        gsap.to(nums, {
          y: '0%', duration: 1.1, ease: 'power3.out', stagger: 0.18,
          scrollTrigger: { trigger: group, start: 'top 82%', once: true },
          delay: 0.15, // slight head-start so number arrives as card settles
        });
      }
    });
    gsap.utils.toArray<Element>('.anim-image').forEach(el => {
      gsap.to(el, { opacity: 1, scale: 1, duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
    gsap.utils.toArray<Element>('.anim-parallax').forEach(el => {
      gsap.fromTo(el, { yPercent: -20 }, {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: (el as HTMLElement).closest('[data-parallax-section]') || el, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
    });

    gsap.utils.toArray<Element>('.anim-line').forEach(el => {
      gsap.to(el, { scaleX: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });

    const splitInstances: SplitText[] = [];
    gsap.utils.toArray<Element>('.anim-text-reveal').forEach(el => {
      const split = new SplitText(el, { type: 'words' });
      splitInstances.push(split);
      gsap.set(split.words, { color: '#d4d4d4' });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 40%', scrub: 1 },
      });
      tl.to(split.words, { color: '#262626', stagger: 0.1, ease: 'none' });
    });

    /* ── Hero kill — unmount once stats section fully covers it ── */
    if (statsRef.current) {
      ScrollTrigger.create({
        trigger:     statsRef.current,
        start:       'top top',       // stats section top reaches viewport top = hero 100% hidden
        onEnter:     () => setShowHero(false),
        onLeaveBack: () => setShowHero(true),
      });
    }

    /* ── Section headings — fade + mask-up word by word ── */
    const wordInstances: SplitText[] = [];
    gsap.utils.toArray<Element>('.anim-heading-words').forEach(el => {
      const split = new SplitText(el, { type: 'words' });
      wordInstances.push(split);

      // Wrap each word in an overflow:hidden shell so the translateY is clipped
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
        duration: 0.85, ease: 'power3.out',
        stagger: 0.055,
        scrollTrigger: { trigger: el, start: 'top 87%', once: true },
      });
    });

    /* ── Projects — stacking cards ──────────────────────────────────────────────
        card-2 starts at window.innerHeight below the container (well below the
        viewport bottom). The container has overflow:visible so card-2's rounded
        top is visible as it rises from below the viewport edge — no mask.
        180px of scroll completes the whole animation so the heading is still
        visible in the upper viewport and the CTA is just coming into view.
    ── */
    const projLabel    = document.querySelector<HTMLElement>('.proj-label');
    const projViewport = document.querySelector<HTMLElement>('.proj-viewport');
    if (projLabel && projViewport) {
      const card1 = projViewport.querySelector<HTMLElement>('.proj-card-1');
      const card2 = projViewport.querySelector<HTMLElement>('.proj-card-2');
      if (card1 && card2) {
        // Place card-2 roughly at viewport bottom (unclipped — visible below container)
        gsap.set(card2, { y: window.innerHeight });

        const projTl = gsap.timeline({
          scrollTrigger: {
            trigger:      projLabel,
            start:        'top 20px',
            end:          '+=200px',
            scrub:        0.8,          // snappier than 1.5
            invalidateOnRefresh: true,
          },
        });

        // card-1 shrinks AND moves up so it peeks above card-2's top edge
        // card-2 rises from the viewport bottom simultaneously
        projTl
          .to(card1, { scale: 0.88, y: -80, opacity: 0.4, filter: 'blur(6px)', ease: 'power2.out' }, 0)
          .to(card2, { y: 0, ease: 'power2.out' }, 0);
      }
    }

    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach(t => t.kill());
      splitInstances.forEach(s => s.revert());
      wordInstances.forEach(s => s.revert());
    };
  }, []);

  /* ── Render ────────────────────────────────────────────────────────────── */
  return (
    <>
    <div style={{
      background: '#fff',
      position: 'relative',
      zIndex: 1,
      display: 'flow-root', // prevents child margins (e.g. Stats marginTop:100vh) from collapsing
                            // out of the wrap and leaving the footer exposed at the top.
    }}>

      {/* ══ HERO — fixed, slides behind content; unmounted once stats covers it */}
      {showHero && <Hero />}

      {/* ══ STATS SECTION — rounded top peeks from bottom, slides over hero ═ */}
      <section ref={statsRef} style={{
        background: '#fff',
        borderRadius: '40px 40px 0 0',
        position: 'relative',
        zIndex: 4,
        marginTop: '100vh',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '100px 96px',
        boxSizing: 'border-box',
        overflow: 'clip',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 60, width: '100%' }}>

          {/* ══ INTRO BLOCK (Figma 832-1315) ═════════════════════════════ */}
          <div className="anim-fade" style={{ background: '#f5f5f5', borderRadius: 40, padding: '100px 60px', display: 'flex', flexDirection: 'column', gap: 73, alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>

            {/* Heading */}
            <p style={{ ...sw, fontWeight: 400, fontSize: 48, color: '#000b0d', letterSpacing: '-0.96px', lineHeight: '60px', textAlign: 'center', maxWidth: 946, margin: 0 }}>
              Something has changed in the way businesses think about energy. It had to.
            </p>

            {/* 4 cards */}
            <div className="anim-card-group" style={{ display: 'flex', gap: 12, width: '100%', perspective: '1400px' }}>

              {/* 01 — dark teal */}
              <div
                className="anim-card"
                onMouseEnter={e => { e.currentTarget.style.transition = 'transform 0.12s linear, box-shadow 0.35s ease'; }}
                onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5; const py = (e.clientY - r.top) / r.height - 0.5; e.currentTarget.style.transform = `translateY(-6px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`; }}
                onMouseLeave={e => { e.currentTarget.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease'; e.currentTarget.style.transform = ''; }}
                style={{ flex: '1 0 0', background: '#00676d', borderRadius: 24, padding: 32, height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box', transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                <p style={{ ...sw, fontWeight: 400, fontSize: 24, color: '#00c0b5', lineHeight: '34px', margin: 0 }}>01</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <p style={{ ...sw, fontWeight: 500, fontSize: 30, color: '#fff', lineHeight: '38px', margin: 0 }}>
                    Energy strategy{'\n'}has become{'\n'}business strategy.
                  </p>
                  <div style={{ width: 92, height: 5, background: '#00c0b5', borderRadius: 2 }} />
                </div>
              </div>

              {/* 02 — white */}
              <div
                className="anim-card"
                onMouseEnter={e => { e.currentTarget.style.transition = 'transform 0.12s linear, box-shadow 0.35s ease'; }}
                onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5; const py = (e.clientY - r.top) / r.height - 0.5; e.currentTarget.style.transform = `translateY(-6px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`; }}
                onMouseLeave={e => { e.currentTarget.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease'; e.currentTarget.style.transform = ''; }}
                style={{ flex: '1 0 0', background: '#fff', borderRadius: 24, padding: 32, height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box', transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                <p style={{ ...sw, fontWeight: 400, fontSize: 24, color: '#737373', lineHeight: '34px', margin: 0 }}>02</p>
                <p style={{ ...it, fontWeight: 400, fontSize: 16, color: '#737373', lineHeight: '24px', margin: 0 }}>
                  Costs are volatile, reliability cannot be assumed, and the pressure to decarbonise is rising — from your supply chain, your customers, your investors.
                </p>
              </div>

              {/* 03 — white */}
              <div
                className="anim-card"
                onMouseEnter={e => { e.currentTarget.style.transition = 'transform 0.12s linear, box-shadow 0.35s ease'; }}
                onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5; const py = (e.clientY - r.top) / r.height - 0.5; e.currentTarget.style.transform = `translateY(-6px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`; }}
                onMouseLeave={e => { e.currentTarget.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease'; e.currentTarget.style.transform = ''; }}
                style={{ flex: '1 0 0', background: '#fff', borderRadius: 24, padding: 32, height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box', transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                <p style={{ ...sw, fontWeight: 400, fontSize: 24, color: '#737373', lineHeight: '34px', margin: 0 }}>03</p>
                <p style={{ ...it, fontWeight: 400, fontSize: 16, color: '#737373', lineHeight: '24px', margin: 0 }}>
                  At the same time, the private energy market is opening up — bringing real opportunity, and real complexity. New players, new contract structures, new concepts.
                </p>
              </div>

              {/* 04 — white */}
              <div
                className="anim-card"
                onMouseEnter={e => { e.currentTarget.style.transition = 'transform 0.12s linear, box-shadow 0.35s ease'; }}
                onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5; const py = (e.clientY - r.top) / r.height - 0.5; e.currentTarget.style.transform = `translateY(-6px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`; }}
                onMouseLeave={e => { e.currentTarget.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease'; e.currentTarget.style.transform = ''; }}
                style={{ flex: '1 0 0', background: '#fff', borderRadius: 24, padding: 32, height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box', transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                <p style={{ ...sw, fontWeight: 400, fontSize: 24, color: '#737373', lineHeight: '34px', margin: 0 }}>04</p>
                <p style={{ ...it, fontWeight: 400, fontSize: 16, color: '#737373', lineHeight: '24px', margin: 0 }}>
                  NOA exists to make this easy to navigate. NOA gives South Africa&apos;s large energy users a route to clean, competitively priced electricity — without adding operational complexity.
                </p>
              </div>

            </div>
          </div>

          {/* Intro paragraph */}
          <p className="anim-text-reveal" style={{ ...sw, fontWeight: 500, fontSize: 32, color: '#d4d4d4', lineHeight: '42px', textAlign: 'center', maxWidth: 1100, margin: 0 }}>
            NOA generates clean electricity, aggregates it from a national portfolio of wind, solar and battery energy storage assets, and delivers it to commercial and industrial customers through customised energy supply agreements. We are a fully integrated renewable energy independent power producer, aggregator and NERSA-licensed energy trader.
          </p>

          {/* Stat cards */}
          <div className="anim-card-group" style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            {STATS.map(s => (
              <GlowCard key={s.label} className="anim-card">
                <p style={{ ...it, fontWeight: 400, fontSize: 16, color: '#737373', lineHeight: '24px', textAlign: 'center', margin: 0, whiteSpace: 'nowrap' }}>{s.label}</p>
                <StatNumber value={s.display} />
                <p style={{ ...it, fontWeight: 400, fontSize: 16, color: '#525252', lineHeight: '24px', margin: 0, textAlign: 'center' }}>{s.desc}</p>
              </GlowCard>
            ))}
          </div>

        </div>
      </section>

      {/* ══ REW2 — pinned section, horizontally-scrubbed steps with synced progress dots ══ */}
      <REW2 />

      {/* ══ WHY NOA — sticky-stacking rows (reusable component) ═══════════ */}
      <WhyNoa />

      {/* ══ OUR ELECTRONS ════════════════════════════════════════════════════
          z=2 sits between WhyNoa above and Projects (z=4, marginTop:-40) below.
      */}
      <section style={{
        position: 'relative', zIndex: 2,
        marginTop: 80,
        minHeight: 900,
        overflow: 'clip',
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '64px 64px 105px',
        boxSizing: 'border-box',
      }}>
        {/* Background photo */}
        <img src="/assets/Contact.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />

        {/* Content */}
        <div className="anim-fade" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24, maxWidth: 716, height: 560 }}>
          {/* Eyebrow + heading + body */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ ...it, fontWeight: 400, fontSize: 20, color: 'rgba(255,255,255,0.5)', lineHeight: '30px', margin: 0 }}>Our electrons</p>
            <h2 style={{ ...sw, fontWeight: 400, fontSize: 48, color: '#fff', letterSpacing: '-0.96px', lineHeight: '60px', margin: 0, maxWidth: 704 }}>
              The origins of our electrons and why you should know about it
            </h2>
            <p style={{ ...it, fontWeight: 400, fontSize: 18, color: '#fff', lineHeight: '24px', margin: 0, maxWidth: 634 }}>
              NOA generates clean energy from our own wind and solar facilities, while also sourcing additional power from trusted independent power producers (IPPs) across South Africa. By combining our own generation with a carefully selected IPP network, we&apos;re able to deliver more reliable supply and a higher share of renewable energy than any single source alone.
            </p>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Link href="/how-it-works" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: 58, padding: '0 24px', borderRadius: 16,
              background: '#fff', backdropFilter: 'blur(21.5px)', WebkitBackdropFilter: 'blur(21.5px)',
              textDecoration: 'none', flexShrink: 0,
            }}>
              <span style={{ ...it, fontWeight: 500, fontSize: 20, color: '#000', whiteSpace: 'nowrap' }}>Explore our generation portfolio</span>
            </Link>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: 58, padding: '0 24px', borderRadius: 16,
              background: 'rgba(0,0,0,0.17)', backdropFilter: 'blur(21.5px)', WebkitBackdropFilter: 'blur(21.5px)',
              textDecoration: 'none', flexShrink: 0,
            }}>
              <span style={{ ...it, fontWeight: 500, fontSize: 20, color: '#fff', whiteSpace: 'nowrap' }}>Talk to an energy expert</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ════════════════════════════════════════════════════════════
          z=4, rounded top, marginTop:-40 slides over ESG.
          .proj-eyebrow triggers the card-stack animation when it's 40px from top.
          Cards are inset 96px each side with rounded corners; overflow:hidden clips
          card-2 until it scrubs up from below card-1 which scales back.
      */}
      <section style={{ background: '#f5f5f5', borderRadius: '40px 40px 0 0', marginTop: -40, position: 'relative', zIndex: 4, overflow: 'clip' }}>

        {/* ── Centered header — .proj-label is the precise GSAP trigger ──────── */}
        {/* position+zIndex keeps the title above card-1 as it rises toward it */}
        <div style={{ padding: '96px 96px 64px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, position: 'relative', zIndex: 2 }}>
          <div className="proj-label"><p className="anim-fade" style={{ ...it, fontWeight: 400, fontSize: 16, color: '#737373', margin: 0 }}>Projects</p></div>
          <h2 className="anim-heading-words" style={{ ...sw, fontWeight: 400, fontSize: 52, color: '#000b0d', letterSpacing: '-1.6px', lineHeight: '60px', margin: 0, textAlign: 'center' }}>
            Building a portfolio of ongoing projects<br />spanning South Africa
          </h2>
        </div>

        {/* ── Stacking card viewport — overflow:hidden clips card-2 below.
              borderRadius is on each CARD (not here) so scaling preserves corners. */}
        <div className="proj-viewport" style={{ position: 'relative', height: 607, overflow: 'visible', margin: '0 96px' }}>
          {PROJECTS.map((proj, i) => (
            <div
              key={i}
              className={`proj-card proj-card-${i + 1}`}
              style={{ position: 'absolute', inset: 0, borderRadius: 18, overflow: 'hidden' }}
            >
              {/* Full-bleed image */}
              <img
                src={proj.img}
                alt={proj.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Gradient overlay — darker on left where panel sits */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 65%)' }} />

              {/* ── Frosted glass info panel — left-aligned, vertically centred ── */}
              <div style={{
                position: 'absolute', left: 83, top: '50%', transform: 'translateY(-50%)',
                width: 452, background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
                borderRadius: 24, padding: '48px 40px', boxSizing: 'border-box',
                display: 'flex', flexDirection: 'column', gap: 24,
              }}>
                {/* Diagonal arrow — top-right corner of panel */}
                <img
                  src={imgProjArrow}
                  alt=""
                  style={{ position: 'absolute', top: 32, right: 32, width: 24, height: 24, opacity: 0.75 }}
                />

                <h3 style={{ ...sw, fontWeight: 400, fontSize: 30, color: '#fff', letterSpacing: '-1px', margin: 0, lineHeight: 1.15 }}>
                  {proj.title}
                </h3>

                <p style={{ ...it, fontWeight: 400, fontSize: 18, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.55, maxWidth: 340 }}>
                  {proj.desc}
                </p>

                {/* 2×2 stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 32px' }}>
                  {proj.stats.map(([k, v]) => (
                    <div key={k}>
                      <p style={{ ...it, fontWeight: 400, fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{k}</p>
                      <p style={{ ...it, fontWeight: 500, fontSize: 16, color: '#fff', margin: '6px 0 0' }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA below card stack — solid bg + z:1 covers card-2 as it travels up */}
        <div style={{ padding: '48px 96px 96px', display: 'flex', justifyContent: 'center', background: '#f5f5f5', position: 'relative', zIndex: 1 }}>
          <Link href="/projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, height: 60, padding: '0 32px',
            background: '#fff', borderRadius: 16, textDecoration: 'none',
          }}>
            <span style={{ ...it, fontWeight: 500, fontSize: 18, color: '#000b0d', whiteSpace: 'nowrap' }}>See all projects</span>
            <img src={imgArrowUpRight} alt="" style={{ width: 18, height: 18 }} />
          </Link>
        </div>

      </section>

      {/* ══ INSIGHTS ══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '96px 96px', display: 'flex', flexDirection: 'column', gap: 48 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p className="anim-fade" style={{ ...it, fontWeight: 400, fontSize: 16, color: '#737373', margin: 0 }}>Insights</p>
            <h2 className="anim-heading-words" style={{ ...sw, fontWeight: 400, fontSize: 52, color: '#000b0d', letterSpacing: '-1.6px', lineHeight: '60px', margin: 0 }}>
              Thinking beyond the grid
            </h2>
          </div>
          <div className="anim-fade">
            <Link href="/insights" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, height: 52, padding: '0 22px',
              background: '#f4f0eb', borderRadius: 14, textDecoration: 'none',
            }}>
              <span style={{ ...it, fontWeight: 500, fontSize: 16, color: '#000b0d', letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>View all insights</span>
              <img src={imgArrowUpRight} alt="" style={{ width: 18, height: 18 }} />
            </Link>
          </div>
        </div>

        {/*
          Figma 481-1906: no card background — open layout.
          Portrait image (aspect 431.75 / 539.69) with borderRadius 24.
          Text below: date 14px #000b0d · title 20px Inter #404040 · gap 7px.
          Grid gap 10px.
        */}
        <div className="anim-card-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { href: '/insights/1', date: '10.31.25', title: 'Community connect: The people powered by Wind Garden',  img: imgArticle1 },
            { href: '/insights/2', date: '10.31.25', title: 'NERSA grants trading license to NOA Trading',            img: imgArticle2 },
            { href: '/insights/3', date: '10.31.25', title: "Reasons to be optimistic about SA's energy future",     img: imgArticle3 },
          ].map((a, i) => (
            <Link
              key={i}
              href={a.href}
              className="anim-card"
              style={{ display: 'flex', flexDirection: 'column', gap: 16, textDecoration: 'none' }}
            >
              {/* Portrait image — fixed 540px height matches Figma (539.69px).
                  No percentage tricks; the container establishes its own block-axis size. */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: 540,
                borderRadius: 24,
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <img
                  src={a.img}
                  alt={a.title}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Text below image — no card background */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, maxWidth: 400 }}>
                <span style={{ ...it, fontWeight: 400, fontSize: 14, color: '#000b0d', lineHeight: '20px' }}>
                  {a.date}
                </span>
                <p style={{ ...it, fontWeight: 400, fontSize: 20, color: '#404040', lineHeight: '24px', margin: 0 }}>
                  {a.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ FAQ ════════════════════════════════════════════════════════════════ */}
      <FAQ items={FAQS} />

    </div>
    {/* ── End of white wrap. Form section sits OUTSIDE the wrap so its rounded
       bottom corners reveal the fixed footer behind, not the wrap's white bg. */}

    {/* ══ CONTACT FORM CTA — from Figma 462-5036 (refresh) ══════════════════ */}
      <section style={{
        background: '#005458',
        borderRadius: 0,
        padding: '88px 60px',
        display: 'flex', justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ width: '100%', maxWidth: 1010, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34 }}>

          {/* Ring/loader logo */}
          <img className="anim-fade" src={imgFormLogo} alt="" style={{ width: 70, height: 70 }} />

          {/* Heading */}
          <h2 className="anim-heading-words" style={{
            ...sw, fontWeight: 400, fontSize: 48, color: '#fff',
            letterSpacing: '-0.96px', lineHeight: '60px',
            textAlign: 'center', margin: 0, width: '100%',
          }}>
            Take the next step toward reliable energy
          </h2>

          {/* Form — two 500px columns, 10px gap */}
          <div className="anim-fade" style={{
            display: 'flex', gap: 10, alignItems: 'flex-start',
            width: '100%', maxWidth: 1010,
          }}>
            {/* Left column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Name + Surname */}
              <div style={{ display: 'flex', gap: 10 }}>
                {(['Name*', 'Surname*'] as const).map(label => (
                  <input
                    key={label}
                    placeholder={label}
                    value={label === 'Name*' ? form.name : form.surname}
                    onChange={e => setForm(f => ({ ...f, [label === 'Name*' ? 'name' : 'surname']: e.target.value }))}
                    style={formInput}
                  />
                ))}
              </div>
              {/* Company name */}
              <input placeholder="Company name*" value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                style={formInput} />
              {/* How can we help? — custom select with arrow icon */}
              <div style={{ position: 'relative' }}>
                <select value={form.help}
                  onChange={e => setForm(f => ({ ...f, help: e.target.value }))}
                  style={{ ...formInput, paddingRight: 48, cursor: 'pointer', appearance: 'none', color: form.help ? '#fff' : '#00c0b5' }}>
                  <option value="" disabled hidden>How can we help?*</option>
                  <option value="energy-trading">Energy Trading</option>
                  <option value="renewable-supply">Renewable Energy Supply</option>
                  <option value="project-dev">Project Development</option>
                  <option value="general">General Enquiry</option>
                </select>
                <img src={imgArrowDown01} alt=""
                  style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 24, height: 24, pointerEvents: 'none' }} />
              </div>
              {/* Email */}
              <input placeholder="Email address *" type="email" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={formInput} />
              {/* Phone */}
              <input placeholder="Phone number *" type="tel" value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                style={formInput} />

              {/* Captcha row — border + faux checkbox tile + labels */}
              <div style={{
                background: 'rgba(0,0,0,0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid #013b3e',
                borderRadius: 16,
                height: 55,
                padding: '0 16px 0 11px',
                display: 'flex', alignItems: 'center', gap: 10,
                boxSizing: 'border-box',
              }}>
                <div style={{ width: 35.365, height: 35.365, borderRadius: 6, background: '#014448', flexShrink: 0 }} />
                <span style={{ ...it, fontWeight: 500, fontSize: 16, lineHeight: '24px', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>I am not a robot</span>
                <span style={{ ...it, fontWeight: 500, fontSize: 16, lineHeight: '24px', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>Captcha</span>
              </div>
            </div>

            {/* Right column — Message + Button */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center', alignSelf: 'stretch' }}>
              <textarea placeholder="Message" value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{
                  ...formInput,
                  height: 316, minHeight: 316,
                  paddingTop: 18, paddingBottom: 18,
                  resize: 'none', fontFamily: 'Inter, sans-serif',
                }} />
              <button type="button" style={{
                background: '#00c0b5', border: 'none', borderRadius: 16,
                height: 58, padding: 24, cursor: 'pointer',
                display: 'flex', alignItems: 'center',
                backdropFilter: 'blur(21.5px)',
                WebkitBackdropFilter: 'blur(21.5px)',
                ...it, fontWeight: 500, fontSize: 20, color: '#000b0d', lineHeight: '30px',
                width: '100%',
              }}>
                Get expert advice
              </button>
            </div>
          </div>
        </div>
      </section>

    {/* ══ FOOTER REVEAL SPACER ════════════════════════════════════════════════
       Transparent scroll space lets the fixed footer (z=0) become visible
       as the user scrolls past the form. */}
    <div style={{ height: 821 }} />

    {/* ══ FOOTER ═════════════════════════════════════════════════════════════ */}
    <Footer />
    </>
  );
}
