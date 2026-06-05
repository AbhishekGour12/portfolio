"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { FaChartLine, FaShieldAlt, FaRocket } from "react-icons/fa";
import { Cpu, Zap, Layout, Sparkles } from "lucide-react";
import Image from "next/image";

// ========== Custom lightweight useInView hook ==========
const useInView = (ref, options = {}) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options.once) {
            observer.unobserve(el);
          }
        } else if (!options.once) {
          setIsInView(false);
        }
      },
      {
        rootMargin: options.margin || "0px",
        threshold: options.threshold || 0,
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [ref, options.margin, options.threshold, options.once]);

  return isInView;
};


// ========== Animated Counter ==========
const AnimatedCounter = ({ target, suffix = "", duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref} className="font-bold text-gray-900">{count}{suffix}</span>;
};

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
    image: "/e-learning.webp",
  },
  {
    title: "SaaS Products",
    description: "Subscription‑ready, multi‑tenant cloud applications.",
    image: "/saas.webp",
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
    image: "/foodwebsite.webp",
  },
];

// ========== PURE CSS VERTICAL CAROUSEL (GPU-accelerated) ==========
// ========== PURE CSS VERTICAL CAROUSEL (FIXED INFINITE LOOP) ==========
const VerticalCarousel = React.memo(() => {
  const trackRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Measure height of ONE SET of items (the original list)
  const measureSetHeight = useCallback(() => {
    if (!trackRef.current) return;
    // We need the height of the first N items (expertiseItems length)
    const items = trackRef.current.querySelectorAll(".carousel-item");
    const n = expertiseItems.length;
    if (items.length < n * 2) return; // we have two copies

    let totalHeight = 0;
    const gap = parseFloat(getComputedStyle(trackRef.current).gap) || 0;
    for (let i = 0; i < n; i++) {
      totalHeight += items[i].getBoundingClientRect().height;
    }
    // Add gaps between items (n gaps, including after last to next set)
    totalHeight += gap * n;

    // Speed: 25px per second (smooth and not too fast)
    const durationSec = totalHeight / 25;
    setAnimationDuration(durationSec);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    measureSetHeight();
    window.addEventListener("resize", measureSetHeight);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", measureSetHeight);
    };
  }, [measureSetHeight]);

  // Two copies for seamless loop (move by -50%)
  const doubled = [...expertiseItems, ...expertiseItems];

  return (
    <div className="relative overflow-hidden h-[360px] xs:h-[400px] sm:h-[480px] md:h-[540px]">
      {/* Gradient fade masks */}
      <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-white/80 to-transparent z-10 pointer-events-none rounded-t-3xl" />
      <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white/80 to-transparent z-10 pointer-events-none rounded-b-3xl" />

      {/* Track with CSS infinite scroll */}
      <div
        ref={trackRef}
        className="flex flex-col gap-3 will-change-transform"
        style={{
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          animation: animationDuration > 0 ? `scrollUp ${animationDuration}s linear infinite` : "none",
        }}
      >
        {doubled.map((item, idx) => (
          <div
            key={`${item.title}-${idx}`}
            className="carousel-item group bg-white/80 border border-white/50 rounded-2xl shadow-md overflow-hidden shrink-0"
            style={{
              height: isMobile ? "clamp(85px, 18vw, 100px)" : "clamp(90px, 20vw, 110px)",
              backdropFilter: isMobile ? "none" : "blur(8px)",
              WebkitBackdropFilter: isMobile ? "none" : "blur(8px)",
            }}
          >
            <div className="flex flex-row h-full">
              <div className="w-1/3 relative overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={120}
                  height={110}
                  className="object-cover w-full h-full"
                  priority={idx < 2}
                  loading={idx >= 2 ? "lazy" : undefined}
                  sizes="(max-width: 480px) 80px, 120px"
                  quality={75}
                />
              </div>
              <div className="w-2/3 p-2 xs:p-3 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs xs:text-sm font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                  <p className="text-[10px] xs:text-xs text-gray-500 mt-0.5 xs:mt-1 line-clamp-2 leading-snug">
                    {item.description}
                  </p>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-blue-600 text-[10px] xs:text-xs font-medium inline-flex items-center gap-1">
                    Explore <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scrollUp {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, -50%, 0);
          }
        }
        @media (hover: hover) and (min-width: 768px) {
          .vc-track:hover {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  );
});
VerticalCarousel.displayName = "VerticalCarousel";

// ========== HERO SECTION (optimized for mobile) ==========
const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const statsData = [
    { icon: FaChartLine, label: "Retention", value: 98, suffix: "%" },
    { icon: FaShieldAlt, label: "Success Rate", value: 99, suffix: "%" },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradientShift 6s ease infinite;
        }
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translate3d(0, 15px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-fade-slide-up {
          opacity: 0;
          animation: fadeSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes rightPanelFade {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-right-panel {
          opacity: 0;
          animation: rightPanelFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 200ms;
        }
        @keyframes floatBlob1 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(30px, 20px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes floatBlob2 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-20px, -20px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .float-blob-1 {
          animation: floatBlob1 20s ease-in-out infinite;
        }
        .float-blob-2 {
          animation: floatBlob2 24s ease-in-out infinite;
        }
        @media (max-width: 640px) {
          .carousel-item {
            backdrop-filter: blur(4px);
          }
          .hero-panel {
            backdrop-filter: blur(4px);
          }
        }
      `}</style>

      {/* Background layers (lighter on mobile) */}
      <Image
        src="/hero_bg.webp"
        alt="Abhi Services hero background"
        fill
        priority
        quality={60}
        sizes="100vw"
        fetchPriority="high"
        className="object-cover z-0 pointer-events-none opacity-20 sm:opacity-30"
        style={{ objectPosition: 'center' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
      <div className="absolute top-0 right-0 bottom-0 w-full sm:w-1/2 bg-gradient-to-l from-[#60A5FA]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-[#60A5FA]/10 rounded-full blur-2xl sm:blur-3xl pointer-events-none" />

      {/* Subtle grid (reduce opacity on mobile) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.008] z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10h40M10 0v40' stroke='%231E40AF' stroke-width='0.4' fill='none' /%3E%3C/svg%3E")` }} />

      {/* Floating blobs (reduced motion on mobile) */}
      {isClient && !isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -right-20 w-72 h-72 bg-blue-300/8 rounded-full blur-3xl float-blob-1" />
          <div className="absolute -bottom-32 -left-20 w-72 h-72 bg-indigo-200/8 rounded-full blur-3xl float-blob-2" />
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-10 py-8 xs:py-10 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 xs:gap-10 lg:gap-16 items-center">

          {/* Left column */}
          <div className="space-y-5 xs:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3.5 py-1.5 border border-blue-100 shadow-sm mx-auto lg:mx-0 w-fit animate-fade-slide-up" style={{ animationDelay: "50ms" }}>
              <Sparkles className="w-3.5 h-3.5 text-[#1E40AF]" />
              <span className="text-xs sm:text-sm font-medium text-[#1E3A8A]">AI-Powered Digital Solutions</span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.2] xs:leading-[1.15] animate-fade-slide-up" style={{ animationDelay: "110ms" }}>
              We Build Scalable Websites,<br className="max-xs:hidden" />
              <span className="bg-gradient-to-r from-[#1E40AF] via-[#4338CA] to-[#60A5FA] bg-clip-text text-transparent animate-gradient-text block mt-1">
                SaaS Platforms & AI Solutions
              </span>
            </h1>

            <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start animate-fade-slide-up" style={{ animationDelay: "170ms" }}>
              <div className="inline-flex flex-wrap gap-1.5 items-center text-[10px] sm:text-xs font-mono font-semibold text-[#1E40AF] bg-blue-50/60 px-2.5 py-1 rounded-full justify-center">
                <Cpu className="w-2.5 h-2.5" /> AI
                <span className="text-gray-300">•</span>
                <Zap className="w-2.5 h-2.5" /> SaaS
                <span className="text-gray-300">•</span>
                <Layout className="w-2.5 h-2.5" /> Automation
                <span className="text-gray-300 max-xs:hidden">•</span>
                <span className="max-xs:mt-0.5">Scalable Systems</span>
              </div>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-md leading-relaxed mx-auto lg:mx-0 max-md:backdrop-blur-sm rounded-xl max-md:bg-white/40 max-md:p-3 max-md:border max-md:border-white/40 animate-fade-slide-up" style={{ animationDelay: "230ms" }}>
              We help startups, businesses, and growing brands build modern web applications, AI-powered systems, scalable SaaS products, and high-performance digital experiences.
            </p>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start max-xs:px-2 animate-fade-slide-up" style={{ animationDelay: "290ms" }}>
              {["AI Integrations", "Smart Automation", "Scalable Architecture", "Enterprise UI/UX"].map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm border border-gray-200/80 text-gray-700 shadow-sm hover:border-blue-300 transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col xs:flex-row gap-3 pt-1 justify-center lg:justify-start px-4 xs:px-0">
              <a
                href="/contact"
                className="group relative px-6 py-3 rounded-xl font-semibold text-sm text-white overflow-hidden shadow-md text-center transform-gpu transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] animate-fade-slide-up"
                style={{ background: "linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)", animationDelay: "350ms" }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Project <FaRocket className="text-xs group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
              <Link href="/project" className="block animate-fade-slide-up" style={{ animationDelay: "350ms" }}>
                <button
                  className="px-6 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl font-semibold text-sm text-gray-700 hover:bg-white transition-all w-full xs:w-auto shadow-sm hover:shadow-md transform-gpu transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98]"
                >
                  View Work →
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="pt-3 flex gap-4 xs:gap-6 items-center justify-center lg:justify-start max-xs:border max-xs:border-gray-200/50 max-xs:backdrop-blur-sm max-xs:bg-white/40 rounded-xl p-3 mx-4 xs:mx-0 animate-fade-slide-up" style={{ animationDelay: "410ms" }}>
              {statsData.map((stat, idx) => (
                <StatsItem key={idx} icon={stat.icon} label={stat.label} value={stat.value} suffix={stat.suffix} />
              ))}
            </div>
          </div>

          {/* Right column – Carousel (GPU accelerated) */}
          <div className="relative flex justify-center mt-4 lg:mt-0 z-10 w-full max-w-sm xs:max-w-md lg:max-w-lg mx-auto px-2 xs:px-0 animate-right-panel">
            {/* Soft glow – hidden on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#60A5FA]/10 via-[#1E40AF]/5 to-transparent blur-2xl rounded-3xl pointer-events-none max-sm:hidden" />
            <div className="relative w-full backdrop-blur-md bg-white/60 border border-white/70 rounded-3xl shadow-xl p-2 sm:p-3 overflow-hidden z-10">
              <VerticalCarousel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;