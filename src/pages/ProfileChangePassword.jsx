import React, { useState } from 'react';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { useToast } from '../components/Toast/ToastProvider';

export default function ProfileChangePassword() {
  const [current, setCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const { push } = useToast();

  async function submit(e) {
    e.preventDefault();
    if (password !== confirm) return push({ title: 'Validation', message: 'Passwords do not match' });
    try {
      await api.post(`${ENDPOINTS.profile}/change-password`, { current, password });
      push({ title: 'Success', message: 'Password changed' });
      setCurrent(''); setPassword(''); setConfirm('');
    } catch (err) {
      push({ title: 'Error', message: err.response?.data?.message || err.message });
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Change Password</h2>
      <form onSubmit={submit} className="max-w-md space-y-3">
        <Input id="current" label="Current password" type="password" value={current} onChange={(e) => setCurrent(e.target.value)} />
        <Input id="password" label="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input id="confirm" label="Confirm new password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <Button type="submit">Update Password</Button>
      </form>
    </div>
  );
}
