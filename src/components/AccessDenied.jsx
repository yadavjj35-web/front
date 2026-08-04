import React from 'react';
import { Link } from 'react-router-dom';

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Access Denied</h1>
        <p className="mt-2 text-muted">You do not have permission to view this page.</p>
        <Link to="/" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded">Back to Dashboard</Link>
      </div>
    </div>
  );
}
