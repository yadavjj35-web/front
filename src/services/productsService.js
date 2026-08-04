import api from './api';
import { ENDPOINTS } from '../constants/config';

export async function searchProducts(params = {}) {
  const res = await api.get(ENDPOINTS.products, { params });
  return res.data;
}

export async function getProduct(id) {
  const res = await api.get(`${ENDPOINTS.products}/${encodeURIComponent(id)}`);
  return res.data;
}
