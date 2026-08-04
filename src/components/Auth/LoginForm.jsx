import React, { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../Toast/ToastProvider';

export default function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { push } = useToast();
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.ok) {
        push({ title: 'Welcome', message: 'Logged in' });
        onSuccess && onSuccess();
      } else {
        push({ title: 'Login failed', message: res.error || 'Invalid credentials' });
      }
    } catch (err) {
      push({ title: 'Error', message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="max-w-md">
      <Input id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="mt-3">
        <Button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
      </div>
    </form>
  );
}
