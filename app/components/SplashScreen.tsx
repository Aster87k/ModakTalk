"use client";

import React from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-green-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 2 }}
      onAnimationComplete={onFinish}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-yellow-100">도란도란 모닥톡</h1>
        <motion.div
          className="mt-4 w-16 h-16 mx-auto"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-yellow-400"
          >
            <path d="M12 15c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
            <path d="M8 9v1" />
            <path d="M16 9v1" />
            <path d="M12 17v1" />
            <path d="M7 13h1" />
            <path d="M16 13h1" />
            <path d="M12 8V7" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
