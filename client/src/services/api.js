const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const analyzeDecision = async (formData) => {
  const response = await fetch(`${API_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An unexpected error occurred'
    }));
    throw new Error(error.message || error.error || 'Failed to analyze decision');
  }

  const data = await response.json();
  return data.data;
};

export const checkHealth = async () => {
  const response = await fetch(`${API_URL.replace('/api', '')}/api/health`);
  return response.json();
};
