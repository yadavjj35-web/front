import React, { useState } from 'react';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast/ToastProvider';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { forgot } = useAuth();
  const { push } = useToast();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await forgot(email);
      push({ title: 'Email sent', message: 'Check your inbox for reset instructions' });
      navigate('/login');
    } catch (err) {
      push({ title: 'Error', message: err.message });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-6 rounded-md shadow">
        <h3 className="text-xl font-semibold mb-4">Forgot password</h3>
        <form onSubmit={submit} className="space-y-4">
          <Input id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit">Send reset link</Button>
        </form>
      </div>
    </div>
  );
}
