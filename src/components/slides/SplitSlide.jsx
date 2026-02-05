import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const colorClasses = {
  purple: 'from-wc-purple to-wc-pink border-wc-purple/30',
  blue: 'from-wc-blue to-wc-cyan border-wc-blue/30',
};

const SplitSlide = ({ slide }) => {
  const LeftIcon = slide.left.icon;
  const RightIcon = slide.right.icon;

  return (
    <div className="max-w-5xl mx-auto max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-hide">
      <h2 className="text-4xl font-bold gradient-text text-center mb-8">{slide.title}</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={`glass rounded-2xl p-6 border ${colorClasses[slide.left.color]}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[slide.left.color]} flex items-center justify-center`}>
              <LeftIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-wc-purple">{slide.left.title}</h3>
          </div>
          <ul className="space-y-3">
            {slide.left.items.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-wc-purple mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={`glass rounded-2xl p-6 border ${colorClasses[slide.right.color]}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[slide.right.color]} flex items-center justify-center`}>
              <RightIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-wc-blue">{slide.right.title}</h3>
          </div>
          <ul className="space-y-3">
            {slide.right.items.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-wc-blue mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default SplitSlide;
