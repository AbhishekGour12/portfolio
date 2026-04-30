"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../Components/Firebase";
import { FiExternalLink, FiGithub } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProjectsPage = ({ Profile1 }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic", offset: 100 });
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const db = getDatabase(app);
        const dataRef = ref(db, "projects/");
        const snapshot = await get(dataRef);
        const projectList = snapshot.exists() ? Object.values(snapshot.val()) : [];
        setProjects(projectList.reverse()); // show newest first
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const isLight = Profile1 === "white";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-white">
        <div className="w-12 h-12 border-4 border-[#1E40AF]/20 border-t-[#1E40AF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <title>Our Projects | Abhi Services – Premium Portfolio</title>
      <meta
        name="description"
        content="Explore our latest projects – modern web apps, e-commerce platforms, dashboards, and custom digital solutions built with cutting-edge technologies."
      />

      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white py-16 px-4 sm:px-6 lg:px-8">
        {/* Background blobs & grid */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-blue-200 text-sm font-medium text-[#1E40AF] mb-4">
              PORTFOLIO
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Our Recent{" "}
              <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
                Work
              </span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-base md:text-lg">
              Every project is a case study – see how we turn ideas into high‑impact digital products.
            </p>
          </div>

          {/* Projects: alternating split layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-24"
          >
            {projects.slice().reverse().map((project, idx) => {
              const isEven = idx % 2 === 0;
              // Determine layout: even index → image left content right, odd → image right content left
              const imageOnLeft = isEven;

              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    !imageOnLeft ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Left side - Image/Video Slider (only if imageOnLeft) */}
                  <div
                    className={`relative ${imageOnLeft ? "order-1" : "order-2"}`}
                    data-aos={imageOnLeft ? "fade-right" : "fade-left"}
                    data-aos-delay="100"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                      <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        loop
                        className="project-detail-swiper"
                      >
                        {project.img?.map((media, i) => (
                          <SwiperSlide key={i}>
                            <div className="relative aspect-video overflow-hidden bg-gray-100">
                              {media.includes(".mp4") ? (
                                <video
                                  src={media}
                                  controls
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                              ) : (
                                <img
                                  src={media}
                                  alt={`${project.name} screenshot`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      {/* subtle glow behind image */}
                      <div className="absolute -inset-2 bg-blue-500/10 blur-2xl rounded-3xl -z-10" />
                    </div>
                  </div>

                 {/* Right side - Project Details */}
<div
  className={`${imageOnLeft ? "order-2" : "order-1"} space-y-5`}
  data-aos={imageOnLeft ? "fade-left" : "fade-right"}
  data-aos-delay="200"
>
  {/* Project Type Badge */}
  <div className="flex flex-wrap gap-2 mb-2">
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100/80 backdrop-blur-sm text-[#1E40AF] text-xs font-semibold border border-blue-200 shadow-sm">
      {project.type || "Project"}
    </span>
  </div>

  {/* Project title */}
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
    {project.name}
  </h2>

  {/* Description */}
  <p className="text-gray-600 leading-relaxed text-base">
    {project.description}
  </p>

  {/* Tech Stack - tags */}
  <div className="flex flex-wrap gap-2">
    {project.technologies?.split("|").map((tech, i) => (
      <span
        key={i}
        className="px-3 py-1 bg-white/70 backdrop-blur-sm border border-blue-100 rounded-full text-xs font-medium text-[#1E40AF] shadow-sm"
      >
        {tech.trim()}
      </span>
    ))}
  </div>

  {/* Buttons */}
  <div className="flex flex-wrap gap-4 pt-3">
    {project.link && project.link !== "#" && (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
      >
        <FiExternalLink className="w-4 h-4" /> Live Project
      </a>
    )}
    {project.github && project.github !== "#" && (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-800 rounded-xl font-medium hover:bg-[#1E40AF] hover:text-white hover:border-[#1E40AF] transition-all"
      >
        <FiGithub className="w-4 h-4" /> GitHub Repo
      </a>
    )}
  </div>
</div>
                </motion.div>
              );
            })}
          </motion.div>

          {projects.length === 0 && (
            <p className="text-center text-gray-500 py-20">No projects found. Add some via admin panel.</p>
          )}

          {/* Divider line between projects (handled by gap, but add subtle line after each except last) */}
          <div className="mt-12 border-t border-blue-100/50 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              Each project reflects our commitment to quality and innovation.
            </p>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .project-detail-swiper .swiper-button-next,
        .project-detail-swiper .swiper-button-prev {
          color: white !important;
          background: rgba(30, 64, 175, 0.6);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .project-detail-swiper .swiper-button-next:after,
        .project-detail-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
        .project-detail-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.7;
        }
        .project-detail-swiper .swiper-pagination-bullet-active {
          background: #60A5FA !important;
          opacity: 1;
        }
        @media (max-width: 768px) {
          .project-detail-swiper .swiper-button-next,
          .project-detail-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default ProjectsPage;