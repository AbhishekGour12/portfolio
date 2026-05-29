"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaMobileAlt,
  FaPaintBrush,
  FaShieldAlt,
  FaRocket,
  FaRobot,
} from "react-icons/fa";
import TechStack from "../Components/TechStack";
import { Code, Database, Layout } from "lucide-react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const services = [
  {
    icon: FaRocket,
    title: "Web Development",
    description:
      "Modern React, Next.js & MERN stack applications with blazing performance and scalable architecture.",
    tag: "Flagship",
    gradient: "from-[#1E40AF] to-[#1E3A8A]",
    accent: "#1E40AF",
  },
  {
    icon: FaRobot,
    title: "AI Automation & Workflow",
    description:
      "Automate document processing, lead routing, and reporting to eliminate manual effort and scale with intelligence.",
    tag: "New Era",
    gradient: "from-[#1E3A8A] to-[#60A5FA]",
    accent: "#3B82F6",
  },
  {
    icon: FaMobileAlt,
    title: "Mobile Apps",
    description:
      "Cross-platform React Native apps with native feel, smooth animations, and high-performance UX.",
    tag: "iOS & Android",
    gradient: "from-[#1E40AF] to-[#60A5FA]",
    accent: "#2563EB",
  },
  {
    icon: FaPaintBrush,
    title: "UI/UX Design",
    description:
      "Beautiful, user-centric interfaces backed by research and modern design principles.",
    tag: "Premium",
    gradient: "from-[#60A5FA] to-[#1E40AF]",
    accent: "#60A5FA",
  },
  {
    icon: FaShieldAlt,
    title: "Security & Compliance",
    description:
      "Enterprise-grade security, robust authentication, and total data protection for your peace of mind.",
    tag: "GDPR Ready",
    gradient: "from-[#1E3A8A] to-[#1E40AF]",
    accent: "#1E3A8A",
  },
];

// ─────────────────────────────────────────────
// SERVICE CARD
// ─────────────────────────────────────────────
const ServiceCard = ({ service, index, progress, range, targetScale }) => {
  const cardRef = useRef(null);

  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, 0.9]);

  return (
    <div
      ref={cardRef}
      /* CHANGED: h-screen to h-[70vh] or lower on mobile to remove the 'gaping' */
      className="h-[65vh] sm:h-screen flex items-center justify-center sticky top-12 sm:top-0 px-3 sm:px-6"
    >
      <motion.div
        style={{
          scale,
          opacity,
          /* Adjusted stacking offset for mobile */
          y: `calc(-2vh + ${index * 12}px)`, // use transform y: `calc(-2vh + ${index * 12}px)`, // use transform
          willChange: "transform, opacity",
        }}
        className="relative w-full max-w-[860px] bg-white/85 backdrop-blur-xl
                   border border-white/50 rounded-[1.5rem] sm:rounded-[2.5rem]
                   shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                   overflow-hidden group
                   flex flex-col md:flex-row
                   p-6 sm:p-10
                   gap-4 sm:gap-8
                   items-start md:items-center
                   h-auto min-h-[300px] sm:min-h-[400px]"
      >
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${service.accent}, transparent)` }}
        />

        <div className="flex-1 z-10 min-w-0">
          <div className="flex items-center gap-2.5 mb-3 sm:mb-5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-sm`}>
              <service.icon className="text-white text-base" />
            </div>
            {service.tag && (
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                {service.tag}
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
            {service.title}
          </h3>

          <p className="text-gray-500 text-sm sm:text-lg leading-relaxed max-w-md">
            {service.description}
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="mt-4 inline-flex items-center gap-2 text-[#1E40AF] font-bold text-sm"
          >
            Learn more <FaRocket className="text-xs" />
          </motion.button>
        </div>

        {/* Decorative icon hidden on mobile to save vertical space */}
        <div className="hidden md:flex flex-shrink-0 justify-center items-center w-40 relative">
          <service.icon className="text-[8rem] text-gray-100 opacity-20" />
        </div>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────
const ServiceSection = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const techStack = [
    { name: "React",   icon: <Code size={28} />,     level: 95, color: "#61DAFB" },
    { name: "Next.js", icon: <Layout size={28} />,   level: 92, color: "#000000" },
    { name: "Node.js", icon: <Database size={28} />, level: 88, color: "#339933" },
    { name: "AWS",     icon: "☁️",                   level: 80, color: "#FF9900" },
  ];

  return (
    <section className="relative bg-[#F8FAFC]">

      {/* ── background decor (static, no animation = fast) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-[100px]" />
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 text-center pt-10 sm:pt-14 pb-6 sm:pb-10 px-4 sm:px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-block px-4 py-1.5 mb-3 sm:mb-4 text-xs sm:text-sm
                     font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-100"
        >
          Our Capabilities
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                     font-bold text-gray-900 tracking-tight leading-tight"
        >
          Engineering{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
            Excellence
          </span>
        </motion.h2>
      </div>

      {/* ── Sticky stack ── */}
    {/* ── Sticky stack ── */}
<div ref={container} className="relative px-2 sm:px-4 pb-10">
  {services.map((service, i) => {
    // MODIFIED: Reduced the scaling intensity for mobile (0.02 instead of 0.04)
    // Inside the map function
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const targetScale = 1 - (services.length - i) * (isMobile ? 0.02 : 0.04);
const range = [i * 0.2, 1];
    
    return (
      <ServiceCard
        key={i}
        index={i}
        service={service}
        progress={scrollYProgress}
        // Slightly tighter range for mobile
        range={[i * 0.2, 1]} 
        targetScale={targetScale}
       
      />
    );
  })}
</div>

      {/* ── Tech stack ticker ── */}
      <div className="py-6 sm:py-8">
        <TechStack items={techStack} speed={50} direction="left" />
      </div>

      {/* xs breakpoint helper */}
      <style>{`
        @media (min-width: 420px) {
          .xs\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sticky { position: relative !important; }
        }
      `}</style>
    </section>
  );
};

export default ServiceSection;