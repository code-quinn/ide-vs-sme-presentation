import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Rocket, Building2, Zap, Shield, Target, Clock, Lightbulb, Sparkles, TrendingUp } from 'lucide-react';

// Premium SVG Starship-style Rocket Component
const StarshipRocket = ({ isLaunching, isOrbiting, isExploding }) => {
  return (
    <svg viewBox="0 0 120 280" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))' }}>
      <defs>
        {/* Chrome/Steel gradient */}
        <linearGradient id="steelBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="15%" stopColor="#e2e8f0" />
          <stop offset="30%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="70%" stopColor="#f1f5f9" />
          <stop offset="85%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        
        {/* Nose cone gradient */}
        <linearGradient id="noseCone" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="30%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        
        {/* Engine bell gradient */}
        <linearGradient id="engineBell" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="50%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
        
        {/* Flame gradients */}
        <linearGradient id="flameOuter" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="30%" stopColor="#fb923c" />
          <stop offset="60%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        
        <linearGradient id="flameInner" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor="#fef9c3" />
          <stop offset="50%" stopColor="#fde047" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        
        <linearGradient id="flameCore" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        
        {/* Window glow */}
        <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </radialGradient>
        
        {/* Fin gradient */}
        <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        
        {/* Grid fin gradient */}
        <linearGradient id="gridFin" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="50%" stopColor="#374151" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>
        
        {/* Glow filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* === MAIN BODY === */}
      
      {/* Nose cone - sleek aerodynamic shape */}
      <path 
        d="M60 0 Q65 20 68 50 L68 70 L52 70 L52 50 Q55 20 60 0" 
        fill="url(#noseCone)"
      />
      
      {/* Upper body section */}
      <rect x="52" y="70" width="16" height="60" fill="url(#steelBody)" />
      
      {/* Command module window - larger with glow */}
      <ellipse cx="60" cy="95" rx="6" ry="8" fill="url(#windowGlow)" filter="url(#glow)" />
      <ellipse cx="60" cy="95" rx="4" ry="5" fill="#ffffff" opacity="0.3" />
      <ellipse cx="58" cy="93" rx="1.5" ry="2" fill="#ffffff" opacity="0.6" />
      
      {/* Body separation ring */}
      <rect x="50" y="130" width="20" height="4" fill="#475569" />
      
      {/* Main fuel tank section */}
      <rect x="50" y="134" width="20" height="80" fill="url(#steelBody)" />
      
      {/* Tank details - weld lines */}
      <line x1="50" y1="160" x2="70" y2="160" stroke="#94a3b8" strokeWidth="0.5" opacity="0.5" />
      <line x1="50" y1="190" x2="70" y2="190" stroke="#94a3b8" strokeWidth="0.5" opacity="0.5" />
      
      {/* Purple accent stripe (IDE branding) */}
      <rect x="50" y="175" width="20" height="8" fill="#8b5cf6" opacity="0.9" />
      <rect x="50" y="175" width="20" height="2" fill="#a78bfa" />
      
      {/* SpaceX-style black band */}
      <rect x="50" y="200" width="20" height="6" fill="#1f2937" />
      
      {/* Engine section - wider base */}
      <path d="M50 214 L48 230 L72 230 L70 214 Z" fill="url(#steelBody)" />
      
      {/* === GRID FINS (SpaceX style) === */}
      
      {/* Left grid fin */}
      <g transform="translate(38, 145)">
        <rect x="0" y="0" width="10" height="20" fill="url(#gridFin)" rx="1" />
        {/* Grid pattern */}
        <line x1="2" y1="0" x2="2" y2="20" stroke="#111827" strokeWidth="0.5" />
        <line x1="5" y1="0" x2="5" y2="20" stroke="#111827" strokeWidth="0.5" />
        <line x1="8" y1="0" x2="8" y2="20" stroke="#111827" strokeWidth="0.5" />
        <line x1="0" y1="5" x2="10" y2="5" stroke="#111827" strokeWidth="0.5" />
        <line x1="0" y1="10" x2="10" y2="10" stroke="#111827" strokeWidth="0.5" />
        <line x1="0" y1="15" x2="10" y2="15" stroke="#111827" strokeWidth="0.5" />
      </g>
      
      {/* Right grid fin */}
      <g transform="translate(72, 145)">
        <rect x="0" y="0" width="10" height="20" fill="url(#gridFin)" rx="1" />
        <line x1="2" y1="0" x2="2" y2="20" stroke="#111827" strokeWidth="0.5" />
        <line x1="5" y1="0" x2="5" y2="20" stroke="#111827" strokeWidth="0.5" />
        <line x1="8" y1="0" x2="8" y2="20" stroke="#111827" strokeWidth="0.5" />
        <line x1="0" y1="5" x2="10" y2="5" stroke="#111827" strokeWidth="0.5" />
        <line x1="0" y1="10" x2="10" y2="10" stroke="#111827" strokeWidth="0.5" />
        <line x1="0" y1="15" x2="10" y2="15" stroke="#111827" strokeWidth="0.5" />
      </g>
      
      {/* === LANDING FINS (large aerodynamic) === */}
      
      {/* Left fin */}
      <path 
        d="M48 230 L28 270 L32 275 L48 245 Z" 
        fill="url(#finGradient)"
      />
      <path d="M48 235 L38 255 L40 258 L48 243 Z" fill="#94a3b8" opacity="0.3" />
      
      {/* Right fin */}
      <path 
        d="M72 230 L92 270 L88 275 L72 245 Z" 
        fill="url(#finGradient)"
      />
      <path d="M72 235 L82 255 L80 258 L72 243 Z" fill="#94a3b8" opacity="0.3" />
      
      {/* === RAPTOR ENGINES (3 main + outer ring suggestion) === */}
      
      {/* Engine housings */}
      <ellipse cx="60" cy="232" rx="14" ry="4" fill="#1f2937" />
      
      {/* Center engine bell */}
      <ellipse cx="60" cy="245" rx="6" ry="8" fill="url(#engineBell)" />
      <ellipse cx="60" cy="243" rx="4" ry="5" fill="#0f172a" />
      
      {/* Left engine */}
      <ellipse cx="50" cy="243" rx="4" ry="6" fill="url(#engineBell)" />
      <ellipse cx="50" cy="241" rx="2.5" ry="3.5" fill="#0f172a" />
      
      {/* Right engine */}
      <ellipse cx="70" cy="243" rx="4" ry="6" fill="url(#engineBell)" />
      <ellipse cx="70" cy="241" rx="2.5" ry="3.5" fill="#0f172a" />
      
      {/* === FLAMES (animated via CSS) === */}
      {(isLaunching || isOrbiting) && (
        <g className={isLaunching ? "animate-flame-intense" : "animate-flame-gentle"}>
          {/* Center engine flame */}
          <ellipse cx="60" cy="270" rx="8" ry="25" fill="url(#flameOuter)" filter="url(#strongGlow)">
            <animate attributeName="ry" values="25;30;22;28;25" dur="0.15s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="60" cy="268" rx="5" ry="18" fill="url(#flameInner)">
            <animate attributeName="ry" values="18;22;16;20;18" dur="0.12s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="60" cy="265" rx="2.5" ry="10" fill="url(#flameCore)">
            <animate attributeName="ry" values="10;12;9;11;10" dur="0.1s" repeatCount="indefinite" />
          </ellipse>
          
          {/* Left engine flame */}
          <ellipse cx="50" cy="265" rx="5" ry="18" fill="url(#flameOuter)" filter="url(#glow)">
            <animate attributeName="ry" values="18;22;16;20;18" dur="0.13s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="50" cy="263" rx="3" ry="12" fill="url(#flameInner)">
            <animate attributeName="ry" values="12;15;10;13;12" dur="0.11s" repeatCount="indefinite" />
          </ellipse>
          
          {/* Right engine flame */}
          <ellipse cx="70" cy="265" rx="5" ry="18" fill="url(#flameOuter)" filter="url(#glow)">
            <animate attributeName="ry" values="18;20;17;22;18" dur="0.14s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="70" cy="263" rx="3" ry="12" fill="url(#flameInner)">
            <animate attributeName="ry" values="12;14;11;15;12" dur="0.1s" repeatCount="indefinite" />
          </ellipse>
        </g>
      )}
      
      {/* === HIGHLIGHT REFLECTIONS === */}
      <path 
        d="M54 75 Q55 100 54 130" 
        stroke="rgba(255,255,255,0.4)" 
        strokeWidth="1" 
        fill="none"
      />
      <path 
        d="M53 140 Q54 170 53 210" 
        stroke="rgba(255,255,255,0.3)" 
        strokeWidth="1.5" 
        fill="none"
      />
    </svg>
  );
};

// Premium Glass Skyscraper Component
const GlassSkyscraper = ({ height, width, x, windows = true, lightRatio = 0.4, delay = 0 }) => {
  const rows = Math.floor(height / 12);
  const cols = Math.floor(width / 8);
  
  return (
    <motion.g 
      transform={`translate(${x}, 0)`}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id={`building-${x}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="20%" stopColor="#2d4a6f" />
          <stop offset="50%" stopColor="#3d5a7f" />
          <stop offset="80%" stopColor="#2d4a6f" />
          <stop offset="100%" stopColor="#1e3a5f" />
        </linearGradient>
        <linearGradient id={`glass-${x}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      {/* Main building body */}
      <rect 
        x="0" 
        y={-height} 
        width={width} 
        height={height} 
        fill={`url(#building-${x})`}
        rx="2"
      />
      
      {/* Glass overlay */}
      <rect 
        x="0" 
        y={-height} 
        width={width} 
        height={height} 
        fill={`url(#glass-${x})`}
        rx="2"
      />
      
      {/* Windows */}
      {windows && [...Array(rows)].map((_, row) => (
        [...Array(cols)].map((_, col) => {
          const isLit = Math.random() < lightRatio;
          const brightness = 0.3 + Math.random() * 0.7;
          return (
            <motion.rect
              key={`${row}-${col}`}
              x={4 + col * 8}
              y={-height + 6 + row * 12}
              width="5"
              height="8"
              fill={isLit ? "#fef08a" : "#1e3a5f"}
              opacity={isLit ? brightness : 0.3}
              rx="0.5"
              animate={isLit && Math.random() > 0.9 ? {
                opacity: [brightness, brightness * 0.3, brightness],
              } : {}}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
            />
          );
        })
      ))}
      
      {/* Reflection line */}
      <rect 
        x="2" 
        y={-height + 2} 
        width="1" 
        height={height - 4} 
        fill="rgba(255,255,255,0.1)"
      />
    </motion.g>
  );
};

// Premium Earth Globe Component
const EarthGlobe = ({ size = 120 }) => {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.4))' }}>
      <defs>
        {/* Ocean gradient */}
        <radialGradient id="ocean" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="40%" stopColor="#2563eb" />
          <stop offset="70%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
        
        {/* Land gradient */}
        <linearGradient id="land" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="50%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        
        {/* Atmosphere glow */}
        <radialGradient id="atmosphere" cx="50%" cy="50%" r="50%">
          <stop offset="85%" stopColor="transparent" />
          <stop offset="95%" stopColor="#60a5fa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.5" />
        </radialGradient>
        
        {/* Specular highlight */}
        <radialGradient id="specular" cx="30%" cy="25%" r="40%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        
        {/* Shadow */}
        <radialGradient id="earthShadow" cx="80%" cy="80%" r="50%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
        </radialGradient>
      </defs>
      
      {/* Outer atmosphere glow */}
      <circle cx="60" cy="60" r="58" fill="url(#atmosphere)" />
      
      {/* Ocean base */}
      <circle cx="60" cy="60" r="50" fill="url(#ocean)" />
      
      {/* Continents - stylized but recognizable */}
      <g>
        {/* North America */}
        <path d="M25 28 Q30 25 38 28 Q45 30 42 38 Q40 45 35 48 Q28 50 22 45 Q18 40 20 35 Q22 30 25 28" fill="url(#land)" />
        
        {/* South America */}
        <path d="M35 55 Q40 52 42 58 Q44 68 40 78 Q36 85 32 82 Q28 78 30 68 Q32 60 35 55" fill="url(#land)" />
        
        {/* Europe */}
        <path d="M55 28 Q62 25 68 28 Q72 32 70 36 Q68 40 62 38 Q56 36 55 32 Q54 30 55 28" fill="url(#land)" />
        
        {/* Africa */}
        <path d="M58 42 Q65 40 72 45 Q78 52 76 62 Q74 72 68 78 Q60 82 55 75 Q50 68 52 58 Q54 48 58 42" fill="url(#land)" />
        
        {/* Asia */}
        <path d="M72 28 Q85 24 95 32 Q98 40 92 48 Q85 55 78 52 Q72 48 70 42 Q68 35 72 28" fill="url(#land)" />
        
        {/* Australia */}
        <path d="M85 65 Q92 62 96 68 Q98 75 94 80 Q88 82 84 78 Q80 73 82 68 Q84 65 85 65" fill="#d97706" />
      </g>
      
      {/* Ice caps */}
      <ellipse cx="60" cy="14" rx="25" ry="6" fill="rgba(255,255,255,0.7)" />
      <ellipse cx="60" cy="106" rx="20" ry="5" fill="rgba(255,255,255,0.6)" />
      
      {/* Cloud wisps */}
      <g opacity="0.4">
        <ellipse cx="35" cy="35" rx="12" ry="3" fill="white">
          <animateTransform attributeName="transform" type="translate" values="0,0;5,0;0,0" dur="20s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="70" cy="55" rx="15" ry="3" fill="white">
          <animateTransform attributeName="transform" type="translate" values="0,0;-4,0;0,0" dur="25s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="50" cy="75" rx="10" ry="2" fill="white">
          <animateTransform attributeName="transform" type="translate" values="0,0;3,0;0,0" dur="18s" repeatCount="indefinite" />
        </ellipse>
      </g>
      
      {/* Specular highlight */}
      <circle cx="60" cy="60" r="50" fill="url(#specular)" />
      
      {/* Shadow overlay */}
      <circle cx="60" cy="60" r="50" fill="url(#earthShadow)" />
    </svg>
  );
};

// Particle System Component
const ThrustParticles = ({ active, intensity = 1 }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }
    
    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticles = [...prev.slice(-40)];
        for (let i = 0; i < 3 * intensity; i++) {
          newParticles.push({
            id: Date.now() + i,
            x: 45 + Math.random() * 10,
            y: 75,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 3 + 2,
            size: 2 + Math.random() * 4,
            color: ['#fef08a', '#fb923c', '#f97316', '#ffffff'][Math.floor(Math.random() * 4)],
            life: 1,
          });
        }
        return newParticles;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, [active, intensity]);
  
  useEffect(() => {
    if (particles.length === 0) return;
    
    const frame = requestAnimationFrame(() => {
      setParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 0.02,
          size: p.size * 0.98,
        }))
        .filter(p => p.life > 0)
      );
    });
    
    return () => cancelAnimationFrame(frame);
  }, [particles]);
  
  return (
    <>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.life,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </>
  );
};

// Smoke Trail Component
const SmokeTrail = ({ active }) => {
  const [smoke, setSmoke] = useState([]);
  
  useEffect(() => {
    if (!active) {
      setSmoke([]);
      return;
    }
    
    const interval = setInterval(() => {
      setSmoke(prev => [...prev.slice(-25), {
        id: Date.now(),
        x: 42 + Math.random() * 16,
        size: 30 + Math.random() * 40,
      }]);
    }, 80);
    
    return () => clearInterval(interval);
  }, [active]);
  
  return (
    <>
      {smoke.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${s.x}%`,
            bottom: '15%',
            width: s.size,
            height: s.size,
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(156,163,175,0.2) 50%, transparent 70%)',
          }}
          initial={{ opacity: 0.7, scale: 0.5, y: 0 }}
          animate={{ opacity: 0, scale: 2.5, y: 150 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      ))}
    </>
  );
};

// Explosion Effect Component
const ExplosionEffect = ({ active, onComplete }) => {
  const [debris, setDebris] = useState([]);
  
  useEffect(() => {
    if (active) {
      setDebris([...Array(60)].map((_, i) => ({
        id: i,
        angle: (i / 60) * 360 + Math.random() * 10,
        distance: 80 + Math.random() * 150,
        size: 3 + Math.random() * 12,
        color: ['#ef4444', '#f97316', '#fbbf24', '#fef08a', '#ffffff'][Math.floor(Math.random() * 5)],
        rotation: Math.random() * 720,
        duration: 0.6 + Math.random() * 0.8,
      })));
      
      setTimeout(() => onComplete?.(), 1500);
    }
  }, [active]);
  
  if (!active) return null;
  
  return (
    <>
      {/* Central flash */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 100,
          height: 100,
          background: 'radial-gradient(circle, #ffffff 0%, #fef08a 20%, #fb923c 50%, #ef4444 70%, transparent 100%)',
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 6, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Shockwave ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-orange-400"
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ width: 300, height: 300, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      {/* Debris particles */}
      {debris.map(d => (
        <motion.div
          key={d.id}
          className="absolute left-1/2 top-1/2 rounded"
          style={{
            width: d.size,
            height: d.size,
            background: d.color,
            boxShadow: `0 0 ${d.size}px ${d.color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: Math.cos(d.angle * Math.PI / 180) * d.distance,
            y: Math.sin(d.angle * Math.PI / 180) * d.distance,
            opacity: 0,
            rotate: d.rotation,
          }}
          transition={{ duration: d.duration, ease: "easeOut" }}
        />
      ))}
    </>
  );
};

// Star Field Component
const StarField = ({ count = 80, area = { x: 100, y: 100 } }) => {
  const stars = useMemo(() => 
    [...Array(count)].map((_, i) => ({
      id: i,
      x: Math.random() * area.x,
      y: Math.random() * area.y,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.4,
      twinkle: Math.random() > 0.7,
      duration: 2 + Math.random() * 3,
    })),
    [count, area.x, area.y]
  );
  
  return (
    <>
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
          animate={star.twinkle ? {
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.2, 1],
          } : { opacity: star.opacity }}
          transition={star.twinkle ? { duration: star.duration, repeat: Infinity } : {}}
        />
      ))}
    </>
  );
};

// Main Component
const VisualMetaphorSlide = ({ slide }) => {
  const [rocketState, setRocketState] = useState('idle');
  const [countdown, setCountdown] = useState(3);
  const [stats, setStats] = useState({ launches: 0, success: 0, crashes: 0 });
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [shake, setShake] = useState(false);
  
  // Launch sequence
  useEffect(() => {
    let timer;
    
    if (rocketState === 'idle') {
      timer = setTimeout(() => {
        setRocketState('countdown');
        setCountdown(3);
      }, 1500);
    } else if (rocketState === 'countdown') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(c => c - 1), 800);
      } else {
        setRocketState('launching');
        setShake(true);
        setTimeout(() => setShake(false), 500);
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
          setShake(true);
          setTimeout(() => setShake(false), 400);
          setStats(s => ({ ...s, crashes: s.crashes + 1 }));
        }
      }, 2800);
    } else if (rocketState === 'success') {
      timer = setTimeout(() => setRocketState('orbiting'), 1000);
    } else if (rocketState === 'orbiting') {
      timer = setTimeout(() => setRocketState('idle'), 7000);
    } else if (rocketState === 'exploding') {
      timer = setTimeout(() => setRocketState('crashed'), 800);
    } else if (rocketState === 'crashed') {
      timer = setTimeout(() => setRocketState('idle'), 3000);
    }
    
    return () => clearTimeout(timer);
  }, [rocketState, countdown]);
  
  // Orbit animation
  useEffect(() => {
    if (rocketState === 'orbiting') {
      const interval = setInterval(() => {
        setOrbitAngle(prev => (prev + 2) % 360);
      }, 25);
      return () => clearInterval(interval);
    } else {
      setOrbitAngle(0);
    }
  }, [rocketState]);
  
  const getRocketPosition = () => {
    switch (rocketState) {
      case 'idle': return { y: '72%', scale: 0.35, rotate: 0 };
      case 'countdown': return { y: '72%', scale: 0.37, rotate: 0 };
      case 'launching': return { y: '-30%', scale: 0.35, rotate: 0 };
      case 'success': return { y: '40%', scale: 0.25, rotate: 0 };
      case 'orbiting': return { y: '40%', scale: 0.2, rotate: 0 };
      case 'exploding': return { y: '45%', scale: 0.15, rotate: 45 };
      case 'crashed': return { y: '85%', scale: 0.1, rotate: 180 };
      default: return { y: '72%', scale: 0.35, rotate: 0 };
    }
  };
  
  const pos = getRocketPosition();
  const orbitRadiusX = 100;
  const orbitRadiusY = 50;
  const orbitX = Math.cos((orbitAngle - 90) * Math.PI / 180) * orbitRadiusX;
  const orbitY = Math.sin((orbitAngle - 90) * Math.PI / 180) * orbitRadiusY;

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
          <motion.div 
            className="relative rounded-3xl overflow-hidden h-[400px]"
            style={{
              background: 'linear-gradient(180deg, #020617 0%, #0c1222 20%, #111827 50%, #1e1b4b 80%, #312e81 100%)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              boxShadow: '0 0 80px rgba(139, 92, 246, 0.15), inset 0 0 100px rgba(0,0,0,0.6)',
            }}
            animate={shake ? { x: [0, -3, 3, -2, 2, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {/* Star field */}
            <StarField count={100} />
            
            {/* Nebula effect */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'radial-gradient(ellipse at 20% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
              }}
            />
            
            {/* Shooting stars */}
            <motion.div
              className="absolute h-0.5 bg-gradient-to-r from-white via-white to-transparent"
              style={{ top: '12%', left: '5%', width: '80px' }}
              animate={{ x: [0, 200], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 6 }}
            />
            <motion.div
              className="absolute h-0.5 bg-gradient-to-r from-white via-white to-transparent"
              style={{ top: '25%', right: '30%', width: '60px' }}
              animate={{ x: [0, 150], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 8, delay: 3 }}
            />
            
            {/* Distant planet */}
            <motion.div
              className="absolute w-20 h-20 rounded-full"
              style={{
                top: '8%',
                right: '8%',
                background: 'radial-gradient(circle at 30% 30%, #a78bfa, #7c3aed, #4c1d95)',
                boxShadow: '0 0 40px rgba(167, 139, 250, 0.4), inset -5px -5px 20px rgba(0,0,0,0.4)',
              }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Rings */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-8 border-2 border-purple-300/30 rounded-full"
                style={{ transform: 'translate(-50%, -50%) rotateX(75deg)' }}
              />
            </motion.div>
            
            {/* Smoke trail */}
            <SmokeTrail active={rocketState === 'launching' || rocketState === 'countdown'} />
            
            {/* Thrust particles */}
            <ThrustParticles 
              active={rocketState === 'launching'} 
              intensity={2}
            />
            
            {/* Explosion effect */}
            <ExplosionEffect 
              active={rocketState === 'exploding'} 
              onComplete={() => {}}
            />
            
            {/* Orbit path */}
            <AnimatePresence>
              {rocketState === 'orbiting' && (
                <motion.div
                  className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div 
                    className="border-2 border-dashed border-purple-400/20 rounded-full"
                    style={{ width: orbitRadiusX * 2 + 40, height: orbitRadiusY * 2 + 40 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Earth Globe - during orbit */}
            <AnimatePresence>
              {(rocketState === 'success' || rocketState === 'orbiting') && (
                <motion.div
                  className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, rotate: rocketState === 'orbiting' ? 360 : 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    scale: { duration: 0.6, ease: "easeOut" },
                    rotate: { duration: 120, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <EarthGlobe size={100} />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* ROCKET */}
            <motion.div
              className="absolute z-20 w-24 h-64 flex items-center justify-center"
              style={{
                left: rocketState === 'orbiting' ? `calc(50% + ${orbitX}px)` : '50%',
                top: rocketState === 'orbiting' ? `calc(40% + ${orbitY}px)` : pos.y,
                transformOrigin: 'center center',
              }}
              animate={{
                scale: pos.scale,
                rotate: rocketState === 'orbiting' ? orbitAngle : pos.rotate,
                x: '-50%',
                y: rocketState === 'orbiting' ? '-50%' : '-50%',
              }}
              transition={{
                duration: rocketState === 'launching' ? 2.8 : 0.4,
                ease: rocketState === 'launching' ? [0.2, 0.8, 0.3, 1] : "easeOut",
              }}
            >
              <StarshipRocket 
                isLaunching={rocketState === 'launching' || rocketState === 'countdown'}
                isOrbiting={rocketState === 'orbiting'}
                isExploding={rocketState === 'exploding'}
              />
            </motion.div>
            
            {/* Countdown */}
            <AnimatePresence>
              {rocketState === 'countdown' && countdown > 0 && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-30"
                  initial={{ scale: 3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  key={countdown}
                >
                  <span 
                    className="text-9xl font-black"
                    style={{ 
                      color: '#a78bfa',
                      textShadow: '0 0 60px rgba(167, 139, 250, 0.9), 0 0 120px rgba(139, 92, 246, 0.5)',
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
                  className="absolute top-6 inset-x-0 flex justify-center z-30"
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-400/50 backdrop-blur-sm">
                    <span className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" /> ORBIT ACHIEVED!
                    </span>
                  </div>
                </motion.div>
              )}
              {rocketState === 'orbiting' && (
                <motion.div
                  className="absolute top-6 inset-x-0 flex justify-center z-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="px-5 py-2 rounded-full bg-purple-500/20 border border-purple-400/40 backdrop-blur-sm">
                    <span className="text-sm font-medium text-purple-300">🌍 Stable Orbit • Mission Success</span>
                  </div>
                </motion.div>
              )}
              {(rocketState === 'exploding' || rocketState === 'crashed') && (
                <motion.div
                  className="absolute top-6 inset-x-0 flex justify-center z-30"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="px-6 py-3 rounded-full bg-orange-500/20 border border-orange-400/50 backdrop-blur-sm">
                    <span className="text-lg font-bold text-orange-400">💥 RUD* → Learning → Iterate!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Launch pad / Ground */}
            <div 
              className="absolute bottom-0 inset-x-0 h-16"
              style={{
                background: 'linear-gradient(to top, #1e1b4b 0%, #312e81 50%, transparent 100%)',
              }}
            />
            
            {/* Launch tower hint */}
            <div className="absolute bottom-4 left-[40%] w-1 h-20 bg-gradient-to-t from-slate-600 to-slate-700 opacity-50" />
            <div className="absolute bottom-4 left-[40%] w-4 h-1 bg-slate-600 opacity-50" />
            
            {/* Stats */}
            <div className="absolute bottom-2 left-3 right-3 flex justify-between text-xs font-mono z-20">
              <span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">✓ {stats.success}</span>
              <span className="text-white/40">Launches: {stats.launches}</span>
              <span className="text-orange-400 bg-orange-400/10 px-2 py-1 rounded">✗ {stats.crashes}</span>
            </div>
            
            {/* Label */}
            <div className="absolute top-3 left-3 z-20">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 backdrop-blur-sm">
                <Rocket className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-purple-400">IDE</span>
              </div>
            </div>
          </motion.div>
          
          {/* IDE Traits */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { icon: Zap, text: "Ship fast", color: "text-yellow-400", bg: "bg-yellow-400/10" },
              { icon: Target, text: "Learn from crashes", color: "text-orange-400", bg: "bg-orange-400/10" },
              { icon: TrendingUp, text: "Iterate rapidly", color: "text-emerald-400", bg: "bg-emerald-400/10" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl ${item.bg} border border-purple-500/20`}
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-white/80 text-xs font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
          
          <p className="text-[10px] text-white/30 mt-2 text-center">*RUD = Rapid Unscheduled Disassembly (SpaceX term)</p>
        </motion.div>

        {/* SME - Modern City Scene */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div 
            className="relative rounded-3xl overflow-hidden h-[400px]"
            style={{
              background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 40%, #334155 70%, #475569 100%)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              boxShadow: '0 0 80px rgba(59, 130, 246, 0.1), inset 0 0 100px rgba(0,0,0,0.4)',
            }}
          >
            {/* Stars (fewer, dimmer) */}
            <StarField count={30} area={{ x: 100, y: 40 }} />
            
            {/* Moon */}
            <motion.div
              className="absolute top-8 right-10"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <div 
                className="w-16 h-16 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #fef9c3 0%, #fde68a 50%, #fcd34d 100%)',
                  boxShadow: '0 0 60px rgba(254, 249, 195, 0.4), 0 0 100px rgba(253, 230, 138, 0.2)',
                }}
              />
              {/* Craters */}
              <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-amber-200/30" />
              <div className="absolute top-8 right-3 w-2 h-2 rounded-full bg-amber-200/30" />
              <div className="absolute bottom-3 left-6 w-2 h-2 rounded-full bg-amber-200/30" />
            </motion.div>
            
            {/* Clouds */}
            <motion.div
              className="absolute top-24 left-0 w-40 h-8 bg-slate-600/20 rounded-full blur-md"
              animate={{ x: [0, 50, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-32 right-10 w-32 h-6 bg-slate-600/15 rounded-full blur-md"
              animate={{ x: [0, -30, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            
            {/* City Skyline SVG */}
            <svg 
              viewBox="0 0 400 200" 
              className="absolute bottom-12 left-0 right-0 w-full h-64"
              style={{ filter: 'drop-shadow(0 -5px 20px rgba(59, 130, 246, 0.2))' }}
            >
              <defs>
                <linearGradient id="skylineBg1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e3a5f" />
                  <stop offset="50%" stopColor="#2d4a6f" />
                  <stop offset="100%" stopColor="#1e3a5f" />
                </linearGradient>
                <linearGradient id="skylineBg2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e40af" />
                  <stop offset="30%" stopColor="#2563eb" />
                  <stop offset="70%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
                <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              
              {/* Background buildings (darker, further) */}
              <rect x="10" y="80" width="30" height="120" fill="#1e293b" rx="1" />
              <rect x="50" y="60" width="25" height="140" fill="#1e293b" rx="1" />
              <rect x="320" y="70" width="35" height="130" fill="#1e293b" rx="1" />
              <rect x="365" y="90" width="25" height="110" fill="#1e293b" rx="1" />
              
              {/* Mid-ground buildings */}
              <rect x="85" y="50" width="35" height="150" fill="url(#skylineBg1)" rx="2" />
              <rect x="280" y="55" width="30" height="145" fill="url(#skylineBg1)" rx="2" />
              
              {/* Main HQ Building (center) */}
              <g transform="translate(150, 0)">
                {/* Antenna */}
                <rect x="48" y="5" width="2" height="20" fill="#64748b" />
                <circle cx="49" cy="5" r="3" fill="#ef4444">
                  <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                </circle>
                
                {/* Spire */}
                <polygon points="49,25 44,45 54,45" fill="#475569" />
                
                {/* Main tower */}
                <rect x="24" y="45" width="50" height="155" fill="url(#skylineBg2)" rx="2" />
                <rect x="24" y="45" width="50" height="155" fill="url(#glassReflect)" rx="2" />
                
                {/* Windows grid */}
                {[...Array(12)].map((_, row) => (
                  [...Array(5)].map((_, col) => (
                    <rect
                      key={`${row}-${col}`}
                      x={28 + col * 9}
                      y={52 + row * 12}
                      width="6"
                      height="9"
                      fill={Math.random() > 0.35 ? "#fef08a" : "#1e3a8a"}
                      opacity={Math.random() > 0.35 ? 0.7 + Math.random() * 0.3 : 0.3}
                      rx="0.5"
                    >
                      {Math.random() > 0.9 && (
                        <animate attributeName="opacity" values="0.9;0.3;0.9" dur={`${3 + Math.random() * 4}s`} repeatCount="indefinite" />
                      )}
                    </rect>
                  ))
                ))}
                
                {/* Entrance */}
                <rect x="36" y="185" width="26" height="15" fill="#0f172a" rx="2" />
                <rect x="40" y="187" width="18" height="10" fill="#fef9c3" opacity="0.3" rx="1" />
              </g>
              
              {/* Side towers */}
              <g transform="translate(105, 20)">
                <rect x="0" y="60" width="30" height="120" fill="url(#skylineBg1)" rx="2" />
                {[...Array(9)].map((_, row) => (
                  [...Array(3)].map((_, col) => (
                    <rect
                      key={`l-${row}-${col}`}
                      x={4 + col * 9}
                      y={68 + row * 12}
                      width="6"
                      height="9"
                      fill={Math.random() > 0.4 ? "#fef08a" : "#1e3a8a"}
                      opacity={Math.random() > 0.4 ? 0.6 + Math.random() * 0.3 : 0.3}
                      rx="0.5"
                    />
                  ))
                ))}
              </g>
              
              <g transform="translate(255, 15)">
                <rect x="0" y="55" width="28" height="130" fill="url(#skylineBg1)" rx="2" />
                {[...Array(10)].map((_, row) => (
                  [...Array(3)].map((_, col) => (
                    <rect
                      key={`r-${row}-${col}`}
                      x={3 + col * 8}
                      y={63 + row * 12}
                      width="5"
                      height="8"
                      fill={Math.random() > 0.4 ? "#fef08a" : "#1e3a8a"}
                      opacity={Math.random() > 0.4 ? 0.6 + Math.random() * 0.3 : 0.3}
                      rx="0.5"
                    />
                  ))
                ))}
              </g>
            </svg>
            
            {/* Ground level - grass/plaza */}
            <div 
              className="absolute bottom-0 inset-x-0 h-12"
              style={{
                background: 'linear-gradient(to top, #064e3b 0%, #065f46 50%, #047857 100%)',
              }}
            />
            
            {/* Trees */}
            {[15, 30, 75, 88].map((x, i) => (
              <div key={i} className="absolute bottom-10" style={{ left: `${x}%` }}>
                <div className="w-1 h-6 bg-amber-900 mx-auto" />
                <motion.div 
                  className="w-8 h-8 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-700 -mt-3"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3 + i, repeat: Infinity }}
                />
              </div>
            ))}
            
            {/* Street lamps */}
            {[22, 65].map((x, i) => (
              <div key={i} className="absolute bottom-10" style={{ left: `${x}%` }}>
                <div className="w-0.5 h-10 bg-slate-500 mx-auto" />
                <motion.div 
                  className="w-4 h-2 bg-yellow-200 rounded-b mx-auto -mt-0.5"
                  style={{ boxShadow: '0 8px 20px rgba(254, 240, 138, 0.6)' }}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2 + i, repeat: Infinity }}
                />
              </div>
            ))}
            
            {/* Cars (subtle) */}
            <motion.div 
              className="absolute bottom-12 w-6 h-3 bg-red-600 rounded"
              style={{ left: '20%' }}
              animate={{ x: [0, 100, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute bottom-12 w-6 h-3 bg-blue-600 rounded"
              style={{ right: '25%' }}
              animate={{ x: [0, -80, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 3 }}
            />
            
            {/* Status */}
            <div className="absolute bottom-2 inset-x-3 text-center">
              <span className="text-xs font-mono text-blue-300/60 bg-blue-900/30 px-3 py-1 rounded-full">
                99.9% Uptime • Steady Growth • Predictable
              </span>
            </div>
            
            {/* Label */}
            <div className="absolute top-3 left-3 z-20">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/40 backdrop-blur-sm">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-blue-400">SME</span>
              </div>
            </div>
          </div>
          
          {/* SME Traits */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { icon: Shield, text: "Minimize risk", color: "text-blue-400", bg: "bg-blue-400/10" },
              { icon: Building2, text: "Solid foundation", color: "text-slate-400", bg: "bg-slate-400/10" },
              { icon: Clock, text: "Steady growth", color: "text-emerald-400", bg: "bg-emerald-400/10" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl ${item.bg} border border-blue-500/20`}
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-white/80 text-xs font-medium">{item.text}</span>
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
        <div 
          className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
          }}
        >
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <p className="text-white/70 text-sm">
            <span className="text-purple-400 font-bold">IDE: </span>
            Every crash = data → learning → iteration
            <span className="mx-3 text-white/30">|</span>
            <span className="text-blue-400 font-bold">SME: </span>
            Every crash = avoided at all costs
          </p>
          <Sparkles className="w-5 h-5 text-pink-400" />
        </div>
      </motion.div>
    </div>
  );
};

export default VisualMetaphorSlide;
