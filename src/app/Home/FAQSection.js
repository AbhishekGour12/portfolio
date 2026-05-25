"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Script from "next/script";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What web development services does Abhi Services offer?",
    answer:
      "Abhi Services provides end‑to‑end web development services including custom web application development, React and Next.js development, full‑stack development, e‑commerce websites, and website design and development. Abhi Services builds modern, scalable solutions tailored to business needs."
  },
  {
    question: "How long does Abhi Services take to deliver a website?",
    answer:
      "Abhi Services typically delivers a standard business website in 4‑6 weeks. For complex custom web application development, Abhi Services follows an agile methodology and completes projects in 8‑12 weeks. Abhi Services provides a detailed timeline during the discovery phase."
  },
  {
    question: "Does Abhi Services build mobile-responsive websites?",
    answer:
      "Yes, all websites built by Abhi Services are fully mobile‑responsive and follow a mobile‑first approach. Abhi Services ensures seamless experiences across all devices, from smartphones to desktops, as part of its website design and development process."
  },
  {
    question: "What technologies does Abhi Services use for development?",
    answer:
      "Abhi Services uses modern technologies including React, Next.js, TypeScript, Node.js, and Tailwind CSS. For full‑stack development services, Abhi Services also leverages MongoDB, PostgreSQL, Firebase, and cloud platforms like AWS and Vercel."
  },
  {
    question: "How much does a custom website cost at Abhi Services?",
    answer:
      "Abhi Services offers affordable web development packages starting from $2,500 for a business website. Custom web application development projects typically range between $8,000 and $25,000. Abhi Services provides a free quote after understanding specific requirements."
  },
  {
    question: "Does Abhi Services provide post-launch support and maintenance?",
    answer:
      "Yes, Abhi Services provides comprehensive post‑launch support and maintenance plans. Abhi Services offers monthly retainer packages that include security updates, performance monitoring, bug fixes, and content updates for all projects."
  },
  {
    question: "Can Abhi Services redesign an existing website?",
    answer:
      "Absolutely. Abhi Services specializes in website redesigns that improve user experience, conversion rates, and performance. Abhi Services follows a structured redesign process – from audit to launch – ensuring zero downtime and preserved SEO value."
  },
  {
    question: "Does Abhi Services build e-commerce websites?",
    answer:
      "Yes, Abhi Services builds custom e‑commerce websites using Shopify, WooCommerce, and headless commerce solutions. Abhi Services integrates secure payment gateways, inventory management, and scalable product catalogs for online stores."
  },
  {
    question: "Is Abhi Services suitable for startups and small businesses?",
    answer:
      "Yes, Abhi Services works extensively with startups and small businesses. Abhi Services offers flexible engagement models, affordable web development packages, and MVP development services tailored to early‑stage companies and entrepreneurs."
  },
  {
    question: "How do clients get started with Abhi Services?",
    answer:
      "Clients can get started by filling out the contact form on the Abhi Services website. Abhi Services then schedules a free consultation, provides a project proposal, and assigns a dedicated project manager. The process is transparent and client‑focused."
  }
];

// Build JSON-LD schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null); // ✅ FIX: useRef, not useState(null)[0]
  const isInView = useInView(sectionRef, { once: true, amount: 0.2, margin: "-100px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Split FAQs into two columns for desktop
  const midIndex = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, midIndex);
  const rightFaqs = faqs.slice(midIndex);

  // Reduced motion variants for better mobile performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const renderFAQItem = (faq, idx, isLeft = true) => {
    const globalIndex = isLeft ? idx : midIndex + idx;
    return (
      <motion.div
        key={globalIndex}
        variants={itemVariants}
        className={`relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-300 ${
          openIndex === globalIndex
            ? "bg-white/90 border-l-4 border-l-[#1E40AF] shadow-md"
            : "bg-white/60 hover:bg-white/80 border border-white/70"
        }`}
      >
        <button
          onClick={() => toggleFAQ(globalIndex)}
          className="w-full text-left px-4 sm:px-5 py-4 flex justify-between items-center gap-3 focus:outline-none group"
          aria-expanded={openIndex === globalIndex}
          aria-controls={`faq-answer-${globalIndex}`}
        >
          <h3 className="text-sm sm:text-base font-semibold text-[#1E3A8A] group-hover:text-[#1E40AF] transition-colors pr-2">
            {faq.question}
          </h3>
          <motion.div
            animate={{ rotate: openIndex === globalIndex ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex-shrink-0"
          >
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E40AF]" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {openIndex === globalIndex && (
            <motion.div
              id={`faq-answer-${globalIndex}`}
              role="region"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-5 pb-4 pt-0 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 mt-1">
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <>
      {/* JSON-LD Schema - only after mount to avoid hydration mismatch */}
      {mounted && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          strategy="afterInteractive"
        />
      )}

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8"
        style={{
          background: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 60%, #e0f2fe 100%)",
        }}
      >
        {/* Mobile: reduced/removed heavy blur blobs for performance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden max-sm:hidden">
          <motion.div
            className="absolute -top-40 -right-20 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-20 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
            transition={{ duration: 22, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header - reduced motion on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/80 shadow-sm mb-4">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#1E40AF] animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-[#1E3A8A]">FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <div className="w-16 h-1 mx-auto bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] rounded-full" />
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
              Everything you need to know about Abhi Services’ web development solutions
            </p>
          </motion.div>

          {/* 2‑Column FAQ Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6"
          >
            <div className="space-y-4 sm:space-y-5">
              {leftFaqs.map((faq, idx) => renderFAQItem(faq, idx, true))}
            </div>
            <div className="space-y-4 sm:space-y-5">
              {rightFaqs.map((faq, idx) => renderFAQItem(faq, idx, false))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-center mt-12 sm:mt-16 pt-4 border-t border-blue-100/50"
          >
            <p className="text-gray-700 text-sm sm:text-base mb-4">
              Still have questions? Abhi Services is ready to help.
            </p>
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 group">
                Contact Abhi Services →
                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-[-90deg] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;