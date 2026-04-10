import { Zap, BarChart3, Flame } from 'lucide-react';

const difficultyConfig = {
  easy: { icon: Zap, color: 'text-success', bg: 'bg-success/10', label: 'Easy' },
  medium: { icon: BarChart3, color: 'text-warning', bg: 'bg-warning/10', label: 'Medium' },
  hard: { icon: Flame, color: 'text-danger', bg: 'bg-danger/10', label: 'Hard' },
};

export default function QuestionCard({ question, difficulty, currentIndex, total }) {
  const config = difficultyConfig[difficulty] || difficultyConfig.easy;
  const Icon = config.icon;

  return (
    <div className="card p-6 animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${config.bg}`}>
          <Icon className={`w-3.5 h-3.5 ${config.color}`} />
          <span className={`text-xs font-semibold ${config.color}`}>{config.label}</span>
        </div>
        <span className="text-xs font-medium text-surface-400">
          Question {currentIndex + 1} of {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-surface-100 dark:bg-surface-700 rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      {/* Question */}
      <p className="text-base font-medium text-surface-900 dark:text-white leading-relaxed">
        {question}
      </p>
    </div>
  );
}
