"use client";
import React from "react";
import Link from "next/link";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaGithub, 
  FaYoutube 
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/service" },
    { name: "Projects", href: "/project" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const socialIcons = [
    { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
    { icon: FaTwitter, href: "https://x.com/abhisrvcs", label: "Twitter" },
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/abhiservices", label: "LinkedIn" },
    { icon: FaInstagram, href: "https://www.instagram.com/abhisrvcs", label: "Instagram" },
   
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-blue-100/30 pt-16 pb-8">
      {/* Background blur blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-20 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid - 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E40AF] to-[#60A5FA] flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
                  Abhi Services
                </span>
              </div>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              We build scalable web applications, AI-powered systems, and high-performance digital experiences for businesses ready to grow.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white hover:border-[#1E40AF] transition-all duration-300 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#1E40AF] transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#1E40AF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <FiMail className="w-4 h-4 text-[#1E40AF] shrink-0" />
                <a href="mailto:solution@abhi.services" className="hover:text-[#1E40AF] transition">solutions@abhi.services</a>
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <FiPhone className="w-4 h-4 text-[#1E40AF] shrink-0" />
                <a href="tel:+916266834504" className="hover:text-[#1E40AF] transition">+91 6266834504</a>
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <FiMapPin className="w-4 h-4 text-[#1E40AF] shrink-0" />
                <span>India</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Subscribe to our newsletter</h4>
              <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 text-sm rounded-full bg-white/70 backdrop-blur-sm border border-gray-200 focus:outline-none focus:border-[#1E40AF] transition"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white text-sm font-medium flex items-center justify-center gap-1 hover:shadow-md transition-all"
                >
                  Subscribe <FiSend className="w-3 h-3" />
                </button>
              </form>
              <p className="text-[10px] text-gray-400 mt-2">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {currentYear} Abhi Services. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-500 text-xs hover:text-[#1E40AF] transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 text-xs hover:text-[#1E40AF] transition">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-gray-500 text-xs hover:text-[#1E40AF] transition">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;