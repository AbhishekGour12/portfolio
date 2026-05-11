"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useAnimationFrame } from "framer-motion";
import Link from "next/link";
import { FaCheckCircle, FaChartLine, FaRocket, FaShieldAlt, FaAward } from "react-icons/fa";
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
    <Icon className="text-[#1E40AF] text-lg" />
    <div>
      <AnimatedCounter target={value} suffix={suffix} />
      <span className="text-gray-900 text-sm ml-1">{label}</span>
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

const HeroSection = () => {
  const { scrollY } = useScroll();
  const rightCardY = useTransform(scrollY, [0, 500], [0, 40]);

  const statsData = [
  
    { icon: FaChartLine, label: "Retention", value: 98, suffix: "%" },
    { icon: FaShieldAlt, label: "Success Rate", value: 99, suffix: "%" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  // Particles (reduced opacity, soft glow)
  const [particles, setParticles] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const newParticles = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * 10,
      amplitudeX: 15 + Math.random() * 30,
      amplitudeY: 10 + Math.random() * 30,
      size: 1.5 + Math.random() * 4,
      opacity: 0.15 + Math.random() * 0.25,
      color: Math.random() > 0.6 ? "#60A5FA" : "#1E40AF",
    }));
    setParticles(newParticles);
  }, []);

  // ========== Enhanced Vertical Carousel (better card styling) ==========
  const VerticalCarousel = React.memo(({ items }) => {
    const [duplicatedItems, setDuplicatedItems] = useState([]);
    const containerRef = useRef(null);
    const y = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const autoScrollActive = useRef(true);
    const autoScrollTimeout = useRef(null);
    
    const ITEM_HEIGHT = 136; // px (height + gap)
    const singleSetHeight = items.length * ITEM_HEIGHT;

    useEffect(() => {
      setDuplicatedItems([...items, ...items, ...items]);
    }, [items]);

    useAnimationFrame((t, delta) => {
      if (!autoScrollActive.current || isHovered || isDragging) return;
      const step = (40 * delta) / 1000; // slightly faster for better flow
      let newY = y.get() - step;
      if (newY <= -singleSetHeight * 2) newY += singleSetHeight;
      else if (newY > 0) newY = -singleSetHeight;
      y.set(newY);
    });

    const handleWheel = (e) => {
      if (!autoScrollActive.current) return;
      autoScrollActive.current = false;
      if (autoScrollTimeout.current) clearTimeout(autoScrollTimeout.current);
      autoScrollTimeout.current = setTimeout(() => {
        autoScrollActive.current = true;
      }, 2000);
      let newY = y.get() + e.deltaY * 0.6;
      if (newY <= -singleSetHeight * 2) newY += singleSetHeight;
      else if (newY > 0) newY = -singleSetHeight;
      y.set(newY);
    };

    const handleDragStart = () => {
      setIsDragging(true);
      autoScrollActive.current = false;
      if (autoScrollTimeout.current) clearTimeout(autoScrollTimeout.current);
    };
    const handleDrag = (_, info) => {
      let newY = y.get() + info.delta.y;
      if (newY <= -singleSetHeight * 2) newY += singleSetHeight;
      else if (newY > 0) newY = -singleSetHeight;
      y.set(newY);
    };
    const handleDragEnd = () => {
      setIsDragging(false);
      autoScrollTimeout.current = setTimeout(() => {
        autoScrollActive.current = true;
      }, 2000);
    };

    return (
      <div
        className="relative overflow-hidden h-[450px] sm:h-[500px] md:h-[540px] cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        
        
      >
        <motion.div
          ref={containerRef}
          className="flex flex-col gap-5"
          style={{ y }}
          drag="y"
          dragElastic={0}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {duplicatedItems.map((item, idx) => (
            <motion.div
              key={`${item.title}-${idx}`}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="group bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-400 overflow-hidden h-[120px]"
            >
              <div className="flex flex-row h-full">
                <div className="w-1/3 overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={140}
                    height={120}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-gray-800 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <span className="text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Explore <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  });
  VerticalCarousel.displayName = "VerticalCarousel";

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      
      {/* ========== 1. BACKGROUND IMAGE (soft, cinematic) ========== */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/hero_bg.png')` }}
      />
      
      {/* ========== 2. LAYERED GRADIENT OVERLAY (left solid → right transparent) ========== */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      {/* Additional soft radial glow behind right content to separate carousel */}
      <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-l from-[#60A5FA]/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#60A5FA]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent" />
      
      {/* Very subtle noise texture for premium feel */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.015] mix-blend-multiply" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat" }} 
      />

      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradientShift 6s ease infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .shimmer-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(-100%) skewX(-15deg);
          pointer-events: none;
        }
        .group:hover .shimmer-effect {
          animation: shimmer 0.7s ease-in-out;
        }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 0 0 rgba(30, 64, 175, 0.3); }
          70% { box-shadow: 0 0 0 12px rgba(30, 64, 175, 0); }
          100% { box-shadow: 0 0 0 0 rgba(30, 64, 175, 0); }
        }
        .glow-ring {
          animation: glowPulse 2s infinite;
        }
        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -15px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .float-orb {
          animation: floatOrb 14s ease-in-out infinite;
        }
        @keyframes lightStreak {
          0% { transform: translateX(-100%); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateX(200%); opacity: 0; }
        }
        .light-streak {
          animation: lightStreak 8s infinite ease-in-out;
        }
      `}</style>

      {/* Grid pattern - extremely subtle */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10h40M10 0v40' stroke='%231E40AF' stroke-width='0.5' fill='none' /%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Animated floating blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute -top-40 -right-20 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-20 w-80 h-80 bg-indigo-200/15 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 26, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#60A5FA]/5 rounded-full blur-3xl" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-[20%] left-[15%] w-40 h-40 rounded-full bg-blue-500/5 blur-2xl float-orb pointer-events-none" />
      <div className="absolute bottom-[30%] right-[10%] w-56 h-56 rounded-full bg-indigo-400/5 blur-2xl float-orb pointer-events-none" style={{ animationDelay: "-5s" }} />

      {/* Light streaks */}
      <div className="absolute top-[10%] left-0 w-64 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/30 to-transparent light-streak pointer-events-none" />
      <div className="absolute bottom-[20%] right-0 w-96 h-px bg-gradient-to-r from-transparent via-[#1E40AF]/20 to-transparent light-streak pointer-events-none" style={{ animationDelay: "3s" }} />

      {/* Ambient particles */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
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

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24 xl:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* ========== LEFT COLUMN ========== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-7 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 border border-blue-100 shadow-sm mx-auto lg:mx-0 w-fit">
              <Sparkles className="w-4 h-4 text-[#1E40AF]" />
              <span className="text-sm font-medium text-[#1E3A8A]">AI-Powered Digital Solutions</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-bold tracking-tight text-gray-900 leading-[1.15]">
              We Build Scalable Websites, 
              <br />
              <span className="bg-gradient-to-r from-[#1E40AF] via-[#4338CA] to-[#60A5FA] bg-clip-text text-transparent animate-gradient-text">
                SaaS Platforms & AI Solutions
              </span>
            </motion.h1>

            {/* Tech tagline */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <div className="inline-flex gap-2 items-center text-xs font-mono font-semibold text-[#1E40AF] bg-blue-50/60 px-3 py-1.5 rounded-full">
                <Cpu className="w-3 h-3" /> AI
                <span className="text-gray-300">•</span>
                <Zap className="w-3 h-3" /> SaaS
                <span className="text-gray-300">•</span>
                <Layout className="w-3 h-3" /> Automation
                <span className="text-gray-300">•</span>
                Scalable Systems
              </div>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-gray-700 max-w-md leading-relaxed mx-auto lg:mx-0 max-md:backdrop-blur-xl  rounded-lg p-4 ">
             We help startups, businesses, and growing brands build modern web applications, AI-powered systems, scalable SaaS products, and high-performance digital experiences.
            </motion.p>

            {/* Trust Tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {["AI Integrations", "Smart Automation", "Scalable Architecture", "Enterprise UI/UX"].map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full  backdrop-blur-lg border border-gray-200/80 text-gray-700 shadow-sm hover:border-blue-300 transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-7 sm:px-9 py-3.5 rounded-xl font-semibold text-white overflow-hidden shadow-lg text-center"
                style={{ background: "linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)" }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Project <FaRocket className="text-sm group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="shimmer-effect" />
              </motion.a>

              <Link href="/project" className="block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-7 sm:px-9 py-3.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-white transition-all w-full sm:w-auto shadow-sm hover:shadow-md"
                >
                  View Work →
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="pt-5 flex flex-wrap gap-6 items-center justify-center lg:justify-start max-sm:border border-gray-200/60 max-sm:backdrop-blur-xl  rounded-lg p-4">
              {statsData.map((stat, idx) => (
                <StatsItem key={idx} icon={stat.icon} label={stat.label} value={stat.value} suffix={stat.suffix} />
              ))}
            </motion.div>
          </motion.div>

          {/* ========== RIGHT COLUMN – Vertical Carousel (elevated) ========== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ y: rightCardY }}
            className="relative flex justify-center mt-8 lg:mt-0 z-10"
          >
            {/* Glow behind carousel */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#60A5FA]/20 via-[#1E40AF]/10 to-transparent blur-2xl rounded-3xl" />
            
            {/* Glass container */}
            <div className="relative backdrop-blur-xl bg-white/70 border border-white/60 rounded-3xl shadow-2xl p-2 sm:p-3 overflow-hidden z-10 max-w-md lg:max-w-lg">
              <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-white/90 to-transparent rounded-t-3xl pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white/90 to-transparent rounded-b-3xl pointer-events-none z-10" />
              <VerticalCarousel items={expertiseItems} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-5 h-8 rounded-full border border-gray-300 bg-white/60 backdrop-blur-sm flex justify-center relative glow-ring">
          <motion.div
            className="w-1 h-2 bg-gradient-to-b from-[#1E40AF] to-[#1E3A8A] rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;