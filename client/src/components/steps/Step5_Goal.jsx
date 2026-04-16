import { motion } from 'framer-motion';
import { Target, Briefcase, GraduationCap, Rocket, Users, DollarSign, Heart, Check, ArrowRight, ArrowLeft } from 'lucide-react';

const GOAL_OPTIONS = [
  {
    id: 'career_change',
    label: 'Career Change',
    description: 'I want to switch to a different field or role',
    icon: Briefcase
  },
  {
    id: 'skill_development',
    label: 'Learn New Skills',
    description: 'I want to acquire new abilities for personal growth',
    icon: GraduationCap
  },
  {
    id: 'start_business',
    label: 'Start a Business',
    description: 'I want to build my own company or side project',
    icon: Rocket
  },
  {
    id: 'advance_career',
    label: 'Advance in Current Career',
    description: 'I want to get promoted or increase my expertise',
    icon: Target
  },
  {
    id: 'better_work_life',
    label: 'Better Work-Life Balance',
    description: 'I want more flexibility and less stress',
    icon: Heart
  },
  {
    id: 'increase_income',
    label: 'Increase Income',
    description: 'I want to earn more money',
    icon: DollarSign
  },
  {
    id: 'find_purpose',
    label: 'Find Purpose',
    description: 'I want meaningful work that aligns with my values',
    icon: Users
  }
];

export const Step5_Goal = ({ data, onUpdate, onNext, onBack }) => {
  const selectedGoal = GOAL_OPTIONS.find(opt => opt.label === data.goal);

  const handleSelect = (option) => {
    onUpdate({ goal: option.label });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          What's your main <span className="gradient-text">goal</span>?
        </h2>
        <p className="text-gray-400">
          Choose the outcome you're working toward. This is the most important factor.
        </p>
      </div>

      <div className="grid gap-3">
        {GOAL_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedGoal?.id === option.id;
          
          return (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option)}
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
              className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-purple-500/50'
                  : 'glass-card hover:border-purple-500/30'
              }`}
            >
              <div className={`p-3 rounded-xl transition-colors ${
                isSelected 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                  : 'bg-white/5 border border-white/10'
              }`}>
                <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold truncate ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                  {option.label}
                </h3>
                <p className="text-sm text-gray-400 truncate">
                  {option.description}
                </p>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.02, x: -3 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3 text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </motion.button>
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          disabled={!data.goal}
          className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
        >
          Next Step
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};
