"use client";
import React from "react";

// Real brand logos (no tech logos like Docker, AWS)
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

// Duplicate for seamless loop
const marqueeTop = [...topRowLogos, ...topRowLogos];
const marqueeBottom = [...bottomRowLogos, ...bottomRowLogos];

const Logo = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100/30 py-12 md:py-20">
      {/* Enhanced background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-to-r from-blue-200/30 via-transparent to-blue-200/30 blur-3xl" />
      </div>

      <div className="text-center mb-10 relative z-10">
        <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
          Trusted by innovative brands worldwide
        </p>
      </div>

      <div className="relative flex flex-col gap-8">
        {/* Edge fades - matching the modern background */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-blue-50/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-blue-50/60 to-transparent z-10 pointer-events-none" />

        {/* Top Marquee (Left) */}
        <div className="overflow-hidden flex">
          <div className="flex gap-6 md:gap-8 items-center animate-marquee-left" style={{ width: "max-content" }}>
            {marqueeTop.map((logo, idx) => (
              <div
                key={`top-${logo.name}-${idx}`}
                className="flex flex-col items-center justify-center w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 bg-gray-50/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-300/60 transition-all duration-300 group"
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/400x400?text=Logo";
                  }}
                />
                <span className="mt-4 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Marquee (Right) */}
        <div className="overflow-hidden flex">
          <div className="flex gap-6 md:gap-8 items-center animate-marquee-right" style={{ width: "max-content" }}>
            {marqueeBottom.map((logo, idx) => (
              <div
                key={`bottom-${logo.name}-${idx}`}
                className="flex flex-col items-center justify-center w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 bg-gray-50/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-300/60 transition-all duration-300 group"
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/400x400?text=Logo";
                  }}
                />
                <span className="mt-4 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-12 text-sm text-gray-500 relative z-10">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Join 20+ satisfied businesses
        </span>
      </div>

      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 40s linear infinite;
        }
     
        @media (max-width: 640px) {
          .animate-marquee-left, .animate-marquee-right {
            animation-duration: 30s;
          }
        }
      `}</style>
    </section>
  );
};

export default Logo;