"use client";
import React from "react";
import Image from "next/image";

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

// Reusable optimized logo card component
const LogoCard = React.memo(({ logo, index }) => (
  <div className="flex-shrink-0">
    <div className="group flex flex-col items-center justify-center
                    w-28 h-28 xs:w-32 xs:h-32 sm:w-40 sm:h-40 md:w-48 md:h-48
                    bg-white/70 backdrop-blur-sm border border-gray-200/70 rounded-2xl
                    shadow-sm hover:shadow-md hover:border-blue-300/60
                    transition-all duration-300">
      <div className="relative w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
        <Image
          src={logo.src}
          alt={`${logo.name} logo`}
          fill
          className="object-contain grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300"
          loading={index < 2 ? "eager" : "lazy"}
          sizes="(max-width: 480px) 64px, (max-width: 768px) 80px, 100px"
        />
      </div>
      <span className="mt-2 sm:mt-3 text-[10px] xs:text-xs sm:text-sm font-medium
                       text-gray-500 group-hover:text-gray-800 transition-colors
                       text-center truncate max-w-[90%]">
        {logo.name}
      </span>
    </div>
  </div>
));
LogoCard.displayName = 'LogoCard';

// GPU-Accelerated Marquee Row
const MarqueeRow = ({ logos, direction = 1 }) => {
  // Duplicate the array to create a seamless loop (leapfrog effect)
  const duplicatedLogos = [...logos, ...logos];

  // Dynamic speed based on logo count: slower for more logos (150px/sec base)
  const animationDuration = logos.length * 3; // Seconds

  // Direction classes
  const animationName = direction === 1 ? 'marquee-left' : 'marquee-right';

  return (
    <div className="relative w-full overflow-hidden">
      {/* Edge Fade Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32
                      bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32
                      bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none" />

      {/* The Track */}
      <div
        className={`flex items-center gap-3 sm:gap-5 md:gap-6 ${animationName}`}
        style={{
          width: 'max-content',
          animationDuration: `${animationDuration}s`,
        }}
      >
        {duplicatedLogos.map((logo, idx) => (
          <LogoCard key={`${logo.name}-${idx}`} logo={logo} index={idx} />
        ))}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100/30 py-10 sm:py-14 md:py-20">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[200%] h-[200%] bg-gradient-to-r from-blue-200/25 via-transparent
                        to-blue-200/25 blur-3xl" />
      </div>

      <div className="text-center mb-8 sm:mb-10 relative z-10 px-4">
        <p className="text-[10px] xs:text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
          Trusted by innovative brands worldwide
        </p>
      </div>

      <div className="relative flex flex-col gap-4 sm:gap-6 md:gap-8">
        <MarqueeRow logos={topRowLogos} direction={1} />
        <MarqueeRow logos={bottomRowLogos} direction={-1} />
      </div>

      <div className="text-center mt-10 sm:mt-12 text-xs sm:text-sm text-gray-500 relative z-10">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
          Join 20+ satisfied businesses
        </span>
      </div>
    </section>
  );
};

export default Logo;

