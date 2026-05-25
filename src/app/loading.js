"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Lightweight Background */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Blob 1 */}
        <motion.div
          className="absolute top-[-120px] right-[-80px] w-72 h-72 bg-blue-200/20 rounded-full blur-3xl max-md:hidden"
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob 2 */}
        <motion.div
          className="absolute bottom-[-120px] left-[-80px] w-72 h-72 bg-indigo-100/20 rounded-full blur-3xl max-md:hidden"
          animate={{
            x: [0, -20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Loader */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Logo Circle */}
        <div className="relative flex items-center justify-center">

          {/* Outer Ring */}
          <motion.div
            className="absolute w-24 h-24 rounded-full border border-blue-200"
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner Ring */}
          <motion.div
            className="absolute w-20 h-20 rounded-full border-2 border-dashed border-blue-400/50"
            animate={{ rotate: -360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Center Logo */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#60A5FA] flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">
              A
            </span>
          </div>
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-center"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] bg-clip-text text-transparent">
            Abhi Services
          </h2>

          <p className="mt-1 text-xs tracking-[4px] text-gray-400">
            LOADING EXPERIENCE
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mt-6 w-32 h-[3px] bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#1E40AF] to-[#60A5FA]"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

      </div>
    </motion.div>
  );
}