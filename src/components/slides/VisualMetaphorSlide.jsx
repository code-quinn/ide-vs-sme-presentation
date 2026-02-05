import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Building2, Zap, Shield, Target, Clock, Lightbulb, Sparkles, Star, TrendingUp } from 'lucide-react';

const VisualMetaphorSlide = ({ slide }) => {
  const [rocketState, setRocketState] = useState('idle');
  const [countdown, setCountdown] = useState(3);
  const [stats, setStats] = useState({ launches: 0, success: 0, crashes: 0 });
  const [particles, setParticles] = useState([]);
  const [smoke, setSmoke] = useState([]);
  const [explosionParticles, setExplosionParticles] = useState([]);
  const [stars, setStars] = useState([]);

  // Generate stars on mount
  useEffect(() => {
    setStars([...Array(60)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      duration: 2 + Math.random() * 3,
    })));
  }, []);

  // Generate smoke particles during launch
  useEffect(() => {
    if (rocketState === 'launching' || rocketState === 'countdown') {
      const interval = setInterval(() => {
        setSmoke(prev => [...prev.slice(-20), {
          id: Date.now(),
          x: 45 + Math.random() * 10,
          size: 20 + Math.random() * 30,
        }]);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setSmoke([]);
    }
  }, [rocketState]);

  // Generate thrust particles
  useEffect(() => {
    if (rocketState === 'launching') {
      const interval = setInterval(() => {
        setParticles(prev => [...prev.slice(-30), {
          id: Date.now(),
          x: 47 + Math.random() * 6,
          color: Math.random() > 0.5 ? '#FBBF24' : '#F97316',
        }]);
      }, 50);
      return () => clearInterval(interval);
    } else {
      setParticles([]);
    }
  }, [rocketState]);

  // Launch sequence
  useEffect(() => {
    let timer;
    
    if (rocketState === 'idle') {
      timer = setTimeout(() => {
        setRocketState('countdown');
        setCountdown(3);
      }, 1000);
    } else if (rocketState === 'countdown') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(c => c - 1), 700);
      } else {
        setRocketState('launching');
        setStats(s => ({ ...s, launches: s.launches + 1 }));
      }
    } else if (rocketState === 'launching') {
      timer = setTimeout(() => {
        const success = Math.random() > 0.35;
        if (success) {
          setRocketState('success');
          setStats(s => ({ ...s, success: s.success + 1 }));
        } else {
          setRocketState('exploding');
          // Generate explosion particles
          setExplosionParticles([...Array(40)].map((_, i) => ({
            id: i,
            angle: (i / 40) * 360,
            distance: 50 + Math.random() * 100,
            size: 5 + Math.random() * 15,
            color: ['#EF4444', '#F97316', '#FBBF24', '#FEF08A'][Math.floor(Math.random() * 4)],
            duration: 0.5 + Math.random() * 0.5,
          })));
          setStats(s => ({ ...s, crashes: s.crashes + 1 }));
        }
      }, 2500);
    } else if (rocketState === 'success') {
      timer = setTimeout(() => setRocketState('orbiting'), 800);
    } else if (rocketState === 'orbiting') {
      timer = setTimeout(() => {
        setRocketState('idle');
        setExplosionParticles([]);
      }, 4000);
    } else if (rocketState === 'exploding') {
      timer = setTimeout(() => setRocketState('crashed'), 600);
    } else if (rocketState === 'crashed') {
      timer = setTimeout(() => {
        setRocketState('idle');
        setExplosionParticles([]);
      }, 2500);
    }
    
    return () => clearTimeout(timer);
  }, [rocketState, countdown]);

  const getRocketPosition = () => {
    switch (rocketState) {
      case 'idle': return { y: '75%', scale: 1, rotate: 0 };
      case 'countdown': return { y: '75%', scale: 1.05, rotate: 0 };
      case 'launching': return { y: '-20%', scale: 1, rotate: 0 };
      case 'success': return { y: '15%', scale: 0.9, rotate: 0 };
      case 'orbiting': return { y: '15%', scale: 0.9, rotate: 0 };
      case 'exploding': return { y: '50%', scale: 0.3, rotate: 180 };
      case 'crashed': return { y: '85%', scale: 0.2, rotate: 180 };
      default: return { y: '75%', scale: 1, rotate: 0 };
    }
  };

  const pos = getRocketPosition();

  return (
    <div className="max-w-7xl mx-auto px-4 max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-hide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-black gradient-text text-center mb-6"
      >
        {slide?.title || 'The Big Picture'}
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-6 items-stretch">
        {/* IDE - Rocket Scene */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div 
            className="relative rounded-3xl overflow-hidden h-[380px]"
            style={{
              background: 'linear-gradient(180deg, #020617 0%, #0f172a 30%, #1e1b4b 70%, #312e81 100%)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              boxShadow: '0 0 60px rgba(139, 92, 246, 0.2), inset 0 0 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Stars */}
            {stars.map(star => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                }}
                animate={{
                  opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: star.duration, repeat: Infinity }}
              />
            ))}

            {/* Shooting stars */}
            <motion.div
              className="absolute w-20 h-0.5 bg-gradient-to-r from-white to-transparent"
              style={{ top: '15%', left: '10%' }}
              animate={{ x: [0, 150], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            />
            <motion.div
              className="absolute w-16 h-0.5 bg-gradient-to-r from-white to-transparent"
              style={{ top: '25%', right: '20%' }}
              animate={{ x: [0, 120], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 7, delay: 3 }}
            />

            {/* Planet */}
            <motion.div
              className="absolute w-16 h-16 rounded-full"
              style={{
                top: '10%',
                right: '10%',
                background: 'radial-gradient(circle at 30% 30%, #818CF8, #4338CA, #312E81)',
                boxShadow: '0 0 30px rgba(129, 140, 248, 0.3)',
              }}
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <div className="absolute w-20 h-3 bg-indigo-400/30 rounded-full top-1/2 -left-2 -translate-y-1/2 rotate-12" />
            </motion.div>

            {/* Smoke trail */}
            {smoke.map(s => (
              <motion.div
                key={s.id}
                className="absolute rounded-full"
                style={{
                  left: `${s.x}%`,
                  bottom: '15%',
                  width: s.size,
                  height: s.size,
                  background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)',
                }}
                initial={{ opacity: 0.6, scale: 0.5, y: 0 }}
                animate={{ opacity: 0, scale: 2, y: 100 }}
                transition={{ duration: 1.5 }}
              />
            ))}

            {/* Thrust particles */}
            {particles.map(p => (
              <motion.div
                key={p.id}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${p.x}%`,
                  background: p.color,
                  boxShadow: `0 0 10px ${p.color}`,
                }}
                initial={{ bottom: '25%', opacity: 1 }}
                animate={{ bottom: '0%', opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            ))}

            {/* Explosion */}
            <AnimatePresence>
              {(rocketState === 'exploding' || rocketState === 'crashed') && (
                <>
                  {/* Central flash */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #FEF08A, #F97316, #EF4444, transparent)',
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                  {/* Explosion particles */}
                  {explosionParticles.map(p => (
                    <motion.div
                      key={p.id}
                      className="absolute left-1/2 top-1/2 rounded-full"
                      style={{
                        width: p.size,
                        height: p.size,
                        background: p.color,
                        boxShadow: `0 0 10px ${p.color}`,
                      }}
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{
                        x: Math.cos(p.angle * Math.PI / 180) * p.distance,
                        y: Math.sin(p.angle * Math.PI / 180) * p.distance,
                        opacity: 0,
                      }}
                      transition={{ duration: p.duration, ease: 'easeOut' }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* ROCKET */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 z-10"
              animate={{
                top: pos.y,
                scale: pos.scale,
                rotate: pos.rotate,
              }}
              transition={{
                duration: rocketState === 'launching' ? 2.5 : 0.5,
                ease: rocketState === 'launching' ? [0.2, 0.8, 0.4, 1] : 'easeOut',
              }}
            >
              {/* Flame */}
              {(rocketState === 'launching' || rocketState === 'countdown') && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{ top: '100%' }}
                  animate={{
                    scaleY: rocketState === 'launching' ? [1, 1.5, 1.2, 1.8, 1.3] : [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 0.15, repeat: Infinity }}
                >
                  <div className="relative">
                    <div className="w-10 h-20 bg-gradient-to-b from-yellow-200 via-orange-400 to-transparent rounded-b-full blur-sm" />
                    <div className="absolute inset-0 w-6 h-16 mx-auto bg-gradient-to-b from-white via-yellow-300 to-transparent rounded-b-full" />
                  </div>
                </motion.div>
              )}

              {/* Rocket body */}
              <motion.div
                className="relative"
                animate={rocketState === 'orbiting' ? { y: [0, -8, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 blur-xl bg-purple-500/30 scale-150" />
                
                {/* Nose cone */}
                <div 
                  className="w-0 h-0 mx-auto relative z-10"
                  style={{
                    borderLeft: '20px solid transparent',
                    borderRight: '20px solid transparent',
                    borderBottom: '35px solid #8B5CF6',
                  }}
                >
                  <div 
                    className="absolute top-1 left-1/2 -translate-x-1/2"
                    style={{
                      borderLeft: '12px solid transparent',
                      borderRight: '12px solid transparent', 
                      borderBottom: '20px solid #A855F7',
                    }}
                  />
                </div>
                
                {/* Body */}
                <div className="w-10 h-16 mx-auto bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700 relative z-10">
                  {/* Window */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-cyan-400 border-2 border-cyan-200">
                    <div className="absolute top-0.5 left-0.5 w-2 h-2 rounded-full bg-white/50" />
                  </div>
                  {/* Stripe */}
                  <div className="absolute bottom-3 inset-x-1 h-1.5 bg-pink-500 rounded" />
                </div>
                
                {/* Fins */}
                <div className="absolute -bottom-1 -left-3 w-4 h-8 bg-purple-600 rounded-bl-lg -skew-x-12 z-0" />
                <div className="absolute -bottom-1 -right-3 w-4 h-8 bg-purple-600 rounded-br-lg skew-x-12 z-0" />
              </motion.div>
            </motion.div>

            {/* Countdown */}
            <AnimatePresence>
              {rocketState === 'countdown' && countdown > 0 && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-20"
                  initial={{ scale: 2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  key={countdown}
                >
                  <span 
                    className="text-8xl font-black"
                    style={{ 
                      color: '#8B5CF6',
                      textShadow: '0 0 40px rgba(139, 92, 246, 0.8), 0 0 80px rgba(139, 92, 246, 0.4)',
                    }}
                  >
                    {countdown}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Status messages */}
            <AnimatePresence>
              {rocketState === 'success' && (
                <motion.div
                  className="absolute top-8 inset-x-0 flex justify-center z-20"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="px-6 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/50 backdrop-blur">
                    <span className="text-xl font-bold text-emerald-400">🎉 ORBIT ACHIEVED!</span>
                  </div>
                </motion.div>
              )}
              {rocketState === 'orbiting' && (
                <motion.div
                  className="absolute top-8 inset-x-0 flex justify-center z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/50 backdrop-blur">
                    <span className="text-sm font-medium text-purple-300">🛰️ Collecting data... Next launch soon</span>
                  </div>
                </motion.div>
              )}
              {(rocketState === 'exploding' || rocketState === 'crashed') && (
                <motion.div
                  className="absolute top-8 inset-x-0 flex justify-center z-20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="px-6 py-2 rounded-full bg-orange-500/20 border border-orange-400/50 backdrop-blur">
                    <span className="text-lg font-bold text-orange-400">💥 RUD* → Analyzing... → Retry!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ground */}
            <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-indigo-950 to-transparent" />

            {/* Stats */}
            <div className="absolute bottom-2 left-3 right-3 flex justify-between text-xs font-mono z-20">
              <span className="text-emerald-400">✓ {stats.success}</span>
              <span className="text-white/40">Launches: {stats.launches}</span>
              <span className="text-orange-400">✗ {stats.crashes}</span>
            </div>

            {/* Label */}
            <div className="absolute top-3 left-3 z-20">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/40 backdrop-blur">
                <Rocket className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-purple-400 text-sm">IDE</span>
              </div>
            </div>
          </div>

          {/* IDE Traits */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { icon: Zap, text: "Ship fast", color: "text-yellow-400" },
              { icon: Target, text: "Learn from crashes", color: "text-orange-400" },
              { icon: TrendingUp, text: "Iterate rapidly", color: "text-emerald-400" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20"
              >
                <item.icon className={`w-3 h-3 ${item.color}`} />
                <span className="text-white/70 text-xs">{item.text}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-[10px] text-white/30 mt-2 text-center">*RUD = Rapid Unscheduled Disassembly (SpaceX term for explosion)</p>
        </motion.div>

        {/* SME - Building */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div 
            className="relative rounded-3xl overflow-hidden h-[380px]"
            style={{
              background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              boxShadow: '0 0 60px rgba(59, 130, 246, 0.1), inset 0 0 60px rgba(0,0,0,0.3)',
            }}
          >
            {/* Stars */}
            {stars.slice(0, 25).map(star => (
              <div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y * 0.4}%`,
                  width: star.size * 0.7,
                  height: star.size * 0.7,
                  opacity: star.opacity * 0.5,
                }}
              />
            ))}

            {/* Moon */}
            <motion.div
              className="absolute top-6 right-8 w-12 h-12 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #FEF9C3, #FDE68A)',
                boxShadow: '0 0 40px rgba(254, 249, 195, 0.3)',
              }}
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Clouds */}
            <motion.div
              className="absolute top-20 left-10 w-24 h-8 bg-slate-700/30 rounded-full blur-sm"
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 20, repeat: Infinity }}
            />

            {/* Buildings - Background */}
            <div className="absolute bottom-12 left-4 w-12 h-28 bg-slate-700 rounded-t" />
            <div className="absolute bottom-12 left-20 w-10 h-20 bg-slate-700 rounded-t" />
            <div className="absolute bottom-12 right-4 w-14 h-24 bg-slate-700 rounded-t" />
            <div className="absolute bottom-12 right-20 w-10 h-32 bg-slate-700 rounded-t" />

            {/* MAIN BUILDING */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
              {/* Antenna */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-slate-500">
                <motion.div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>

              {/* Main structure */}
              <div className="relative">
                <div className="w-28 h-48 bg-gradient-to-b from-blue-600 to-blue-800 rounded-t-lg">
                  {/* Windows */}
                  <div className="grid grid-cols-4 gap-1.5 p-2 pt-3">
                    {[...Array(32)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-4 h-5 rounded-sm"
                        style={{
                          background: Math.random() > 0.35 ? '#FDE047' : '#1e3a8a',
                          opacity: Math.random() > 0.35 ? 0.85 : 0.4,
                        }}
                        animate={Math.random() > 0.85 ? {
                          opacity: [0.85, 0.3, 0.85],
                        } : {}}
                        transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Entrance */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-8 bg-slate-800 rounded-t">
                  <div className="w-8 h-6 mx-auto mt-1 bg-yellow-100/30 rounded-t" />
                </div>
              </div>

              {/* Side buildings */}
              <div className="absolute -left-10 bottom-0 w-10 h-32 bg-blue-700 rounded-t">
                <div className="grid grid-cols-2 gap-1 p-1">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-4 rounded-sm"
                      style={{
                        background: Math.random() > 0.4 ? '#FDE047' : '#1e3a8a',
                        opacity: Math.random() > 0.4 ? 0.7 : 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -right-10 bottom-0 w-10 h-28 bg-blue-700 rounded-t">
                <div className="grid grid-cols-2 gap-1 p-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-4 rounded-sm"
                      style={{
                        background: Math.random() > 0.4 ? '#FDE047' : '#1e3a8a',
                        opacity: Math.random() > 0.4 ? 0.7 : 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Ground/grass */}
            <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-emerald-950 to-emerald-900/50" />

            {/* Trees */}
            <div className="absolute bottom-10 left-8">
              <div className="w-1 h-5 bg-amber-800 mx-auto" />
              <div className="w-6 h-6 rounded-full bg-emerald-600 -mt-2" />
            </div>
            <div className="absolute bottom-10 right-10">
              <div className="w-1 h-4 bg-amber-800 mx-auto" />
              <div className="w-5 h-5 rounded-full bg-emerald-700 -mt-1" />
            </div>

            {/* Street lamp */}
            <div className="absolute bottom-10 right-24">
              <div className="w-0.5 h-8 bg-slate-500 mx-auto" />
              <motion.div
                className="w-3 h-2 bg-yellow-200 rounded-b -mt-0.5 mx-auto"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ boxShadow: '0 5px 15px rgba(254, 240, 138, 0.5)' }}
              />
            </div>

            {/* Status */}
            <div className="absolute bottom-2 inset-x-3 text-center">
              <span className="text-xs font-mono text-blue-300/50">Steady operations • 99.9% uptime • Predictable</span>
            </div>

            {/* Label */}
            <div className="absolute top-3 left-3 z-20">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/40 backdrop-blur">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-blue-400 text-sm">SME</span>
              </div>
            </div>
          </div>

          {/* SME Traits */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { icon: Shield, text: "Minimize risk", color: "text-blue-400" },
              { icon: Building2, text: "Solid foundation", color: "text-slate-400" },
              { icon: Clock, text: "Steady growth", color: "text-emerald-400" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20"
              >
                <item.icon className={`w-3 h-3 ${item.color}`} />
                <span className="text-white/70 text-xs">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-4"
      >
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/10">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <p className="text-white/60 text-sm">
            <span className="text-purple-400 font-semibold">IDE: </span>
            Every crash = learning → 
            <span className="text-blue-400 font-semibold"> SME: </span>
            Every crash = avoided
          </p>
          <Sparkles className="w-4 h-4 text-pink-400" />
        </div>
      </motion.div>
    </div>
  );
};

export default VisualMetaphorSlide;
