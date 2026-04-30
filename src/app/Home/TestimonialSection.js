"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animated counters
  const projectsCount = useMotionValue(0);
  const satisfactionCount = useMotionValue(0);
  const industriesCount = useMotionValue(0);

  const projectsDisplay = useTransform(projectsCount, (latest) => `${Math.round(latest)}+`);
  const satisfactionDisplay = useTransform(satisfactionCount, (latest) => `${Math.round(latest)}%`);
  const industriesDisplay = useTransform(industriesCount, (latest) => `${Math.round(latest)}+`);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
    if (isInView) {
      animate(projectsCount, 20, { duration: 2, ease: "easeOut" });
      animate(satisfactionCount, 98, { duration: 2, ease: "easeOut" });
      animate(industriesCount, 8, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, projectsCount, satisfactionCount, industriesCount]);

  const testimonials = [
    {
      id: 1,
      name: "Ravi Shastri",
      role: "Founder",
      company: "MyAstrova",
      location: "Delhi NCR",
      text: "Working with Abhi Services on MyAstrova was excellent. He delivered a platform with seamless astrology consultation features, real-time chat, and payment integration. Our users love the clean interface.",
      rating: 5,
      gradient: "from-blue-500 to-indigo-500",
      initials: "RS",
    },
    {
      id: 2,
      name: "Prakash Mehta",
      role: "Director",
      company: "Mehta Distributors",
      location: "Mumbai",
      text: "SST Trader ERP streamlined our accounting process. Inventory management, GST invoices, and sales tracking are exactly what our distribution business needed. Saves us hours of manual work daily.",
      rating: 5,
      gradient: "from-indigo-500 to-purple-500",
      initials: "PM",
    },
    {
      id: 3,
      name: "Arjun Singh",
      role: "Owner",
      company: "Singh Dhaba",
      location: "Ludhiana",
      text: "Feastify transformed our restaurant's online presence. The ordering system is intuitive with real-time tracking. Admin panel makes menu management effortless. Online orders increased significantly.",
      rating: 5,
      gradient: "from-purple-500 to-pink-500",
      initials: "AS",
    },
    {
      id: 4,
      name: "Deepak Joshi",
      role: "Founder",
      company: "SkillRoot",
      location: "Pune",
      text: "SkillRoot made online learning engaging. Video lectures, quizzes, and resume generator work seamlessly. Abhishek's attention to educational needs made this project a success.",
      rating: 5,
      gradient: "from-pink-500 to-rose-500",
      initials: "DJ",
    },
    {
      id: 5,
      name: "Vikram Rathore",
      role: "Owner",
      company: "FitCore Gym",
      location: "Jaipur",
      text: "FitCore's website with membership management and growth analytics made gym administration simple. Clean UI attracts new members. Delivered exactly what we wanted on time.",
      rating: 5,
      gradient: "from-cyan-500 to-blue-500",
      initials: "VR",
    },
  ];

  const StarRating = ({ rating }) => (
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-blue-200 text-sm font-medium text-[#1E40AF] mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            What Our{" "}
            <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-3 text-base">
            Real stories from real people – building trust through results.
          </p>
        </div>

        {/* Horizontal Testimonial Carousel */}
        <div className="relative px-4 sm:px-8 md:px-12" data-aos="fade-up" data-aos-delay="100">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".testimonial-next",
              prevEl: ".testimonial-prev",
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2.5 },
              1280: { slidesPerView: 3 },
            }}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-blue-100/60 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                >
                  {/* Decorative quote */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition">
                    <Quote size={40} className="text-[#1E40AF]" />
                  </div>

                  {/* Rating */}
                  <StarRating rating={testimonial.rating} />

                  {/* Testimonial text */}
                  <div className="flex-1 overflow-y-auto mb-4 pr-1 custom-scrollbar">
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      “{testimonial.text}”
                    </p>
                  </div>

                  {/* Client Info */}
                  <div className="pt-4 border-t border-blue-100/60 mt-auto">
                    <div className="flex items-center gap-3">
                      {/* Gradient avatar */}
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white font-bold shadow-md`}
                      >
                        {testimonial.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 truncate">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-[#1E40AF] truncate">
                          {testimonial.role}, {testimonial.company}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation arrows */}
          <button className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 shadow-md hover:bg-[#1E40AF] hover:text-white transition-all z-20 flex items-center justify-center">
            <ChevronLeft size={20} className="text-[#1E40AF] group-hover:text-white" />
          </button>
          <button className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 shadow-md hover:bg-[#1E40AF] hover:text-white transition-all z-20 flex items-center justify-center">
            <ChevronRight size={20} className="text-[#1E40AF] group-hover:text-white" />
          </button>
        </div>

        {/* Stats counters */}
        <div className="flex flex-wrap justify-center gap-6 mt-16">
          {[
            { label: "Projects Delivered", value: projectsDisplay, suffix: "" },
            { label: "Client Satisfaction", value: satisfactionDisplay, suffix: "" },
            { label: "Industries Served", value: industriesDisplay, suffix: "" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 text-center min-w-[140px] border border-blue-100/50 shadow-sm"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#1E40AF]">
                <motion.span>{stat.value}</motion.span>
                {stat.suffix}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .testimonial-swiper {
          padding-bottom: 48px !important;
        }
        .testimonial-swiper .swiper-pagination-bullet {
          background: #1E40AF;
          opacity: 0.3;
          width: 6px;
          height: 6px;
          transition: all 0.3s ease;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 20px;
          border-radius: 10px;
          background: linear-gradient(to right, #1E40AF, #60A5FA);
        }
        .testimonial-swiper .swiper-slide {
          height: auto;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1E40AF;
          border-radius: 10px;
        }
        @media (max-width: 640px) {
          .testimonial-prev,
          .testimonial-next {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;