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

const ProjectsPage = ({ Profile1 = "white" }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic", offset: 100, disable: window.innerWidth < 768 });
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const db = getDatabase(app);
        const dataRef = ref(db, "projects/");
        const snapshot = await get(dataRef);
        let projectList = snapshot.exists() ? Object.values(snapshot.val()) : [];
        // Provide a fallback if no data in Firebase (for demo)
        if (projectList.length === 0) {
          projectList = [
            {
              name: "E‑Commerce Platform",
              description: "High-performance online store with real‑time inventory, secure payments, and smooth animations.",
              technologies: "MERN Stack | Tailwind CSS | Firebase Auth | Razorpay",
              img: ["https://images.unsplash.com/photo-1557821552-17105176677c?w=600"],
              link: "#",
              github: "#",
              type: "E‑Commerce"
            },
            {
              name: "Smart ERP System",
              description: "SaaS‑based ERP for schools and gyms with automated scheduling and billing.",
              technologies: "Next.js | Express | MongoDB | Tailwind | Clerk Auth",
              img: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600"],
              link: "#",
              github: "#",
              type: "SaaS"
            }
          ];
        }
        setProjects(projectList.reverse());
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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
      <meta name="description" content="Explore our latest projects – modern web apps, e-commerce platforms, dashboards, and custom digital solutions built with cutting-edge technologies." />

      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        {/* Background blobs & grid */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header – responsive margins */}
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-blue-200 text-sm font-medium text-[#1E40AF] mb-4">
              PORTFOLIO
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Our Recent{" "}
              <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
                Work
              </span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-base md:text-lg px-2">
              Every project is a case study – see how we turn ideas into high‑impact digital products.
            </p>
          </div>

          {/* Projects */}
          {projects.length === 0 ? (
            <p className="text-center text-gray-500 py-20">No projects found. Add some via admin panel.</p>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-16 md:space-y-24 "
            >
              {projects.slice().reverse().map((project, idx) => {
                const isEven = idx % 2 === 0;
                // On mobile always stack: image first, content below. On desktop alternate.
                return (
                  <div
                    key={idx}
                    className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
                  >
                    {/* Image / Media Slider – always first on mobile */}
                    <div
                      className={`relative order-1 ${!isEven ? "lg:order-2" : "lg:order-1"}`}
                      data-aos="fade-right"
                      data-aos-delay="100"
                    >
                      <div className="relative rounded-2xl overflow-hidden shadow-xl group  ">
                        <Swiper
                          modules={[Navigation, Pagination, Autoplay]}
                          navigation
                          pagination={{ clickable: true }}
                          autoplay={{ delay: 4000, disableOnInteraction: false }}
                          loop
                          className="project-detail-swiper w-full max-sm:h-[250px]  "
                          breakpoints={{
                            0: { slidesPerView: 1 },
                            768: { slidesPerView: 1 }
                          }}
                        >
                          {(project.img || []).map((media, i) => (
                            <SwiperSlide key={i}>
                              <div className="relative aspect-video h-full w-full !pb-9  overflow-hidden">
                                {media?.includes(".mp4") ? (
                                  <video
                                    src={media}
                                    controls
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                  />
                                ) : (
                                  <img
                                    src={media}
                                    alt={`${project.name} screenshot`}
                                    className="w-full h-full object-fit group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                  />
                                )}
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        {/* Subtle glow */}
                        <div className="absolute -inset-2 bg-blue-500/10 blur-2xl rounded-3xl -z-10" />
                      </div>
                    </div>

                    {/* Project Details – always second on mobile */}
                    <div
                      className={`order-2 ${!isEven ? "lg:order-1" : "lg:order-2"} space-y-4 sm:space-y-5`}
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      {/* Badge */}
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100/80 backdrop-blur-sm text-[#1E40AF] text-xs font-semibold border border-blue-200 shadow-sm">
                          {project.type || "Featured Project"}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                        {project.name}
                      </h2>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {project.description}
                      </p>

                      {/* Tech Stack tags – responsive wrapping */}
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.split("|").map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-white/70 backdrop-blur-sm border border-blue-100 rounded-full text-[11px] sm:text-xs font-medium text-[#1E40AF] shadow-sm"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Buttons – full width on mobile, inline on desktop */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        {project.link && project.link !== "#" && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all hover:scale-[1.02] text-sm"
                          >
                            <FiExternalLink className="w-4 h-4" /> Live Project
                          </a>
                        )}
                        {project.github && project.github !== "#" && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-800 rounded-xl font-medium hover:bg-[#1E40AF] hover:text-white hover:border-[#1E40AF] transition-all text-sm"
                          >
                            <FiGithub className="w-4 h-4" /> GitHub Repo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* Footer note */}
          <div className="mt-16 border-t border-blue-100/50 pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Each project reflects our commitment to quality and innovation.
            </p>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .project-detail-swiper {
          width: 100%;
         
        }
        .project-detail-swiper .swiper-button-next,
        .project-detail-swiper .swiper-button-prev {
          color: white !important;
          background: rgba(30, 64, 175, 0.7);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
          
        .project-detail-swiper .swiper-button-next:after,
        .project-detail-swiper .swiper-button-prev:after {
          font-size: 14px;
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
        /* Hide navigation arrows on mobile, but keep pagination */
        @media (max-width: 768px) {
          .project-detail-swiper .swiper-button-next,
          .project-detail-swiper .swiper-button-prev {
            display: none;
          }
          .project-detail-swiper .swiper-pagination {
            bottom: 0;
          }
        }
        /* Ensure AOS doesn't cause flicker on mobile */
        [data-aos] {
          pointer-events: auto !important;
        }
          
          
          
      `}</style>
    </>
  );
};

export default ProjectsPage;