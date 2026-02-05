import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Medal, Award } from 'lucide-react';

const achievementIcons = {
  'First Answer': Star,
  'Quiz Master': Trophy,
  'Perfect Score': Medal,
  'Participant': Award,
};

const ScoreBoard = ({ score, achievements }) => {
  return (
    <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
      {/* Achievements */}
      <div className="flex gap-2">
        <AnimatePresence>
          {achievements.map((achievement) => {
            const Icon = achievementIcons[achievement] || Star;
            return (
              <motion.div
                key={achievement}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"
                title={achievement}
              >
                <Icon className="w-4 h-4 text-white" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Score */}
      <motion.div
        className="glass rounded-full px-4 py-2 flex items-center gap-2"
        animate={{ scale: score > 0 ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Trophy className="w-4 h-4 text-yellow-400" />
        <motion.span
          key={score}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-bold text-lg gradient-text"
        >
          {score}
        </motion.span>
        <span className="text-white/50 text-sm">pts</span>
      </motion.div>
    </div>
  );
};

export default ScoreBoard;
