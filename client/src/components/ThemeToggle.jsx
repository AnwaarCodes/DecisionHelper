import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeToggle = ({ theme, toggleTheme }) => (
  <motion.button
    onClick={toggleTheme}
    className="flex items-center justify-center w-10 h-10 rounded-xl glass-card text-gray-300 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.96 }}
    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    type="button"
  >
    <motion.div
      initial={false}
      animate={{ rotate: theme === 'dark' ? 180 : 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="flex items-center justify-center"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </motion.div>
  </motion.button>
);
