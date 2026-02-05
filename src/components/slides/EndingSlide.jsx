import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Twitter, Mail, Globe } from 'lucide-react';

const EndingSlide = ({ slide }) => {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 1 }}
        className="mb-8"
      >
        <div className="relative w-32 h-32 mx-auto">
          {/* Orbiting elements */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-wc-purple to-wc-pink flex items-center justify-center text-sm"
              style={{
                top: '50%',
                left: '50%',
                marginTop: -16,
                marginLeft: -16,
              }}
              animate={{
                x: Math.cos((i * Math.PI) / 2) * 50,
                y: Math.sin((i * Math.PI) / 2) * 50,
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                delay: i * 0.5,
                ease: "linear",
              }}
            >
              {['🚀', '💡', '⚡', '🎯'][i]}
            </motion.div>
          ))}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-wc-purple via-wc-pink to-wc-cyan flex items-center justify-center animate-glow">
            <Heart className="w-12 h-12 text-white" />
          </div>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-6xl font-black gradient-text mb-4"
      >
        {slide.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl text-white/50 mb-8"
      >
        {slide.subtitle}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-xl text-white/70 mb-12 italic"
      >
        "{slide.message}"
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex justify-center gap-6"
      >
        <a
          href={`https://twitter.com/${slide.social?.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="glass rounded-xl p-4 hover:bg-wc-purple/20 transition-colors group"
        >
          <Twitter className="w-6 h-6 text-white/60 group-hover:text-wc-cyan" />
        </a>
        <a
          href={`mailto:${slide.email}`}
          className="glass rounded-xl p-4 hover:bg-wc-purple/20 transition-colors group"
        >
          <Mail className="w-6 h-6 text-white/60 group-hover:text-wc-pink" />
        </a>
        <a
          href="https://chuksabanum.com/#home"
          target="_blank"
          rel="noopener noreferrer"
          className="glass rounded-xl p-4 hover:bg-wc-purple/20 transition-colors group"
        >
          <Globe className="w-6 h-6 text-white/60 group-hover:text-wc-purple" />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-12"
      >
        <div className="inline-flex items-center gap-2 text-white/30">
          <span className="font-mono text-sm">Built with</span>
          <Heart className="w-4 h-4 text-red-500 animate-pulse" />
          <span className="font-mono text-sm">by WorldClass & Quinn</span>
        </div>
      </motion.div>
    </div>
  );
};

export default EndingSlide;
