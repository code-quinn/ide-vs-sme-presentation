import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Building2, Zap, Shield, TrendingUp, Clock } from 'lucide-react';

const VisualMetaphorSlide = ({ slide }) => {
  const [rocketY, setRocketY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRocketY(y => y > -200 ? y - 2 : 0);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-black gradient-text text-center mb-10"
      >
        {slide.title}
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* IDE - Rocket */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="glass rounded-3xl p-8 relative overflow-hidden min-h-[400px]">
            {/* Stars background */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Rocket */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ bottom: 100 }}
              animate={{ y: rocketY }}
            >
              {/* Flame */}
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-8"
                animate={{ scaleY: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 0.2, repeat: Infinity }}
              >
                <div className="w-8 h-16 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-full blur-sm" />
              </motion.div>
              
              {/* Rocket body */}
              <div className="relative">
                <div className="w-16 h-24 bg-gradient-to-b from-wc-purple to-wc-pink rounded-t-full rounded-b-lg mx-auto" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-wc-cyan rounded-full" />
                {/* Wings */}
                <div className="absolute bottom-0 -left-4 w-6 h-12 bg-wc-purple/80 rounded-bl-full -skew-x-12" />
                <div className="absolute bottom-0 -right-4 w-6 h-12 bg-wc-purple/80 rounded-br-full skew-x-12" />
              </div>
            </motion.div>

            {/* Label */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <h3 className="text-2xl font-bold text-wc-purple mb-1">IDE</h3>
              <p className="text-white/50 text-sm">Velocity-focused</p>
            </div>
          </div>

          {/* Traits */}
          <div className="mt-4 space-y-2">
            {[
              { icon: Rocket, text: "Move fast, break things, learn" },
              { icon: Zap, text: "Ship daily, iterate constantly" },
              { icon: TrendingUp, text: "Exponential growth mindset" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-center gap-3 text-white/70"
              >
                <item.icon className="w-4 h-4 text-wc-purple" />
                <span className="text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SME - Building */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="glass rounded-3xl p-8 relative overflow-hidden min-h-[400px]">
            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-emerald-900/30 to-transparent" />

            {/* Building */}
            <motion.div
              className="absolute bottom-16 left-1/2 -translate-x-1/2"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ originY: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Main building */}
                <div className="w-32 h-48 bg-gradient-to-b from-blue-600 to-blue-800 rounded-t-lg">
                  {/* Windows */}
                  <div className="grid grid-cols-3 gap-2 p-3 pt-6">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-6 h-8 bg-yellow-300/80 rounded-sm"
                        animate={{
                          opacity: Math.random() > 0.3 ? [0.6, 1, 0.6] : 0.3,
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                </div>
                {/* Roof */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-sm" />
              </div>
            </motion.div>

            {/* Label */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <h3 className="text-2xl font-bold text-blue-400 mb-1">SME</h3>
              <p className="text-white/50 text-sm">Stability-focused</p>
            </div>
          </div>

          {/* Traits */}
          <div className="mt-4 space-y-2">
            {[
              { icon: Building2, text: "Build on proven foundations" },
              { icon: Shield, text: "Minimize risk, maximize safety" },
              { icon: Clock, text: "Steady, predictable growth" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-center gap-3 text-white/70"
              >
                <item.icon className="w-4 h-4 text-blue-400" />
                <span className="text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-white/40 mt-8 text-sm"
      >
        Neither is "wrong" — but innovation requires velocity
      </motion.p>
    </div>
  );
};

export default VisualMetaphorSlide;
