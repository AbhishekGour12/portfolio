import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Icons mapping using Font Awesome (since you're using it in your project)
const SkillIcon = ({ iconName, name, color }) => {
  const getIcon = () => {
    switch (iconName) {
      case 'javascript':
        return <i className="fab fa-js text-2xl" style={{ color: '#F7DF1E' }}></i>;
      case 'react':
        return <i className="fab fa-react text-2xl" style={{ color: '#61DAFB' }}></i>;
      case 'node':
        return <i className="fab fa-node-js text-2xl" style={{ color: '#68A063' }}></i>;
      case 'mongodb':
        return <i className="fas fa-database text-2xl" style={{ color: '#47A248' }}></i>;
      case 'firebase':
        return <i className="fas fa-fire text-2xl" style={{ color: '#FFCA28' }}></i>;
      case 'typescript':
        return <i className="fas fa-code text-2xl" style={{ color: '#007ACC' }}></i>;
      case 'php':
        return <i className="fab fa-php text-2xl" style={{ color: '#777BB4' }}></i>;
      case 'mysql':
        return <i className="fas fa-database text-2xl" style={{ color: '#4479A1' }}></i>;
      case 'tailwind':
        return <i className="fas fa-wind text-2xl" style={{ color: '#38B2AC' }}></i>;
      case 'bootstrap':
        return <i className="fab fa-bootstrap text-2xl" style={{ color: '#7952B3' }}></i>;
      default:
        return <i className="fas fa-code text-2xl text-orange-500"></i>;
    }
  };

  return getIcon();
};

const SkillsSection = ({ Profile1 }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  const skills = [
    { name: 'JavaScript', level: 95, icon: 'javascript', color: '#F7DF1E' },
    { name: 'React', level: 92, icon: 'react', color: '#61DAFB' },
    { name: 'Node.js', level: 88, icon: 'node', color: '#68A063' },
    { name: 'MongoDB', level: 85, icon: 'mongodb', color: '#47A248' },
    { name: 'Firebase', level: 82, icon: 'firebase', color: '#FFCA28' },
    { name: 'TypeScript', level: 87, icon: 'typescript', color: '#007ACC' },
    { name: 'PHP', level: 78, icon: 'php', color: '#777BB4' },
    { name: 'MySQL', level: 80, icon: 'mysql', color: '#4479A1' },
    { name: 'Tailwind CSS', level: 94, icon: 'tailwind', color: '#38B2AC' },
    { name: 'Bootstrap', level: 90, icon: 'bootstrap', color: '#7952B3' },
  ];

  const orbitSkills = skills.slice(0, 8);

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const ProgressBar = ({ skill, index }) => {
    const progressRef = useRef(null);
    const isProgressInView = useInView(progressRef, { once: true, amount: 0.5 });

    return (
      <motion.div
        ref={progressRef}
       // Helps with smooth layout transitions
        className="group mb-4 cursor-pointer relative transform-gpu"
        variants={itemVariants}
        // Removed AOS attributes from here to prevent layout flickering
        whileHover={{ 
  scale: 1.02,
  boxShadow: "0px 4px 20px rgba(249,115,22,0.2)"
  
}}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <SkillIcon iconName={skill.icon} />
            {skill.name}
          </span>
          <span className="text-sm font-semibold text-orange-400">
            {skill.level}%
          </span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-pink-500"
            initial={{ width: 0 }}
            animate={isProgressInView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ 
              duration: 1.5, 
              delay: index * 0.1, 
              ease: "easeOut" 
            }}
            style={{
              boxShadow: "0 0 10px rgba(249, 115, 22, 0.5)",
            }}
          />
        </div>
      </motion.div>
    );
  };
  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden"
      style={{ 
        backgroundColor: Profile1 === 'white' ? '#f8fafc' : '#0f172a',
      }}
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-pink-500/5" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0f172a] to-transparent" />
      
      {/* Animated gradient orbs - hidden on mobile */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 md:w-72 md:h-72 bg-orange-500/10 rounded-full blur-3xl hidden md:block"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-64 h-64 md:w-72 md:h-72 bg-pink-500/10 rounded-full blur-3xl hidden md:block"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
            Technical <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Skills</span>
          </h2>
          <motion.div
            className="w-16 md:w-20 h-1 mx-auto bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4"
          >
            Our expertise in modern technologies used to build scalable digital solutions.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left Column - Description and Progress Bars */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6 md:space-y-8 order-2 lg:order-1"
          >
            {/* Description with glassmorphism */}
            <motion.div
              variants={itemVariants}
              className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl"
              data-aos="fade-up"
            >
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                We specialize in building high-performance digital products using modern full-stack technologies including the MERN stack, cloud services, and mobile development frameworks. Our team delivers scalable, user-friendly, and AI-powered solutions that drive business growth.
              </p>
            </motion.div>

            {/* Progress Bars Container with max height and scroll on mobile if needed */}
           <div className="space-y-2 max-h-[400px] md:max-h-none overflow-y-auto md:overflow-visible pr-2 custom-scrollbar will-change-transform">
              {skills.map((skill, index) => (
                <ProgressBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Right Column - Interactive Skill Wheel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative flex justify-center items-center order-1 lg:order-2 mb-8 lg:mb-0"
            data-aos="zoom-in"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px]">
              {/* Rotating orbit ring - slower on mobile */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-gray-700"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: window.innerWidth < 768 ? 40 : 30, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              
              {/* Inner orbit ring */}
              <motion.div
                className="absolute inset-8 rounded-full border border-gray-800"
                animate={{ rotate: -360 }}
                transition={{ 
                  duration: window.innerWidth < 768 ? 30 : 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />

              {/* Center circle with glassmorphism */}
              <motion.div
                className="absolute inset-0 m-auto w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-2xl cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl">Skills</span>
              </motion.div>

              {/* Orbiting skill icons - adjusted for mobile */}
              {orbitSkills.map((skill, index) => {
                const angle = (index * 360) / orbitSkills.length;
                // Adjust radius based on screen size
                const getRadius = () => {
                  if (window.innerWidth < 640) return 100;
                  if (window.innerWidth < 768) return 120;
                  if (window.innerWidth < 1024) return 140;
                  return 150;
                };
                const radius = getRadius();
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <motion.div
                    key={skill.name}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      x: x - (window.innerWidth < 640 ? 16 : 20),
                      y: y - (window.innerWidth < 640 ? 16 : 20),
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  >
                    <motion.div
                      className="relative group"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-900 shadow-xl flex items-center justify-center border border-gray-700">
                        <SkillIcon iconName={skill.icon} />
                      </div>
                      
                      {/* Tooltip - hidden on very small screens */}
                      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none hidden sm:block">
                        <div className="font-medium">{skill.name}</div>
                        <div className="text-orange-400 text-center text-[10px]">{skill.level}%</div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Floating particles - hidden on mobile */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 hidden sm:block"
                  style={{
                    left: `${50 + Math.sin(i * 120) * 30}%`,
                    top: `${50 + Math.cos(i * 120) * 30}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f97316, #ec4899);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #fb923c, #f472b6);
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;