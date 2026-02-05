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

            {/* Countdown Display - Fixed position ABOVE rocket area */}
            <AnimatePresence>
              {countdown !== null && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 z-30"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-purple-300 uppercase tracking-widest mb-1">Launch in</span>
                    <span className="text-8xl font-black text-white drop-shadow-lg"
                      style={{ textShadow: '0 0 40px rgba(168, 85, 247, 0.8)' }}
                    >
                      {countdown}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Launch Result - Fixed position ABOVE rocket area */}
            <AnimatePresence>
              {launchResult && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 z-30 text-center"
                >
                  {launchResult === 'success' ? (
                    <div className="flex flex-col items-center">
                      <span className="text-7xl">✨🎉✨</span>
                      <motion.p 
                        className="text-green-400 font-bold text-2xl mt-3 px-6 py-2 bg-green-500/20 rounded-full border border-green-500/50"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        SHIPPED! 🚀
                      </motion.p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-7xl">💥🔥💥</span>
                      <motion.p 
                        className="text-orange-400 font-bold text-2xl mt-3 px-6 py-2 bg-orange-500/20 rounded-full border border-orange-500/50"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        Learning! 📊
                      </motion.p>
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
                <span>= Rapid Iteration</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💥</span>
                <span>= Failure → Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✨</span>
                <span>= Success → Ship It!</span>
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

              {/* SMOKE - 3X intensity, stays at launch pad */}
              {(launched || countdown !== null) && (
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-0">
                  {/* Heavy smoke cloud - 36 puffs for 3x intensity */}
                  {[...Array(36)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: 25 + (i % 5) * 15,
                        height: 25 + (i % 5) * 15,
                        background: `rgba(180, 180, 180, ${0.6 + (i % 4) * 0.1})`,
                        filter: 'blur(10px)',
                        left: -40 + (i % 8) * 12,
                        top: (i % 4) * 8,
                      }}
                      initial={{ 
                        x: 0, 
                        y: 0, 
                        opacity: 0.8,
                        scale: 0.6 
                      }}
                      animate={{ 
                        x: ((i % 2 === 0 ? 1 : -1) * (30 + (i % 5) * 20)),
                        y: 15 + (i % 4) * 20,
                        opacity: 0,
                        scale: 3 + (i % 4) * 0.8,
                      }}
                      transition={{
                        duration: 1.8 + (i % 5) * 0.3,
                        repeat: Infinity,
                        delay: i * 0.08,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                  {/* Extra dense core smoke */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={`core-${i}`}
                      className="absolute rounded-full"
                      style={{
                        width: 40 + (i % 3) * 20,
                        height: 40 + (i % 3) * 20,
                        background: `rgba(200, 200, 200, ${0.7 + (i % 3) * 0.1})`,
                        filter: 'blur(15px)',
                        left: -30 + (i % 4) * 15,
                        top: 0,
                      }}
                      initial={{ 
                        x: 0, 
                        y: 0, 
                        opacity: 0.9,
                        scale: 0.4 
                      }}
                      animate={{ 
                        x: ((i % 2 === 0 ? 1 : -1) * (15 + (i % 3) * 10)),
                        y: 20 + (i % 3) * 15,
                        opacity: 0,
                        scale: 2.5,
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.12,
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
                  y: launched ? -350 : 0,
                  scale: launched ? 0.85 : 1,
                }}
                transition={{
                  duration: launched ? 1.2 : 0.3,
                  ease: launched ? [0.2, 0.8, 0.2, 1] : "easeOut"
                }}
              >
                {/* The Rocket - Rotated to point STRAIGHT UP */}
                <div 
                  className="text-8xl"
                  style={{ transform: 'rotate(-45deg)' }}
                >
                  🚀
                </div>
                
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

            {/* City Skyline with Animated Bureaucratic Workflow Building */}
            <div className="flex-1 flex items-end justify-center relative z-10 pb-16">
              <div className="flex items-end gap-2">
                {/* Building 1 - Shorter side building */}
                <div className="relative">
                  <div 
                    className="w-12 h-20 rounded-t-lg relative"
                    style={{
                      background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                      boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div className="grid grid-cols-2 gap-1 p-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-sm bg-yellow-200/70" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Building - Bureaucratic Workflow with Stairs */}
                <div className="relative">
                  {/* Antenna */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                    <motion.div
                      className="w-3 h-3 bg-red-500 rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      style={{ boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)' }}
                    />
                    <div className="w-0.5 h-5 bg-slate-400" />
                    <span className="text-xs">📡</span>
                  </div>

                  <div 
                    className="w-44 h-60 rounded-t-lg relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e3a8a 100%)',
                      boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Staircase on left side */}
                    <div className="absolute left-1 top-0 bottom-0 w-10 flex flex-col justify-between py-1">
                      {[0,1,2,3,4].map((floor) => (
                        <div key={floor} className="flex flex-col items-center">
                          <div className="w-8 h-1 bg-slate-600/80" />
                          <div className="flex">
                            <div className="w-1 h-2 bg-slate-500/60" />
                            <div className="w-6 h-1 bg-slate-600/60 mt-1" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Floor labels and offices */}
                    <div className="absolute left-12 right-1 top-0 bottom-0 flex flex-col">
                      {/* Floor 5 - CEO Office - Final Approval */}
                      <div className="flex-1 border-b border-blue-800/50 flex items-center gap-1 px-1 relative">
                        <span className="text-[8px] text-blue-200/60">F5</span>
                        <div className="flex-1 flex items-center justify-center gap-1">
                          <span className="text-sm">🧑‍💼</span>
                          <span className="text-[8px] text-blue-200/80">CEO</span>
                        </div>
                        <div className="w-3 h-3 bg-yellow-200/80 rounded-sm" />
                      </div>
                      
                      {/* Floor 4 - Verification Dept */}
                      <div className="flex-1 border-b border-blue-800/50 flex items-center gap-1 px-1 relative">
                        <span className="text-[8px] text-blue-200/60">F4</span>
                        <div className="flex-1 flex items-center justify-center gap-1">
                          <span className="text-xs">🔍</span>
                          <span className="text-[8px] text-blue-200/80">Verify</span>
                        </div>
                        <div className="w-3 h-3 bg-yellow-200/70 rounded-sm" />
                      </div>
                      
                      {/* Floor 3 - Processing Dept */}
                      <div className="flex-1 border-b border-blue-800/50 flex items-center gap-1 px-1 relative">
                        <span className="text-[8px] text-blue-200/60">F3</span>
                        <div className="flex-1 flex items-center justify-center gap-1">
                          <span className="text-xs">⚙️</span>
                          <span className="text-[8px] text-blue-200/80">Process</span>
                        </div>
                        <div className="w-3 h-3 bg-yellow-200/80 rounded-sm" />
                      </div>
                      
                      {/* Floor 2 - Documentation */}
                      <div className="flex-1 border-b border-blue-800/50 flex items-center gap-1 px-1 relative">
                        <span className="text-[8px] text-blue-200/60">F2</span>
                        <div className="flex-1 flex items-center justify-center gap-1">
                          <span className="text-xs">📝</span>
                          <span className="text-[8px] text-blue-200/80">Forms</span>
                        </div>
                        <div className="w-3 h-3 bg-yellow-200/60 rounded-sm" />
                      </div>
                      
                      {/* Floor 1 - Reception */}
                      <div className="flex-1 flex items-center gap-1 px-1 relative">
                        <span className="text-[8px] text-blue-200/60">F1</span>
                        <div className="flex-1 flex items-center justify-center gap-1">
                          <span className="text-xs">🛎️</span>
                          <span className="text-[8px] text-blue-200/80">Queue</span>
                        </div>
                        <div className="w-3 h-3 bg-yellow-200/90 rounded-sm" />
                      </div>
                    </div>

                    {/* BUREAUCRAT WORKER 1 - Full journey with file */}
                    <motion.div
                      className="absolute text-lg z-30"
                      animate={{
                        // Enter → F1 queue → stairs to F2 → get form → stairs to F3 → process → stairs to F4 → verify → stairs to F5 → approval → descend → exit
                        x: [
                          75, 75,    // Enter, wait at reception
                          20, 20,    // Walk to stairs
                          20, 20,    // Climb to F2
                          60, 60,    // Walk to forms desk
                          20, 20,    // Back to stairs
                          20, 20,    // Climb to F3
                          60, 60,    // Walk to processing
                          20, 20,    // Back to stairs  
                          20, 20,    // Climb to F4
                          60, 60,    // Walk to verify
                          20, 20,    // Back to stairs
                          20, 20,    // Climb to F5
                          60, 60,    // Walk to CEO
                          20, 20,    // Back to stairs
                          20, 20, 20, 20, 20,  // Descend all floors
                          75, 120,   // Walk to exit
                        ],
                        y: [
                          200, 200,  // F1 - reception
                          200, 200,  // At stairs
                          152, 152,  // F2
                          152, 152,  // At forms
                          152, 152,  // Back to stairs
                          104, 104,  // F3
                          104, 104,  // At processing
                          104, 104,  // Back to stairs
                          56, 56,    // F4
                          56, 56,    // At verify
                          56, 56,    // Back to stairs
                          8, 8,      // F5
                          8, 8,      // At CEO
                          8, 8,      // Back to stairs
                          56, 104, 152, 200, 200,  // Descend
                          200, 200,  // Exit
                        ],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                        times: [
                          0, 0.04,
                          0.08, 0.10,
                          0.14, 0.16,
                          0.20, 0.24,
                          0.28, 0.30,
                          0.34, 0.36,
                          0.40, 0.44,
                          0.48, 0.50,
                          0.54, 0.56,
                          0.60, 0.64,
                          0.68, 0.70,
                          0.74, 0.76,
                          0.80, 0.84,
                          0.88, 0.90,
                          0.92, 0.94, 0.96, 0.98, 1.0,
                        ]
                      }}
                    >
                      🧑‍💼
                    </motion.div>

                    {/* BUREAUCRAT WORKER 2 - Staggered */}
                    <motion.div
                      className="absolute text-lg z-30"
                      animate={{
                        x: [
                          75, 75, 20, 20, 20, 20, 60, 60, 20, 20,
                          20, 20, 60, 60, 20, 20, 20, 20, 60, 60,
                          20, 20, 20, 20, 60, 60, 20, 20, 20, 20, 20, 20, 20, 75, 120,
                        ],
                        y: [
                          200, 200, 200, 200, 152, 152, 152, 152, 152, 152,
                          104, 104, 104, 104, 104, 104, 56, 56, 56, 56,
                          56, 56, 8, 8, 8, 8, 8, 8, 56, 104, 152, 200, 200, 200, 200,
                        ],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 6.67,
                      }}
                    >
                      👩‍💼
                    </motion.div>

                    {/* BUREAUCRAT WORKER 3 - Staggered */}
                    <motion.div
                      className="absolute text-lg z-30"
                      animate={{
                        x: [
                          75, 75, 20, 20, 20, 20, 60, 60, 20, 20,
                          20, 20, 60, 60, 20, 20, 20, 20, 60, 60,
                          20, 20, 20, 20, 60, 60, 20, 20, 20, 20, 20, 20, 20, 75, 120,
                        ],
                        y: [
                          200, 200, 200, 200, 152, 152, 152, 152, 152, 152,
                          104, 104, 104, 104, 104, 104, 56, 56, 56, 56,
                          56, 56, 8, 8, 8, 8, 8, 8, 56, 104, 152, 200, 200, 200, 200,
                        ],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 13.33,
                      }}
                    >
                      🧑‍🔧
                    </motion.div>

                    {/* Documents being carried - follows worker 1 */}
                    <motion.div
                      className="absolute text-sm z-20"
                      animate={{
                        x: [
                          85, 85, 30, 30, 30, 30, 70, 70, 30, 30,
                          30, 30, 70, 70, 30, 30, 30, 30, 70, 70,
                          30, 30, 30, 30, 70, 70, 30, 30, 30, 30, 30, 30, 30, 85, 130,
                        ],
                        y: [
                          205, 205, 205, 205, 157, 157, 157, 157, 157, 157,
                          109, 109, 109, 109, 109, 109, 61, 61, 61, 61,
                          61, 61, 13, 13, 13, 13, 13, 13, 61, 109, 157, 205, 205, 205, 205,
                        ],
                        opacity: [
                          0, 0, 0, 0, 0, 0, 1, 1, 1, 1,  // Get form at F2
                          1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,  // Exit with approved doc
                        ],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      📄
                    </motion.div>

                    {/* Stamp animation at each floor */}
                    {[152, 104, 56, 8].map((y, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-xs"
                        style={{ left: 75, top: y }}
                        animate={{
                          scale: [0, 1.5, 1, 0],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: 4 + i * 4,
                          repeatDelay: 19,
                        }}
                      >
                        ✅
                      </motion.div>
                    ))}

                    {/* Waiting queue at reception */}
                    <div className="absolute bottom-2 right-2 flex gap-0.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="text-xs"
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                          🧍
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Entrance */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-2xl">
                    🚪
                  </div>
                </div>

                {/* Building 3 - Medium side building */}
                <div className="relative">
                  <div 
                    className="w-10 h-28 rounded-t-lg relative"
                    style={{
                      background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                      boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div className="grid grid-cols-2 gap-1 p-1.5">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-2.5 h-3 rounded-sm bg-yellow-200/60" />
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
