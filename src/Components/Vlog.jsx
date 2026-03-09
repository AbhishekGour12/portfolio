import { Link } from "react-router-dom";
import { app } from "./Firebase";
import { get, ref, getDatabase } from "firebase/database";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// Icons mapping for tech stack
const TechIcons = {
  React: { icon: "⚛️", color: "#61DAFB" },
  "Node.js": { icon: "🟢", color: "#339933" },
  MongoDB: { icon: "🍃", color: "#47A248" },
  Express: { icon: "🚂", color: "#000000" },
  Firebase: { icon: "🔥", color: "#FFCA28" },
  "Tailwind CSS": { icon: "🎨", color: "#06B6D4" },
  MySQL: { icon: "🐬", color: "#4479A1" },
  "AI Tools": { icon: "🤖", color: "#FF6F00" },
  TypeScript: { icon: "📘", color: "#3178C6" },
  "Next.js": { icon: "▲", color: "#000000" },
};

function Vlog({ Profile1 }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    AOS.init({ 
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });

    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dataRef = ref(db, "projects/");
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
          setProjects(Object.values(snapshot.val()));
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const themeColors = {
    background: Profile1 === "white" ? "#ffffff" : "#0a0a0f",
    text: Profile1 === "white" ? "#1a1a1a" : "#ffffff",
    cardBg: Profile1 === "white" ? "bg-white/80" : "bg-white/5",
    borderColor: Profile1 === "white" ? "border-gray-200" : "border-white/10",
    textMuted: Profile1 === "white" ? "text-gray-600" : "text-gray-400",
  };

  // Services data
  const services = [
    {
      icon: "🌐",
      title: "Web Development",
      description: "Scalable, responsive web applications using modern frameworks",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile solutions",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Beautiful, intuitive user interfaces",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: "🛒",
      title: "E-commerce Development",
      description: "Custom online stores with powerful features",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: "🤖",
      title: "AI Integration",
      description: "Intelligent features powered by machine learning",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: "🚀",
      title: "Deployment & Maintenance",
      description: "Seamless deployment and ongoing support",
      gradient: "from-indigo-500 to-blue-500",
    },
  ];

  // Tech stack data
  const techStack = [
    { name: "React", icon: "⚛️", color: "#61DAFB", level: 95 },
    { name: "Node.js", icon: "🟢", color: "#339933", level: 90 },
    { name: "MongoDB", icon: "🍃", color: "#47A248", level: 85 },
    { name: "Express", icon: "🚂", color: "#000000", level: 88 },
    { name: "Firebase", icon: "🔥", color: "#FFCA28", level: 82 },
    { name: "Tailwind CSS", icon: "🎨", color: "#06B6D4", level: 95 },
    { name: "MySQL", icon: "🐬", color: "#4479A1", level: 75 },
    { name: "AI Tools", icon: "🤖", color: "#FF6F00", level: 70 },
  ];

  // Statistics data
  const statistics = [
    { value: 50, label: "Projects Delivered", suffix: "+", icon: "🚀" },
    { value: 30, label: "Happy Clients", suffix: "+", icon: "😊" },
    { value: 5, label: "Years Experience", suffix: "+", icon: "⭐" },
    { value: 100, label: "Client Satisfaction", suffix: "%", icon: "💯" },
  ];

  // Why choose us data
  const whyChooseUs = [
    {
      icon: "⚡",
      title: "Fast Delivery",
      description: "Agile methodology for quick turnaround",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: "✨",
      title: "Clean Code",
      description: "Maintainable, scalable, and efficient code",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "🏗️",
      title: "Scalable Architecture",
      description: "Built to grow with your business",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "🤝",
      title: "Long-term Support",
      description: "Dedicated support and maintenance",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  // Social media links
  const socialLinks = [
    { icon: "github", url: "https://github.com/yourusername", label: "GitHub" },
    { icon: "linkedin", url: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: "instagram", url: "https://instagram.com/yourusername", label: "Instagram" },
    { icon: "whatsapp", url: "https://wa.me/yournumber", label: "WhatsApp" },
  ];

  return (
    <>
      <title>Abhi Services - Digital Agency</title>
      <meta name="description" content="Abhi Services helps startups and businesses build scalable digital products through modern technologies and innovative design." />
      
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
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
          }} />
        </div>

        {/* Enhanced Social Media Sidebar */}
        <motion.div 
          className="fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-50"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              whileHover={{ scale: 1.2, x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="relative">
                <i className={`fa-brands fa-${social.icon} text-2xl text-orange-400 hover:text-orange-500 transition-colors`} />
                <motion.div
                  className="absolute -inset-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
              <span className="absolute left-full ml-2 px-2 py-1 bg-orange-500 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                {social.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
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
                  <span className="text-sm font-medium text-gray-300">Welcome to Abhi Services</span>
                </motion.div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400">
                    Abhi Services
                  </span>
                </h1>

                <motion.h2
                  className="text-2xl md:text-3xl lg:text-4xl font-light mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Building Powerful Digital Solutions
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600 font-semibold">
                    for Modern Businesses
                  </span>
                </motion.h2>

                <motion.p
                  className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  We transform ideas into powerful digital products through innovative design, 
                  cutting-edge technology, and strategic thinking.
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

                  <Link to="/portfolio">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-all"
                    >
                      View Portfolio
                    </motion.button>
                  </Link>

                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-xl transition-all"
                    >
                      Contact Us
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Floating Tech Icons */}
                <motion.div
                  className="flex flex-wrap justify-center gap-6 mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {Object.entries(TechIcons).slice(0, 6).map(([name, data], index) => (
                    <motion.div
                      key={name}
                      className="relative group"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.2,
                      }}
                    >
                      <div 
                        className="text-3xl md:text-4xl cursor-pointer hover:scale-125 transition-transform"
                        style={{ color: data.color }}
                      >
                        {data.icon}
                      </div>
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        {name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Services Section */}
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
                    Our Services
                  </span>
                </h2>
                <p className={`text-lg ${themeColors.textMuted} max-w-2xl mx-auto`}>
                  Comprehensive digital solutions tailored to your business needs
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    className="group relative"
                  >
                    <div className={`relative backdrop-blur-xl ${themeColors.cardBg} border ${themeColors.borderColor} rounded-2xl p-6 overflow-hidden h-full`}>
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      />
                      
                      <div className="relative z-10">
                        <motion.div
                          className="text-4xl mb-4"
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
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
                        <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                        <p className={themeColors.textMuted}>{service.description}</p>
                      </div>

                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20"
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

          {/* Expertise / Tech Stack Section */}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4"
                  >
                    <div 
                      className="text-3xl w-12"
                      style={{ color: tech.color }}
                    >
                      {tech.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{tech.name}</span>
                        <span className={themeColors.textMuted}>{tech.level}%</span>
                      </div>
                      <div className={`w-full ${Profile1 === "white" ? "bg-gray-200" : "bg-gray-700"} rounded-full h-2 overflow-hidden`}>
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${services[index % services.length].gradient}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {statistics.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="text-center"
                  >
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <motion.div
                      className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-orange-400"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                    >
                      {stat.value}{stat.suffix}
                    </motion.div>
                    <div className={`text-sm md:text-base ${themeColors.textMuted} mt-2`}>
                      {stat.label}
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
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className={`relative backdrop-blur-xl ${themeColors.cardBg} border ${themeColors.borderColor} rounded-xl p-6 text-center overflow-hidden group`}
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
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h3 className={`text-lg font-semibold ${themeColors.textMuted} mb-2`}>Our Portfolio</h3>
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600">
                    Recent Projects
                  </span>
                </h2>
              </motion.div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <motion.div
                    className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="group relative rounded-2xl overflow-hidden"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <motion.img
                          src={project.img[0] || project.img[1]}
                          alt={project.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        
                        {/* Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                        
                        {/* Project Info */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 p-6"
                          initial={{ y: 100 }}
                          whileHover={{ y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                          {project.category && (
                            <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs rounded-full mb-3">
                              {project.category}
                            </span>
                          )}
                          <motion.a
                            href={project.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            View Project <span>→</span>
                          </motion.a>
                        </motion.div>
                      </div>

                      {/* Gradient Border */}
                      <motion.div
                        className="absolute inset-0 border-2 border-transparent rounded-2xl"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(249,115,22,0)",
                            "0 0 30px 5px rgba(249,115,22,0.3)",
                            "0 0 0 0 rgba(249,115,22,0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl" />
            
            <div className="relative max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className={`backdrop-blur-xl ${themeColors.cardBg} border ${themeColors.borderColor} rounded-3xl p-8 md:p-12`}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Ready to Start Your Project?
                  </span>
                </h2>
                <p className={`text-lg md:text-xl ${themeColors.textMuted} mb-8 max-w-2xl mx-auto`}>
                  Let's turn your ideas into reality. Get in touch with us today and 
                  let's discuss how we can help your business grow.
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
                  
                  <Link to="/services">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white font-semibold text-lg hover:bg-white/10 transition-all"
                    >
                      Explore Services
                    </motion.button>
                  </Link>
                </div>

                <p className={`mt-6 ${themeColors.textMuted}`}>
                  <span className="font-semibold text-orange-400">Your vision, our craft</span> – let's build something amazing together.
                </p>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Vlog;