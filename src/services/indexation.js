// utility wrappers for services that might be added later - placeholder for completeness
import api from './api';

export async function ping() {
  const res = await api.get('/api/ping');
  return res.data;
}
