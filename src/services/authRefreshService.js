import api from './api';
import { ENDPOINTS } from '../constants/config';
import { setToken } from './authService';

/**
 * Attempts to refresh JWT using backend refresh endpoint.
 * Returns new token or throws.
 */
export async function refreshSession() {
  const refreshPath = ENDPOINTS.auth.refresh || `${ENDPOINTS.auth.login.replace('/login', '')}/refresh`;
  const res = await api.post(refreshPath).catch((err) => {
    throw err;
  });
  if (res?.data?.token) {
    setToken(res.data.token);
    return res.data.token;
  }
  throw new Error('Invalid refresh response');
}
