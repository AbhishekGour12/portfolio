import React, { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TestimonialsSection = ({ Profile1 }) => {
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
    if (isInView) {
      animate(projectsCount, 20, { duration: 2, ease: "easeOut" });
      animate(satisfactionCount, 100, { duration: 2, ease: "easeOut" });
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
      color: "from-orange-500 to-pink-600",
      initials: "RS"
    },
    {
      id: 2,
      name: "Prakash Mehta",
      role: "Director",
      company: "Mehta Distributors",
      location: "Mumbai",
      text: "SST Trader ERP streamlined our accounting process. Inventory management, GST invoices, and sales tracking are exactly what our distribution business needed. Saves us hours of manual work daily.",
      rating: 5,
      color: "from-blue-500 to-purple-600",
      initials: "PM"
    },
    {
      id: 3,
      name: "Arjun Singh",
      role: "Owner",
      company: "Singh Dhaba",
      location: "Ludhiana",
      text: "Feastify transformed our restaurant's online presence. The ordering system is intuitive with real-time tracking. Admin panel makes menu management effortless. Online orders increased significantly.",
      rating: 5,
      color: "from-green-500 to-emerald-600",
      initials: "AS"
    },
    {
      id: 4,
      name: "Deepak Joshi",
      role: "Founder",
      company: "SkillRoot",
      location: "Pune",
      text: "SkillRoot made online learning engaging. Video lectures, quizzes, and resume generator work seamlessly. Abhishek's attention to educational needs made this project a success.",
      rating: 5,
      color: "from-purple-500 to-indigo-600",
      initials: "DJ"
    },
    {
      id: 5,
      name: "Vikram Rathore",
      role: "Owner",
      company: "FitCore Gym",
      location: "Jaipur",
      text: "FitCore's website with membership management and growth analytics made gym administration simple. Clean UI attracts new members. Delivered exactly what we wanted on time.",
      rating: 5,
      color: "from-red-500 to-orange-600",
      initials: "VR"
    }
  ];

  // Star component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <i 
            key={i} 
            className={`fas fa-star ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
          ></i>
        ))}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-900"
    >
      {/* Animated background blobs - subtle */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Client{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto px-4">
            What our clients say about working with us
          </p>
          
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Testimonials Slider */}
        <div className="relative px-4 sm:px-8 md:px-12">
          <Swiper
            modules={[EffectCards, Navigation, Pagination, Autoplay]}
            effect="cards"
            grabCursor={true}
            loop={true}
            navigation={{
              nextEl: '.testimonial-next',
              prevEl: '.testimonial-prev',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            cardsEffect={{
              perSlideOffset: 8,
              perSlideRotate: 3,
              rotate: true,
              slideShadows: false,
            }}
            autoplay={{ 
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            centeredSlides={true}
            className="testimonial-swiper"
            style={{
              maxWidth: '100%',
              margin: '0 auto',
              padding: '10px 0 40px 0'
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-700 shadow-xl min-h-[380px] sm:min-h-[360px] flex flex-col">
                  
                  {/* Quote icon - subtle background */}
                  <Quote className="absolute top-4 right-4 w-12 h-12 text-slate-700/30" />

                  {/* Rating */}
                  <StarRating rating={testimonial.rating} />

                  {/* Testimonial Text - scrollable if needed */}
                  <div className="flex-1 overflow-y-auto mb-4 pr-1 custom-scrollbar">
                    <p className="text-sm sm:text-base text-white leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Client Info - fixed at bottom */}
                  <div className="pt-4 border-t border-slate-700 mt-auto">
                    <div className="flex items-center">
                      {/* Avatar */}
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0 shadow-lg`}>
                        {testimonial.initials}
                      </div>
                      
                      {/* Client Details */}
                      <div className="ml-3 flex-1 min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base text-white truncate">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-orange-400 truncate">
                          {testimonial.role}, {testimonial.company}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {testimonial.location}
                        </p>
                      </div>
                      
                      {/* Domain Badge */}
                      <div className="ml-2 flex-shrink-0 hidden sm:block">
                        <span className="text-[10px] px-2 py-1 bg-slate-700/50 text-slate-300 rounded-full border border-slate-600">
                          {testimonial.company.toLowerCase()}.com
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows - hidden on mobile */}
          <button className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 shadow-lg hover:scale-110 transition-all duration-300 z-20 flex items-center justify-center border border-slate-700 hidden md:flex">
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>
          <button className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 shadow-lg hover:scale-110 transition-all duration-300 z-20 flex items-center justify-center border border-slate-700 hidden md:flex">
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              <motion.span>{projectsDisplay}</motion.span>
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">
              Projects Delivered
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              <motion.span>{satisfactionDisplay}</motion.span>
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">
              Client Satisfaction
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-center"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              <motion.span>{industriesDisplay}</motion.span>
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">
              Industries Served
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .testimonial-swiper {
          padding-bottom: 40px !important;
        }
        .testimonial-swiper .swiper-pagination-bullet {
          background: #f97316;
          opacity: 0.3;
          width: 6px;
          height: 6px;
          transition: all 0.3s ease;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 20px;
          border-radius: 10px;
          background: linear-gradient(to right, #f97316, #ec4899);
        }
        .testimonial-swiper .swiper-slide {
          height: auto;
          transition: all 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 10px;
        }
        @media (max-width: 640px) {
          .testimonial-swiper {
            padding-left: 5px;
            padding-right: 5px;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;