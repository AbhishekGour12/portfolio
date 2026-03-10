import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { app } from "./Firebase";
import { ref, set, getDatabase } from "firebase/database";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = ({ Profile1 }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });

    // Meta tags for SEO
    document.title = "Contact Abhi Services | Get In Touch";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Get in touch with Abhi Services for your web development, mobile app, and digital design needs. Available for freelance projects and collaborations.");
    }
  }, []);

  const projectTypes = [
    "Website Development",
    "Web Application",
    "Mobile App Development",
    "UI/UX Design",
    "E-commerce Solution",
    "Other"
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (formData.phone && !/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.projectType) {
      newErrors.projectType = "Please select a project type";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const db = getDatabase(app);
      const timestamp = Date.now();
      const userRef = ref(db, `contacts/${timestamp}`);
      
      await set(userRef, {
        ...formData,
        timestamp: new Date().toISOString()
      });
      
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const themeColors = {
    background: Profile1 === "white" ? "#f8fafc" : "#0f172a",
    cardBg: Profile1 === "white" ? "bg-white" : "bg-gray-800",
    text: Profile1 === "white" ? "text-gray-900" : "text-white",
    textMuted: Profile1 === "white" ? "text-gray-600" : "text-gray-300",
    inputBg: Profile1 === "white" ? "bg-white" : "bg-gray-700",
    inputBorder: Profile1 === "white" ? "border-gray-200" : "border-gray-600",
    shadow: Profile1 === "white" ? "shadow-xl" : "shadow-2xl",
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Contact Abhi Services | Get In Touch</title>
      <meta name="description" content="Get in touch with Abhi Services for your web development, mobile app, and digital design needs. Available for freelance projects and collaborations." />
      
      <section 
        id="contact" 
        className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16 overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: themeColors.background }}
      >
        {/* Floating Gradient Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-400/20 to-pink-600/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-blue-600/20 rounded-full blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
         <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%239C92AC%27 fill-opacity=%270.05%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-purple-400 to-pink-600">
                Get In Touch
              </span>
            </h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl md:text-3xl font-light mb-4"
            >
              Let's Build Something Amazing Together
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className={`text-lg max-w-2xl mx-auto ${themeColors.textMuted}`}
            >
              Have a project in mind? We'd love to hear about it. 
              Whether you need a website, mobile app, or digital strategy, 
              we're here to help bring your ideas to life.
            </motion.p>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-24 h-1 bg-gradient-to-r from-orange-500 to-pink-600 mx-auto mt-6 rounded-full"
            />
          </motion.div>

          {/* Main Content - 2 Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className={`${themeColors.cardBg} backdrop-blur-xl bg-opacity-90 rounded-3xl ${themeColors.shadow} p-8 border ${Profile1 === "white" ? "border-gray-200" : "border-gray-700"}`}>
                <h3 className={`text-2xl font-bold mb-6 ${themeColors.text}`}>
                  Contact Information
                </h3>
                
                <p className={`mb-8 ${themeColors.textMuted}`}>
                  Available for freelance projects and collaborations. 
                  Let's create something extraordinary together.
                </p>

                {/* Contact Cards */}
                <div className="space-y-6">
                  {/* Email Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-pink-600/10 transition-all"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-envelope text-white text-xl"></i>
                    </div>
                    <div>
                      <p className={`text-sm ${themeColors.textMuted} mb-1`}>Email</p>
                      <a 
                        href="mailto:abhiservices09@gmail.com"
                        className={`text-lg font-semibold hover:text-orange-500 transition-colors ${themeColors.text}`}
                      >
                        abhiservices09@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  {/* Phone Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-pink-600/10 transition-all"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-phone text-white text-xl"></i>
                    </div>
                    <div>
                      <p className={`text-sm ${themeColors.textMuted} mb-1`}>Phone</p>
                      <a 
                        href="tel:+916266834504"
                        className={`text-lg font-semibold hover:text-orange-500 transition-colors ${themeColors.text}`}
                      >
                        +91 6266834504
                      </a>
                    </div>
                  </motion.div>

                  {/* Location Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-pink-600/10 transition-all"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-location-dot text-white text-xl"></i>
                    </div>
                    <div>
                      <p className={`text-sm ${themeColors.textMuted} mb-1`}>Location</p>
                      <p className={`text-lg font-semibold ${themeColors.text}`}>
                        Indore, India
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Social/Quick Contact Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-4">
                    <motion.a
                      href="https://wa.me/916266834504"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      <i className="fa-brands fa-whatsapp text-xl"></i>
                      <span>WhatsApp</span>
                    </motion.a>
                    
                    <motion.a
                      href="https://linkedin.com/company/abhi-services"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      <i className="fa-brands fa-linkedin text-xl"></i>
                      <span>LinkedIn</span>
                    </motion.a>
                  </div>
                </div>

                {/* Availability Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 flex items-center gap-2 justify-center p-3 bg-green-500/10 rounded-xl"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className={`text-sm ${themeColors.textMuted}`}>
                    Available for new projects
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className={`${themeColors.cardBg} backdrop-blur-xl bg-opacity-90 rounded-3xl ${themeColors.shadow} p-8 border ${Profile1 === "white" ? "border-gray-200" : "border-gray-700"}`}>
                <h3 className={`text-2xl font-bold mb-6 ${themeColors.text}`}>
                  Send Us a Message
                </h3>

                {/* Success Message */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <i className="fa-solid fa-check text-white"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-500">Message Sent!</h4>
                          <p className={`text-sm ${themeColors.textMuted}`}>
                            We'll get back to you within 24 hours.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label className={`block mb-2 font-medium ${themeColors.text}`}>
                      Your Name
                    </label>
                    <div className="relative">
                      <i className="fa-solid fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : themeColors.inputBorder} ${themeColors.inputBg} focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                        placeholder="John Doe"
                      />
                      {focusedField === 'name' && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full"
                        />
                      )}
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className={`block mb-2 font-medium ${themeColors.text}`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <i className="fa-solid fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : themeColors.inputBorder} ${themeColors.inputBg} focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                        placeholder="john@example.com"
                      />
                      {focusedField === 'email' && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full"
                        />
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className={`block mb-2 font-medium ${themeColors.text}`}>
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <i className="fa-solid fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : themeColors.inputBorder} ${themeColors.inputBg} focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                        placeholder="+91 98765 43210"
                      />
                      {focusedField === 'phone' && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full"
                        />
                      )}
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  {/* Project Type Dropdown */}
                  <div>
                    <label className={`block mb-2 font-medium ${themeColors.text}`}>
                      Project Type
                    </label>
                    <div className="relative">
                      <i className="fa-solid fa-layer-group absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('projectType')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.projectType ? 'border-red-500' : themeColors.inputBorder} ${themeColors.inputBg} focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none`}
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      {focusedField === 'projectType' && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full"
                        />
                      )}
                    </div>
                    {errors.projectType && (
                      <p className="mt-1 text-sm text-red-500">{errors.projectType}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className={`block mb-2 font-medium ${themeColors.text}`}>
                      Your Message
                    </label>
                    <div className="relative">
                      <i className="fa-solid fa-message absolute left-4 top-5 text-gray-400"></i>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows="5"
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : themeColors.inputBorder} ${themeColors.inputBg} focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none`}
                        placeholder="Tell us about your project..."
                      />
                      {focusedField === 'message' && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full"
                        />
                      )}
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <span className="relative z-10">Send Message</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-500"
                          initial={{ x: "100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </>
                    )}
                  </motion.button>

                  {/* Form Footer Text */}
                  <p className={`text-xs text-center ${themeColors.textMuted} mt-4`}>
                    We'll get back to you within 24 hours. Your information is kept private.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;