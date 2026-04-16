import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'decision_helper_form_data';

export const useFormPersistence = (initialData) => {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check if data is not too old (7 days)
        if (parsed.timestamp && Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) {
          return { ...initialData, ...parsed.data };
        }
      }
    } catch (e) {
      console.error('Error loading saved form data:', e);
    }
    return initialData;
  });

  const [currentStep, setCurrentStep] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.step && parsed.timestamp && Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) {
          return parsed.step;
        }
      }
    } catch (e) {
      console.error('Error loading saved step:', e);
    }
    return 1;
  });

  // Save to localStorage whenever form data or step changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        data: formData,
        step: currentStep,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.error('Error saving form data:', e);
    }
  }, [formData, currentStep]);

  const updateFormData = useCallback((updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const clearSavedData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(initialData);
    setCurrentStep(1);
  }, [initialData]);

  return {
    formData,
    setFormData: updateFormData,
    currentStep,
    setCurrentStep,
    clearSavedData
  };
};
