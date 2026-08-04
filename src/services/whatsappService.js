import api from './api';
import { ENDPOINTS } from '../constants/config';

export async function listConversations(params = {}) {
  const res = await api.get(ENDPOINTS.whatsapp, { params });
  return res.data;
}

export async function getConversation(contact) {
  const res = await api.get(`${ENDPOINTS.whatsapp}/convo/${encodeURIComponent(contact)}`);
  return res.data;
}

export async function sendMessage(payload) {
  const res = await api.post(`${ENDPOINTS.whatsapp}/send`, payload);
  return res.data;
}
