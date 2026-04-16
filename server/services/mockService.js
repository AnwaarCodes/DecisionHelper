export const generateMockOptions = async (userProfile) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const goal = userProfile.goal.toLowerCase();
  
  // Generate contextual mock responses based on goal
  if (goal.includes('career') || goal.includes('job') || goal.includes('work')) {
    return getCareerOptions(userProfile);
  } else if (goal.includes('business') || goal.includes('startup') || goal.includes('entrepreneur')) {
    return getBusinessOptions(userProfile);
  } else if (goal.includes('skill') || goal.includes('learn') || goal.includes('study')) {
    return getLearningOptions(userProfile);
  } else {
    return getGeneralOptions(userProfile);
  }
};

function getCareerOptions(profile) {
  return {
    options: [
      {
        title: "Transition to Tech Support Specialist",
        why_this_fits: `At age ${profile.age} with your background in ${profile.education}, tech support offers an accessible entry point. Your skills in ${profile.skills[0]} translate well to troubleshooting and problem-solving roles.`,
        time_to_start: "2-4 weeks",
        difficulty: "Easy",
        expected_income_range: "$45,000 - $65,000/year",
        roadmap: {
          week1: "Complete Google IT Support Certificate on Coursera (free audit available)",
          week2: "Build a simple portfolio: document 5 common tech issues you've solved",
          week3: "Apply to 10 entry-level support positions; network on LinkedIn",
          week4: "Prepare for interviews; practice common support scenarios"
        },
        first_action_today: "Sign up for Google IT Support Certificate on Coursera",
        tools_resources: ["Coursera", "LinkedIn", "CompTIA A+ study guides", "r/ITCareerQuestions"]
      },
      {
        title: "Freelance Digital Marketing Consultant",
        why_this_fits: `Your interest in ${profile.interests} combined with ${profile.skills.join(', ')} positions you well for digital marketing. This fits your ${profile.financial} financial situation by allowing gradual income building.`,
        time_to_start: "1-2 weeks",
        difficulty: "Medium",
        expected_income_range: "$30,000 - $80,000/year (scaling with clients)",
        roadmap: {
          week1: "Choose niche (social media, SEO, or content); set up portfolio website",
          week2: "Create 3 sample case studies; join Upwork and Fiverr",
          week3: "Reach out to 20 potential clients; offer free audit to 3 businesses",
          week4: "Deliver first project; request testimonials; refine services"
        },
        first_action_today: "Choose your marketing niche and research 3 competitors",
        tools_resources: ["Canva", "Google Analytics Academy", "HubSpot Academy", "Upwork"]
      },
      {
        title: "Data Analyst Path",
        why_this_fits: `Data analysis leverages your ${profile.education} background and pays well. Given your ${profile.financial} situation, this offers strong ROI within 6 months.`,
        time_to_start: "4-6 weeks",
        difficulty: "Hard",
        expected_income_range: "$60,000 - $90,000/year",
        roadmap: {
          week1: "Learn Excel advanced functions; start Python basics on DataCamp",
          week2: "Complete SQL course; practice on HackerRank",
          week3: "Build 2 portfolio projects with public datasets (Kaggle)",
          week4: "Get Tableau Public; create 3 visualizations; start applying"
        },
        first_action_today: "Sign up for DataCamp free trial and start Python course",
        tools_resources: ["DataCamp", "Kaggle", "Tableau Public", "SQLBolt", "Excel"]
      }
    ]
  };
}

function getBusinessOptions(profile) {
  return {
    options: [
      {
        title: "Service-Based Micro-Business",
        why_this_fits: `Starting with services leverages your existing ${profile.skills.join(', ')} skills with minimal upfront cost. Ideal for your ${profile.financial} situation.`,
        time_to_start: "1-2 weeks",
        difficulty: "Easy",
        expected_income_range: "$2,000 - $8,000/month",
        roadmap: {
          week1: "Define your service offering; set pricing; create simple contract template",
          week2: "Build one-page website; set up business email; create LinkedIn company page",
          week3: "Reach out to 50 prospects; offer intro discount; join local business groups",
          week4: "Close first 2 clients; deliver excellent work; ask for referrals"
        },
        first_action_today: "Write down your top 3 service offerings and target price points",
        tools_resources: ["Stripe", "Calendly", "Notion", "LinkedIn Sales Navigator trial"]
      },
      {
        title: "Content Creator / Personal Brand",
        why_this_fits: `Your interest in ${profile.interests} can be monetized through content. Low barrier to entry and fits ${profile.financial} constraints.`,
        time_to_start: "Immediate",
        difficulty: "Medium",
        expected_income_range: "$1,000 - $10,000/month (6-12 month build)",
        roadmap: {
          week1: "Choose platform (YouTube/LinkedIn/Substack); define content pillars; post 3x",
          week2: "Create content calendar; batch film/write 5 pieces; engage 30 min daily",
          week3: "Analyze top performers; double down on what works; start email list",
          week4: "Launch first monetization (digital product/affiliate/coaching); promote to audience"
        },
        first_action_today: "Choose your primary platform and create your profile",
        tools_resources: ["Canva Pro", "Notion", "ConvertKit", "TubeBuddy"]
      },
      {
        title: "E-commerce Dropshipping",
        why_this_fits: `E-commerce allows you to test products without inventory risk. Good fit for your ${profile.financial} situation if you start small.`,
        time_to_start: "2-3 weeks",
        difficulty: "Hard",
        expected_income_range: "$500 - $5,000/month (highly variable)",
        roadmap: {
          week1: "Research winning products on TikTok/AliExpress; validate demand",
          week2: "Set up Shopify store; connect supplier; create product pages",
          week3: "Launch TikTok organic content; test 3 ad creatives with $100 budget",
          week4: "Analyze data; kill losers; scale winners; optimize conversion rate"
        },
        first_action_today: "Spend 2 hours researching trending products on TikTok",
        tools_resources: ["Shopify", "TikTok Ads", "AliExpress", "Canva", "Google Trends"]
      }
    ]
  };
}

function getLearningOptions(profile) {
  return {
    options: [
      {
        title: "Project-Based Learning Path",
        why_this_fits: `Learning by doing is most effective for ${profile.interests}. Build portfolio while learning.`,
        time_to_start: "Immediate",
        difficulty: "Easy",
        expected_income_range: "N/A (Skill building phase)",
        roadmap: {
          week1: "Choose one skill to focus on; find 3 beginner projects online",
          week2: "Complete first project; document process; share on social media",
          week3: "Complete second project; start third; begin networking in community",
          week4: "Finish third project; compile portfolio; seek feedback from experts"
        },
        first_action_today: "Choose your focus skill and find one beginner tutorial",
        tools_resources: ["YouTube", "GitHub", "freeCodeCamp", "Discord communities"]
      },
      {
        title: "Structured Certification Route",
        why_this_fits: `Certifications provide credibility, especially with your ${profile.education} background.`,
        time_to_start: "1 week",
        difficulty: "Medium",
        expected_income_range: "Depends on certification field",
        roadmap: {
          week1: "Research top 3 certifications in your field; compare costs and ROI",
          week2: "Enroll in chosen program; create study schedule; gather materials",
          week3: "Complete 50% of coursework; join study groups; practice exams",
          week4: "Finish coursework; take practice tests; schedule certification exam"
        },
        first_action_today: "Research which certification is most valued in your target field",
        tools_resources: ["Coursera", "Udemy", "LinkedIn Learning", "Exam practice sites"]
      },
      {
        title: "Mentorship + Apprenticeship",
        why_this_fits: `Accelerated learning through expert guidance. Best for ${profile.financial} if you can find paid apprenticeship.`,
        time_to_start: "2-4 weeks",
        difficulty: "Hard",
        expected_income_range: "$15-25/hour during apprenticeship",
        roadmap: {
          week1: "Identify 10 experts in your field; craft personalized outreach messages",
          week2: "Send 30 outreach messages; offer value first; request 15-min call",
          week3: "Conduct informational interviews; ask about apprenticeship opportunities",
          week4: "Negotiate terms; start apprenticeship; set learning goals with mentor"
        },
        first_action_today: "Identify 3 people you admire in your field of interest",
        tools_resources: ["LinkedIn", "Twitter/X", "Industry forums", "Mentorship platforms"]
      }
    ]
  };
}

function getGeneralOptions(profile) {
  return {
    options: [
      {
        title: "Skill Bridge Strategy",
        why_this_fits: `Bridge your current ${profile.skills.join(', ')} skills to adjacent high-demand field.`,
        time_to_start: "2-3 weeks",
        difficulty: "Easy",
        expected_income_range: "$40,000 - $70,000/year",
        roadmap: {
          week1: "Map your transferable skills to 3 target roles; research requirements",
          week2: "Identify skill gaps; start learning most critical gap first",
          week3: "Build one project demonstrating new skill; update resume",
          week4: "Apply to 10 positions; network with people in target roles"
        },
        first_action_today: "List your top 5 skills and research what roles they transfer to",
        tools_resources: ["LinkedIn", "O*NET", "Jobscan", "Industry reports"]
      },
      {
        title: "Side Income First Approach",
        why_this_fits: `Test your ${profile.goal} idea with minimal risk while keeping current income.`,
        time_to_start: "1-2 weeks",
        difficulty: "Medium",
        expected_income_range: "$500 - $3,000/month side income",
        roadmap: {
          week1: "Define minimum viable offer; set up simple payment system",
          week2: "Find first 3 customers through personal network; deliver value",
          week3: "Gather testimonials; refine offer; create simple marketing",
          week4: "Systematize delivery; consider raising prices; plan transition timing"
        },
        first_action_today: "Define the smallest version of your offer you can sell this week",
        tools_resources: ["Stripe", "Gumroad", "Notion", "Calendar app"]
      },
      {
        title: "Strategic Pivot Plan",
        why_this_fits: `Systematic 6-month transition plan for major life change aligned with ${profile.interests}.`,
        time_to_start: "4-6 weeks",
        difficulty: "Hard",
        expected_income_range: "Variable - long term focus",
        roadmap: {
          week1: "Deep research phase: interview 5 people living your target lifestyle",
          week2: "Create financial runway plan; cut expenses; save 6-month buffer",
          week3: "Build foundational skills daily; create accountability system",
          week4: "Launch small experiment in new direction; gather real feedback"
        },
        first_action_today: "Reach out to one person who has achieved what you want",
        tools_resources: ["YNAB (budgeting)", "Notion", "Podcasts in target field", "Communities"]
      }
    ]
  };
}
