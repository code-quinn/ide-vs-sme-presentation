import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const AnimatedFlowSlide = ({ slide }) => {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-advance steps
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setStep(s => (s + 1) % (slide.ideFlow.length + slide.smeFlow.length + 2));
    }, 1500);
    return () => clearInterval(timer);
  }, [autoPlay, slide]);

  const ideStep = Math.min(step, slide.ideFlow.length);
  const smeStep = Math.min(step, slide.smeFlow.length);

  return (
    <div className="max-w-6xl mx-auto">
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
        className="text-white/50 text-center mb-8"
      >
        {slide.subtitle}
      </motion.p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* IDE Flow */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-wc-purple to-wc-pink flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-wc-purple">IDE Flow</h3>
            <span className="ml-auto text-sm text-emerald-400 font-mono">
              ~{slide.ideTime}
            </span>
          </div>

          <div className="space-y-3">
            {slide.ideFlow.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.3, x: -20 }}
                animate={{
                  opacity: idx < ideStep ? 1 : 0.3,
                  x: idx < ideStep ? 0 : -20,
                  scale: idx === ideStep - 1 ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  idx < ideStep ? 'bg-wc-purple/20' : 'bg-white/5'
                }`}
              >
                <motion.div
                  animate={{
                    backgroundColor: idx < ideStep ? '#10B981' : 'rgba(255,255,255,0.1)',
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                >
                  {idx < ideStep ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-white/50">{idx + 1}</span>
                  )}
                </motion.div>
                <span className={idx < ideStep ? 'text-white' : 'text-white/50'}>
                  {item}
                </span>
                {idx < ideStep && idx < slide.ideFlow.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-auto"
                  >
                    <ArrowRight className="w-4 h-4 text-wc-purple" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {ideStep >= slide.ideFlow.length && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-center"
            >
              <span className="text-emerald-400 font-bold">✓ Shipped!</span>
            </motion.div>
          )}
        </div>

        {/* SME Flow */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-blue-400">SME Flow</h3>
            <span className="ml-auto text-sm text-orange-400 font-mono">
              ~{slide.smeTime}
            </span>
          </div>

          <div className="space-y-3">
            {slide.smeFlow.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.3, x: -20 }}
                animate={{
                  opacity: idx < smeStep ? 1 : 0.3,
                  x: idx < smeStep ? 0 : -20,
                  scale: idx === smeStep - 1 ? 1.02 : 1,
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  idx < smeStep ? 'bg-blue-500/20' : 'bg-white/5'
                }`}
              >
                <motion.div
                  animate={{
                    backgroundColor: idx < smeStep ? '#3B82F6' : 'rgba(255,255,255,0.1)',
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                >
                  {idx < smeStep ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-white/50">{idx + 1}</span>
                  )}
                </motion.div>
                <span className={idx < smeStep ? 'text-white' : 'text-white/50'}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          {smeStep >= slide.smeFlow.length && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl bg-blue-500/20 border border-blue-500/30 text-center"
            >
              <span className="text-blue-400 font-bold">✓ Finally shipped</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            autoPlay ? 'bg-wc-purple text-white' : 'glass text-white/70'
          }`}
        >
          {autoPlay ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          onClick={() => setStep(0)}
          className="px-4 py-2 rounded-lg glass text-white/70 text-sm font-medium hover:bg-white/10"
        >
          ↺ Restart
        </button>
      </div>
    </div>
  );
};

export default AnimatedFlowSlide;
