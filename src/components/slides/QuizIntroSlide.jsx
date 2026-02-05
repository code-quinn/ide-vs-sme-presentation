import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Trophy, Zap } from 'lucide-react';

const QuizIntroSlide = ({ slide }) => {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="w-32 h-32 rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 mx-auto mb-8 flex items-center justify-center shadow-2xl"
      >
        <Gamepad2 className="w-16 h-16 text-white" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl font-black mb-4"
      >
        {slide.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-2xl text-white/70 mb-8"
      >
        {slide.subtitle}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-lg text-white/50 mb-8"
      >
        {slide.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
        className="inline-flex items-center gap-3 glass rounded-full px-6 py-3"
      >
        <Trophy className="w-6 h-6 text-yellow-400" />
        <span className="text-xl font-bold text-yellow-400">{slide.points}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-12 flex justify-center gap-4"
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              delay: i * 0.2 
            }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-wc-purple to-wc-pink flex items-center justify-center text-xl"
          >
            {['🧠', '⚡', '🎯', '🚀'][i]}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default QuizIntroSlide;
