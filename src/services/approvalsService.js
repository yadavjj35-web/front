import api from './api';
import { ENDPOINTS } from '../constants/config';

export async function listApprovals(params = {}) {
  const res = await api.get(ENDPOINTS.approvals, { params });
  return res.data;
}

export async function decideApproval(id, decision, notes) {
  const res = await api.post(`${ENDPOINTS.approvals}/${encodeURIComponent(id)}/decide`, { decision, notes });
  return res.data;
}
