import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast/ToastProvider';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { push } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.ok) {
      push({ title: 'Welcome', message: 'Logged in successfully' });
      navigate('/');
    } else {
      push({ title: 'Login failed', message: res.error || 'Invalid credentials' });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-6 rounded-md shadow">
        <h2 className="text-2xl font-semibold mb-4">Sign in to WA‑AI</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="flex items-center justify-between">
            <a className="text-sm text-primary" href="/forgot">
              Forgot password?
            </a>
            <Button type="submit" className="ml-2" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
        </form>
        <div className="text-sm text-slate-500 mt-4">Need help? Contact your administrator.</div>
      </div>
    </div>
  );
}
