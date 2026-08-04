import api from './api';
import { ENDPOINTS } from '../constants/config';

export async function fetchAnalytics() {
  const res = await api.get(ENDPOINTS.analytics);
  return res.data;
}
