// Vlog.tsx
import { Link } from "react-router-dom";
import { app } from "./Firebase";
import { get, ref, getDatabase } from "firebase/database";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

function Vlog({ Profile1 }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const fetchData = async () => {
      const db = getDatabase(app);
      const dataRef = ref(db, "projects/");
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        setData(Object.values(snapshot.val()));
      }
    };
    fetchData();
  }, []);

  const themeColors = {
    background: Profile1 === "white" ? "white" : "black",
    text: Profile1 === "white" ? "black" : "white",
    progressBg: Profile1 === "white" ? "bg-gray-300" : "bg-gray-600",
    barColor: "bg-orange-400",
    expertiseBg: Profile1 === "white" ? "bg-yellow-100" : "bg-gray-800",
    skillText: Profile1 === "white" ? "text-black" : "text-white",
  };

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: themeColors.background, color: themeColors.text }}>
      {/* Sidebar */}
      <div className="fixed left-0 top-60 h-screen flex flex-col items-center gap-3 pt-5 w-12 z-50">
        {["github", "linkedin", "facebook", "instagram", "whatsapp"].map((icon, index) => (
          <i key={index} className={`fa-brands fa-${icon} text-2xl text-orange-400`} data-aos="fade-down" />
        ))}
      </div>

      {/* Hero Section */}
      <section className="flex justify-center items-center pt-40">
        <motion.div
          className="details text-center max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold">I am</h1>
          <p className="text-4xl text-orange-500 font-semibold mt-2">Abhishek Gour</p>
          <p className="mt-4 text-gray-500 dark:text-gray-300">
            Fullstack Web Developer with strong skills and delivery experience.
          </p>
          <Link to="/About">
            <button className="mt-5 px-6 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition">More</button>
          </Link>
        </motion.div>
      </section>

      {/* My Expertise */}
      <section className={`mt-20 px-5 py-10 ${themeColors.expertiseBg}`}>
        <h2 className="text-center text-3xl font-bold mb-6" style={{ color: Profile1 === "white" ? "gray" : "orange" }}>
          My Expertise
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "JavaScript", width: 100 },
            { label: "HTML & CSS", width: 100 },
            { label: "Vanilla JavaScript", width: 100 },
            { label: "React", width: 100 },
            { label: "Node.js", width: 100 },
            { label: "Express", width: 100 },
            { label: "MongoDB", width: 100 },
            { label: "PHP", width: 90 },
            { label: "Tailwind CSS", width: 100 },
            { label: "Bootstrap", width: 100 },
            { label: "MySQL", width: 70 },
            { label: "Firebase", width: 60 },
            { label: "Java", width: 60 },
            { label: "C/C++", width: 30 },
          ].map((skill, index) => (
            <motion.div
              key={index}
              className="flex items-center"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <span className={`w-44 font-medium ${themeColors.skillText}`}>{skill.label}</span>
              <div className={`w-full ${themeColors.progressBg} rounded-full h-3 ml-4`}>
                <div className={`${themeColors.barColor} h-3 rounded-full`} style={{ width: `${skill.width}%` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What I Offer */}
      <section className="py-12">
        <h2 className="text-center text-3xl text-orange-600 font-bold">What I Offer</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-6 px-5">
          {[
            { icon: "palette", title: "UI Design", desc: "UI and logo design services" },
            { icon: "code", title: "Web Developing", desc: "Full web development services" },
            { icon: "layer-group", title: "Deployment", desc: "Deployment & maintenance" },
            { icon: "pen-fancy", title: "Content Writing", desc: "Writing for Insta, story, ads etc." },
            { icon: "youtube", title: "YouTube Ads", desc: "YouTube channel promotion" },
            { icon: "mobile", title: "Android Dev", desc: "Mobile app development" },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="w-72 p-5 border rounded-md relative bg-white shadow hover:shadow-xl transition"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute -top-5 left-5">
                <i className={`fa-solid fa-${service.icon} text-white bg-orange-400 p-2 rounded-md`} />
              </div>
              <h3 className="text-xl font-bold text-orange-600 mt-6 text-center">{service.title}</h3>
              <p className="text-gray-600 text-sm mt-3 text-center">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="mt-16 px-5 pb-2">
  <h3 className="text-center text-orange-400 font-bold">My Portfolio</h3>
  <h2 className="text-center text-2xl font-bold text-orange-600 mt-2">Recent Works</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-6xl mx-auto">
    {data.map((item, i) => (
      <motion.div
        key={i}
        className="relative overflow-hidden rounded-xl shadow-lg group"
        whileHover={{ scale: 1.03 }}
      >
        {/* Project name always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-orange-500 bg-opacity-70 text-white p-3 z-10 ">
          <div className="flex justify-between items-center">
            <span className="font-bold">{item.name}</span>
            <a 
              href={item.link || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-orange-300 transition"
            >
              <i className="fa-solid fa-up-right-from-square" />
            </a>
          </div>
        </div>
        
        <img src={item.img[1]} alt={item.name} className="w-full h-52 object-cover" />
        
        {/* Hover overlay with additional info if needed */}
        <div className="absolute inset-0 bg-orange-500 bg-opacity-60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition">
          <a 
            href={item.link || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mb-2 bg-orange-500 hover:bg-orange-600 p-3 rounded-full transition"
          >
            <i className="fa-solid fa-up-right-from-square text-white text-xl" />
          </a>
          <span className="text-white font-bold text-lg">{item.name}</span>
          {/* You can add more project details here that appear on hover */}
        </div>
      </motion.div>
    ))}
  </div>
</section>
    </div>
  );
}

export default Vlog;
