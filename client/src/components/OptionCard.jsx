import { motion } from 'framer-motion';
import { 
  Clock, 
  TrendingUp, 
  Zap, 
  Target, 
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  Flame
} from 'lucide-react';
import { RoadmapSection } from './RoadmapSection';

const DIFFICULTY_CONFIG = {
  'Easy': { 
    color: 'text-emerald-400', 
    bgColor: 'bg-emerald-500/10 border-emerald-500/20', 
    glowColor: 'shadow-emerald-500/20',
    icon: Zap 
  },
  'Medium': { 
    color: 'text-amber-400', 
    bgColor: 'bg-amber-500/10 border-amber-500/20', 
    glowColor: 'shadow-amber-500/20',
    icon: Target 
  },
  'Hard': { 
    color: 'text-rose-400', 
    bgColor: 'bg-rose-500/10 border-rose-500/20', 
    glowColor: 'shadow-rose-500/20',
    icon: Flame 
  }
};

const CARD_GRADIENTS = [
  'from-blue-500/20 via-transparent to-purple-500/10',
  'from-purple-500/20 via-transparent to-cyan-500/10',
  'from-cyan-500/20 via-transparent to-blue-500/10'
];

export const OptionCard = ({ option, index }) => {
  const difficulty = DIFFICULTY_CONFIG[option.difficulty] || DIFFICULTY_CONFIG['Medium'];
  const DifficultyIcon = difficulty.icon;
  const cardGradient = CARD_GRADIENTS[index % 3];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${cardGradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
      {/* Card */}
      <div className="relative glass-card card-uniform rounded-2xl overflow-hidden">
        {/* Header Gradient */}
        <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${cardGradient} opacity-40`} />
        {/* Header */}
        <div className="relative p-6 sm:p-7 border-b border-white/5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-blue-400">
                  Option {index + 1}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${difficulty.bgColor} ${difficulty.color}`}>
                  <DifficultyIcon className="w-3.5 h-3.5" />
                  {option.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 group-hover:bg-clip-text transition-all duration-300">
                {option.title}
              </h3>
            </div>
          </div>
        </div>
        {/* Why This Fits */}
        <div className="p-6 sm:p-7 border-b border-white/5 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-blue-500/20 rounded-xl flex-shrink-0 border border-blue-500/20">
              <Lightbulb className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">
                Why This Fits You
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {option.why_this_fits}
              </p>
            </div>
          </div>
        </div>
        {/* Key Details */}
        <div className="grid grid-cols-2 divide-x divide-white/5 border-b border-white/5">
          <div className="p-4 sm:p-5 flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-xl border border-white/10">
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Time to Start</p>
              <p className="font-semibold text-white text-sm">{option.time_to_start}</p>
            </div>
          </div>
          <div className="p-4 sm:p-5 flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-xl border border-white/10">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Income Range</p>
              <p className="font-semibold text-white text-sm">{option.expected_income_range}</p>
            </div>
          </div>
        </div>

        {/* First Action */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-emerald-500/20 rounded-xl flex-shrink-0 border border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">
                First Action Today
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {option.first_action_today}
              </p>
            </div>
          </div>
        </div>

        {/* Tools & Resources */}
        <div className="p-6 border-b border-white/5">
          <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-purple-400" />
            Tools & Resources
          </h4>
          <div className="flex flex-wrap gap-2">
            {option.tools_resources.map((tool, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all duration-200 cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <RoadmapSection roadmap={option.roadmap} />
      </div>
    </motion.div>
  );
};
