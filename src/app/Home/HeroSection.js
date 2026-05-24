"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { FaChartLine, FaShieldAlt, FaRocket } from "react-icons/fa";
import { Cpu, Zap, Layout, Sparkles } from "lucide-react";
import Image from "next/image";

// ========== Animated Counter Component ==========
const AnimatedCounter = ({ target, suffix = "", duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px", threshold: 0.1 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-bold text-gray-900">
      {count}
      {suffix}
    </span>
  );
};

// ========== Stats Item ==========
const StatsItem = ({ icon: Icon, label, value, suffix }) => (
  <div className="flex items-center gap-2">
    <Icon className="text-[#1E40AF] text-lg shrink-0" />
    <div className="whitespace-nowrap">
      <AnimatedCounter target={value} suffix={suffix} />
      <span className="text-gray-900 text-xs sm:text-sm ml-1">{label}</span>
    </div>
  </div>
);

const expertiseItems = [
  {
    title: "E‑Commerce Solutions",
    description: "Scalable, secure online stores with payment integrations.",
    image: "https://images.unsplash.com/photo-1657256031812-4702fe316f1b?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "E‑Learning Platforms",
    description: "Interactive LMS, video streaming, and certification systems.",
    image: "/e-learning.png",
  },
  {
    title: "SaaS Products",
    description: "Subscription‑ready, multi‑tenant cloud applications.",
    image: "/saas.png",
  },
  {
    title: "Dashboards & Admin Panels",
    description: "Real‑time analytics, user management, and control centers.",
    image: "/dashboard.png",
  },
  {
    title: "Custom Web Applications",
    description: "Tailored solutions for unique business workflows.",
    image: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "UI/UX Design",
    description: "User‑centric interfaces with high conversion rates.",
    image: "https://plus.unsplash.com/premium_photo-1661326291059-eb076cc5bdd6?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "SEO Optimization",
    description: "Technical SEO, content strategy, and ranking growth.",
    image: "https://plus.unsplash.com/premium_photo-1684356819471-5315622761c2?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "Food Delivery Websites",
    description: "Restaurant aggregators, order tracking, and payment gateways.",
    image: "/foodwebsite.png",
  },
];

// ========== OPTIMIZED VERTICAL CAROUSEL ==========
// Employs performance-first hardware-accelerated CSS keyframe animations
const VerticalCarousel = React.memo(({ items }) => {
  // Triple items list array to accommodate seamless wrap transitions
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden h-[360px] xs:h-[420px] sm:h-[500px] md:h-[540px]">
      <div className="flex flex-col gap-4 animate-[verticalScroll_25s_linear_infinite]">
        {duplicatedItems.map((item, idx) => (
          <div
            key={`${item.title}-${idx}`}
            className="group bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-md transition-all duration-300 overflow-hidden h-[110px] sm:h-[120px] shrink-0 transform-gpu will-change-transform"
          >
            <div className="flex flex-row h-full">
              <div className="w-1/3 overflow-hidden relative bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  // Performance: Preload early images to speed up visual paint rendering times
                  priority={idx < 2}
                  loading={idx >= 2 ? "lazy" : undefined}
                  sizes="(max-width: 480px) 90px, (max-width: 768px) 120px, 150px"
                  quality={65}
                />
              </div>
              <div className="w-2/3 p-3 sm:p-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs sm:text-base font-bold text-gray-800 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 line-clamp-2 leading-snug">
                    {item.description}
                  </p>
                </div>
                <div className="flex justify-end">
                  <span className="text-blue-600 text-xs sm:text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Explore <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
VerticalCarousel.displayName = "VerticalCarousel";

// ========== MAIN HERO SECTION ==========
const HeroSection = () => {
  const { scrollY } = useScroll();
  const rightCardY = useTransform(scrollY, [0, 500], [0, 30]);

  const statsData = [
    { icon: FaChartLine, label: "Retention", value: 98, suffix: "%" },
    { icon: FaShieldAlt, label: "Success Rate", value: 99, suffix: "%" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const [particles, setParticles] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Reduced particle count slightly for enhanced performance on low-end mobile devices
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
      amplitudeX: 10 + Math.random() * 20,
      amplitudeY: 10 + Math.random() * 20,
      size: 1.5 + Math.random() * 3,
      opacity: 0.15 + Math.random() * 0.2,
      color: Math.random() > 0.6 ? "#60A5FA" : "#1E40AF",
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white selection:bg-blue-500/20">
      {/* Dynamic Keyframe Injection for Global Micro-Animations */}
      <style jsx global>{`
        @keyframes verticalScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-33.3333% - 5.3px)); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradientShift 6s ease infinite;
        }
      `}</style>

      {/* Hero Background Elements */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: `url('/hero_bg.png')` }}
      />
      
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
      <div className="absolute top-0 right-0 bottom-0 w-full sm:w-1/2 bg-gradient-to-l from-[#60A5FA]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#60A5FA]/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Noise Texture optimized via CSS gradient definitions */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.012] mix-blend-multiply" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} 
      />

      {/* Structural SVG Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10h40M10 0v40' stroke='%231E40AF' stroke-width='0.5' fill='none' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Smooth Background Floating Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute -top-40 -right-20 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-20 w-72 h-72 bg-indigo-200/10 rounded-full blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
          transition={{ duration: 24, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Floating Particle Layers (Hydration Safe execution context) */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 max-sm:hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full transform-gpu"
              style={{
                left: `${particle.initialX}%`,
                top: `${particle.initialY}%`,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 1.2}px ${particle.color}`,
                opacity: particle.opacity,
              }}
              animate={{
                x: [0, particle.amplitudeX, -particle.amplitudeX * 0.5, 0],
                y: [0, -particle.amplitudeY, particle.amplitudeY * 0.6, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: "reverse",
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Core Adaptive Interface Frame */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-10 py-10 xs:py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 xs:gap-10 lg:gap-16 items-center">
          
          {/* Left Column Text Interface */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5 xs:space-y-6 text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3.5 py-1.5 border border-blue-100 shadow-sm mx-auto lg:mx-0 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#1E40AF]" />
              <span className="text-xs sm:text-sm font-medium text-[#1E3A8A]">AI-Powered Digital Solutions</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.2] xs:leading-[1.15]">
              We Build Scalable Websites, 
              <br className="max-xs:hidden" />
              <span className="bg-gradient-to-r from-[#1E40AF] via-[#4338CA] to-[#60A5FA] bg-clip-text text-transparent animate-gradient-text block mt-1">
                SaaS Platforms & AI Solutions
              </span>
            </motion.h1>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
              <div className="inline-flex flex-wrap gap-1.5 items-center text-[10px] sm:text-xs font-mono font-semibold text-[#1E40AF] bg-blue-50/60 px-2.5 py-1 rounded-full justify-center">
                <Cpu className="w-2.5 h-2.5" /> AI
                <span className="text-gray-300">•</span>
                <Zap className="w-2.5 h-2.5" /> SaaS
                <span className="text-gray-300">•</span>
                <Layout className="w-2.5 h-2.5" /> Automation
                <span className="text-gray-300 max-xs:hidden">•</span>
                <span className="max-xs:mt-0.5">Scalable Systems</span>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-gray-700 max-w-md leading-relaxed mx-auto lg:mx-0 max-md:backdrop-blur-md rounded-xl max-md:bg-white/40 max-md:p-3 max-md:border max-md:border-white/40">
              We help startups, businesses, and growing brands build modern web applications, AI-powered systems, scalable SaaS products, and high-performance digital experiences.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center lg:justify-start max-xs:px-2">
              {["AI Integrations", "Smart Automation", "Scalable Architecture", "Enterprise UI/UX"].map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-md border border-gray-200/80 text-gray-700 shadow-sm hover:border-blue-300 transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Action Callouts */}
            <motion.div variants={itemVariants} className="flex flex-col xs:flex-row gap-3 pt-1 justify-center lg:justify-start px-4 xs:px-0">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-6 py-3 rounded-xl font-semibold text-sm text-white overflow-hidden shadow-md text-center transform-gpu"
                style={{ background: "linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)" }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Project <FaRocket className="text-xs group-hover:translate-x-0.5 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_0.8s_ease-in-out_infinite] skew-x-12" />
              </motion.a>

              <Link href="/project" className="block">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl font-semibold text-sm text-gray-700 hover:bg-white transition-all w-full xs:w-auto shadow-sm hover:shadow-md transform-gpu"
                >
                  View Work →
                </motion.button>
              </Link>
            </motion.div>

            {/* Micro Stats Segment */}
            <motion.div variants={itemVariants} className="pt-3 flex gap-4 xs:gap-6 items-center justify-center lg:justify-start max-xs:border max-xs:border-gray-200/50 max-xs:backdrop-blur-md max-xs:bg-white/40 rounded-xl p-3 mx-4 xs:mx-0">
              {statsData.map((stat, idx) => (
                <StatsItem key={idx} icon={stat.icon} label={stat.label} value={stat.value} suffix={stat.suffix} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column Scrolling Showcase Frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ y: typeof window !== "undefined" && window.innerWidth > 1024 ? rightCardY : 0 }}
            className="relative flex justify-center mt-4 lg:mt-0 z-10 w-full max-w-sm xs:max-w-md lg:max-w-lg mx-auto px-2 xs:px-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#60A5FA]/15 via-[#1E40AF]/5 to-transparent blur-2xl rounded-3xl pointer-events-none" />
            <div className="relative w-full backdrop-blur-xl bg-white/60 border border-white/70 rounded-3xl shadow-xl p-2 sm:p-3 overflow-hidden z-10">
              {/* Fade masks for visual overlay edge-blending */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/90 via-white/40 to-transparent rounded-t-3xl pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/90 via-white/40 to-transparent rounded-b-3xl pointer-events-none z-10" />
              <VerticalCarousel items={expertiseItems} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;