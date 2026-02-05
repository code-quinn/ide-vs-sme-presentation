import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Lightbulb, CheckCircle } from 'lucide-react';

const ExerciseSlide = ({ slide }) => {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 mx-auto mb-4 flex items-center justify-center"
        >
          <Lightbulb className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold gradient-text">{slide.title}</h2>
        <p className="text-xl text-white/50">{slide.task}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-wc-purple" />
            Instructions
          </h3>
          <ul className="space-y-3">
            {slide.instructions.map((instruction, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-wc-cyan mt-0.5 flex-shrink-0" />
                <span className={`text-white/80 ${instruction.startsWith('  →') ? 'ml-4 text-white/60' : ''}`}>
                  {instruction.replace('  →', '→')}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-2xl p-6 flex flex-col items-center justify-center"
        >
          <Clock className="w-12 h-12 text-wc-purple mb-4" />
          <div className={`text-6xl font-mono font-bold mb-4 ${timeLeft < 60 ? 'text-red-500' : 'gradient-text'}`}>
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${
              isRunning
                ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                : 'bg-gradient-to-r from-wc-purple to-wc-pink text-white'
            }`}
          >
            {isRunning ? 'Pause' : timeLeft < 300 ? 'Resume' : 'Start Timer'}
          </button>
          <button
            onClick={() => { setTimeLeft(5 * 60); setIsRunning(false); }}
            className="mt-2 text-white/50 hover:text-white/70 transition-colors"
          >
            Reset
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-center"
      >
        <span className="text-yellow-400 font-bold">🏆 Bonus:</span>
        <span className="text-white/70 ml-2">{slide.bonus}</span>
      </motion.div>
    </div>
  );
};

export default ExerciseSlide;
