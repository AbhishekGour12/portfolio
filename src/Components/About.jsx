import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

// Icons (you can replace with your preferred icon library)
const Icons = {
  Web: () => <span className="text-3xl">🌐</span>,
  Mobile: () => <span className="text-3xl">📱</span>,
  Cloud: () => <span className="text-3xl">☁️</span>,
  AI: () => <span className="text-3xl">🤖</span>,
  Design: () => <span className="text-3xl">🎨</span>,
  Strategy: () => <span className="text-3xl">📊</span>,
  React: () => <span className="text-[#61DAFB]">⚛️</span>,
  Node: () => <span className="text-[#339933]">🟢</span>,
  MongoDB: () => <span className="text-[#47A248]">🍃</span>,
  Firebase: () => <span className="text-[#FFCA28]">🔥</span>,
  Python: () => <span className="text-[#3776AB]">🐍</span>,
  TensorFlow: () => <span className="text-[#FF6F00]">🧠</span>,
};

const About = ({ Profile1 }) => {
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Statistics data
  const stats = [
    { value: 20, label: "Projects Delivered", suffix: "+", icon: "🚀" },
    { value: 20, label: "Happy Clients", suffix: "+", icon: "😊" },
    { value: 5, label: "Years Experience", suffix: "+", icon: "⭐" },
    { value: 98, label: "Client Satisfaction", suffix: "%", icon: "💯" },
  ];

  // Services data
  const services = [
    {
      title: "Web Development",
      description: "Scalable, responsive web applications using modern frameworks",
      icon: Icons.Web,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile solutions",
      icon: Icons.Mobile,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment",
      icon: Icons.Cloud,
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "AI Integration",
      description: "Intelligent features powered by machine learning",
      icon: Icons.AI,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive user interfaces",
      icon: Icons.Design,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      title: "Digital Strategy",
      description: "Strategic planning for digital success",
      icon: Icons.Strategy,
      gradient: "from-indigo-500 to-blue-500",
    },
  ];

  // Technology stack
  const techStack = [
    { name: "React", icon: Icons.React },
    { name: "Node.js", icon: Icons.Node },
    { name: "MongoDB", icon: Icons.MongoDB },
    { name: "Firebase", icon: Icons.Firebase },
    { name: "Python", icon: Icons.Python },
    { name: "TensorFlow", icon: Icons.TensorFlow },
  ];

  // Why choose us points
  const whyChooseUs = [
    {
      title: "Expert Team",
      description: "Skilled developers, designers, and strategists",
      icon: "👥",
    },
    {
      title: "Proven Track Record",
      description: "50+ successful projects across industries",
      icon: "🏆",
    },
    {
      title: "Cutting-Edge Tech",
      description: "Modern tools and best practices",
      icon: "⚡",
    },
    {
      title: "Client-First Approach",
      description: "Your success is our priority",
      icon: "🤝",
    },
  ];

  return (
    <>
      <title>About Abhi Services | Digital Agency</title>
      <meta name="description" content="Abhi Services is a digital agency helping startups and businesses build scalable digital products through modern technologies and innovative design." />
      
      <div
        className="w-full min-h-screen transition-colors duration-500 overflow-hidden"
        style={{
          backgroundColor: Profile1 === "white" ? "#ffffff" : "#0a0a0f",
          color: Profile1 === "white" ? "#1a1a1a" : "#ffffff",
        }}
      >
        {/* Hero Section */}
        <section className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
              animate={{
                x: [0, -50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400">
                  About Abhi Services
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                We help startups and businesses build scalable digital products through 
                modern technologies and innovative design.
              </p>
            </motion.div>

            {/* Company Introduction */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600">
                    Who We Are
                  </span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-4">
                  We're a passionate team of developers, designers, and tech innovators 
                  committed to building custom web solutions that drive real results. 
                  Our mission is to empower businesses — from ambitious startups to 
                  growing enterprises — with scalable, high-performance, and beautifully 
                  designed digital products.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  With a focus on creativity, precision, and collaboration, we deliver 
                  solutions that don't just meet your goals — they elevate your brand 
                  in today's digital-first world.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="grid grid-cols-2 gap-4"
              >
                {/* Mission Card */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold mb-2 text-white">Our Mission</h3>
                  <p className="text-sm text-gray-400">
                    To deliver innovative digital solutions that drive growth and success 
                    for our clients.
                  </p>
                </div>

                {/* Vision Card */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-4">👁️</div>
                  <h3 className="text-xl font-bold mb-2 text-white">Our Vision</h3>
                  <p className="text-sm text-gray-400">
                    To be the leading digital agency known for innovation, quality, 
                    and client success.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section
          ref={statsRef}
          className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-orange-400">
                Our Impact in Numbers
              </span>
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-orange-400">
                    {statsInView && (
                      <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="text-sm md:text-base text-gray-400 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Our Services
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Comprehensive digital solutions tailored to your business needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden h-full">
                    {/* Gradient Background on Hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    
                    <div className="relative z-10">
                      <div className="mb-4">{service.icon()}</div>
                      <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                      <p className="text-gray-400">{service.description}</p>
                    </div>

                    {/* Animated Border */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(59,130,246,0)",
                          "0 0 20px 5px rgba(59,130,246,0.1)",
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
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-900/30 to-gray-800/30">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                Our Technology Stack
              </span>
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl mb-2">{tech.icon()}</div>
                  <div className="text-sm text-gray-400">{tech.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                Why Choose Abhi Services?
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 text-center"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl" />
          
          <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Ready to Start Your Project?
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's turn your ideas into reality. Get in touch with us today and 
                let's discuss how we can help your business grow.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to = "/Contact"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold text-lg"
                >
                  Start Your Project
                </Link>
                
                <motion.div
                  
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  <Link to = "/Services"> 
                  Explore Services
                  </Link>
                </motion.div>
              </div>

              <p className="mt-6 text-gray-400">
                <span className="font-semibold text-orange-400">Your vision, our craft</span> – let's build something amazing together.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;