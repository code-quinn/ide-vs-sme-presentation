import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Building2, Zap, Sparkles, ArrowRight, Play, Music } from 'lucide-react';

const TitleSlide = ({ slide, audioProps }) => {
  const { entrancePlaying, toggleEntrance, stopEntrance } = audioProps || {};
  const [showVs, setShowVs] = useState(false);
  const [glowPulse, setGlowPulse] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowVs(true), 1500);
    const pulseInterval = setInterval(() => setGlowPulse(p => (p + 1) % 100), 50);
    return () => {
      clearTimeout(timer);
      clearInterval(pulseInterval);
    };
  }, []);

  return (
    <div className="relative text-center max-h-[calc(100vh-180px)] overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#8B5CF6' : i % 3 === 1 ? '#EC4899' : '#06B6D4',
              opacity: 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating icons */}
      <motion.div
        className="absolute left-[10%] top-[20%]"
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Rocket className="w-12 h-12 text-wc-purple/30" />
      </motion.div>
      <motion.div
        className="absolute right-[10%] top-[25%]"
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Building2 className="w-12 h-12 text-blue-500/30" />
      </motion.div>
      <motion.div
        className="absolute left-[15%] bottom-[25%]"
        animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Zap className="w-8 h-8 text-yellow-400/30" />
      </motion.div>
      <motion.div
        className="absolute right-[15%] bottom-[30%]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-8 h-8 text-wc-pink/30" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 pt-8">
        {/* Animated VS Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, delay: 0.3 }}
          className="mb-8 inline-block"
        >
          <div className="relative">
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl blur-xl"
              style={{
                background: `linear-gradient(${glowPulse * 3.6}deg, #8B5CF6, #EC4899, #06B6D4, #8B5CF6)`,
                opacity: 0.5,
              }}
            />
            
            {/* Icons container */}
            <div className="relative flex items-center gap-4 px-8 py-6 rounded-3xl bg-dark-800/80 border border-white/10 backdrop-blur-xl">
              {/* Rocket */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-wc-purple to-wc-pink flex items-center justify-center"
              >
                <Rocket className="w-8 h-8 text-white" />
              </motion.div>

              {/* VS */}
              <AnimatePresence>
                {showVs && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative"
                  >
                    <motion.span
                      animate={{ 
                        textShadow: [
                          '0 0 20px #8B5CF6',
                          '0 0 40px #EC4899',
                          '0 0 20px #06B6D4',
                          '0 0 40px #8B5CF6',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl font-black text-white"
                    >
                      VS
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Building */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center"
              >
                <Building2 className="w-8 h-8 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Title with animated gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-5xl md:text-7xl font-black mb-2"
        >
          <motion.span
            className="inline-block bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, #8B5CF6, #EC4899, #06B6D4, #8B5CF6)`,
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            Innovation Driven
          </motion.span>
        </motion.h1>
        
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: "spring" }}
          className="text-5xl md:text-7xl font-black mb-6 text-white"
        >
          Environment
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-wc-purple" />
          <span className="text-2xl text-white/50 font-light">vs</span>
          <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-blue-500" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="text-3xl md:text-4xl font-light text-blue-400 mb-10"
        >
          Small/Medium Enterprise
        </motion.h2>

        {/* Description with typing effect feel */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-lg text-white/50 max-w-2xl mx-auto mb-10"
        >
          {slide.description}
        </motion.p>

        {/* Presenter info with style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-wc-purple to-wc-pink flex items-center justify-center">
              <span className="text-white font-bold">W</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-white">{slide.presenter}</p>
              <p className="text-xs text-white/50">Presenter</p>
            </div>
          </div>
          
          <div className="w-px h-10 bg-white/20" />
          
          <div className="text-left">
            <p className="text-sm text-white/70">{slide.event}</p>
            <p className="text-xs text-white/40">February 2026</p>
          </div>
        </motion.div>

        {/* Music & Start buttons */}
        {toggleEntrance && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            {/* Entrance Music Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleEntrance}
              className={`px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all ${
                entrancePlaying 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/50' 
                  : 'bg-white/10 text-white/70 hover:bg-white/15 border border-white/10'
              }`}
            >
              <Music className="w-4 h-4" />
              {entrancePlaying ? '♪ Playing...' : 'Play Intro Music'}
            </motion.button>
          </motion.div>
        )}

        {/* Start hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8"
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-flex items-center gap-2 text-white/30 text-sm"
          >
            <span>Press</span>
            <kbd className="px-2 py-1 rounded bg-white/10 font-mono">→</kbd>
            <span>or</span>
            <kbd className="px-2 py-1 rounded bg-white/10 font-mono">SPACE</kbd>
            <span>to begin</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TitleSlide;
