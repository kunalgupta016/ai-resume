import { useState } from 'react';
import { Star, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FeedbackCard({ score, feedback, betterAnswer, onNext, isLast }) {
  const [expanded, setExpanded] = useState(false);

  const getScoreColor = (s) => {
    if (s >= 8) return 'text-success';
    if (s >= 5) return 'text-warning';
    return 'text-danger';
  };

  const getScoreBg = (s) => {
    if (s >= 8) return 'bg-success/10';
    if (s >= 5) return 'bg-warning/10';
    return 'bg-danger/10';
  };

  return (
    <div className="card p-6 animate-scale-in space-y-4">
      {/* Score */}
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl ${getScoreBg(score)} flex items-center justify-center`}>
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-surface-900 dark:text-white">
            Score: {score}/10
          </p>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < score ? 'text-warning fill-warning' : 'text-surface-200 dark:text-surface-700'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50 border border-surface-100 dark:border-surface-700">
        <div className="flex items-start gap-3">
          <MessageCircle className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
          <p className="text-sm text-surface-700 dark:text-surface-300 leading-relaxed">
            {feedback}
          </p>
        </div>
      </div>

      {/* Better answer */}
      {betterAnswer && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {expanded ? 'Hide' : 'Show'} suggested answer
          </button>
          {expanded && (
            <div className="mt-3 p-4 rounded-xl bg-primary-50/50 dark:bg-primary-500/5 border border-primary-100 dark:border-primary-500/10 animate-fade-in">
              <p className="text-sm text-surface-700 dark:text-surface-300 leading-relaxed">
                {betterAnswer}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Next question */}
      <button
        onClick={onNext}
        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold text-sm shadow-lg shadow-primary-500/25 transition-all duration-200 active:scale-[0.98]"
      >
        {isLast ? 'Finish Interview' : 'Next Question →'}
      </button>
    </div>
  );
}
