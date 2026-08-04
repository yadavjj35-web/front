import api from './api';
import { ENDPOINTS } from '../constants/config';

export async function listWorkflows(params = {}) {
  const res = await api.get(ENDPOINTS.workflows, { params });
  return res.data;
}

export async function getWorkflow(workflowId) {
  const res = await api.get(`${ENDPOINTS.workflows}/${encodeURIComponent(workflowId)}`);
  return res.data;
}

export async function createWorkflow(payload) {
  const res = await api.post(ENDPOINTS.workflows, payload);
  return res.data;
}
