"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

const logos = [
  { name: "MyAstrova", src: "/myastrova.png" },
  { name: "GutTalks", src: "/guttalks.png" },
  { name: "Feastify", src: "/feastify.png" },
  { name: "MJD", src: "/mjd.png" },
  { name: "SkillRoot", src: "/skillroot.png" },
];

// Duplicate enough times to create a seamless loop (at least 4 copies)
const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

const Logo = () => {
  // Optional: measure track width to ensure animation runs smoothly (but CSS will work)
  const trackRef = useRef(null);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-50 py-12 md:py-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-to-r from-blue-50/30 via-transparent to-blue-50/30 blur-3xl" />
      </div>

      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
          Trusted by innovative teams
        </p>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        {/* Marquee container */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-10 md:gap-14 items-center animate-marquee"
            style={{ width: "max-content" }}
          >
            {marqueeLogos.map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                className="flex-shrink-0 transition-all duration-300 hover:scale-105 hover:drop-shadow-md"
              >
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 80px, 120px"
                  className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                  style={{ filter: "none" }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-500">
        <span className="inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Join 20+ satisfied businesses
        </span>
      </div>

      {/* Add custom keyframes to Tailwind via a style tag (works globally) */}
      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marqueeScroll 25s linear infinite;
        }
       
      `}</style>
    </section>
  );
};

export default Logo;