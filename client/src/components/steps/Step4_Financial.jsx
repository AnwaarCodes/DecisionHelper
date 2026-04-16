import { motion } from 'framer-motion';
import { Wallet, PiggyBank, TrendingUp, AlertCircle, Check, ArrowRight, ArrowLeft } from 'lucide-react';

const FINANCIAL_OPTIONS = [
  {
    id: 'limited',
    label: 'Limited Resources',
    description: 'I need low-cost or free options',
    icon: AlertCircle,
    gradient: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-orange-400',
    borderColor: 'border-orange-500/30'
  },
  {
    id: 'moderate',
    label: 'Moderate Budget',
    description: 'I can invest some money upfront',
    icon: Wallet,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-500/30'
  },
  {
    id: 'comfortable',
    label: 'Comfortable',
    description: 'I have savings to invest',
    icon: PiggyBank,
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
    borderColor: 'border-green-500/30'
  },
  {
    id: 'well_funded',
    label: 'Well Funded',
    description: 'I can make significant investments',
    icon: TrendingUp,
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
    borderColor: 'border-purple-500/30'
  }
];

export const Step4_Financial = ({ data, onUpdate, onNext, onBack }) => {
  const selectedOption = FINANCIAL_OPTIONS.find(opt => opt.label === data.financial);

  const handleSelect = (option) => {
    onUpdate({ financial: option.label });
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
          What's your <span className="gradient-text">financial</span> situation?
        </h2>
        <p className="text-gray-400">
          This helps us recommend options that match your budget constraints.
        </p>
      </div>

      <div className="grid gap-4">
        {FINANCIAL_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedOption?.id === option.id;
          
          return (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option)}
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
              className={`relative flex items-start gap-4 p-5 rounded-2xl text-left transition-all ${
                isSelected
                  ? `bg-gradient-to-r ${option.gradient} border ${option.borderColor}`
                  : 'glass-card hover:border-white/20'
              }`}
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${option.gradient} border ${option.borderColor}`}>
                <Icon className={`w-6 h-6 ${option.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                  {option.label}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {option.description}
                </p>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
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
          disabled={!data.financial}
          className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
        >
          Next Step
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};
