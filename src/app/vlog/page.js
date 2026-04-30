"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { getDatabase, ref, get, set, push } from "firebase/database";
import { app } from "../Components/Firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Play,
  Pause,
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  X,
  Plus,
  GitBranch,
  Zap,
  Shield,
  Users,
  BarChart3,
  Code,
  Palette,
  Rocket,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// Fallback video URLs (muted, loopable)
const FALLBACK_VIDEOS = [
  "https://player.vimeo.com/external/371527263.sd.mp4?s=8c3b5b1c2a5e5e2b6c8e6a8e0a2e2c2d&profile_id=164",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
];

const VlogPage = () => {
  const [projects, setProjects] = useState([]);
  const [videos, setVideos] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: "", url: "", category: "" });
  const [methodologyData, setMethodologyData] = useState([]);
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const processLineProgress = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic", offset: 100 });
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const db = getDatabase(app);
      // Fetch projects
      const projectsRef = ref(db, "projects/");
      const projectsSnap = await get(projectsRef);
      let projectsList = projectsSnap.exists() ? Object.values(projectsSnap.val()) : [];

      // Augment projects with category and methodology if missing
      projectsList = projectsList.map((p, idx) => ({
        ...p,
        category: p.category || ["Development", "UI/UX", "Case Study", "Process"][idx % 4],
        methodology: p.methodology || ["Agile", "Scrum", "Waterfall", "RAD", "Lean"][Math.floor(Math.random() * 5)],
        methodologyScore: Math.floor(Math.random() * 100),
      }));
      setProjects(projectsList);

      // Fetch videos from a separate "videos" node (or fallback)
      const videosRef = ref(db, "videos/");
      const videosSnap = await get(videosRef);
      let videoList = videosSnap.exists() ? Object.values(videosSnap.val()) : [];
      if (videoList.length === 0) {
        // Sample videos
        videoList = [
          { id: "v1", title: "How We Build Scalable Apps", url: FALLBACK_VIDEOS[0], category: "Process" },
          { id: "v2", title: "UI/UX Design Workflow", url: FALLBACK_VIDEOS[1], category: "UI/UX" },
          { id: "v3", title: "Agile Development at Abhi", url: FALLBACK_VIDEOS[2], category: "Development" },
        ];
      }
      setVideos(videoList);
      setFeaturedVideo(videoList[0] || { url: FALLBACK_VIDEOS[0], title: "Inside Our Process & Thinking" });
      setFilteredContent([...projectsList, ...videoList]);

      // Create methodology summary for the graph section
      const methods = ["Agile", "Scrum", "RAD", "Lean", "Waterfall"];
      const methodData = methods.map((m) => ({
        name: m,
        value: Math.floor(Math.random() * 60) + 30,
      }));
      setMethodologyData(methodData);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (filter === "All") {
      setFilteredContent([...projects, ...videos]);
    } else {
      const filteredProjects = projects.filter((p) => p.category === filter);
      const filteredVideos = videos.filter((v) => v.category === filter);
      setFilteredContent([...filteredProjects, ...filteredVideos]);
    }
  };

  const uploadVideo = async () => {
    if (!newVideo.title || !newVideo.url) return;
    try {
      const db = getDatabase(app);
      const videosRef = ref(db, "videos/");
      const newRef = push(videosRef);
      await set(newRef, {
        title: newVideo.title,
        url: newVideo.url,
        category: newVideo.category,
        timestamp: Date.now(),
      });
      setShowUploadModal(false);
      setNewVideo({ title: "", url: "", category: "" });
      fetchData(); // refresh
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const filters = ["All", "Development", "UI/UX", "Case Study", "Process", "Tutorials"];

  // Process steps
  const processSteps = [
    { icon: <Users size={24} />, title: "Research & Planning", desc: "Gather requirements, user stories, and roadmap." },
    { icon: <Palette size={24} />, title: "Wireframing", desc: "Low-fidelity sketches & user flow validation." },
    { icon: <Code size={24} />, title: "UI/UX Design", desc: "High-fidelity mockups, interactive prototypes." },
    { icon: <Zap size={24} />, title: "Development Sprint", desc: "Agile sprints, weekly demos, CI/CD." },
    { icon: <Shield size={24} />, title: "Testing & QA", desc: "Unit tests, integration, performance audits." },
    { icon: <Rocket size={24} />, title: "Deployment", desc: "Launch, monitoring, and post-launch support." },
  ];

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="w-12 h-12 border-4 border-[#1E40AF]/20 border-t-[#1E40AF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <title>Insights | Abhi Services – Process & Stories</title>
      <meta
        name="description"
        content="Explore our development process, project methodologies, and video stories. See how we build scalable digital products."
      />

      <section className="relative w-full overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
        </div>

        <div className="relative z-10">
          {/* 1. Hero Video Section */}
          <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
            <video
              ref={videoRef}
              src={featuredVideo?.url}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            <div className="absolute inset-0 backdrop-blur-[2px]" />
            <div className="relative h-full flex items-center justify-center text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
              >
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/30 mb-6">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-white">Featured Story</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                  Inside Our Process & Thinking
                </h1>
                <p className="text-white/80 text-lg mb-8">
                  Discover how we turn ideas into scalable, high‑performance digital products.
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold hover:bg-white/30 transition"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] rounded-full text-white font-semibold shadow-lg flex items-center gap-2">
                    Watch More Insights <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            </div>
            {/* Play/pause control */}
            {videoRef.current && (
              <button
                onClick={() => {
                  if (isPlaying) videoRef.current.pause();
                  else videoRef.current.play();
                  setIsPlaying(!isPlaying);
                }}
                className="absolute bottom-6 left-6 bg-black/50 rounded-full p-2 text-white hover:bg-white/20 transition"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
            )}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* 2. Category Filters */}
            <div className="flex overflow-x-auto scrollbar-hide justify-start md:justify-center gap-3 pb-4 mb-12 border-b border-blue-100">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilter(filter)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeFilter === filter
                      ? "text-[#1E40AF] font-bold"
                      : "text-gray-600 hover:text-[#1E40AF]"
                  }`}
                >
                  {filter}
                  {activeFilter === filter && (
                    <motion.span
                      layoutId="vlogActiveFilter"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] rounded-full"
                      transition={{ type: "spring", stiffness: 380 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* 3. Process Timeline (How We Build Projects) */}
            <div className="mb-24" data-aos="fade-up">
              <div className="text-center mb-12">
                <span className="text-sm font-semibold text-[#1E40AF] tracking-wide uppercase">Methodology</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">How We Build Projects</h2>
                <p className="text-gray-500 max-w-2xl mx-auto mt-2">A transparent, agile process that scales with your vision.</p>
              </div>
              <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 rounded-full hidden md:block" />
                <motion.div
                  className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] rounded-full hidden md:block"
                  style={{ width: processLineProgress }}
                />
                <div className="flex flex-col md:flex-row justify-between gap-8 relative">
                  {processSteps.map((step, i) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex-1 text-center group"
                    >
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-white border-2 border-[#1E40AF] shadow-md flex items-center justify-center text-[#1E40AF] mx-auto mb-4 group-hover:scale-110 transition">
                          {step.icon}
                        </div>
                        <div className="absolute top-8 -right-2 w-8 h-0.5 bg-[#1E40AF]/30 hidden md:block" />
                      </div>
                      <h3 className="font-bold text-gray-800">{step.title}</h3>
                      <p className="text-xs text-gray-500 max-w-[180px] mx-auto">{step.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Project Methodology Visualization */}
           {/* 5. Project Case Studies with Methodology Process (NEW) */}
<div className="mb-24">
  <div className="flex justify-between items-end mb-6 flex-wrap gap-4">
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Project Case Studies</h2>
      <p className="text-gray-500 text-sm mt-1">See how we apply different methodologies to real projects</p>
    </div>
    <button
      onClick={() => setShowUploadModal(true)}
      className="flex items-center gap-1 text-sm text-[#1E40AF] hover:underline"
    >
      <Plus size={16} /> Add Video
    </button>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {projects.map((project, idx) => {
      // Define methodology steps based on project's methodology or assign dynamically
      const methodologyMap = {
        Agile: [
          { name: "Sprint Planning", icon: "📋", color: "from-blue-400 to-blue-600" },
          { name: "Development", icon: "💻", color: "from-indigo-400 to-indigo-600" },
          { name: "Testing", icon: "🧪", color: "from-purple-400 to-purple-600" },
          { name: "Review", icon: "👀", color: "from-pink-400 to-pink-600" },
          { name: "Retrospective", icon: "🔄", color: "from-rose-400 to-rose-600" },
        ],
        Scrum: [
          { name: "Product Backlog", icon: "📝", color: "from-blue-400 to-blue-600" },
          { name: "Sprint Backlog", icon: "📌", color: "from-indigo-400 to-indigo-600" },
          { name: "Daily Standup", icon: "☀️", color: "from-purple-400 to-purple-600" },
          { name: "Sprint Review", icon: "✅", color: "from-pink-400 to-pink-600" },
          { name: "Sprint Retro", icon: "🔄", color: "from-rose-400 to-rose-600" },
        ],
        RAD: [
          { name: "Requirements", icon: "📋", color: "from-blue-400 to-blue-600" },
          { name: "Prototype", icon: "🎨", color: "from-indigo-400 to-indigo-600" },
          { name: "User Testing", icon: "👥", color: "from-purple-400 to-purple-600" },
          { name: "Implementation", icon: "🚀", color: "from-pink-400 to-pink-600" },
        ],
        Lean: [
          { name: "Identify Value", icon: "💡", color: "from-blue-400 to-blue-600" },
          { name: "Map Value Stream", icon: "🗺️", color: "from-indigo-400 to-indigo-600" },
          { name: "Create Flow", icon: "🌊", color: "from-purple-400 to-purple-600" },
          { name: "Pull System", icon: "🔗", color: "from-pink-400 to-pink-600" },
          { name: "Continuous Improvement", icon: "📈", color: "from-rose-400 to-rose-600" },
        ],
        Waterfall: [
          { name: "Requirements", icon: "📋", color: "from-blue-400 to-blue-600" },
          { name: "Design", icon: "🎨", color: "from-indigo-400 to-indigo-600" },
          { name: "Implementation", icon: "💻", color: "from-purple-400 to-purple-600" },
          { name: "Testing", icon: "🧪", color: "from-pink-400 to-pink-600" },
          { name: "Deployment", icon: "🚀", color: "from-rose-400 to-rose-600" },
          { name: "Maintenance", icon: "🔧", color: "from-amber-400 to-amber-600" },
        ],
      };
      // Use project.methodology or random one
      let methodologyType = project.methodology;
      if (!methodologyType || !methodologyMap[methodologyType]) {
        methodologyType = Object.keys(methodologyMap)[idx % Object.keys(methodologyMap).length];
      }
      const steps = methodologyMap[methodologyType] || methodologyMap.Agile;

      return (
        <motion.div
          key={project.id || idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-100/50 shadow-md hover:shadow-xl transition-all overflow-hidden"
        >
          {/* Project Header */}
          <div className="p-5 border-b border-blue-100/60">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
              </div>
              <div className="flex gap-2">
                {project.link && project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-[#1E40AF] text-white text-xs rounded-lg hover:bg-[#1E3A8A] transition"
                  >
                    Live
                  </a>
                )}
                {project.github && project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-gray-700 text-white text-xs rounded-lg hover:bg-gray-800 transition"
                  >
                    Code
                  </a>
                )}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {project.type || "Custom"}
              </span>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                Methodology: {methodologyType}
              </span>
            </div>
          </div>

          {/* Methodology Process Flow */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-[#1E40AF] to-[#60A5FA] rounded-full" />
              <h4 className="font-semibold text-gray-800">Development Process</h4>
            </div>
            <div className="relative">
              {/* Connecting line (horizontal) – hidden on mobile, visible on md+ */}
              <div className="hidden md:block absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
              <div className="flex flex-col md:flex-row justify-between gap-4 relative">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex-1 text-center relative z-10"
                  >
                    <div
                      className={`w-10 h-10 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition`}
                    >
                      <span className="text-lg">{step.icon}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-800 mt-2">{step.name}</p>
                    {/* Connector dot on mobile vertical line */}
                    {i < steps.length - 1 && (
                      <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-10 w-px h-4 bg-gray-300" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Optional: Show tech stack tags */}
          <div className="px-5 pb-5">
            <div className="flex flex-wrap gap-1">
              {project.technologies?.split("|").map((tech, i) => (
                <span key={i} className="text-[10px] bg-white/70 border border-blue-100 px-2 py-0.5 rounded-full text-gray-600">
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
</div>

            {/* 5. Featured Insights Grid (staggered) */}
            <div className="mb-24">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Insights</h2>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center gap-1 text-sm text-[#1E40AF] hover:underline"
                >
                  <Plus size={16} /> Add Video
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
                {filteredContent.slice(0, 6).map((item, idx) => (
                  <motion.div
                    key={item.id || item.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="group relative bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-100/50 shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="aspect-video overflow-hidden">
                      {item.url ? (
                        <video
                          src={item.url}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={item.img?.[0] || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800"}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-blue-600 bg-blue-100/80 px-2 py-0.5 rounded-full">
                          {item.category || "Insight"}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-800 line-clamp-1">{item.name || item.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description || "Watch our latest video to learn more."}</p>
                      <div className="mt-3 flex justify-end">
                        <a
                          href={item.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1E40AF] text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                        >
                          Watch Now <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 6. Interactive Video Carousel */}
            <div className="mb-24" data-aos="fade-up">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">More from our library</h3>
              <Swiper
                modules={[Navigation, EffectCoverflow, Autoplay]}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView={1}
                coverflowEffect={{ rotate: 0, stretch: 0, depth: 180, modifier: 1.2, slideShadows: false }}
                navigation
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 1.5 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 2.5 },
                }}
                className="insight-carousel"
              >
                {videos.slice(0, 8).map((video) => (
                  <SwiperSlide key={video.id}>
                    <div className="relative rounded-xl overflow-hidden bg-white/40 backdrop-blur-sm">
                      <video src={video.url} className="w-full aspect-video object-cover" muted loop playsInline />
                      <div className="p-3">
                        <h4 className="font-semibold text-gray-800">{video.title}</h4>
                        <p className="text-xs text-gray-500">{video.category}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* 7. Educational Value Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24" data-aos="fade-up">
              {[
                { icon: <GitBranch />, title: "Scalable Architecture", desc: "Built to grow with your business." },
                { icon: <Zap />, title: "Performance First", desc: "Core Web Vitals, 90+ Lighthouse." },
                { icon: <Shield />, title: "Clean Code", desc: "Maintainable, tested, and documented." },
                { icon: <BarChart3 />, title: "UI Psychology", desc: "User‑centric design that converts." },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-blue-100 text-center"
                >
                  <div className="text-[#1E40AF] mb-2 flex justify-center">{item.icon}</div>
                  <h4 className="font-bold text-gray-800">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* 8. CTA Section */}
            <div className="relative" data-aos="fade-up">
              <div className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-8 md:p-12 text-center overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Want us to build your next product?</h2>
                <p className="text-gray-500 max-w-xl mx-auto mb-8">Let’s turn your idea into a scalable, high‑impact digital solution.</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="/contact" className="px-6 py-3 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white rounded-full font-semibold shadow-md hover:shadow-lg transition inline-flex items-center gap-2">
                    Start Project <ArrowRight size={18} />
                  </a>
                  <a href="/contact" className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full text-gray-800 font-semibold hover:bg-white transition">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        <AnimatePresence>
          {showUploadModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowUploadModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Add New Video</h3>
                  <button onClick={() => setShowUploadModal(false)} className="p-1 rounded-full hover:bg-gray-100">
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Video Title"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                  />
                  <input
                    type="url"
                    placeholder="Video URL (mp4)"
                    value={newVideo.url}
                    onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                  />
                  <select
                    value={newVideo.category}
                    onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                  >
                    <option value="">Select category</option>
                    {filters.slice(1).map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                  <button
                    onClick={uploadVideo}
                    className="w-full py-2 bg-[#1E40AF] text-white rounded-xl font-semibold hover:bg-[#1E3A8A] transition"
                  >
                    Upload Video
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <style jsx global>{`
        .insight-carousel .swiper-slide {
          transition: all 0.3s;
        }
        .insight-carousel .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.6;
          filter: blur(1px);
          transform: scale(0.92);
        }
        .insight-carousel .swiper-button-next,
        .insight-carousel .swiper-button-prev {
          color: white !important;
          background: #1E40AF;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(30,64,175,0.3);
        }
        .insight-carousel .swiper-button-next:after,
        .insight-carousel .swiper-button-prev:after {
          font-size: 18px;
        }
        @media (max-width: 640px) {
          .insight-carousel .swiper-button-next,
          .insight-carousel .swiper-button-prev {
            display: none;
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default VlogPage;