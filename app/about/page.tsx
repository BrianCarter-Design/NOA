'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import HeroBg from '@/components/HeroBg';

/* ── Assets ───────────────────────────────────────────────────────────────── */
const imgHeroPhoto     = 'https://www.figma.com/api/mcp/asset/9579eec4-d6e9-4fbe-b1ca-d53b7df6120c';
const imgCityBg        = 'https://www.figma.com/api/mcp/asset/16c6bfa5-c565-4c59-9940-58f4b4c4d09e';
const imgEsgOverlay    = 'https://www.figma.com/api/mcp/asset/096da3b1-144c-41a9-93ba-08dd182acde7';
const imgAbstractBg    = 'https://www.figma.com/api/mcp/asset/f50d3628-eea7-4ba5-ae75-b3029828e73e';
const imgTeamPhoto     = 'https://www.figma.com/api/mcp/asset/eb9df139-d6fc-4881-9692-f663ded7ee26';
const imgCareers       = 'https://www.figma.com/api/mcp/asset/eddd829d-bb41-452d-bb74-1cf2b44479d7';
const imgArrowDownLeft = 'https://www.figma.com/api/mcp/asset/bec8d563-4859-4f4a-b514-eaa6f7e93951';
const imgArrowUpRight  = 'https://www.figma.com/api/mcp/asset/3a74d91f-1698-4b38-8cd4-95792415e499';
const imgArrowUpRight2 = 'https://www.figma.com/api/mcp/asset/753dd0ba-2bfb-47de-9669-c2f9f271a11c';
const imgArrowLearnMore= 'https://www.figma.com/api/mcp/asset/1e076d36-c30c-4753-9170-6d8931f9229a';
const imgEarth         = 'https://www.figma.com/api/mcp/asset/3dcaa7c0-802f-4d41-b2a7-f01610ec332f';
const imgAward         = 'https://www.figma.com/api/mcp/asset/fe09f97f-083e-495d-8299-0dafdfb11f7e';
const imgDivider       = 'https://www.figma.com/api/mcp/asset/c78c1ff2-b252-4065-a476-e1ab64d49403';
const imgWindIcon      = 'https://www.figma.com/api/mcp/asset/cb1713ee-455c-4282-b821-152943d638c0';
const imgArrowSeeWhat  = 'https://www.figma.com/api/mcp/asset/57389514-06f2-49fb-8a31-8184be23e5db';
const imgArrowCareers  = 'https://www.figma.com/api/mcp/asset/5087df89-606b-4c5b-80d2-c05db6a2d202';

/* Footer */
const imgMail          = 'https://www.figma.com/api/mcp/asset/2cc15ee5-ca6b-4f7a-8a3a-1a450e0e3b15';
const imgPhone         = 'https://www.figma.com/api/mcp/asset/e5c1a17b-99c7-4b1a-ba25-9354ae3660fa';
const imgLinkedIn      = 'https://www.figma.com/api/mcp/asset/8bfbf097-46eb-40e2-938c-804cd8cfb2e0';
const imgLogo          = 'https://www.figma.com/api/mcp/asset/4f0c9f5f-cbdb-4a88-b285-1c84f9a5d6bd';

/* ── Data ─────────────────────────────────────────────────────────────────── */
const WHO_CARDS = [
  'Established in 2022, NOA is a leading renewable energy independent power producer, aggregator and energy trader, with a trading license from the National Energy Regulator of South Africa.',
  'NOA\'s best-in-class management team has extensive experience in building and scaling large-scale energy businesses.',
  'NOA has raised R3.9 billion in equity capital from Old Mutual\'s African Infrastructure Investment Managers, enabling NOA Trading to expedite the purchase of electrons from trusted independent power producers (IPPs) and fast-track the construction of its fleet of generation facilities. NOA has a significant site pipeline of projects, with 600 MW of NOA-owned assets currently under construction.',
  'NOA Trading procures energy from NOA-owned wind, solar PV and battery energy storage sites and trusted third-party Independent Power Producers to offer market-leading renewable energy solutions.',
  'NOA Trading offers its portfolio of customers customised solutions with flexibility in size, contract tenor and security requirements.',
];

const STAKEHOLDERS = [
  { num: '01', name: 'Investors',   desc: 'People or organisations who fund NOA\'s projects and earn returns from their performance.',          dark: true  },
  { num: '02', name: 'IPPs',        desc: 'Energy producers who develop and operate power projects, often working alongside NOA.',                dark: false },
  { num: '03', name: 'Off-takers',  desc: 'Businesses that buy the energy generated through long-term supply agreements.',                       dark: false },
  { num: '04', name: 'Partners',    desc: 'Companies that work with NOA to help build, deliver, or scale energy projects.',                      dark: false },
];

const DIFFERENTIATORS = [
  { label: 'Aggregator Model',      desc: 'NOA aggregates renewable energy from wind, solar PV and battery energy generation facilities situated in optimal locations across South Africa to provide significantly higher and consistent volumes of renewable energy.' },
  { label: 'Customisation',         desc: 'NOA offers its portfolio of customers customised solutions with flexibility in size, contract tenor and security requirements.' },
  { label: 'Flexible Solutions',    desc: 'Flexible pricing and supply structures mean businesses of all sizes can access clean energy without rigid long-term commitments.' },
  { label: 'Speed of Supply',       desc: 'NOA\'s aggregation model and established IPP relationships mean customers can secure renewable energy faster than traditional routes.' },
  { label: 'Balance Sheet Friendly',desc: 'Off-balance-sheet structures and no capital expenditure requirements make it easy for businesses to adopt renewable energy.' },
];

const TEAM = [
  { name: 'Karel Cornelissen', title: 'CEO & Co-founder', dark: true,  bio: 'As the CEO of NOA Group, Karel leads NOA\'s vision and strategic direction in the renewable energy sector. With a profound commitment to sustainability and innovation, he drives the company\'s mission to revolutionise the energy landscape by deploying wind and solar technologies. With his ...' },
  { name: 'Iqbal Sirkot',      title: 'Chief Financial Officer',  dark: false, offset: '0%' },
  { name: 'Lesedi Modise',     title: 'Chief Investment Officer', dark: false, offset: '-206.52%' },
  { name: 'Erica Hannath',     title: 'Head of People',           dark: false, offset: '-109.75%' },
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
              { label: 'Company',   links: ['How it works', 'About', 'Projects', 'Insights', 'Careers'] },
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

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function About() {
  const [activeDiff, setActiveDiff] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.anim-mask-line', { y: '110%' });
    gsap.set('.anim-fade',      { opacity: 0, y: 32 });
    gsap.set('.anim-card',      { opacity: 0, y: 56 });
    gsap.set('.anim-image',     { opacity: 0, scale: 1.06 });

    gsap.to('.abt-hero-line', { y: '0%', duration: 1.15, ease: 'power4.out', stagger: 0.1, delay: 0.3 });

    gsap.utils.toArray<Element>('.anim-heading').forEach(heading => {
      gsap.to(heading.querySelectorAll('.anim-mask-line'), {
        y: '0%', duration: 1.05, ease: 'power4.out', stagger: 0.1,
        scrollTrigger: { trigger: heading, start: 'top 87%', once: true },
      });
    });

    gsap.utils.toArray<Element>('.anim-fade').forEach(el => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 91%', once: true },
      });
    });

    gsap.utils.toArray<Element>('.anim-card-group').forEach(group => {
      gsap.to(group.querySelectorAll('.anim-card'), {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      });
    });

    gsap.utils.toArray<Element>('.anim-image').forEach(el => {
      gsap.to(el, { opacity: 1, scale: 1, duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    gsap.utils.toArray<Element>('.anim-parallax').forEach(el => {
      gsap.fromTo(el,
        { yPercent: -8 },
        { yPercent: 8, ease: 'none', scrollTrigger: {
          trigger: (el as HTMLElement).closest('[data-parallax-section]') || el,
          start: 'top bottom', end: 'bottom top', scrub: 1.5,
        }}
      );
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const handleDiffClick = (i: number) => {
    if (i === activeDiff) return;
    const panel = document.getElementById('diff-desc');
    gsap.to(panel, { opacity: 0, y: 10, duration: 0.18, ease: 'power2.in', onComplete: () => {
      setActiveDiff(i);
      gsap.fromTo(panel, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.32, ease: 'power3.out' });
    }});
  };

  return (
    <div style={{ background: 'transparent', overflowX: 'hidden' }}>

      <HeroBg overlay="linear-gradient(170deg, rgba(1,52,54,0.7) 0%, rgba(0,0,0,0.2) 60%)">
        <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}>
          <source src="/assets/about_medium.mp4" type="video/mp4" />
        </video>
      </HeroBg>

      {/* ═══ HERO ════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', background: 'transparent', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 64px 80px' }}>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
          <div style={{ flex: '1 0 0' }}>
            <div style={{ marginBottom: 20 }}><Label text="ABOUT" dark /></div>
            <h1 style={{ margin: 0, fontFamily: 'Switzer, sans-serif', fontWeight: 400, lineHeight: 1.02 }}>
              {['Reimagining energy', 'from the ground up'].map((line, i) => (
                <div key={i} style={{ overflow: 'hidden', paddingBottom: '0.04em' }}>
                  <div className="abt-hero-line" style={{ fontSize: 'clamp(42px, 5.6vw, 80px)', color: '#fff', letterSpacing: '-0.04em', transform: 'translateY(110%)', willChange: 'transform', display: 'block' }}>
                    {line}
                  </div>
                </div>
              ))}
            </h1>
          </div>
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'flex-end' }}>
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 14, color: '#fff', lineHeight: 1.7, maxWidth: 376, textAlign: 'right', margin: 0 }}>
              We operate across the full energy value chain, from renewable generation to energy trading, enabling a more flexible and resilient power system for South Africa.
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

      {/* ═══ WHO IS NOA ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderRadius: '30px 30px 0 0', marginTop: -30, position: 'relative', zIndex: 2, padding: '80px 96px 64px', display: 'flex', flexDirection: 'column', gap: 48 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Label text="WHO IS NOA" />
          <h2 className="anim-heading">
            <MaskLine>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 700, fontSize: 40, color: '#000', letterSpacing: '-1px', lineHeight: 1.2, display: 'block' }}>
                More than an energy company
              </span>
            </MaskLine>
          </h2>
        </div>

        {/* Text cards grid */}
        <div className="anim-card-group" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            {WHO_CARDS.slice(0, 2).map((text, i) => (
              <div key={i} className="anim-card" style={{ flex: '1 0 0', border: '1px solid #e1e4ed', borderRadius: 10, padding: '32px 24px', boxShadow: '0 1px 4px rgba(25,33,61,0.08)' }}>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: '#6d758f', lineHeight: 1.5, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {WHO_CARDS.slice(2, 4).map((text, i) => (
              <div key={i} className="anim-card" style={{ flex: '1 0 0', border: '1px solid #e1e4ed', borderRadius: 10, padding: '32px 24px', boxShadow: '0 1px 4px rgba(25,33,61,0.08)' }}>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: '#6d758f', lineHeight: 1.5, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex' }}>
            <div className="anim-card" style={{ width: '50%', border: '1px solid #e1e4ed', borderRadius: 10, padding: '32px 24px', boxShadow: '0 1px 4px rgba(25,33,61,0.08)' }}>
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: '#6d758f', lineHeight: 1.5, margin: 0 }}>{WHO_CARDS[4]}</p>
            </div>
          </div>
        </div>

        {/* Hero photo */}
        <div className="anim-image" style={{ width: '100%', height: 424, borderRadius: 30, overflow: 'hidden', position: 'relative' }}>
          <img src={imgHeroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      {/* ═══ WHO WE WORK WITH ════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '88px 64px', display: 'flex', flexDirection: 'column', gap: 60 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Label text="WHO WE WORK WITH" />
          <div className="anim-heading">
            <MaskLine>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(40px,4.5vw,64px)', color: '#00696e', letterSpacing: '-4.8px', lineHeight: 1.05, display: 'block', maxWidth: 1007 }}>
                Bringing together key stakeholders across the energy ecosystem.
              </span>
            </MaskLine>
          </div>
        </div>

        <div className="anim-card-group" style={{ display: 'flex', gap: 12 }}>
          {STAKEHOLDERS.map(s => (
            <div
              key={s.num}
              className="anim-card"
              style={{
                flex: '1 0 0', height: 350, borderRadius: 24, padding: 40,
                background: s.dark ? '#013436' : 'rgba(0,0,0,0.05)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 24, color: s.dark ? '#fff' : 'rgba(0,0,0,0.5)', lineHeight: 1 }}>{s.num}</span>
                <div style={{ width: 30, height: 30 }}>
                  <img src={s.dark ? imgArrowUpRight : imgArrowUpRight2} alt="" style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: s.dark ? '#fff' : '#00696e', letterSpacing: '-0.4px', lineHeight: 1, margin: 0 }}>{s.name}</p>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: s.dark ? 300 : 500, fontSize: 16, color: s.dark ? '#fff' : 'rgba(0,0,0,0.5)', letterSpacing: '-0.4px', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ VISION / MISSION ════════════════════════════════════════════════ */}
      <section style={{ background: '#e9f2f2', borderRadius: '30px 30px 0 0', padding: '88px 96px', display: 'flex', gap: 88, alignItems: 'flex-start' }}>
        <div style={{ paddingTop: 16, flexShrink: 0 }}>
          <Label text="VISION / MISSION" />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 64 }}>
          <div className="anim-heading">
            <MaskLine>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(40px,4.5vw,64px)', color: '#00696e', letterSpacing: '-4.8px', lineHeight: 1.05, display: 'block' }}>
                What drives us forward
              </span>
            </MaskLine>
          </div>
          <div className="anim-card-group" style={{ display: 'flex', gap: 64 }}>
            {[
              { icon: imgEarth,  title: 'Vision',  text: 'As a proud South African company, NOA believes in a post-load-shedding future with a vibrant, growing economy fuelled by access to reliable renewable energy.' },
              { icon: imgAward,  title: 'Mission', text: 'NOA supplies businesses across South Africa with clean, cost-effective renewable energy. We aim to develop, finance and operate a portfolio exceeding 2.5GW of renewable energy assets over time.' },
            ].map(item => (
              <div key={item.title} className="anim-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <img src={item.icon} alt="" style={{ width: 32, height: 32 }} />
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#00696e', letterSpacing: '-0.4px', lineHeight: 1, margin: 0 }}>{item.title}</p>
                <div style={{ height: 1, background: 'rgba(0,0,0,0.15)' }} />
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: 'rgba(0,0,0,0.5)', letterSpacing: '-0.4px', lineHeight: 1.5, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ESG / SUSTAINABILITY ════════════════════════════════════════════ */}
      <section data-parallax-section style={{ position: 'relative', background: '#013436', overflow: 'hidden', minHeight: 700, display: 'flex', alignItems: 'stretch' }}>
        {/* Full bg city photo */}
        <img src={imgCityBg} alt="" className="anim-parallax" style={{ position: 'absolute', inset: 0, width: '100%', height: '116%', top: '-8%', objectFit: 'cover', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(1,52,54,0.55)', pointerEvents: 'none' }} />

        {/* Left text */}
        <div style={{ position: 'relative', zIndex: 1, flex: 1, padding: '120px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 24 }}>
          <Label text="ESG / SUSTAINABILITY SNAPSHOT" dark />
          <div className="anim-heading">
            <MaskLine>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 36, color: '#fff', letterSpacing: '-1px', lineHeight: 1.1, display: 'block', maxWidth: 400 }}>
                Scaling renewable energy in South Africa
              </span>
            </MaskLine>
          </div>
        </div>

        {/* Right frosted glass card with stat */}
        <div className="anim-fade" style={{ position: 'relative', zIndex: 1, width: 662, margin: '80px 64px 80px 0', borderRadius: 54, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(54px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px 40px 40px', flexShrink: 0 }}>
          {/* Top: icon + label */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
            <img src={imgWindIcon} alt="" style={{ width: 60, height: 60, objectFit: 'contain' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 32, color: '#99ddd8', lineHeight: 1 }}>Wind</span>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 32, color: '#fff', lineHeight: 1 }}>Acme Capital</span>
            </div>
          </div>

          {/* Big stat */}
          <div>
            <p style={{
              fontFamily: 'Switzer, sans-serif', fontWeight: 200, fontSize: 'clamp(120px,16vw,220px)',
              color: 'transparent', lineHeight: 0.85, margin: 0, letterSpacing: '-20px',
              backgroundImage: 'linear-gradient(to bottom, #fff, #99ddd8)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
            }}>
              37%
            </p>
          </div>

          {/* Learn more */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 24, color: '#fff', whiteSpace: 'nowrap' }}>LEARN MORE</span>
            <div style={{ width: 30, height: 30, transform: 'rotate(180deg)' }}>
              <img src={imgArrowLearnMore} alt="" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>

          {/* Blurred overlay photo */}
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '60%', height: '35%', borderRadius: '0 0 54px 0', overflow: 'hidden', opacity: 0.7 }}>
            <img src={imgEsgOverlay} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* ═══ WHY NOA? ════════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderRadius: '30px 30px 0 0', marginTop: -30, position: 'relative', zIndex: 2, padding: '88px 64px 124px', display: 'flex', flexDirection: 'column', gap: 80 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Label text="WHY NOA?" />
          <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 30, color: 'rgba(0,0,0,0.5)', letterSpacing: '-1px', lineHeight: 1.28, textAlign: 'right', maxWidth: 637, margin: 0 }}>
            NOA differentiates itself by offering its portfolio of customers cutting-edge solutions.
          </p>
        </div>

        {/* Differentiator switcher */}
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: 64 }}>
          {/* Left: list */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 16, flexShrink: 0, minWidth: 620 }}>
            {DIFFERENTIATORS.map((d, i) => (
              <div
                key={d.label}
                onClick={() => handleDiffClick(i)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12, cursor: 'pointer' }}
              >
                {i === activeDiff && (
                  <div style={{ width: 30, height: 30, transform: 'rotate(-135deg)', flexShrink: 0 }}>
                    <img src={imgArrowDownLeft} alt="" style={{ width: '100%', height: '100%' }} />
                  </div>
                )}
                <p style={{
                  fontFamily: 'Switzer, sans-serif', fontWeight: 400,
                  fontSize: 'clamp(32px,3.8vw,54px)',
                  color: i === activeDiff ? '#00696e' : 'rgba(125,151,152,0.5)',
                  letterSpacing: '-1px', lineHeight: 1.25, margin: 0, whiteSpace: 'nowrap',
                  transition: 'color 0.3s ease',
                }}>
                  {d.label}
                </p>
              </div>
            ))}
          </div>

          {/* Right: content panel */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* CTA pill */}
            <div className="anim-fade" style={{ position: 'relative', height: 86, borderRadius: 24 }}>
              <div style={{ position: 'absolute', inset: 0, background: '#e9f2f2', borderRadius: 24 }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
                <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#00696e', letterSpacing: '-1px' }}>See what&apos;s possible</span>
                <div style={{ width: 30, height: 30, transform: 'rotate(-135deg)' }}>
                  <img src={imgArrowSeeWhat} alt="" style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            </div>

            {/* Abstract image */}
            <div className="anim-image" style={{ width: '100%', height: 360, borderRadius: '20px 0 0 20px', overflow: 'hidden', position: 'relative' }}>
              <img src={imgAbstractBg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Description */}
            <div id="diff-desc">
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 20, color: '#5f7374', letterSpacing: '-1px', lineHeight: 1.4, margin: 0 }}>
                {DIFFERENTIATORS[activeDiff].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TEAM ════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#e9f2f2', borderRadius: 30, padding: '100px 64px 64px', display: 'flex', flexDirection: 'column', gap: 64, overflow: 'hidden' }}>
        {/* Heading */}
        <div className="anim-heading" style={{ textAlign: 'center' }}>
          <h2 style={{ margin: 0 }}>
            {['Built by energy experts with', 'decades of experience.'].map((line, i) => (
              <MaskLine key={i}>
                <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(48px,6.7vw,96px)', color: 'transparent', letterSpacing: '-4.8px', lineHeight: 0.85, display: 'block', backgroundImage: 'linear-gradient(to top, #00696e, rgba(0,105,110,0.24))', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                  {line}
                </span>
              </MaskLine>
            ))}
          </h2>
        </div>

        {/* Team cards */}
        <div className="anim-card-group" style={{ display: 'flex', gap: 12 }}>
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="anim-card"
              style={{
                flex: '0 0 372px', height: 541, borderRadius: 24, overflow: 'hidden', position: 'relative',
                background: member.dark ? '#013436' : 'rgba(0,0,0,0.05)',
                display: 'flex', flexDirection: 'column',
                justifyContent: member.dark ? 'space-between' : 'flex-end',
                padding: member.dark ? 40 : 16,
              }}
            >
              {/* Background photo for non-dark cards */}
              {!member.dark && (
                <img src={imgTeamPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              )}

              {member.dark ? (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#82dfda', letterSpacing: '-0.4px', margin: 0 }}>{member.name}</p>
                    <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 24, color: 'rgba(255,255,248,0.5)', letterSpacing: '-0.4px', lineHeight: 1, margin: 0 }}>{member.title}</p>
                  </div>
                  <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#fff', letterSpacing: '-0.4px', lineHeight: 1.5, margin: 0 }}>
                    {member.bio} <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Read more</span>
                  </p>
                </>
              ) : (
                <div style={{ position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 24, color: '#fff', letterSpacing: '-0.4px', margin: 0 }}>{member.name}</p>
                  <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#fff', letterSpacing: '-0.4px', lineHeight: 1.5, margin: 0 }}>{member.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Team footer */}
        <div className="anim-fade" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: 'rgba(0,0,0,0.5)', letterSpacing: '-0.4px', lineHeight: 1.5, maxWidth: 504, margin: 0 }}>
            Our team brings together industry veterans, and driven professionals and specialists that are united by a shared purpose: to make a meaningful impact by shaping Africa&apos;s energy future.
          </p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <img src={imgArrowDownLeft} alt="" style={{ width: 30, height: 30, transform: 'rotate(-45deg) scaleY(-1)' }} />
            </div>
            <div style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <img src={imgArrowDownLeft} alt="" style={{ width: 30, height: 30, transform: 'rotate(-135deg)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TEAM CONTACT ════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '64px 96px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="anim-fade" style={{ width: '100%', border: '1px solid #e1e4ed', borderRadius: 10, padding: '48px 24px', display: 'flex', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(25,33,61,0.08)' }}>
          {[
            { heading: 'Team contact',   sub: 'Your go-to for all team-related inquiries.', cta: 'Derik Coetzer, Head of Growth' },
            { heading: 'Email',          sub: 'Lorem ipsum',                                 cta: 'derik@noagroup.africa' },
            { heading: 'Phone',          sub: 'Mon-Fri from\n8am to 5pm.',                   cta: '021 010 0480' },
          ].map((col, i, arr) => (
            <div
              key={col.heading}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', textAlign: 'center',
                borderRight: i < arr.length - 1 ? '1px solid #e1e4ed' : 'none',
                padding: '0 24px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 600, fontSize: 26, color: '#6d758f', lineHeight: 1.5, margin: 0 }}>{col.heading}</p>
                <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 21, color: '#6d758f', lineHeight: 1.5, margin: 0, whiteSpace: 'pre-line' }}>{col.sub}</p>
              </div>
              <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 600, fontSize: 21, color: '#6d758f', margin: 0 }}>{col.cta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CAREERS CTA ═════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '0 32px 32px' }}>
        <div className="anim-fade" style={{ position: 'relative', height: 463, borderRadius: 30, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: 64 }}>
          <img src={imgCareers} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 30 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(1,52,54,0.45)', borderRadius: 30 }} />
          <p style={{ position: 'relative', zIndex: 1, fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(48px,6.7vw,96px)', color: '#82dfda', letterSpacing: '-4.8px', lineHeight: 0.96, maxWidth: 764, margin: 0 }}>
            Want to join our team? Have a look at our open roles.
          </p>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 24, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', borderRadius: 24, width: 376, flexShrink: 0 }}>
            <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 32, color: '#fff', letterSpacing: '-1px', lineHeight: 1.25 }}>See what&apos;s possible</span>
            <div style={{ width: 30, height: 30, transform: 'rotate(180deg)' }}>
              <img src={imgArrowCareers} alt="" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}
