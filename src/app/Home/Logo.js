"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// Logos data (unchanged)
const topRowLogos = [
  { name: "MyAstrova", src: "/myastrova.png" },
  { name: "GutTalks", src: "/guttalks.png" },
  { name: "Feastify", src: "/feastify.png" },
  { name: "GymX", src: "/dumbleLogo.png" },
  { name: "BrewandBean", src: "/brewandbean.png" },
  { name: "MJD", src: "/mjd.png" },
  { name: "SkillRoot", src: "/skillroot.png" },
];

const bottomRowLogos = [
  { name: "UrbanProperty", src: "/urbanproperty.png" },
  { name: "SmileCare", src: "/smilecare.png" },
  { name: "HomeEase", src: "/homeease.png" },
  { name: "SSTTrader", src: "/ssttrader.png" },
  { name: "buynest", src: "/buynest.png" },
  { name: "byteforge", src: "/byteforge.png" },
  { name: "urbantandoor", src: "/urbantandoor.png" },
];

// Optimized Logo Card
const LogoCard = React.memo(({ logo, index }) => (
  <div className="flex-shrink-0 group">
    <div className="flex flex-col items-center justify-center
                    w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 md:w-44 md:h-44
                    bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl
                    shadow-sm hover:shadow-md hover:border-blue-300/60
                    transition-all duration-300">
      <div className="relative w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
        <Image
          src={logo.src}
          alt={`${logo.name} logo`}
          fill
          className="object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
          loading={index < 2 ? "eager" : "lazy"}
          sizes="(max-width: 480px) 48px, (max-width: 768px) 64px, 80px"
          quality={75}
        />
      </div>
      <span className="mt-2 sm:mt-3 text-[9px] xs:text-xs sm:text-sm font-medium
                       text-gray-500 group-hover:text-gray-800 transition-colors
                       text-center truncate max-w-[90%]">
        {logo.name}
      </span>
    </div>
  </div>
));
LogoCard.displayName = "LogoCard";

// Pure CSS Marquee Row – smooth, GPU-accelerated, and slow enough to be elegant
const MarqueeRow = ({ logos, direction = 1 }) => {
  // Duplicate exactly once for seamless loop (two copies)
  const duplicatedLogos = [...logos, ...logos];
  // Use a long, fixed duration for a calm, professional speed
  // 25 seconds for a full cycle (50% translation) → feels smooth and not rushed
  const duration = 25; // seconds

  return (
    <div className="relative w-full overflow-hidden">
      {/* Edge fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none" />

      {/* Track – CSS infinite scroll */}
      <div
        className={`marquee-track flex items-center gap-3 sm:gap-5 md:gap-6`}
        style={{
          width: "max-content",
          animation: `${direction === 1 ? "marqueeLeft" : "marqueeRight"} ${duration}s linear infinite`,
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translate3d(0, 0, 0)",
        }}
      >
        {duplicatedLogos.map((logo, idx) => (
          <LogoCard key={`${logo.name}-${idx}`} logo={logo} index={idx} />
        ))}
      </div>

      <style jsx>{`
        .marquee-track {
          display: flex;
          flex-shrink: 0;
        }
        @keyframes marqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marqueeRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        /* Pause on hover for desktop (optional, improves UX) */
        @media (hover: hover) and (min-width: 768px) {
          .marquee-track:hover {
            animation-play-state: paused;
          }
        }
        /* For users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

const Logo = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100/20 py-12 sm:py-16 md:py-20">
      {/* Soft ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[150%] h-[150%] bg-gradient-to-r from-blue-200/20 via-transparent
                        to-blue-200/20 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8 sm:mb-10 px-4">
          <p className="text-[10px] xs:text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
            Trusted by innovative brands worldwide
          </p>
        </div>

        <div className="relative flex flex-col gap-5 sm:gap-7 md:gap-9">
          <MarqueeRow logos={topRowLogos} direction={1} />
          <MarqueeRow logos={bottomRowLogos} direction={-1} />
        </div>

        <div className="text-center mt-10 sm:mt-12 text-xs sm:text-sm text-gray-500">
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
            Join 20+ satisfied businesses
          </span>
        </div>
      </div>
    </section>
  );
};

export default Logo;