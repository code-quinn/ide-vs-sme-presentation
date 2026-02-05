import React from 'react';
import { motion } from 'framer-motion';

const colorClasses = {
  purple: 'from-wc-purple to-wc-pink',
  cyan: 'from-wc-cyan to-wc-blue',
  pink: 'from-wc-pink to-wc-purple',
  blue: 'from-wc-blue to-wc-cyan',
  green: 'from-emerald-500 to-teal-500',
  orange: 'from-orange-500 to-amber-500',
};

const DefinitionSlide = ({ slide }) => {
  const Icon = slide.icon;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-wc-purple to-wc-pink flex items-center justify-center">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-4xl font-bold gradient-text">{slide.title}</h2>
          <p className="text-xl text-white/50">{slide.subtitle}</p>
        </div>
      </div>

      <div className="grid gap-4 mb-8">
        {slide.points.map((point, idx) => {
          const PointIcon = point.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="glass rounded-xl p-4 flex items-center gap-4 card-hover"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[point.color]} flex items-center justify-center flex-shrink-0`}>
                <PointIcon className="w-6 h-6 text-white" />
              </div>
              <p className="text-xl text-white/90">{point.text}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.blockquote
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-2xl text-white/40 italic text-center"
      >
        {slide.quote}
      </motion.blockquote>
    </div>
  );
};

export default DefinitionSlide;
