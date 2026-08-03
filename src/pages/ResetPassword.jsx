import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast/ToastProvider';

export default function ResetPassword() {
  const { token } = useParams();
  const { reset } = useAuth();
  const { push } = useToast();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await reset(token, password);
      push({ title: 'Success', message: 'Password reset, please login' });
      navigate('/login');
    } catch (err) {
      push({ title: 'Error', message: err.message });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-6 rounded-md shadow">
        <h3 className="text-xl font-semibold mb-4">Reset password</h3>
        <form onSubmit={submit} className="space-y-4">
          <Input id="password" label="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit">Reset password</Button>
        </form>
      </div>
    </div>
  );
}
