import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * ProtectedRoleRoute - enforces authentication and role-based access.
 * Usage:
 *  <ProtectedRoleRoute roles={['admin','owner']}>
 *    <SomeComponent />
 *  </ProtectedRoleRoute>
 *
 * If user is not authenticated, redirects to /login.
 * If user lacks role, shows Access Denied (or redirects).
 */

export default function ProtectedRoleRoute({ children, roles = [], fallbackTo = '/access-denied' }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to={fallbackTo} replace />;
  }

  return children;
}
