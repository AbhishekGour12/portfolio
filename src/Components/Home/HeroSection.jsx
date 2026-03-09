import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// Tech stack icons (you can replace with actual icon components)
const TechIcons = {
  React: () => <span className="text-[#61DAFB]">⚛️</span>,
  Node: () => <span className="text-[#339933]">🟢</span>,
  Python: () => <span className="text-[#3776AB]">🐍</span>,
  AWS: () => <span className="text-[#FF9900]">☁️</span>,
  Docker: () => <span className="text-[#2496ED]">🐳</span>,
  GraphQL: () => <span className="text-[#E10098]">◈</span>,
};

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Statistics data with animations
  const stats = [
    { value: '20+', label: 'Projects Delivered', delay: 0.8 },
    { value: '98%', label: 'Client Satisfaction', delay: 1.0 },
    { value: '24/7', label: 'Support Available', delay: 1.2 },
  ];

  // Services data
  const services = [
    { title: 'Web Development', icon: '🌐', color: 'from-blue-500 to-cyan-500' },
    { title: 'Mobile Apps', icon: '📱', color: 'from-purple-500 to-pink-500' },
    { title: 'Cloud Solutions', icon: '☁️', color: 'from-orange-500 to-red-500' },
    { title: 'AI Integration', icon: '🤖', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Content */}
          <motion.div
            className="space-y-6 lg:space-y-8 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ y: y1 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
              <span className="text-xs lg:text-sm font-medium text-gray-300">Available for new projects</span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-3 lg:space-y-4">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400">
                  Digital Agency
                </span>
                <br />
                <span className="text-white">For Modern</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600">
                  Businesses
                </span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                We transform ideas into powerful digital solutions. 
                From web apps to AI integration, we build what's next.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold overflow-hidden text-sm sm:text-base"
              >
                <a href="#contact" className="block relative z-10">
                  Start Your Project
                </a>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <Link to="/Project" className="block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-all text-sm sm:text-base w-full sm:w-auto"
                >
                  View Our Work
                </motion.button>
              </Link>
            </motion.div>

            {/* Tech Stack Icons */}
            <motion.div
              className="pt-4 lg:pt-6 space-y-3 lg:space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-xs lg:text-sm font-medium text-gray-400 uppercase tracking-wider">
                Trusted Tech Stack
              </p>
              <div className="flex flex-wrap gap-4 lg:gap-6">
                {Object.entries(TechIcons).map(([name, Icon], index) => (
                  <motion.div
                    key={name}
                    className="group relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="text-2xl lg:text-3xl filter drop-shadow-lg">
                      <Icon />
                    </div>
                    <motion.div
                      className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] lg:text-xs text-gray-400 opacity-0 group-hover:opacity-100 whitespace-nowrap"
                      initial={{ y: -5 }}
                      whileHover={{ y: 0 }}
                    >
                      {name}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Statistics */}
            <motion.div
              className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 pt-4 lg:pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: stat.delay }}
                >
                  <motion.div
                    className="text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-orange-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: stat.delay + 0.3,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Glassmorphism Cards */}
          <motion.div
            className="relative mt-8 lg:mt-0"
            style={{ y: y2 }}
          >
            {/* Background blur layer to ensure text visibility */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-transparent backdrop-blur-[2px] rounded-3xl z-0" />
            
            <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Glass Card */}
                  <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 overflow-hidden">
                    {/* Gradient Overlay */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <motion.div
                        className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4"
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: index * 0.5,
                        }}
                      >
                        {service.icon}
                      </motion.div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-1 sm:mb-2">
                        {service.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs lg:text-sm text-gray-300">
                        Enterprise solutions
                      </p>
                    </div>

                    {/* Animated Border */}
                    <motion.div
                      className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/10 group-hover:border-white/30"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(59,130,246,0)",
                          "0 0 15px 2px rgba(59,130,246,0.2)",
                          "0 0 0 0 rgba(59,130,246,0)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Center Showcase Card - Repositioned to not block content */}
            <motion.div
              className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 backdrop-blur-xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-white/30 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 1,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl">🚀</span>
            </motion.div>

            {/* Secondary floating element */}
            <motion.div
              className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 backdrop-blur-xl bg-gradient-to-r from-orange-500/30 to-pink-500/30 border border-white/30 rounded-lg sm:rounded-xl flex items-center justify-center shadow-2xl"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 1.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <span className="text-xl sm:text-2xl lg:text-3xl">⚡</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-white/20 flex justify-center">
          <motion.div
            className="w-1 h-2 sm:h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;