import axios from 'axios';
import { API_BASE_URL } from '../constants/config';
import { getToken, clearAuth } from './authService';

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use((cfg) => {
  const token = getToken();
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // unauthorized - clear local auth (JWT invalid/expired)
      clearAuth();
      // reload to redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default instance;
