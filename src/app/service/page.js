"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useAnimationFrame } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Globe,
  Sparkles,
  Cloud,
  Smartphone,
  PenTool,
  ShoppingBag,
  Cpu,
  Rocket,
  Layers,
  Users,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  Code,
  Database,
  Layout,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import TechStack from "../Components/TechStack";

const ServicesPage = () => {
  const { scrollYProgress } = useScroll();
  const processSectionRef = useRef(null);
  const isProcessInView = useInView(processSectionRef, { once: true, amount: 0.3 });
  const processProgress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 100,
    });
  }, []);

  // Scrollable Tech Stack Data
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

  // Process Steps
  const processSteps = [
    { icon: <Sparkles size={28} />, title: "Discovery", description: "We dive deep into your vision, goals, and requirements." },
    { icon: <PenTool size={28} />, title: "Strategy", description: "Crafting a roadmap with wireframes and architecture." },
    { icon: <Code size={28} />, title: "Development", description: "Agile sprints, weekly builds, and continuous feedback." },
    { icon: <Rocket size={28} />, title: "Launch", description: "Deployment, QA, and a seamless go-live process." },
    { icon: <Shield size={28} />, title: "Evolution", description: "Iterative improvements and long-term support." },
  ];

  // Why Choose Us - Split Layout Features
  const features = [
    { icon: <Zap size={24} />, title: "Lightning Fast", description: "Optimized for performance & Core Web Vitals." },
    { icon: <Shield size={24} />, title: "Enterprise Security", description: "Bank-grade encryption & data protection." },
    { icon: <Users size={24} />, title: "Dedicated Team", description: "Direct access to senior engineers & designers." },
    { icon: <Globe size={24} />, title: "Global Standards", description: "WCAG, PWA, and international compliance." },
  ];

  // Bento Grid Services Data
  const bentoServices = {
    large: {
      title: "Full‑Stack Engineering",
      description: "End-to-end web applications with React, Next.js, Node.js, and cloud infrastructure. Scalable, secure, and future-proof.",
      icon: <Globe size={40} />,
      gradient: "from-blue-500 to-indigo-500",
      metrics: ["99.9% Uptime", "< 1s Load Time", "50k+ Users"],
    },
    medium: [
      {
        title: "AI & Intelligence",
        description: "Integrate LLMs, CV, and predictive analytics into your workflows.",
        icon: <Cpu size={32} />,
        gradient: "from-purple-400 to-blue-500",
      },
      {
        title: "Cloud & DevOps",
        description: "AWS, Azure, CI/CD pipelines, and infrastructure as code.",
        icon: <Cloud size={32} />,
        gradient: "from-cyan-400 to-blue-500",
      },
    ],
    small: [
      { title: "Mobile Experiences", description: "React Native, Flutter, iOS/Android.", icon: <Smartphone size={28} /> },
      { title: "UI/UX Design", description: "Human-centric, award-winning interfaces.", icon: <PenTool size={28} /> },
      { title: "E‑Commerce", description: "Shopify, Stripe, headless commerce.", icon: <ShoppingBag size={28} /> },
      { title: "Maintenance", description: "24/7 monitoring & instant support.", icon: <Shield size={28} /> },
    ],
  };

  

  return (
    <>
      <Head>
        <title>Abhi Services | Premium Digital Solutions</title>
        <meta
          name="description"
          content="Premium web development, AI integration, cloud solutions, and design by Abhi Services. Built for scale, performance, and elegance."
        />
      </Head>

      <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
        {/* Background Grid & Blur Blobs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-blue-100/40 blur-[120px]" />
          <div className="absolute bottom-[-30%] right-[-20%] w-[70%] h-[70%] rounded-full bg-blue-200/30 blur-[120px]" />
          <div className="absolute top-[40%] right-[10%] w-[50%] h-[50%] bg-indigo-100/30 blur-[100px]" />
        </div>

        <div className="relative z-10">
          {/* HERO SECTION - Premium Upgrade */}
          <section className="relative min-h-[85vh] flex items-center justify-center px-6 pt-24 md:pt-32">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-blue-200/50 shadow-sm mb-8">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse" />
                  <span className="text-sm font-medium text-blue-900/80 tracking-wide">Our Services</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
                  <span className="bg-gradient-to-r from-[#1E40AF] via-[#1E3A8A] to-[#60A5FA] bg-clip-text text-transparent">
                    Digital products
                  </span>
                  <br />
                  <span>that define the future</span>
                </h1>

              {/* CSS animations - add once in component */}
<style>{`
  @keyframes marquee-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes marquee-right {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  .animate-marquee-left {
    animation: marquee-left 20s linear infinite;
  }
  .animate-marquee-right {
    animation: marquee-right 20s linear infinite;
  }
`}</style>

<div className="max-w-4xl mx-auto mb-10 overflow-hidden">
  {/* Upper line - first half, moves left */}
  <div className="whitespace-nowrap overflow-hidden">
    <div className="inline-block animate-marquee-left">
      <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-500 font-light mx-4">
        We build exceptional software, AI-driven platforms,
      </span>
      <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-500 font-light mx-4">
        We build exceptional software, AI-driven platforms,
      </span>
    </div>
  </div>

  {/* Lower line - second half, moves right */}
  <div className="whitespace-nowrap overflow-hidden mt-2">
    <div className="inline-block animate-marquee-right">
      <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-500 font-light mx-4">
        and seamless experiences for global brands and ambitious startups.
      </span>
      <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-500 font-light mx-4">
        and seamless experiences for global brands and ambitious startups.
      </span>
    </div>
  </div>
</div>
                <div className="flex flex-wrap gap-5 justify-center">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative px-8 py-4 bg-[#1E40AF] text-white rounded-full font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2"
                    >
                      Start your project
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-white/90 transition-all"
                    >
                      Let&apos;s talk
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* BENTO LAYOUT SERVICES - Full Replacement */}
          <section className="py-20 md:py-28 px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Crafted with precision
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Everything you need to scale — from ideation to infinite growth.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-min">
              {/* Large Panel */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="md:col-span-2 md:row-span-2 group relative backdrop-blur-md bg-white/60 border border-blue-100/40 rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 p-8 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-100/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-2">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E40AF] to-[#60A5FA] text-white flex items-center justify-center mb-6">
                    {bentoServices.large.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-3">{bentoServices.large.title}</h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">{bentoServices.large.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {bentoServices.large.metrics.map((metric, idx) => (
                      <span key={idx} className="text-sm bg-white/70 px-3 py-1 rounded-full border border-gray-200 text-gray-700">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-60 h-60 rounded-full bg-blue-200/20 blur-3xl group-hover:bg-blue-300/30 transition-all" />
              </motion.div>

              {/* Medium Panels */}
              {bentoServices.medium.map((service, idx) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="md:col-span-1 group relative backdrop-blur-md bg-white/60 border border-blue-100/40 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-blue-600 mb-4">{service.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h4>
                  <p className="text-gray-500 text-sm">{service.description}</p>
                  <div className="mt-4 h-0.5 w-12 bg-gradient-to-r from-blue-400 to-transparent group-hover:w-full transition-all duration-500" />
                </motion.div>
              ))}

              {/* Small Panels */}
              {bentoServices.small.map((service, idx) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="md:col-span-1 group relative backdrop-blur-sm bg-white/50 border border-blue-100/30 rounded-2xl p-5 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-blue-500">{service.icon}</div>
                    <div>
                      <h5 className="font-semibold text-gray-800">{service.title}</h5>
                      <p className="text-xs text-gray-500">{service.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* SCROLLABLE TECH STRIP */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50/30 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-center mb-12"
    >
       <h2 className="text-3xl font-bold text-gray-900">Modern stack, future‑ready</h2>
      <p className="text-gray-500 mt-2">Continuously evolving, always cutting‑edge</p>
    </motion.div>

    <div className="relative w-full overflow-hidden">
      {/* Main Carousel - Draggable & Auto-rotating */}
      <TechStack items={techStack} speed={50} direction="left" />
    </div>
  </div>
</section>

          {/* PROCESS - TIMELINE WITH GLOWING LINE */}
          <section ref={processSectionRef} className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">A process you can trust</h2>
              <p className="text-gray-500 mt-2">Transparent, agile, and driven by results.</p>
            </div>

            <div className="relative">
              {/* Timeline Progress Line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 rounded-full hidden md:block -translate-y-1/2" />
              <motion.div
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] rounded-full hidden md:block -translate-y-1/2"
                style={{ width: useTransform(processProgress, (value) => `${value * 100}%`) }}
              />

              <div className="flex flex-col md:flex-row justify-between gap-8 relative">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="flex-1 flex flex-col items-center text-center relative z-10"
                  >
                    <div className="w-14 h-14 rounded-full bg-white border-4 border-[#1E40AF] shadow-md flex items-center justify-center text-[#1E40AF] mb-5">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm max-w-[200px]">{step.description}</p>
                    {i < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gray-200 -z-10" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* WHY CHOOSE US - SPLIT LAYOUT */}
          <section className="py-20 px-6 bg-white/40 backdrop-blur-sm border-y border-blue-100/50">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-sm font-semibold text-[#1E40AF] tracking-wide uppercase">Why us</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 leading-tight">
                  Engineering excellence, <br />human-centered.
                </h2>
                <p className="text-gray-500 text-lg mt-6 leading-relaxed">
                  We don’t just write code — we build partnerships. Every project is backed by a culture of design, performance, and proactive support.
                </p>
                <div className="mt-8 flex gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 border-2 border-white" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">+15 enterprise clients, 98% retention rate</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {features.map((feat, idx) => (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/70 backdrop-blur-sm border border-blue-100/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E40AF] flex items-center justify-center mb-4">
                      {feat.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">{feat.title}</h4>
                    <p className="text-gray-500 text-sm mt-1">{feat.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* PREMIUM CTA SECTION */}
          <section className="py-28 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-blue-100/40" />
            <div className="relative max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl shadow-2xl p-8 md:p-12 text-center relative overflow-hidden"
              >
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl" />

                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
                  Ready to build something <br />
                  <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">extraordinary?</span>
                </h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
                  Let’s turn your vision into a scalable, high‑impact digital product. One conversation changes everything.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative px-10 py-4 bg-[#1E40AF] text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Start a project <Sparkles size={18} />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#60A5FA] to-[#1E3A8A]"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.button>
                  </Link>
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-white/90 backdrop-blur border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-white transition"
                    >
                      Schedule a call
                    </motion.button>
                  </Link>
                </div>

                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/60"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, Math.random() * 30 - 15, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </section>

          {/* Footer-like minimalism */}
          <footer className="border-t border-gray-100 py-8 text-center text-gray-400 text-sm">
            <p>© 2025 Abhi Services — Precision engineering for the modern web.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

const MarqueeLine = ({ children, direction = "left", speed = 20, className = "" }) => {
  const x = useMotionValue(0);
  const contentWidth = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // measure width of a single copy
    const singleWidth = containerRef.current.children[0].getBoundingClientRect().width;
    contentWidth.current = singleWidth;
  }, [children]);

  useAnimationFrame((t, delta) => {
    if (!contentWidth.current) return;
    const step = (speed * delta) / 1000;
    let newX = x.get() + (direction === "left" ? -step : step);
    // wrap using modulo on one copy width (for 3 copies)
    const wrapWidth = contentWidth.current;
    if (direction === "left") {
      if (newX <= -wrapWidth) newX += wrapWidth;
      if (newX > 0) newX -= wrapWidth;
    } else {
      if (newX >= wrapWidth) newX -= wrapWidth;
      if (newX < 0) newX += wrapWidth;
    }
    x.set(newX);
  });

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        ref={containerRef}
        className="flex whitespace-nowrap"
        style={{ x }}
      >
        <div className="flex-shrink-0">{children}</div>
        <div className="flex-shrink-0">{children}</div>
        <div className="flex-shrink-0">{children}</div>
      </motion.div>
    </div>
  );
};

export default ServicesPage;