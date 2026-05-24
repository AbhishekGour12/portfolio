"use client";
import React, { useEffect, useRef } from "react";

const topRowLogos = [
  { name: "MyAstrova",     src: "/myastrova.png" },
  { name: "GutTalks",      src: "/guttalks.png" },
  { name: "Feastify",      src: "/feastify.png" },
  { name: "GymX",          src: "/dumbleLogo.png" },
  { name: "BrewandBean",   src: "/brewandbean.png" },
  { name: "MJD",           src: "/mjd.png" },
  { name: "SkillRoot",     src: "/skillroot.png" },
];

const bottomRowLogos = [
  { name: "UrbanProperty", src: "/urbanproperty.png" },
  { name: "SmileCare",     src: "/smilecare.png" },
  { name: "HomeEase",      src: "/homeease.png" },
  { name: "SSTTrader",     src: "/ssttrader.png" },
  { name: "buynest",       src: "/buynest.png" },
  { name: "byteforge",     src: "/byteforge.png" },
  { name: "urbantandoor",  src: "/urbantandoor.png" },
];

// ── Logo card ────────────────────────────────────────────────────
const LogoCard = ({ logo, idx }) => (
  <div
    className="logo-card group flex flex-col items-center justify-center flex-shrink-0
               w-28 h-28 xs:w-32 xs:h-32 sm:w-40 sm:h-40 md:w-48 md:h-48
               bg-white/80 backdrop-blur-sm border border-gray-200/70 rounded-2xl
               shadow-sm hover:shadow-md hover:border-blue-300/60
               transition-shadow duration-300"
  >
    <img
      src={logo.src}
      alt={`${logo.name} logo`}
      width={64}
      height={64}
      className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                 object-contain grayscale brightness-75
                 group-hover:grayscale-0 group-hover:brightness-100
                 transition-all duration-300"
      loading={idx < 4 ? "eager" : "lazy"}
      decoding="async"
      onError={(e) => { e.currentTarget.src = "https://placehold.co/400x400?text=Logo"; }}
    />
    <span className="mt-2 sm:mt-3 text-[10px] xs:text-xs sm:text-sm font-medium
                     text-gray-500 group-hover:text-gray-800 transition-colors
                     text-center leading-tight px-1 truncate max-w-full">
      {logo.name}
    </span>
  </div>
);

// ── rAF Marquee row ───────────────────────────────────────────────
// direction: 1 = left (negative), -1 = right (positive)
const MarqueeRow = ({ logos, direction = 1 }) => {
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const animRef = useRef(null);
  const pausedRef = useRef(false);
  // One "set" pixel width, measured after mount
  const setWidthRef = useRef(null);

  // Triple for seamless wrap on any screen width
  const tripled = [...logos, ...logos, ...logos];

  // Measure the width of one set (N original logos + their gaps)
  const measure = () => {
    if (!trackRef.current) return;
    const items = trackRef.current.querySelectorAll(".marquee-item");
    const n = logos.length;
    if (items.length < n) return;
    const gap = parseFloat(getComputedStyle(trackRef.current).gap) || 0;
    let w = 0;
    for (let i = 0; i < n; i++) w += items[i].getBoundingClientRect().width;
    w += gap * n; // gap after each item (including after last, before the next set)
    setWidthRef.current = w;
  };

  // If scrolling right, initialise offset so we start from the second set
  // (same as CSS marqueeRight starting at -33.3%)
  useEffect(() => {
    measure();
    if (direction === -1 && setWidthRef.current) {
      offsetRef.current = setWidthRef.current;
    }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Speed in px/s — constant regardless of screen size
  const SPEED = 60;

  useEffect(() => {
    let last = null;

    const tick = (ts) => {
      if (!last) last = ts;
      const dt = ts - last;
      last = ts;

      if (!pausedRef.current && setWidthRef.current && trackRef.current) {
        offsetRef.current += direction * (SPEED * dt) / 1000;

        // Wrap
        if (direction === 1 && offsetRef.current >= setWidthRef.current) {
          offsetRef.current -= setWidthRef.current;
        }
        if (direction === -1 && offsetRef.current <= 0) {
          offsetRef.current += setWidthRef.current;
        }

        trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [direction]);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div
        ref={trackRef}
        className="flex items-center gap-3 sm:gap-5 md:gap-6 will-change-transform"
        style={{ width: "max-content", transform: "translate3d(0,0,0)" }}
        aria-hidden="true"
      >
        {tripled.map((logo, idx) => (
          <div key={`${logo.name}-${idx}`} className="marquee-item flex-shrink-0">
            <LogoCard logo={logo} idx={idx} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────
const Logo = () => (
  <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100/30 py-10 sm:py-14 md:py-20">

    {/* Background glow */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[200%] h-[200%] bg-gradient-to-r from-blue-200/25 via-transparent
                      to-blue-200/25 blur-3xl" />
    </div>

    {/* Heading */}
    <div className="text-center mb-8 sm:mb-10 relative z-10 px-4">
      <p className="text-[10px] xs:text-xs uppercase tracking-widest text-gray-400 font-semibold">
        Trusted by innovative brands worldwide
      </p>
    </div>

    {/* Rows */}
    <div className="relative flex flex-col gap-4 sm:gap-6 md:gap-8">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-40
                      bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-40
                      bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none" />

      <MarqueeRow logos={topRowLogos}    direction={1}  />
      <MarqueeRow logos={bottomRowLogos} direction={-1} />
    </div>

    {/* Footer badge */}
    <div className="text-center mt-10 sm:mt-12 text-xs sm:text-sm text-gray-500 relative z-10">
      <span className="inline-flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
        Join 20+ satisfied businesses
      </span>
    </div>

    <style>{`
      @media (min-width: 420px) {
        .xs\\:w-32  { width:  8rem; }
        .xs\\:h-32  { height: 8rem; }
        .xs\\:w-10  { width:  2.5rem; }
        .xs\\:h-10  { height: 2.5rem; }
        .xs\\:text-xs { font-size: 0.75rem; }
      }
      @media (prefers-reduced-motion: reduce) {
        .will-change-transform { animation: none !important; }
      }
    `}</style>
  </section>
);

export default Logo;