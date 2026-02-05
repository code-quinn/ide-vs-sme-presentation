import React from 'react';
import { motion } from 'framer-motion';

const TitleSlide = ({ slide }) => {
  const Icon = slide.icon;

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="mb-8 inline-block"
      >
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-wc-purple via-wc-pink to-wc-cyan p-[2px] animate-glow">
          <div className="w-full h-full rounded-2xl bg-dark-800 flex items-center justify-center">
            <Icon className="w-12 h-12 text-white" />
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-6xl md:text-7xl font-black mb-4 gradient-text"
      >
        {slide.title}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl md:text-4xl font-light text-white/70 mb-8"
      >
        {slide.subtitle}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-lg text-white/50 max-w-2xl mx-auto mb-12"
      >
        {slide.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex items-center justify-center gap-8 text-white/40"
      >
        <span className="font-medium">{slide.presenter}</span>
        <span className="w-1 h-1 rounded-full bg-white/40" />
        <span>{slide.event}</span>
      </motion.div>
    </div>
  );
};

export default TitleSlide;
