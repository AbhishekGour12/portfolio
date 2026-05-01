"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, Variants, useMotionValue, useAnimationFrame } from "framer-motion";
import Link from "next/link";
import { FaCheckCircle, FaChartLine, FaRocket, FaShieldAlt, FaAward } from "react-icons/fa";
import Image from "next/image";

// ========== Animated Counter Component (better in‑view detection) ==========
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
      <span className="text-gray-500 text-sm ml-1">{label}</span>
    </div>
  </div>
);

const expertiseItems = [
  {
    title: "E‑Commerce Solutions",
    description: "Scalable, secure online stores with payment integrations.",
    image: "https://images.unsplash.com/photo-1657256031812-4702fe316f1b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGUlMjBjb21tZXJjZSUyMHdlYnNpdGV8ZW58MHx8MHx8fDA%3D",
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
    image: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMyfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "UI/UX Design",
    description: "User‑centric interfaces with high conversion rates.",
    image: "https://plus.unsplash.com/premium_photo-1661326291059-eb076cc5bdd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fHVpJTIwYW5kJTIwdXglMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "SEO Optimization",
    description: "Technical SEO, content strategy, and ranking growth.",
    image: "https://plus.unsplash.com/premium_photo-1684356819471-5315622761c2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHNlbyUyMG9wdGltaXphdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Food Delivery Websites",
    description: "Restaurant aggregators, order tracking, and payment gateways.",
    image: "/foodwebsite.png",
  },
];

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 120]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const rightCardY = useTransform(scrollY, [0, 500], [0, 40]);

  const statsData = [
    { icon: FaCheckCircle, label: "Projects Delivered", value: 20, suffix: "+" },
    { icon: FaChartLine, label: "Client Retention", value: 98, suffix: "%" },
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

  // Particles (client only)
  const [particles, setParticles] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const newParticles = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: 12 + Math.random() * 20,
      delay: Math.random() * 8,
      amplitudeX: 20 + Math.random() * 40,
      amplitudeY: 15 + Math.random() * 35,
      size: 2 + Math.random() * 4,
      opacity: 0.2 + Math.random() * 0.4,
    }));
    setParticles(newParticles);
  }, []);

  // ========== Improved Vertical Carousel (smooth, no breaks) ==========
  const VerticalCarousel = React.memo(({ items }) => {
    const [duplicatedItems, setDuplicatedItems] = useState([]);
    const containerRef = useRef(null);
    const y = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const autoScrollActive = useRef(true);
    const autoScrollTimeout = useRef(null);
    
    // Fixed item height (including gap) for consistent scrolling
    const ITEM_HEIGHT = 128; // px (h-28 = 112px + gap-4 = 16px)
    const singleSetHeight = items.length * ITEM_HEIGHT;
    const totalHeight = singleSetHeight * 3; // 3 copies

    useEffect(() => {
      setDuplicatedItems([...items, ...items, ...items]);
    }, [items]);

    // Auto-scroll animation
    useAnimationFrame((t, delta) => {
      if (!autoScrollActive.current || isHovered || isDragging) return;
      const step = (35 * delta) / 1000; // 35px per second (slightly slower, smoother)
      let newY = y.get() - step;
      // Seamless wrap within [-singleSetHeight*2, 0]
      if (newY <= -singleSetHeight * 2) {
        newY += singleSetHeight;
      } else if (newY > 0) {
        newY = -singleSetHeight;
      }
      y.set(newY);
    });

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleWheel = (e) => {
      if (!autoScrollActive.current) return;
      autoScrollActive.current = false;
      if (autoScrollTimeout.current) clearTimeout(autoScrollTimeout.current);
      autoScrollTimeout.current = setTimeout(() => {
        autoScrollActive.current = true;
      }, 2000);
      let newY = y.get() + e.deltaY * 0.8;
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
        className="relative overflow-hidden h-[420px] sm:h-[480px] md:h-[520px] cursor-grab active:cursor-grabbing"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
      >
        <motion.div
          ref={containerRef}
          className="flex flex-col gap-4"
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
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group bg-white/70 backdrop-blur-md border border-blue-100/50 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-28 sm:h-28 md:h-28"
            >
              <div className="flex flex-row h-full">
                <div className="w-1/3 overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={120}
                    height={112}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="eager"
                  />
                </div>
                <div className="w-2/3 p-3 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-gray-800 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <span className="text-blue-600 text-sm group-hover:translate-x-1 transition-transform">
                      →
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
    <section className="relative w-full overflow-hidden bg-white">
      {/* Global styles omitted for brevity (keep same as original) */}
      <style jsx global>{`
        /* Keep all animations from original (gradientShift, rotateBorder, shimmer, glowPulse, floatOrb) */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradientShift 6s ease infinite;
        }
        @keyframes rotateBorder {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .rotate-border {
          animation: rotateBorder 10s linear infinite;
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
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: translateX(-100%) skewX(-15deg);
          pointer-events: none;
        }
        .group:hover .shimmer-effect {
          animation: shimmer 0.7s ease-in-out;
        }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 0 0 rgba(30, 64, 175, 0.4); }
          70% { box-shadow: 0 0 0 12px rgba(30, 64, 175, 0); }
          100% { box-shadow: 0 0 0 0 rgba(30, 64, 175, 0); }
        }
        .glow-ring {
          animation: glowPulse 2s infinite;
        }
        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .float-orb {
          animation: floatOrb 12s ease-in-out infinite;
        }
      `}</style>

      {/* Grid pattern – same as original */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E40AF' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "30px",
        }}
      />

      {/* Animated Gradient Blobs – unchanged */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          animate={{ x: [0, 70, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/20 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute top-20 left-[10%] w-64 h-64 bg-indigo-200/10 rounded-full filter blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-blue-100/5 to-transparent" />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-[15%] left-[5%] w-32 h-32 rounded-full bg-blue-400/5 blur-2xl float-orb pointer-events-none" />
      <div className="absolute bottom-[10%] right-[8%] w-48 h-48 rounded-full bg-indigo-300/5 blur-3xl float-orb pointer-events-none" style={{ animationDelay: "-5s" }} />

      {/* Particles – client only */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-blue-400/30 backdrop-blur-sm"
              style={{
                left: `${particle.initialX}%`,
                top: `${particle.initialY}%`,
                width: particle.size,
                height: particle.size,
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT COLUMN */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-4 py-1.5 border border-blue-100 shadow-md mx-auto lg:mx-0 w-fit">
              <FaAward className="text-[#1E40AF] text-sm" />
              <span className="text-sm font-semibold text-[#1E3A8A]">Trusted by Founders & Enterprises</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
              We Build Digital
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1E40AF] via-[#4338CA] to-[#1E3A8A] animate-gradient-text">
                Products That Scale
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base sm:text-lg text-gray-500 max-w-md leading-relaxed mx-auto lg:mx-0">
              Enterprise-grade engineering for ambitious brands.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-6 sm:px-8 py-4 rounded-xl font-semibold text-white overflow-hidden shadow-xl text-center"
                style={{ background: "linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)" }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started <FaRocket className="text-sm group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="shimmer-effect" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF]"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.a>

              <Link href="/project" className="block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 sm:px-8 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl font-semibold text-gray-800 hover:bg-white/90 transition-all w-full sm:w-auto shadow-sm hover:shadow-md"
                >
                  View Work →
                </motion.button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-6 flex flex-wrap gap-6 items-center justify-center lg:justify-start border-t border-gray-100">
              {statsData.map((stat, idx) => (
                <StatsItem key={idx} icon={stat.icon} label={stat.label} value={stat.value} suffix={stat.suffix} />
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN – Vertical Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ y: rightCardY }}
            className="relative flex justify-center mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-3xl" />
              <div className="relative backdrop-blur-2xl bg-white/30 border border-white/80 rounded-3xl shadow-2xl p-3 sm:p-4 overflow-hidden z-10">
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/30 to-transparent rounded-t-3xl pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/30 to-transparent rounded-b-3xl pointer-events-none z-10" />
                <VerticalCarousel items={expertiseItems} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-5 h-8 rounded-full border-2 border-gray-300 flex justify-center relative glow-ring">
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