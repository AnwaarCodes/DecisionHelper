import { generateDecisionOptions } from '../services/aiService.js';
import { generateMockOptions } from '../services/mockService.js';

export const analyzeDecision = async (req, res, next) => {
  try {
    const userProfile = req.body;
    
    console.log('[Analytics] Analysis requested:', {
      age: userProfile.age,
      goal: userProfile.goal,
      timestamp: new Date().toISOString()
    });

    let result;
    
    // Use mock service if enabled
    if (process.env.MOCK_MODE === 'true') {
      console.log('[Mock Mode] Generating mock response...');
      result = await generateMockOptions(userProfile);
    } else {
      result = await generateDecisionOptions(userProfile);
    }

    console.log('[Analytics] Analysis completed successfully');
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
