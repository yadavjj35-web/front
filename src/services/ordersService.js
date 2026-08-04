import api from './api';
import { ENDPOINTS } from '../constants/config';

export async function listOrders(params = {}) {
  const res = await api.get(ENDPOINTS.orders, { params });
  return res.data;
}

export async function getOrder(id) {
  const res = await api.get(`${ENDPOINTS.orders}/${encodeURIComponent(id)}`);
  return res.data;
}
