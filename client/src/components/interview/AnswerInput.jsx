import { useState } from 'react';
import { Send } from 'lucide-react';

export default function AnswerInput({ onSubmit, loading }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() && !loading) {
      onSubmit(answer.trim());
      setAnswer('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <div className="card overflow-hidden">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          rows={4}
          className="w-full p-4 bg-transparent border-0 text-sm text-surface-900 dark:text-white placeholder-surface-400 resize-none focus:ring-0 focus:outline-none"
        />
        <div className="flex items-center justify-between px-4 py-3 border-t border-surface-100 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-800/50">
          <span className="text-xs text-surface-400">
            {answer.length} characters
          </span>
          <button
            type="submit"
            disabled={!answer.trim() || loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Evaluating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Answer
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
