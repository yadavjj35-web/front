import api from './api';
import { ENDPOINTS } from '../constants/config';

export async function listWorkflowRuns(params = {}) {
  const res = await api.get(`${ENDPOINTS.workflows}/runs`, { params });
  return res.data;
}

export async function getWorkflowRun(id) {
  const res = await api.get(`${ENDPOINTS.workflows}/runs/${encodeURIComponent(id)}`);
  return res.data;
}

export async function cancelWorkflowRun(id) {
  const res = await api.post(`${ENDPOINTS.workflows}/runs/${encodeURIComponent(id)}/cancel`);
  return res.data;
}
