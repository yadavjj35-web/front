import React from 'react';
import { getUser } from '../../services/authService';

/**
 * Simple permission wrapper. For production use, replace with a robust RBAC system.
 *
 * <Can roles={['admin','owner']}> ... </Can>
 */
export default function Can({ roles = [], children, fallback = null }) {
  const user = getUser();
  const allowed = !roles.length || (user && roles.includes(user.role));
  return allowed ? <>{children}</> : <>{fallback}</>;
}
