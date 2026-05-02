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
  Code,
  Database,
  Layout,
} from "lucide-react";
import TechStack from "../Components/TechStack";

const ServicesPage = () => {
  const { scrollYProgress } = useScroll();
  const processSectionRef = useRef(null);
  const processProgress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 100,
      disable: window.innerWidth < 768,
    });
  }, []);

  const techStack = [
    { name: "React", icon: <Code size={24} />, level: 95, color: "#61DAFB" },
    { name: "Next.js", icon: <Layout size={24} />, level: 92, color: "#000000" },
    { name: "Node.js", icon: <Database size={24} />, level: 88, color: "#339933" },
    { name: "TypeScript", icon: "📘", level: 85, color: "#3178C6" },
    { name: "Tailwind", icon: "🎨", level: 94, color: "#06B6D4" },
    { name: "MongoDB", icon: "🍃", level: 82, color: "#47A248" },
    { name: "Python", icon: "🐍", level: 78, color: "#3776AB" },
    { name: "AWS", icon: "☁️", level: 80, color: "#FF9900" },
    { name: "GraphQL", icon: "📊", level: 75, color: "#E535AB" },
  ];

  const processSteps = [
    { icon: <Sparkles size={20} />, title: "Discovery", description: "We dive deep into your vision, goals, and requirements." },
    { icon: <PenTool size={20} />, title: "Strategy", description: "Crafting a roadmap with wireframes and architecture." },
    { icon: <Code size={20} />, title: "Development", description: "Agile sprints, weekly builds, and continuous feedback." },
    { icon: <Rocket size={20} />, title: "Launch", description: "Deployment, QA, and a seamless go-live process." },
    { icon: <Shield size={20} />, title: "Evolution", description: "Iterative improvements and long-term support." },
  ];

  const features = [
    { icon: <Zap size={20} />, title: "Lightning Fast", description: "Optimized for performance & Core Web Vitals." },
    { icon: <Shield size={20} />, title: "Enterprise Security", description: "Bank-grade encryption & data protection." },
    { icon: <Users size={20} />, title: "Dedicated Team", description: "Direct access to senior engineers & designers." },
    { icon: <Globe size={20} />, title: "Global Standards", description: "WCAG, PWA, and international compliance." },
  ];

  const bentoServices = {
    large: {
      title: "Full‑Stack Engineering",
      description: "End-to-end web applications with React, Next.js, Node.js, and cloud infrastructure. Scalable, secure, and future-proof.",
      icon: <Globe size={32} />,
      metrics: ["99.9% Uptime", "< 1s Load Time", "50k+ Users"],
    },
    medium: [
      { title: "AI & Intelligence", description: "Integrate LLMs, CV, and predictive analytics.", icon: <Cpu size={24} /> },
      { title: "Cloud & DevOps", description: "AWS, Azure, CI/CD pipelines, infrastructure as code.", icon: <Cloud size={24} /> },
    ],
    small: [
      { title: "Mobile Experiences", description: "React Native, Flutter, iOS/Android.", icon: <Smartphone size={20} /> },
      { title: "UI/UX Design", description: "Human-centric, award-winning interfaces.", icon: <PenTool size={20} /> },
      { title: "E‑Commerce", description: "Shopify, Stripe, headless commerce.", icon: <ShoppingBag size={20} /> },
      { title: "Maintenance", description: "24/7 monitoring & instant support.", icon: <Shield size={20} /> },
    ],
  };

  return (
    <>
      <Head>
        <title>Abhi Services | Premium Digital Solutions</title>
        <meta name="description" content="Premium web development, AI integration, cloud solutions, and design by Abhi Services. Built for scale, performance, and elegance." />
      </Head>

      <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
        {/* Background blur blobs unchanged */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-blue-100/40 blur-[120px]" />
          <div className="absolute bottom-[-30%] right-[-20%] w-[70%] h-[70%] rounded-full bg-blue-200/30 blur-[120px]" />
          <div className="absolute top-[40%] right-[10%] w-[50%] h-[50%] bg-indigo-100/30 blur-[100px]" />
        </div>

        <div className="relative z-10">
          {/* HERO SECTION – reduced top padding on mobile */}
          <section className="relative min-h-[70vh] flex items-center justify-center px-4 pt-12 pb-8 sm:pt-20 sm:pb-12 md:pt-28 lg:pt-32">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-blue-200/50 shadow-sm mb-4 sm:mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-medium text-blue-900/80 tracking-wide">Our Services</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 leading-[1.2] mb-3 sm:mb-5">
                  <span className="bg-gradient-to-r from-[#1E40AF] via-[#1E3A8A] to-[#60A5FA] bg-clip-text text-transparent">
                    Digital products
                  </span>
                  <br />
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">that define the future</span>
                </h1>

                {/* Marquee – responsive font sizes */}
                <style>{`
                  @keyframes marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  @keyframes marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                  }
                  .animate-marquee-left { animation: marquee-left 20s linear infinite; }
                  .animate-marquee-right { animation: marquee-right 20s linear infinite; }
                  @media (max-width: 640px) {
                    .animate-marquee-left, .animate-marquee-right { animation-duration: 15s; }
                  }
                `}</style>

                <div className="max-w-4xl mx-auto mb-6 sm:mb-8 overflow-hidden">
                  <div className="whitespace-nowrap overflow-hidden">
                    <div className="inline-block animate-marquee-left">
                      <span className="text-xs sm:text-sm md:text-base text-gray-500 font-light mx-2 sm:mx-3">
                        We build exceptional software, AI-driven platforms,
                      </span>
                      <span className="text-xs sm:text-sm md:text-base text-gray-500 font-light mx-2 sm:mx-3">
                        We build exceptional software, AI-driven platforms,
                      </span>
                    </div>
                  </div>
                  <div className="whitespace-nowrap overflow-hidden mt-1">
                    <div className="inline-block animate-marquee-right">
                      <span className="text-xs sm:text-sm md:text-base text-gray-500 font-light mx-2 sm:mx-3">
                        and seamless experiences for global brands and ambitious startups.
                      </span>
                      <span className="text-xs sm:text-sm md:text-base text-gray-500 font-light mx-2 sm:mx-3">
                        and seamless experiences for global brands and ambitious startups.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative px-5 py-2.5 sm:px-6 sm:py-3 bg-[#1E40AF] text-white rounded-full font-medium shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm"
                    >
                      Start your project
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full text-gray-700 font-medium text-xs sm:text-sm"
                    >
                      Let&apos;s talk
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* BENTO SECTION – reduced top spacing */}
          <section className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Crafted with precision</h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">Everything you need to scale — from ideation to infinite growth.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-min">
              {/* Large panel */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="md:col-span-2 md:row-span-2 group backdrop-blur-md bg-white/60 border border-blue-100/40 rounded-2xl md:rounded-3xl shadow-md hover:shadow-xl transition-all p-5 md:p-6"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#1E40AF] to-[#60A5FA] text-white flex items-center justify-center mb-4">
                  {bentoServices.large.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{bentoServices.large.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">{bentoServices.large.description}</p>
                <div className="flex flex-wrap gap-2">
                  {bentoServices.large.metrics.map((metric, idx) => (
                    <span key={idx} className="text-xs bg-white/70 px-2 py-1 rounded-full border border-gray-200 text-gray-700">
                      {metric}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Medium panels */}
              {bentoServices.medium.map((service, idx) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group backdrop-blur-md bg-white/60 border border-blue-100/40 rounded-xl p-4 md:p-5"
                >
                  <div className="text-blue-600 mb-2">{service.icon}</div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">{service.title}</h4>
                  <p className="text-gray-500 text-xs">{service.description}</p>
                  <div className="mt-3 h-0.5 w-12 bg-gradient-to-r from-blue-400 to-transparent group-hover:w-full transition-all" />
                </motion.div>
              ))}

              {/* Small panels */}
              {bentoServices.small.map((service, idx) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="group backdrop-blur-sm bg-white/50 border border-blue-100/30 rounded-xl p-3 md:p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-blue-500 shrink-0">{service.icon}</div>
                    <div>
                      <h5 className="font-semibold text-gray-800 text-sm">{service.title}</h5>
                      <p className="text-[11px] text-gray-500">{service.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* TECH STACK SECTION – spacing reduced */}
          <section className="py-12 md:py-20 bg-gradient-to-b from-white to-blue-50/30 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8 md:mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Modern stack, future‑ready</h2>
                <p className="text-gray-500 text-sm mt-2">Continuously evolving, always cutting‑edge</p>
              </div>
              <div className="relative w-full overflow-hidden">
                <TechStack items={techStack} speed={50} direction="left" />
              </div>
            </div>
          </section>

          {/* PROCESS – responsive with smaller icons/text on mobile */}
          <section ref={processSectionRef} className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">A process you can trust</h2>
              <p className="text-gray-500 text-sm mt-2">Transparent, agile, and driven by results.</p>
            </div>
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 rounded-full hidden lg:block -translate-y-1/2" />
              <motion.div
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] rounded-full hidden lg:block -translate-y-1/2"
                style={{ width: useTransform(processProgress, (value) => `${value * 100}%`) }}
              />
              <div className="flex flex-col lg:flex-row justify-between gap-6 relative">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex-1 flex flex-col items-center text-center relative z-10"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-4 border-[#1E40AF] shadow-md flex items-center justify-center text-[#1E40AF] mb-3">
                      {step.icon}
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-500 text-[11px] sm:text-xs max-w-[150px]">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* WHY CHOOSE US – keep as is but smaller gap on mobile */}
          <section className="py-12 md:py-20 px-4 sm:px-6 bg-white/40 backdrop-blur-sm border-y border-blue-100/50">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xs font-semibold text-[#1E40AF] tracking-wide uppercase">Why us</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 leading-tight">
                  Engineering excellence, <br />human-centered.
                </h2>
                <p className="text-gray-500 text-sm sm:text-base mt-4 leading-relaxed">
                  We don’t just write code — we build partnerships. Every project is backed by a culture of design, performance, and proactive support.
                </p>
                <div className="mt-6 flex gap-3 items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 border-2 border-white" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-xs">+15 enterprise clients, 98% retention rate</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {features.map((feat, idx) => (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -3 }}
                    className="bg-white/70 backdrop-blur-sm border border-blue-100/50 rounded-xl p-3 sm:p-4"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-[#1E40AF] flex items-center justify-center mb-2">
                      {feat.icon}
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-800">{feat.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{feat.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA – responsive padding */}
          <section className="py-12 md:py-20 px-4 sm:px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-blue-100/40" />
            <div className="relative max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 text-center"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  Ready to build something <br />
                  <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
                    extraordinary?
                  </span>
                </h2>
                <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mb-6 sm:mb-8">
                  Let’s turn your vision into a scalable, high‑impact digital product. One conversation changes everything.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative px-5 py-2.5 sm:px-6 sm:py-3 bg-[#1E40AF] text-white rounded-full font-semibold shadow-md overflow-hidden group text-xs sm:text-sm"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Start a project <Sparkles size={14} />
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
                      className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white/90 backdrop-blur border border-gray-300 rounded-full text-gray-700 font-medium text-xs sm:text-sm"
                    >
                      Schedule a call
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          <footer className="border-t border-gray-100 py-6 text-center text-gray-400 text-xs ">
            <p>© 2026 Abhi Services — Precision engineering for the modern web.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;