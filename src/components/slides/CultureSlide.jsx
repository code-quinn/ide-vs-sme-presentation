import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, CheckCircle, Circle, Zap } from 'lucide-react';

const statusColors = {
  core: 'bg-wc-purple text-white',
  active: 'bg-wc-cyan/20 text-wc-cyan border border-wc-cyan/30',
  optional: 'bg-white/5 text-white/50 border border-white/10',
};

const CultureSlide = ({ slide }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-wc-purple to-wc-pink mx-auto mb-4 flex items-center justify-center"
        >
          <Beaker className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold gradient-text">{slide.title}</h2>
        <p className="text-xl text-white/50">{slide.subtitle}</p>
      </div>

      <div className="space-y-4">
        {slide.experiments.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className="glass rounded-xl p-4 flex items-center justify-between card-hover"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-wc-purple/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-wc-purple" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{exp.name}</h3>
                <p className="text-white/50">{exp.desc}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[exp.status]}`}>
              {exp.status === 'core' ? '🔥 Core' : exp.status === 'active' ? '✨ Active' : '💭 Optional'}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-4 rounded-xl bg-gradient-to-r from-wc-purple/10 to-wc-pink/10 border border-wc-purple/20 text-center"
      >
        <p className="text-lg text-white/70">
          <span className="text-wc-purple font-bold">Key insight:</span> The culture of experimentation is what separates IDEs from SMEs more than any single practice.
        </p>
      </motion.div>
    </div>
  );
};

export default CultureSlide;
