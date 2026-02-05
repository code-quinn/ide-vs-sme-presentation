import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedChartSlide = ({ slide }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-black gradient-text text-center mb-2"
      >
        {slide.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white/50 text-center mb-10"
      >
        {slide.subtitle}
      </motion.p>

      <div className="space-y-6">
        {slide.metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-white">{metric.label}</span>
              <div className="flex gap-4 text-sm">
                <span className="text-wc-purple">IDE: {metric.ideLabel}</span>
                <span className="text-blue-400">SME: {metric.smeLabel}</span>
              </div>
            </div>

            <div className="relative h-12 flex gap-2">
              {/* IDE Bar */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-white/5 rounded-lg" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: animate ? `${metric.ideValue}%` : 0 }}
                  transition={{ duration: 1, delay: idx * 0.15 + 0.3, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-wc-purple to-wc-pink rounded-lg flex items-center justify-end pr-3"
                >
                  <span className="text-white font-bold text-sm">{metric.ideValue}%</span>
                </motion.div>
              </div>

              {/* SME Bar */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-white/5 rounded-lg" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: animate ? `${metric.smeValue}%` : 0 }}
                  transition={{ duration: 1, delay: idx * 0.15 + 0.5, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-end pr-3"
                >
                  <span className="text-white font-bold text-sm">{metric.smeValue}%</span>
                </motion.div>
              </div>
            </div>

            {metric.insight && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.15 + 1 }}
                className="text-sm text-white/40 mt-2 italic"
              >
                💡 {metric.insight}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex justify-center gap-8 mt-8"
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-wc-purple to-wc-pink" />
          <span className="text-sm text-white/60">IDE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-500 to-blue-600" />
          <span className="text-sm text-white/60">SME</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedChartSlide;
