import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, QrCode, Download } from 'lucide-react';

const ResourcesSlide = ({ slide }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-wc-cyan to-wc-blue mx-auto mb-4 flex items-center justify-center"
        >
          <FileText className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold gradient-text">{slide.title}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* One-Pager */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-wc-purple" />
            One-Pager Takeaway
          </h3>
          <div className="bg-dark-700 rounded-xl p-4 mb-4">
            <div className="aspect-[8.5/11] bg-white rounded-lg flex flex-col items-center justify-center p-4">
              <div className="text-dark-900 font-bold text-lg mb-2">IDE vs SME</div>
              <div className="w-full h-2 bg-gradient-to-r from-wc-purple to-wc-pink rounded mb-4" />
              <div className="grid grid-cols-2 gap-2 w-full text-xs text-dark-900/70">
                <div className="bg-wc-purple/10 p-2 rounded">Innovation First</div>
                <div className="bg-wc-blue/10 p-2 rounded">Stability First</div>
                <div className="bg-wc-cyan/10 p-2 rounded">Fast Decisions</div>
                <div className="bg-orange-500/10 p-2 rounded">Careful Planning</div>
              </div>
              <div className="mt-4 w-16 h-16 bg-dark-900/10 rounded flex items-center justify-center">
                <QrCode className="w-12 h-12 text-dark-900/30" />
              </div>
            </div>
          </div>
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-wc-purple to-wc-pink text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </motion.div>

        {/* Links & QR */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Links */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ExternalLink className="w-6 h-6 text-wc-cyan" />
              Useful Links
            </h3>
            <div className="space-y-3">
              {slide.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-dark-700 hover:bg-dark-600 transition-colors group"
                >
                  <span className="text-white/80 group-hover:text-white">{link.label}</span>
                  <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-wc-cyan" />
                </a>
              ))}
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="glass rounded-2xl p-6 text-center">
            <h3 className="text-lg font-bold text-white mb-4">Scan for Resources</h3>
            <div className="w-32 h-32 bg-white rounded-xl mx-auto flex items-center justify-center">
              <QrCode className="w-24 h-24 text-dark-900" />
            </div>
            <p className="text-sm text-white/50 mt-3">worldclass.dev/ide-framework</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourcesSlide;
