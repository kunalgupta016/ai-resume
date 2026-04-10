import { useState } from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import QuestionCard from './QuestionCard';
import AnswerInput from './AnswerInput';
import FeedbackCard from './FeedbackCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { evaluateAnswer } from '../../services/api';

export default function InterviewSession({ questions, attemptId, jobRole, onRestart }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState('answering'); // answering | evaluating | feedback | complete
  const [feedback, setFeedback] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const currentQuestion = questions[currentIndex];

  const handleSubmitAnswer = async (answer) => {
    setPhase('evaluating');
    setError('');

    try {
      const res = await evaluateAnswer({
        attemptId,
        question: currentQuestion.question,
        answer,
        jobRole,
        difficulty: currentQuestion.difficulty,
        questionIndex: currentIndex
      });

      setFeedback(res.data);
      setResults(prev => [...prev, { ...res.data, question: currentQuestion.question, answer }]);
      setPhase('feedback');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to evaluate answer');
      setPhase('answering');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setFeedback(null);
      setPhase('answering');
    } else {
      setPhase('complete');
    }
  };

  // Interview complete
  if (phase === 'complete') {
    const totalScore = results.reduce((sum, r) => sum + r.score, 0);
    const avgScore = (totalScore / results.length).toFixed(1);
    const percentage = Math.round((totalScore / (results.length * 10)) * 100);

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="card p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-warning to-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-warning/30">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            Interview Complete!
          </h2>
          <p className="text-surface-500 dark:text-surface-400 mb-6">
            You competed all {questions.length} questions for <strong>{jobRole}</strong>
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800">
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{avgScore}</p>
              <p className="text-xs text-surface-400 mt-1">Avg Score</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800">
              <p className="text-2xl font-bold text-success">{percentage}%</p>
              <p className="text-xs text-surface-400 mt-1">Overall</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800">
              <p className="text-2xl font-bold text-warning">{results.length}</p>
              <p className="text-xs text-surface-400 mt-1">Questions</p>
            </div>
          </div>

          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold text-sm shadow-lg shadow-primary-500/25 transition-all active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            Start New Interview
          </button>
        </div>

        {/* Results breakdown */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-4">Results Breakdown</h3>
          <div className="space-y-3">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold
                  ${r.score >= 8 ? 'bg-success/10 text-success' : r.score >= 5 ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'}`}>
                  {r.score}
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400 flex-1 truncate">
                  {r.question}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <QuestionCard
        question={currentQuestion.question}
        difficulty={currentQuestion.difficulty}
        currentIndex={currentIndex}
        total={questions.length}
      />

      {error && <ErrorMessage message={error} onRetry={() => setError('')} />}

      {phase === 'evaluating' && (
        <LoadingSpinner text="AI is evaluating your answer..." />
      )}

      {phase === 'answering' && (
        <AnswerInput onSubmit={handleSubmitAnswer} loading={false} />
      )}

      {phase === 'feedback' && feedback && (
        <FeedbackCard
          score={feedback.score}
          feedback={feedback.feedback}
          betterAnswer={feedback.betterAnswer}
          onNext={handleNext}
          isLast={currentIndex === questions.length - 1}
        />
      )}
    </div>
  );
}
