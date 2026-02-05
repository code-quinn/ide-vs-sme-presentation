import React from 'react';
import { motion } from 'framer-motion';

const colorClasses = {
  purple: 'from-wc-purple to-wc-pink',
  cyan: 'from-wc-cyan to-wc-blue',
  pink: 'from-wc-pink to-rose-500',
  green: 'from-emerald-500 to-teal-500',
};

const PortfolioSlide = ({ slide }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold gradient-text">{slide.title}</h2>
        <p className="text-xl text-white/50">{slide.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {slide.ventures.map((venture, idx) => {
          const Icon = venture.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.15 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass rounded-2xl p-6 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClasses[venture.color]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white">{venture.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs bg-gradient-to-r ${colorClasses[venture.color]} text-white font-medium`}>
                      {venture.sector}
                    </span>
                  </div>
                  <p className="text-white/60">{venture.desc}</p>
                </div>
              </div>
              
              {/* Animated line */}
              <motion.div
                className={`h-1 mt-4 rounded-full bg-gradient-to-r ${colorClasses[venture.color]}`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
              />
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center"
      >
        <p className="text-lg text-white/40">
          All built with the IDE approach — multiple experiments, fast iteration, AI-first
        </p>
      </motion.div>
    </div>
  );
};

export default PortfolioSlide;
