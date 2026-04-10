import { useState } from 'react';
import { FileText, Sparkles } from 'lucide-react';
import ResumeUpload from '../components/resume/ResumeUpload';
import ScoreCard from '../components/resume/ScoreCard';
import AnalysisResults from '../components/resume/AnalysisResults';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { uploadResume, analyzeResume } from '../services/api';

export default function ResumeAnalyzer() {
  const [step, setStep] = useState('upload'); // upload | analyzing | results
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (file) => {
    setLoading(true);
    setError('');

    try {
      // Step 1: Upload and extract text
      const uploadRes = await uploadResume(file);
      const { text, fileName } = uploadRes.data;

      // Step 2: Analyze with AI
      setStep('analyzing');
      const analyzeRes = await analyzeResume(text, fileName);
      setAnalysis(analyzeRes.data);
      setStep('results');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze resume. Please try again.');
      setStep('upload');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('upload');
    setAnalysis(null);
    setError('');
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-surface-900 dark:text-white">
              Resume Analyzer
            </h1>
            <p className="text-sm text-surface-500 dark:text-surface-400">
              Upload your resume and get AI-powered feedback
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} onRetry={handleReset} />
        </div>
      )}

      {step === 'upload' && (
        <div className="max-w-xl">
          <ResumeUpload onUpload={handleUpload} loading={loading} />
        </div>
      )}

      {step === 'analyzing' && (
        <div className="py-16">
          <LoadingSpinner text="AI is analyzing your resume... This may take a moment." />
        </div>
      )}

      {step === 'results' && analysis && (
        <div className="space-y-6 animate-fade-in">
          {/* Action bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
              <Sparkles className="w-4 h-4 text-primary-500" />
              AI Analysis Complete
            </div>
            <button
              onClick={handleReset}
              className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              Analyze Another Resume
            </button>
          </div>

          {/* Results grid */}
          <div className="grid md:grid-cols-[280px_1fr] gap-6">
            <ScoreCard score={analysis.score} />
            <AnalysisResults
              strengths={analysis.strengths}
              weaknesses={analysis.weaknesses}
              suggestions={analysis.suggestions}
            />
          </div>
        </div>
      )}
    </div>
  );
}
