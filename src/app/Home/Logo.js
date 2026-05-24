"use client";
import React from "react";

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

// Triple for extra-smooth infinite loop (no jump on any screen width)
const marqueeTop    = [...topRowLogos,    ...topRowLogos,    ...topRowLogos];
const marqueeBottom = [...bottomRowLogos, ...bottomRowLogos, ...bottomRowLogos];

// ── Single logo card ──────────────────────────────────────────────
const LogoCard = ({ logo, rowKey, idx }) => (
  <div
    key={`${rowKey}-${logo.name}-${idx}`}
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
      loading="lazy"
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

// ── Marquee row ───────────────────────────────────────────────────
const MarqueeRow = ({ logos, direction = "left", rowKey }) => (
  <div className="overflow-hidden">
    <div
      className={`flex items-center ${
        direction === "left" ? "gap-3 sm:gap-5 md:gap-6 animate-marquee-left"
                             : "gap-3 sm:gap-5 md:gap-6 animate-marquee-right"
      }`}
      style={{ width: "max-content" }}
      aria-hidden="true"
    >
      {logos.map((logo, idx) => (
        <LogoCard key={`${rowKey}-${logo.name}-${idx}`} logo={logo} rowKey={rowKey} idx={idx} />
      ))}
    </div>
  </div>
);

// ── Main component ────────────────────────────────────────────────
const Logo = () => (
  <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100/30 py-10 sm:py-14 md:py-20">

    {/* background glow */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[200%] h-[200%] bg-gradient-to-r from-blue-200/25 via-transparent
                      to-blue-200/25 blur-3xl" />
    </div>

    {/* heading */}
    <div className="text-center mb-8 sm:mb-10 relative z-10 px-4">
      <p className="text-[10px] xs:text-xs uppercase tracking-widest text-gray-400 font-semibold">
        Trusted by innovative brands worldwide
      </p>
    </div>

    {/* rows */}
    <div className="relative flex flex-col gap-4 sm:gap-6 md:gap-8">

      {/* edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-40
                      bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-40
                      bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none" />

      <MarqueeRow logos={marqueeTop}    direction="left"  rowKey="top" />
      <MarqueeRow logos={marqueeBottom} direction="right" rowKey="bottom" />
    </div>

    {/* footer badge */}
    <div className="text-center mt-10 sm:mt-12 text-xs sm:text-sm text-gray-500 relative z-10">
      <span className="inline-flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
        Join 20+ satisfied businesses
      </span>
    </div>

    <style>{`
      /* xs breakpoint */
      @media (min-width: 420px) {
        .xs\\:w-32  { width:  8rem; }
        .xs\\:h-32  { height: 8rem; }
        .xs\\:w-10  { width:  2.5rem; }
        .xs\\:h-10  { height: 2.5rem; }
        .xs\\:text-xs { font-size: 0.75rem; }
      }

      /* ── keyframes ── */
      @keyframes marqueeLeft {
        0%   { transform: translateX(0); }
        100% { transform: translateX(calc(-100% / 3)); }
      }
      @keyframes marqueeRight {
        0%   { transform: translateX(calc(-100% / 3)); }
        100% { transform: translateX(0); }
      }

      /* ── base speed ── */
      .animate-marquee-left  {
        animation: marqueeLeft  35s linear infinite;
        will-change: transform;
      }
      .animate-marquee-right {
        animation: marqueeRight 35s linear infinite;
        will-change: transform;
      }

      /* ── mobile: slightly faster so it doesn't feel sluggish ── */
      @media (max-width: 639px) {
        .animate-marquee-left  { animation-duration: 22s; }
        .animate-marquee-right { animation-duration: 22s; }
      }

      /* ── hover pause (desktop only) ── */
      @media (hover: hover) {
        .logo-card:hover ~ .logo-card,
        .logo-card:hover {
          /* individual card hover doesn't stop the row */
        }
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      }

      /* reduce motion */
      @media (prefers-reduced-motion: reduce) {
        .animate-marquee-left,
        .animate-marquee-right {
          animation: none;
          /* stack vertically when motion is off */
          flex-wrap: wrap;
          justify-content: center;
        }
      }
    `}</style>
  </section>
);

export default Logo;