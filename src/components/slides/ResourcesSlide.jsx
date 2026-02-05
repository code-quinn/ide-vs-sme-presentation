import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const ResourcesSlide = ({ slide }) => {
  const presentationUrl = 'https://code-quinn.github.io/ide-vs-sme-presentation';
  const onePagerUrl = `${presentationUrl}/one-pager.html`;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-wc-cyan to-wc-purple mx-auto mb-4 flex items-center justify-center"
        >
          <FileText className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold gradient-text">{slide.title}</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* One-Pager Download */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 text-center"
        >
          <h3 className="text-lg font-bold text-white mb-4">📄 One-Pager</h3>
          <div className="bg-white rounded-xl p-3 mb-4 inline-block">
            <QRCodeSVG 
              value={onePagerUrl}
              size={120}
              level="M"
              includeMargin={false}
              fgColor="#1a1a2e"
            />
          </div>
          <p className="text-sm text-white/50 mb-4">Scan or click below</p>
          <a
            href="/one-pager.html"
            target="_blank"
            className="block w-full py-3 rounded-xl bg-gradient-to-r from-wc-purple to-wc-pink text-white font-bold hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4 inline mr-2" />
            View & Print
          </a>
        </motion.div>

        {/* WorldClass / Chukwuemeka */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 text-center"
        >
          <h3 className="text-lg font-bold text-white mb-4">👨‍💻 WorldClass</h3>
          <div className="bg-white rounded-xl p-3 mb-4 inline-block">
            <QRCodeSVG 
              value="https://chuksabanum.com"
              size={120}
              level="M"
              includeMargin={false}
              fgColor="#1a1a2e"
            />
          </div>
          <p className="text-sm text-white/50 mb-4">chuksabanum.com</p>
          <a
            href="https://chuksabanum.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 rounded-xl bg-gradient-to-r from-wc-cyan to-blue-500 text-white font-bold hover:opacity-90 transition-opacity"
          >
            <ExternalLink className="w-4 h-4 inline mr-2" />
            Visit Site
          </a>
        </motion.div>

        {/* Vent.Africa */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 text-center"
        >
          <h3 className="text-lg font-bold text-white mb-4">🌍 Vent.Africa</h3>
          <div className="bg-white rounded-xl p-3 mb-4 inline-block">
            <QRCodeSVG 
              value="https://vent.africa"
              size={120}
              level="M"
              includeMargin={false}
              fgColor="#1a1a2e"
            />
          </div>
          <p className="text-sm text-white/50 mb-4">Crypto-to-Cash Platform</p>
          <a
            href="https://vent.africa"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold hover:opacity-90 transition-opacity"
          >
            <ExternalLink className="w-4 h-4 inline mr-2" />
            Explore
          </a>
        </motion.div>
      </div>

      {/* All Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 text-center">🔗 Quick Links</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { label: 'WorldClass', url: 'https://chuksabanum.com', color: 'from-wc-purple to-wc-pink' },
            { label: 'Vent.Africa', url: 'https://vent.africa', color: 'from-emerald-500 to-teal-500' },
            { label: 'This Presentation', url: presentationUrl, color: 'from-wc-cyan to-blue-500' },
            { label: 'Take-Home Kit', url: `${presentationUrl}/take-home-kit.html`, color: 'from-orange-500 to-red-500' },
          ].map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-full bg-gradient-to-r ${link.color} text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2`}
            >
              {link.label}
              <ExternalLink className="w-4 h-4" />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ResourcesSlide;
