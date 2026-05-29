"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Play, Pause, ChevronRight, CheckCircle2, Star, Loader2 } from "lucide-react";
import Link from "next/link";

const DemoVideoSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [isDesktop, setIsDesktop] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);

  // Video URLs
  const videoUrlDesktop = "https://res.cloudinary.com/duo5hrj5r/video/upload/v1778239119/Untitled_2_j4amst.mp4";
  const videoUrlMobile = "https://res.cloudinary.com/duo5hrj5r/video/upload/v1777917683/Untitled_2_kncauc.mp4";

  // Trust points (unchanged)
  const trustPoints = [
    { text: "Custom SaaS & Web Application Development", icon: <CheckCircle2 size={18} /> },
    { text: "AI-Powered Business Solutions", icon: <CheckCircle2 size={18} /> },
    { text: "SEO-Optimized High Performance Websites", icon: <CheckCircle2 size={18} /> },
    { text: "Scalable Cloud & Automation Systems", icon: <CheckCircle2 size={18} /> },
  ];

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic", offset: 100, disable: window.innerWidth < 768 });

    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      const newSrc = desktop ? videoUrlDesktop : videoUrlMobile;
      // Only change src if different to avoid reloading
      if (newSrc !== videoSrc) {
        setVideoSrc(newSrc);
        setIsVideoLoading(true);
        setHasStartedLoading(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [videoSrc]);

  // Auto-play/pause based on visibility and load the video only when section is near
  useEffect(() => {
    if (!videoRef.current || !videoSrc) return;
    if (isInView && !hasStartedLoading) {
      // Load video metadata only when in view
      videoRef.current.load();
      setHasStartedLoading(true);
    }
    if (isInView && hasStartedLoading) {
      videoRef.current.play().catch(err => console.log("Auto-play prevented:", err));
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isInView, videoSrc, hasStartedLoading]);

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

  // Hide loading spinner once video can play
  const handleVideoCanPlay = () => {
    setIsVideoLoading(false);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8"
      style={{
        background: "radial-gradient(circle at 10% 30%, #f0f9ff 0%, #ffffff 60%, #e0f2fe 100%)",
      }}
    >
      {/* Animated background blobs – hidden on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden max-sm:hidden">
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Floating badge – responsive */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/80 shadow-sm max-sm:bg-white/80">
            <Star className="w-4 h-4 text-[#1E40AF] fill-[#1E40AF]" />
            <span className="text-sm font-medium text-[#1E3A8A]">Trusted by Clients Worldwide</span>
          </div>
        </motion.div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN – content (unchanged but with minor responsive tweaks) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6 text-center lg:text-left"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              We Build Scalable Digital Solutions <br />
              <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
                That Drive Real Business Growth
              </span>
            </h2>
            <p className="text-gray-600 text-sm md:text-lg max-w-lg mx-auto lg:mx-0">
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
                  <span className="text-[#1E40AF] shrink-0">{point.icon}</span>
                  <span className="text-left">{point.text}</span>
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
                <button className="group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto lg:mx-0 text-sm sm:text-base">
                  Build Your Digital Product
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1E40AF] opacity-0 group-hover:opacity-20 transition-opacity" />
                </button>
              </Link>
            </motion.div>

            <p className="text-gray-500 text-xs sm:text-sm italic border-l-2 border-[#1E40AF] pl-4 mt-6">
              “More than just websites — we create digital experiences that help businesses grow, engage customers, and scale faster.”
            </p>
          </motion.div>

          {/* RIGHT COLUMN – video with loader and optimized effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Glow behind video – hidden on mobile */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#60A5FA]/30 to-[#1E40AF]/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all max-sm:hidden" />

            {/* Video container */}
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/50 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(96,165,250,0.5)] max-sm:shadow-lg max-sm:border-white/70">
              <div className={`relative w-full ${isDesktop ? "aspect-video" : "aspect-[9/16]"}`}>
                {/* Video element with lazy loading and preload metadata */}
                <video
                  ref={videoRef}
                  src={videoSrc}
                  loop
                  playsInline
                  muted={false}
                  preload="metadata"
                  onCanPlay={handleVideoCanPlay}
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: isVideoLoading ? 0 : 1 }}
                />
                {/* Loader overlay while video loads */}
                {isVideoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>
              {/* Soft gradient overlay (kept light, helps with text contrast) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-2xl" />

              {/* Play/Pause control button */}
              <button
                onClick={togglePlayPause}
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center hover:bg-white/40 transition-all shadow-lg"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" />
                )}
              </button>

              {/* Center overlay on hover (desktop only) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none max-sm:hidden">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/60">
                  {isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1" />
                  )}
                </div>
              </div>
            </div>

            {/* Mini thumbnails / case study links (unchanged) */}
            <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-5">
              {["E‑Commerce Demo", "SaaS Dashboard", "Mobile App"].map((label, idx) => (
                <button
                  key={idx}
                  className="px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-white/60 backdrop-blur-sm border border-blue-200 text-[#1E3A8A] hover:bg-white/80 transition-all hover:shadow-md"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="text-center mt-2 sm:mt-3">
              <button className="text-xs sm:text-sm text-[#1E40AF] font-medium hover:underline inline-flex items-center gap-1">
                Watch More Case Studies <ChevronRight size={12} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Trust bar – kept but with lighter styling on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-blue-100/50 flex flex-wrap justify-center gap-6 sm:gap-8 text-center"
        >
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#1E40AF]">98%</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#1E40AF]">20+</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Projects Delivered</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#1E40AF]">24/7</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Expert Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoVideoSection;