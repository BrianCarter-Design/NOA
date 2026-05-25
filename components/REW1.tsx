'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

/* ── Assets ──────────────────────────────────────────────────────────────── */
const imgREWBg = 'https://www.figma.com/api/mcp/asset/d731b580-142c-4f81-83b0-677cbaee100e';

/* ── Data ────────────────────────────────────────────────────────────────── */
const REW_STEPS = [
  { num: '01', label: 'Energy source',     desc: 'Wheeling is the transportation of energy from a renewable energy generating source, such as a wind or solar PV plant.' },
  { num: '02', label: 'Grid transmission', desc: 'The electricity travels via an existing distribution and transmission grid across the country.' },
  { num: '03', label: 'End user delivery', desc: 'Delivered to an end user in a different location, using the national grid.' },
];

/* ── Shared style shorthand ──────────────────────────────────────────────── */
const sw: React.CSSProperties = { fontFamily: 'Switzer, sans-serif' };
const it: React.CSSProperties = { fontFamily: 'Inter, Switzer, sans-serif' };

/* ── Component ───────────────────────────────────────────────────────────── */
export default function REW1() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const rewViewport = wrapRef.current?.querySelector<HTMLElement>('.rew1-viewport');
    if (!rewViewport) return;

    const rewCards = Array.from(rewViewport.querySelectorAll<HTMLElement>('.rew1-card'));

    // Start all cards below the viewport
    gsap.set(rewCards, { y: '100vh' });

    /* ── GSAP pin — works with Lenis. Cards scrub up from below. ── */
    const rewTl = gsap.timeline({
      scrollTrigger: {
        trigger:           rewViewport,
        pin:               true,
        anticipatePin:     1,
        start:             'top top',
        end:               '+=200%',   // pin for 2× viewport height
        scrub:             1.5,
        invalidateOnRefresh: true,
      },
    });

    // card 0 → 1 → 2, each starting 25% into the scroll after the last
    rewCards.forEach((card, i) => {
      rewTl.to(card, { y: 0, ease: 'power2.out' }, i * 0.25);
    });

    /* ── Heading words ── */
    const wordInstances: SplitText[] = [];
    rewViewport.querySelectorAll<Element>('.rew1-heading-words').forEach(el => {
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
        duration: 0.85, ease: 'power3.out',
        stagger: 0.055,
        scrollTrigger: { trigger: el, start: 'top 87%', once: true },
      });
    });

    /* ── Fade elements ── */
    rewViewport.querySelectorAll<Element>('.rew1-fade').forEach(el => {
      gsap.set(el, { opacity: 0, y: 24 });
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 91%', once: true },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        // Only kill triggers whose trigger element lives inside this component
        if (wrapRef.current?.contains(t.trigger as Node)) t.kill();
      });
      wordInstances.forEach(s => s.revert());
    };
  }, []);

  return (
    /*
     * REW1 — GSAP-pinned section.
     * Left col:  heading + copy + CTAs, absolutely positioned, always visible during pin.
     * Right col: .rew1-card divs — GSAP drives them from translateY(100vh) → 0, staggered.
     * ScrollTrigger auto-adds padding so the next sibling section follows only after all cards land.
     */
    <div ref={wrapRef} style={{ position: 'relative', zIndex: 3, marginTop: '-40px' }}>

      {/* Viewport — GSAP ScrollTrigger pins this while cards scroll in */}
      <div className="rew1-viewport" style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>

        {/* Background */}
        <img
          src={imgREWBg}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center bottom' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(153deg, rgba(0,0,0,0.55) 26%, rgba(0,0,0,0.05) 60%)' }} />

        {/* Left content — spans full height */}
        <div style={{
          position: 'absolute', left: 96, top: 0, bottom: 0, zIndex: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          paddingTop: 88, paddingBottom: 88, width: 546,
        }}>
          {/* Label + heading */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p className="rew1-fade" style={{ ...it, fontWeight: 400, fontSize: 16, color: 'rgba(255,255,255,0.5)', margin: 0 }}>How it works</p>
            <h2 className="rew1-heading-words" style={{ ...sw, fontWeight: 400, fontSize: 52, color: '#fff', letterSpacing: '-1.6px', lineHeight: '60px', margin: 0 }}>
              Renewable<br />energy wheeling
            </h2>
          </div>

          {/* Body copy */}
          <p style={{ ...it, fontWeight: 400, fontSize: 16, color: '#a3a3a3', lineHeight: '24px', margin: 0 }}>
            In South Africa, Eskom enables the private sector to wheel energy through its transmission infrastructure. NOA wheels renewable energy from its own assets and third-party IPPs, supplying a greater share of customers' energy needs through diversified energy sources and locations.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', height: 58, padding: '0 24px',
              background: '#fff', backdropFilter: 'blur(21.5px)', WebkitBackdropFilter: 'blur(21.5px)',
              borderRadius: 16, textDecoration: 'none', flexShrink: 0,
            }}>
              <span style={{ ...it, fontWeight: 500, fontSize: 20, color: '#000b0d', whiteSpace: 'nowrap' }}>Get expert advice</span>
            </Link>
            <Link href="/solutions" style={{
              display: 'inline-flex', alignItems: 'center', height: 58, padding: '0 24px',
              background: 'rgba(0,0,0,0.17)', backdropFilter: 'blur(21.5px)', WebkitBackdropFilter: 'blur(21.5px)',
              borderRadius: 16, textDecoration: 'none', flexShrink: 0,
            }}>
              <span style={{ ...it, fontWeight: 500, fontSize: 20, color: '#fff', whiteSpace: 'nowrap' }}>Learn more</span>
            </Link>
          </div>
        </div>

        {/* Right cards — GSAP drives these from translateY(100vh) → 0 */}
        <div style={{
          position: 'absolute', right: 96, top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: 12, width: 580,
        }}>
          {REW_STEPS.map((step) => (
            <div key={step.num} className="rew1-card" style={{
              background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(54px)', WebkitBackdropFilter: 'blur(54px)',
              borderRadius: 24, padding: 50, minHeight: 229,
              display: 'flex', flexDirection: 'column', gap: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ ...sw, fontWeight: 400, fontSize: 24, color: '#fff', letterSpacing: '-0.5px', lineHeight: '34px', margin: 0 }}>{step.label}</h3>
                <span style={{ ...it, fontWeight: 600, fontSize: 16, color: '#fff' }}>{step.num}</span>
              </div>
              <p style={{ ...it, fontWeight: 400, fontSize: 16, color: '#a3a3a3', lineHeight: '24px', margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>

      </div>{/* end rew1-viewport */}

    </div>
  );
}
