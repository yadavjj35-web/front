import React from 'react';

export default function Offline() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">You are offline</h1>
      <p className="text-slate-500 mt-2">Some features may be unavailable. Check your connection.</p>
    </div>
  );
}
