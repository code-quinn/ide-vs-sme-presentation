import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const TakeawaysSlide = ({ slide }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-wc-purple via-wc-pink to-wc-cyan mx-auto mb-4 flex items-center justify-center"
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold gradient-text">{slide.title}</h2>
      </div>

      <div className="space-y-4 mb-12">
        {slide.points.map((point, idx) => {
          const Icon = point.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.15 }}
              className="glass rounded-xl p-5 flex items-center gap-4 card-hover"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.15, type: "spring" }}
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-wc-purple to-wc-pink flex items-center justify-center flex-shrink-0"
              >
                <Icon className="w-7 h-7 text-white" />
              </motion.div>
              <p className="text-xl text-white/90">{point.text}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <div className="inline-block glass rounded-2xl p-6 glow-purple">
          <p className="text-2xl font-bold gradient-text">{slide.cta}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default TakeawaysSlide;
