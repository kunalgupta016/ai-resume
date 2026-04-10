import { useEffect, useState } from 'react';

export default function ScoreCard({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = 1200;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - pct, 3);
      setAnimatedScore(Math.round(start + (end - start) * eased));
      if (pct < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [score]);

  const getColor = (s) => {
    if (s >= 80) return { stroke: '#10b981', bg: 'bg-success/10', text: 'text-success', label: 'Excellent' };
    if (s >= 60) return { stroke: '#6366f1', bg: 'bg-primary-500/10', text: 'text-primary-500', label: 'Good' };
    if (s >= 40) return { stroke: '#f59e0b', bg: 'bg-warning/10', text: 'text-warning', label: 'Average' };
    return { stroke: '#ef4444', bg: 'bg-danger/10', text: 'text-danger', label: 'Needs Work' };
  };

  const colors = getColor(score);

  return (
    <div className="card p-6 animate-scale-in">
      <div className="flex flex-col items-center gap-4">
        {/* Score ring */}
        <div className="relative w-36 h-36">
          <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
            {/* Background ring */}
            <circle
              cx="60" cy="60" r={radius}
              fill="none"
              strokeWidth="8"
              className="stroke-surface-100 dark:stroke-surface-700"
            />
            {/* Progress ring */}
            <circle
              cx="60" cy="60" r={radius}
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              stroke={colors.stroke}
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              className="score-ring"
              style={{ filter: `drop-shadow(0 0 6px ${colors.stroke}40)` }}
            />
          </svg>
          {/* Score number */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${colors.text}`}>
              {animatedScore}
            </span>
            <span className="text-xs text-surface-400 font-medium">out of 100</span>
          </div>
        </div>

        {/* Label */}
        <div className={`inline-flex items-center px-3 py-1.5 rounded-lg ${colors.bg}`}>
          <span className={`text-sm font-semibold ${colors.text}`}>
            {colors.label}
          </span>
        </div>
      </div>
    </div>
  );
}
