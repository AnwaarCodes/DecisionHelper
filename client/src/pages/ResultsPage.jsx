import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Bookmark,
  Share2,
  Check,
  History,
} from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { OptionCard } from "../components/OptionCard";
import { analytics } from "../utils/analytics";

export const ResultsPage = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    analytics.pageView("results");

    const stored = localStorage.getItem("decision_helper_results");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setResults(parsed);
        analytics.resultsView(parsed.options);
      } catch (e) {
        console.error("Error parsing results:", e);
        navigate("/decide");
      }
    } else {
      navigate("/decide");
    }
  }, [navigate]);

  const handleSave = () => {
    if (!results) return;

    const existing = JSON.parse(
      localStorage.getItem("decision_helper_history") || "[]",
    );

    const newEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      options: results.options,
      formData: results.formData,
    };

    const isDuplicate = existing.some(
      (entry) =>
        entry.formData?.goal === results.formData?.goal &&
        Date.now() - entry.timestamp < 3600000,
    );

    if (!isDuplicate) {
      const updated = [newEntry, ...existing].slice(0, 10);
      localStorage.setItem("decision_helper_history", JSON.stringify(updated));
    }

    setSaved(true);
    analytics.saveClick();

    setTimeout(() => setSaved(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: "My Decision Helper Results",
      text: `I just got personalized recommendations for: ${results?.formData?.goal}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
      analytics.shareClick();
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  const handleRegenerate = () => {
    analytics.regenerateClick();
    navigate("/decide");
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-500/50 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          />
        </div>
      </div>
    );
  }

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

            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => navigate("/history")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all duration-300"
                title="View History"
              >
                <History className="w-5 h-5" />
              </motion.button>

              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-4 py-10 sm:py-14">
        <div className="container-responsive max-w-6xl w-full">
          {/* Top Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs sm:text-sm font-medium mb-5"
            >
              <Sparkles className="w-4 h-4" />
              Analysis Complete
            </motion.div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              <span className="text-white">Your </span>
              <span className="gradient-text">Personalized</span>
              <br />
              <span className="text-white">Recommendations</span>
            </h1>

            {/* Description */}
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
              Based on your profile, here are 3 realistic paths tailored to your
              situation. Each includes a step-by-step roadmap to get you
              started.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
              <motion.button
                onClick={handleSave}
                whileHover={{
                  scale: 1.02,
                  boxShadow: saved
                    ? "0 0 25px rgba(34,197,94,0.4)"
                    : "0 0 25px rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                className={`w-full sm:w-auto btn-primary ${saved ? "bg-green-500/10 border border-green-500/30 text-green-400" : ""}`}
              >
                {saved ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
                {saved ? "Saved!" : "Save Results"}
              </motion.button>

              <motion.button
                onClick={handleShare}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 25px rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto btn-primary"
              >
                <Share2 className="w-4 h-4" />
                {shared ? "Copied!" : "Share"}
              </motion.button>

              <motion.button
                onClick={handleRegenerate}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 25px rgba(96,165,250,0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto btn-accent"
              >
                <RotateCcw className="w-4 h-4" />
                Start Over
              </motion.button>
            </div>
          </motion.div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.options?.map((option, index) => (
              <OptionCard key={index} option={option} index={index} />
            ))}
          </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-14 text-center"
          >
            <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                These recommendations are generated based on the information you
                provided. Consider them as starting points and adapt them to
                your specific circumstances.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
