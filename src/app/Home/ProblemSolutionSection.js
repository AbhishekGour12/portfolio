"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  FaSearch, 
  FaPaintBrush, 
  FaTachometerAlt, 
  FaRobot, 
  FaUsers, 
  FaChartLine, 
  FaCloud, 
  FaMicrochip, 
  FaRocket 
} from "react-icons/fa";
import { MdOutlineDesignServices } from "react-icons/md";

const problemSolutionPairs = [
  {
    problem: "Low online visibility",
    problemIcon: <FaSearch className="text-orange-400" />,
    solution: "SEO optimized architecture",
    solutionIcon: <FaRocket className="text-[#60A5FA]" />,
    description: "We build search‑first websites that rank, attract, and convert.",
    color: "from-orange-500/20 to-red-500/10",
  },
  {
    problem: "Outdated website design",
    problemIcon: <FaPaintBrush className="text-orange-400" />,
    solution: "Modern UI/UX systems",
    solutionIcon: <MdOutlineDesignServices className="text-[#60A5FA]" />,
    description: "Fresh, responsive interfaces that engage and retain users.",
    color: "from-orange-500/20 to-red-500/10",
  },
  {
    problem: "Slow loading websites",
    problemIcon: <FaTachometerAlt className="text-orange-400" />,
    solution: "High-performance development",
    solutionIcon: <FaRocket className="text-[#60A5FA]" />,
    description: "Blazing fast load times with Next.js, edge caching, and optimizations.",
    color: "from-orange-500/20 to-red-500/10",
  },
  {
    problem: "No automation systems",
    problemIcon: <FaRobot className="text-orange-400" />,
    solution: "AI-powered automation",
    solutionIcon: <FaMicrochip className="text-[#60A5FA]" />,
    description: "Smart workflows, document processing, and lead routing that scale.",
    color: "from-orange-500/20 to-red-500/10",
  },
  {
    problem: "Poor user experience",
    problemIcon: <FaUsers className="text-orange-400" />,
    solution: "Conversion-focused design",
    solutionIcon: <FaChartLine className="text-[#60A5FA]" />,
    description: "User‑centric flows that guide visitors to action.",
    color: "from-orange-500/20 to-red-500/10",
  },
  {
    problem: "No scalable software",
    problemIcon: <FaCloud className="text-orange-400" />,
    solution: "Cloud-based scalable systems",
    solutionIcon: <FaCloud className="text-[#60A5FA]" />,
    description: "Microservices, auto‑scaling, and serverless architectures.",
    color: "from-orange-500/20 to-red-500/10",
  },
];

const ProblemSolutionSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Scroll‑activated connection
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Progress for connector line (0 to 1)
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Automatic index change based on scroll (mobile fallback)
  useEffect(() => {
    const unsubscribe = lineProgress.onChange((value) => {
      const newIndex = Math.min(
        Math.floor(value * problemSolutionPairs.length),
        problemSolutionPairs.length - 1
      );
      setActiveIndex(newIndex);
    });
    return () => unsubscribe();
  }, [lineProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 max-md:hidden"
      style={{
        background: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 60%, #e0f2fe 100%)",
      }}
    >
      {/* Animated blobs & grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-20 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-20 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/80 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#1E40AF] animate-pulse" />
            <span className="text-sm font-semibold text-[#1E3A8A]">We Solve Real Business Problems</span>
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            We Don't Just Build Products —<br />
            <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
              We Solve Business Problems
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-6">
            See how our proven solutions transform common bottlenecks into growth engines.
          </p>
        </motion.div>

        {/* Main split container */}
        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* LEFT: Problems */}
          <div className="flex-1 space-y-6">
            {problemSolutionPairs.map((item, idx) => (
              <motion.div
                key={`problem-${idx}`}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative p-5 rounded-2xl backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? "bg-white/80 border-l-4 border-[#1E40AF] shadow-md"
                    : "bg-white/40 border border-white/40 hover:bg-white/60"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{item.problemIcon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{item.problem}</h3>
                    {activeIndex === idx && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-gray-500 mt-1"
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </div>
                </div>
                {/* Glitch effect when hovered */}
                {hoveredIndex === idx && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    style={{ background: `radial-gradient(circle at 30% 20%, rgba(249,115,22,0.15), transparent 70%)` }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* CENTER: Animated Connector (Desktop only) */}
          <div className="hidden lg:block w-24 relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#60A5FA]/30 via-[#1E40AF] to-[#60A5FA]/30 rounded-full transform -translate-x-1/2" />
            
            {/* Animated glow that travels */}
            <motion.div
              className="absolute left-1/2 w-2 h-2 rounded-full bg-[#60A5FA] shadow-[0_0_20px_#60A5FA] transform -translate-x-1/2"
              style={{ top: useTransform(lineProgress, [0, 1], ["5%", "95%"]) }}
            />
            
            {/* Energy particles along line */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 w-1 h-1 rounded-full bg-blue-400/60 transform -translate-x-1/2"
                style={{
                  top: `${15 + i * 20}%`,
                  animation: `pulse 2s ${i * 0.5}s infinite`,
                }}
              />
            ))}
          </div>

          {/* RIGHT: Solutions */}
          <div className="flex-1 space-y-6">
            {problemSolutionPairs.map((item, idx) => (
              <motion.div
                key={`solution-${idx}`}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`relative p-5 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                  activeIndex === idx
                    ? "bg-gradient-to-r from-[#1E40AF]/10 to-[#60A5FA]/10 border border-[#60A5FA]/50 shadow-lg"
                    : "bg-white/30 border border-white/40 hover:bg-white/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{item.solutionIcon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{item.solution}</h3>
                    {activeIndex === idx && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-gray-600 mt-1"
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </div>
                </div>
                {/* Glow on active */}
                {activeIndex === idx && (
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#60A5FA]/20 to-transparent opacity-50 blur-xl pointer-events-none" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Solve My Business Challenge
            <FaRocket className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-gray-500 text-sm mt-4">
            Join 50+ companies that scaled with our solutions
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.5); }
        }
      `}</style>
    </section>
  );
};

export default ProblemSolutionSection;