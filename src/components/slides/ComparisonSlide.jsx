import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Building2 } from 'lucide-react';

const ComparisonSlide = ({ slide }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold gradient-text text-center mb-8">{slide.title}</h2>

      <div className="glass rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 bg-dark-700">
          <div className="p-4 text-center text-white/50 font-medium">Aspect</div>
          <div className="p-4 text-center bg-wc-purple/20 flex items-center justify-center gap-2">
            <Rocket className="w-5 h-5 text-wc-purple" />
            <span className="font-bold text-wc-purple">IDE</span>
          </div>
          <div className="p-4 text-center bg-wc-blue/20 flex items-center justify-center gap-2">
            <Building2 className="w-5 h-5 text-wc-blue" />
            <span className="font-bold text-wc-blue">SME</span>
          </div>
        </div>

        {/* Rows */}
        {slide.items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.1 }}
            className={`grid grid-cols-3 ${idx % 2 === 0 ? 'bg-dark-800/50' : ''}`}
          >
            <div className="p-4 text-white/70 font-medium border-r border-white/5">
              {item.label}
            </div>
            <div className="p-4 text-center text-wc-purple/90 border-r border-white/5">
              {item.ide}
            </div>
            <div className="p-4 text-center text-wc-blue/90">
              {item.sme}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonSlide;
