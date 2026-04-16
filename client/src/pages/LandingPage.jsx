import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Shield,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const LandingPage = ({ theme, toggleTheme }) => {
  const features = [
    {
      icon: Target,
      title: "AI-Powered Analysis",
      description:
        "Advanced algorithms analyze your unique profile for personalized recommendations",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get clear, actionable direction in under 10 seconds",
    },
    {
      icon: Shield,
      title: "Practical Paths",
      description: "Real, achievable solutions tailored to your situation",
    },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col overflow-x-hidden">
      {/* Navigation - highest z-index */}
      <nav className="w-full z-50 bg-black/70 backdrop-blur-lg border-b border-white/10 sticky top-0">
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold gap-2 text-xl text-white tracking-tight">
                Decision<span className="gradient-text pl-1">Helper</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <Link
                to="/history"
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                History
              </Link>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center min-h-[90vh] w-full bg-gradient-to-b from-black via-gray-900/60 to-black pt-24 pb-12 overflow-hidden">
        {/* Decorative Gradients */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        {/* Hero Content */}
        <div className="w-full max-w-3xl px-4 sm:px-8 mx-auto flex flex-col items-center text-center">
          <motion.div
            className="w-full"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-purple-300 text-sm font-medium">
                AI-Powered Decision Making
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-responsive-hero font-bold tracking-tight mb-6"
            >
              <span className="text-white text-6xl">Stop </span>
              <span className="gradient-text text-6xl">Overthinking.</span>
              <br className="hidden sm:inline" />
              <span className="text-gray-300 text-6xl">Get Direction.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-responsive-subtitle text-gray-400 mb-8 leading-relaxed max-w-xl mx-auto"
            >
              Answer a few questions and receive a personalized roadmap with
              <span className="text-white font-medium">
                {" "}
                3 actionable paths
              </span>{" "}
              tailored to your goals and situation.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="btn-wrapper justify-center items-center mt-2"
            >
              <Link to="/decide">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-premium min-w-[160px]"
                >
                  <span className="flex items-center gap-2 justify-center">
                    Start Now
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </motion.button>
              </Link>
              <Link to="/history">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-card min-w-[130px] m-auto mt-2 px-6 py-3  text-gray-300 hover:text-white rounded-xl font-medium text-lg transition-colors flex items-center gap-2 justify-center border border-white/10 shadow"
                >
                  Learn More
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="stats-grid mt-10 pt-8 border-t border-white/10"
            >
              {[
                { value: "10K+", label: "Users" },
                { value: "50K+", label: "Decisions Made" },
                { value: "98%", label: "Satisfaction" },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative section-padding bg-gradient-to-b from-black via-gray-900/50 to-black w-full">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our AI analyzes your unique profile and provides personalized,
              actionable recommendations
            </p>
          </motion.div>

          {/* <div className="card-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="glass-card card-uniform group items-center text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div> */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.12,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -8 }}
                  className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-400/30 transition-all duration-300"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />

                  {/* Content */}
                  <div className="relative flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="w-14 h-14 mb-5 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:scale-110 transition">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed max-w-[260px]">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-20 bg-black w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-white">
              Three Simple <span className="gradient-text">Steps</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative flex flex-col gap-12">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 hidden sm:block" />

            {[
              {
                step: "01",
                title: "Share Your Profile",
                desc: "Tell us about your background, skills, and aspirations",
              },
              {
                step: "02",
                title: "AI Analysis",
                desc: "Our AI analyzes your unique combination of factors",
              },
              {
                step: "03",
                title: "Get Your Roadmap",
                desc: "Receive 3 personalized execution plans",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative flex items-start gap-6 group"
              >
                {/* Step Circle */}
                <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold shadow-lg group-hover:scale-110 transition">
                  {item.step}
                </div>

                {/* Card */}
                <div className="flex-1 p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md group-hover:border-purple-400/30 transition">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 w-full overflow-hidden">
        {/* Background (controlled, not noisy) */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Ready to Find <span className="gradient-text">Your Path</span>?
            </h2>

            {/* Subtext */}
            <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-xl">
              Get a clear, step-by-step roadmap tailored to your skills and
              goals — in minutes.
            </p>

            {/* CTA */}
            <Link to="/decide" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-base sm:text-lg shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
              >
                Get My Recommendations
              </motion.button>
            </Link>

            {/* Trust line */}
            <p className="text-xs sm:text-sm text-gray-500 mt-4">
              No signup required • Takes less than 2 minutes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            {/* Left: Branding */}
            <div className="flex flex-col gap-4 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-semibold text-lg">
                  Decision Helper
                </span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">
                Helping you make smarter decisions with AI-powered insights and
                personalized roadmaps.
              </p>
            </div>

            {/* Middle: Links */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div>
                <h4 className="text-white text-sm font-semibold mb-3">
                  Product
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="hover:text-white cursor-pointer">Features</li>
                  <li className="hover:text-white cursor-pointer">
                    How it Works
                  </li>
                  <li className="hover:text-white cursor-pointer">Pricing</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white text-sm font-semibold mb-3">
                  Company
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="hover:text-white cursor-pointer">About</li>
                  <li className="hover:text-white cursor-pointer">Contact</li>
                  <li className="hover:text-white cursor-pointer">Privacy</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} Decision Helper. All rights reserved.
            </p>

            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer">Terms</span>
              <span className="hover:text-white cursor-pointer">Privacy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
