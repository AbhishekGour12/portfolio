import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaArrowRight
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/Services" },
    
    { name: "Projects", path: "/Project" },

    { name: "Contact", path: "/Contact" },
    {name: "Vlogs", path: "/Vlog"},
    {name: "About", path: "/About" },
    
    
  ];

  const socialLinks = [
    { icon: FaGithub, link: "https://github.com/AbhshekiCoder", label: "GitHub" },
    { icon: FaLinkedin, link: "https://linkedin.com/in/abhishekgour12", label: "LinkedIn" },
    { icon: FaTwitter, link: "https://twitter.com/abhiservices", label: "Twitter" },
    { icon: FaInstagram, link: "https://instagram.com/devbyabhishek", label: "Instagram" },
  ];

  const contactInfo = [
    { icon: FaEnvelope, info: "abhiservices09@gmail.com", link: "mailto:abhiservices09@gmail.com" },
    { icon: FaPhone, info: "+91 62668 34504", link: "tel:+916266834504" },
    { icon: FaMapMarkerAlt, info: "Indore, Madhya Pradesh, India", link: "#" },
  ];

  return (
    <footer className="relative bg-slate-900 border-t border-slate-800 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent pointer-events-none" />
      
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Brand Column - wider */}
          <div className="space-y-4 lg:col-span-1">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  Abhi
                </span>
                <span className="text-white"> Services</span>
              </h2>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Building scalable, modern digital solutions for businesses worldwide. 
              We turn ideas into exceptional digital experiences.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white transition-all duration-300 border border-slate-700"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-2"
                  >
                    <FaArrowRight className="w-2.5 h-2.5 text-orange-500/50" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="flex items-start gap-3 text-sm text-slate-400 hover:text-orange-500 transition-colors group"
                  >
                    <item.icon className="w-4 h-4 mt-0.5 text-orange-500/70 group-hover:text-orange-500" />
                    <span>{item.info}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-white text-sm font-medium mb-2">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-white text-sm focus:outline-none focus:border-orange-500"
                />
                <button className="px-3 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm rounded-r-lg hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            © {currentYear} Abhi Services. All rights reserved. 
            Built with <span className="text-pink-500">❤</span> in India
          </p>
          
          <div className="flex gap-4 text-xs text-slate-500">
            <Link to="/privacy" className="hover:text-orange-500 transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-orange-500 transition-colors">
              Terms of Service
            </Link>
            <span>|</span>
            <Link to="/sitemap" className="hover:text-orange-500 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;