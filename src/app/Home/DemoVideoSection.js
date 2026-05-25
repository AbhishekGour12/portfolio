"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Play, Pause, ChevronRight, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

const DemoVideoSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [isDesktop, setIsDesktop] = useState(true);

  // Video URLs
  const videoUrlDesktop = "https://res.cloudinary.com/duo5hrj5r/video/upload/v1778239119/Untitled_2_j4amst.mp4";
  const videoUrlMobile = "https://res.cloudinary.com/duo5hrj5r/video/upload/v1777917683/Untitled_2_kncauc.mp4";

  // Trust points
  const trustPoints = [
  { text: "Custom SaaS & Web Application Development", icon: <CheckCircle2 size={18} /> },
  { text: "AI-Powered Business Solutions", icon: <CheckCircle2 size={18} /> },
  { text: "SEO-Optimized High Performance Websites", icon: <CheckCircle2 size={18} /> },
  { text: "Scalable Cloud & Automation Systems", icon: <CheckCircle2 size={18} /> },
];
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic", offset: 100 });

    // Detect screen size and set video source
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      setVideoSrc(desktop ? videoUrlDesktop : videoUrlMobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play/pause based on visibility
  useEffect(() => {
    if (!videoRef.current || !videoSrc) return;
    if (isInView) {
      videoRef.current.play().catch(err => console.log("Auto-play prevented:", err));
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isInView, videoSrc]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

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
        <div className="absolute inset-0  bg-center opacity-[0.02]" />
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
            We Build Scalable Digital Solutions <br />
              <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
               That Drive Real Business Growth 
              </span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-lg mx-auto lg:mx-0">
             We help startups, businesses, and growing brands build modern websites, SaaS platforms, dashboards, and AI-powered solutions designed for performance, scalability, and long-term growth.
            </p>
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <Link href="/contact">
                <button className="group relative px-8 py-3.5 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto lg:mx-0">
                 Build Your Digital Product
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1E40AF] opacity-0 group-hover:opacity-20 transition-opacity" />
                </button>
              </Link>
            </motion.div>

            <p className="text-gray-500 text-sm italic border-l-2 border-[#1E40AF] pl-4 mt-6">
             “More than just websites — we create digital experiences that help businesses grow, engage customers, and scale faster.”
             </p>
          </motion.div>

          {/* RIGHT COLUMN – video with custom controls */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Glow behind video */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#60A5FA]/30 to-[#1E40AF]/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />

            {/* Video container – aspect ratio changes with screen */}
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/50 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(96,165,250,0.5)]">
              <div className={`relative w-full ${isDesktop ? "aspect-video" : "aspect-[9/16]"}`}>
                <video
                  ref={videoRef}
                  src={videoSrc}
                  loop
                  playsInline
                  muted={false}
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Soft gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-2xl" />

              {/* Play/Pause control button (always visible) */}
              <button
                onClick={togglePlayPause}
                className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center hover:bg-white/40 transition-all shadow-lg"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-0.5" />
                )}
              </button>

              {/* Center overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/60">
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </div>
              </div>
            </div>

            {/* Mini thumbnails / case study links */}
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