import React from 'react';

export function Skeleton({ className = 'h-6 w-full bg-slate-200 dark:bg-slate-700 rounded' }) {
  return <div className={`animate-pulse ${className}`} />;
}
