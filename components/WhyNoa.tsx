'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ── Assets ──────────────────────────────────────────────────────────────── */
const imgArrowsMerge = '/assets/icons/arrows-merge.svg';
const imgGearSix     = 'https://www.figma.com/api/mcp/asset/30989e82-94a5-4adc-91e1-765fb020c0a9';
const imgCodesandbox = 'https://www.figma.com/api/mcp/asset/d1e3028f-94d4-4db8-b32b-53c2ed078fdb';
const imgSpeedometer = 'https://www.figma.com/api/mcp/asset/55de787f-8c3f-4bad-9982-b16bc9d4ace8';
const imgChartPie    = 'https://www.figma.com/api/mcp/asset/3c8ad642-f19c-4f21-95d6-783414587d65';

const imgRow1 = 'https://www.figma.com/api/mcp/asset/5a591f10-f370-4f7a-81f3-e391e290773b';
const imgRow2 = 'https://www.figma.com/api/mcp/asset/2a68dff4-5490-4fb8-949b-4a9de44b8dae';
const imgRow3 = 'https://www.figma.com/api/mcp/asset/0c763b4b-6e89-4708-9a8a-a72593763e84';
const imgRow4 = 'https://www.figma.com/api/mcp/asset/ced74584-16b1-432e-bf2a-5f6f68f7c6b0';
const imgRow5 = 'https://www.figma.com/api/mcp/asset/e1f96bab-18af-4008-95a5-70995bb76719';

/* ── Data ────────────────────────────────────────────────────────────────── */
type Row = { icon: string; label: string; desc: string; img: string; imgWidth: number; imgGap: number };

const ROWS: Row[] = [
  { icon: imgArrowsMerge, imgWidth: 466, imgGap: 58, label: 'Aggregator model',      desc: 'NOA aggregates renewable energy from wind, solar PV and battery energy generation facilities situated in optimal locations across South Africa to provide significantly higher and consistent volumes of renewable energy.',                                                                                                                                img: imgRow1 },
  { icon: imgGearSix,     imgWidth: 466, imgGap: 58, label: 'Customisation',          desc: "By investing time to understand each customer's unique energy needs and objectives, NOA can develop customised solutions. Our data-focused approach enables us to model future demand around various scenarios. NOA then customises energy solutions that maximise energy availability and cost savings.",                                                   img: imgRow2 },
  { icon: imgCodesandbox, imgWidth: 466, imgGap: 58, label: 'Flexible solutions',     desc: 'With many independent power producers (IPPs) requiring a long-term commitment of up to 25 years in their PPAs, NOA can offer 1 to 25+ year power purchase contracts with the added benefit of flexibility to scale supply up or down based on energy needs.',                                                                                           img: imgRow3 },
  { icon: imgSpeedometer, imgWidth: 466, imgGap: 58, label: 'Speed of supply',        desc: 'NOA is well capitalised through equity investments by the Old Mutual Group via the AIIF 4 Fund and the Ideas Managed Fund, both managed by AIIM. With its R3.9 billion investment from AIIM, NOA has the equity capital to ramp up its energy supply quickly.',                                                                                           img: imgRow4 },
  { icon: imgChartPie,    imgWidth: 466, imgGap: 58, label: 'Balance sheet friendly', desc: 'Our flexible security requirements allow customers to save money by not needing to invest in onsite energy projects or installations.',                                                                                                                                                                                                                   img: imgRow5 },
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
              Cutting-edge solutions
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
                <div style={{ width: 28, height: 28, flexShrink: 0 }}>
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
