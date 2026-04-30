"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/service" },
    { name: "Projects", href: "/project" },
    { name: "Pricing", href: "/pricing" },
    { name: "Vlog", href: "/vlog" },
    { name: "Contact Us", href: "/contact" },
  ];

  // Scroll effect – add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md"
            : "bg-white/70 backdrop-blur-md shadow-sm"
        } border-b border-blue-100/50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
           <div className="flex items-center gap-2">
  <img
    src="/logo.png"
    alt="Abhi Services"
    className="h-10 md:h-12 w-auto object-contain"
  />

  <span className="text-sm md:text-base font-semibold">
    <span className="text-[#1E40AF]">Abhi</span>
    <span className="text-[#EAB308]">Services</span>
  </span>
</div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm lg:text-base font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-[#1E40AF] font-semibold"
                        : "text-gray-700 hover:text-[#1E40AF]"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Get Quote
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-blue-50 transition"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer (Slide-in from right) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-50 md:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center p-5 border-b border-blue-100">
                <img
                  src="/logo.png"
                  alt="Abhi Services"
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-gray-700 hover:bg-blue-50 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto py-6 px-5">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`py-3 text-lg font-medium transition-colors ${
                          isActive
                            ? "text-[#1E40AF] font-bold border-l-3 border-[#1E40AF] pl-3"
                            : "text-gray-700 hover:text-[#1E40AF] pl-3"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer CTA */}
              <div className="p-5 border-t border-blue-100">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white rounded-xl font-semibold shadow-md">
                    Get Quote
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content hiding under fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navbar;