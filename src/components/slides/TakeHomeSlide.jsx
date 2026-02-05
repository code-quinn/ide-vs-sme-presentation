import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Download, CheckCircle, ArrowRight } from 'lucide-react';

const TakeHomeSlide = ({ slide }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 mx-auto mb-4 flex items-center justify-center shadow-2xl"
        >
          <Gift className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="text-5xl font-black gradient-text mb-2">{slide.title}</h2>
        <p className="text-xl text-white/50">{slide.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {slide.items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass rounded-xl p-5 cursor-pointer group border border-transparent hover:border-emerald-500/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                  {item.title}
                  <ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Download CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <a
          href={slide.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xl shadow-lg hover:shadow-emerald-500/30 transition-all hover:scale-105"
        >
          <Download className="w-6 h-6" />
          Download Your Take-Home Kit
        </a>
        <p className="text-white/40 text-sm mt-3">
          PDF + Templates + Checklists — Everything you need to start
        </p>
      </motion.div>

      {/* Quick wins section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
      >
        <h3 className="text-lg font-bold text-emerald-400 mb-4 text-center">
          🚀 Quick Wins You Can Do TODAY
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            'Sign up for Claude.ai (free tier)',
            'Install GitHub Copilot',
            'Start a side project with AI',
          ].map((win, idx) => (
            <div key={idx} className="flex items-center gap-2 text-white/70">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>{win}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TakeHomeSlide;
