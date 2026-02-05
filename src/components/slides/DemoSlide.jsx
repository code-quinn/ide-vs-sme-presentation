import React from 'react';
import { motion } from 'framer-motion';
import { Play, Terminal, Code, Zap } from 'lucide-react';

const DemoSlide = ({ slide }) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative w-32 h-32 mx-auto mb-8"
      >
        {/* Pulsing circle */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 rounded-full bg-red-500"
        />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
          <Play className="w-12 h-12 text-white ml-2" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl font-black gradient-text mb-4"
      >
        {slide.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-2xl text-white/50 mb-12"
      >
        {slide.subtitle}
      </motion.p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {slide.items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + idx * 0.1 }}
            className="glass rounded-xl p-5 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-wc-purple to-wc-pink flex items-center justify-center">
              {idx === 0 ? <Terminal className="w-6 h-6 text-white" /> :
               idx === 1 ? <Zap className="w-6 h-6 text-white" /> :
               idx === 2 ? <Code className="w-6 h-6 text-white" /> :
               <Play className="w-6 h-6 text-white" />}
            </div>
            <span className="text-lg text-white/80">{item}</span>
          </motion.div>
        ))}
      </div>

      {/* Fake terminal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="glass rounded-xl overflow-hidden text-left"
      >
        <div className="bg-dark-700 px-4 py-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-4 text-white/50 text-sm font-mono">terminal</span>
        </div>
        <div className="p-4 font-mono text-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-white/70"
          >
            <span className="text-wc-purple">$</span> quinn deploy --feature "new-dashboard"
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-emerald-400 mt-2"
          >
            ✓ Feature deployed in 3.2s
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-wc-cyan mt-1"
          >
            → Live at https://app.worldclass.dev/dashboard
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DemoSlide;
