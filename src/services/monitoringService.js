import api from './api';
import { ENDPOINTS } from '../constants/config';

export async function fetchHealth() {
  const res = await api.get(ENDPOINTS.monitoring);
  return res.data;
}
