"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────
// SKILL DATA (with icons)
// ─────────────────────────────────────────────
const SKILLS = [
  { name: "React", color: "#61DAFB", icon: "⚛️" },
  { name: "Next.js", color: "#ffffff", icon: "▲" },
  { name: "TypeScript", color: "#3178C6", icon: "TS" },
  { name: "Node.js", color: "#8CC84B", icon: "🟢" },
  { name: "MongoDB", color: "#4DB33D", icon: "🍃" },
  { name: "Tailwind CSS", color: "#38BDF8", icon: "🌊" },
  { name: "Firebase", color: "#FFA611", icon: "🔥" },
  { name: "PHP", color: "#8892BF", icon: "🐘" },
  { name: "MySQL", color: "#4479A1", icon: "🐬" },
];

// ─────────────────────────────────────────────
// GLASS SQUARE (replaces 3D cube)
// ─────────────────────────────────────────────
const GlassSquare = () => {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Outer glow aura */}
      <div className="absolute -inset-6 rounded-2xl  blur-2xl" />

      {/* Main square */}
      <div className="relative w-23 h-23 sm:w-40 sm:h-40 md:w-48 md:h-48   backdrop-blur-md rounded-2xl shadow-[0_0_60px_rgba(96,165,250,0.4)] flex flex-col items-center justify-center overflow-hidden group">
        {/* Inner glow */}
        <div className="absolute inset-1 rounded-xl   to-transparent pointer-events-none" />

        {/* Rotating border line (CSS) */}
        <div className="absolute inset-0 rounded-2xl  border-transparent animate-rotate-border" />

        {/* Text content */}
        <span className="text-[#60A5FA] text-xs sm:text-sm font-semibold tracking-wider drop-shadow-lg z-10">
          OUR
        </span>
        <span className="text-[#60A5FA] text-base sm:text-lg md:text-xl font-bold tracking-wider drop-shadow-lg z-10">
          SKILLS
        </span>

        {/* Decorative dot */}
        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
      </div>

      {/* Rotating energy ring */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
      >
        <defs>
          <filter id="glowRing" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect
          x="6"
          y="6"
          width="188"
          height="188"
          rx="16"
          stroke="#60A5FA"
          strokeWidth="2"
          strokeDasharray="20 180"
          className="animate-rotate-ring"
          style={{ filter: "url(#glowRing)" }}
        />
      </svg>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// SKILL ICON – with hover shape change & inline name
// ─────────────────────────────────────────────
const SkillIcon = ({ skill, index, total, radius }) => {
  const [hovered, setHovered] = useState(false);
  const angle = (index / total) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
    >
      <motion.div
        className="relative cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {/* Animated container: changes shape, bg, shows name on hover */}
        <motion.div
          className="flex items-center justify-center backdrop-blur-md border shadow-lg transition-all duration-300"
          style={{
            width: hovered ? "auto" : 48,
            height: hovered ? "auto" : 48,
            minWidth: hovered ? 80 : 48,
            padding: hovered ? "8px 12px" : 0,
            borderRadius: hovered ? "16px" : "9999px",
            backgroundColor: hovered ? `${skill.color}20` : "rgba(255,255,255,0.1)",
            borderColor: hovered ? skill.color : "rgba(255,255,255,0.3)",
            boxShadow: hovered ? `0 0 20px ${skill.color}` : undefined,
            flexDirection: "column",
            gap: hovered ? 4 : 0,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          {/* Icon always visible */}
          <span className="text-xl md:text-2xl" style={{ display: "inline-block" }}>
            {skill.icon}
          </span>
          {/* Name appears inside on hover */}
          {hovered && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-semibold text-white whitespace-nowrap"
              style={{ color: skill.color }}
            >
              {skill.name}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────
// CIRCULAR ORBIT – static dotted circle + moving glow + rotating icons group
// ─────────────────────────────────────────────
const CircularOrbit = ({ radius, skills }) => {
  const orbitRadius = radius - 8;
  const iconGroupRef = useRef(null);

  // Rotate the entire skill icons group slowly (orbit rotation)
  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      angle += 0.5;
      if (iconGroupRef.current) {
        iconGroupRef.current.style.transform = `rotate(${angle}deg)`;
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
      {/* 1. Static blue dotted circular path */}
      <svg
        className="absolute w-full h-full pointer-events-none"
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={radius}
          cy={radius}
          r={orbitRadius}
          stroke="#60A5FA"
          strokeWidth="2"
          strokeDasharray="6 8"
          opacity="0.7"
          style={{ strokeLinecap: "round" }}
        />
      </svg>

      {/* 2. Moving glowing flash (single dash) */}
      <svg
        className="absolute w-full h-full pointer-events-none"
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="circleFlash" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={radius}
          cy={radius}
          r={orbitRadius}
          stroke="#60A5FA"
          strokeWidth="3"
          strokeDasharray="16 200"
          className="animate-flash-circle"
          style={{ filter: "url(#circleFlash)", strokeLinecap: "round" }}
        />
        <circle
          cx={radius}
          cy={radius}
          r={orbitRadius}
          stroke="#60A5FA"
          strokeWidth="8"
          strokeDasharray="16 200"
          className="animate-flash-circle"
          style={{ filter: "blur(8px)", opacity: 0.6 }}
        />
      </svg>

      {/* 3. Energy orb moving along the circle */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-[#60A5FA] shadow-[0_0_25px_#60A5FA]"
        style={{ top: -8, left: radius - 8 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {/* 4. Rotating skill icons group (orbital rotation) */}
      <div
        ref={iconGroupRef}
        className="absolute inset-0 transition-transform duration-50 ease-linear"
        style={{ transformOrigin: "center center" }}
      >
        {skills.map((skill, idx) => (
          <SkillIcon
            key={skill.name}
            skill={skill}
            index={idx}
            total={skills.length}
            radius={orbitRadius}
          />
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// FLOATING PARTICLES (ambient glow)
// ─────────────────────────────────────────────
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 15 + 8,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#60A5FA]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            filter: "blur(2px)",
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 15, -15, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// LEFT COLUMN – Premium skill highlights
// ─────────────────────────────────────────────
const LeftColumn = () => {
  const techGroups = [
    {
      category: "Frontend & UI",
      items: ["React", "Next.js", "Tailwind CSS", "UI/UX Design"],
      icon: "🎨",
    },
    {
      category: "Backend & Database",
      items: ["Node.js", "PHP", "MySQL", "MongoDB", "Firebase"],
      icon: "⚙️",
    },
    {
      category: "Mobile & Real-Time",
      items: ["React Native", "Socket.io"],
      icon: "📱",
    },
    {
      category: "DevOps & Marketing",
      items: ["Deployment (Vercel, Netlify, Hostinger, AWS etc)", "Digital Marketing, SEO"],
      icon: "🚀",
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-[#1E3A8A] mb-2">Tech Excellence</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] rounded-full mb-4" />
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          We build scalable, high‑performance digital products using modern full‑stack technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {techGroups.map((group) => (
          <div
            key={group.category}
            className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-md transition-all hover:shadow-lg hover:bg-white/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{group.icon}</span>
              <h4 className="font-semibold text-[#1E40AF]">{group.category}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 text-xs font-medium bg-white/70 rounded-full text-[#1E3A8A] shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-2">
        <div className="flex-1 text-center p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/60">
          <div className="text-2xl font-bold text-[#1E40AF]">20+</div>
          <div className="text-xs text-gray-600">Projects</div>
        </div>
        <div className="flex-1 text-center p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/60">
          <div className="text-2xl font-bold text-[#1E40AF]">98%</div>
          <div className="text-xs text-gray-600">Satisfaction</div>
        </div>
      </div>
    </div>
  );
};


// ─────────────────────────────────────────────
// MAIN SKILLS SECTION (two columns, responsive)
// ─────────────────────────────────────────────
const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [radius, setRadius] = useState(300);

  // Responsive radius based on right column width
  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width < 640) setRadius(170);
      else if (width < 768) setRadius(200);
      else if (width < 1024) setRadius(260);
      else setRadius(320);
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
      }}
    >
      {/* Abstract background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4">
            Technical <span className="text-[#1E40AF]">Mastery</span>
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] rounded-full" />
          <p className="mt-6 text-base md:text-lg text-[#1E3A8A]/80 max-w-2xl mx-auto">
            Cutting-edge technologies powering next‑gen digital experiences
          </p>
        </motion.div>

        {/* Two columns: left content + right visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column – skill info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LeftColumn />
          </motion.div>

          {/* Right column – circular visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative flex items-center justify-center">
              <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
                <CircularOrbit radius={radius} skills={SKILLS} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <GlassSquare/>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Global keyframe animations and 3D cube styles */}
      <style>{`
        @keyframes flashBorder {
          0% { stroke-dashoffset: 160; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes flashCircle {
          0% { stroke-dashoffset: 216; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-flash-border {
          animation: flashBorder 2s linear infinite;
        }
        .animate-flash-circle {
          animation: flashCircle 3.5s linear infinite;
        }
        /* 3D Cube CSS */
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .cube {
          position: relative;
          transform: rotateX(20deg) rotateY(25deg);
          animation: slowSpin 12s infinite linear;
        }
        @keyframes slowSpin {
          0% { transform: rotateX(20deg) rotateY(0deg); }
          100% { transform: rotateX(20deg) rotateY(360deg); }
        }
        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(30, 64, 175, 0.6);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(96, 165, 250, 0.6);
          box-shadow: 0 0 20px rgba(96, 165, 250, 0.3);
          border-radius: 8px;
        }
        .front  { transform: translateZ(2rem); }
        .back   { transform: rotateY(180deg) translateZ(2rem); }
        .right  { transform: rotateY(90deg) translateZ(2rem); }
        .left   { transform: rotateY(-90deg) translateZ(2rem); }
        .top    { transform: rotateX(90deg) translateZ(2rem); }
        .bottom { transform: rotateX(-120deg) translateZ(2rem); }
        @media (max-width: 768px) {
          .front, .back, .right, .left, .top, .bottom { transform: translateZ(1.4rem); }
        }
          @keyframes rotateRing {
  0% { stroke-dashoffset: 200; }
  100% { stroke-dashoffset: 0; }
}
.animate-rotate-ring {
  animation: rotateRing 4s linear infinite;
}

@keyframes rotateBorder {
  0% { border-image-source: conic-gradient(from 0deg, #60A5FA, #1E40AF, #60A5FA); }
  100% { border-image-source: conic-gradient(from 360deg, #60A5FA, #1E40AF, #60A5FA); }
}
.animate-rotate-border {
  border-image-slice: 1;
  border-image-source: conic-gradient(from 0deg, #60A5FA, #1E40AF, #60A5FA);
  animation: rotateBorder 3s linear infinite;
}
      `}</style>
    </section>
  );
};

export default SkillsSection;