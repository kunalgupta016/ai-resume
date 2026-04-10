import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="animate-fade-in card p-6 border-danger/20 bg-danger/5 dark:bg-danger/10">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-danger mt-0.5 shrink-0" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-danger mb-1">Something went wrong</h4>
          <p className="text-sm text-surface-600 dark:text-surface-400">
            {message || 'An unexpected error occurred. Please try again.'}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
