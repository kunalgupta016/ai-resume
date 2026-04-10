const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });



/**
 * Analyze resume text and return structured feedback
 */
async function analyzeResume(resumeText) {
  const prompt = `You are an expert resume reviewer and career advisor. Analyze the following resume text and provide a detailed evaluation.

Resume Text:
"""
${resumeText}
"""

Respond ONLY with a valid JSON object in this exact format (no markdown, no code fences):
{
  "score": <number between 0 and 100>,
  "strengths": ["strength 1", "strength 2", "strength 3", "strength 4", "strength 5"],
  "weaknesses": ["weakness 1", "weakness 2", "weakness 3", "weakness 4", "weakness 5"],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3", "suggestion 4", "suggestion 5"]
}

Evaluation criteria:
- Content quality and relevance
- Formatting and structure
- Use of action verbs and quantified achievements
- Skills presentation
- Overall impression and ATS compatibility

Provide exactly 5 items for each category. Be specific and actionable.`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();
  
  // Clean the response - remove markdown code fences if present
  const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    throw new Error('Failed to parse AI response. Please try again.');
  }
}

/**
 * Generate interview questions for a given job role
 */
async function generateQuestions(jobRole) {
  const prompt = `You are an expert technical interviewer. Generate interview questions for the role of "${jobRole}".

Respond ONLY with a valid JSON object in this exact format (no markdown, no code fences):
{
  "questions": [
    {"question": "question text", "difficulty": "easy"},
    {"question": "question text", "difficulty": "easy"},
    {"question": "question text", "difficulty": "easy"},
    {"question": "question text", "difficulty": "easy"},
    {"question": "question text", "difficulty": "easy"},
    {"question": "question text", "difficulty": "medium"},
    {"question": "question text", "difficulty": "medium"},
    {"question": "question text", "difficulty": "medium"},
    {"question": "question text", "difficulty": "medium"},
    {"question": "question text", "difficulty": "medium"},
    {"question": "question text", "difficulty": "hard"},
    {"question": "question text", "difficulty": "hard"},
    {"question": "question text", "difficulty": "hard"},
    {"question": "question text", "difficulty": "hard"},
    {"question": "question text", "difficulty": "hard"}
  ]
}

Requirements:
- Generate exactly 5 Easy, 5 Medium, and 5 Hard questions
- Easy: fundamental concepts and basic knowledge
- Medium: practical application and problem-solving
- Hard: advanced system design, optimization, and deep expertise
- Questions should be relevant to the "${jobRole}" role
- Make questions realistic and commonly asked in real interviews`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();
  const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    throw new Error('Failed to parse AI response. Please try again.');
  }
}

/**
 * Evaluate a user's answer to an interview question
 */
async function evaluateAnswer(question, answer, jobRole, difficulty) {
  const prompt = `You are an expert technical interviewer evaluating a candidate's answer for the role of "${jobRole}".

Question (${difficulty}): "${question}"
Candidate's Answer: "${answer}"

Respond ONLY with a valid JSON object in this exact format (no markdown, no code fences):
{
  "score": <number between 1 and 10>,
  "feedback": "detailed constructive feedback about the answer",
  "betterAnswer": "a comprehensive ideal answer to this question"
}

Evaluation criteria:
- Accuracy and correctness
- Depth of understanding
- Clarity of explanation
- Relevance to the question
- Completeness

Be fair but thorough in your evaluation. Provide actionable feedback.`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();
  const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    throw new Error('Failed to parse AI response. Please try again.');
  }
}

module.exports = { analyzeResume, generateQuestions, evaluateAnswer };
