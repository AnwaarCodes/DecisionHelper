import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { ProgressBar } from '../components/ProgressBar';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { Step1_BasicInfo } from '../components/steps/Step1_BasicInfo';
import { Step2_Skills } from '../components/steps/Step2_Skills';
import { Step3_Interests } from '../components/steps/Step3_Interests';
import { Step4_Financial } from '../components/steps/Step4_Financial';
import { Step5_Goal } from '../components/steps/Step5_Goal';
import { Step6_Context } from '../components/steps/Step6_Context';
import { useFormPersistence } from '../hooks/useFormPersistence';
import { analyzeDecision } from '../services/api';
import { analytics } from '../utils/analytics';

const TOTAL_STEPS = 6;

const INITIAL_DATA = {
  age: '',
  education: '',
  skills: [],
  interests: '',
  financial: '',
  goal: '',
  context: ''
};

export const DecisionForm = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const { formData, setFormData, currentStep, setCurrentStep, clearSavedData } = useFormPersistence(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    analytics.pageView('decision_form');
    analytics.formStart();
  }, []);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      analytics.formStepComplete(currentStep, formData);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    
    analytics.formSubmit(formData);

    try {
      const result = await analyzeDecision(formData);
      
      localStorage.setItem('decision_helper_results', JSON.stringify({
        options: result.options,
        timestamp: Date.now(),
        formData: formData
      }));
      
      clearSavedData();
      navigate('/results');
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze your decision. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    const commonProps = {
      data: formData,
      onUpdate: setFormData,
    };

    switch (currentStep) {
      case 1:
        return <Step1_BasicInfo {...commonProps} onNext={handleNext} />;
      case 2:
        return <Step2_Skills {...commonProps} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3_Interests {...commonProps} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4_Financial {...commonProps} onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <Step5_Goal {...commonProps} onNext={handleNext} onBack={handleBack} />;
      case 6:
        return (
          <Step6_Context 
            {...commonProps} 
            onSubmit={handleSubmit} 
            onBack={handleBack}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  // Header Component
  const Header = () => (
    <header className="w-full z-50 bg-black/70 backdrop-blur-lg border-b border-white/10 sticky top-0">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          <motion.button
            onClick={() => currentStep === 1 ? navigate('/') : handleBack()}
            whileHover={{ scale: 1.04, x: -3 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group px-3 py-2 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">{currentStep === 1 ? 'Back to Home' : 'Previous Step'}</span>
          </motion.button>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white hidden sm:inline">Decision Helper</span>
          </Link>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <LoadingState />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <ErrorState 
              message={error} 
              onRetry={handleSubmit}
              onBack={() => setError(null)}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="container-responsive max-w-xl w-full">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card card-uniform"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
