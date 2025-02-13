"use client";

import { motion } from "framer-motion";

export default function FloatingHearts() {
  const hearts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    scale: 0.5 + Math.random() * 0.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-4xl"
          initial={{
            y: "120vh",
            x: `${heart.x}vw`,
            opacity: 0,
            scale: heart.scale,
          }}
          animate={{
            y: "-20vh",
            opacity: [0, 1, 1, 0],
            rotate: [0, 45, -45, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          💝
        </motion.div>
      ))}
    </div>
  );
}
