import { useState, useRef } from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';

export default function ResumeUpload({ onUpload, loading }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (f) => {
    if (!f) return false;
    if (f.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return false;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB');
      return false;
    }
    setError('');
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files[0];
    if (validateFile(f)) {
      setFile(f);
    }
  };

  const handleChange = (e) => {
    const f = e.target.files[0];
    if (validateFile(f)) {
      setFile(f);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleSubmit = () => {
    if (file && !loading) {
      onUpload(file);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Drop zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !file && inputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 p-8
          ${dragActive
            ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-500/5 scale-[1.01]'
            : file
              ? 'border-success/40 bg-success/5 dark:bg-success/5'
              : 'border-surface-300 dark:border-surface-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-surface-50/50 dark:hover:bg-surface-800/50'
          }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          onChange={handleChange}
          className="hidden"
        />

        {!file ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              dragActive
                ? 'bg-primary-100 dark:bg-primary-500/20'
                : 'bg-surface-100 dark:bg-surface-800'
            }`}>
              <Upload className={`w-6 h-6 transition-colors ${
                dragActive ? 'text-primary-500' : 'text-surface-400'
              }`} />
            </div>
            <div>
              <p className="text-sm font-semibold text-surface-700 dark:text-surface-300">
                Drop your resume here, or{' '}
                <span className="text-primary-600 dark:text-primary-400">browse</span>
              </p>
              <p className="text-xs text-surface-400 mt-1">
                PDF only, up to 5MB
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-success" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-surface-900 dark:text-white truncate">
                {file.name}
              </p>
              <p className="text-xs text-surface-400">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleRemove(); }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-surface-400 hover:text-danger hover:bg-danger/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-danger">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Analyze button */}
      {file && (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 w-full py-3 px-6 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold text-sm shadow-lg shadow-primary-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing Resume...
            </span>
          ) : (
            'Analyze Resume with AI'
          )}
        </button>
      )}
    </div>
  );
}
