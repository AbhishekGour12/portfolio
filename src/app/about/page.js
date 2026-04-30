"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import TechStack from "../Components/TechStack";
import { useInView } from "react-intersection-observer";

const About = () => {
  // All hooks must be called unconditionally at the top level
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const { scrollYProgress } = useScroll();
  const processProgress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  // ✅ Precompute the width MotionValue (no conditional hooks)
  const processWidth = useTransform(processProgress, (v) => `${v * 100}%`);
  
  const [particles, setParticles] = useState([]);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const newParticles = Array.from({ length: 8 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic", offset: 100 });
  }, []);

  // Stats data
  const stats = [
    { value: 20, label: "Projects Delivered", suffix: "+", icon: "🚀" },
    { value: 20, label: "Happy Clients", suffix: "+", icon: "😊" },
    { value: 5, label: "Years Experience", suffix: "+", icon: "⭐" },
    { value: 98, label: "Client Satisfaction", suffix: "%", icon: "💯" },
  ];

  // Services snapshot (horizontal scroll)
  const servicesSnapshot = [
    { title: "Web Development", description: "React, Next.js, scalable backends", icon: "🌐" },
    { title: "Mobile Apps", description: "React Native, Flutter, iOS/Android", icon: "📱" },
    { title: "AI Integration", description: "LLMs, computer vision, automation", icon: "🤖" },
    { title: "Cloud & DevOps", description: "AWS, Azure, CI/CD pipelines", icon: "☁️" },
    { title: "UI/UX Design", description: "User‑centric, award‑winning interfaces", icon: "🎨" },
    { title: "Digital Strategy", description: "Growth hacking, tech consulting", icon: "📊" },
  ];

  // Process steps (timeline)
  const processSteps = [
    { icon: "💡", title: "Discover", description: "We learn your goals & challenges." },
    { icon: "📐", title: "Plan", description: "Strategic roadmap & architecture." },
    { icon: "⚙️", title: "Build", description: "Agile development, weekly sprints." },
    { icon: "🚀", title: "Launch", description: "Deploy, test, go live." },
    { icon: "📈", title: "Grow", description: "Iterate, scale, support." },
  ];

  // Why choose us (floating cards)
  const whyChooseUs = [
    { title: "Expert Team", description: "Senior engineers & designers", icon: "👥" },
    { title: "Proven Track Record", description: "50+ successful projects", icon: "🏆" },
    { title: "Cutting‑Edge Tech", description: "Modern stack & best practices", icon: "⚡" },
    { title: "Client‑First", description: "Your success is our priority", icon: "🤝" },
  ];

  // Core values (new section)
  const coreValues = [
    { title: "Innovation", description: "We embrace new technologies to stay ahead.", icon: "💡" },
    { title: "Quality", description: "Pixel-perfect, robust, and scalable code.", icon: "✨" },
    { title: "Transparency", description: "Clear communication, weekly updates.", icon: "🔍" },
    { title: "Collaboration", description: "We work as an extension of your team.", icon: "🤝" },
  ];

  // Team members
  const team = [
    { name: "Abhishek Gour", role: "Founder & Lead Developer", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Sumit Bangar", role: "Head of Design", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Rahul Verma", role: "AI/ML Engineer", image: "https://randomuser.me/api/portraits/men/46.jpg" },
    { name: "Shivani Gour", role: "Business Anaylist", image: "https://randomuser.me/api/portraits/women/68.jpg" },
  ];

  // Tech stack items for infinite marquee
  const techStackItems = [
    { name: "React", icon: "⚛️", level: 95, color: "#61DAFB" },
    { name: "Next.js", icon: "▲", level: 92, color: "#000000" },
    { name: "Node.js", icon: "🟢", level: 88, color: "#339933" },
    { name: "TypeScript", icon: "📘", level: 85, color: "#3178C6" },
    { name: "Tailwind", icon: "🎨", level: 94, color: "#06B6D4" },
    { name: "MongoDB", icon: "🍃", level: 82, color: "#47A248" },
    { name: "Python", icon: "🐍", level: 78, color: "#3776AB" },
    { name: "AWS", icon: "☁️", level: 80, color: "#FF9900" },
  ];

  return (
    <>
      <title>Abhi Services | About Us – Premium Digital Agency</title>
      <meta
        name="description"
        content="We build digital experiences that scale businesses. Meet our expert team, learn our story, and see why clients trust Abhi Services for cutting‑edge solutions."
      />

      <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
        {/* Background grid & blur blobs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-blue-100/40 blur-[120px]" />
          <div className="absolute bottom-[-30%] right-[-20%] w-[70%] h-[70%] rounded-full bg-blue-200/30 blur-[120px]" />
          <div className="absolute top-[40%] right-[10%] w-[50%] h-[50%] bg-indigo-100/30 blur-[100px]" />
        </div>

        <div className="relative z-10">
          {/* HERO SECTION - enhanced with floating icons and animated gradient */}
          <section className="relative py-20 px-6 md:px-12 lg:px-20 min-h-[90vh] flex items-center">
            <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-blue-200/50 shadow-sm mb-6">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse" />
                  <span className="text-sm font-medium text-blue-900/80 tracking-wide">About Us</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                  We build digital experiences that{" "}
                  <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent animate-pulse">
                    scale businesses
                  </span>
                </h1>
                <p className="text-lg text-gray-500 mt-6 leading-relaxed">
                  Abhi Services crafts high‑performance web apps, AI solutions, and
                  beautiful designs for startups and enterprises. Let’s turn your ideas
                  into reality.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 bg-[#1E40AF] text-white rounded-full font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition"
                    >
                      Start a project
                    </motion.button>
                  </Link>
                  <Link href="/services">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-white/90 transition"
                    >
                      Explore services
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-200/30 to-transparent rounded-full blur-2xl" />
                <Image
                  src="/about.png"
                  alt="Team collaboration"
                  width={500}
                  height={500}
                  className="relative w-full max-w-md mx-auto drop-shadow-2xl rounded-2xl"
                />
              </motion.div>
            </div>

            {/* Floating decorative icons (animated) */}
            <motion.div
              className="absolute top-20 left-10 text-4xl opacity-20 hidden lg:block"
              animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              ⚛️
            </motion.div>
            <motion.div
              className="absolute bottom-20 right-10 text-4xl opacity-20 hidden lg:block"
              animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              🚀
            </motion.div>
          </section>

          {/* STORY SECTION */}
          <section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-white to-blue-50/30">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                data-aos="fade-right"
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                  alt="Our team working"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
              <motion.div data-aos="fade-left" data-aos-delay="100">
                <span className="text-sm font-semibold text-[#1E40AF] tracking-wide uppercase">Our story</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                  Who we are & what drives us
                </h2>
                <p className="text-gray-600 text-lg mt-6 leading-relaxed">
                  Founded in 2025, Abhi Services began with a simple belief: technology
                  should empower people, not complicate their lives. We’re a tight‑knit
                  team of developers, designers, and strategists who are obsessed with
                  quality, performance, and user delight.
                </p>
                <p className="text-gray-600 text-lg mt-4 leading-relaxed">
                  Our mission is to help businesses navigate the digital landscape with
                  confidence. From early‑stage startups to established brands, we build
                  tailor‑made solutions that drive real growth.
                </p>
                <div className="mt-8 flex items-center gap-2 text-[#1E40AF] font-medium">
                  <span>✨ Craftsmanship meets innovation</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* STATS SECTION */}
          <section ref={statsRef} className="py-20 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Our impact in numbers
                </h2>
                <p className="text-gray-500 mt-2">Proof we deliver</p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="backdrop-blur-md bg-white/60 border border-blue-100/40 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <div className="text-3xl md:text-4xl font-bold text-[#1E40AF]">
                      {statsInView && <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CORE VALUES (new section) */}
          <section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-white to-blue-50/30">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our core values</h2>
                <p className="text-gray-500 mt-2">The principles that guide everything we do</p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreValues.map((value, idx) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="backdrop-blur-md bg-white/60 border border-blue-100/40 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="text-5xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800">{value.title}</h3>
                    <p className="text-gray-500 text-sm mt-2">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

       {/* SERVICES SNAPSHOT - Premium split layout (not simple grid) */}
<section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-white via-blue-50/20 to-white">
  <div className="max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left side - intro */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-sm font-semibold text-[#1E40AF] tracking-wide uppercase">Our expertise</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          What we excel at
        </h2>
        <p className="text-gray-500 mt-4 text-lg leading-relaxed">
          We combine deep technical knowledge with creative problem-solving.
        </p>
        <div className="mt-6 flex gap-2">
          <div className="w-12 h-1 bg-blue-500 rounded-full" />
          <div className="w-6 h-1 bg-blue-300 rounded-full" />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="text-3xl font-bold text-[#1E40AF]">20+</div>
          <div className="text-3xl font-bold text-[#1E40AF]">98%</div>
          <div className="text-sm text-gray-500">Technologies mastered</div>
          <div className="text-sm text-gray-500">Client retention</div>
        </div>
      </motion.div>

      {/* Right side - service cards with metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {servicesSnapshot.map((service, idx) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative bg-white/70 backdrop-blur-sm border border-blue-100/40 rounded-2xl p-5 hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition" />
            <div className="relative z-10">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{service.description}</p>
              <div className="mt-3 flex items-center gap-2 text-xs font-medium text-blue-600">
                <span className="opacity-0 group-hover:opacity-100 transition">→</span>
                <span className="bg-blue-50 px-2 py-0.5 rounded-full">
                  {idx === 0 && "30+ apps"}
                  {idx === 1 && "15+ apps"}
                  {idx === 2 && "10+ AI models"}
                  {idx === 3 && "50+ cloud deploys"}
                  {idx === 4 && "40+ designs"}
                  {idx === 5 && "20+ strategies"}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

        {/* PROCESS TIMELINE - Strict Grid, No Overlap */}
<section ref={processRef} className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-blue-50/30 via-white to-white pb-32">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <span className="text-sm font-semibold text-[#1E40AF] tracking-wide uppercase">How we work</span>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Our approach to excellence</h2>
      <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
        A transparent, agile process that turns ideas into impact.
      </p>
    </motion.div>

    {/* Desktop: 5-column grid */}
    <div className="hidden md:block relative mt-12">
      {/* Horizontal timeline line (middle) */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 rounded-full -translate-y-1/2 z-0" />
      <motion.div
        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] rounded-full -translate-y-1/2 z-0"
        style={{ width: processInView ? processWidth : "0%" }}
      />

      {/* Grid: 5 equal columns */}
      <div className="grid grid-cols-5 gap-6 relative z-10">
        {processSteps.map((step, i) => {
          // Cards above line on even indices (0,2,4), below on odd (1,3)
          const isAbove = i % 2 === 0;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: isAbove ? 30 : -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Card – positioned above or below using margin */}
              <div
                className={`w-56 bg-white/80 backdrop-blur-md border border-blue-100/50 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 text-center ${
                  isAbove ? "mb-8" : "mt-8 order-2"
                }`}
              >
                <div className="text-3xl mb-2">{step.icon}</div>
                <h3 className="font-bold text-gray-800">{step.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
              </div>

              {/* Dot – exactly on the center line */}
              <div className="w-4 h-4 rounded-full bg-white border-2 border-[#1E40AF] shadow-md z-20" />

              {/* Empty spacer for odd indices? No – the card switch order already handles it.
                  We add an invisible element for odd indices to keep column height balanced */}
              {!isAbove && <div className="mt-8 invisible" />}
            </motion.div>
          );
        })}
      </div>
    </div>

    {/* Mobile & Tablet: vertical timeline */}
    <div className="md:hidden relative mt-8">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
      <div className="space-y-12">
        {processSteps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-14"
          >
            <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-2 border-[#1E40AF] flex items-center justify-center text-xl z-10">
              {step.icon}
            </div>
            <div className="bg-white/70 backdrop-blur-sm border border-blue-100/40 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

          {/* WHY CHOOSE US */}
          <section className="py-20 px-6 md:px-12 lg:px-20 ">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="sticky top-24"
                >
                  <span className="text-sm font-semibold text-[#1E40AF] tracking-wide uppercase">Why us</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                    Built differently,
                    <br />for lasting impact
                  </h2>
                  <p className="text-gray-500 mt-4">
                    We combine deep technical expertise with a genuine passion for your success.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {whyChooseUs.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="backdrop-blur-md bg-white/60 border border-blue-100/40 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all"
                    >
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        {/* TEAM SECTION – with avatar placeholders (no images) */}
<section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-white to-blue-50/30">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Meet the minds behind the magic</h2>
      <p className="text-gray-500 mt-2">Passionate experts dedicated to your success</p>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {team.map((member, idx) => {
        // Get initials from name
        const initials = member.name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);

        return (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative backdrop-blur-md bg-white/60 border border-blue-100/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
          >
            {/* Avatar Placeholder – Gradient Circle with Initials */}
            <div className="relative h-64 flex items-center justify-center bg-gradient-to-br from-[#1E40AF] to-[#60A5FA]">
              {/* Decorative blurred circle behind */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
              <div className="relative z-10 w-28 h-28 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/40 shadow-xl">
                <span className="text-4xl font-bold text-white drop-shadow-md">
                  {initials}
                </span>
              </div>
            </div>

            {/* Member Info */}
            <div className="p-5 text-center">
              <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
              <p className="text-[#1E40AF] font-medium text-sm">{member.role}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

          {/* TECH STACK */}
          <section className="py-16 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900">Modern stack, future‑ready</h2>
                <p className="text-gray-500 mt-2">Tools we love to build with</p>
              </motion.div>
              <TechStack items={techStackItems} speed={40} direction="left" />
            </div>
          </section>

          {/* CTA SECTION */}
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
                  Ready to build something{" "}
                  <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
                    extraordinary?
                  </span>
                </h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
                  Let’s turn your vision into a scalable, high‑impact digital product.
                  One conversation changes everything.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative px-10 py-4 bg-[#1E40AF] text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Start a project <span>✨</span>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#60A5FA] to-[#1E3A8A]"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.button>
                  </Link>
                  <Link href="/service">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-white/90 backdrop-blur border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-white transition"
                    >
                      Explore services
                    </motion.button>
                  </Link>
                </div>

                {/* Floating particles - client-side only */}
                {particles.map((part, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/60"
                    style={{
                      top: `${part.top}%`,
                      left: `${part.left}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, (Math.random() - 0.5) * 30, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: part.duration,
                      delay: part.delay,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-gray-100 py-8 text-center text-gray-400 text-sm">
            <p>© 2025 Abhi Services — Precision engineering for the modern web.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default About;