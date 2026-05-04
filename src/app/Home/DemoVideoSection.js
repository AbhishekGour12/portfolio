"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Play, ChevronRight, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

const DemoVideoSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const videoRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic", offset: 100 });
  }, []);

  // Trust points
  const trustPoints = [
    { text: "Real client projects", icon: <CheckCircle2 size={18} /> },
    { text: "Scalable architecture", icon: <CheckCircle2 size={18} /> },
    { text: "Clean UI/UX", icon: <CheckCircle2 size={18} /> },
    { text: "Fast performance", icon: <CheckCircle2 size={18} /> },
  ];

  // Cloudinary video URL (replace with your own demo video)
  const videoUrl = "https://res.cloudinary.com/duo5hrj5r/video/upload/v1777878059/Recording_2026-05-04_123028_gelim9.mp4";
  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8"
      style={{
        background: "radial-gradient(circle at 10% 30%, #f0f9ff 0%, #ffffff 60%, #e0f2fe 100%)",
      }}
    >
      {/* Animated blue blobs background */}
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
        <motion.div
          className="absolute top-1/3 left-1/2 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/80 shadow-sm">
            <Star className="w-4 h-4 text-[#1E40AF] fill-[#1E40AF]" />
            <span className="text-sm font-medium text-[#1E3A8A]">Trusted by Clients Worldwide</span>
          </div>
        </motion.div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN – content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6 text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              See How We Build <br />
              <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
                High‑Performance Products
              </span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-lg mx-auto lg:mx-0">
              From concept to scalable reality – watch how we engineer digital solutions that drive business growth.
            </p>

            {/* Trust points as grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {trustPoints.map((point, idx) => (
                <motion.div
                  key={point.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-2 text-gray-700 text-sm md:text-base"
                >
                  <span className="text-[#1E40AF]">{point.icon}</span>
                  <span>{point.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <Link href="/contact">
                <button className="group relative px-8 py-3.5 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto lg:mx-0">
                  Start Your Project
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1E40AF] opacity-0 group-hover:opacity-20 transition-opacity" />
                </button>
              </Link>
            </motion.div>

            {/* Small testimonial / trust line */}
            <p className="text-gray-500 text-sm italic border-l-2 border-[#1E40AF] pl-4 mt-6">
              “Built for performance, designed for impact — helping businesses scale with confidence.”
            </p>
          </motion.div>

          {/* RIGHT COLUMN – video container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Glow behind video */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#60A5FA]/30 to-[#1E40AF]/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />

            {/* Video container */}
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/50 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(96,165,250,0.5)]">
             <video
  ref={videoRef}
  src={videoUrl}
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-full object-contain bg-black rounded-2xl transition-transform duration-700 group-hover:scale-105"
  style={{ aspectRatio: "9 / 16", maxHeight: "400px" }}
/>
              {/* Soft gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-2xl" />

              {/* Optional play icon overlay (visible on hover) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/60">
                  <Play className="w-8 h-8 text-white drop-shadow-lg" fill="white" />
                </div>
              </div>
            </div>

            {/* Mini thumbnails / case study links (high-end touch) */}
            <div className="flex justify-center gap-3 mt-5">
              {["E‑Commerce Demo", "SaaS Dashboard", "Mobile App"].map((label, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/60 backdrop-blur-sm border border-blue-200 text-[#1E3A8A] hover:bg-white/80 transition-all hover:shadow-md"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="text-center mt-3">
              <button className="text-sm text-[#1E40AF] font-medium hover:underline inline-flex items-center gap-1">
                Watch More Case Studies <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Additional trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-blue-100/50 flex flex-wrap justify-center gap-8 text-center"
        >
          <div>
            <div className="text-2xl font-bold text-[#1E40AF]">98%</div>
            <div className="text-xs text-gray-500">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1E40AF]">20+</div>
            <div className="text-xs text-gray-500">Projects Delivered</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1E40AF]">24/7</div>
            <div className="text-xs text-gray-500">Expert Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoVideoSection;