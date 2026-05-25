"use client";
import { motion } from "framer-motion";

const PageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-white"
    >
      {/* Background soft blur blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-20 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-20 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo Mark */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="relative">
            {/* Outer rotating ring */}
            <motion.div
              className="absolute -inset-4 rounded-full border-2 border-dashed border-[#1E40AF]/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner glowing ring */}
            <motion.div
              className="absolute -inset-2 rounded-full border border-[#60A5FA]/40"
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            {/* Center logo circle with gradient */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#60A5FA] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">A</span>
            </div>
          </div>
        </motion.div>

        {/* Brand name with pulse */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
            Abhi Services
          </h2>
          <p className="text-xs text-gray-400 mt-1 tracking-wide">Engineering Excellence</p>
        </motion.div>

        {/* Animated loading status */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="mt-8 h-0.5 bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] rounded-full"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-3 text-[10px] font-mono text-gray-400 tracking-wider"
        >
          LOADING EXPERIENCE
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PageLoader;