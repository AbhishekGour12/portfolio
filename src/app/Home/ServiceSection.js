"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaMobileAlt,
  FaPaintBrush,
  FaCloud,
  FaDatabase,
  FaChartLine,
  FaRocket,
  FaShieldAlt,
  FaRobot,
} from "react-icons/fa";
import TechStack from "../Components/TechStack";
import { Code, Database, Layout } from "lucide-react";

const services = [
  {
    icon: FaRocket,
    title: "Web Development",
    description: "Modern React, Next.js & MERN stack applications with blazing performance and scalable architecture.",
    tag: "Flagship Service",
    gradient: "from-[#1E40AF] to-[#1E3A8A]",
  },
  {
    icon: FaRobot,
    title: "AI Automation & Workflow",
    description: "We automate document processing, lead routing, and reporting to eliminate manual effort and scale your business with intelligence.",
    tag: "New Era",
    gradient: "from-[#1E3A8A] to-[#60A5FA]",
  },
  {
    icon: FaMobileAlt,
    title: "Mobile Apps",
    description: "Cross‑platform React Native apps with native feel, smooth animations, and high-performance UX.",
    tag: "iOS & Android",
    gradient: "from-[#1E40AF] to-[#60A5FA]",
  },
  {
    icon: FaPaintBrush,
    title: "UI/UX Design",
    description: "Beautiful, user‑centric interfaces backed by research and modern design principles.",
    tag: "Premium",
    gradient: "from-[#60A5FA] to-[#1E40AF]",
  },
  {
    icon: FaShieldAlt,
    title: "Security & Compliance",
    description: "Enterprise‑grade security, robust authentication, and total data protection for your peace of mind.",
    tag: "GDPR Ready",
    gradient: "from-[#1E3A8A] to-[#1E40AF]",
  },
];

const ServiceCard = ({ service, index, progress, range, targetScale }) => {
  const container = useRef(null);
  
  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, 0.8]);
  const blur = useTransform(progress, range, [0, 4]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          scale,
          filter: `blur(${blur}px)`,
          top: `calc(-5vh + ${index * 25}px)`,
        }}
        className="relative w-full max-w-[900px] h-[450px] md:h-[500px] bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row p-8 md:p-12 items-center gap-8 group"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-colors duration-700" />
        
        <div className="flex-1 z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
              <service.icon className="text-white text-2xl" />
            </div>
            {service.tag && (
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                {service.tag}
              </span>
            )}
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {service.title}
          </h3>
          <p className="text-gray-500 text-lg leading-relaxed max-w-md">
            {service.description}
          </p>
          
          <motion.button 
            whileHover={{ x: 5 }}
            className="mt-8 flex items-center gap-2 text-[#1E40AF] font-semibold"
          >
            Learn more <FaRocket className="text-sm" />
          </motion.button>
        </div>

        <div className="hidden md:flex flex-1 justify-center relative">
          <div className={`w-64 h-64 rounded-full bg-gradient-to-br ${service.gradient} opacity-5 blur-2xl absolute animate-pulse`} />
          <service.icon className="text-[12rem] text-gray-100/50 group-hover:text-blue-500/10 transition-colors duration-500" />
        </div>
      </motion.div>
    </div>
  );
};

const ServiceSection = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const techStack = [
    { name: "React", icon: <Code size={32} />, level: 95, color: "#61DAFB" },
    { name: "Next.js", icon: <Layout size={32} />, level: 92, color: "#000000" },
    { name: "Node.js", icon: <Database size={32} />, level: 88, color: "#339933" },
    { name: "AWS", icon: "☁️", level: 80, color: "#FF9900" },
  ];

  return (
    <section className="relative bg-[#F8FAFC]">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px]" />
      </div>

      {/* Header – compact spacing */}
      <div className="relative z-10 text-center pt-12 pb-8 px-6">
        <motion.span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-100">
          Our Capabilities
        </motion.span>
        <h2 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight">
          Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Excellence</span>
        </h2>
      </div>

      {/* The Sticky Stack Container – reduced bottom padding */}
      <div ref={container} className="relative px-6 pb-4">
        {services.map((service, i) => {
          const targetScale = 1 - ((services.length - i) * 0.05);
          return (
            <ServiceCard 
              key={i} 
              index={i} 
              service={service} 
              progress={scrollYProgress} 
              range={[i * 0.25, 1]} 
              targetScale={targetScale}
            />
          );
        })}
      </div>

      {/* TechStack – compact padding */}
      <div className="py-8">
        <TechStack items={techStack} speed={50} direction="left" />
      </div>
    </section>
  );
};

export default ServiceSection;