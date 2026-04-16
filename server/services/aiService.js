import OpenAI from 'openai';

let openai = null;

const getOpenAI = () => {
  if (!openai && process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return openai;
};

const SYSTEM_PROMPT = `You are a strict, practical career and decision advisor.

Your job is to analyze a user's situation and provide EXACTLY 3 realistic and actionable options.

Rules:
- Do NOT give motivational advice
- Do NOT be vague
- Do NOT suggest unrealistic paths
- Focus on practical, achievable solutions
- Personalize based on ALL inputs
- Keep language simple and clear

For EACH option, return:

1. title
2. why_this_fits (personalized explanation)
3. time_to_start
4. difficulty (Easy/Medium/Hard)
5. expected_income_range
6. roadmap (Week 1 to Week 4 steps)
7. first_action_today
8. tools_resources (list)

Return response ONLY in valid JSON format.`;

export const generateDecisionOptions = async (userProfile) => {
  const client = getOpenAI();
  if (!client) {
    throw new Error('OpenAI API key not configured');
  }
  
  const userPrompt = buildUserPrompt(userProfile);
  
  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 2500
    });

    const responseContent = completion.choices[0].message.content;
    const parsedResponse = JSON.parse(responseContent);
    
    // Validate response structure
    validateResponseStructure(parsedResponse);
    
    return parsedResponse;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
};

function buildUserPrompt(profile) {
  return `User Profile:
- Age: ${profile.age}
- Education: ${profile.education}
- Skills: ${profile.skills.join(', ')}
- Interests: ${profile.interests}
- Financial Situation: ${profile.financial}
- Goal: ${profile.goal}
- Extra Context: ${profile.context || 'None provided'}

Based on this profile, provide EXACTLY 3 personalized options to help achieve their goal.`;
}

function validateResponseStructure(response) {
  if (!response.options || !Array.isArray(response.options)) {
    throw new Error('Invalid response: missing options array');
  }
  
  if (response.options.length !== 3) {
    throw new Error(`Invalid response: expected 3 options, got ${response.options.length}`);
  }
  
  const requiredFields = [
    'title', 'why_this_fits', 'time_to_start', 'difficulty',
    'expected_income_range', 'roadmap', 'first_action_today', 'tools_resources'
  ];
  
  response.options.forEach((option, index) => {
    for (const field of requiredFields) {
      if (!(field in option)) {
        throw new Error(`Invalid response: option ${index + 1} missing field '${field}'`);
      }
    }
    
    // Validate roadmap structure
    const roadmapFields = ['week1', 'week2', 'week3', 'week4'];
    for (const week of roadmapFields) {
      if (!(week in option.roadmap)) {
        throw new Error(`Invalid response: option ${index + 1} roadmap missing '${week}'`);
      }
    }
    
    // Validate difficulty value
    const validDifficulties = ['Easy', 'Medium', 'Hard'];
    if (!validDifficulties.includes(option.difficulty)) {
      option.difficulty = 'Medium'; // Default fallback
    }
  });
}
