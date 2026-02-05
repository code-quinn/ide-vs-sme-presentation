import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

const QuizSlide = ({ slide, addPoints, slideIndex }) => {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelect = (idx) => {
    if (revealed) return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null || revealed) return;
    setRevealed(true);
    
    if (!hasAnswered) {
      const isCorrect = slide.options[selected].isCorrect;
      if (isCorrect) {
        addPoints(slide.points, selected === 0 ? 'First Answer' : null);
      }
      setHasAnswered(true);
    }
  };

  const getOptionClass = (idx) => {
    if (!revealed) {
      return selected === idx ? 'selected' : '';
    }
    if (slide.options[idx].isCorrect) {
      return 'correct';
    }
    if (selected === idx && !slide.options[idx].isCorrect) {
      return 'incorrect';
    }
    return '';
  };

  return (
    <div className="max-w-3xl mx-auto max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-hide">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-wc-purple to-wc-pink mx-auto mb-4 flex items-center justify-center"
        >
          <HelpCircle className="w-8 h-8 text-white" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-white mb-2"
        >
          {slide.question}
        </motion.h2>
        <p className="text-wc-purple font-mono">+{slide.points} points</p>
      </div>

      <div className="space-y-4 mb-8">
        {slide.options.map((option, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            onClick={() => handleSelect(idx)}
            className={`quiz-option glass rounded-xl p-5 flex items-center gap-4 border-2 border-transparent ${getOptionClass(idx)}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              selected === idx ? 'bg-wc-purple text-white' : 'bg-white/10 text-white/70'
            }`}>
              {String.fromCharCode(65 + idx)}
            </div>
            <span className="text-lg text-white/90 flex-1">{option.text}</span>
            {revealed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {option.isCorrect ? (
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                ) : selected === idx ? (
                  <XCircle className="w-8 h-8 text-red-500" />
                ) : null}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {!revealed ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleSubmit}
          disabled={selected === null}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            selected !== null
              ? 'bg-gradient-to-r from-wc-purple to-wc-pink text-white hover:opacity-90'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
        >
          Submit Answer
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-xl ${
              slide.options[selected]?.isCorrect
                ? 'bg-emerald-500/20 border border-emerald-500/30'
                : 'bg-red-500/20 border border-red-500/30'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              {slide.options[selected]?.isCorrect ? (
                <>
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                  <span className="font-bold text-emerald-500">Correct! +{slide.points} points</span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-500" />
                  <span className="font-bold text-red-500">Not quite!</span>
                </>
              )}
            </div>
            <p className="text-white/70">{slide.explanation}</p>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default QuizSlide;
