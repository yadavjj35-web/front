import React from 'react';

export default function LoadingSpinner({ size = 6 }) {
  return (
    <div className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-primary`} />
  );
}
