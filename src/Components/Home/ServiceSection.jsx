import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const ServiceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      icon: "fa-solid fa-code",
      title: "Web Development",
      desc: "Modern web apps using React, Node.js and MERN stack.",
      color: "from-blue-500 to-cyan-500",
      delay: 0.1,
    },
    {
      icon: "fa-solid fa-mobile-screen-button",
      title: "Mobile Apps",
      desc: "Cross-platform mobile apps using React Native.",
      color: "from-purple-500 to-pink-500",
      delay: 0.2,
    },
    {
      icon: "fa-solid fa-paint-brush",
      title: "UI / UX Design",
      desc: "Beautiful and user-friendly interface designs.",
      color: "from-orange-500 to-red-500",
      delay: 0.3,
    },
    {
      icon: "fa-solid fa-cloud",
      title: "Cloud & Deployment",
      desc: "Secure cloud hosting and CI/CD deployments.",
      color: "from-green-500 to-emerald-500",
      delay: 0.4,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 sm:px-6 bg-slate-900 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-0 -left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
            <span className="text-sm font-medium text-orange-400">What We Offer</span>
          </motion.div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>

          {/* Animated underline */}
          <motion.div
            className="w-20 h-1 mx-auto bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: 80 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-slate-400 mt-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            Solutions designed to help businesses build scalable digital
            products that drive growth and engage users.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 20 }
              }}
              className="group relative"
            >
              {/* Gradient glow effect */}
              <div 
                className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"
                style={{
                  background: `linear-gradient(135deg, ${service.color.split(' ')[0].replace('from-', '')}, ${service.color.split(' ')[1].replace('to-', '')})`,
                }}
              />

              {/* Card */}
              <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-transparent group-hover:bg-slate-800">
                
                {/* Icon Container */}
                <div className="relative mb-5">
                  <div className="absolute inset-0 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${service.color.split(' ')[0].replace('from-', '')}, ${service.color.split(' ')[1].replace('to-', '')})`,
                    }}
                  />
                  <div
                    className={`relative w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <i className={`${service.icon} text-white text-xl`}></i>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                  {service.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {service.desc}
                </p>

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center">
                    <i className="fa-solid fa-arrow-right text-white text-xs"></i>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-16"
        >
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View All Services
                <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
              </span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ opacity: 0.2 }}
              />
            </motion.button>
          </Link>

          {/* Trust indicators */}
          <div className="flex justify-center items-center gap-6 mt-8 text-slate-500 text-sm">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-rocket text-orange-400"></i>
              50+ Projects
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-users text-pink-400"></i>
              30+ Clients
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-clock text-orange-400"></i>
              24/7 Support
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSection;