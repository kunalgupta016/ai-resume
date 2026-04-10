const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  question: String,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard']
  },
  userAnswer: String,
  score: {
    type: Number,
    min: 0,
    max: 10
  },
  feedback: String,
  betterAnswer: String
}, { _id: false });

const interviewAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobRole: {
    type: String,
    required: true
  },
  questions: [{
    question: String,
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard']
    }
  }],
  answers: [answerSchema],
  overallScore: {
    type: Number,
    default: 0
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('InterviewAttempt', interviewAttemptSchema);
