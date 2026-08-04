import api from './api';
import { ENDPOINTS } from '../constants/config';

export async function fetchLogs(params = {}) {
  const res = await api.get(ENDPOINTS.logs, { params });
  return res.data;
}
