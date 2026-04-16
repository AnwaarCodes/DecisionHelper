import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';

export const ErrorState = ({ message, onRetry, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[400px] flex flex-col items-center justify-center p-8 card-uniform"
    >
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-8 border border-red-500/20"
        >
          <AlertCircle className="w-12 h-12 text-red-400" />
        </motion.div>
        <h3 className="text-2xl font-semibold text-white mb-3">
          Something went wrong
        </h3>
        <p className="text-gray-400 mb-8">
          {message || "We couldn't process your request. Please try again."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onRetry && (
            <motion.button
              onClick={onRetry}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-accent"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </motion.button>
          )}
          {onBack && (
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
