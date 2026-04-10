import { useState } from 'react';
import { CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

const tabs = [
  { id: 'strengths', label: 'Strengths', icon: CheckCircle, color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
  { id: 'weaknesses', label: 'Weaknesses', icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
  { id: 'suggestions', label: 'Suggestions', icon: Lightbulb, color: 'text-primary-500', bg: 'bg-primary-500/10', border: 'border-primary-500/20' },
];

export default function AnalysisResults({ strengths, weaknesses, suggestions }) {
  const [activeTab, setActiveTab] = useState('strengths');

  const data = { strengths, weaknesses, suggestions };
  const currentTab = tabs.find(t => t.id === activeTab);
  const items = data[activeTab] || [];

  return (
    <div className="card overflow-hidden animate-fade-in">
      {/* Tabs */}
      <div className="flex border-b border-surface-100 dark:border-surface-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all duration-200 relative
              ${activeTab === tab.id
                ? `${tab.color}`
                : 'text-surface-400 hover:text-surface-600 dark:hover:text-surface-300'
              }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
            {activeTab === tab.id && (
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-current rounded-full`} />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5 stagger-children">
        {items.length === 0 ? (
          <p className="text-sm text-surface-400 text-center py-4">No items to display</p>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3.5 rounded-xl ${currentTab.bg} border ${currentTab.border} transition-all duration-200 hover:scale-[1.01]`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${currentTab.bg}`}>
                  <span className={`text-xs font-bold ${currentTab.color}`}>{index + 1}</span>
                </div>
                <p className="text-sm text-surface-700 dark:text-surface-300 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
