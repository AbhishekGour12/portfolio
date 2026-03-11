import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../Firebase";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const db = getDatabase(app);
        const projectsRef = ref(db, "projects/");
        const snapshot = await get(projectsRef);

        if (snapshot.exists()) {
          setProjects(Object.values(snapshot.val()));
        } else {
          // Sample Data
          setProjects([
            { 
              id: 1, 
              name: "E-Commerce Platform", 
              description: "A high-performance e-commerce solution with real-time inventory management, secure payments via Razorpay, and a sleek user interface with smooth animations.", 
              technologies: "MERN Stack | Tailwind CSS | Firebase Auth | Razorpay", 
              img: ["https://images.unsplash.com/photo-1557821552-17105176677c?w=600"], 
              link: "#", 
              github: "#" 
            },
            { 
              id: 2, 
              name: "Smart ERP System", 
              description: "Comprehensive SaaS-based ERP for schools and gyms featuring automated scheduling, billing, member tracking, and real-time notifications.", 
              technologies: "Next.js | Express | MongoDB | Tailwind | Clerk Auth", 
              img: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600"], 
              link: "#", 
              github: "#" 
            },
            { 
              id: 3, 
              name: "Astro-Connect Platform", 
              description: "Multi-astrologer platform with live video consultations via ZegoCloud, automated payment split, and comprehensive dashboard for astrologers.", 
              technologies: "React | Node.js | MongoDB | ZegoCloud | Firebase", 
              img: ["https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600"], 
              link: "#", 
              github: "#" 
            },
            { 
              id: 4, 
              name: "Feastify Food Delivery", 
              description: "Modern food delivery platform with real-time order tracking, multiple restaurant management, and intuitive admin panel.", 
              technologies: "React Native | Node.js | MongoDB | Socket.io", 
              img: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600"], 
              link: "#", 
              github: "#" 
            },
            { 
              id: 5, 
              name: "SkillRoot Learning", 
              description: "Interactive learning management system with video courses, quizzes, progress tracking, and certification generation.", 
              technologies: "Next.js | TypeScript | Prisma | PostgreSQL", 
              img: ["https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600"], 
              link: "#", 
              github: "#" 
            },
            { 
              id: 6, 
              name: "FitCore Gym Management", 
              description: "Complete gym management solution with member check-ins, class scheduling, trainer assignments, and payment tracking.", 
              technologies: "MERN Stack | Redux | Tailwind | Firebase", 
              img: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600"], 
              link: "#", 
              github: "#" 
            },
          ]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const ProjectCard = ({ project, index }) => {
    const isHovered = hoveredIndex === index;

    return (
      <div
        className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 flex flex-col w-full transition-all duration-500 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 overflow-hidden"
        style={{ minWidth: "300px", height: "400px" }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Image Section - Fixed Height */}
        <div className="relative h-40 w-full shrink-0 overflow-hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={isHovered ? { delay: 2500 } : false}
            loop={true}
            className="w-full h-full"
          >
            {project.img?.map((imgUrl, i) => (
              <SwiperSlide key={i}>
                <img
                  src={imgUrl}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10 opacity-60" />
          
          {/* Project number badge */}
          <span className="absolute top-2 right-2 z-20 text-xs font-mono text-white bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-slate-700">
            #{(index + 1).toString().padStart(2, '0')}
          </span>
        </div>

        {/* Content Section - Fixed height remaining */}
        <div className="p-4 flex flex-col flex-1">
          {/* Title */}
          <h3 className="text-base font-bold text-white mb-2 group-hover:text-orange-500 transition-colors line-clamp-1">
            {project.name}
          </h3>

          {/* Description - 2 lines only */}
          <p className="text-xs text-slate-400 mb-3 line-clamp-2">
            {project.description}
          </p>

          {/* Technology Stack - compact */}
          <div className="mb-3">
            <p className="text-[10px] uppercase tracking-wider text-orange-500/80 font-semibold mb-1">
              Tech Stack
            </p>
            <p className="text-xs text-slate-500 line-clamp-1">
              {project.technologies}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-auto">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 text-white text-xs font-medium text-center hover:scale-[1.02] transition-transform active:scale-95 shadow-lg shadow-orange-500/20"
            >
              Live
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-lg bg-slate-700 text-white text-xs font-medium text-center hover:bg-slate-600 transition-colors border border-slate-600"
            >
              Code
            </a>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center bg-slate-900">
        <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-400 font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Latest <span className="text-orange-500">Projects</span>
            </h2>
            <div className="h-1 w-16 bg-orange-500 mt-3 rounded-full"></div>
          </div>
          <p className="text-slate-400 max-w-md text-sm">
            Modern web applications built with cutting-edge technologies
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="project-swiper !pb-12  max-w-7xl"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.id || index}>
              <ProjectCard project={project} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .project-swiper {
          padding: 5px 5px 35px 5px;
        }
        .project-swiper .swiper-button-next,
        .project-swiper .swiper-button-prev {
          color: white !important;
          background: #f97316;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.3);
        }
        .project-swiper .swiper-button-next:after,
        .project-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: 900;
        }
        .project-swiper .swiper-pagination-bullet {
          background: #334155;
          opacity: 1;
          width: 6px;
          height: 6px;
        }
        .project-swiper .swiper-pagination-bullet-active {
          background: #f97316 !important;
          width: 20px;
          border-radius: 3px;
        }
        .project-swiper .swiper-slide {
          height: auto;
        }
        @media (max-width: 640px) {
          .project-swiper .swiper-button-next,
          .project-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectSection;