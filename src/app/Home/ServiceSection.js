"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  FaCode,
  FaMobileAlt,
  FaPaintBrush,
  FaCloud,
  FaDatabase,
  FaChartLine,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";
import TechStack from "../Components/TechStack";
import { Code, Database, Layout } from "lucide-react";

// Service data with explicit layout sizes
const services = [
  {
    icon: FaRocket,
    title: "Web Development",
    description: "Modern React, Next.js & MERN stack applications with blazing performance.",
    tag: "Most Popular",
    size: "large",
    gradient: "from-[#1E40AF] to-[#1E3A8A]",
  },
  {
    icon: FaMobileAlt,
    title: "Mobile Apps",
    description: "Cross‑platform React Native apps with native feel and smooth UX.",
    tag: "iOS & Android",
    size: "medium",
    gradient: "from-[#1E40AF] to-[#60A5FA]",
  },
  {
    icon: FaPaintBrush,
    title: "UI/UX Design",
    description: "Beautiful, user‑centric interfaces backed by research.",
    size: "small",
    gradient: "from-[#60A5FA] to-[#1E40AF]",
  },
  {
    icon: FaCloud,
    title: "Cloud & DevOps",
    description: "Scalable AWS/Azure deployments & CI/CD pipelines.",
    tag: "Enterprise",
    size: "medium",
    gradient: "from-[#1E3A8A] to-[#60A5FA]",
  },
  {
    icon: FaDatabase,
    title: "Database Architecture",
    description: "Optimized SQL & NoSQL solutions for data‑intensive apps.",
    size: "small",
    gradient: "from-[#1E40AF] to-[#1E3A8A]",
  },
  {
    icon: FaChartLine,
    title: "Performance Audit",
    description: "Speed, SEO & Core Web Vitals optimization.",
    size: "small",
    gradient: "from-[#60A5FA] to-[#1E40AF]",
  },
  {
    icon: FaShieldAlt,
    title: "Security & Compliance",
    description: "Enterprise‑grade security, authentication & data protection.",
    size: "small",
    tag: "GDPR Ready",
    gradient: "from-[#1E3A8A] to-[#1E40AF]",
  },
];

// Helper to get grid column span based on size
const getSpan = (size) => {
  switch (size) {
    case "large":
      return "lg:col-span-2 lg:row-span-1";
    case "medium":
      return "lg:col-span-1 lg:row-span-1";
    default:
      return "lg:col-span-1";
  }
};

// Individual Panel Component – fully responsive typography
const ServicePanel = ({ service, index }) => {
  const Icon = service.icon;
  const [hovered, setHovered] = React.useState(false);

  const panelVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <motion.div
      variants={panelVariants}
      whileHover={{
        y: -6,
        scale: 1.01,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative backdrop-blur-xl bg-white/60 border border-white/80 rounded-2xl shadow-lg overflow-hidden group ${getSpan(
        service.size
      )}`}
    >
      {/* Animated background glow on hover */}
      {hovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at 30% 20%, rgba(96,165,250,0.2), transparent 70%)`,
          }}
        />
      )}

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none" />

      {/* Content – responsive padding + text sizes */}
      <div className="relative p-5 sm:p-6 h-full flex flex-col">
        {/* Icon + Tag row */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <motion.div
            animate={hovered ? { scale: 1.1, rotate: 3 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-md`}
          >
            <Icon className="text-white text-base sm:text-xl" />
          </motion.div>
          {service.tag && (
            <span className="text-[9px] sm:text-[10px] font-semibold px-2 py-1 rounded-full bg-[#1E40AF]/10 text-[#1E40AF] border border-[#1E40AF]/20">
              {service.tag}
            </span>
          )}
        </div>

        {/* Title – responsive font size */}
        <h3 className="text-gray-800 font-bold text-lg sm:text-md mb-1.5 sm:mb-2">
          {service.title}
        </h3>

        {/* Description – responsive + keeps readability */}
        <motion.p
          className="text-gray-500 text-xs sm:text-sm leading-relaxed"
          initial={false}
          animate={hovered ? { y: -2, opacity: 1 } : { y: 0, opacity: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          {service.description}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="absolute bottom-5 left-5 sm:left-6 w-10 h-0.5 bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] rounded-full"
          initial={{ width: 0 }}
          animate={hovered ? { width: 40 } : { width: 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Inner shadow for depth */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-inner shadow-blue-500/5" />
    </motion.div>
  );
};

const ServiceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Floating particles
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: 2 + Math.random() * 6,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 12 + Math.random() * 20,
    delay: Math.random() * 8,
    opacity: 0.1 + Math.random() * 0.3,
  }));

  const techStack = [
    { name: "React", icon: <Code size={32} />, level: 95, color: "#61DAFB" },
    { name: "Next.js", icon: <Layout size={32} />, level: 92, color: "#000000" },
    { name: "Node.js", icon: <Database size={32} />, level: 88, color: "#339933" },
    { name: "TypeScript", icon: "📘", level: 85, color: "#3178C6" },
    { name: "Tailwind", icon: "🎨", level: 94, color: "#06B6D4" },
    { name: "MongoDB", icon: "🍃", level: 82, color: "#47A248" },
    { name: "Python", icon: "🐍", level: 78, color: "#3776AB" },
    { name: "AWS", icon: "☁️", level: 80, color: "#FF9900" },
    { name: "GraphQL", icon: "📊", level: 75, color: "#E535AB" },
  ];

  return (
    <section ref={ref} className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E40AF' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "30px",
        }}
      />

      {/* Animated blur blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{ x: [0, 70, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-100/20 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-blue-400/30 backdrop-blur-sm"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
            animate={{
              x: [0, 20, -15, 0],
              y: [0, -30, 15, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Section Header – fully responsive text */}
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#1E40AF]/10 border border-[#1E40AF]/20 mb-5 sm:mb-6"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#1E40AF] animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-[#1E40AF]">Our Capabilities</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4"
        >
          Engineering{" "}
          <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
            Excellence
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-16 sm:w-20 h-1 mx-auto bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] rounded-full"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-500 mt-5 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base px-2"
        >
          End‑to‑end solutions crafted with modern stacks, design precision, and enterprise‑grade reliability.
        </motion.p>
      </div>

      {/* Bento Grid – responsive gaps & auto-rows */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 auto-rows-min">
          {services.map((service, idx) => (
            <ServicePanel key={idx} service={service} index={idx} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="relative z-10 text-center mt-12 sm:mt-16"
      >
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white border border-gray-200 shadow-sm text-gray-700 font-medium text-sm sm:text-base hover:shadow-md hover:border-[#1E40AF]/30 transition-all duration-300 mb-6 sm:mb-9"
        >
          Let’s discuss your project <FaRocket className="text-[#1E40AF] text-xs sm:text-sm" />
        </a>
      </motion.div>

      <TechStack items={techStack} speed={50} direction="left"  />
    </section>
  );
};

export default ServiceSection;