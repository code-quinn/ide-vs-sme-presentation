import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ExternalLink, Zap, Bot, ArrowRight } from 'lucide-react';

const LiveChatSlide = ({ slide }) => {
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <div className="max-w-5xl mx-auto max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-hide">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative inline-block"
        >
          {/* Pulsing ring */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 w-24 h-24 rounded-2xl bg-red-500"
          />
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 mx-auto mb-4 flex items-center justify-center shadow-2xl">
            <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
          </div>
        </motion.div>
        <h2 className="text-5xl font-black gradient-text mb-2">{slide.title}</h2>
        <p className="text-2xl text-white/50">{slide.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Instructions panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-wc-purple" />
            What's Happening
          </h3>
          <p className="text-white/70 mb-6">{slide.description}</p>
          
          <ul className="space-y-3">
            {slide.instructions.map((instruction, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex items-center gap-3 text-white/80"
              >
                <ArrowRight className="w-5 h-5 text-wc-cyan flex-shrink-0" />
                {instruction}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Action panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-2xl p-6 flex flex-col"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Bot className="w-6 h-6 text-wc-cyan" />
            Connect with Quinn
          </h3>
          
          <div className="flex-1 flex flex-col items-center justify-center py-8">
            <motion.a
              href={slide.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-xl shadow-lg hover:shadow-blue-500/30 transition-shadow"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              Open Telegram Web
              <ExternalLink className="w-5 h-5" />
            </motion.a>
            
            <p className="text-white/40 text-sm mt-4 text-center">
              Opens in a new tab — display on the big screen!
            </p>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-wc-purple/10 border border-wc-purple/20">
            <div className="flex items-center gap-2 text-wc-purple text-sm">
              <Zap className="w-4 h-4" />
              <span className="font-medium">{slide.note}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick demo ideas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <p className="text-white/40 mb-3">Try asking Quinn:</p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            '"Explain IDE vs SME in one sentence"',
            '"Write a quick Python script"',
            '"What tools should I learn?"',
            '"How did you build this presentation?"',
          ].map((suggestion, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-full bg-white/5 text-white/60 text-sm border border-white/10"
            >
              {suggestion}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LiveChatSlide;
