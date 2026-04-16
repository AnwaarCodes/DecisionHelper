import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, ArrowLeft, Loader2 } from 'lucide-react';

export const Step6_Context = ({ data, onUpdate, onSubmit, onBack, isLoading }) => {
  const charCount = data.context?.length || 0;
  const maxChars = 1000;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Anything else we should <span className="gradient-text">know</span>?
        </h2>
        <p className="text-gray-400">
          Optional: Add any additional context that might help us give better recommendations.
        </p>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
          <MessageSquare className="w-4 h-4 text-purple-400" />
          Additional Context (Optional)
        </label>
        <textarea
          value={data.context || ''}
          onChange={(e) => onUpdate({ context: e.target.value })}
          placeholder="E.g., I'm currently working as a teacher but feeling burned out. I have 3 months of savings and want to transition into tech. I'm willing to work weekends to learn new skills..."
          rows={6}
          maxLength={maxChars}
          className="input-premium resize-none w-full flex-1 bg-gradient-to-br from-white/5 to-white/10 border border-white/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-lg p-4 text-sm text-gray-200 placeholder-gray-500 transition-colors focus:outline-none focus:bg-gradient-to-br focus:from-white/10 focus:to-white/20"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span className="text-gray-400">Examples: current job frustrations, time constraints, family situation</span>
          <span className={charCount > maxChars * 0.9 ? 'text-orange-400' : 'text-gray-500'}>
            {charCount}/{maxChars}
          </span>
        </div>
      </div>

      {/* Summary Preview */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
          <Sparkles className="w-4 h-4 text-purple-400" />
          Your Profile Summary
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Age:</span>
            <span className="ml-2 text-gray-200">{data.age}</span>
          </div>
          <div>
            <span className="text-gray-500">Education:</span>
            <span className="ml-2 text-gray-200">{data.education}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Skills:</span>
            <span className="ml-2 text-gray-200">{data.skills?.join(', ')}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Goal:</span>
            <span className="ml-2 text-purple-400 font-medium">{data.goal}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.02, x: -3 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-6 py-3 text-gray-400 hover:text-white transition-colors group disabled:opacity-50"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </motion.button>
        <motion.button
          onClick={onSubmit}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-70 disabled:cursor-not-allowed animate-gradient"
          style={{ backgroundSize: '200% 200%' }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Get My Recommendations
              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};
