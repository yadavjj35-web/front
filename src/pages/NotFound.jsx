import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-2">Page not found</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-primary text-white rounded">
        Go Home
      </Link>
    </div>
  );
}
