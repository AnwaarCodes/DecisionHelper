import { useState } from "react";
import { motion } from "framer-motion";
import { User, GraduationCap, ArrowRight } from "lucide-react";

const EDUCATION_OPTIONS = [
  "High School",
  "Some College",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD / Doctorate",
  "Trade School",
  "Self-Taught",
  "Other",
];

export const Step1_BasicInfo = ({ data, onUpdate, onNext }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!data.age || data.age < 13 || data.age > 100) {
      newErrors.age = "Please enter a valid age between 13 and 100";
    }

    if (!data.education) {
      newErrors.education = "Please select your education level";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-8"
    >
      {/* Header */}
      <div className="max-w-lg m-1.5">
        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
          Let's start with the <span className="gradient-text">basics</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          This helps us tailor recommendations to your life stage.
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-6 m-1.5">
        {/* Age */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <User className="w-4 h-4 text-purple-400" />
            How old are you?
          </label>

          <input
            type="number"
            value={data.age || ""}
            onChange={(e) => onUpdate({ age: parseInt(e.target.value) || "" })}
            placeholder="Enter your age"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400/40 focus:ring-1 focus:ring-purple-400/30 transition"
            min="13"
            max="100"
          />

          {errors.age && <p className="text-sm text-red-400">{errors.age}</p>}
        </div>

        {/* Education */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <GraduationCap className="w-4 h-4 text-purple-400" />
            What's your highest education level?
          </label>

          <select
            value={data.education || ""}
            onChange={(e) => onUpdate({ education: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400/40 focus:ring-1 focus:ring-purple-400/30 transition cursor-pointer"
          >
            <option value="" className="bg-gray-900">
              Select education level
            </option>
            {EDUCATION_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-gray-900">
                {option}
              </option>
            ))}
          </select>

          {errors.education && (
            <p className="text-sm text-red-400">{errors.education}</p>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="pt-2 m-1.5">
        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-sm sm:text-base transition-all"
        >
          Next Step
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};
