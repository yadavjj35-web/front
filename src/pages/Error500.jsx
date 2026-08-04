import React from 'react';

export default function Error500() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">500 — Server error</h1>
      <p className="text-slate-500 mt-2">An unexpected error occurred. Try again later.</p>
    </div>
  );
}
