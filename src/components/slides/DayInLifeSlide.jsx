import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Coffee, Laptop, Users, FileText, Lightbulb, Moon, Rocket, Clock } from 'lucide-react';

const DayInLifeSlide = ({ slide }) => {
  const [currentHour, setCurrentHour] = useState(8);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentHour(h => h >= 18 ? 8 : h + 1);
    }, 1200);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const ideSchedule = [
    { hour: 8, icon: Coffee, activity: "Quick standup (10 min)", color: "purple" },
    { hour: 9, icon: Laptop, activity: "Deep work: shipping features", color: "cyan" },
    { hour: 10, icon: Laptop, activity: "Still shipping...", color: "cyan" },
    { hour: 11, icon: Lightbulb, activity: "Experiment with new idea", color: "pink" },
    { hour: 12, icon: Coffee, activity: "Lunch + learn", color: "purple" },
    { hour: 13, icon: Laptop, activity: "Deploy to production", color: "green" },
    { hour: 14, icon: Users, activity: "Quick sync (15 min)", color: "purple" },
    { hour: 15, icon: Laptop, activity: "Build & iterate", color: "cyan" },
    { hour: 16, icon: Rocket, activity: "Ship another feature", color: "green" },
    { hour: 17, icon: Lightbulb, activity: "Plan tomorrow's experiments", color: "pink" },
    { hour: 18, icon: Moon, activity: "Head home (or keep hacking)", color: "purple" },
  ];

  const smeSchedule = [
    { hour: 8, icon: FileText, activity: "Morning reports & emails", color: "blue" },
    { hour: 9, icon: Users, activity: "Department meeting (1 hr)", color: "orange" },
    { hour: 10, icon: FileText, activity: "Paperwork & approvals", color: "blue" },
    { hour: 11, icon: Users, activity: "Cross-team sync meeting", color: "orange" },
    { hour: 12, icon: Coffee, activity: "Lunch break", color: "blue" },
    { hour: 13, icon: FileText, activity: "Waiting for sign-off...", color: "gray" },
    { hour: 14, icon: Users, activity: "Status update meeting", color: "orange" },
    { hour: 15, icon: FileText, activity: "Documentation & reports", color: "blue" },
    { hour: 16, icon: Users, activity: "Planning committee", color: "orange" },
    { hour: 17, icon: FileText, activity: "End-of-day reports", color: "blue" },
    { hour: 18, icon: Moon, activity: "Clock out", color: "gray" },
  ];

  const getActivity = (schedule, hour) => {
    return schedule.find(s => s.hour === hour) || schedule[0];
  };

  const ideActivity = getActivity(ideSchedule, currentHour);
  const smeActivity = getActivity(smeSchedule, currentHour);

  const colorMap = {
    purple: "from-wc-purple to-wc-purple/50",
    cyan: "from-wc-cyan to-wc-cyan/50",
    pink: "from-wc-pink to-wc-pink/50",
    green: "from-emerald-500 to-emerald-500/50",
    blue: "from-blue-500 to-blue-500/50",
    orange: "from-orange-500 to-orange-500/50",
    gray: "from-gray-500 to-gray-500/50",
  };

  return (
    <div className="max-w-5xl mx-auto max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-hide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-black gradient-text text-center mb-2"
      >
        {slide.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white/50 text-center mb-6"
      >
        {slide.subtitle}
      </motion.p>

      {/* Time Display */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="flex justify-center mb-8"
      >
        <div className="glass rounded-full px-8 py-4 flex items-center gap-4">
          <Clock className="w-6 h-6 text-wc-purple" />
          <span className="text-3xl font-mono font-bold text-white">
            {currentHour.toString().padStart(2, '0')}:00
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="ml-4 px-3 py-1 rounded-full bg-white/10 text-sm"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>
      </motion.div>

      {/* Side by Side Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* IDE Day */}
        <div className="glass rounded-2xl p-6 relative overflow-hidden">
          <motion.div
            key={ideActivity.hour}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[ideActivity.color]} flex items-center justify-center`}>
                <ideActivity.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-wc-purple">IDE Engineer</h3>
                <p className="text-sm text-white/50">Innovation-first</p>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.p
                key={ideActivity.activity}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-xl font-semibold text-white mb-4"
              >
                {ideActivity.activity}
              </motion.p>
            </AnimatePresence>

            {/* Progress visualization */}
            <div className="flex gap-1 mt-4">
              {ideSchedule.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    ideSchedule[idx].hour <= currentHour
                      ? `bg-gradient-to-r ${colorMap[ideSchedule[idx].color]}`
                      : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* SME Day */}
        <div className="glass rounded-2xl p-6 relative overflow-hidden">
          <motion.div
            key={smeActivity.hour}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[smeActivity.color]} flex items-center justify-center`}>
                <smeActivity.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-blue-400">SME Employee</h3>
                <p className="text-sm text-white/50">Process-focused</p>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.p
                key={smeActivity.activity}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-xl font-semibold text-white mb-4"
              >
                {smeActivity.activity}
              </motion.p>
            </AnimatePresence>

            {/* Progress visualization */}
            <div className="flex gap-1 mt-4">
              {smeSchedule.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    smeSchedule[idx].hour <= currentHour
                      ? `bg-gradient-to-r ${colorMap[smeSchedule[idx].color]}`
                      : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
      >
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-wc-purple">6hrs</p>
          <p className="text-xs text-white/50">IDE: Deep work</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-wc-cyan">3</p>
          <p className="text-xs text-white/50">IDE: Features shipped</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-orange-400">4hrs</p>
          <p className="text-xs text-white/50">SME: In meetings</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">0</p>
          <p className="text-xs text-white/50">SME: Features shipped</p>
        </div>
      </motion.div>
    </div>
  );
};

export default DayInLifeSlide;
