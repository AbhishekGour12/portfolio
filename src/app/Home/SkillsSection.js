"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────
// SKILL DATA
// ─────────────────────────────────────────────
const SKILLS = [
  { name: "React",        color: "#61DAFB", icon: "⚛️" },
  { name: "Next.js",      color: "#a3a3a3", icon: "▲"  },
  { name: "TypeScript",   color: "#3178C6", icon: "TS" },
  { name: "Node.js",      color: "#8CC84B", icon: "🟢" },
  { name: "MongoDB",      color: "#4DB33D", icon: "🍃" },
  { name: "Tailwind CSS", color: "#38BDF8", icon: "🌊" },
  { name: "Firebase",     color: "#FFA611", icon: "🔥" },
  { name: "PHP",          color: "#8892BF", icon: "🐘" },
  { name: "MySQL",        color: "#4479A1", icon: "🐬" },
];

const techGroups = [
  {
    category: "Frontend & UI Engineering",
    items: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "Responsive UI/UX"],
    icon: "🎨",
  },
  {
    category: "Backend & Database Systems",
    items: ["Node.js", "Express.js", "MongoDB", "MySQL", "Firebase", "REST APIs", "Auth Systems"],
    icon: "⚙️",
  },
  {
    category: "AI, Automation & Integrations",
    items: ["AI Chatbots", "WhatsApp Automation", "Payment Gateways", "OpenAI APIs", "Real-time Systems"],
    icon: "🤖",
  },
  {
    category: "Cloud, SEO & Deployment",
    items: ["Docker", "AWS / VPS", "Vercel", "SEO Optimization", "Performance Tuning", "Analytics"],
    icon: "🚀",
  },
];

// ─────────────────────────────────────────────
// GLASS SQUARE (centre of orbit)
// ─────────────────────────────────────────────
const GlassSquare = ({ size = 120 }) => (
  <motion.div
    className="relative flex-shrink-0"
    animate={{ y: [0, -6, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    style={{ width: size, height: size }}
  >
    {/* glow aura */}
    <div
      className="absolute -inset-4 rounded-2xl bg-[#60A5FA]/20 blur-2xl pointer-events-none"
    />

    {/* card */}
    <div
      className="relative w-full h-full backdrop-blur-md bg-white/10 border border-[#60A5FA]/40
                 rounded-2xl shadow-[0_0_50px_rgba(96,165,250,0.35)]
                 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-1 rounded-xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <span className="text-[#60A5FA] text-[10px] sm:text-xs font-semibold tracking-widest z-10">OUR</span>
      <span className="text-[#60A5FA] text-sm sm:text-base md:text-lg font-bold tracking-widest z-10">SKILLS</span>
      <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#60A5FA] animate-pulse" />
    </div>

    {/* rotating ring SVG */}
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 200 200"
      fill="none"
    >
      <defs>
        <filter id="glowRing">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect
        x="6" y="6" width="188" height="188" rx="16"
        stroke="#60A5FA" strokeWidth="2" strokeDasharray="20 180"
        className="animate-rotate-ring"
        style={{ filter: "url(#glowRing)" }}
      />
    </svg>
  </motion.div>
);

// ─────────────────────────────────────────────
// SINGLE SKILL ICON (counter-rotates so it stays upright)
// ─────────────────────────────────────────────
const SkillIcon = ({ skill, index, total, radius, iconSize }) => {
  const [hovered, setHovered] = useState(false);
  const angle = (index / total) * 360; // degrees (CSS uses deg)

  return (
    // positioned on the orbit circle via CSS custom property
    <div
      className="absolute top-1/2 left-1/2 skill-icon-wrapper"
      style={{ "--angle": `${angle}deg`, "--r": `${radius}px` }}
    >
      <motion.div
        className="relative cursor-pointer -translate-x-1/2 -translate-y-1/2
                   counter-rotate" // counter-rotates via CSS to stay upright
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setTimeout(() => setHovered(false), 900)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <div
          className="flex flex-col items-center justify-center backdrop-blur-md
                     border rounded-full shadow-lg transition-all duration-300"
          style={{
            width: hovered ? "auto" : iconSize,
            height: hovered ? "auto" : iconSize,
            minWidth: hovered ? iconSize * 1.8 : iconSize,
            padding: hovered ? "6px 10px" : 0,
            borderRadius: hovered ? 12 : 9999,
            backgroundColor: hovered ? `${skill.color}22` : "rgba(255,255,255,0.12)",
            borderColor: hovered ? skill.color : "rgba(255,255,255,0.3)",
            boxShadow: hovered ? `0 0 16px ${skill.color}99` : undefined,
          }}
        >
          <span
            className="leading-none select-none"
            style={{ fontSize: iconSize * 0.45 }}
          >
            {skill.icon}
          </span>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[9px] sm:text-[10px] font-semibold whitespace-nowrap mt-0.5"
              style={{ color: skill.color }}
            >
              {skill.name}
            </motion.span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────
// CIRCULAR ORBIT – pure CSS rotation (no setInterval)
// ─────────────────────────────────────────────
const CircularOrbit = ({ radius, skills }) => {
  const orbitR = radius - 6;
  const iconSize = Math.max(32, Math.min(46, radius * 0.155));

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      {/* static dotted track */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        fill="none"
      >
        <circle
          cx={radius} cy={radius} r={orbitR}
          stroke="#60A5FA" strokeWidth="1.5"
          strokeDasharray="5 7" opacity="0.55"
          strokeLinecap="round"
        />
      </svg>

      {/* glowing flash dash */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        fill="none"
      >
        <defs>
          <filter id="circleFlash">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b1"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b2"/>
            <feMerge>
              <feMergeNode in="b2"/>
              <feMergeNode in="b1"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={radius} cy={radius} r={orbitR}
          stroke="#60A5FA" strokeWidth="2.5"
          strokeDasharray="18 300"
          className="animate-flash-circle"
          style={{ filter: "url(#circleFlash)", strokeLinecap: "round" }}
        />
      </svg>

      {/* energy orb */}
      <motion.div
        className="absolute rounded-full bg-[#60A5FA] shadow-[0_0_20px_#60A5FA]"
        style={{
          width: Math.max(10, radius * 0.045),
          height: Math.max(10, radius * 0.045),
          top: radius - orbitR - Math.max(5, radius * 0.022),
          left: radius - Math.max(5, radius * 0.022),
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {/* rotating icons group — CSS animation, no JS interval */}
      <div
        className="absolute inset-0 animate-orbit-spin"
        style={{ transformOrigin: "center center" }}
      >
        {skills.map((skill, idx) => (
          <SkillIcon
            key={skill.name}
            skill={skill}
            index={idx}
            total={skills.length}
            radius={orbitR}
            iconSize={iconSize}
          />
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// LEFT COLUMN
// ─────────────────────────────────────────────
const LeftColumn = () => (
  <div className="space-y-5 sm:space-y-6">
    <div>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E3A8A] mb-2">
        Tech Excellence
      </h3>
      <div className="w-14 h-1 bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] rounded-full mb-3" />
      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#1E40AF]">
        Modern Tech Stack
      </span>
      <p className="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
        We build scalable SaaS platforms, AI-powered solutions, modern websites,
        dashboards, and automation systems using industry-leading technologies.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-3">
      {techGroups.map((g) => (
        <div
          key={g.category}
          className="bg-white/40 backdrop-blur-sm rounded-xl p-3 sm:p-4
                     border border-white/60 shadow-sm
                     hover:shadow-md hover:bg-white/55 transition-all duration-300"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base sm:text-lg">{g.icon}</span>
            <h4 className="font-semibold text-[#1E40AF] text-xs sm:text-sm">{g.category}</h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {g.items.map((item) => (
              <span
                key={item}
                className="px-2 py-0.5 text-[10px] sm:text-xs font-medium
                           bg-white/70 rounded-full text-[#1E3A8A] shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* stats row */}
    <div className="flex gap-3 pt-1">
      {[["20+", "Projects"], ["98%", "Satisfaction"]].map(([val, label]) => (
        <div
          key={label}
          className="flex-1 text-center p-3 bg-white/40 backdrop-blur-sm
                     rounded-xl border border-white/60 shadow-sm"
        >
          <div className="text-xl sm:text-2xl font-bold text-[#1E40AF]">{val}</div>
          <div className="text-[10px] sm:text-xs text-gray-600">{label}</div>
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────
// MAIN SKILLS SECTION
// ─────────────────────────────────────────────
const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [radius, setRadius] = useState(200);
  const [glassSize, setGlassSize] = useState(100);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 420)       { setRadius(148); setGlassSize(72);  }
      else if (w < 540)  { setRadius(168); setGlassSize(80);  }
      else if (w < 768)  { setRadius(200); setGlassSize(96);  }
      else if (w < 1024) { setRadius(240); setGlassSize(108); }
      else               { setRadius(300); setGlassSize(128); }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden below-fold-section"
      style={{ background: "linear-gradient(135deg,#f0f9ff 0%,#e0f2fe 50%,#bae6fd 100%)" }}
    >
      {/* background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none max-sm:hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/35 rounded-full blur-3xl"
          animate={{ x: [0,30,0], y: [0,40,0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/25 rounded-full blur-3xl"
          animate={{ x: [0,-35,0], y: [0,-25,0] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3A8A] mb-3">
            Technical{" "}
            <span className="text-[#1E40AF]">Mastery</span>
          </h2>
          <div className="w-20 h-1 mx-auto bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] rounded-full" />
          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#1E3A8A]/75 max-w-2xl mx-auto px-2">
            Cutting-edge technologies powering next-gen digital experiences
          </p>
        </motion.div>

        {/* two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LeftColumn />
          </motion.div>

          {/* RIGHT – orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.3 }}
            className="flex justify-center items-center"
          >
            <div
              className="relative flex items-center justify-center"
              style={{ width: radius * 2, height: radius * 2 }}
            >
              <CircularOrbit radius={radius} skills={SKILLS} />

              {/* centre glass */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <GlassSquare size={glassSize} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── global keyframes ── */}
      <style>{`
        /* orbit spin — pure CSS, GPU composited */
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-orbit-spin {
          animation: orbitSpin 28s linear infinite;
        }

        /* each icon wrapper: placed on circle using CSS custom props */
        .skill-icon-wrapper {
          transform:
            rotate(var(--angle))
            translateX(var(--r))
            rotate(calc(-1 * var(--angle)));   /* keeps icon upright */
          position: absolute;
        }

        /* counter-rotate child so label is always readable */
        .animate-orbit-spin .counter-rotate {
          animation: orbitSpin 28s linear infinite reverse;
        }

        /* flash dash on orbit track */
        @keyframes flashCircle {
          0%   { stroke-dashoffset: 320; }
          100% { stroke-dashoffset: 0;   }
        }
        .animate-flash-circle {
          animation: flashCircle 4s linear infinite;
        }

        /* glass square ring */
        @keyframes rotateRing {
          0%   { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0;   }
        }
        .animate-rotate-ring {
          animation: rotateRing 4s linear infinite;
        }

        /* reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-orbit-spin,
          .animate-flash-circle,
          .animate-rotate-ring,
          .animate-orbit-spin .counter-rotate {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;