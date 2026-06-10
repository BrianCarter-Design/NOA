'use client';

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

// ── Icons ────────────────────────────────────────────────────────────────────

function NoaLogo() {
  return (
    <svg viewBox="0 0 67 22" fill="none" xmlns="http://www.w3.org/2000/svg" width={47} height={16}>
      <path d="M66.9193 19.5057L62.5368 4.85742C62.5278 4.82795 62.5184 4.79849 62.508 4.76855C62.0588 3.49427 61.2216 2.38975 60.1122 1.60753C59.0027 0.825314 57.6756 0.404006 56.3143 0.401798C54.9529 0.399591 53.6245 0.816592 52.5124 1.59521C51.4003 2.37382 50.5595 3.47563 50.1061 4.74844C50.0957 4.77697 50.0858 4.80644 50.0769 4.83637L45.634 19.4996C45.5282 19.8481 45.5234 20.2191 45.6202 20.5702C45.7169 20.9213 45.9112 21.2384 46.1809 21.4852C46.4507 21.732 46.785 21.8987 47.1456 21.9662C47.5063 22.0336 47.8789 21.9992 48.2208 21.8668L56.9873 18.4725C57.2267 18.3798 57.4455 18.2412 57.6309 18.0647C57.8164 17.8882 57.965 17.6772 58.0682 17.4438C58.1715 17.2103 58.2273 16.959 58.2326 16.7042C58.2379 16.4493 58.1925 16.1959 58.0991 15.9584C58.0056 15.721 57.8659 15.5041 57.6878 15.3202C57.5098 15.1363 57.2971 14.9889 57.0616 14.8866C56.8262 14.7842 56.5727 14.7288 56.3157 14.7236C56.0587 14.7183 55.8032 14.7633 55.5637 14.856L50.5396 16.8008L53.8127 6.00101C54.0016 5.49692 54.3414 5.0622 54.7867 4.75522C55.2319 4.44824 55.7612 4.2837 56.3035 4.2837C56.8458 4.2837 57.3752 4.44824 57.8204 4.75522C58.2657 5.0622 58.6055 5.49692 58.7943 6.00101L58.7981 6.01224L63.1651 20.6081C63.3127 21.1017 63.652 21.5169 64.1084 21.7625C64.5648 22.008 65.1008 22.0637 65.5986 21.9173C66.0964 21.7709 66.5151 21.4345 66.7627 20.9819C67.0103 20.5294 67.0665 19.9979 66.9189 19.5043M9.28726 0.00147914C8.09094 -0.0202458 6.90248 0.19754 5.793 0.641806C4.68353 1.08607 3.67582 1.74769 2.83019 2.58707C1.93841 3.45676 1.22917 4.49297 0.743409 5.6359C0.257647 6.77882 0.00498305 8.00583 0 9.2461L0 18.6437C0 19.159 0.20644 19.6532 0.573905 20.0175C0.94137 20.3819 1.43976 20.5866 1.95943 20.5866C2.47911 20.5866 2.9775 20.3819 3.34496 20.0175C3.71243 19.6532 3.91887 19.159 3.91887 18.6437V9.19558C3.90493 7.82754 4.42932 6.50798 5.38069 5.51712C6.33206 4.52625 7.63547 3.94212 9.01415 3.88876H9.11226C10.4885 3.88975 11.808 4.43245 12.7809 5.39761C13.7539 6.36278 14.3006 7.67145 14.3009 9.03609V18.6437C14.3009 19.159 14.5074 19.6532 14.8748 20.0175C15.2423 20.3819 15.7407 20.5866 16.2604 20.5866C16.7801 20.5866 17.2784 20.3819 17.6459 20.0175C18.0134 19.6532 18.2198 19.159 18.2198 18.6437V9.03609C18.209 6.67376 17.2699 4.40866 15.6021 2.72175C13.9343 1.03485 11.669 0.0590226 9.28726 0.00147914ZM32.9717 0.0482518C30.8811 0.0480668 28.8373 0.662626 27.0989 1.81421C25.3605 2.9658 24.0055 4.60269 23.2054 6.51788C22.4052 8.43307 22.1957 10.5405 22.6035 12.5738C23.0112 14.607 24.0179 16.4747 25.4961 17.9406C26.9743 19.4065 28.8578 20.4049 30.9082 20.8094C32.9587 21.2139 35.0841 21.0064 37.0156 20.2131C38.9471 19.4198 40.598 18.0764 41.7596 16.3527C42.9211 14.6291 43.541 12.6026 43.541 10.5295C43.541 7.74989 42.4275 5.08408 40.4454 3.11848C38.4633 1.15288 35.7749 0.0484999 32.9717 0.0482518ZM32.9717 17.1282C31.6555 17.1283 30.3688 16.7414 29.2744 16.0163C28.1799 15.2913 27.3269 14.2607 26.8232 13.055C26.3194 11.8492 26.1876 10.5224 26.4444 9.24232C26.7011 7.96225 27.3349 6.78643 28.2656 5.86356C29.1963 4.94069 30.3821 4.31222 31.6731 4.05762C32.964 3.80302 34.3021 3.93374 35.5181 4.43324C36.7341 4.93273 37.7734 5.77858 38.5046 6.8638C39.2358 7.94902 39.626 9.22487 39.6259 10.53C39.6258 12.2799 38.9247 13.9581 37.6768 15.1955C36.4289 16.4329 34.7365 17.1281 32.9717 17.1282Z" fill="white" />
    </svg>
  );
}

function PowerIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width={28} height={28}>
      <path d="M16.3125 18V6.75C16.3125 6.30245 16.4903 5.87322 16.8068 5.55676C17.1232 5.24029 17.5524 5.0625 18 5.0625C18.4476 5.0625 18.8768 5.24029 19.1932 5.55676C19.5097 5.87322 19.6875 6.30245 19.6875 6.75V18C19.6875 18.4476 19.5097 18.8768 19.1932 19.1932C18.8768 19.5097 18.4476 19.6875 18 19.6875C17.5524 19.6875 17.1232 19.5097 16.8068 19.1932C16.4903 18.8768 16.3125 18.4476 16.3125 18ZM25.6711 6.46875C25.2964 6.23803 24.8464 6.1628 24.417 6.25911C23.9876 6.35542 23.6128 6.61564 23.3726 6.9843C23.1323 7.35296 23.0455 7.80089 23.1308 8.23261C23.216 8.66432 23.4665 9.04565 23.8289 9.29531C26.917 11.302 28.6875 14.4844 28.6875 18C28.6875 20.8345 27.5615 23.5529 25.5572 25.5572C23.5529 27.5615 20.8345 28.6875 18 28.6875C15.1655 28.6875 12.4471 27.5615 10.4428 25.5572C8.4385 23.5529 7.3125 20.8345 7.3125 18C7.3125 14.4844 9.08297 11.302 12.1711 9.28828C12.5142 9.03115 12.7465 8.65307 12.8209 8.23083C12.8954 7.80859 12.8063 7.37386 12.5717 7.01493C12.3372 6.65601 11.9749 6.3998 11.5583 6.29836C11.1418 6.19691 10.7022 6.25783 10.3289 6.46875C6.26625 9.10969 3.9375 13.3158 3.9375 18C3.9375 21.7296 5.41908 25.3065 8.05631 27.9437C10.6935 30.5809 14.2704 32.0625 18 32.0625C21.7296 32.0625 25.3065 30.5809 27.9437 27.9437C30.5809 25.3065 32.0625 21.7296 32.0625 18C32.0625 13.3158 29.7338 9.10969 25.6711 6.46875Z" fill="white" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 28 28" fill="none" stroke="white" strokeWidth={1.6} strokeLinecap="round" width={28} height={28}>
      <line x1="7" y1="7" x2="21" y2="21" />
      <line x1="21" y1="7" x2="7" y2="21" />
    </svg>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={20} height={20} style={{ transition: 'transform 0.35s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
      <polyline points="4 7 10 13 16 7" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
      <line x1="3" y1="13" x2="13" y2="3" />
      <polyline points="6 3 13 3 13 10" />
    </svg>
  );
}

function MetricIcon({ name, size = 62 }: { name: string; size?: number }) {
  return (
    <img
      src={`/assets/icons/${name}.svg`}
      alt=""
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
    />
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface Weather {
  city: string;
  temp: number;
  wind: number;
  solarMW: number;
  windMW:  number;
  hydroMW: number;
  loadMW:  number;
}

// Plausible grid demand: daily peaks (morning + evening), nightly trough,
// temperature adjustment for heating/cooling, deterministic noise.
function estimateLoad(temp: number): number {
  const now    = new Date();
  const t      = now.getHours() + now.getMinutes() / 60;
  const minute = now.getMinutes();
  const hour   = now.getHours();

  const morning = 400 * Math.exp(-Math.pow((t -  8) / 3,   2));
  const evening = 600 * Math.exp(-Math.pow((t - 19) / 2.5, 2));
  const trough  = -300 * Math.exp(-Math.pow((t -  4) / 3,  2));
  const tempD   = temp > 24 ? (temp - 24) * 15 : temp < 18 ? (18 - temp) * 12 : 0;
  const noise   = ((minute * 7 + hour * 13) % 20) - 10;

  return Math.round(1800 + morning + evening + trough + tempD + noise);
}

// ── MetricCard ────────────────────────────────────────────────────────────────

function MetricCard({ icon, value, unit }: { icon: React.ReactNode; value: number | null; unit: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ opacity: 0.7 }}>{icon}</div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px', lineHeight: 1 }}>
        <span
          className="metric-value"
          data-target={value ?? ''}
          style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 300, color: 'white', letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}
        >
          {value ?? '—'}
        </span>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>
          {unit}
        </span>
      </div>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

const PILL_W = 556;
const PILL_H = 64;
const PILL_TOP = 36;
const MENU_M = 16;

const NAV_LINKS = [
  { label: 'Home',          href: '/'               },
  { label: 'How it works',  href: '/how-it-works'  },
  { label: 'Solutions',     href: '/solutions'                },
  { label: 'About NOA',     href: '/about'          },
  { label: 'Projects',      href: '/projects'       },
  { label: 'Insights',      href: '/insights'       },
  { label: 'Contact',       href: '/contact'        },
];

const SOLUTIONS_LINKS = [
  { label: 'Overview',   href: '/solutions'            },
  { label: 'Investors',  href: '/solutions/investors'  },
  { label: 'IPP',        href: '/solutions/ipp'        },
  { label: 'Off-takers', href: '/solutions/off-takers' },
  { label: 'Partners',   href: '/solutions/partners'   },
];

export default function Nav() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [weather,   setWeather]  = useState<Weather | null>(null);
  const [time,          setTime]          = useState('');

  const containerRef  = useRef<HTMLDivElement>(null);
  const isAnimating   = useRef(false);
  const menuOpenRef   = useRef(false);
  const pillFixedRef  = useRef(false);

  // ── Initial pill position (before paint) ───────────────────────────────────
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const positionPill = () => {
      if (menuOpenRef.current) return;
      const vw   = document.documentElement.clientWidth;
      const left = (vw - PILL_W) / 2;
      gsap.set(el, {
        top:          PILL_TOP,
        left:         left,
        width:        PILL_W,
        height:       PILL_H,
        borderRadius: 9999,
      });
    };
    positionPill();
    window.addEventListener('resize', positionPill);
    return () => window.removeEventListener('resize', positionPill);
  }, []);

  // ── Live clock ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  // ── Weather ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        let lat: number, lon: number, city: string;
        try {
          const pos = await new Promise<GeolocationPosition>((res, rej) =>
            navigator.geolocation.getCurrentPosition(res, rej, { timeout: 6000 })
          );
          lat  = pos.coords.latitude;
          lon  = pos.coords.longitude;
          const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const g = await r.json();
          city = g.address?.city || g.address?.town || g.address?.suburb || 'Your location';
        } catch {
          const r = await fetch('https://ipapi.co/json/');
          const d = await r.json();
          lat  = d.latitude  ?? -33.9249;
          lon  = d.longitude ?? 18.4241;
          city = d.city      ?? 'Cape Town';
        }
        const r = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_speed_120m,shortwave_radiation,cloud_cover&wind_speed_unit=kmh&timezone=auto`
        );
        const d = await r.json();

        // Solar: GHI(W/m²) × 3,000,000 m² × 0.20 efficiency → MW
        const ghi     = d.current.shortwave_radiation ?? 0;
        const solarMW = Math.round(ghi * 0.6);

        // Wind: cubic power curve at hub-height (120m), 1 GW rated farm
        const wind120Mps = (d.current.wind_speed_120m ?? 0) / 3.6;
        const cutIn = 3, rated = 12, cutOut = 25, windCap = 1000;
        let windMW = 0;
        if (wind120Mps >= cutIn && wind120Mps <= cutOut) {
          windMW = wind120Mps >= rated
            ? windCap
            : Math.round(windCap * Math.pow((wind120Mps - cutIn) / (rated - cutIn), 3));
        }

        // Hydro: regional baseline modulated by cloud cover (moisture proxy)
        const cloudCover = d.current.cloud_cover ?? 0;
        const hydroMW    = Math.round(250 + (cloudCover / 100) * 500);

        const temp   = Math.round(d.current.temperature_2m);
        const loadMW = estimateLoad(temp);

        setWeather({
          city,
          temp,
          wind:    Math.round(d.current.wind_speed_10m),
          solarMW,
          windMW,
          hydroMW,
          loadMW,
        });
      } catch {}
    })();
  }, []);

  // ── Scroll: pill tracks 1:1 in both directions ──────────────────────────────
  // anchor shifts on direction change so the pill continues from its current
  // visual position — it reappears from the top after ~100px of upward scroll
  // regardless of how far down the page you are.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const PILL_OFFSCREEN = -(PILL_TOP + PILL_H); // -100: fully above viewport

    let anchor  = 0;
    let prevY   = window.scrollY;
    let prevDir = 'none';
    let pillY   = 0;

    const tick = () => {
      if (menuOpenRef.current || isAnimating.current) return;

      const y = window.scrollY;
      if (y === prevY) return;

      // Detect page navigation: a jump this large can't happen in a single frame
      // from normal scrolling (~300px @ 60fps = 18,000px/s). Reset pill to visible.
      if (Math.abs(y - prevY) > 300) {
        anchor  = y;
        pillY   = 0;
        prevY   = y;
        prevDir = 'none';
        gsap.set(el, { y: 0 });
        return;
      }

      const dir = y > prevY ? 'down' : 'up';

      // On direction reversal, reset anchor so pill continues smoothly from
      // wherever it currently is (no teleport).
      if (dir !== prevDir && prevDir !== 'none') {
        anchor = y + pillY;
      }

      prevDir = dir;
      prevY   = y;
      pillY   = Math.min(0, Math.max(PILL_OFFSCREEN, -y + anchor));
      gsap.set(el, { y: pillY });
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  // ── Open ────────────────────────────────────────────────────────────────────
  const openMenu = useCallback(() => {
    if (isAnimating.current || menuOpenRef.current) return;
    isAnimating.current = true;
    menuOpenRef.current = true;
    setMenuOpen(true);

    // Switch to fixed so the morph animates relative to the viewport
    const rect = containerRef.current!.getBoundingClientRect();
    gsap.set(containerRef.current, { position: 'fixed', top: rect.top, left: rect.left, y: 0 });

    // Reset body content
    gsap.set('.menu-nav-item', { y: '115%' });
    gsap.set('.menu-meta',     { opacity: 0, y: 12 });

    // Container morph
    gsap.to(containerRef.current, {
      top:          MENU_M,
      left:         MENU_M,
      width:        document.documentElement.clientWidth  - MENU_M * 2,
      height:       window.innerHeight - MENU_M * 2,
      borderRadius: 37,
      x:            0,
      y:            0,
      duration:     0.85,
      ease:         'power4.inOut',
      onComplete: () => {
        isAnimating.current = false;
        gsap.to('.menu-nav-item', { y: '0%',   duration: 0.9,  ease: 'power4.out', stagger: 0.08 });
        gsap.to('.menu-meta',     { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06 });

        // Count-up the metric numbers
        document.querySelectorAll<HTMLElement>('.metric-value').forEach((el, i) => {
          const target = parseFloat(el.dataset.target || '');
          if (isNaN(target)) return;
          el.textContent = '0';
          const obj = { val: 0 };
          gsap.to(obj, {
            val:      target,
            duration: 1.4,
            ease:     'power2.out',
            delay:    0.15 + i * 0.06,
            onUpdate: () => { el.textContent = Math.round(obj.val).toString(); },
          });
        });
      },
    });

    // Icon crossfade (rotation morph)
    gsap.to('.icon-power', { opacity: 0, rotate:  90, duration: 0.45, ease: 'power3.inOut' });
    gsap.to('.icon-close', { opacity: 1, rotate:   0, duration: 0.45, ease: 'power3.inOut', delay: 0.15 });

    // Body fade in (begins midway through morph)
    gsap.to('.menu-body', { opacity: 1, duration: 0.45, ease: 'power2.out', delay: 0.35 });
  }, []);

  // ── Close ───────────────────────────────────────────────────────────────────
  const closeMenu = useCallback(() => {
    if (isAnimating.current || !menuOpenRef.current) return;
    isAnimating.current = true;

    // Hide body content first
    gsap.to('.menu-nav-item', { y: '115%', duration: 0.32, ease: 'power4.in', stagger: 0.03 });
    gsap.to('.menu-meta',     { opacity: 0, y: 10, duration: 0.26, ease: 'power3.in' });
    gsap.to('.menu-body',     { opacity: 0, duration: 0.35, ease: 'power3.in', delay: 0.22 });

    const pillLeft = (document.documentElement.clientWidth - PILL_W) / 2;

    // Container morph back
    gsap.to(containerRef.current, {
      top:          PILL_TOP,
      left:         pillLeft,
      width:        PILL_W,
      height:       PILL_H,
      borderRadius: 37,
      x:            0,
      y:            0,
      duration:     0.75,
      ease:         'power4.inOut',
      delay:        0.3,
      onComplete: () => {
        gsap.set(containerRef.current, { position: 'fixed', top: PILL_TOP, left: (document.documentElement.clientWidth - PILL_W) / 2, y: 0 });
        pillFixedRef.current = false;
        menuOpenRef.current  = false;
        setMenuOpen(false);
        isAnimating.current  = false;
      },
    });

    // Icon crossfade back
    gsap.to('.icon-close', { opacity: 0, rotate: -90, duration: 0.45, ease: 'power3.inOut', delay: 0.3  });
    gsap.to('.icon-power', { opacity: 1, rotate:   0, duration: 0.45, ease: 'power3.inOut', delay: 0.45 });
  }, []);

  const handleToggle = () => {
    if (menuOpen) closeMenu();
    else          openMenu();
  };

  // ── Pill hover (closed state only) ──────────────────────────────────────────
  const handlePillEnter = useCallback(() => {
    if (menuOpenRef.current || isAnimating.current) return;
    gsap.to(containerRef.current, {
      width:        PILL_W + 20,
      height:       PILL_H + 8,
      x:            -10,
      borderRadius: 37,
      duration:     0.5,
      ease:         'power3.out',
      overwrite:    'auto',
    });
  }, []);

  const handlePillLeave = useCallback(() => {
    if (menuOpenRef.current) return;
    gsap.to(containerRef.current, {
      width:        PILL_W,
      height:       PILL_H,
      x:            0,
      borderRadius: 37,
      duration:     0.5,
      ease:         'power3.out',
      overwrite:    'auto',
    });
  }, []);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      onMouseEnter={handlePillEnter}
      onMouseLeave={handlePillLeave}
      style={{
        position:             'fixed',
        zIndex:               100,
        display:              'flex',
        flexDirection:        'column',
        background:           'rgba(0,0,0,0.16)',
        backdropFilter:       'blur(100px)',
        WebkitBackdropFilter: 'blur(100px)',
        overflow:             'hidden',
        willChange:           'transform',
      }}
    >
      {/* ── Header (persistent across pill + menu) ─────────────────────────── */}
      <div
        onClick={() => { if (!menuOpenRef.current && !isAnimating.current) openMenu(); }}
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '0 24px',
          height:         PILL_H,
          flexShrink:     0,
          cursor:         menuOpen ? 'default' : 'pointer',
        }}
      >
        <NoaLogo />
        <button
          onClick={() => { if (menuOpenRef.current) closeMenu(); }}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            background:     'none',
            border:         'none',
            cursor:         'pointer',
            padding:        0,
            position:       'relative',
            width:          28,
            height:         28,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
          }}
        >
          <span className="icon-power" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PowerIcon />
          </span>
          <span className="icon-close" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transform: 'rotate(-90deg)' }}>
            <CloseIcon />
          </span>
        </button>
      </div>

      {/* ── Body (only visible when menu open) ─────────────────────────────── */}
      <div
        className="menu-body"
        style={{
          flex:          1,
          opacity:       0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          minHeight:     0,
          padding:       '8px 24px 40px 24px',
          display:       'grid',
          gridTemplateColumns: '38% 1fr',
          gridTemplateRows:    'auto auto 1fr auto',
          columnGap:     '80px',
        }}
      >
        {/* ── Row 1: labels ───────────────────────────────────────────── */}
        <div className="menu-meta" style={{ marginBottom: '20px', alignSelf: 'end' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontFamily: 'Switzer, sans-serif', letterSpacing: '-0.01em' }}>Menu</span>
        </div>
        <div className="menu-meta" style={{ marginBottom: '20px', alignSelf: 'end' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontFamily: 'Switzer, sans-serif', letterSpacing: '-0.01em' }}>Realtime Energy Data Centre</span>
        </div>

        {/* ── Rows 2–3: nav spans left col; weather + metrics fill right ── */}
        <nav style={{ gridColumn: 1, gridRow: '2 / 4', display: 'flex', flexDirection: 'column', gap: '4px', alignSelf: 'start', paddingTop: '26px' }}>
          {NAV_LINKS.map((link) => (
            <div key={link.label} style={{ overflow: 'hidden', paddingBottom: '6px' }}>
              <div className="menu-nav-item" style={{ transform: 'translateY(115%)' }}>
                <Link href={link.href} onClick={closeMenu} style={{ textDecoration: 'none' }}>
                  <span style={{ fontFamily: 'Switzer, sans-serif', fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 300, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, display: 'block' }}>
                    {link.label}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </nav>
        <div className="menu-meta" style={{ display: 'flex', gap: '48px', paddingBottom: '24px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', alignSelf: 'start' }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '6px', fontFamily: 'Switzer, sans-serif', letterSpacing: '-0.01em' }}>Your weather</div>
            <div style={{ color: 'white', fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 300, letterSpacing: '-0.03em', fontFamily: 'Switzer, sans-serif' }}>
              {weather?.city ?? '—'}
            </div>
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '6px', fontFamily: 'Switzer, sans-serif', letterSpacing: '-0.01em' }}>Local time</div>
            <div style={{ color: 'white', fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 300, letterSpacing: '-0.03em', fontFamily: 'Switzer, sans-serif', fontVariantNumeric: 'tabular-nums' }}>
              {time || '—'}
            </div>
          </div>
        </div>
        <div className="menu-meta" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 40px', alignSelf: 'start' }}>
          <MetricCard icon={<MetricIcon name="sun" size={56} />}     value={weather?.temp ?? null}    unit="°C"  />
          <MetricCard icon={<MetricIcon name="solar" />}             value={weather?.solarMW ?? null} unit="MW"  />
          <MetricCard icon={<MetricIcon name="wind" />}              value={weather?.wind ?? null}    unit="KPH" />
          <MetricCard icon={<MetricIcon name="turbine" />}           value={weather?.windMW ?? null}  unit="MW"  />
          <MetricCard icon={<MetricIcon name="bolt" />}              value={weather?.loadMW ?? null}  unit="MW"  />
          <MetricCard icon={<MetricIcon name="hydro" />}             value={weather?.hydroMW ?? null} unit="MW"  />
        </div>

        {/* ── Row 4: footer ───────────────────────────────────────────── */}
        <div className="menu-meta" style={{ alignSelf: 'end' }}>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', marginBottom: '24px' }} />
          <div style={{ display: 'flex', gap: '48px' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '6px', fontFamily: 'Switzer, sans-serif', letterSpacing: '-0.01em' }}>Contact</div>
              <a href="mailto:info@noagroup.africa" style={{ color: 'white', fontSize: '14px', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Switzer, sans-serif' }}>
                info@noagroup.africa <ArrowUpRight />
              </a>
            </div>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '6px', fontFamily: 'Switzer, sans-serif', letterSpacing: '-0.01em' }}>Social</div>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '14px', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Switzer, sans-serif' }}>
                LinkedIn <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
        <div className="menu-meta" style={{ alignSelf: 'end', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '18px 22px', color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.7, fontFamily: 'Switzer, sans-serif', letterSpacing: '-0.01em' }}>
          Based on the current weather conditions in your location, renewable energy availability from wind, solar, and hydro sources is operating at 78% capacity, enabling the website to run in Green Performance Mode.
        </div>
      </div>
    </div>
  );
}
