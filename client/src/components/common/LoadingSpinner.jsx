export default function LoadingSpinner({ text = 'Loading...', size = 'default' }) {
  const dotSize = size === 'small' ? 'w-2 h-2' : 'w-3 h-3';
  
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="flex gap-2">
        <div className={`${dotSize} rounded-full bg-primary-500 loading-dot`}></div>
        <div className={`${dotSize} rounded-full bg-primary-400 loading-dot`}></div>
        <div className={`${dotSize} rounded-full bg-primary-300 loading-dot`}></div>
      </div>
      {text && (
        <p className="text-sm text-surface-500 dark:text-surface-400 font-medium">
          {text}
        </p>
      )}
    </div>
  );
}
