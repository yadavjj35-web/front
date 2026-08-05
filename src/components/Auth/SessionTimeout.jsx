import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { getToken, clearAuth, setToken } from '../../services/authService';
import Modal from '../Modal';
import Button from '../UI/Button';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import { useToast } from '../Toast/ToastProvider';

/**
 * SessionTimeout - warns user before token expiry and offers refresh if backend supports refresh endpoint.
 * Assumes token is JWT containing exp (seconds).
 */

export default function SessionTimeout() {
  const [show, setShow] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    let mounted = true;
    let timer;
    function compute() {
      const token = getToken();
      if (!token) {
        setSecondsLeft(null);
        setShow(false);
        return;
      }
      try {
        const { exp } = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);
        const left = Math.max(0, exp - now);
        if (!mounted) return;
        setSecondsLeft(left);
        if (left <= 60) setShow(true);
        else setShow(false);
      } catch {
        setSecondsLeft(null);
        setShow(false);
      }
    }
    compute();
    timer = setInterval(compute, 5000);
    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  async function refresh() {
    try {
      // try refresh endpoint if available
      const res = await api.post(ENDPOINTS.auth.refresh || `${ENDPOINTS.auth.login.replace('/login', '')}/refresh`);
      if (res?.data?.token) {
        setToken(res.data.token);
        push({ title: 'Session refreshed', message: 'Your session has been extended' });
        setShow(false);
      } else {
        throw new Error('No token in response');
      }
    } catch (err) {
      clearAuth();
      push({ title: 'Session expired', message: 'Please login again' });
      window.location.href = '/login';
    }
  }

  if (!show) return null;

  return (
    <Modal open={show} onClose={() => {}}>
      <div>
        <h4 className="font-semibold">Session expiring</h4>
        <div className="text-sm text-muted mt-2">Your session will expire in {secondsLeft} seconds.</div>
        <div className="mt-3 flex gap-2 justify-end">
          <Button onClick={refresh}>Refresh Session</Button>
          <Button className="bg-red-600" onClick={() => { clearAuth(); window.location.href = '/login'; }}>Sign Out</Button>
        </div>
      </div>
    </Modal>
  );
}
