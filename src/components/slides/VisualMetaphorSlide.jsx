import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Target, Clock, Lightbulb, Sparkles, TrendingUp, Building2, Rocket } from 'lucide-react';

const VisualMetaphorSlide = ({ slide }) => {
  // Rocket launch state
  const [launched, setLaunched] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [launchResult, setLaunchResult] = useState(null);

  // Pre-generate stable random values for windows
  const windowDelays = useMemo(() => 
    [...Array(20)].map(() => Math.random() * 2), 
    []
  );
  const windowDurations = useMemo(() => 
    [...Array(20)].map(() => 2 + Math.random() * 2), 
    []
  );

  // Pre-generate stable star positions
  const stars = useMemo(() => 
    [...Array(50)].map((_, i) => ({
      left: `${(i * 17 + 13) % 100}%`,
      top: `${(i * 23 + 7) % 100}%`,
      opacity: 0.3 + (i % 5) * 0.1,
      duration: 2 + (i % 3),
      delay: (i % 4) * 0.5
    })), 
    []
  );

  // SME building star positions (fewer, more subtle)
  const smeStars = useMemo(() =>
    [...Array(20)].map((_, i) => ({
      left: `${(i * 19 + 11) % 100}%`,
      top: `${(i * 13 + 5) % 50}%`,
      opacity: 0.2 + (i % 4) * 0.1
    })),
    []
  );

  // Rocket launch cycle
  useEffect(() => {
    const launchCycle = () => {
      // Start countdown
      setCountdown(3);
      setTimeout(() => setCountdown(2), 1000);
      setTimeout(() => setCountdown(1), 2000);
      setTimeout(() => {
        setCountdown(null);
        setLaunched(true);
        // Random result - 70% success, 30% "learning opportunity"
        const success = Math.random() > 0.3;
        setTimeout(() => {
          setLaunchResult(success ? 'success' : 'iterate');
        }, 1500);
      }, 3000);
      
      // Reset after animation
      setTimeout(() => {
        setLaunched(false);
        setLaunchResult(null);
      }, 6000);
    };

    // Initial launch after 1s
    const initialTimer = setTimeout(launchCycle, 1000);
    
    // Repeat every 8s
    const interval = setInterval(launchCycle, 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-hide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-black gradient-text text-center mb-8"
      >
        {slide?.title || 'The Big Picture'}
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* IDE - Rocket Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div 
            className="relative rounded-3xl overflow-hidden h-[420px] flex flex-col"
            style={{
              background: 'linear-gradient(180deg, #0c0a1d 0%, #1a103d 30%, #2d1b69 70%, #4c1d95 100%)',
              border: '2px solid rgba(139, 92, 246, 0.4)',
              boxShadow: '0 0 60px rgba(139, 92, 246, 0.2), inset 0 0 80px rgba(139, 92, 246, 0.1)',
            }}
          >
            {/* Starfield background */}
            <div className="absolute inset-0 overflow-hidden">
              {stars.map((star, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: star.left,
                    top: star.top,
                    opacity: star.opacity,
                  }}
                  animate={{
                    opacity: [star.opacity, star.opacity + 0.4, star.opacity],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: star.duration,
                    repeat: Infinity,
                    delay: star.delay,
                  }}
                />
              ))}
            </div>
            
            {/* Nebula glow effects */}
            <div 
              className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            <div 
              className="absolute bottom-20 right-10 w-40 h-40 rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
                filter: 'blur(25px)',
              }}
            />

            {/* Label */}
            <div className="absolute top-4 left-4 z-20">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/50 backdrop-blur-sm">
                <Rocket className="w-5 h-5 text-purple-400" />
                <span className="font-bold text-purple-300 text-lg">IDE</span>
              </div>
            </div>

            {/* Countdown Display */}
            <AnimatePresence>
              {countdown !== null && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  className="absolute top-1/4 left-1/2 -translate-x-1/2 z-30"
                >
                  <span className="text-8xl font-black text-white drop-shadow-lg"
                    style={{ textShadow: '0 0 40px rgba(168, 85, 247, 0.8)' }}
                  >
                    {countdown}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Launch Result */}
            <AnimatePresence>
              {launchResult && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-1/4 left-1/2 -translate-x-1/2 z-30 text-center"
                >
                  {launchResult === 'success' ? (
                    <>
                      <span className="text-6xl">✨🎉✨</span>
                      <p className="text-green-400 font-bold mt-2">SHIPPED!</p>
                    </>
                  ) : (
                    <>
                      <span className="text-6xl">💥📊💡</span>
                      <p className="text-orange-400 font-bold mt-2">Learning!</p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rocket with Animation */}
            <div className="flex-1 flex items-center justify-center relative z-10">
              <motion.div
                animate={{ 
                  y: launched ? -350 : 0,
                  scale: launched ? 0.7 : 1,
                  rotate: launched ? -5 : 0,
                }}
                transition={{
                  duration: launched ? 2 : 0.5,
                  ease: launched ? "easeIn" : "easeOut"
                }}
                className="relative"
              >
                {/* The Rocket */}
                <div className="text-8xl transform -rotate-45">🚀</div>
                
                {/* Flame trail when launching */}
                <AnimatePresence>
                  {launched && (
                    <>
                      {/* Main flame */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [1, 0.8, 1],
                          scale: [1, 1.3, 1],
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-6xl"
                        style={{ filter: 'blur(1px)' }}
                      >
                        🔥
                      </motion.div>
                      {/* Smoke particles */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0.8, y: 0, x: 0, scale: 0.5 }}
                          animate={{ 
                            opacity: 0,
                            y: 100 + i * 30,
                            x: (i - 2) * 15,
                            scale: 2
                          }}
                          transition={{ 
                            duration: 1.5,
                            delay: i * 0.1,
                            repeat: Infinity 
                          }}
                          className="absolute -bottom-4 left-1/2 text-3xl"
                        >
                          💨
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Idle flame animation when not launched */}
              {!launched && countdown === null && (
                <motion.div
                  className="absolute bottom-20 left-1/2 -translate-x-1/2"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.6, 0.9, 0.6]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <span className="text-4xl">🔥</span>
                </motion.div>
              )}
            </div>

            {/* Launch platform */}
            <div className="absolute bottom-0 left-0 right-0 h-20">
              <div 
                className="w-full h-full"
                style={{
                  background: 'linear-gradient(to top, #1e1b4b 0%, transparent 100%)',
                }}
              />
              {/* Platform base */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="w-32 h-3 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 rounded-lg" />
                <div className="w-24 h-2 bg-slate-700 rounded mx-auto mt-1" />
              </div>
            </div>

            {/* Status text */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <motion.span 
                className="text-sm font-mono text-purple-300/80 bg-purple-900/30 px-4 py-1.5 rounded-full"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀 Launch → Learn → Iterate → Repeat
              </motion.span>
            </div>
          </div>

          {/* IDE Traits */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: Zap, text: "Ship fast", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
              { icon: Target, text: "Learn from failures", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" },
              { icon: TrendingUp, text: "Iterate rapidly", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className={`flex items-center gap-2 px-3 py-3 rounded-xl ${item.bg} border ${item.border}`}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-white/90 text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SME - Building with Lights Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div 
            className="relative rounded-3xl overflow-hidden h-[420px] flex flex-col"
            style={{
              background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 40%, #334155 80%, #475569 100%)',
              border: '2px solid rgba(59, 130, 246, 0.4)',
              boxShadow: '0 0 60px rgba(59, 130, 246, 0.15), inset 0 0 80px rgba(59, 130, 246, 0.05)',
            }}
          >
            {/* Stars - subtle */}
            <div className="absolute inset-0 overflow-hidden">
              {smeStars.map((star, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full"
                  style={{
                    left: star.left,
                    top: star.top,
                    opacity: star.opacity,
                  }}
                />
              ))}
            </div>

            {/* Moon */}
            <motion.div
              className="absolute top-8 right-10"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div 
                className="w-14 h-14 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #fef9c3 0%, #fde68a 50%, #fcd34d 100%)',
                  boxShadow: '0 0 40px rgba(254, 249, 195, 0.4)',
                }}
              />
            </motion.div>

            {/* Label */}
            <div className="absolute top-4 left-4 z-20">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/50 backdrop-blur-sm">
                <Building2 className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-blue-300 text-lg">SME</span>
              </div>
            </div>

            {/* City Skyline with Buildings */}
            <div className="flex-1 flex items-end justify-center relative z-10 pb-16">
              <div className="flex items-end gap-3">
                {/* Building 1 - Shorter */}
                <div className="relative">
                  <div 
                    className="w-16 h-28 rounded-t-lg relative"
                    style={{
                      background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                      boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Windows */}
                    <div className="grid grid-cols-2 gap-1.5 p-2">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-5 h-5 rounded-sm"
                          style={{ backgroundColor: '#fef08a' }}
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ 
                            duration: windowDurations[i],
                            repeat: Infinity,
                            delay: windowDelays[i]
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Building 2 - Main/Tallest */}
                <div className="relative">
                  <div 
                    className="w-24 h-48 rounded-t-lg relative"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e3a8a 100%)',
                      boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Windows grid */}
                    <div className="grid grid-cols-3 gap-1.5 p-3">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-5 h-6 rounded-sm"
                          style={{ backgroundColor: '#fef08a' }}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ 
                            duration: windowDurations[i + 6],
                            repeat: Infinity,
                            delay: windowDelays[i + 6]
                          }}
                        />
                      ))}
                    </div>
                    {/* Antenna */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <motion.div
                        className="w-3 h-3 bg-red-500 rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{ boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)' }}
                      />
                      <div className="w-0.5 h-4 bg-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Building 3 - Medium */}
                <div className="relative">
                  <div 
                    className="w-14 h-36 rounded-t-lg relative"
                    style={{
                      background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                      boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Windows */}
                    <div className="grid grid-cols-2 gap-1 p-2">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-4 h-5 rounded-sm"
                          style={{ backgroundColor: '#fef08a' }}
                          animate={{ opacity: [0.3, 0.9, 0.3] }}
                          transition={{ 
                            duration: windowDurations[(i + 18) % 20],
                            repeat: Infinity,
                            delay: windowDelays[(i + 18) % 20]
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ground / City base */}
            <div className="absolute bottom-0 left-0 right-0 h-16">
              <div 
                className="w-full h-full"
                style={{
                  background: 'linear-gradient(to top, #065f46 0%, #047857 50%, transparent 100%)',
                }}
              />
              {/* Street lights */}
              <div className="absolute bottom-6 left-1/4 flex flex-col items-center">
                <motion.div
                  className="w-2 h-2 bg-yellow-300 rounded-full"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ boxShadow: '0 0 8px rgba(253, 224, 71, 0.6)' }}
                />
                <div className="w-0.5 h-4 bg-slate-500" />
              </div>
              <div className="absolute bottom-6 right-1/4 flex flex-col items-center">
                <motion.div
                  className="w-2 h-2 bg-yellow-300 rounded-full"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  style={{ boxShadow: '0 0 8px rgba(253, 224, 71, 0.6)' }}
                />
                <div className="w-0.5 h-4 bg-slate-500" />
              </div>
            </div>

            {/* Status text */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="text-sm font-mono text-blue-300/80 bg-blue-900/30 px-4 py-1.5 rounded-full">
                🏢 99.9% Uptime • Steady Growth • Predictable
              </span>
            </div>
          </div>

          {/* SME Traits */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: Shield, text: "Minimize risk", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
              { icon: Building2, text: "Solid foundation", color: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/30" },
              { icon: Clock, text: "Steady growth", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className={`flex items-center gap-2 px-3 py-3 rounded-xl ${item.bg} border ${item.border}`}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-white/90 text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8"
      >
        <div 
          className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
          }}
        >
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <p className="text-white/80 text-base">
            <span className="text-purple-400 font-bold">IDE: </span>
            Every crash = data → learning → iteration
            <span className="mx-4 text-white/30">|</span>
            <span className="text-blue-400 font-bold">SME: </span>
            Stability over speed, every time
          </p>
          <Sparkles className="w-6 h-6 text-pink-400" />
        </div>
      </motion.div>
    </div>
  );
};

export default VisualMetaphorSlide;
