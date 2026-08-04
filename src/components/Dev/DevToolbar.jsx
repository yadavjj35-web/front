import React from 'react';
import Button from '../UI/Button';
import { useToast } from '../Toast/ToastProvider';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';

export default function DevToolbar() {
  const { push } = useToast();

  async function clearCache() {
    try {
      await api.post(`${ENDPOINTS.profile}/dev/clear-cache`);
      push({ title: 'Cleared', message: 'Server cache cleared' });
    } catch (err) {
      push({ title: 'Error', message: err.message });
    }
  }

  async function simulateLoad() {
    try {
      await api.post(`${ENDPOINTS.profile}/dev/simulate-load`);
      push({ title: 'Simulate', message: 'Load simulation triggered' });
    } catch (err) {
      push({ title: 'Error', message: err.message });
    }
  }

  return (
    <div className="flex gap-2">
      <Button onClick={clearCache}>Clear Cache</Button>
      <Button onClick={simulateLoad}>Simulate Load</Button>
    </div>
  );
}
