"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      animate={{
        background: [
          "linear-gradient(45deg, #ff69b4, #9f7aea, #4f46e5)",
          "linear-gradient(225deg, #ff69b4, #9f7aea, #4f46e5)",
          "linear-gradient(45deg, #4f46e5, #9f7aea, #ff69b4)",
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/50 via-purple-500/50 to-indigo-600/50 backdrop-blur-3xl" />
    </motion.div>
  );
}
