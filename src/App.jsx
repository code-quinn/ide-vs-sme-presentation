import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Rocket, Building2, Zap, Users, 
  Brain, Target, TrendingUp, Shield, Award, CheckCircle, XCircle,
  Lightbulb, Code, Sparkles, Star, Trophy, Medal
} from 'lucide-react';

// Slides data
import { slides } from './data/slides';
import SlideRenderer from './components/SlideRenderer';
import ProgressBar from './components/ProgressBar';
import ScoreBoard from './components/ScoreBoard';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [score, setScore] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [direction, setDirection] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalSlides = slides.length;

  const addPoints = useCallback((points, achievement = null) => {
    setScore(prev => prev + points);
    if (achievement && !achievements.includes(achievement)) {
      setAchievements(prev => [...prev, achievement]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [achievements]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="w-screen h-screen animated-bg overflow-hidden relative">
      <ParticleBackground />
      
      {/* Progress Bar */}
      <ProgressBar current={currentSlide} total={totalSlides} />
      
      {/* Score Board */}
      <ScoreBoard score={score} achievements={achievements} />
      
      {/* Main Slide Area */}
      <div className="w-full h-full flex items-center justify-center px-8 py-16">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full max-w-6xl"
          >
            <SlideRenderer 
              slide={slides[currentSlide]} 
              addPoints={addPoints}
              currentSlide={currentSlide}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`p-3 rounded-full glass ${currentSlide === 0 ? 'opacity-30' : 'hover:bg-wc-purple/20'}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <motion.div
              key={idx}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                idx === currentSlide 
                  ? 'bg-wc-purple w-8' 
                  : idx < currentSlide 
                    ? 'bg-wc-purple/50' 
                    : 'bg-white/20'
              }`}
              onClick={() => {
                setDirection(idx > currentSlide ? 1 : -1);
                setCurrentSlide(idx);
              }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className={`p-3 rounded-full glass ${currentSlide === totalSlides - 1 ? 'opacity-30' : 'hover:bg-wc-purple/20'}`}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 font-mono text-sm text-white/50">
        {currentSlide + 1} / {totalSlides}
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: ['#8B5CF6', '#EC4899', '#06B6D4', '#10B981', '#F59E0B'][i % 5],
                left: `${Math.random() * 100}%`,
              }}
              initial={{ y: -20, opacity: 1 }}
              animate={{ 
                y: window.innerHeight + 20, 
                opacity: 0,
                rotate: Math.random() * 720,
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Keyboard Hints */}
      <div className="absolute bottom-8 left-8 text-xs text-white/30 font-mono">
        ← → or SPACE to navigate
      </div>
    </div>
  );
}

export default App;
