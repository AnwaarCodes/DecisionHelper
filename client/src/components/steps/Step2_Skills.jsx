import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Plus, X, ArrowRight, ArrowLeft } from 'lucide-react';

const SKILL_SUGGESTIONS = [
  'Communication',
  'Problem Solving',
  'Programming',
  'Writing',
  'Design',
  'Data Analysis',
  'Marketing',
  'Sales',
  'Leadership',
  'Project Management',
  'Public Speaking',
  'Research',
  'Teaching',
  'Negotiation',
  'Time Management',
  'Creativity',
  'Critical Thinking',
  'Teamwork',
  'Customer Service',
  'Financial Planning'
];

export const Step2_Skills = ({ data, onUpdate, onNext, onBack }) => {
  const [customSkill, setCustomSkill] = useState('');
  const [errors, setErrors] = useState({});

  const selectedSkills = data.skills || [];

  const validate = () => {
    const newErrors = {};
    
    if (selectedSkills.length === 0) {
      newErrors.skills = 'Please select at least one skill';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  const toggleSkill = (skill) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    onUpdate({ skills: newSkills });
    setErrors({});
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      onUpdate({ skills: [...selectedSkills, customSkill.trim()] });
      setCustomSkill('');
      setErrors({});
    }
  };

  const removeSkill = (skill) => {
    onUpdate({ skills: selectedSkills.filter(s => s !== skill) });
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
          What are your <span className="gradient-text">skills</span>?
        </h2>
        <p className="text-gray-400">
          Select all that apply. These help us match you with suitable paths.
        </p>
      </div>

      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <motion.span
              key={skill}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full text-sm"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          ))}
        </div>
      )}

      {/* Custom Skill Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={customSkill}
          onChange={(e) => setCustomSkill(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
          placeholder="Add a custom skill..."
          className="input-premium flex-1"
        />
        <motion.button
          onClick={addCustomSkill}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-3 glass-card text-gray-300 hover:text-white rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Skill Suggestions */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-4">
          <Wrench className="w-4 h-4 text-purple-400" />
          Popular skills (click to add)
        </label>
        <div className="flex flex-wrap gap-2">
          {SKILL_SUGGESTIONS.filter(s => !selectedSkills.includes(s)).map((skill) => (
            <motion.button
              key={skill}
              onClick={() => toggleSkill(skill)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 glass-card text-sm text-gray-400 hover:text-white hover:border-purple-500/30 rounded-lg transition-all"
            >
              {skill}
            </motion.button>
          ))}
        </div>
      </div>

      {errors.skills && (
        <p className="text-sm text-red-400">{errors.skills}</p>
      )}

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
          onClick={handleNext}
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
