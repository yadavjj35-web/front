import React from 'react';
// import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // Production code
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  // Temporary: Allow access without login
  return children;
}
