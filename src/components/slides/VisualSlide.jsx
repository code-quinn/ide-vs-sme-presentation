import React from 'react';
import { motion } from 'framer-motion';

const VisualSlide = ({ slide }) => {
  return (
    <div className="max-w-5xl mx-auto max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-hide">
      <h2 className="text-4xl font-bold gradient-text text-center mb-4">{slide.title}</h2>
      <p className="text-xl text-white/50 text-center mb-8">{slide.description}</p>

      {/* Decision Speed Visual */}
      {slide.visual === 'decision-speed' && (
        <div className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* IDE Speed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <h3 className="text-xl font-bold text-wc-purple mb-4">IDE Decision Pipeline</h3>
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-16 h-16 rounded-full bg-wc-purple/20 flex items-center justify-center"
                >
                  <span className="text-2xl">💡</span>
                </motion.div>
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="text-wc-purple text-2xl"
                >
                  →
                </motion.div>
                <div className="w-16 h-16 rounded-full bg-wc-purple/20 flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5, delay: 0.25 }}
                  className="text-wc-purple text-2xl"
                >
                  →
                </motion.div>
                <div className="w-16 h-16 rounded-full bg-wc-purple/20 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-wc-purple mt-4">Hours</p>
            </motion.div>

            {/* SME Speed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <h3 className="text-xl font-bold text-wc-blue mb-4">SME Decision Pipeline</h3>
              <div className="flex items-center justify-center gap-1 flex-wrap">
                {['💡', '📋', '👤', '📋', '👥', '📋', '👔', '✅'].map((emoji, i) => (
                  <React.Fragment key={i}>
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                      className="w-10 h-10 rounded-full bg-wc-blue/20 flex items-center justify-center text-sm"
                    >
                      {emoji}
                    </motion.div>
                    {i < 7 && <span className="text-wc-blue/50">→</span>}
                  </React.Fragment>
                ))}
              </div>
              <p className="text-3xl font-bold text-wc-blue mt-4">Weeks</p>
            </motion.div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {slide.stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="glass rounded-xl p-4 text-center card-hover"
            >
              <Icon className="w-8 h-8 mx-auto mb-2 text-wc-purple" />
              <p className="text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-white/50">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default VisualSlide;
