import { motion } from 'framer-motion';

export const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm">
        <span className="text-gray-400">Step {currentStep} of {totalSteps}</span>
        <span className="gradient-text font-semibold">{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
          style={{ backgroundSize: '200% 200%' }}
          initial={{ width: 0 }}
          animate={{ 
            width: `${progress}%`,
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ 
            width: { duration: 0.5, ease: "easeInOut" },
            backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
          }}
        />
      </div>
    </div>
  );
};
