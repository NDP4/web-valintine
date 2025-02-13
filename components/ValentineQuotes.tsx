import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import dynamic from "next/dynamic";

const DynamicParticles = dynamic(() => import("./Particles"), {
  ssr: false,
});
const DynamicBackground = dynamic(() => import("./AnimatedBackground"), {
  ssr: false,
});
const DynamicFloatingHearts = dynamic(() => import("./FloatingHearts"), {
  ssr: false,
});

const quotes = [
  "Kamu tau gak? Kalau cintaku ke kamu itu kayak github: selalu ada commit baru setiap hari.",
  "Cintaku padamu seperti VSCode: stable, reliable, dan selalu ter-update.",
  "Cintaku padamu seperti π, tidak rasional, tidak berujung, dan abadi selamanya.",
  "Seperti function yang selalu return true, cintaku padamu tak pernah false.",
  "Cintaku padamu itu infinite loop, ga akan pernah berhenti.",
  "Kamu adalah API terbaik yang pernah ku consume, selalu memberikan response yang membahagiakan.",
  "Seperti dark mode IDE, kamu selalu nyaman di mataku.",
  "Kamu itu seperti clean code, simple tapi sangat berarti.",
  "Bug di kodeku bisa ku fix, tapi bug di hatiku cuma kamu yang bisa debug.",
  "Cintaku ke kamu itu open source, transparan dan tulus selamanya.",
  "Kamu adalah best practice dalam hidup ku.",
  "Seperti auto-complete, kamu selalu melengkapi hidupku.",
  "Cintaku padamu seperti SSD: Solid, Simple, dan Dedicated.",
  "Kamu adalah package yang paling ku butuhkan dalam project hidupku.",
  "Error boleh di-catch, tapi kamu ga akan ku lepas.",
];

const finalMessage = {
  text: "Selamat Hari Valentine! 💝",
  subtext: "Terima kasih sudah menjadi bagian terindah dalam hidup ku~",
};

const transitions = [
  { duration: 0.5, type: "spring", bounce: 0.4 },
  { duration: 0.7, type: "tween", ease: "easeInOut" },
  { duration: 0.6, type: "spring", stiffness: 100 },
];

const animations = [
  {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  },
  {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  },
];

export default function ValentineQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (isTypingComplete) {
      const timer = setTimeout(() => {
        if (currentQuote === quotes.length - 1) {
          setShowFinal(true);
        } else {
          setCurrentQuote((prev) => (prev + 1) % quotes.length);
          setCurrentAnimation((prev) => (prev + 1) % animations.length);
        }
        setIsTypingComplete(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isTypingComplete, currentQuote]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <DynamicBackground />
      <Suspense fallback={null}>
        <DynamicParticles />
        {showFinal && <DynamicFloatingHearts />}
      </Suspense>

      <div className="max-w-3xl mx-auto text-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={showFinal ? "final" : currentQuote}
            {...animations[currentAnimation]}
            transition={transitions[currentAnimation % transitions.length]}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-12 shadow-xl hover:bg-white/20 transition-colors duration-300 relative"
          >
            <div className="absolute top-4 left-4 text-6xl text-white/20 font-serif">
              &ldquo;
            </div>
            <div className="absolute bottom-4 right-4 text-6xl text-white/20 font-serif">
              &rdquo;
            </div>

            <motion.div
              className="text-2xl md:text-4xl font-semibold text-white leading-relaxed"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.2)" }}
            >
              {showFinal ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-6xl mb-4 font-bold text-pink-200">
                    {finalMessage.text}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90">
                    {finalMessage.subtext}
                  </p>
                </motion.div>
              ) : (
                <TypeAnimation
                  sequence={[
                    quotes[currentQuote],
                    () => setIsTypingComplete(true),
                  ]}
                  wrapper="p"
                  cursor={true}
                  repeat={0}
                  speed={50}
                />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
