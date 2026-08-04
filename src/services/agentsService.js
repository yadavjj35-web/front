import api from './api';
import { ENDPOINTS } from '../constants/config';

export async function fetchAgents() {
  const res = await api.get(ENDPOINTS.agents);
  return res.data;
}

export async function fetchAgentStatus(name) {
  const res = await api.get(`${ENDPOINTS.agentsStatus}/${encodeURIComponent(name)}`);
  return res.data;
}
