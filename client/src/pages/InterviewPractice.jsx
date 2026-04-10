import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import RoleInput from '../components/interview/RoleInput';
import InterviewSession from '../components/interview/InterviewSession';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { generateQuestions } from '../services/api';

export default function InterviewPractice() {
  const [step, setStep] = useState('role'); // role | generating | interview
  const [jobRole, setJobRole] = useState('');
  const [questions, setQuestions] = useState([]);
  const [attemptId, setAttemptId] = useState(null);
  const [error, setError] = useState('');

  const handleGenerateQuestions = async (role) => {
    setJobRole(role);
    setStep('generating');
    setError('');

    try {
      const res = await generateQuestions(role);
      setQuestions(res.data.questions);
      setAttemptId(res.data.attemptId);
      setStep('interview');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate questions. Please try again.');
      setStep('role');
    }
  };

  const handleRestart = () => {
    setStep('role');
    setQuestions([]);
    setAttemptId(null);
    setJobRole('');
    setError('');
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-surface-900 dark:text-white">
              Interview Practice
            </h1>
            <p className="text-sm text-surface-500 dark:text-surface-400">
              Practice with AI-generated questions and get instant feedback
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} onRetry={handleRestart} />
        </div>
      )}

      {step === 'role' && (
        <div className="max-w-xl">
          <div className="card p-6">
            <h2 className="text-base font-semibold text-surface-900 dark:text-white mb-4">
              Choose a Job Role
            </h2>
            <RoleInput onSubmit={handleGenerateQuestions} loading={false} />
          </div>
        </div>
      )}

      {step === 'generating' && (
        <div className="py-16">
          <LoadingSpinner text={`Generating questions for "${jobRole}"...`} />
        </div>
      )}

      {step === 'interview' && (
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-primary-500/10 text-xs font-semibold text-primary-600 dark:text-primary-400">
              {jobRole}
            </span>
            <button
              onClick={handleRestart}
              className="text-xs text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
            >
              Change role
            </button>
          </div>
          <InterviewSession
            questions={questions}
            attemptId={attemptId}
            jobRole={jobRole}
            onRestart={handleRestart}
          />
        </div>
      )}
    </div>
  );
}
