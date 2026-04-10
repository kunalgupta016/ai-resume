import { useState, useEffect } from 'react';
import { Clock, FileText, MessageSquare, Trash2, Trophy } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { getResumeHistory, getInterviewHistory, deleteResumeHistory, deleteInterviewHistory } from '../services/api';

export default function History() {
  const [activeTab, setActiveTab] = useState('resumes');
  const [resumes, setResumes] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const [resumeRes, interviewRes] = await Promise.all([
        getResumeHistory(),
        getInterviewHistory()
      ]);
      setResumes(resumeRes.data);
      setInterviews(interviewRes.data);
    } catch (err) {
      setError('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResume = async (id) => {
    try {
      await deleteResumeHistory(id);
      setResumes(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      setError('Failed to delete');
    }
  };

  const handleDeleteInterview = async (id) => {
    try {
      await deleteInterviewHistory(id);
      setInterviews(prev => prev.filter(i => i._id !== id));
    } catch (err) {
      setError('Failed to delete');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (s, max = 100) => {
    const pct = (s / max) * 100;
    if (pct >= 80) return 'text-success bg-success/10';
    if (pct >= 60) return 'text-primary-500 bg-primary-500/10';
    if (pct >= 40) return 'text-warning bg-warning/10';
    return 'text-danger bg-danger/10';
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-surface-900 dark:text-white">
              History
            </h1>
            <p className="text-sm text-surface-500 dark:text-surface-400">
              View your past resume analyses and interview attempts
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-surface-100 dark:bg-surface-800 w-fit mb-6">
        <button
          onClick={() => setActiveTab('resumes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${activeTab === 'resumes'
              ? 'bg-white dark:bg-surface-700 shadow-sm text-surface-900 dark:text-white'
              : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
            }`}
        >
          <FileText className="w-4 h-4" />
          Resumes ({resumes.length})
        </button>
        <button
          onClick={() => setActiveTab('interviews')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${activeTab === 'interviews'
              ? 'bg-white dark:bg-surface-700 shadow-sm text-surface-900 dark:text-white'
              : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
            }`}
        >
          <MessageSquare className="w-4 h-4" />
          Interviews ({interviews.length})
        </button>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchHistory} />}

      {loading ? (
        <LoadingSpinner text="Loading history..." />
      ) : (
        <div className="space-y-3 animate-fade-in">
          {activeTab === 'resumes' && (
            resumes.length === 0 ? (
              <div className="card p-12 text-center">
                <FileText className="w-10 h-10 text-surface-300 dark:text-surface-600 mx-auto mb-3" />
                <p className="text-sm text-surface-400">No resume analyses yet</p>
              </div>
            ) : (
              resumes.map((r) => (
                <div key={r._id} className="card p-4 flex items-center gap-4 group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getScoreColor(r.score)} shrink-0`}>
                    <span className="text-lg font-bold">{r.score}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-900 dark:text-white truncate">
                      {r.fileName}
                    </p>
                    <p className="text-xs text-surface-400 mt-0.5">{formatDate(r.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-surface-400">
                      {r.strengths?.length || 0} strengths, {r.weaknesses?.length || 0} weaknesses
                    </span>
                    <button
                      onClick={() => handleDeleteResume(r._id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-surface-300 hover:text-danger hover:bg-danger/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )
          )}

          {activeTab === 'interviews' && (
            interviews.length === 0 ? (
              <div className="card p-12 text-center">
                <MessageSquare className="w-10 h-10 text-surface-300 dark:text-surface-600 mx-auto mb-3" />
                <p className="text-sm text-surface-400">No interview attempts yet</p>
              </div>
            ) : (
              interviews.map((i) => (
                <div key={i._id} className="card p-4 flex items-center gap-4 group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getScoreColor(i.overallScore)} shrink-0`}>
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-900 dark:text-white">
                      {i.jobRole}
                    </p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-surface-400">{formatDate(i.createdAt)}</span>
                      {i.completed && (
                        <span className="text-xs font-medium text-success">Completed</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-surface-400">
                      Score: {i.overallScore}% · {i.answers?.length || 0}/{i.questions?.length || 0} answered
                    </span>
                    <button
                      onClick={() => handleDeleteInterview(i._id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-surface-300 hover:text-danger hover:bg-danger/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      )}
    </div>
  );
}
