const InterviewAttempt = require('../models/InterviewAttempt');
const { generateQuestions, evaluateAnswer } = require('../services/gemini');

exports.generateQuestions = async (req, res) => {
  try {
    const { jobRole } = req.body;

    if (!jobRole) {
      return res.status(400).json({ error: 'Job role is required' });
    }

    const result = await generateQuestions(jobRole);

    // Save the attempt
    const attempt = await InterviewAttempt.create({
      userId: req.userId,
      jobRole,
      questions: result.questions
    });

    res.json({
      attemptId: attempt._id,
      questions: result.questions
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate questions: ' + error.message });
  }
};

exports.evaluateAnswer = async (req, res) => {
  try {
    const { attemptId, question, answer, jobRole, difficulty, questionIndex } = req.body;

    if (!question || !answer || !jobRole) {
      return res.status(400).json({ error: 'Question, answer, and job role are required' });
    }

    const result = await evaluateAnswer(question, answer, jobRole, difficulty);

    // Update the attempt with this answer
    if (attemptId) {
      const attempt = await InterviewAttempt.findById(attemptId);
      if (attempt) {
        attempt.answers.push({
          question,
          difficulty,
          userAnswer: answer,
          score: result.score,
          feedback: result.feedback,
          betterAnswer: result.betterAnswer
        });

        // Calculate overall score
        const totalScore = attempt.answers.reduce((sum, a) => sum + a.score, 0);
        attempt.overallScore = Math.round((totalScore / attempt.answers.length) * 10);

        if (attempt.answers.length === attempt.questions.length) {
          attempt.completed = true;
        }

        await attempt.save();
      }
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to evaluate answer: ' + error.message });
  }
};
