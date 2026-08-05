import api from './api';
import { ENDPOINTS } from '../constants/config';

export async function pingService() {
  // Try a dedicated health endpoint if available
  const url = ENDPOINTS.health || `${ENDPOINTS.profile.replace(/\/$/, '')}/health`;
  const res = await api.get(url);
  return res.data;
}
