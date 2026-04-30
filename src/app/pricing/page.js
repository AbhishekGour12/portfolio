"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronRight, Sparkles, Zap, Shield, Award, MessageCircle, Phone, Mail } from "lucide-react";

const PricingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic", offset: 100 });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const plans = [
    {
      name: "Starter Website",
      price: "₹10,000 – ₹20,000",
      tag: "Perfect for small businesses",
      features: [
        "3–4 Pages", "Responsive Design", "Modern UI",
        "Tech Stack: Next.js, Node.js, MongoDB", "Basic SEO Setup", "Fast Performance"
      ],
      note: "Hosting not included",
      popular: false,
      icon: "🚀"
    },
    {
      name: "Business Website",
      price: "₹20,000 – ₹50,000",
      tag: "Most popular – ideal for growing companies",
      features: [
        "4–6 Pages (Dynamic)", "Admin Panel (Basic)", "Payment Gateway Integration",
        "Real-time Chat Feature", "Authentication System", "SEO Optimized", "Mobile Responsive"
      ],
      note: "Fully dynamic + powerful backend",
      popular: true,
      icon: "💼"
    },
    {
      name: "Premium / Custom Website",
      price: "₹50,000+",
      tag: "Enterprise-grade solution",
      features: [
        "6–10 Pages", "Fully Dynamic Website", "Custom UI/UX Design",
        "Custom Admin Panel", "Payment Gateway + APIs", "Chatbot Integration",
        "Real-time Features", "High Performance + Scalability"
      ],
      note: "Tailored to your exact needs",
      popular: false,
      icon: "👑"
    }
  ];

  const extraServices = [
    { name: "Website Maintenance", price: "₹2,000/month", icon: "🔧" },
    { name: "SEO Services", price: "₹3,000/month", icon: "📈" },
    { name: "Speed Optimization", price: "₹2,000", icon: "⚡" },
    { name: "Bug Fixing", price: "₹1,000+", icon: "🐛" },
    { name: "API Integration", price: "₹3,000+", icon: "🔌" }
  ];

  return (
    <>
      <title>Pricing | Abhi Services – Flexible Plans for Every Budget</title>
      <meta name="description" content="Transparent pricing for web development, design, app development, and more. Choose a plan that fits your business goals." />

      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white py-16 px-4 sm:px-6 lg:px-8">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-4 py-1.5 border border-blue-100 shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-[#1E40AF]" />
              <span className="text-sm font-medium text-blue-900/80">Affordable & Scalable</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Flexible Pricing for{" "}
              <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
                Every Business
              </span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-4">
              Choose the right plan based on your needs. Transparent pricing with scalable solutions.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-[#1E40AF] text-white rounded-full font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all inline-flex items-center gap-2"
                >
                  Get Free Quote <ChevronRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Web Development Plans */}
          <div className="mb-20" data-aos="fade-up">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Web Development Plans</h2>
              <p className="text-gray-500 mt-2">Choose a plan that fits your project scope</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {plans.map((plan, idx) => (
                <motion.div
                  key={plan.name}
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                >
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`relative rounded-2xl p-6 backdrop-blur-md bg-white/60 border transition-all duration-300 h-full flex flex-col ${
                      plan.popular
                        ? "border-[#60A5FA] shadow-xl shadow-blue-500/20 ring-2 ring-[#60A5FA]/30"
                        : "border-blue-100/80 shadow-md hover:shadow-xl"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg">
                        Most Popular
                      </div>
                    )}
                    <div className="text-4xl mb-4">{plan.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                    <p className="text-3xl font-bold text-[#1E40AF] mt-2">{plan.price}</p>
                    <p className="text-sm text-gray-500 mt-1">{plan.tag}</p>
                    <div className="my-4 h-px bg-gray-200" />
                    <ul className="space-y-2 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <Zap className="w-4 h-4 text-[#1E40AF] mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-400 mt-4 italic">{plan.note}</p>
                    <div className="mt-6">
                      <Link href="/contact">
                        <button className="w-full py-2 bg-white/80 border border-[#1E40AF] text-[#1E40AF] rounded-xl font-medium hover:bg-[#1E40AF] hover:text-white transition-all">
                          Get Quote
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-6 italic">
              * Pricing is flexible and may vary depending on project requirements.
            </p>
          </div>

          {/* UI/UX Design Pricing */}
          <div className="grid md:grid-cols-2 gap-8 mb-20" data-aos="fade-up">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">UI/UX Design Pricing</h3>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-gray-600">Web Design</p>
                  <p className="text-2xl font-bold text-[#1E40AF]">₹1,000 / screen</p>
                </div>
                <div>
                  <p className="text-gray-600">Mobile App Design</p>
                  <p className="text-2xl font-bold text-[#1E40AF]">₹500 / screen</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-white/80 rounded-full text-sm text-gray-700 shadow-sm">Figma</span>
                <span className="px-3 py-1 bg-white/80 rounded-full text-sm text-gray-700 shadow-sm">Canva</span>
              </div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Logo Design</h3>
              <p className="text-2xl font-bold text-[#1E40AF]">Starting from ₹500</p>
              <p className="text-gray-600 mt-2">Custom branding options available, multiple revisions.</p>
            </div>
          </div>

          {/* App, SaaS, Dashboards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20" data-aos="fade-up">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="text-xl font-bold text-gray-800">App Development</h3>
              <p className="text-2xl font-bold text-[#1E40AF] mt-2">Starting ₹30,000</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>✓ React Native</li>
                <li>✓ Custom UI</li>
                <li>✓ API Integration</li>
                <li>✓ Scalable architecture</li>
              </ul>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">☁️</div>
              <h3 className="text-xl font-bold text-gray-800">SaaS Products</h3>
              <p className="text-2xl font-bold text-[#1E40AF] mt-2">Starting ₹20,000</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>✓ Custom business solutions</li>
                <li>✓ Admin dashboard</li>
                <li>✓ Multi-user systems</li>
              </ul>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-bold text-gray-800">Dashboards</h3>
              <p className="text-2xl font-bold text-[#1E40AF] mt-2">Starting ₹10,000</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>✓ Analytics dashboards</li>
                <li>✓ Admin panels</li>
                <li>✓ Data visualization</li>
              </ul>
            </div>
          </div>

          {/* Extra Services */}
          <div className="mb-20" data-aos="fade-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Additional Services</h2>
              <p className="text-gray-500 mt-2">Enhance your project with our add-ons</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {extraServices.map((service, idx) => (
                <motion.div
                  key={service.name}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-100 shadow-sm"
                >
                  <div className="text-2xl mb-2">{service.icon}</div>
                  <p className="font-semibold text-gray-800">{service.name}</p>
                  <p className="text-sm text-[#1E40AF] font-bold">{service.price}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat / CTA Section */}
          <div className="relative" data-aos="fade-up">
            <div className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl" />

              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Not sure which plan is right?</h3>
              <p className="text-gray-500 max-w-xl mx-auto mb-8">
                Let's discuss your project. We'll help you choose the perfect solution.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-[#1E40AF] text-white rounded-full font-semibold shadow-lg flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" /> Chat With Us
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full text-gray-800 font-semibold flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" /> Get Custom Quote
                  </motion.button>
                </Link>
              </div>
              <div className="mt-6 flex justify-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 6266834504</span>
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> abhiservices09@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/916266834504"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        </div>
      </section>
    </>
  );
};

export default PricingPage;