import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted">
      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150" />
      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-300" />
    </div>
  );
}
