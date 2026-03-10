import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Services = ({ Profile1 }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });

    // Update meta tags for SEO
    document.title = "Abhi Services | Digital Solutions for Modern Businesses";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore our comprehensive digital services including web development, mobile apps, UI/UX design, AI integration, and more. We help businesses scale with modern technology.");
    }
  }, []);

  const themeColors = {
    background: Profile1 === "white" ? "#ffffff" : "#0a0a0f",
    text: Profile1 === "white" ? "#1a1a1a" : "#ffffff",
    cardBg: Profile1 === "white" ? "bg-white/80" : "bg-white/5",
    borderColor: Profile1 === "white" ? "border-gray-200" : "border-white/10",
    textMuted: Profile1 === "white" ? "text-gray-600" : "text-gray-400",
    cardShadow: Profile1 === "white" ? "shadow-xl" : "shadow-2xl",
  };

  // Services data
  const services = [
    {
      icon: "🌐",
      title: "Web Development",
      description: "Custom websites and scalable web applications using modern frameworks like React, Next.js, and Node.js.",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Responsive Design", "Performance Optimized", "SEO Friendly"]
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for Android and iOS with smooth performance and intuitive UI.",
      gradient: "from-purple-500 to-pink-500",
      features: ["Cross-platform", "Native Performance", "App Store Ready"]
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Modern, user-friendly interface and experience design that engages users and drives conversions.",
      gradient: "from-pink-500 to-rose-500",
      features: ["User Research", "Wireframing", "Interactive Prototypes"]
    },
    {
      icon: "🛒",
      title: "E-Commerce Development",
      description: "Online stores with payment integration, product management, and seamless shopping experiences.",
      gradient: "from-green-500 to-emerald-500",
      features: ["Payment Integration", "Inventory Management", "Secure Checkout"]
    },
    {
      icon: "🤖",
      title: "AI Integration",
      description: "Adding intelligent features using AI and automation to enhance user experience and business efficiency.",
      gradient: "from-orange-500 to-red-500",
      features: ["Machine Learning", "Chatbots", "Data Analytics"]
    },
    {
      icon: "🚀",
      title: "Website Deployment",
      description: "Professional hosting, deployment, and server setup with optimal performance and security.",
      gradient: "from-indigo-500 to-blue-500",
      features: ["Cloud Hosting", "SSL Setup", "CI/CD Pipeline"]
    },
    {
      icon: "⚙️",
      title: "Maintenance & Support",
      description: "Ongoing updates, security patches, performance optimization, and technical support.",
      gradient: "from-yellow-500 to-orange-500",
      features: ["24/7 Monitoring", "Regular Updates", "Security Patches"]
    },
    {
      icon: "📊",
      title: "Digital Strategy",
      description: "Strategic planning and consulting to help your business leverage technology for growth.",
      gradient: "from-teal-500 to-cyan-500",
      features: ["Market Analysis", "Tech Stack Planning", "Growth Strategy"]
    }
  ];

  // Technology stack data
  const techStack = [
    { name: "React", icon: "⚛️", color: "#61DAFB", level: 95 },
    { name: "Node.js", icon: "🟢", color: "#339933", level: 90 },
    { name: "Express", icon: "🚂", color: "#000000", level: 88 },
    { name: "MongoDB", icon: "🍃", color: "#47A248", level: 85 },
    { name: "Firebase", icon: "🔥", color: "#FFCA28", level: 82 },
    { name: "Tailwind CSS", icon: "🎨", color: "#06B6D4", level: 95 },
    { name: "MySQL", icon: "🐬", color: "#4479A1", level: 75 },
    { name: "AI Tools", icon: "🤖", color: "#FF6F00", level: 70 },
    { name: "TypeScript", icon: "📘", color: "#3178C6", level: 85 },
    { name: "Next.js", icon: "▲", color: "#000000", level: 90 },
  ];

  // Process steps
  const processSteps = [
    {
      icon: "💡",
      title: "Idea & Discussion",
      description: "We discuss your vision, requirements, and goals to understand your project needs.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "✏️",
      title: "Design & Planning",
      description: "We create wireframes, prototypes, and plan the technical architecture.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "💻",
      title: "Development",
      description: "Our team builds your product using modern technologies and best practices.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: "🧪",
      title: "Testing & Optimization",
      description: "Rigorous testing and performance optimization for a flawless experience.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: "🚀",
      title: "Launch & Support",
      description: "We deploy your product and provide ongoing support and maintenance.",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  // Why choose us data
  const whyChooseUs = [
    {
      icon: "👥",
      title: "Experienced Developers",
      description: "5+ years of experience building scalable solutions for startups and enterprises.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "⚡",
      title: "Modern Tech Stack",
      description: "We use cutting-edge technologies to ensure high performance and scalability.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "🚀",
      title: "Fast Delivery",
      description: "Agile methodology ensures quick turnaround without compromising quality.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: "🏗️",
      title: "Scalable Architecture",
      description: "Built to grow with your business, handling increased traffic and features.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: "🤝",
      title: "Reliable Support",
      description: "Dedicated support team available 24/7 for maintenance and assistance.",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Abhi Services | Digital Solutions for Modern Businesses</title>
      <meta name="description" content="Explore our comprehensive digital services including web development, mobile apps, UI/UX design, AI integration, and more. We help businesses scale with modern technology." />
      
      <div
        className="w-full min-h-screen transition-colors duration-500 overflow-hidden"
        style={{
          backgroundColor: themeColors.background,
          color: themeColors.text,
        }}
      >
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
         <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%239C92AC%27 fill-opacity=%270.05%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center justify-center px-4 pt-20">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ y: y1 }}
              >
                {/* Badge */}
                <motion.div
                  className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm mb-8"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                  <span className="text-sm font-medium text-gray-300">Our Services</span>
                </motion.div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400">
                    Our Services
                  </span>
                </h1>

                <motion.h2
                  className="text-2xl md:text-3xl lg:text-4xl font-light mb-6 max-w-4xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Powerful digital solutions designed to help businesses grow and scale.
                </motion.h2>

                <motion.p
                  className={`text-lg md:text-xl ${themeColors.textMuted} max-w-3xl mx-auto mb-10`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  We help startups and businesses build scalable digital products through 
                  innovative design, cutting-edge technology, and strategic thinking.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-wrap gap-4 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold overflow-hidden"
                    >
                      <span className="relative z-10">Start Your Project</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
                        initial={{ x: "100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </Link>

                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-all"
                    >
                      Contact Us
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Main Services Section */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    What We Offer
                  </span>
                </h2>
                <p className={`text-lg ${themeColors.textMuted} max-w-2xl mx-auto`}>
                  Comprehensive digital solutions tailored to your business needs
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.2 }
                    }}
                    onHoverStart={() => setHoveredCard(index)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="group relative"
                  >
                    <div className={`relative backdrop-blur-xl ${themeColors.cardBg} border ${themeColors.borderColor} rounded-2xl p-6 overflow-hidden h-full ${themeColors.cardShadow}`}>
                      {/* Gradient Background on Hover */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      />
                      
                      {/* Icon with Animation */}
                      <motion.div
                        className="text-5xl mb-4"
                        animate={{
                          rotate: hoveredCard === index ? [0, 10, -10, 0] : 0,
                          scale: hoveredCard === index ? [1, 1.1, 1] : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {service.icon}
                      </motion.div>
                      
                      <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                      <p className={`${themeColors.textMuted} mb-4 text-sm`}>
                        {service.description}
                      </p>
                      
                      {/* Features List */}
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + i * 0.1 }}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                            <span className={themeColors.textMuted}>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Animated Border */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20"
                        animate={{
                          boxShadow: hoveredCard === index 
                            ? "0 0 30px 5px rgba(59,130,246,0.3)" 
                            : "0 0 0 0 rgba(59,130,246,0)",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Technology Stack Section */}
          <section className={`py-20 px-4 ${themeColors.cardBg} backdrop-blur-sm`}>
            <div className="max-w-7xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-center mb-12"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                  Our Technology Stack
                </span>
              </motion.h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative group"
                  >
                    <div className={`flex flex-col items-center p-6 rounded-xl backdrop-blur-xl ${themeColors.cardBg} border ${themeColors.borderColor}`}>
                      <div 
                        className="text-4xl mb-3"
                        style={{ color: tech.color }}
                      >
                        {tech.icon}
                      </div>
                      <h3 className="font-semibold text-white mb-2">{tech.name}</h3>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r from-${tech.color} to-${tech.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          style={{ backgroundColor: tech.color }}
                        />
                      </div>
                      <span className={`text-xs ${themeColors.textMuted}`}>{tech.level}%</span>
                    </div>
                    
                    {/* Hover Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20"
                      animate={{
                        boxShadow: `0 0 30px ${tech.color}`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-center mb-4"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600">
                  How We Work
                </span>
              </motion.h2>
              <p className={`text-lg ${themeColors.textMuted} text-center max-w-2xl mx-auto mb-12`}>
                A streamlined process that ensures quality and transparency
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    {/* Connector Line */}
                    {index < processSteps.length - 1 && (
                      <motion.div
                        className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      />
                    )}
                    
                    <div className={`relative backdrop-blur-xl ${themeColors.cardBg} border ${themeColors.borderColor} rounded-xl p-6 text-center h-full`}>
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 rounded-xl`}
                      />
                      
                      {/* Step Number */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      
                      <motion.div
                        className="text-4xl mb-3"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: index * 0.5,
                        }}
                      >
                        {step.icon}
                      </motion.div>
                      
                      <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
                      <p className={`text-sm ${themeColors.textMuted}`}>{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className={`py-20 px-4 ${themeColors.cardBg} backdrop-blur-sm`}>
            <div className="max-w-7xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-center mb-12"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Why Choose Abhi Services?
                </span>
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className={`relative backdrop-blur-xl ${themeColors.cardBg} border ${themeColors.borderColor} rounded-xl p-6 overflow-hidden group`}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                    />
                    
                    <div className="relative z-10">
                      <motion.div
                        className="text-4xl mb-4"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        {item.icon}
                      </motion.div>
                      
                      <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                      <p className={themeColors.textMuted}>{item.description}</p>
                    </div>

                    {/* Animated Border */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/20"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(59,130,246,0)",
                          "0 0 20px 5px rgba(59,130,246,0.2)",
                          "0 0 0 0 rgba(59,130,246,0)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Call To Action Section */}
          <section className="py-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl" />
            
            <div className="relative max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className={`backdrop-blur-xl ${themeColors.cardBg} border ${themeColors.borderColor} rounded-3xl p-8 md:p-12`}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Have an idea for your next project?
                  </span>
                </h2>
                
                <p className={`text-lg md:text-xl ${themeColors.textMuted} mb-8 max-w-2xl mx-auto`}>
                  Let's build something amazing together. Get in touch with us today and 
                  let's discuss how we can bring your vision to life.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold text-lg"
                    >
                      Start Your Project
                    </motion.button>
                  </Link>
                  
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white font-semibold text-lg hover:bg-white/10 transition-all"
                    >
                      Contact Us
                    </motion.button>
                  </Link>
                </div>

                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-600 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, Math.random() * 40 - 20],
                      x: [0, Math.random() * 40 - 20],
                      opacity: [0.7, 0.4, 0.7],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Services;