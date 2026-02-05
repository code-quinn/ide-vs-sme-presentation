import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Building2, Zap, Shield, TrendingUp, Clock, Sparkles, ArrowUp, Target, Lightbulb } from 'lucide-react';

const VisualMetaphorSlide = ({ slide }) => {
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => (p + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-hide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-black gradient-text text-center mb-4"
      >
        {slide.title}
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-white/50 mb-8 text-lg"
      >
        Two paths to success — one disrupts, one preserves
      </motion.p>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* IDE - Rocket Launch */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden min-h-[480px]" style={{
            background: 'linear-gradient(180deg, #0c0c1d 0%, #1a0a2e 50%, #2d1b4e 100%)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
          }}>
            {/* Cosmic background */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
                </radialGradient>
                <linearGradient id="rocketBody" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6"/>
                  <stop offset="50%" stopColor="#A855F7"/>
                  <stop offset="100%" stopColor="#7C3AED"/>
                </linearGradient>
                <linearGradient id="rocketWindow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4"/>
                  <stop offset="100%" stopColor="#0891B2"/>
                </linearGradient>
                <linearGradient id="flame1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FCD34D"/>
                  <stop offset="40%" stopColor="#F97316"/>
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="flame2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FEF3C7"/>
                  <stop offset="30%" stopColor="#FBBF24"/>
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="strongGlow">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Stars - varied sizes */}
              {[...Array(40)].map((_, i) => (
                <circle
                  key={i}
                  cx={Math.random() * 400}
                  cy={Math.random() * 500}
                  r={Math.random() * 1.5 + 0.5}
                  fill="#fff"
                  opacity={0.3 + Math.random() * 0.7}
                >
                  <animate
                    attributeName="opacity"
                    values={`${0.3 + Math.random() * 0.4};1;${0.3 + Math.random() * 0.4}`}
                    dur={`${1 + Math.random() * 2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
              
              {/* Shooting stars */}
              <g opacity="0.6">
                <line x1="50" y1="60" x2="90" y2="80" stroke="url(#starGlow)" strokeWidth="2">
                  <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="0s"/>
                </line>
                <line x1="320" y1="120" x2="350" y2="140" stroke="url(#starGlow)" strokeWidth="2">
                  <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" begin="1.5s"/>
                </line>
              </g>
              
              {/* Planet in background */}
              <circle cx="340" cy="80" r="30" fill="#3B82F6" opacity="0.15"/>
              <circle cx="340" cy="80" r="25" fill="#2563EB" opacity="0.1"/>
              
              {/* ROCKET */}
              <g transform={`translate(200, ${280 - Math.sin(phase * 0.1) * 8})`}>
                {/* Flame outer */}
                <ellipse cx="0" cy="75" rx="22" ry={45 + Math.sin(phase * 0.3) * 8} fill="url(#flame1)" filter="url(#strongGlow)">
                  <animate attributeName="ry" values="45;55;42;50;45" dur="0.3s" repeatCount="indefinite"/>
                </ellipse>
                {/* Flame inner */}
                <ellipse cx="0" cy="70" rx="12" ry={30 + Math.sin(phase * 0.4) * 5} fill="url(#flame2)">
                  <animate attributeName="ry" values="30;38;28;35;30" dur="0.25s" repeatCount="indefinite"/>
                </ellipse>
                {/* Flame core */}
                <ellipse cx="0" cy="65" rx="6" ry={18 + Math.sin(phase * 0.5) * 3} fill="#FEF3C7" opacity="0.9">
                  <animate attributeName="ry" values="18;22;16;20;18" dur="0.2s" repeatCount="indefinite"/>
                </ellipse>
                
                {/* Rocket fins */}
                <path d="M-28,40 L-38,60 L-20,55 Z" fill="#6D28D9"/>
                <path d="M28,40 L38,60 L20,55 Z" fill="#6D28D9"/>
                <path d="M-22,38 L-30,52 L-16,48 Z" fill="#7C3AED"/>
                <path d="M22,38 L30,52 L16,48 Z" fill="#7C3AED"/>
                
                {/* Rocket body */}
                <path d="M-20,50 L-20,-30 Q-20,-60 0,-75 Q20,-60 20,-30 L20,50 Z" fill="url(#rocketBody)" filter="url(#glow)"/>
                
                {/* Body details - stripes */}
                <path d="M-18,35 L18,35 L18,42 L-18,42 Z" fill="#EC4899" opacity="0.8"/>
                <path d="M-16,45 L16,45 L16,48 L-16,48 Z" fill="#06B6D4" opacity="0.6"/>
                
                {/* Window */}
                <ellipse cx="0" cy="-15" rx="12" ry="14" fill="#0c0c1d" stroke="#06B6D4" strokeWidth="2"/>
                <ellipse cx="0" cy="-15" rx="9" ry="11" fill="url(#rocketWindow)"/>
                <ellipse cx="-3" cy="-18" rx="3" ry="4" fill="#fff" opacity="0.4"/>
                
                {/* Nose cone highlight */}
                <path d="M-8,-50 Q-5,-65 0,-75 Q0,-65 -2,-50 Z" fill="#fff" opacity="0.2"/>
                
                {/* Engine nozzle */}
                <ellipse cx="0" cy="52" rx="14" ry="5" fill="#4C1D95"/>
                <ellipse cx="0" cy="50" rx="10" ry="4" fill="#1e1e2e"/>
              </g>
              
              {/* Speed lines */}
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1={140 + i * 20}
                  y1={380 + i * 15}
                  x2={145 + i * 20}
                  y2={400 + i * 15}
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  opacity={0.3 + (i % 3) * 0.2}
                >
                  <animate
                    attributeName="y1"
                    values={`${380 + i * 15};${480 + i * 15};${380 + i * 15}`}
                    dur="1s"
                    repeatCount="indefinite"
                    begin={`${i * 0.1}s`}
                  />
                  <animate
                    attributeName="y2"
                    values={`${400 + i * 15};${500 + i * 15};${400 + i * 15}`}
                    dur="1s"
                    repeatCount="indefinite"
                    begin={`${i * 0.1}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;0;0.5"
                    dur="1s"
                    repeatCount="indefinite"
                    begin={`${i * 0.1}s`}
                  />
                </line>
              ))}
              
              {/* Particles/sparks */}
              {[...Array(12)].map((_, i) => (
                <circle
                  key={`spark-${i}`}
                  cx={200 + (Math.random() - 0.5) * 60}
                  cy={350}
                  r={Math.random() * 2 + 1}
                  fill={i % 2 === 0 ? '#FBBF24' : '#F97316'}
                >
                  <animate
                    attributeName="cy"
                    values="350;500"
                    dur={`${0.8 + Math.random() * 0.4}s`}
                    repeatCount="indefinite"
                    begin={`${Math.random()}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="1;0"
                    dur={`${0.8 + Math.random() * 0.4}s`}
                    repeatCount="indefinite"
                    begin={`${Math.random()}s`}
                  />
                </circle>
              ))}
            </svg>
            
            {/* Label */}
            <div className="absolute bottom-6 left-0 right-0 text-center z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
                style={{ background: 'rgba(139, 92, 246, 0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(139, 92, 246, 0.4)' }}
              >
                <Rocket className="w-6 h-6 text-wc-purple" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-wc-purple">IDE</h3>
                  <p className="text-white/60 text-sm">Launch fast, reach for the stars</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Traits */}
          <motion.div 
            className="mt-5 grid grid-cols-1 gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { icon: Rocket, text: "Move fast, break things, learn", color: "from-purple-500 to-pink-500" },
              { icon: Zap, text: "Ship daily, iterate constantly", color: "from-cyan-500 to-blue-500" },
              { icon: Target, text: "Create markets, don't compete", color: "from-pink-500 to-orange-500" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + idx * 0.1 }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/80 text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* SME - Stable Building */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden min-h-[480px]" style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 60%, #334155 100%)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
          }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="buildingMain" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6"/>
                  <stop offset="100%" stopColor="#1E40AF"/>
                </linearGradient>
                <linearGradient id="buildingDark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1E40AF"/>
                  <stop offset="100%" stopColor="#1E3A8A"/>
                </linearGradient>
                <linearGradient id="windowLit" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FEF08A"/>
                  <stop offset="100%" stopColor="#FDE047"/>
                </linearGradient>
                <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a"/>
                  <stop offset="100%" stopColor="#1e293b"/>
                </linearGradient>
                <linearGradient id="ground" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#065F46"/>
                  <stop offset="100%" stopColor="#064E3B"/>
                </linearGradient>
              </defs>
              
              {/* Background stars */}
              {[...Array(20)].map((_, i) => (
                <circle
                  key={i}
                  cx={Math.random() * 400}
                  cy={Math.random() * 200}
                  r={Math.random() * 1 + 0.3}
                  fill="#fff"
                  opacity={0.2 + Math.random() * 0.3}
                />
              ))}
              
              {/* Moon */}
              <circle cx="340" cy="60" r="25" fill="#FEF9C3" opacity="0.9"/>
              <circle cx="335" cy="55" r="25" fill="#0f172a"/>
              
              {/* Background buildings */}
              <rect x="20" y="280" width="50" height="140" fill="#1e293b"/>
              <rect x="80" y="300" width="40" height="120" fill="#1e293b"/>
              <rect x="300" y="290" width="45" height="130" fill="#1e293b"/>
              <rect x="350" y="320" width="50" height="100" fill="#1e293b"/>
              
              {/* Background building windows */}
              {[0,1,2,3].map(row => (
                [0,1].map(col => (
                  <rect
                    key={`bg1-${row}-${col}`}
                    x={30 + col * 18}
                    y={290 + row * 30}
                    width="10"
                    height="15"
                    fill={Math.random() > 0.4 ? '#FDE047' : '#1e293b'}
                    opacity={Math.random() > 0.4 ? 0.6 : 0.3}
                  />
                ))
              ))}
              
              {/* MAIN BUILDING */}
              <g>
                {/* Building shadow */}
                <rect x="135" y="120" width="130" height="300" fill="#0f172a" opacity="0.3" transform="skewX(-5)"/>
                
                {/* Main structure */}
                <rect x="130" y="120" width="140" height="300" fill="url(#buildingMain)"/>
                
                {/* Building top detail */}
                <rect x="120" y="115" width="160" height="15" fill="#2563EB"/>
                <rect x="140" y="100" width="120" height="20" fill="#3B82F6"/>
                
                {/* Antenna/spire */}
                <rect x="195" y="60" width="10" height="45" fill="#64748B"/>
                <circle cx="200" cy="55" r="6" fill="#EF4444">
                  <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
                </circle>
                
                {/* Left wing */}
                <rect x="90" y="200" width="45" height="220" fill="url(#buildingDark)"/>
                <rect x="85" y="195" width="55" height="12" fill="#1E40AF"/>
                
                {/* Right wing */}
                <rect x="265" y="220" width="45" height="200" fill="url(#buildingDark)"/>
                <rect x="260" y="215" width="55" height="12" fill="#1E40AF"/>
                
                {/* Main building windows */}
                {[0,1,2,3,4,5,6,7,8].map(row => (
                  [0,1,2,3,4].map(col => {
                    const isLit = Math.random() > 0.25;
                    return (
                      <g key={`win-${row}-${col}`}>
                        <rect
                          x={145 + col * 23}
                          y={135 + row * 28}
                          width="14"
                          height="18"
                          fill={isLit ? 'url(#windowLit)' : '#1e3a8a'}
                          opacity={isLit ? 0.9 : 0.5}
                        >
                          {isLit && Math.random() > 0.7 && (
                            <animate 
                              attributeName="opacity" 
                              values="0.9;0.5;0.9" 
                              dur={`${3 + Math.random() * 4}s`} 
                              repeatCount="indefinite"
                              begin={`${Math.random() * 2}s`}
                            />
                          )}
                        </rect>
                      </g>
                    );
                  })
                ))}
                
                {/* Left wing windows */}
                {[0,1,2,3,4,5].map(row => (
                  [0,1].map(col => (
                    <rect
                      key={`lwin-${row}-${col}`}
                      x={100 + col * 18}
                      y={215 + row * 32}
                      width="10"
                      height="20"
                      fill={Math.random() > 0.3 ? '#FDE047' : '#1e3a8a'}
                      opacity={Math.random() > 0.3 ? 0.8 : 0.4}
                    />
                  ))
                ))}
                
                {/* Right wing windows */}
                {[0,1,2,3,4,5].map(row => (
                  [0,1].map(col => (
                    <rect
                      key={`rwin-${row}-${col}`}
                      x={275 + col * 18}
                      y={235 + row * 30}
                      width="10"
                      height="18"
                      fill={Math.random() > 0.35 ? '#FDE047' : '#1e3a8a'}
                      opacity={Math.random() > 0.35 ? 0.75 : 0.4}
                    />
                  ))
                ))}
                
                {/* Entrance */}
                <rect x="175" y="380" width="50" height="40" fill="#1e3a8a"/>
                <rect x="180" y="385" width="40" height="35" fill="#fef9c3" opacity="0.3"/>
                <rect x="198" y="385" width="4" height="35" fill="#1e3a8a"/>
                
                {/* Ground level details */}
                <rect x="130" y="415" width="140" height="5" fill="#1E40AF"/>
              </g>
              
              {/* Ground/grass */}
              <rect x="0" y="420" width="400" height="80" fill="url(#ground)"/>
              <ellipse cx="200" cy="420" rx="200" ry="15" fill="#065F46"/>
              
              {/* Trees */}
              <g transform="translate(60, 400)">
                <rect x="-3" y="-20" width="6" height="25" fill="#78350F"/>
                <circle cx="0" cy="-35" r="18" fill="#166534"/>
                <circle cx="-10" cy="-25" r="12" fill="#15803D"/>
                <circle cx="10" cy="-28" r="14" fill="#15803D"/>
              </g>
              <g transform="translate(340, 405)">
                <rect x="-2" y="-15" width="4" height="20" fill="#78350F"/>
                <circle cx="0" cy="-28" r="15" fill="#166534"/>
                <circle cx="-8" cy="-20" r="10" fill="#15803D"/>
              </g>
              
              {/* Street lamp */}
              <g transform="translate(320, 380)">
                <rect x="-2" y="0" width="4" height="40" fill="#64748B"/>
                <ellipse cx="0" cy="-5" rx="8" ry="6" fill="#FEF08A" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.6;0.8" dur="3s" repeatCount="indefinite"/>
                </ellipse>
                <rect x="-6" y="-8" width="12" height="6" rx="2" fill="#475569"/>
              </g>
            </svg>
            
            {/* Label */}
            <div className="absolute bottom-6 left-0 right-0 text-center z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
                style={{ background: 'rgba(59, 130, 246, 0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(59, 130, 246, 0.4)' }}
              >
                <Building2 className="w-6 h-6 text-blue-400" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-blue-400">SME</h3>
                  <p className="text-white/60 text-sm">Build solid, grow steady</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Traits */}
          <motion.div 
            className="mt-5 grid grid-cols-1 gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {[
              { icon: Building2, text: "Build on proven foundations", color: "from-blue-500 to-indigo-500" },
              { icon: Shield, text: "Minimize risk, maximize safety", color: "from-emerald-500 to-teal-500" },
              { icon: Clock, text: "Steady, predictable growth", color: "from-amber-500 to-orange-500" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + idx * 0.1 }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/80 text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="text-center mt-8"
      >
        <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl" style={{ 
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <p className="text-white/70 text-sm md:text-base">
            Neither is "wrong" — but <span className="text-wc-purple font-semibold">innovation requires velocity</span>
          </p>
          <Sparkles className="w-5 h-5 text-wc-pink" />
        </div>
      </motion.div>
    </div>
  );
};

export default VisualMetaphorSlide;
