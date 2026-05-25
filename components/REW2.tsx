'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

/* ── Assets ──────────────────────────────────────────────────────────────── */
// Background: sunset highway with light streaks (Figma node 486-5016)
const imgBg = 'https://www.figma.com/api/mcp/asset/127bf6bf-96ec-4834-9977-d1cc8bbc54bc';

/* ── Data ────────────────────────────────────────────────────────────────── */
const STEPS = [
  { num: '01', label: 'Energy source',     desc: 'Wheeling is the transportation of energy from a renewable energy generating source, such as a wind or solar PV plant' },
  { num: '02', label: 'Grid transmission', desc: 'The renewable energy is transmitted through the national grid from the generation site to the point of consumption.' },
  { num: '03', label: 'End user delivery', desc: 'The renewable energy is allocated to the end user, enabling businesses to offset their electricity use with clean energy.' },
];

/* ── Layout constants (from Figma 486-5126) ─────────────────────────────── */
const CARD_GAP    = 215;
const CARD_WIDTHS = [362, 416, 401];
// X offset of each card's left edge, relative to card 1's start (also where
// each dot is positioned on the progress line above).
const CARD_STARTS = [
  0,
  CARD_WIDTHS[0] + CARD_GAP,                                  // 577
  CARD_WIDTHS[0] + CARD_GAP + CARD_WIDTHS[1] + CARD_GAP,      // 1208
];

/* ── Styles ─────────────────────────────────────────────────────────────── */
const sw: React.CSSProperties = { fontFamily: 'Switzer, sans-serif' };
const it: React.CSSProperties = { fontFamily: 'Inter, Switzer, sans-serif' };

/* ── Component ───────────────────────────────────────────────────────────── */
export default function REW2() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const trackRef      = useRef<HTMLDivElement>(null);
  const dotsTrackRef  = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const section   = sectionRef.current;
    const track     = trackRef.current;
    const dotsTrack = dotsTrackRef.current;
    if (!section || !track || !dotsTrack) return;

    /* ── Horizontal scrub: cards AND dots translate in lockstep ──────────
       Magnetic feel — each segment uses power3.inOut so the dot decelerates
       into the static circle, dwells there momentarily as the eased velocity
       drops to zero at the keyframe, then accelerates back out toward the
       next step. Two tweens (one per segment) produce three magnetic "snap"
       points: step 0 at start, step 1 at midpoint, step 2 at end. */
    let lastActive = 0;

    // Match the tween ease so active-dot detection follows the actual visual position
    const power3InOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger:       section,
        pin:           true,
        anticipatePin: 1,
        start:         'top 20px',   // pin with section's top 20px from viewport top (matches wrapper padding)
        end:           '+=200%',     // pin for 2× viewport height
        scrub:         1.2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Recompute the eased x to match the visual — then pick the dot
          // whose actual translated position is closest to the static circle.
          const stepFloat = p * 2;                          // 0 → 2 across 3 steps
          const segIdx    = stepFloat < 1 ? 0 : 1;          // 0 = seg 0→1, 1 = seg 1→2
          const t         = stepFloat - segIdx;
          const eased     = power3InOut(t);
          const x0        = -CARD_STARTS[segIdx];
          const x1        = -CARD_STARTS[segIdx + 1];
          const x         = x0 + (x1 - x0) * eased;

          // Active = whichever dot's translated position is closest to x=0 (the circle)
          let active  = 0;
          let minDist = Infinity;
          for (let i = 0; i < CARD_STARTS.length; i++) {
            const dist = Math.abs(CARD_STARTS[i] + x);
            if (dist < minDist) { minDist = dist; active = i; }
          }
          if (active !== lastActive) {
            setActiveStep(active);
            lastActive = active;
          }
        },
      },
    });

    tl.to([track, dotsTrack], { x: -CARD_STARTS[1], duration: 0.5, ease: 'power3.inOut' })
      .to([track, dotsTrack], { x: -CARD_STARTS[2], duration: 0.5, ease: 'power3.inOut' });

    /* ── Heading words (mask slide-up) ──────────────────────────────────── */
    const wordInstances: SplitText[] = [];
    section.querySelectorAll<Element>('.rew2-heading-words').forEach(el => {
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

    /* ── Fade elements (eyebrow, copy, line, CTAs) ──────────────────────── */
    section.querySelectorAll<Element>('.rew2-fade').forEach(el => {
      gsap.set(el, { opacity: 0, y: 24 });
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 91%', once: true },
      });
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (section.contains(t.trigger as Node)) t.kill();
      });
      wordInstances.forEach(s => s.revert());
    };
  }, []);

  return (
    /*
     * REW2 — pinned section. As the user scrolls vertically:
     *   • Background, header text, line + CTAs all stay static (Frame 1000004960)
     *   • Cards track translates horizontally with a magnetic per-step ease (Frame 1000004959)
     *   • Active step (card + matching dot) lights up as each card's left edge
     *     reaches the section's left padding.
     *
     * The white outer wrapper provides the 20px horizontal frame around the
     * rounded card and stays the same colour as the page so it blends with
     * the sections above and below.
     */
    <div
      style={{
        position: 'relative',
        zIndex: 3,
        background: '#fff',
        padding: 20,
      }}
    >
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        height: 'calc(100vh - 40px)', // leaves 20px above + 20px below when pinned
        overflow: 'hidden',
        borderRadius: 40,
      }}
    >
      {/* ── Background image — full-bleed cover ────────────────────────── */}
      <img
        src={imgBg}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {/* Subtle vertical wash so the white text holds */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.35) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Static layer ───────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute', inset: 0,
          padding: '91px 101px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          zIndex: 2,
          boxSizing: 'border-box',
          pointerEvents: 'none',
        }}
      >
        {/* Header — eyebrow + heading + description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1248, pointerEvents: 'auto' }}>
          <p
            className="rew2-fade"
            style={{
              ...it, fontWeight: 300, fontSize: 20, lineHeight: '19px',
              color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.4px', margin: 0,
            }}
          >
            How it works
          </p>
          <h2
            className="rew2-heading-words"
            style={{
              ...sw, fontWeight: 400, fontSize: 60, lineHeight: '72px',
              color: '#fff', letterSpacing: '-1.2px', margin: 0,
            }}
          >
            Renewable energy wheeling
          </h2>
          <p
            className="rew2-fade"
            style={{
              ...it, fontWeight: 300, fontSize: 16, lineHeight: '24px',
              color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: 740,
            }}
          >
            In South Africa, Eskom plays a critical role in allowing the private sector to use its transmission infrastructure for wheeling. NOA wheels renewable energy from its owned generating assets and via power purchase agreements with other independent power producers. Thanks to diversified energy sources and locations, we can supply a larger percentage of our portfolio of customers’ energy needs.
          </p>
        </div>

        {/* Middle band — line above cards. Cards layer sits in absolute space
            so it can bleed horizontally; this spacer just reserves room. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 56, pointerEvents: 'auto' }}>
          {/* Progress line — solid line, static circle at the active position,
              and a dots-track that translates with the cards. Each dot sits
              directly above its corresponding card's content; as a dot enters
              the static circle it turns teal. */}
          <div className="rew2-fade" style={{ position: 'relative', width: '100%', height: 24 }}>
            {/* Solid horizontal line — extends left of the static circle and
                far enough right to cover all dot positions (clipped by the
                section's overflow:hidden at the rounded corners). */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: -50,
                width: 3000,
                height: 1,
                background: 'rgba(255,255,255,0.25)',
                transform: 'translateY(-0.5px)',
              }}
            />

            {/* Static circle (ring) at the active position — same x as card 1's start */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: 24, height: 24,
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.5)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />

            {/* Dots track — translates horizontally with the cards */}
            <div
              ref={dotsTrackRef}
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                height: 0,
                willChange: 'transform',
              }}
            >
              {STEPS.map((_, i) => {
                const isActive = activeStep === i;
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: CARD_STARTS[i],
                      width: 10, height: 10,
                      borderRadius: '50%',
                      background: isActive ? '#00c0b5' : '#fff',
                      transform: 'translate(-50%, -50%)',
                      transition: 'background 0.4s ease, box-shadow 0.4s ease',
                      boxShadow: isActive ? '0 0 16px rgba(0,192,181,0.55)' : 'none',
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Spacer matches the cards' visual height (tallest card section ≈ 230px) */}
          <div aria-hidden style={{ height: 230 }} />
        </div>

        {/* CTAs */}
        <div className="rew2-fade" style={{ display: 'flex', gap: 24, alignItems: 'center', pointerEvents: 'auto' }}>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', height: 58, padding: '0 24px',
              background: '#fff', backdropFilter: 'blur(21.5px)', WebkitBackdropFilter: 'blur(21.5px)',
              borderRadius: 16, textDecoration: 'none', flexShrink: 0,
            }}
          >
            <span style={{ ...it, fontWeight: 500, fontSize: 20, color: '#000', whiteSpace: 'nowrap' }}>Get expert advice</span>
          </Link>
          <Link
            href="/solutions"
            style={{
              display: 'inline-flex', alignItems: 'center', height: 58, padding: '0 24px',
              background: 'rgba(0,0,0,0.17)', backdropFilter: 'blur(21.5px)', WebkitBackdropFilter: 'blur(21.5px)',
              borderRadius: 16, textDecoration: 'none', flexShrink: 0,
            }}
          >
            <span style={{ ...it, fontWeight: 500, fontSize: 20, color: '#fff', whiteSpace: 'nowrap' }}>Learn more</span>
          </Link>
        </div>
      </div>

      {/* ── Horizontally scrubbing cards layer ─────────────────────────────
          Positioned in absolute space so the track can extend off the right
          edge initially (and off the left as it scrolls). The section's
          overflow:hidden clips bleed-out on both sides.
          Vertically anchored to align with the spacer in the static layer. */}
      <div
        style={{
          position: 'absolute',
          left: 101,                // matches static padding-left
          bottom: 91 + 58 + 92,     // padding-bottom + CTA height + gap to cards
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: CARD_GAP,
            willChange: 'transform',
          }}
        >
          {STEPS.map((step, i) => {
            const isActive = activeStep === i;
            return (
              <div
                key={step.num}
                style={{
                  width: CARD_WIDTHS[i],
                  display: 'flex', flexDirection: 'column', gap: 18,
                  flexShrink: 0,
                  opacity: isActive ? 1 : 0.3,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <p
                  style={{
                    ...it, fontWeight: 500, fontSize: 16, lineHeight: '22px',
                    color: isActive ? '#00c0b5' : '#fff',
                    margin: 0,
                    transition: 'color 0.4s ease',
                  }}
                >
                  {step.num}
                </p>
                <h3
                  style={{
                    ...sw, fontWeight: 400, fontSize: 48, lineHeight: '60px',
                    color: '#fff', letterSpacing: '-0.96px', margin: 0,
                  }}
                >
                  {step.label}
                </h3>
                <p
                  style={{
                    ...it, fontWeight: 300, fontSize: 16, lineHeight: '24px',
                    color: '#fff', margin: 0, maxWidth: 398,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}
