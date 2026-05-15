'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

/* ── Assets ───────────────────────────────────────────────────────────────── */
const imgHeroBg       = 'https://www.figma.com/api/mcp/asset/bd6cc4aa-b716-471f-a07f-3922eda18534';
const imgHeroBg2      = 'https://www.figma.com/api/mcp/asset/040e1c1a-47b1-4086-810f-17cd62231c5c';
const imgProjectWind  = 'https://www.figma.com/api/mcp/asset/ed0bc61d-2f62-436d-b496-6033a4de66ef';
const imgSolarBase    = 'https://www.figma.com/api/mcp/asset/32acec6e-81df-499b-ac04-fae8e4a6125b';
const imgSolarTop     = 'https://www.figma.com/api/mcp/asset/c69c3b4e-a6db-4a2f-8131-34c226f3550b';
const imgPipeline1    = 'https://www.figma.com/api/mcp/asset/e60504f4-48d6-4801-a77e-0d8117efcd6d';
const imgPipeline2    = 'https://www.figma.com/api/mcp/asset/598d59be-f7a1-4de2-8845-2f6e17039b70';
const imgPipeline3    = 'https://www.figma.com/api/mcp/asset/afc5e8e0-8d2a-47c5-9b6e-745124431460';
const imgDarkBg       = 'https://www.figma.com/api/mcp/asset/eabf8e83-4485-44f3-9654-56d50b2ff426';
const imgHeadingAsset = 'https://www.figma.com/api/mcp/asset/00463b00-2829-43ae-9d83-73bfb1c12a18';
const imgDivider      = 'https://www.figma.com/api/mcp/asset/57b3803d-18e9-4c28-817e-a2d3c84bb1c1';
const imgTestimAvatar = 'https://www.figma.com/api/mcp/asset/cb3a2af4-7f5c-4d85-bba4-927954b5b082';
const imgTestimLogo   = 'https://www.figma.com/api/mcp/asset/5bf0fc71-5769-4d02-8de5-af187d94d85f';
const imgTestimRating = 'https://www.figma.com/api/mcp/asset/bc58da4c-495a-436b-a0da-589c5aed66c2';
const imgArrowUpRight = 'https://www.figma.com/api/mcp/asset/99149596-1bf6-48ab-b8f2-c94510497686';
const imgArrowDownLeft= 'https://www.figma.com/api/mcp/asset/73e44e4b-f335-4eaa-badb-671a5eefc0f2';
const imgArrowSeeProj = 'https://www.figma.com/api/mcp/asset/dd9ef8b9-e8fb-4601-a146-b454ee3aa4b1';
const imgArrowUp      = 'https://www.figma.com/api/mcp/asset/427ac4d8-fe27-4a29-844f-8b722d58e40b';
const imgArrowDown    = 'https://www.figma.com/api/mcp/asset/a427774a-64b5-4ff2-b05f-ab2c4e6f8e80';

/* Partner logos */
const imgPartner1     = 'https://www.figma.com/api/mcp/asset/cb3a2af4-7f5c-4d85-bba4-927954b5b082';
const imgPartner2     = 'https://www.figma.com/api/mcp/asset/73c80f37-14d8-4457-af56-da713a6180f9';
const imgPartner3     = 'https://www.figma.com/api/mcp/asset/c97f0115-09c5-443c-bba6-46ab86b795eb';
const imgPartner4     = 'https://www.figma.com/api/mcp/asset/2cc6ee64-072f-4503-aa1b-60fffafba4bf';
const imgPartner5     = 'https://www.figma.com/api/mcp/asset/fd94675d-9ec8-4a95-8187-7dd5d00b2f82';
const imgPartner6     = 'https://www.figma.com/api/mcp/asset/378d6ad9-8e59-444a-9706-d9d2c6ee4dbd';

/* Footer */
const imgMail         = 'https://www.figma.com/api/mcp/asset/aa0566d3-2dcf-4e5c-8ac7-e2a60934cf5e';
const imgPhone        = 'https://www.figma.com/api/mcp/asset/3fe77454-74b5-42a9-946b-781682cfb56a';
const imgLinkedIn     = 'https://www.figma.com/api/mcp/asset/f7e1573c-b437-4996-a6f0-ebc7fdab1f86';
const imgLogo         = 'https://www.figma.com/api/mcp/asset/aae86e1a-43aa-44e9-aaa1-1b5004b303c1';

/* ── Data ─────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    name:     'Wind Garden energy facility',
    desc:     'Our 94 MW Wind Garden facility is under construction in the Eastern Cape. Find project information here',
    tags:     ['Wind Energy', 'Industrial Power', 'Sustainability'],
    location: 'Makhanda',
    status:   'Completed',
    capacity: '86 MW',
    date:     'Feb, 2026',
    img:      imgProjectWind,
  },
  {
    name:     'Khauta solar energy facility',
    desc:     'Our Khauta solar energy facility is under construction near Welkom. Find project information here',
    tags:     ['Solar PV', 'Utility-Scale', 'Clean Energy'],
    location: 'Welkom',
    status:   'In progress',
    capacity: '504 MW',
    date:     'May, 2026',
    img:      imgSolarTop,
    imgBase:  imgSolarBase,
  },
];

const STAGES = [
  {
    num:   '01',
    label: 'Pipeline',
    desc:  'Early stage opportunities identified and actively developed across target markets.',
    imgs:  [imgPipeline1, imgPipeline2, imgPipeline3],
    color: '#fa6e43',
  },
  { num: '02', label: 'Signed',             color: 'transparent' },
  { num: '03', label: 'Under construction', color: 'transparent' },
  { num: '04', label: 'Operational',        color: 'transparent' },
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

function Footer() {
  return (
    <footer style={{ background: '#fff', padding: '0 24px 24px' }}>
      <div style={{ background: '#013436', borderRadius: 30, padding: '88px 88px 20px', display: 'flex', flexDirection: 'column', gap: 120 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 21.6, color: '#fff', lineHeight: 1.67, maxWidth: 423, margin: 0 }}>
              NOA is a South African renewable energy IPP, aggregator and energy trader delivering flexible clean energy solutions with a licensed trading platform.
            </p>
            <Link href="/about" className="anim-fade" style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 17.2, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>LEARN MORE ABOUT US</span>
              <div style={{ height: 2, background: '#fff' }} />
            </Link>
          </div>
          <div className="anim-card-group" style={{ display: 'flex', gap: 80, alignItems: 'flex-start', flexShrink: 0 }}>
            {[
              { label: 'Company', links: ['How it works', 'About', 'Projects', 'Insights', 'Careers'] },
              { label: 'Solutions', links: ['Overview', 'Investors', 'IPPs', 'Off-takers', 'Partners'] },
            ].map(col => (
              <div key={col.label} className="anim-card" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#82dfda', margin: 0 }}>{col.label}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {col.links.map(item => (
                    <Link key={item} href={`/${item.toLowerCase().replace(/ /g, '-')}`} style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap' }}>{item}</Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="anim-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 200 }}>
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#82dfda', margin: 0 }}>Contact us</p>
              {[{ icon: imgMail, label: 'contact@noa.com' }, { icon: imgPhone, label: '(000) 000 - 0000' }, { icon: imgLinkedIn, label: 'LinkedIn' }].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 4, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img src={icon} alt="" style={{ width: 24, height: 24 }} />
                  </div>
                  <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: '#fff', textDecoration: 'underline', whiteSpace: 'nowrap' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="anim-fade" style={{ width: '100%', aspectRatio: '359/119' }}>
            <img src={imgLogo} alt="NOA" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'left' }} />
          </div>
          <div style={{ borderTop: '1px solid #737373', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, paddingBottom: 24 }}>
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#fff', textDecoration: 'underline', margin: 0 }}>Copyright © 2026 NOA Group</p>
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#fff', margin: 0 }}>
              All Rights Reserved <span style={{ textDecoration: 'underline' }}>|</span> <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms and Conditions</span> <span style={{ textDecoration: 'underline' }}>|</span> <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Project Card ─────────────────────────────────────────────────────────── */
function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="anim-fade"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', gap: 48, alignItems: 'center', padding: 32, borderRadius: 30, background: 'rgba(0,0,0,0.05)', overflow: 'hidden', cursor: 'pointer', transition: 'background 0.25s ease' }}
    >
      {/* Image */}
      <div style={{ flex: '1 0 0', height: 410, borderRadius: 24, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        {project.imgBase && (
          <img src={project.imgBase} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        <img
          src={project.img}
          alt={project.name}
          className="anim-image"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '112%', top: '-6%', objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>

      {/* Right content */}
      <div style={{ width: 606, display: 'flex', flexDirection: 'column', gap: 60, flexShrink: 0 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#00696e', letterSpacing: '-0.4px', margin: 0, lineHeight: 1 }}>
              {project.name}
            </p>
            <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: 'rgba(0,0,0,0.5)', lineHeight: 1.6, margin: 0, maxWidth: 539 }}>
              {project.desc}
            </p>
          </div>
          <div style={{
            width: 30, height: 30, flexShrink: 0,
            transform: hovered ? 'translate(3px,-3px)' : 'translate(0,0)',
            transition: 'transform 0.3s ease',
          }}>
            <img src={imgArrowUpRight} alt="" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {project.tags.map(tag => (
            <div key={tag} style={{ background: '#e9f2f2', padding: '5px 12px', display: 'inline-flex' }}>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: '#000', whiteSpace: 'nowrap' }}>{tag}</span>
            </div>
          ))}
        </div>

        {/* Info grid */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { label: 'Location', value: project.location },
            { label: 'Status',   value: project.status   },
            { label: 'Capacity (MW)', value: project.capacity },
            { label: 'Date',     value: project.date     },
          ].map((item, i, arr) => (
            <div
              key={item.label}
              style={{
                flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 8, padding: '0 8px',
                borderRight: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
              }}
            >
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: '#3b3b33', margin: 0 }}>{item.label}</p>
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: '#000', margin: 0 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Stage Card ───────────────────────────────────────────────────────────── */
function StageCard({ stage, active, onClick }: { stage: typeof STAGES[0]; active: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: active ? '0 0 592px' : '1 0 0',
        minWidth: 0,
        height: 680,
        borderRadius: 30,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        transition: 'flex 0.65s cubic-bezier(0.4,0,0.2,1)',
        background: active ? stage.color : 'rgba(153,221,216,0.34)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 32,
      }}
    >
      {/* Background images (expanded state only) */}
      {active && stage.imgs && (
        <div style={{ position: 'absolute', inset: 0, borderRadius: 30, overflow: 'hidden', pointerEvents: 'none' }}>
          {stage.imgs.map((src, i) => (
            <img key={i} src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 30 }} />
          ))}
        </div>
      )}

      {/* Top row: arrow + number */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ width: active ? 40 : 32, height: active ? 40 : 32 }}>
          <img src={active ? imgArrowUp : imgArrowDown} alt="" style={{ width: '100%', height: '100%' }} />
        </div>
        <span style={{
          fontFamily: 'Switzer, sans-serif', fontWeight: 500,
          fontSize: active ? 59 : 32,
          color: active ? 'rgba(255,255,255,0.62)' : '#00696e',
          letterSpacing: active ? '-3.5px' : '-1.4px',
          lineHeight: 1,
          transition: 'font-size 0.4s ease, color 0.4s ease',
        }}>
          {stage.num}
        </span>
      </div>

      {/* Bottom: label (+ desc for expanded) */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: active ? 32 : 0 }}>
        {active && stage.desc && (
          <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 24, color: '#fff', letterSpacing: '-0.68px', lineHeight: 1.2, margin: 0 }}>
            {stage.desc}
          </p>
        )}
        <span style={{
          fontFamily: 'Switzer, sans-serif',
          fontWeight: 400,
          fontSize: active ? 48 : 24,
          color: active ? '#fff' : '#00696e',
          letterSpacing: active ? '-1.4px' : '-1.05px',
          lineHeight: active ? 0.82 : 1.22,
          textAlign: active ? 'left' : 'center',
          display: 'block',
          transition: 'font-size 0.4s ease, color 0.4s ease',
        }}>
          {stage.label}
        </span>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function Projects() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.anim-mask-line', { y: '110%' });
    gsap.set('.anim-fade',      { opacity: 0, y: 32 });
    gsap.set('.anim-card',      { opacity: 0, y: 56 });
    gsap.set('.anim-image',     { opacity: 0, scale: 1.05 });

    /* Hero lines */
    gsap.to('.proj-hero-line', { y: '0%', duration: 1.15, ease: 'power4.out', stagger: 0.1, delay: 0.3 });

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

    /* Stats count-up */
    gsap.utils.toArray<Element>('.stat-num').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <div style={{ background: 'transparent', overflowX: 'hidden' }}>

      {/* Fixed hero background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
        <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}>
          <source src="/assets/wind.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(170deg, rgba(1,52,54,0.6) 0%, rgba(0,0,0,0) 60%)' }} />
      </div>

      {/* ═══ HERO ════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', background: 'transparent', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 64px 80px' }}>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
          {/* Left */}
          <div style={{ flex: '1 0 0' }}>
            <div style={{ marginBottom: 20 }}><Label text="PROJECTS" dark /></div>
            <h1 style={{ margin: 0, fontFamily: 'Switzer, sans-serif', fontWeight: 400, lineHeight: 1.05 }}>
              {['Powering projects from', 'concept to clean energy generation'].map((line, i) => (
                <div key={i} style={{ overflow: 'hidden', paddingBottom: '0.04em' }}>
                  <div className="proj-hero-line" style={{ fontSize: 'clamp(42px, 5.6vw, 80px)', color: '#fff', letterSpacing: '-0.04em', transform: 'translateY(110%)', willChange: 'transform', display: 'block' }}>
                    {line}
                  </div>
                </div>
              ))}
            </h1>
          </div>

          {/* Right */}
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'flex-end' }}>
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 14, color: '#fff', lineHeight: 1.7, maxWidth: 376, textAlign: 'right', margin: 0 }}>
              Explore NOA&apos;s portfolio of renewable energy projects across development, construction, and operation. Each stage reflects progress toward scalable energy impact.
            </p>
            <div className="anim-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 24, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(54px)', borderRadius: 24, width: 376 }}>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#fff', letterSpacing: '-1px', lineHeight: 1.25 }}>Talk to an expert</span>
              <div style={{ width: 30, height: 30, transform: 'rotate(-135deg)', flexShrink: 0 }}>
                <img src={imgArrowDownLeft} alt="" style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderRadius: '30px 30px 0 0', marginTop: -30, position: 'relative', zIndex: 2, padding: '100px 64px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 48 }}>
        {[
          { label: 'Under Construction', value: '600+', sub: 'MW NOA-owned assets in active construction phase.' },
          { label: 'Capital Raised',     value: 'R3.9+', sub: 'Billion equity secured to fund growth and projects.' },
          { label: 'Project Pipeline',   value: '2K+',   sub: 'MW Capacity across planned energy sites.' },
        ].map(stat => (
          <div key={stat.label} style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 56, alignItems: 'center', textAlign: 'center' }}>
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#7d9798', letterSpacing: '-1px', lineHeight: 1.25, margin: 0 }}>
              {stat.label}
            </p>
            <p className="stat-num" style={{
              fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(80px,10.4vw,150px)', color: 'transparent', lineHeight: 1, margin: 0,
              backgroundImage: 'linear-gradient(to bottom, #99ddd8, #fff)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              letterSpacing: '-0.04em',
            }}>
              {stat.value}
            </p>
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: '#5f7374', letterSpacing: '-1px', lineHeight: 1.4, margin: 0 }}>
              {stat.sub}
            </p>
          </div>
        ))}
      </section>

      {/* ═══ PROJECT LISTINGS ════════════════════════════════════════════════ */}
      <section style={{ padding: '0 64px 88px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {PROJECTS.map(project => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </section>

      {/* ═══ PIPELINE STAGES ═════════════════════════════════════════════════ */}
      <section style={{ background: '#e9f2f2', borderRadius: 30, margin: '0 0 64px', padding: '120px 64px 64px', display: 'flex', flexDirection: 'column', gap: 80, overflow: 'hidden' }}>
        {/* Heading */}
        <div className="anim-heading" style={{ textAlign: 'center' }}>
          <h2 style={{ margin: 0 }}>
            {['How projects move from', 'idea to impact'].map((line, i) => (
              <MaskLine key={i}>
                <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(52px,6.7vw,96px)', color: 'transparent', letterSpacing: '-4.8px', lineHeight: 0.85, display: 'block', backgroundImage: 'linear-gradient(to top, #00696e, rgba(0,105,110,0.24))', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                  {line}
                </span>
              </MaskLine>
            ))}
          </h2>
        </div>

        {/* Stage cards */}
        <div className="anim-card-group" style={{ display: 'flex', gap: 24, alignItems: 'stretch', minHeight: 680 }}>
          {STAGES.map((stage, i) => (
            <StageCard
              key={stage.num}
              stage={stage}
              active={activeStage === i}
              onClick={() => setActiveStage(i)}
            />
          ))}
        </div>
      </section>

      {/* ═══ LOGO STRIP ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '80px 64px', display: 'flex', flexDirection: 'column', gap: 64, alignItems: 'center', overflow: 'hidden' }}>
        <div className="anim-card-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: 16 }}>
          {[imgPartner1, imgPartner2, imgPartner3, imgPartner4, imgPartner5, imgPartner6].map((src, i) => (
            <div key={i} className="anim-card" style={{ flex: '1 0 0', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 16px' }}>
              <img src={src} alt="" style={{ maxHeight: 58, maxWidth: '100%', objectFit: 'contain', filter: 'grayscale(1) opacity(0.45)' }} />
            </div>
          ))}
        </div>
        <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 30, color: 'rgba(0,0,0,0.5)', letterSpacing: '-1px', margin: 0, textAlign: 'center' }}>
          Trusted across the energy ecosystem
        </p>
      </section>

      {/* ═══ TESTIMONIAL / DARK SECTION ══════════════════════════════════════ */}
      <section style={{ background: '#013436', borderRadius: 30, margin: '0 0 0', padding: '120px 96px 80px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 80, alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 30, pointerEvents: 'none' }}>
          <img src={imgDarkBg} alt="" className="anim-parallax" style={{ position: 'absolute', width: '160%', height: '136%', top: '-4%', left: 0, objectFit: 'cover' }} />
        </div>

        {/* Heading */}
        <div className="anim-heading" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ margin: 0 }}>
            {['Built on real-world', 'outcomes'].map((line, i) => (
              <MaskLine key={i}>
                <span style={{
                  fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(52px,6.7vw,96px)',
                  letterSpacing: '-4.8px', lineHeight: 0.85, display: 'block',
                  backgroundImage: `url('${imgHeadingAsset}')`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text',
                  color: 'transparent',
                }}>
                  {line}
                </span>
              </MaskLine>
            ))}
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="anim-fade" style={{ position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 32, padding: 48, width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 48 }}>
          {/* Quote + CTA */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 48 }}>
            <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#7d9798', letterSpacing: '-1px', lineHeight: 1.25, margin: 0, maxWidth: 849 }}>
              <span style={{ color: '#fff' }}>&ldquo;Lorem ipsum dolor sit amet consectetur. Dolor venenatis lectus nec aliquam tristique vitae id</span>
              {'. Pulvinar amet eu mauris aliquam non. Dictum lectus risus vestibulum.'}
              <span style={{ color: '#fff' }}>&rdquo;</span>
            </p>
            <button style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 24, background: 'transparent', border: 'none', cursor: 'pointer', flexShrink: 0, borderRadius: 24 }}>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 24, color: '#fff', letterSpacing: '-1px', whiteSpace: 'nowrap' }}>See project</span>
              <div style={{ width: 30, height: 30, transform: 'rotate(180deg)' }}>
                <img src={imgArrowSeeProj} alt="" style={{ width: '100%', height: '100%' }} />
              </div>
            </button>
          </div>

          {/* Divider */}
          <img src={imgDivider} alt="" style={{ width: '100%', height: 1, objectFit: 'cover' }} />

          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ width: 56, height: 56, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
              <img src={imgTestimAvatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 600, fontSize: 16, color: '#fff', margin: 0 }}>John Clark</p>
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#fff', margin: 0 }}>Sustainability leadership at Project name</p>
            </div>
            <img src={imgTestimLogo} alt="" style={{ height: 22, objectFit: 'contain' }} />
            <img src={imgTestimRating} alt="" style={{ height: 22, objectFit: 'contain', marginLeft: 16 }} />
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}
