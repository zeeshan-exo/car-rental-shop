import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  /** Controls whether the loading overlay is shown */
  isVisible?: boolean;
  /** Optional custom message to display */
  message?: string;
  /** Whether the loader should cover the full screen or just its parent container */
  fullScreen?: boolean;
  /** Whether the background should be transparent */
  transparent?: boolean;
  /** Loading variant: 'default', 'minimal', or 'progress' */
  variant?: 'default' | 'minimal' | 'progress';
  /** Progress percentage (0-100) when variant is 'progress' */
  progress?: number;
}

const Loading = ({
  isVisible = true,
  message = "Loading...",
  fullScreen = true,
  transparent = false,
  variant = 'default',
  progress = 0
}: LoadingProps) => {
  if (!isVisible) return null;

  const containerClasses = fullScreen
    ? "fixed inset-0 z-50"
    : "absolute inset-0 z-10";

  const backgroundClasses = transparent
    ? "bg-transparent backdrop-blur-sm"
    : "bg-black/40 backdrop-blur-[2px]";

  // For minimal variant
  if (variant === 'minimal') {
    return (
      <div className={`${containerClasses} ${backgroundClasses} flex items-center justify-center`}>
        <div className="bg-white/90 p-3 rounded-full shadow-lg">
          <Loader2 className="h-6 w-6 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  // For progress variant
  if (variant === 'progress') {
    const clampedProgress = Math.max(0, Math.min(100, progress));
    
    return (
      <div className={`${containerClasses} ${backgroundClasses} flex items-center justify-center`}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-64 flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-gray-700 font-medium">{message}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${clampedProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">{clampedProgress}%</p>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`${containerClasses} ${backgroundClasses} flex items-center justify-center transition-opacity duration-200`}>
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-3 max-w-xs mx-auto w-full animate-fadeIn">
        <div className="relative">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <div className="absolute inset-0 h-10 w-10 rounded-full border-t-2 border-primary opacity-20"></div>
        </div>
        <p className="text-gray-700 font-medium text-center">{message}</p>
      </div>
    </div>
  );
};

// Add these animations to your global CSS or Tailwind config
// @keyframes fadeIn {
//   from { opacity: 0; transform: scale(0.95); }
//   to { opacity: 1; transform: scale(1); }
// }
// .animate-fadeIn { animation: fadeIn 0.2s ease-out; }

export default Loading;