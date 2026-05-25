'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import HeroBg from '@/components/HeroBg';

/* ── Assets ───────────────────────────────────────────────────────────────── */
const imgBackground = 'https://www.figma.com/api/mcp/asset/41389684-9dc5-4af2-b24e-a83558be8176';
const imgArrow      = 'https://www.figma.com/api/mcp/asset/bea588e4-47f5-4a8f-99c4-201b28568768';
const imgArrowCard  = 'https://www.figma.com/api/mcp/asset/7469f764-1164-43e1-9c6b-b33890fa1f78';
const imgArrowDown  = 'https://www.figma.com/api/mcp/asset/87291f79-753f-4b8b-aa56-b388055f0255';
const imgMail       = 'https://www.figma.com/api/mcp/asset/53c11ce2-43a2-4e87-b9c8-4a46b0821f8f';
const imgPhone      = 'https://www.figma.com/api/mcp/asset/527bf1ec-9c5e-470c-8191-05791110d1f4';
const imgLinkedIn   = 'https://www.figma.com/api/mcp/asset/86df68e5-476a-488a-9ca7-05c14c98e671';
const imgLogo       = 'https://www.figma.com/api/mcp/asset/3755b4b4-5691-4a50-87f4-42b56e2ff7c7';

const img1a = 'https://www.figma.com/api/mcp/asset/729e18a5-6576-475c-95c6-3cd44ecf4db2';
const img1b = 'https://www.figma.com/api/mcp/asset/9bd620cf-0f1c-4838-b834-303010e14b9e';
const img2  = 'https://www.figma.com/api/mcp/asset/b502ce69-10e9-4385-85be-adc50dd3b49a';
const img3  = 'https://www.figma.com/api/mcp/asset/742b1f07-ec23-4486-91ef-834d3e8ae03b';
const img4a = 'https://www.figma.com/api/mcp/asset/729e18a5-6576-475c-95c6-3cd44ecf4db2';
const img4b = 'https://www.figma.com/api/mcp/asset/6879b83a-c891-4159-9346-a29c8ce37ee5';
const img5a = 'https://www.figma.com/api/mcp/asset/729e18a5-6576-475c-95c6-3cd44ecf4db2';
const img5b = 'https://www.figma.com/api/mcp/asset/f688e353-fdf5-49f9-9a6f-079af84d4295';
const img6  = 'https://www.figma.com/api/mcp/asset/4c810a0c-2e0e-4ec4-8a85-08fadbe101c4';

/* ── Data ─────────────────────────────────────────────────────────────────── */
type Category = 'All' | 'Education' | 'Media' | 'News' | 'Thought leadership' | 'Other';

const CATEGORIES: Category[] = ['All', 'Education', 'Media', 'News', 'Thought leadership', 'Other'];

const articles = [
  {
    id: 1,
    title: 'NERSA grants trading license to NOA Trading',
    excerpt: "Approval granted at NERSA's Executive Committee Meeting on 31 January 2025.",
    category: 'News' as Category,
    date: 'Jan, 2025',
    img: img1b,
    imgBase: img1a,
  },
  {
    id: 2,
    title: 'Interview: Why energy strategy is core to mining',
    excerpt: 'Derik Coetzer, Head of Growth, interviewed at Mining Indaba.',
    category: 'Media' as Category,
    date: 'Feb, 2025',
    img: img2,
  },
  {
    id: 3,
    title: 'NOA contributes to SAETA report: Policy to Power',
    excerpt: 'Ten actions to deliver green, accessible and secure electricity.',
    category: 'Education' as Category,
    date: 'Mar, 2025',
    img: img3,
  },
  {
    id: 4,
    title: 'The terms of renewable energy wheeling',
    excerpt: 'A glossary of terms to help you navigate renewable energy wheeling.',
    category: 'Education' as Category,
    date: 'Apr, 2025',
    img: img4b,
    imgBase: img4a,
  },
  {
    id: 5,
    title: 'The upward march of global warming',
    excerpt: 'March 2024 saw record-breaking air and sea surface temperatures.',
    category: 'Thought leadership' as Category,
    date: 'May, 2025',
    img: img5b,
    imgBase: img5a,
  },
  {
    id: 6,
    title: "Keeping South Africa's smelters in the game",
    excerpt: 'Why discounted Eskom tariffs buy time and wheeling levels the playing field.',
    category: 'News' as Category,
    date: 'Jun, 2025',
    img: img6,
  },
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
            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 20, color: '#fff', lineHeight: 1.67, maxWidth: 423, margin: 0 }}>
              NOA is a South African renewable energy IPP, aggregator and energy trader delivering flexible clean energy solutions with a licensed trading platform.
            </p>
            <Link href="/about" className="anim-fade" style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 500, fontSize: 16, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>LEARN MORE ABOUT US</span>
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

/* ── Article card ─────────────────────────────────────────────────────────── */
function ArticleCard({ article }: { article: typeof articles[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/insights/${article.id}`}
      className="anim-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 24,
        borderRadius: 30,
        background: hovered ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.05)',
        textDecoration: 'none',
        overflow: 'hidden',
        transition: 'background 0.25s ease',
        flex: '1 0 0',
        minWidth: 0,
      }}
    >
      {/* Cover image */}
      <div style={{ flex: '1 0 0', minHeight: 220, borderRadius: 24, overflow: 'hidden', position: 'relative' }}>
        {article.imgBase && (
          <img src={article.imgBase} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        <img
          src={article.img}
          alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 24, color: '#000', lineHeight: 1.4, margin: 0 }}>
            {article.title}
          </p>
          <div
            style={{
              width: 30, height: 30, flexShrink: 0,
              transform: hovered ? 'translate(3px,-3px)' : 'translate(0,0)',
              transition: 'transform 0.3s ease',
            }}
          >
            <img src={imgArrowCard} alt="" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <p style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: 'rgba(0,0,0,0.5)', lineHeight: 1.6, margin: 0 }}>
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function Insights() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.anim-mask-line', { y: '110%' });
    gsap.set('.anim-fade',      { opacity: 0, y: 32 });
    gsap.set('.anim-card',      { opacity: 0, y: 56 });
    gsap.set('.anim-image',     { opacity: 0, scale: 1.07 });

    /* Hero headline */
    gsap.to('.ins-hero-line', { y: '0%', duration: 1.15, ease: 'power4.out', stagger: 0.1, delay: 0.35 });

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

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  /* Re-animate cards when filter changes */
  useEffect(() => {
    const cards = document.querySelectorAll('.anim-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.07 }
    );
  }, [activeCategory]);

  return (
    <div style={{ background: 'transparent', overflowX: 'hidden' }}>

      <HeroBg overlay="linear-gradient(59deg, rgba(0,0,0,0.55) 10%, rgba(0,0,0,0.1) 75%)">
        <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}>
          <source src="/assets/185092-874643408_medium.mp4" type="video/mp4" />
        </video>
      </HeroBg>

      {/* ═══ HERO ════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', background: 'transparent', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 64px 80px' }}>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
          {/* Left: heading */}
          <div style={{ flex: '1 0 0' }}>
            <div style={{ marginBottom: 20 }}><Label text="INSIGHTS" dark /></div>
            <h1 style={{ margin: 0, fontFamily: 'Switzer, sans-serif', fontWeight: 400, lineHeight: 1.05 }}>
              {['Community connect: The people', 'powered by Wind Garden'].map((line, i) => (
                <div key={i} style={{ overflow: 'hidden', paddingBottom: '0.04em' }}>
                  <div className="ins-hero-line" style={{ fontSize: 'clamp(48px, 5.5vw, 80px)', color: '#fff', letterSpacing: '-0.04em', transform: 'translateY(110%)', willChange: 'transform', display: 'block' }}>
                    {line}
                  </div>
                </div>
              ))}
            </h1>
          </div>

          {/* Right: meta + description + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48, flexShrink: 0, width: 376 }}>
            {/* Meta row */}
            <div className="anim-fade" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <div style={{ borderRight: '1px solid rgba(255,255,255,0.4)', paddingRight: 8, paddingLeft: 8, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 90 }}>
                <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#fff', lineHeight: 1.4 }}>Date</span>
                <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: '#fff' }}>Feb, 2026</span>
              </div>
              <div style={{ paddingLeft: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 300, fontSize: 16, color: '#fff', lineHeight: 1.4 }}>Category</span>
                <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 16, color: '#fff' }}>News</span>
              </div>
            </div>

            <p className="anim-fade" style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 14, color: '#fff', lineHeight: 1.7, textAlign: 'right', margin: 0 }}>
              What to look out for when comparing companies and proposals
            </p>

            {/* Read more CTA */}
            <Link href="/insights/featured" className="anim-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 84, borderRadius: 24, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(54px)', WebkitBackdropFilter: 'blur(54px)', textDecoration: 'none', width: '100%' }}>
              <span style={{ fontFamily: 'Switzer, sans-serif', fontSize: 32, color: '#fff', letterSpacing: '-1px', whiteSpace: 'nowrap' }}>Read more</span>
              <div style={{ width: 30, height: 30, transform: 'rotate(135deg)', flexShrink: 0 }}>
                <img src={imgArrow} alt="" style={{ width: '100%', height: '100%' }} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ LATEST INSIGHTS ═════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderRadius: '30px 30px 0 0', marginTop: -30, position: 'relative', zIndex: 2, padding: '80px 64px', display: 'flex', flexDirection: 'column', gap: 64, alignItems: 'center' }}>

        {/* Header row: title + category filter */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
          {/* Title */}
          <div className="anim-heading" style={{ flexShrink: 0 }}>
            <MaskLine>
              <h2 style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 'clamp(44px, 5vw, 72px)', color: '#00696e', letterSpacing: '-4.8px', margin: 0, lineHeight: 1 }}>
                Latest insights
              </h2>
            </MaskLine>
          </div>

          {/* Category filter */}
          <div className="anim-fade" style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 576, flex: '0 0 auto' }}>
            {/* Row 1 */}
            <div style={{ display: 'flex', gap: 0 }}>
              {(['All', 'Education', 'Media'] as Category[]).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    flex: '1 0 0',
                    padding: '10px 0',
                    background: 'none',
                    border: 'none',
                    borderBottom: `${activeCategory === cat ? 2 : 2}px solid ${activeCategory === cat ? '#00696e' : '#f9fafb'}`,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: 'Switzer, sans-serif',
                    fontWeight: activeCategory === cat ? 400 : 300,
                    fontSize: 16,
                    color: activeCategory === cat ? '#00696e' : '#7d9798',
                    transition: 'color 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}>
                    {cat}
                  </span>
                </button>
              ))}
            </div>
            {/* Row 2 */}
            <div style={{ display: 'flex', gap: 0 }}>
              {(['News', 'Thought leadership', 'Other'] as Category[]).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    flex: '1 0 0',
                    padding: '10px 0',
                    background: 'none',
                    border: 'none',
                    borderBottom: `2px solid ${activeCategory === cat ? '#00696e' : '#f9fafb'}`,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: 'Switzer, sans-serif',
                    fontWeight: activeCategory === cat ? 400 : 300,
                    fontSize: 16,
                    color: activeCategory === cat ? '#00696e' : '#7d9798',
                    transition: 'color 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}>
                    {cat}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Article grid */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Row 1 */}
          <div className="anim-card-group" style={{ display: 'flex', gap: 32 }}>
            {filtered.slice(0, 3).map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
            {/* Fill empty slots to keep layout consistent */}
            {filtered.length < 3 && Array.from({ length: 3 - filtered.length }).map((_, i) => (
              <div key={`empty-${i}`} style={{ flex: '1 0 0' }} />
            ))}
          </div>

          {/* Row 2 (only if more than 3 results) */}
          {filtered.length > 3 && (
            <div className="anim-card-group" style={{ display: 'flex', gap: 32 }}>
              {filtered.slice(3, 6).map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
              {filtered.slice(3, 6).length < 3 && Array.from({ length: 3 - filtered.slice(3, 6).length }).map((_, i) => (
                <div key={`empty2-${i}`} style={{ flex: '1 0 0' }} />
              ))}
            </div>
          )}
        </div>

        {/* View more */}
        <button
          className="anim-fade"
          style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ fontFamily: 'Switzer, sans-serif', fontWeight: 400, fontSize: 24, color: '#00696e', letterSpacing: '-1px', textDecoration: 'underline' }}>
            View more
          </span>
          <img src={imgArrowDown} alt="" style={{ width: 30, height: 30 }} />
        </button>
      </section>

      <Footer />
    </div>
  );
}
