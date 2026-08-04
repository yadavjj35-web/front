import api from './api';
import { ENDPOINTS } from '../constants/config';

export async function listCustomers(params = {}) {
  const res = await api.get(ENDPOINTS.customers, { params });
  return res.data;
}

export async function getCustomer(id) {
  const res = await api.get(`${ENDPOINTS.customers}/${encodeURIComponent(id)}`);
  return res.data;
}
