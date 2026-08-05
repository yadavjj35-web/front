import React from 'react';
import { getUser } from '../../services/authService';

/**
 * RequireRole - small helper to conditionally render children based on roles
 * <RequireRole roles={['admin']}> ... </RequireRole>
 */
export default function RequireRole({ roles = [], children, fallback = null }) {
  const user = getUser();
  const allowed = !roles.length || (user && roles.includes(user.role));
  return allowed ? <>{children}</> : <>{fallback}</>;
}
