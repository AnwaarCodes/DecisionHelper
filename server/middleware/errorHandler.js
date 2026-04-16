export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // OpenAI API errors
  if (err.name === 'APIError') {
    return res.status(503).json({
      error: 'AI service temporarily unavailable',
      message: 'Please try again in a moment',
      code: 'AI_SERVICE_ERROR'
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Invalid input',
      message: err.message,
      code: 'VALIDATION_ERROR'
    });
  }

  // Timeout errors
  if (err.code === 'ETIMEDOUT' || err.code === 'ECONNABORTED') {
    return res.status(504).json({
      error: 'Request timeout',
      message: 'The request took too long. Please try again.',
      code: 'TIMEOUT_ERROR'
    });
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message;

  res.status(statusCode).json({
    error: 'Server error',
    message: message,
    code: 'INTERNAL_ERROR'
  });
};
