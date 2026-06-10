'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ── Assets ──────────────────────────────────────────────────────────────── */
const imgArrowsMerge = '/assets/ArrowsMerge.svg';
const imgGearSix     = '/assets/ArrowsMerge-1.svg';
const imgCodesandbox = '/assets/ArrowsMerge-2.svg';
const imgSpeedometer = '/assets/ArrowsMerge-3.svg';
const imgChartPie    = '/assets/ArrowsMerge-4.svg';

const imgRow1 = '/assets/item.png';
const imgRow2 = '/assets/item-1.png';
const imgRow3 = '/assets/item-2.png';
const imgRow4 = '/assets/item-3.png';
const imgRow5 = '/assets/item-4.png';

/* ── Data ────────────────────────────────────────────────────────────────── */
type Row = { icon: string; label: string; desc: string; img: string; imgWidth: number; imgGap: number };

const ROWS: Row[] = [
  { icon: imgArrowsMerge, imgWidth: 466, imgGap: 58, label: 'Aggregated for reliability', desc: 'No single generation source produces energy around the clock. Wind peaks at night and in winter. Solar peaks during the day. Battery energy storage fills the gaps. By combining multiple technologies across multiple locations, NOA delivers a more consistent supply profile than any single asset can - reducing your exposure to the variability of any one source or technology.', img: imgRow1 },
  { icon: imgGearSix,     imgWidth: 466, imgGap: 58, label: 'Built for your business',    desc: "We invest time upfront to understand each customer's energy profile, ESG commitments, and current and future operational needs. The result is an energy supply solution designed specifically for your business, not a generic off-the-shelf power purchase agreement. We understand the operational realities you face, and the urgency of the transition.",                            img: imgRow2 },
  { icon: imgCodesandbox, imgWidth: 466, imgGap: 58, label: 'Flexibility by design',      desc: 'From 1 to 25+ year contracts, with the ability to scale supply. NOA offers genuine flexibility in tenor, volume and security requirements.',                                                                                                                                                                                                                                         img: imgRow3 },
  { icon: imgSpeedometer, imgWidth: 466, imgGap: 58, label: 'Capitalised to deliver',     desc: 'Backed by $245 million in total equity capital from Africa Infrastructure Investment Managers (AIIM), a subsidiary of Old Mutual, and supported by Standard Bank as primary debt partner, NOA has the financial strength to acquire, build and deliver on time.',                                                                                                                       img: imgRow4 },
  { icon: imgChartPie,    imgWidth: 466, imgGap: 58, label: "You're in good company",     desc: "NOA's customer solutions span sectors such as mining, manufacturing, data centres, commercial real estate, healthcare and agriculture. This diversity allows us to balance supply and demand more effectively - different sectors have different usage profiles, which means the portfolio performs more consistently for everyone.",                                                      img: imgRow5 },
];

/* ── Layout constants ────────────────────────────────────────────────────── */
const HEADER_HEIGHT    = 64;  // compact strip: 18px pad + 28px icon + 18px pad
const ROW_HEIGHT       = 440; // full open row height
const SECTION_HEADER_H = 160; // eyebrow + gap + heading row + padding
const SECTION_PAD_TOP  = 35;

/* ── Styles ─────────────────────────────────────────────────────────────── */
const sw: React.CSSProperties = { fontFamily: 'Switzer, sans-serif' };
const it: React.CSSProperties = { fontFamily: 'Inter, Switzer, sans-serif' };

/* ── Component ───────────────────────────────────────────────────────────── */
export default function WhyNoa() {
  const sectionRef        = useRef<HTMLDivElement>(null);
  const rowsContainerRef  = useRef<HTMLDivElement>(null);
  const rowRefs           = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section   = sectionRef.current;
    const container = rowsContainerRef.current;
    if (!section || !container) return;

    const rows = rowRefs.current.filter((r): r is HTMLDivElement => r !== null);
    if (rows.length !== ROWS.length) return;

    const totalSteps = ROWS.length - 1; // 4

    /*
     * Each card (rows[1] through rows[4]) starts below the viewport
     * (translateY = rows-container height ≈ viewport height − header area).
     * GSAP scrubs each card up to translateY=0 one at a time.
     * Row 0 is always visible as the base layer.
     *
     * Because the section is 100vh with overflow:hidden, cards literally rise
     * from the bottom of the viewport with no clipping of their content.
     * After the pin releases the whole section exits as one unit.
     */
    const initRows = () => {
      gsap.set(rows.slice(1), { y: container.offsetHeight });
    };
    initRows();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger:             section,
        pin:                 true,
        anticipatePin:       1,
        start:               'top top',
        end:                 () => `+=${totalSteps * container.offsetHeight}`,
        scrub:               1,
        invalidateOnRefresh: true,
        onRefresh:           initRows,
      },
    });

    for (let i = 1; i <= totalSteps; i++) {
      tl.to(rows[i], {
        y:        0,
        duration: 1 / totalSteps,
        ease:     'none',
      }, (i - 1) / totalSteps);
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height:    '100vh',
        overflow:  'hidden',
        boxSizing: 'border-box',
        background: '#fff',
        position:  'relative',
        zIndex:    4,
        padding:   `${SECTION_PAD_TOP}px 60px 0`,
      }}
    >
      <div style={{ maxWidth: 1192, margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* ── Section header ───────────────────────────────────────────────── */}
        <div style={{
          height: SECTION_HEADER_H, flexShrink: 0,
          boxSizing: 'border-box', padding: '40px 0 12px',
          display: 'flex', flexDirection: 'column', gap: 18,
        }}>
          <p className="anim-fade" style={{
            ...it, fontWeight: 400, fontSize: 16, lineHeight: '30px',
            color: '#737373', margin: 0,
          }}>
            Why NOA
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
            <h2 className="anim-heading-words" style={{
              ...sw, fontWeight: 400, fontSize: 48,
              color: '#000b0d', letterSpacing: '-0.96px', lineHeight: '60px',
              margin: 0,
            }}>
              Here&apos;s where we&apos;re different
            </h2>
            <button type="button" className="anim-fade" style={{
              background: '#f5f5f5', border: 'none', borderRadius: 16,
              height: 60, padding: '0 24px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', flexShrink: 0,
              ...it, fontWeight: 500, fontSize: 20, lineHeight: '30px', color: '#000b0d',
            }}>
              See what&apos;s possible
            </button>
          </div>
        </div>

        {/* ── Rows ─────────────────────────────────────────────────────────
         *  flex:1 lets this fill the remaining viewport height so cards have
         *  room to stack without clipping.  Each row is absolutely positioned
         *  at top: i×HEADER_HEIGHT (its final stacked offset) and starts with
         *  translateY = container height (below the visible section / viewport).
         *  GSAP scrubs each card up to translateY=0 one at a time.
         */}
        <div ref={rowsContainerRef} style={{ flex: 1, position: 'relative' }}>
          {ROWS.map((row, i) => (
            <div
              key={i}
              ref={el => { rowRefs.current[i] = el; }}
              style={{
                background: '#fff',
                height:     ROW_HEIGHT,
                boxSizing:  'border-box',
                position:   'absolute',
                top:        i * HEADER_HEIGHT,
                left:       0,
                right:      0,
                zIndex:     i + 1,
              }}
            >
              {/* Compact header strip */}
              <div style={{
                display: 'flex', gap: 14, alignItems: 'center',
                padding: '18px 0',
                borderTop: '1px solid #e0e0e0',
                height: HEADER_HEIGHT,
                boxSizing: 'border-box',
              }}>
                <div style={{ width: 48, height: 48, flexShrink: 0 }}>
                  <img src={row.icon} alt="" style={{ width: '100%', height: '100%' }} />
                </div>
                <h3 style={{
                  ...sw, fontWeight: 400, fontSize: 18, lineHeight: '26px',
                  color: '#000b0d', margin: 0,
                }}>
                  {row.label}
                </h3>
              </div>

              {/* Expanded content */}
              <div style={{
                display: 'flex', alignItems: 'flex-start',
                gap: row.imgGap,
                paddingTop: 20,
                paddingLeft: 42,
              }}>
                <div style={{
                  width: row.imgWidth, height: 288,
                  borderRadius: 16, overflow: 'hidden',
                  flexShrink: 0, position: 'relative',
                }}>
                  <img
                    src={row.img}
                    alt=""
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <p style={{
                  flex: 1,
                  ...it, fontWeight: 400, fontSize: 18, lineHeight: '24px',
                  color: '#737373', margin: 0, maxWidth: 475,
                }}>
                  {row.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
