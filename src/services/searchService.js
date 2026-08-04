import api from './api';
import { ENDPOINTS } from '../constants/config';

/**
 * searchService - centralized search wrapper
 * backend should expose a search endpoint or you may set ENDPOINTS.search to the proper path
 */
export async function globalSearch(q, params = {}) {
  const path = ENDPOINTS.search || `${ENDPOINTS.profile.replace(/\/$/, '')}/search`;
  const res = await api.get(path, { params: { q, ...params } });
  return res.data;
}
