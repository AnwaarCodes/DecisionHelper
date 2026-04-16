import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Trash2,
  Clock,
  ChevronRight,
  Sparkles,
  History,
} from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";

export const HistoryPage = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("decision_helper_history");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      } catch (e) {
        console.error("Error parsing history:", e);
      }
    }
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const hours = Math.floor((now - date) / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor((now - date) / (1000 * 60));
        return minutes === 0 ? "Just now" : `${minutes}m ago`;
      }
      return `${hours}h ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const handleView = (entry) => {
    localStorage.setItem(
      "decision_helper_results",
      JSON.stringify({
        options: entry.options,
        timestamp: entry.timestamp,
        formData: entry.formData,
      }),
    );
    navigate("/results");
  };

  const handleDelete = (id) => {
    const updated = history.filter((entry) => entry.id !== id);
    setHistory(updated);
    localStorage.setItem("decision_helper_history", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      setHistory([]);
      localStorage.removeItem("decision_helper_history");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 sticky top-0">
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16">
            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.03, x: -3 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-all group px-3 py-2 rounded-lg hover:bg-white/5"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline font-medium">Back to Home</span>
            </motion.button>

            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-10 sm:py-14">
        <div className="container-responsive max-w-3xl w-full">
          {/* Top Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-white/10">
                <History className="w-6 h-6 text-purple-400" />
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Your <span className="gradient-text">History</span>
              </h1>
            </div>

            <p className="text-gray-400 text-sm sm:text-base max-w-md">
              Access and review your past decision analyses anytime.
            </p>
          </motion.div>

          {history.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-14 px-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                No history yet
              </h3>

              <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                Your saved analyses will appear here once you start using the
                tool.
              </p>

              <motion.button
                onClick={() => navigate("/decide")}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 25px rgba(139,92,246,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                className="btn-accent px-6 py-3 text-sm sm:text-base"
              >
                <Sparkles className="w-5 h-5" />
                Get Started
              </motion.button>
            </motion.div>
          ) : (
            <>
              {/* Top Actions */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-400">
                  {history.length} saved{" "}
                  {history.length === 1 ? "entry" : "entries"}
                </p>

                <motion.button
                  onClick={handleClearAll}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-danger text-sm px-4 py-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </motion.button>
              </div>

              {/* List */}
              <div className="space-y-4">
                {history.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="group rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-purple-400/30 transition-all duration-300 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left */}
                      <div
                        onClick={() => handleView(entry)}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center gap-3 mb-2 text-xs sm:text-sm text-gray-500">
                          <span>{formatDate(entry.timestamp)}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-600" />
                          <span className="text-blue-400 font-medium">
                            {entry.options?.length || 0} options
                          </span>
                        </div>

                        <h3 className="text-white font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                          Goal: {entry.formData?.goal || "Unknown"}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-400 line-clamp-1">
                          {entry.options?.[0]?.title}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          onClick={() => handleView(entry)}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-400/30 transition"
                        >
                          <ChevronRight className="w-5 h-5 text-blue-400" />
                        </motion.button>

                        <motion.button
                          onClick={() => handleDelete(entry.id)}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-400/30 transition"
                        >
                          <Trash2 className="w-5 h-5 text-red-400" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};
