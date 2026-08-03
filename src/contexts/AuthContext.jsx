import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { getToken, setToken, clearAuth, setUser, getUser } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(getUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Optionally fetch profile if token exists
    async function loadProfile() {
      const token = getToken();
      if (!token) return;
      try {
        const { data } = await api.get(ENDPOINTS.profile);
        setUserState(data.user);
        setUser(data.user);
      } catch {
        clearAuth();
      }
    }
    loadProfile();
  }, []);

  async function login(email, password) {
    setLoading(true);
    try {
      const res = await api.post(ENDPOINTS.auth.login, { email, password });
      const { token, user: u } = res.data;
      setToken(token);
      setUser(u);
      setUserState(u);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data?.message || err.message };
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await api.post(ENDPOINTS.auth.logout).catch(() => {});
    } finally {
      clearAuth();
      setUserState(null);
      window.location.href = '/login';
    }
  }

  async function forgot(email) {
    const res = await api.post(ENDPOINTS.auth.forgot, { email });
    return res.data;
  }

  async function reset(token, password) {
    const res = await api.post(ENDPOINTS.auth.reset, { token, password });
    return res.data;
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, forgot, reset }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
