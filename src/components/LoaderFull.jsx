import React from 'react';

export default function LoaderFull({ message = 'Loading...' }) {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto" />
        <div className="mt-3 text-sm text-muted">{message}</div>
      </div>
    </div>
  );
}
