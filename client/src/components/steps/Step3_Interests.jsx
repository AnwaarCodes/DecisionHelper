import { motion } from 'framer-motion';
import { Heart, ArrowRight, ArrowLeft } from 'lucide-react';

const INTEREST_OPTIONS = [
  'Technology',
  'Business',
  'Arts & Design',
  'Science',
  'Healthcare',
  'Education',
  'Finance',
  'Entertainment',
  'Sports',
  'Travel',
  'Food & Cooking',
  'Environment',
  'Social Impact',
  'Politics',
  'History',
  'Psychology',
  'Music',
  'Photography',
  'Gaming',
  'Fashion'
];

export const Step3_Interests = ({ data, onUpdate, onNext, onBack }) => {
  const selectedInterests = data.interests ? data.interests.split(', ').filter(Boolean) : [];

  const toggleInterest = (interest) => {
    const newInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
    onUpdate({ interests: newInterests.join(', ') });
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
          What are you <span className="gradient-text">interested</span> in?
        </h2>
        <p className="text-gray-400">
          Select areas that genuinely excite you. Passion leads to better outcomes.
        </p>
      </div>

      {/* Selected Count */}
      <div className="text-sm text-gray-400">
        Selected: <span className="text-purple-400 font-medium">{selectedInterests.length}</span> {selectedInterests.length === 1 ? 'interest' : 'interests'}
      </div>

      {/* Interest Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {INTEREST_OPTIONS.map((interest) => {
          const isSelected = selectedInterests.includes(interest);
          return (
            <motion.button
              key={interest}
              onClick={() => toggleInterest(interest)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`p-4 rounded-xl text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 border border-purple-500/50 text-white shadow-lg shadow-purple-500/20'
                  : 'glass-card text-gray-400 hover:text-white hover:border-purple-500/30'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {isSelected && <Heart className="w-4 h-4 fill-current" />}
                <span>{interest}</span>
              </div>
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
          className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/25"
        >
          Next Step
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};
