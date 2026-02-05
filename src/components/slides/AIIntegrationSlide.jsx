import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Cpu, Sparkles, Zap } from 'lucide-react';

const AIIntegrationSlide = ({ slide }) => {
  const Icon = slide.icon;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-wc-cyan to-wc-blue mx-auto mb-4 flex items-center justify-center"
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold gradient-text">{slide.title}</h2>
        <p className="text-xl text-white/50">{slide.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {slide.tools.map((tool, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className="glass rounded-xl p-5 card-hover group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-wc-cyan to-wc-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">{tool.name}</h3>
                  <p className="text-sm text-white/50">{tool.role}</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded-full text-xs bg-wc-cyan/20 text-wc-cyan font-mono">
                {tool.usage}
              </span>
            </div>
            <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: tool.usage === '24/7' ? '100%' : tool.usage === 'Daily' ? '80%' : '50%' }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-wc-cyan to-wc-blue"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <div className="inline-block glass rounded-2xl p-6">
          <Sparkles className="w-8 h-8 text-wc-pink mx-auto mb-3" />
          <p className="text-2xl italic text-white/70">{slide.quote}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AIIntegrationSlide;
