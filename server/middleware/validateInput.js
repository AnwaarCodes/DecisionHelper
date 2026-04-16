export const validateAnalysisInput = (req, res, next) => {
  const { age, education, skills, interests, financial, goal } = req.body;
  const errors = [];

  // Required fields validation
  if (!age || typeof age !== 'number' || age < 13 || age > 100) {
    errors.push('Age must be a number between 13 and 100');
  }

  if (!education || typeof education !== 'string' || education.trim().length === 0) {
    errors.push('Education is required');
  }

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    errors.push('At least one skill is required');
  }

  if (!interests || typeof interests !== 'string' || interests.trim().length === 0) {
    errors.push('Interests are required');
  }

  if (!financial || typeof financial !== 'string' || financial.trim().length === 0) {
    errors.push('Financial situation is required');
  }

  if (!goal || typeof goal !== 'string' || goal.trim().length === 0) {
    errors.push('Goal is required');
  }

  // Sanitize context if provided
  if (req.body.context && typeof req.body.context === 'string') {
    // Limit context length
    if (req.body.context.length > 2000) {
      errors.push('Context must be less than 2000 characters');
    }
  }

  if (errors.length > 0) {
    const error = new Error(errors.join(', '));
    error.name = 'ValidationError';
    error.statusCode = 400;
    return next(error);
  }

  // Sanitize inputs
  req.body = {
    age: Math.floor(age),
    education: sanitizeString(education),
    skills: skills.map(s => sanitizeString(s)),
    interests: sanitizeString(interests),
    financial: sanitizeString(financial),
    goal: sanitizeString(goal),
    context: req.body.context ? sanitizeString(req.body.context) : ''
  };

  next();
};

function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 500); // Limit length
}
