"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../Components/Firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import {FaLinkedin, FaGithub, FaInstagram, FaTwitter} from "react-icons/fa"
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic", offset: 100 });
  }, []);

  const projectTypes = [
    "Website Development",
    "Web Application",
    "Mobile App Development",
    "UI/UX Design",
    "E-commerce Solution",
    "Other",
  ];

  // Step 1 validation
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Min 2 characters";
    
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.projectType) newErrors.projectType = "Select project type";
    if (!formData.message.trim()) newErrors.message = "Message required";
    else if (formData.message.trim().length < 10) newErrors.message = "Min 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setCurrentStep(2);
  };

  const handleBack = () => setCurrentStep(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    if (submitError) setSubmitError("");
  };

  // Submit to Firebase
  const submitToFirebase = async (data) => {
    const db = getDatabase(app);
    const timestamp = Date.now();
    const contactRef = ref(db, `contacts/${timestamp}`);
    await set(contactRef, {
      ...data,
      timestamp: new Date().toISOString(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await submitToFirebase(formData);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });
      setCurrentStep(1);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Firebase submit error:", error);
      setSubmitError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <title>Contact Abhi Services | Start Your Project</title>
      <meta
        name="description"
        content="Let's build something exceptional. Get in touch with Abhi Services for premium web development, AI solutions, and digital products."
      />

      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white py-20 px-4 sm:px-6 lg:px-8">
        {/* Background Grid & Blobs */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-200/40 blur-[120px]"
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-100/30 blur-[120px]"
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-4 py-1.5 border border-blue-100 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-medium text-blue-900/80">Get in touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Let’s Build Something{" "}
              <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
                Exceptional
              </span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-4">
              We're ready to turn your ideas into high‑impact digital products.
              Tell us about your project – we'll get back within 24 hours.
            </p>
          </motion.div>

          {/* Split Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-8 sticky top-24"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to scale your business?</h2>
                <p className="text-gray-500 leading-relaxed">
                  From startups to enterprises, we build web apps, AI tools, and
                  scalable platforms that drive real growth. Join 50+ satisfied clients.
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <div><div className="text-2xl font-bold text-[#1E40AF]">20+</div><p className="text-sm text-gray-500">Projects Delivered</p></div>
                <div><div className="text-2xl font-bold text-[#1E40AF]">98%</div><p className="text-sm text-gray-500">Client Retention</p></div>
                <div><div className="text-2xl font-bold text-[#1E40AF]">24h</div><p className="text-sm text-gray-500">Avg Response</p></div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-full w-fit">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-md shadow-green-500/50" />
                <span className="text-sm font-medium text-gray-700">Available for new projects</span>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  { icon: "💬", label: "WhatsApp", href: "https://wa.me/916266834504" },
                  { icon: "📞", label: "Call", href: "tel:+916266834504" },
                  { icon: "✉️", label: "Email", href: "mailto:abhiservices09@gmail.com" },
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 3 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-blue-100 rounded-full text-gray-700 font-medium shadow-sm hover:shadow-md transition-all"
                  >
                    <span>{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </motion.a>
                ))}
              </div>

              {/* Social Media Icons (NEW) */}
              <div className="pt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Follow us</p>
                <div className="flex gap-4">
                  <a
                    href="www.linkedin.com/in/abhiservices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm border border-blue-100 flex items-center justify-center text-gray-600 hover:text-[#1E40AF] hover:scale-110 transition-all"
                  >
                    <FaLinkedin size={18} />
                  </a>
                  <a
                    href="https://github.com/AbhishekGour12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm border border-blue-100 flex items-center justify-center text-gray-600 hover:text-[#1E40AF] hover:scale-110 transition-all"
                  >
                    <FaGithub size={18} />
                  </a>
                  <a
                    href="https://www.instagram.com/devbyabhishek/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm border border-blue-100 flex items-center justify-center text-gray-600 hover:text-[#1E40AF] hover:scale-110 transition-all"
                  >
                    <FaInstagram size={18} />
                  </a>
                  <a
                    href="https://twitter.com/abhiservices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm border border-blue-100 flex items-center justify-center text-gray-600 hover:text-[#1E40AF] hover:scale-110 transition-all"
                  >
                    <FaTwitter size={18} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE – Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="relative backdrop-blur-2xl bg-white/40 border border-white/50 rounded-3xl shadow-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(30,64,175,0.3)]">
                {!submitSuccess ? (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentStep === 1 ? "Tell us about you" : "Project details"}
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">
                      {currentStep === 1 ? "Step 1 of 2" : "Step 2 of 2"}
                    </p>

                    {submitError && (
                      <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm">
                        {submitError}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-5"
                          >
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-white/70 backdrop-blur-sm border rounded-xl transition-all focus:outline-none ${
                                  errors.name ? "border-red-500" : "border-gray-200 focus:border-[#1E40AF] focus:shadow-[0_0_0_3px_rgba(30,64,175,0.2)]"
                                }`}
                                placeholder="John Doe"
                              />
                              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-white/70 backdrop-blur-sm border rounded-xl transition-all focus:outline-none ${
                                  errors.email ? "border-red-500" : "border-gray-200 focus:border-[#1E40AF] focus:shadow-[0_0_0_3px_rgba(30,64,175,0.2)]"
                                }`}
                                placeholder="hello@company.com"
                              />
                              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone number <span className="text-gray-400">(optional)</span>
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E40AF] focus:shadow-[0_0_0_3px_rgba(30,64,175,0.2)] transition-all"
                                placeholder="+91 98765 43210"
                              />
                            </div>

                            <div className="flex justify-end pt-4">
                              <motion.button
                                type="button"
                                onClick={handleNext}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-3 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition cursor-pointer"
                              >
                                Continue →
                              </motion.button>
                            </div>
                          </motion.div>
                        )}

                        {currentStep === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-5"
                          >
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Project type</label>
                              <select
                                name="projectType"
                                value={formData.projectType}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-white/70 backdrop-blur-sm border rounded-xl focus:outline-none focus:border-[#1E40AF] focus:shadow-[0_0_0_3px_rgba(30,64,175,0.2)] transition-all ${
                                  errors.projectType ? "border-red-500" : "border-gray-200"
                                }`}
                              >
                                <option value="">Select one</option>
                                {projectTypes.map((type) => (
                                  <option key={type} value={type}>{type}</option>
                                ))}
                              </select>
                              {errors.projectType && <p className="text-xs text-red-500 mt-1">{errors.projectType}</p>}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your project</label>
                              <textarea
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-white/70 backdrop-blur-sm border rounded-xl resize-none focus:outline-none focus:border-[#1E40AF] focus:shadow-[0_0_0_3px_rgba(30,64,175,0.2)] transition-all ${
                                  errors.message ? "border-red-500" : "border-gray-200"
                                }`}
                                placeholder="What are you building? What goals do you have?"
                              />
                              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                            </div>

                            <div className="flex gap-3 pt-4">
                              <motion.button
                                type="button"
                                onClick={handleBack}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-5 py-2.5 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-white/90 transition"
                              >
                                ← Back
                              </motion.button>
                              <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative flex-1 py-3 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white rounded-xl font-semibold overflow-hidden shadow-md hover:shadow-lg transition disabled:opacity-70"
                              >
                                {isSubmitting ? (
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                                  />
                                ) : (
                                  "Send message"
                                )}
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-center py-12"
                  >
                    <svg width="80" height="80" viewBox="0 0 100 100" className="mx-auto mb-4">
                      <motion.circle cx="50" cy="50" r="45" fill="none" stroke="#1E40AF" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                      <motion.path d="M30 50 L45 65 L70 35" fill="none" stroke="#1E40AF" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.4 }} />
                    </svg>
                    <h3 className="text-2xl font-bold text-gray-900">Your request has been received</h3>
                    <p className="text-gray-500 mt-2">We'll get back to you within 24 hours. Talk soon.</p>
                    <motion.button
                      onClick={() => setSubmitSuccess(false)}
                      whileHover={{ scale: 1.02 }}
                      className="mt-6 px-6 py-2 bg-[#1E40AF] text-white rounded-full text-sm font-medium"
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                )}
              </div>

              {/* Floating extra card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-md rounded-2xl p-3 shadow-lg flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><span className="text-blue-600 text-sm">⚡</span></div>
                <div><p className="text-xs font-semibold text-gray-800">Average response</p><p className="text-xs text-gray-500">&lt; 24 hours</p></div>
              </motion.div>
            </motion.div>
          </div>

          {/* Google Map Section */}
          <div className="mt-24" data-aos="fade-up">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-blue-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117000.08638485213!2d75.78880595!3d22.7195687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x7ec1a36634897b3f!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1714045123456!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Abhi Services Location – Indore, India"
                className="w-full"
              />
              <div className="p-6 text-center bg-white/40">
                <p className="text-gray-600">
                  <span className="font-semibold text-[#1E40AF]">📍 Indore, India</span> – Serving clients worldwide with remote-first collaboration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;