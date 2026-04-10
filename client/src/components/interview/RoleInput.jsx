import { useState } from 'react';
import { Briefcase, Sparkles } from 'lucide-react';

const suggestedRoles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Scientist',
  'DevOps Engineer',
  'Product Manager',
  'UI/UX Designer',
  'Mobile Developer',
];

export default function RoleInput({ onSubmit, loading }) {
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role.trim() && !loading) {
      onSubmit(role.trim());
    }
  };

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Input */}
        <div className="relative">
          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter the job role (e.g. Frontend Developer)"
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-sm text-surface-900 dark:text-white placeholder-surface-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
          />
        </div>

        {/* Suggested roles */}
        <div>
          <p className="text-xs font-medium text-surface-400 mb-2.5 uppercase tracking-wider">
            Popular Roles
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedRoles.map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setRole(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                  ${role === r
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!role.trim() || loading}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold text-sm shadow-lg shadow-primary-500/25 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating Questions...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Interview Questions
            </>
          )}
        </button>
      </form>
    </div>
  );
}
