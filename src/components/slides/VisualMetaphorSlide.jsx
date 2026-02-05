import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Building2, Zap, Shield, Target, Clock, Lightbulb, Sparkles, RefreshCw } from 'lucide-react';

const VisualMetaphorSlide = ({ slide }) => {
  // Rocket states: 'countdown' | 'launching' | 'success' | 'crash' | 'floating'
  const [rocketState, setRocketState] = useState('countdown');
  const [countdown, setCountdown] = useState(3);
  const [launchCount, setLaunchCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [crashCount, setCrashCount] = useState(0);

  // Launch sequence
  useEffect(() => {
    let timer;
    
    if (rocketState === 'countdown') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(c => c - 1), 800);
      } else {
        setRocketState('launching');
        setLaunchCount(c => c + 1);
      }
    } else if (rocketState === 'launching') {
      timer = setTimeout(() => {
        // 70% success, 30% crash
        const success = Math.random() > 0.3;
        if (success) {
          setRocketState('success');
          setSuccessCount(c => c + 1);
        } else {
          setRocketState('crash');
          setCrashCount(c => c + 1);
        }
      }, 2000);
    } else if (rocketState === 'success') {
      timer = setTimeout(() => setRocketState('floating'), 500);
    } else if (rocketState === 'floating') {
      timer = setTimeout(() => {
        setRocketState('countdown');
        setCountdown(3);
      }, 4000);
    } else if (rocketState === 'crash') {
      timer = setTimeout(() => {
        setRocketState('countdown');
        setCountdown(3);
      }, 3000);
    }
    
    return () => clearTimeout(timer);
  }, [rocketState, countdown]);

  const getRocketY = () => {
    switch (rocketState) {
      case 'countdown': return 320;
      case 'launching': return -100;
      case 'success': return 80;
      case 'floating': return 80;
      case 'crash': return 400;
      default: return 320;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-hide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-black gradient-text text-center mb-4"
      >
        {slide?.title || 'The Big Picture'}
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* IDE - Rocket Launch */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden min-h-[420px]" style={{
            background: 'linear-gradient(180deg, #0c0c1d 0%, #1a0a2e 50%, #2d1b4e 100%)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
          }}>
            {/* Stars background */}
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                />
              ))}
            </div>

            {/* Countdown display */}
            <AnimatePresence>
              {rocketState === 'countdown' && countdown > 0 && (
                <motion.div
                  initial={{ scale: 2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center z-20"
                >
                  <span className="text-8xl font-black text-wc-purple">{countdown}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Launch message */}
            <AnimatePresence>
              {rocketState === 'countdown' && countdown === 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center z-20"
                >
                  <span className="text-4xl font-black text-wc-cyan">LAUNCH!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success message */}
            <AnimatePresence>
              {rocketState === 'success' && (
                <motion.div
                  initial={{ scale: 0, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-20 inset-x-0 flex justify-center z-20"
                >
                  <div className="px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/50">
                    <span className="text-2xl font-bold text-emerald-400">🎉 SUCCESS!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Crash message */}
            <AnimatePresence>
              {rocketState === 'crash' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-20 inset-x-0 flex justify-center z-20"
                >
                  <div className="px-6 py-3 rounded-full bg-orange-500/20 border border-orange-500/50">
                    <span className="text-xl font-bold text-orange-400">💥 Failed... Iterating!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating success indicator */}
            <AnimatePresence>
              {rocketState === 'floating' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-16 inset-x-0 flex justify-center z-20"
                >
                  <div className="px-4 py-2 rounded-full bg-wc-purple/20 border border-wc-purple/50">
                    <span className="text-lg font-semibold text-wc-purple">🚀 Orbiting... Next launch soon</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ROCKET */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              animate={{ 
                y: getRocketY(),
                rotate: rocketState === 'crash' ? 180 : 0,
                scale: rocketState === 'crash' ? 0.5 : 1,
              }}
              transition={{ 
                duration: rocketState === 'launching' ? 2 : 0.5,
                ease: rocketState === 'launching' ? 'easeIn' : 'easeOut'
              }}
            >
              {/* Flame - only during launch */}
              {(rocketState === 'launching' || rocketState === 'countdown') && (
                <motion.div
                  className="absolute top-full left-1/2 -translate-x-1/2"
                  animate={{ 
                    scaleY: rocketState === 'launching' ? [1, 1.5, 1.2, 1.8, 1] : [0.3, 0.5, 0.3],
                    opacity: rocketState === 'launching' ? 1 : 0.5 
                  }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                >
                  <div className="w-12 h-24 bg-gradient-to-b from-yellow-300 via-orange-500 to-transparent rounded-b-full blur-sm" />
                  <div className="absolute inset-0 w-8 h-20 mx-auto bg-gradient-to-b from-white via-yellow-300 to-transparent rounded-b-full" />
                </motion.div>
              )}

              {/* Rocket body */}
              <div className="relative">
                {/* Nose cone */}
                <div className="w-0 h-0 mx-auto border-l-[24px] border-r-[24px] border-b-[40px] border-l-transparent border-r-transparent border-b-wc-purple" />
                
                {/* Body */}
                <div className="w-12 h-20 mx-auto bg-gradient-to-b from-wc-purple to-purple-700 rounded-b-lg">
                  {/* Window */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-wc-cyan border-2 border-cyan-300" />
                </div>
                
                {/* Fins */}
                <div className="absolute bottom-0 -left-3 w-4 h-10 bg-purple-600 rounded-bl-lg -skew-x-12" />
                <div className="absolute bottom-0 -right-3 w-4 h-10 bg-purple-600 rounded-br-lg skew-x-12" />
              </div>
            </motion.div>

            {/* Explosion effect */}
            <AnimatePresence>
              {rocketState === 'crash' && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute bottom-20 left-1/2 -translate-x-1/2"
                >
                  <div className="w-20 h-20 bg-gradient-radial from-yellow-400 via-orange-500 to-red-600 rounded-full blur-md" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ground */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-purple-900/50 to-transparent" />

            {/* Stats */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between text-xs font-mono">
              <span className="text-emerald-400">✓ {successCount}</span>
              <span className="text-white/50">Launches: {launchCount}</span>
              <span className="text-orange-400">✗ {crashCount}</span>
            </div>

            {/* Label */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-wc-purple/20 border border-wc-purple/40">
                <Rocket className="w-4 h-4 text-wc-purple" />
                <span className="font-bold text-wc-purple">IDE</span>
              </div>
            </div>
          </div>

          {/* Traits */}
          <div className="mt-4 space-y-2">
            {[
              { icon: Zap, text: "Launch fast, learn from crashes" },
              { icon: RefreshCw, text: "Fail → Iterate → Launch again" },
              { icon: Target, text: "Each failure = valuable data" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-wc-purple/10 border border-wc-purple/20"
              >
                <item.icon className="w-4 h-4 text-wc-purple" />
                <span className="text-white/80 text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SME - Stable Building */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden min-h-[420px]" style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 60%, #334155 100%)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
          }}>
            {/* Stars */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 40}%`,
                  opacity: 0.3 + Math.random() * 0.4,
                }}
              />
            ))}

            {/* Moon */}
            <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-yellow-100/80" />

            {/* Building */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
              {/* Main tower */}
              <div className="relative">
                <div className="w-32 h-56 bg-gradient-to-b from-blue-600 to-blue-800 rounded-t-lg">
                  {/* Windows grid */}
                  <div className="grid grid-cols-4 gap-2 p-3 pt-4">
                    {[...Array(28)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-5 h-6 rounded-sm"
                        style={{ 
                          background: Math.random() > 0.3 ? '#FDE047' : '#1e3a8a',
                          opacity: Math.random() > 0.3 ? 0.8 : 0.4 
                        }}
                        animate={Math.random() > 0.8 ? { opacity: [0.8, 0.4, 0.8] } : {}}
                        transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Roof */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-500" />
                
                {/* Antenna */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-500">
                  <motion.div 
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                {/* Side wings */}
                <div className="absolute top-20 -left-8 w-10 h-36 bg-blue-700 rounded-t-sm" />
                <div className="absolute top-24 -right-8 w-10 h-32 bg-blue-700 rounded-t-sm" />
              </div>
            </div>

            {/* Ground */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-emerald-900/50 to-transparent" />
            
            {/* Trees */}
            <div className="absolute bottom-14 left-8">
              <div className="w-1 h-6 bg-amber-800 mx-auto" />
              <div className="w-8 h-8 rounded-full bg-emerald-600 -mt-2" />
            </div>
            <div className="absolute bottom-14 right-12">
              <div className="w-1 h-5 bg-amber-800 mx-auto" />
              <div className="w-6 h-6 rounded-full bg-emerald-700 -mt-1" />
            </div>

            {/* Status */}
            <div className="absolute bottom-3 inset-x-3 text-center">
              <span className="text-xs font-mono text-blue-300/60">Steady operations • 99.9% uptime</span>
            </div>

            {/* Label */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/40">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-blue-400">SME</span>
              </div>
            </div>
          </div>

          {/* Traits */}
          <div className="mt-4 space-y-2">
            {[
              { icon: Building2, text: "Build on proven foundations" },
              { icon: Shield, text: "Minimize risk, ensure stability" },
              { icon: Clock, text: "Steady, predictable growth" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20"
              >
                <item.icon className="w-4 h-4 text-blue-400" />
                <span className="text-white/80 text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center mt-6"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-wc-purple/10 to-blue-500/10 border border-white/10">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <p className="text-white/70 text-sm">
            IDEs embrace failure as <span className="text-wc-purple font-semibold">learning fuel</span> — SMEs optimize for <span className="text-blue-400 font-semibold">zero failures</span>
          </p>
          <Sparkles className="w-5 h-5 text-wc-pink" />
        </div>
      </motion.div>
    </div>
  );
};

export default VisualMetaphorSlide;
