import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Target, Clock, Lightbulb, Sparkles, TrendingUp, Building2, Rocket } from 'lucide-react';

const VisualMetaphorSlide = ({ slide }) => {
  // Rocket launch state
  const [launched, setLaunched] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [launchResult, setLaunchResult] = useState(null);

  // SME Building workflow state
  const [elevatorFloor, setElevatorFloor] = useState(0);

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

  // Elevator animation
  useEffect(() => {
    const interval = setInterval(() => {
      setElevatorFloor(prev => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
        // ~65% success, ~35% crash - fail fast but succeed more often
        const success = Math.random() > 0.35;
        setTimeout(() => {
          setLaunchResult(success ? 'success' : 'iterate');
        }, 1200); // Faster - matches rocket speed
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

            {/* Countdown Display - Small, right side, away from rocket */}
            <AnimatePresence>
              {countdown !== null && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.2, opacity: 0 }}
                  className="absolute top-14 right-3 z-30"
                >
                  <div 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                    style={{
                      background: 'rgba(88, 28, 135, 0.7)',
                      border: '1px solid rgba(168, 85, 247, 0.5)',
                    }}
                  >
                    <span className="text-[10px] text-purple-300 uppercase">T-</span>
                    <span className="text-2xl font-bold text-white">{countdown}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Launch Result - Small badge, right side */}
            <AnimatePresence>
              {launchResult && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-14 right-3 z-30"
                >
                  {launchResult === 'success' ? (
                    <div 
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                      style={{
                        background: 'rgba(21, 128, 61, 0.8)',
                        border: '1px solid rgba(74, 222, 128, 0.5)',
                      }}
                    >
                      <span className="text-lg">🎉</span>
                      <span className="text-sm font-bold text-green-300">SHIPPED!</span>
                    </div>
                  ) : (
                    <div 
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                      style={{
                        background: 'rgba(154, 52, 18, 0.8)',
                        border: '1px solid rgba(251, 146, 60, 0.5)',
                      }}
                    >
                      <span className="text-lg">💥</span>
                      <span className="text-sm font-bold text-orange-300">Iterate!</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Metaphorical Labels Legend */}
            <div className="absolute bottom-20 left-4 text-xs text-white/60 space-y-1 z-20">
              <div className="flex items-center gap-2">
                <span>🚀</span>
                <span>= Your Idea/Product</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🔥</span>
                <span>= Energy & Effort</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💨</span>
                <span>= Massive Launch Power</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💧</span>
                <span>= Resources & Cooling</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💥</span>
                <span>= Fail Fast → Learn</span>
              </div>
            </div>

            {/* Rocket with Animation - Proper vertical alignment */}
            <div className="flex-1 flex items-center justify-center relative z-10">
              {/* Speed lines during launch */}
              {launched && (
                <motion.div 
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-0.5 bg-white/30 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        height: '40px',
                        top: '20%',
                      }}
                      animate={{ 
                        y: [0, 200],
                        opacity: [0.6, 0]
                      }}
                      transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        delay: i * 0.08,
                        ease: "linear"
                      }}
                    />
                  ))}
                </motion.div>
              )}

              {/* WATER PIPES WITH SPRAY - Visible pipes on left and right */}
              {(launched || countdown !== null) && (
                <>
                  {/* RIGHT PIPE STRUCTURE - Water sprayer */}
                  <div className="absolute bottom-20 right-[8%] z-30">
                    {/* Vertical pipe */}
                    <div className="w-3 h-16 bg-gradient-to-b from-slate-400 to-slate-500 rounded-sm"
                      style={{ boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.3)' }} />
                    {/* Horizontal nozzle */}
                    <div className="absolute top-2 right-3 w-8 h-2 bg-gradient-to-l from-slate-500 to-slate-400 rounded-l-full"
                      style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }} />
                    {/* Water spray from nozzle */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={`water-r-${i}`}
                        className="absolute"
                        style={{
                          width: 4 + (i % 3) * 2,
                          height: 10 + (i % 4) * 5,
                          background: 'linear-gradient(to bottom, rgba(147, 197, 253, 0.9), rgba(59, 130, 246, 0.8))',
                          borderRadius: '50%',
                          right: 11,
                          top: 3,
                        }}
                        animate={{
                          x: [0, -30 - (i % 4) * 20, -80 - (i % 3) * 25],
                          y: [0, 10 + (i % 3) * 8, 40 + (i % 4) * 15],
                          opacity: [0.9, 0.7, 0],
                          scaleY: [1, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 0.5 + (i % 3) * 0.1,
                          repeat: Infinity,
                          delay: i * 0.04,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* SMOKE - 9X MASSIVE effect */}
              {(launched || countdown !== null) && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-15 pointer-events-none">
                  {/* 36 outer smoke puffs */}
                  {[...Array(36)].map((_, i) => (
                    <motion.div
                      key={`smoke-${i}`}
                      className="absolute rounded-full"
                      style={{
                        width: 50 + (i % 5) * 25,
                        height: 45 + (i % 5) * 20,
                        background: `rgba(220, 220, 220, ${0.8 - (i % 6) * 0.07})`,
                        filter: 'blur(5px)',
                        left: -50 + (i % 8) * 12,
                        top: (i % 4) * 8,
                      }}
                      initial={{ y: 0, scale: 0.3, opacity: 0.8 }}
                      animate={{
                        y: [0, 30 + (i % 5) * 20],
                        x: ((i % 2 === 0 ? -1 : 1) * (35 + (i % 5) * 25)),
                        scale: [0.3, 1.5, 2.5],
                        opacity: [0.8, 0.5, 0],
                      }}
                      transition={{
                        duration: 2 + (i % 4) * 0.3,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                  {/* 18 dense center smoke */}
                  {[...Array(18)].map((_, i) => (
                    <motion.div
                      key={`core-smoke-${i}`}
                      className="absolute rounded-full"
                      style={{
                        width: 60 + (i % 4) * 30,
                        height: 55 + (i % 4) * 25,
                        background: 'rgba(240, 240, 240, 0.85)',
                        filter: 'blur(4px)',
                        left: -35 + (i % 5) * 14,
                        top: 0,
                      }}
                      initial={{ y: 0, scale: 0.2, opacity: 0.85 }}
                      animate={{
                        y: [0, 20 + (i % 4) * 15],
                        x: ((i % 2 === 0 ? -1 : 1) * (20 + (i % 4) * 18)),
                        scale: [0.2, 1.3, 2.2],
                        opacity: [0.85, 0.6, 0],
                      }}
                      transition={{
                        duration: 1.6 + (i % 3) * 0.2,
                        repeat: Infinity,
                        delay: i * 0.08,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                  {/* 12 ground-spreading smoke */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={`ground-smoke-${i}`}
                      className="absolute rounded-full"
                      style={{
                        width: 80 + (i % 4) * 40,
                        height: 40 + (i % 3) * 20,
                        background: 'rgba(200, 200, 200, 0.7)',
                        filter: 'blur(6px)',
                        left: -40 + (i % 6) * 15,
                        top: 20,
                      }}
                      initial={{ y: 0, scale: 0.3, opacity: 0.7 }}
                      animate={{
                        y: [0, 25 + (i % 3) * 15],
                        x: ((i % 2 === 0 ? -1 : 1) * (50 + (i % 4) * 35)),
                        scale: [0.3, 1.5, 3],
                        opacity: [0.7, 0.4, 0],
                      }}
                      transition={{
                        duration: 2.2 + (i % 3) * 0.3,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>
              )}

              {/* ROCKET + FIRE - Move together as one unit */}
              <motion.div
                className="flex flex-col items-center relative z-10"
                animate={{ 
                  y: launched ? (launchResult === 'iterate' ? -150 : -350) : 0,
                  scale: launched ? 0.85 : 1,
                  rotate: launchResult === 'iterate' ? [0, -5, 5, -3, 0] : 0,
                }}
                transition={{
                  duration: launched ? 1.2 : 0.3,
                  ease: launched ? [0.2, 0.8, 0.2, 1] : "easeOut"
                }}
              >
                {/* CRASH EXPLOSION - Shows on rocket when it fails */}
                <AnimatePresence>
                  {launchResult === 'iterate' && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center z-20"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      {/* Explosion emojis around rocket */}
                      <motion.span 
                        className="absolute text-5xl"
                        style={{ top: -20, left: -30 }}
                        animate={{ scale: [0, 1.5, 1], rotate: [0, 15, 0] }}
                        transition={{ duration: 0.3 }}
                      >💥</motion.span>
                      <motion.span 
                        className="absolute text-4xl"
                        style={{ top: 10, right: -25 }}
                        animate={{ scale: [0, 1.3, 1], rotate: [0, -10, 0] }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >💥</motion.span>
                      <motion.span 
                        className="absolute text-5xl"
                        style={{ top: -10, left: 10 }}
                        animate={{ scale: [0, 1.4, 1] }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                      >🔥</motion.span>
                      <motion.span 
                        className="absolute text-3xl"
                        style={{ bottom: 20, left: -20 }}
                        animate={{ scale: [0, 1.2, 1], y: [0, -10, 0] }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                      >💨</motion.span>
                      <motion.span 
                        className="absolute text-3xl"
                        style={{ bottom: 10, right: -15 }}
                        animate={{ scale: [0, 1.2, 1], y: [0, -8, 0] }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >💨</motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* The Rocket - Rotated to point STRAIGHT UP */}
                <motion.div 
                  className="text-8xl"
                  style={{ transform: 'rotate(-45deg)' }}
                  animate={{
                    opacity: launchResult === 'iterate' ? [1, 0.7, 1] : 1,
                    filter: launchResult === 'iterate' ? 'brightness(0.7)' : 'brightness(1)',
                  }}
                >
                  🚀
                </motion.div>
                
                {/* FIRE - ATTACHED to rocket, moves with it */}
                {(launched || countdown !== null) && (
                  <motion.div className="flex flex-col items-center -mt-4">
                    {/* Main thrust flame */}
                    <motion.div
                      animate={{ 
                        scaleY: [1, 1.4, 1.1, 1.6, 1],
                        scaleX: [1, 0.85, 1.1, 0.9, 1],
                      }}
                      transition={{ duration: 0.12, repeat: Infinity }}
                      className="text-5xl origin-top"
                    >
                      🔥
                    </motion.div>
                    
                    {/* Secondary flames for width */}
                    <div className="flex -mt-3">
                      <motion.span 
                        animate={{ 
                          opacity: [0.7, 1, 0.7], 
                          scaleY: [1, 1.3, 1],
                          rotate: [-8, -12, -8] 
                        }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                        className="text-3xl"
                      >🔥</motion.span>
                      <motion.span 
                        animate={{ 
                          opacity: [0.8, 1, 0.8], 
                          scaleY: [1, 1.2, 1],
                          rotate: [8, 12, 8] 
                        }}
                        transition={{ duration: 0.11, repeat: Infinity }}
                        className="text-3xl"
                      >🔥</motion.span>
                    </div>
                    
                    {/* Tertiary flames - extra intensity */}
                    <div className="flex -mt-2">
                      <motion.span 
                        animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.9, 1.1, 0.9] }}
                        transition={{ duration: 0.08, repeat: Infinity }}
                        className="text-2xl"
                      >🔥</motion.span>
                    </div>
                  </motion.div>
                )}

                {/* Idle flame animation when not launched */}
                {!launched && countdown === null && (
                  <motion.div
                    className="-mt-4"
                    animate={{ 
                      scale: [1, 1.15, 1],
                      opacity: [0.6, 0.9, 0.6]
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <span className="text-4xl">🔥</span>
                  </motion.div>
                )}
              </motion.div>
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
                🚀 Launch → Crash → Learn → Iterate → Repeat
              </motion.span>
            </div>
          </div>

          {/* IDE Traits */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: Zap, text: "Ship fast", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
              { icon: Target, text: "Fail fast, learn", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" },
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

        {/* SME - Building with Animated Workflow */}
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

            {/* City Skyline with Realistic Corporate Building */}
            <div className="flex-1 flex items-end justify-center relative z-10 pb-12">
              <div className="flex items-end gap-1">
                {/* Building 1 - Left residential tower */}
                <div className="relative">
                  {/* Rooftop water tank */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-3 bg-slate-500 rounded-sm" />
                  <div 
                    className="w-16 h-32 relative"
                    style={{
                      background: 'linear-gradient(180deg, #4b5563 0%, #374151 50%, #1f2937 100%)',
                      boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.4), 2px 0 8px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Window grid */}
                    <div className="grid grid-cols-3 gap-1 p-1.5">
                      {[...Array(12)].map((_, i) => (
                        <motion.div 
                          key={i} 
                          className="w-3 h-4 rounded-sm"
                          style={{
                            background: i % 3 === 0 ? 'rgba(254, 240, 138, 0.9)' : 'rgba(254, 240, 138, 0.4)',
                            boxShadow: i % 3 === 0 ? '0 0 4px rgba(254, 240, 138, 0.6)' : 'none',
                          }}
                          animate={i % 4 === 0 ? { opacity: [0.4, 0.9, 0.4] } : {}}
                          transition={{ duration: 3 + i, repeat: Infinity }}
                        />
                      ))}
                    </div>
                    {/* AC units */}
                    <div className="absolute -right-1 top-8 w-2 h-3 bg-slate-400 rounded-sm" />
                    <div className="absolute -right-1 top-20 w-2 h-3 bg-slate-400 rounded-sm" />
                  </div>
                </div>

                {/* Main Corporate HQ Building - Glass & Steel */}
                <div className="relative">
                  {/* Helipad on roof */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-2 bg-slate-600 rounded-full flex items-center justify-center">
                    <div className="w-10 h-1 border border-yellow-400/60 rounded-full" />
                  </div>
                  
                  {/* Antenna array */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-end gap-2 z-20">
                    <div className="w-0.5 h-4 bg-slate-400" />
                    <div className="flex flex-col items-center">
                      <motion.div
                        className="w-2 h-2 bg-red-500 rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{ boxShadow: '0 0 8px rgba(239, 68, 68, 0.8)' }}
                      />
                      <div className="w-0.5 h-6 bg-slate-400" />
                    </div>
                    <div className="w-0.5 h-3 bg-slate-400" />
                  </div>

                  {/* Main building structure */}
                  <div 
                    className="w-48 h-64 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 40%, #0a1929 100%)',
                      boxShadow: 'inset -10px 0 25px rgba(0,0,0,0.5), 4px 0 15px rgba(0,0,0,0.4)',
                      borderTop: '3px solid #334155',
                    }}
                  >
                    {/* Glass facade reflection */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: 'linear-gradient(135deg, transparent 0%, rgba(147,197,253,0.3) 50%, transparent 100%)',
                      }}
                    />
                    
                    {/* Stairwell section - darker vertical strip */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-8"
                      style={{ background: 'rgba(0,0,0,0.3)' }}
                    >
                      {/* Staircase railings */}
                      {[0,1,2,3,4].map((floor) => (
                        <div key={floor} className="h-[48px] border-b border-slate-700/50 flex items-end justify-center pb-1">
                          <div className="w-5 h-0.5 bg-slate-600/60" />
                        </div>
                      ))}
                    </div>

                    {/* Floor sections with glass windows */}
                    <div className="absolute left-9 right-1 top-0 bottom-0 flex flex-col">
                      {/* Floor 5 - Executive Suite */}
                      <div className="h-[48px] border-b border-slate-700/40 flex items-center px-1 relative">
                        <div className="flex-1 grid grid-cols-4 gap-0.5">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-9 rounded-sm" style={{
                              background: i === 2 ? 'linear-gradient(180deg, rgba(254,240,138,0.9) 0%, rgba(251,191,36,0.7) 100%)' : 'linear-gradient(180deg, rgba(147,197,253,0.15) 0%, rgba(59,130,246,0.1) 100%)',
                              boxShadow: i === 2 ? '0 0 8px rgba(251,191,36,0.4)' : 'inset 0 0 3px rgba(0,0,0,0.3)',
                              border: '1px solid rgba(71,85,105,0.4)',
                            }} />
                          ))}
                        </div>
                        <span className="absolute right-1 top-1 text-[7px] text-slate-400">F5</span>
                      </div>
                      
                      {/* Floor 4 */}
                      <div className="h-[48px] border-b border-slate-700/40 flex items-center px-1 relative">
                        <div className="flex-1 grid grid-cols-4 gap-0.5">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-9 rounded-sm" style={{
                              background: i % 2 === 0 ? 'linear-gradient(180deg, rgba(254,240,138,0.7) 0%, rgba(251,191,36,0.5) 100%)' : 'linear-gradient(180deg, rgba(147,197,253,0.15) 0%, rgba(59,130,246,0.1) 100%)',
                              boxShadow: i % 2 === 0 ? '0 0 6px rgba(251,191,36,0.3)' : 'inset 0 0 3px rgba(0,0,0,0.3)',
                              border: '1px solid rgba(71,85,105,0.4)',
                            }} />
                          ))}
                        </div>
                        <span className="absolute right-1 top-1 text-[7px] text-slate-400">F4</span>
                      </div>
                      
                      {/* Floor 3 */}
                      <div className="h-[48px] border-b border-slate-700/40 flex items-center px-1 relative">
                        <div className="flex-1 grid grid-cols-4 gap-0.5">
                          {[...Array(4)].map((_, i) => (
                            <motion.div 
                              key={i} 
                              className="h-9 rounded-sm" 
                              style={{
                                background: 'linear-gradient(180deg, rgba(254,240,138,0.6) 0%, rgba(251,191,36,0.4) 100%)',
                                boxShadow: '0 0 5px rgba(251,191,36,0.2)',
                                border: '1px solid rgba(71,85,105,0.4)',
                              }}
                              animate={{ opacity: [0.6, 1, 0.6] }}
                              transition={{ duration: 2 + i, repeat: Infinity }}
                            />
                          ))}
                        </div>
                        <span className="absolute right-1 top-1 text-[7px] text-slate-400">F3</span>
                      </div>
                      
                      {/* Floor 2 */}
                      <div className="h-[48px] border-b border-slate-700/40 flex items-center px-1 relative">
                        <div className="flex-1 grid grid-cols-4 gap-0.5">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-9 rounded-sm" style={{
                              background: i < 3 ? 'linear-gradient(180deg, rgba(254,240,138,0.8) 0%, rgba(251,191,36,0.6) 100%)' : 'linear-gradient(180deg, rgba(147,197,253,0.15) 0%, rgba(59,130,246,0.1) 100%)',
                              boxShadow: i < 3 ? '0 0 6px rgba(251,191,36,0.3)' : 'inset 0 0 3px rgba(0,0,0,0.3)',
                              border: '1px solid rgba(71,85,105,0.4)',
                            }} />
                          ))}
                        </div>
                        <span className="absolute right-1 top-1 text-[7px] text-slate-400">F2</span>
                      </div>
                      
                      {/* Floor 1 - Lobby with large windows */}
                      <div className="h-[56px] flex items-center px-1 relative">
                        <div className="flex-1 grid grid-cols-3 gap-1">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-11 rounded-sm" style={{
                              background: 'linear-gradient(180deg, rgba(254,240,138,0.95) 0%, rgba(251,191,36,0.8) 100%)',
                              boxShadow: '0 0 10px rgba(251,191,36,0.5)',
                              border: '1px solid rgba(71,85,105,0.4)',
                            }} />
                          ))}
                        </div>
                        <span className="absolute right-1 top-1 text-[7px] text-slate-400">F1</span>
                      </div>
                    </div>

                    {/* Floor labels on stairwell */}
                    <div className="absolute left-1 top-0 bottom-0 flex flex-col text-[7px] text-blue-300/70 font-medium">
                      <div className="h-[48px] flex items-center">5</div>
                      <div className="h-[48px] flex items-center">4</div>
                      <div className="h-[48px] flex items-center">3</div>
                      <div className="h-[48px] flex items-center">2</div>
                      <div className="h-[56px] flex items-center">1</div>
                    </div>

                    {/* BUREAUCRAT WORKER 1 - Full journey with file */}
                    <motion.div
                      className="absolute text-base z-30"
                      animate={{
                        x: [
                          80, 80,    // Enter lobby
                          15, 15,    // Walk to stairs
                          15, 15,    // Climb to F2
                          70, 70,    // Walk to desk
                          15, 15,    // Back to stairs
                          15, 15,    // Climb to F3
                          70, 70,    // Walk to desk
                          15, 15,    // Back to stairs  
                          15, 15,    // Climb to F4
                          70, 70,    // Walk to desk
                          15, 15,    // Back to stairs
                          15, 15,    // Climb to F5
                          70, 70,    // Walk to CEO
                          15, 15,    // Back to stairs
                          15, 15, 15, 15, 15,  // Descend
                          80, 130,   // Exit
                        ],
                        y: [
                          220, 220,  // F1 lobby
                          220, 220,  // At stairs
                          168, 168,  // F2
                          168, 168,  // At desk
                          168, 168,  // Back
                          120, 120,  // F3
                          120, 120,  // At desk
                          120, 120,  // Back
                          72, 72,    // F4
                          72, 72,    // At desk
                          72, 72,    // Back
                          24, 24,    // F5
                          24, 24,    // At CEO
                          24, 24,    // Back
                          72, 120, 168, 220, 220,  // Descend
                          220, 220,  // Exit
                        ],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                        times: [
                          0, 0.04, 0.08, 0.10, 0.14, 0.16, 0.20, 0.24, 0.28, 0.30,
                          0.34, 0.36, 0.40, 0.44, 0.48, 0.50, 0.54, 0.56, 0.60, 0.64,
                          0.68, 0.70, 0.74, 0.76, 0.80, 0.84, 0.88, 0.90, 0.92, 0.94, 0.96, 0.98, 1.0,
                        ]
                      }}
                    >
                      🧑‍💼
                    </motion.div>

                    {/* BUREAUCRAT WORKER 2 */}
                    <motion.div
                      className="absolute text-base z-30"
                      animate={{
                        x: [80, 80, 15, 15, 15, 15, 70, 70, 15, 15, 15, 15, 70, 70, 15, 15, 15, 15, 70, 70, 15, 15, 15, 15, 70, 70, 15, 15, 15, 15, 15, 15, 15, 80, 130],
                        y: [220, 220, 220, 220, 168, 168, 168, 168, 168, 168, 120, 120, 120, 120, 120, 120, 72, 72, 72, 72, 72, 72, 24, 24, 24, 24, 24, 24, 72, 120, 168, 220, 220, 220, 220],
                      }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 6.67 }}
                    >
                      👩‍💼
                    </motion.div>

                    {/* BUREAUCRAT WORKER 3 */}
                    <motion.div
                      className="absolute text-base z-30"
                      animate={{
                        x: [80, 80, 15, 15, 15, 15, 70, 70, 15, 15, 15, 15, 70, 70, 15, 15, 15, 15, 70, 70, 15, 15, 15, 15, 70, 70, 15, 15, 15, 15, 15, 15, 15, 80, 130],
                        y: [220, 220, 220, 220, 168, 168, 168, 168, 168, 168, 120, 120, 120, 120, 120, 120, 72, 72, 72, 72, 72, 72, 24, 24, 24, 24, 24, 24, 72, 120, 168, 220, 220, 220, 220],
                      }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 13.33 }}
                    >
                      🧑‍🔧
                    </motion.div>

                    {/* Document following worker 1 */}
                    <motion.div
                      className="absolute text-xs z-20"
                      animate={{
                        x: [90, 90, 25, 25, 25, 25, 80, 80, 25, 25, 25, 25, 80, 80, 25, 25, 25, 25, 80, 80, 25, 25, 25, 25, 80, 80, 25, 25, 25, 25, 25, 25, 25, 90, 140],
                        y: [225, 225, 225, 225, 173, 173, 173, 173, 173, 173, 125, 125, 125, 125, 125, 125, 77, 77, 77, 77, 77, 77, 29, 29, 29, 29, 29, 29, 77, 125, 173, 225, 225, 225, 225],
                        opacity: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                      }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      📄
                    </motion.div>

                    {/* Approval stamps */}
                    {[168, 120, 72, 24].map((y, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-xs"
                        style={{ left: 85, top: y }}
                        animate={{ scale: [0, 1.5, 1, 0], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 4 + i * 4, repeatDelay: 19 }}
                      >
                        ✅
                      </motion.div>
                    ))}

                    {/* People waiting in lobby */}
                    <div className="absolute bottom-3 right-3 flex gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <motion.span
                          key={i}
                          className="text-[10px]"
                          animate={{ y: [0, -1, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        >
                          🧍
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Main entrance with awning */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-20 h-2 bg-slate-700 rounded-t-sm" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
                    <div className="flex gap-1">
                      <div className="w-6 h-8 bg-amber-100/90 rounded-t-sm" style={{ boxShadow: 'inset 0 0 5px rgba(251,191,36,0.5)' }} />
                      <div className="w-6 h-8 bg-amber-100/90 rounded-t-sm" style={{ boxShadow: 'inset 0 0 5px rgba(251,191,36,0.5)' }} />
                    </div>
                  </div>
                </div>

                {/* Building 3 - Right tower */}
                <div className="relative">
                  {/* Rooftop structure */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-slate-600 rounded-sm" />
                  <div 
                    className="w-14 h-40 relative"
                    style={{
                      background: 'linear-gradient(180deg, #334155 0%, #1e293b 60%, #0f172a 100%)',
                      boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.4), 2px 0 8px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Windows */}
                    <div className="grid grid-cols-2 gap-1 p-1">
                      {[...Array(14)].map((_, i) => (
                        <motion.div 
                          key={i} 
                          className="w-4 h-4 rounded-sm"
                          style={{
                            background: i % 5 === 0 ? 'rgba(254, 240, 138, 0.85)' : 'rgba(254, 240, 138, 0.3)',
                            boxShadow: i % 5 === 0 ? '0 0 5px rgba(254, 240, 138, 0.5)' : 'none',
                            border: '1px solid rgba(71,85,105,0.3)',
                          }}
                          animate={i % 7 === 0 ? { opacity: [0.3, 0.85, 0.3] } : {}}
                          transition={{ duration: 4 + i % 3, repeat: Infinity }}
                        />
                      ))}
                    </div>
                    {/* Balconies */}
                    <div className="absolute -right-1 top-12 w-2 h-8 bg-slate-500/60 rounded-r-sm" />
                    <div className="absolute -right-1 top-28 w-2 h-8 bg-slate-500/60 rounded-r-sm" />
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
                🏢 Queue → Forms → Process → Verify → Approve → Deliver
              </span>
            </div>
          </div>

          {/* SME Traits */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: Shield, text: "Minimize risk", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
              { icon: Building2, text: "Strict process", color: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/30" },
              { icon: Clock, text: "Methodical", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
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
            Launch fast, crash, learn, iterate
            <span className="mx-4 text-white/30">|</span>
            <span className="text-blue-400 font-bold">SME: </span>
            Climb stairs, get stamps, follow process
          </p>
          <Sparkles className="w-6 h-6 text-pink-400" />
        </div>
      </motion.div>
    </div>
  );
};

export default VisualMetaphorSlide;
