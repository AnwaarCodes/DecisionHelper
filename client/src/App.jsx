import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useTheme } from './hooks/useTheme';

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./pages/LandingPage').then(m => ({ default: m.LandingPage })));
const DecisionForm = lazy(() => import('./pages/DecisionForm').then(m => ({ default: m.DecisionForm })));
const ResultsPage = lazy(() => import('./pages/ResultsPage').then(m => ({ default: m.ResultsPage })));
const HistoryPage = lazy(() => import('./pages/HistoryPage').then(m => ({ default: m.HistoryPage })));

// Loading fallback - Premium dark theme
const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-500/50 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
    </div>
  </div>
);

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage theme={theme} toggleTheme={toggleTheme} />} 
        />
        <Route 
          path="/decide" 
          element={<DecisionForm theme={theme} toggleTheme={toggleTheme} />} 
        />
        <Route 
          path="/results" 
          element={<ResultsPage theme={theme} toggleTheme={toggleTheme} />} 
        />
        <Route 
          path="/history" 
          element={<HistoryPage theme={theme} toggleTheme={toggleTheme} />} 
        />
      </Routes>
    </Suspense>
  );
}

export default App;
