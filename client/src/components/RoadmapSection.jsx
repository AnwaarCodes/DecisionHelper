import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, Rocket, Wrench, Send, TrendingUp } from 'lucide-react';

const WEEK_ICONS = [Rocket, Wrench, Send, TrendingUp];
const WEEK_COLORS = [
  { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-400' },
  { bg: 'bg-purple-500/20', border: 'border-purple-500/30', text: 'text-purple-400' },
  { bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  { bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400' }
];

export const RoadmapSection = ({ roadmap }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const weeks = [
    { key: 'week1', label: 'Week 1', title: 'Foundation' },
    { key: 'week2', label: 'Week 2', title: 'Build' },
    { key: 'week3', label: 'Week 3', title: 'Launch' },
    { key: 'week4', label: 'Week 4', title: 'Scale' }
  ];

  return (
    <div className="border-t border-white/5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10 group-hover:border-blue-500/30 transition-colors duration-300">
            <Calendar className="w-5 h-5 text-blue-400" />
          </div>
          <span className="font-semibold text-white">4-Week Roadmap</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-300"
        >
          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 space-y-4">
              {weeks.map((week, index) => {
                const WeekIcon = WEEK_ICONS[index];
                const colors = WEEK_COLORS[index];
                
                return (
                  <motion.div
                    key={week.key}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}
                      >
                        <WeekIcon className={`w-5 h-5 ${colors.text}`} />
                      </motion.div>
                      {index < 3 && (
                        <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-white/20 to-transparent" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-sm font-bold ${colors.text}`}>
                          {week.label}
                        </span>
                        <span className="text-sm text-gray-500 font-medium">
                          {week.title}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {roadmap[week.key]}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
