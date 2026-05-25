'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Link from 'next/link';
import HeroBg from '@/components/HeroBg';
import Footer from '@/components/Footer';

/* ── Assets ──────────────────────────────────────────────────────────────── */
const imgArrowDown = 'https://www.figma.com/api/mcp/asset/c6efd98d-5546-4def-b88d-aab746b33ae4';

/* ── Styles ─────────────────────────────────────────────────────────────── */
const sw: React.CSSProperties  = { fontFamily: 'Switzer, sans-serif' };
const it: React.CSSProperties  = { fontFamily: 'Inter, Switzer, sans-serif' };

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
  boxSizing: 'border-box' as const,
};

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({
    name: '', surname: '', company: '', help: '', email: '', phone: '', message: '',
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    gsap.set('.anim-fade', { opacity: 0, y: 24 });
    gsap.set('.anim-card', { opacity: 0, y: 48 });

    /* Hero lines — fire on load */
    gsap.to('.con-hero-line', { y: '0%', duration: 1.15, ease: 'power4.out', stagger: 0.1, delay: 0.3 });

    gsap.utils.toArray<Element>('.anim-fade').forEach(el => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 91%', once: true },
      });
    });
    gsap.utils.toArray<Element>('.anim-card-group').forEach(group => {
      gsap.to(group.querySelectorAll('.anim-card'), {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: group, start: 'top 84%', once: true },
      });
    });

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

      {/* ── Video hero background ─────────────────────────────────────────── */}
      <HeroBg overlay="linear-gradient(170deg, rgba(0,18,20,0.65) 0%, rgba(0,0,0,0.25) 65%)">
        <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}>
          <source src="/assets/283597_medium.mp4" type="video/mp4" />
        </video>
      </HeroBg>

      {/* ═══ HERO ════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', background: 'transparent', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 64px 80px' }}>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
          <div style={{ flex: '1 0 0' }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.1)' }}>
                <span style={{ ...it, fontWeight: 400, fontSize: 14, letterSpacing: '0.01em', color: 'rgba(255,255,255,0.5)' }}>CONTACT</span>
              </div>
            </div>
            <h1 style={{ margin: 0, ...sw, fontWeight: 400, lineHeight: 1.02 }}>
              {["Let's start the", 'conversation'].map((line, i) => (
                <div key={i} style={{ overflow: 'hidden', paddingBottom: '0.04em' }}>
                  <div
                    className="con-hero-line"
                    style={{ fontSize: 'clamp(48px, 5.5vw, 80px)', color: '#fff', letterSpacing: '-0.04em', transform: 'translateY(110%)', willChange: 'transform', display: 'block' }}
                  >
                    {line}
                  </div>
                </div>
              ))}
            </h1>
          </div>
          <div className="anim-fade" style={{ flexShrink: 0, maxWidth: 376 }}>
            <p style={{ ...it, fontWeight: 400, fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>
              Whether you&apos;re ready to start or just exploring your options, our team is here to help you find the right energy solution.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FORM SECTION ════════════════════════════════════════════════════ */}
        <section style={{
          background: '#005458', borderRadius: 0, padding: '88px 60px',
          display: 'flex', justifyContent: 'center', overflow: 'hidden',
          position: 'relative', zIndex: 2,
        }}>
          <div style={{ width: '100%', maxWidth: 1010, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34 }}>

            <h2 className="anim-heading-words" style={{
              ...sw, fontWeight: 400, fontSize: 48, color: '#fff',
              letterSpacing: '-0.96px', lineHeight: '60px',
              textAlign: 'center', margin: 0, width: '100%',
            }}>
              Take the next step toward reliable energy
            </h2>

            <div className="anim-fade" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', width: '100%', maxWidth: 1010 }}>
              {/* Left column */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
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
                <input placeholder="Company name*" value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  style={formInput} />
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
                  <img src={imgArrowDown} alt=""
                    style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 24, height: 24, pointerEvents: 'none' }} />
                </div>
                <input placeholder="Email address*" type="email" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={formInput} />
                <input placeholder="Phone number*" type="tel" value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  style={formInput} />
                {/* Captcha */}
                <div style={{
                  background: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid #013b3e', borderRadius: 16, height: 55, padding: '0 16px 0 11px',
                  display: 'flex', alignItems: 'center', gap: 10, boxSizing: 'border-box',
                }}>
                  <div style={{ width: 35, height: 35, borderRadius: 6, background: '#014448', flexShrink: 0 }} />
                  <span style={{ ...it, fontWeight: 500, fontSize: 16, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>I am not a robot</span>
                  <span style={{ ...it, fontWeight: 500, fontSize: 16, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>Captcha</span>
                </div>
              </div>

              {/* Right column */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, alignSelf: 'stretch' }}>
                <textarea placeholder="Message" value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ ...formInput, height: 316, minHeight: 316, paddingTop: 18, paddingBottom: 18, resize: 'none' }} />
                <button type="button" style={{
                  background: '#00c0b5', border: 'none', borderRadius: 16, height: 58,
                  padding: 24, cursor: 'pointer', display: 'flex', alignItems: 'center',
                  ...it, fontWeight: 500, fontSize: 20, color: '#000b0d', lineHeight: '30px', width: '100%',
                }}>
                  Get expert advice
                </button>
              </div>
            </div>
          </div>
        </section>

      {/* ── Footer spacer + footer ─────────────────────────────────────────── */}
      <div style={{ height: 582 }} />
      <Footer />
    </div>
  );
}
