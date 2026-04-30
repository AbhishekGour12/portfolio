"use client";

import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { getDatabase, ref, get, set, push } from "firebase/database";
import { app } from "../Components/Firebase";
import { CldImage } from "next-cloudinary";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Trash2, Upload, Loader2 } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// Cloudinary config – replace with your own cloud name & unsigned upload preset
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME; // e.g. "dxm4yqg7g"
const CLOUDINARY_UPLOAD_PRESET = "project_uploads"; // create an unsigned preset in Cloudinary settings

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    technologies: "",
    type: "",
    img: [], // will store Cloudinary URLs
    link: "",
    github: "",
  });

  const swiperRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const db = getDatabase(app);
      const projectsRef = ref(db, "projects/");
      const snapshot = await get(projectsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const projectsList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setProjects(projectsList);
        setFilteredProjects(projectsList);
      } else {
        // Sample data (keep as fallback)
        const sampleProjects = [
          {
            id: "1",
            name: "E‑Commerce Platform",
            description: "High‑performance online store with real‑time inventory & secure payments.",
            technologies: "MERN | Tailwind | Firebase | Razorpay",
            type: "E-Commerce",
            img: ["https://images.unsplash.com/photo-1557821552-17105176677c?w=600"],
            link: "#",
            github: "#",
          },
          // ... other samples (same as before)
        ];
        setProjects(sampleProjects);
        setFilteredProjects(sampleProjects);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterTypes = ["All", "E-Commerce", "SaaS", "Dashboard", "UI/UX", "Food Delivery", "E-Learning", "Service"];
  const handleFilter = (type) => {
    setActiveFilter(type);
    if (type === "All") setFilteredProjects(projects);
    else setFilteredProjects(projects.filter(p => p.type === type));
  };

  // ──────────────────────────────────────────────────────────────
  // Cloudinary Upload Function (unsigned upload preset)
  // ──────────────────────────────────────────────────────────────
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const uploadedUrls = await Promise.all(files.map(file => uploadToCloudinary(file)));
      setNewProject(prev => ({
        ...prev,
        img: [...prev.img, ...uploadedUrls],
      }));
    } catch (error) {
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (indexToRemove) => {
    setNewProject(prev => ({
      ...prev,
      img: prev.img.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // ──────────────────────────────────────────────────────────────
  // Add project to Firebase
  // ──────────────────────────────────────────────────────────────
  const handleAddProject = async () => {
    if (!newProject.name || !newProject.type) {
      alert("Please fill at least name and project type");
      return;
    }
    if (newProject.img.length === 0) {
      alert("Please upload at least one image");
      return;
    }
    try {
      const db = getDatabase(app);
      const projectsRef = ref(db, "projects/");
      const newRef = push(projectsRef);
      await set(newRef, {
        name: newProject.name,
        description: newProject.description,
        technologies: newProject.technologies,
        type: newProject.type,
        img: newProject.img,
        link: newProject.link,
        github: newProject.github,
        timestamp: Date.now(),
      });
      alert("Project added successfully!");
      setShowModal(false);
      setNewProject({
        name: "",
        description: "",
        technologies: "",
        type: "",
        img: [],
        link: "",
        github: "",
      });
      fetchProjects(); // refresh list
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="w-12 h-12 border-4 border-[#1E40AF]/20 border-t-[#1E40AF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
        {/* Background blobs (unchanged) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header (unchanged) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-blue-200 text-sm font-medium text-[#1E40AF] mb-4">
              PORTFOLIO
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Our Work &{" "}
              <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-base md:text-lg">
              Explore our latest creations – modern, scalable, and user‑centric digital solutions.
            </p>
          </motion.div>

          {/* Filter pills (unchanged) */}
          <div className="relative mb-12">
            <div className="flex overflow-x-auto scrollbar-hide justify-center md:flex-wrap gap-3 pb-2">
              {filterTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm flex-shrink-0 ${
                    activeFilter === type
                      ? "bg-[#1E40AF] text-white shadow-lg shadow-blue-500/30 scale-105"
                      : "bg-white/60 text-gray-700 hover:bg-white/80 border border-blue-100"
                  }`}
                >
                  {type}
                </button>
              ))}
              <Link
                href="/project"
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/80 text-[#1E40AF] border border-blue-200 backdrop-blur-sm flex-shrink-0 hover:bg-[#1E40AF] hover:text-white transition-all"
              >
                More →
              </Link>
            </div>
          </div>

          {/* Swiper carousel (unchanged) */}
          <div className="-mx-4 px-4">
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 180,
                modifier: 1.2,
                slideShadows: false,
              }}
              navigation={{
                prevEl: ".custom-swiper-button-prev",
                nextEl: ".custom-swiper-button-next",
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1.5, coverflowEffect: { depth: 120 } },
                768: { slidesPerView: 2, coverflowEffect: { depth: 140 } },
                1024: { slidesPerView: 2.5, coverflowEffect: { depth: 160 } },
                1280: { slidesPerView: 3, coverflowEffect: { depth: 180 } },
              }}
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              className="project-coverflow !pb-4"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {filteredProjects.map((project, idx) => (
               <SwiperSlide key={project.id || idx}>
  {({ isActive }) => (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-500 h-full hover:z-30 ${
        isActive
          ? "shadow-2xl shadow-blue-500/20 scale-100 ring-2 ring-[#60A5FA]/50"
          : "shadow-md hover:shadow-xl"
      }`}
    >
      <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-gray-100">
        <CldImage
          width="800"
          height="600"
          src={project.img?.[0] || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800"}
          alt={project.name}
          crop="fill"
          gravity="auto"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="eager"
        />
      </div>

      {/* Always visible project name – top-left corner */}
      <div className="absolute top-0 left-0 p-3 md:p-4 z-10">
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/20">
          <h3 className="text-sm md:text-base font-bold text-white line-clamp-1">
            {project.name}
          </h3>
        </div>
      </div>

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

      {/* Hover content – slides up from bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
        <div className="backdrop-blur-md bg-black/50 rounded-xl p-3 border border-white/20">
          <p className="text-xs md:text-sm text-gray-200 line-clamp-2 mb-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="text-xs bg-blue-600/70 backdrop-blur-sm px-2 py-0.5 rounded-full text-white">
              {project.type}
            </span>
            <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-white line-clamp-1">
              {project.technologies?.split("|").slice(0, 2).join(" | ")}
              {project.technologies?.split("|").length > 2 ? " ..." : ""}
            </span>
          </div>
          <div className="flex gap-2">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-blue-600 rounded-lg text-xs font-medium text-white hover:bg-blue-500 transition"
            >
              Live Demo
            </a>
            {project.github && project.github !== "#" && project.github !== "" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-medium text-white hover:bg-white/30 transition"
              >
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )}
</SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Navigation & More button (unchanged) */}
          <div className="flex flex-col items-center gap-6 mt-10">
            <div className="flex items-center gap-4">
              <button className="custom-swiper-button-prev w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 flex items-center justify-center text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white transition-all shadow-md hover:shadow-lg">
                <ChevronLeft size={20} />
              </button>
              <button className="custom-swiper-button-next w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 flex items-center justify-center text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white transition-all shadow-md hover:shadow-lg">
                <ChevronRight size={20} />
              </button>
            </div>
            <Link
              href="/project"
              className="inline-flex items-center gap-2 px-6 py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full text-[#1E40AF] font-medium hover:bg-[#1E40AF] hover:text-white transition-all shadow-sm hover:shadow-md"
            >
              All Projects <span>→</span>
            </Link>
          </div>

          {/* Admin Add Button 
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full text-[#1E40AF] font-medium hover:bg-[#1E40AF] hover:text-white transition-all shadow-sm hover:shadow-md"
            >
              <span>+</span> Add Project
            </button>
          </div>
          */}
        </div>
      </section>

      {/* 🔥 NEW MODAL WITH CLOUDINARY UPLOAD */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900">Add New Project</h3>
                <p className="text-gray-500 text-sm">Fill details and upload images.</p>
              </div>
              <div className="p-6 space-y-5">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Name*</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                    placeholder="eg. E‑Commerce Platform"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows="3"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                    placeholder="Short description"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
                  <input
                    type="text"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                    placeholder="React | Node | Tailwind"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Type*</label>
                  <select
                    value={newProject.type}
                    onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                  >
                    <option value="">Select type</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Dashboard">Dashboard</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Food Delivery">Food Delivery</option>
                    <option value="E-Learning">E Learning</option>
                    <option value="Service">Service</option>
                  </select>
                </div>

                {/* Image Upload (Cloudinary) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Images* (upload at least one)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-400 transition">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="project-image-upload"
                    />
                    <label
                      htmlFor="project-image-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                    >
                      <Upload size={18} />
                      {uploading ? "Uploading..." : "Select Images"}
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Supported: JPG, PNG, GIF (max 5MB each)</p>
                  </div>

                  {/* Image Previews */}
                  {newProject.img.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {newProject.img.map((url, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={url}
                            alt={`preview ${idx}`}
                            className="w-full h-20 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center hover:bg-red-600 transition"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {uploading && (
                    <div className="flex items-center justify-center gap-2 mt-3 text-blue-600">
                      <Loader2 size={18} className="animate-spin" />
                      <span className="text-sm">Uploading images...</span>
                    </div>
                  )}
                </div>

                {/* Live Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Live Link</label>
                  <input
                    type="url"
                    value={newProject.link}
                    onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                    placeholder="https://..."
                  />
                </div>

                {/* GitHub Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
                  <input
                    type="url"
                    value={newProject.github}
                    onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleAddProject}
                  disabled={uploading}
                  className="px-6 py-2 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
                >
                  Add Project
                </button>
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* same styles as before (keep unchanged) */
        .project-coverflow .swiper-slide {
          transition: all 0.3s ease;
          height: auto;
        }
        .project-coverflow .swiper-slide-active {
          z-index: 20;
        }
        .project-coverflow .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.7;
          filter: blur(1px);
        }
        .project-coverflow .swiper-pagination {
          bottom: 0px !important;
        }
        .project-coverflow .swiper-pagination-bullet {
          background: #94A3B8;
          opacity: 0.6;
          width: 6px;
          height: 6px;
        }
        .project-coverflow .swiper-pagination-bullet-active {
          background: #1E40AF !important;
          width: 20px;
          border-radius: 3px;
          opacity: 1;
        }
        .project-coverflow .swiper-button-next,
        .project-coverflow .swiper-button-prev {
          display: none;
        }
        .project-coverflow .swiper-slide > div {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .project-coverflow .swiper-slide .relative {
          height: 100%;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 640px) {
          .project-coverflow .swiper-button-next,
          .project-coverflow .swiper-button-prev {
            display: none;
          }
          .custom-swiper-button-prev,
          .custom-swiper-button-next {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </>
  );
};

export default ProjectSection;