import React, { useState, useEffect } from 'react';
import Button from '../components/UI/Button';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';
import { useToast } from '../components/Toast/ToastProvider';

/**
 * DevTools page - safe utilities for debugging, ping, and lightweight health checks.
 * This page is intended for admin/developer users only and should be gated by RBAC in production.
 */

export default function DevTools() {
  const [pingResult, setPingResult] = useState(null);
  const [logsResult, setLogsResult] = useState(null);
  const [loadingPing, setLoadingPing] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const { push } = useToast();

  useEffect(() => {
    // no-op
  }, []);

  async function doPing() {
    setPingResult(null);
    setLoadingPing(true);
    try {
      const r = await api.get(`${ENDPOINTS.profile}/ping`).catch(async (err) => {
        // fallback: try root API ping
        return api.get('/api/ping').catch(() => { throw err; });
      });
      setPingResult(r.data || r);
      push({ title: 'Ping successful', message: 'Backend reachable' });
    } catch (err) {
      setPingResult({ error: true, message: err.message || 'Ping failed' });
      push({ title: 'Ping failed', message: err.message || 'Check backend' });
    } finally {
      setLoadingPing(false);
    }
  }

  async function fetchRecentLogs() {
    setLogsResult(null);
    setLoadingLogs(true);
    try {
      const r = await api.get(ENDPOINTS.logs, { params: { limit: 20 } });
      setLogsResult(r.data.logs || r.data || []);
    } catch (err) {
      setLogsResult({ error: true, message: err.message });
      push({ title: 'Logs failed', message: err.message || 'Failed to fetch logs' });
    } finally {
      setLoadingLogs(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Developer Tools</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Ping Backend</h4>
              <div className="text-sm text-muted">Lightweight health check to backend API</div>
            </div>
            <Button onClick={doPing} disabled={loadingPing}>{loadingPing ? 'Pinging...' : 'Ping'}</Button>
          </div>

          <div className="mt-4">
            {loadingPing ? <Skeleton className="h-12" /> : (
              <pre className="text-sm text-muted whitespace-pre-wrap">{JSON.stringify(pingResult, null, 2) || 'No results yet'}</pre>
            )}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Recent Logs</h4>
              <div className="text-sm text-muted">Fetch recent server logs for debugging</div>
            </div>
            <Button onClick={fetchRecentLogs} disabled={loadingLogs}>{loadingLogs ? 'Loading...' : 'Fetch'}</Button>
          </div>

          <div className="mt-4">
            {loadingLogs ? <Skeleton className="h-32" /> : (
              <div className="max-h-56 overflow-auto">
                {Array.isArray(logsResult) ? (
                  logsResult.map((l) => (
                    <div key={l._id || Math.random()} className="py-2 border-b dark:border-slate-700">
                      <div className="text-sm font-medium">{l.action || l.level}</div>
                      <div className="text-xs text-muted">{new Date(l.createdAt || Date.now()).toLocaleString()}</div>
                      <div className="text-xs mt-1">{JSON.stringify(l.details || l.message || '', null, 2)}</div>
                    </div>
                  ))
                ) : (
                  <pre className="text-sm text-muted">{JSON.stringify(logsResult, null, 2)}</pre>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 card">
        <h4 className="font-semibold">Direct REST Explorer</h4>
        <DevRequestForm />
      </div>
    </div>
  );
}

function DevRequestForm() {
  const [method, setMethod] = useState('GET');
  const [path, setPath] = useState('/api/');
  const [body, setBody] = useState('{}');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { push } = useToast();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const cfg = { method, url: path };
      if (method !== 'GET' && body) {
        try {
          cfg.data = JSON.parse(body);
        } catch (err) {
          push({ title: 'JSON error', message: 'Request body must be valid JSON' });
          setLoading(false);
          return;
        }
      }
      const res = await api.request(cfg);
      setResult({ status: res.status, data: res.data });
    } catch (err) {
      setResult({ error: true, message: err.response?.data || err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="flex gap-2">
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="px-3 py-2 border rounded">
          <option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option>
        </select>
        <input value={path} onChange={(e) => setPath(e.target.value)} className="flex-1 px-3 py-2 border rounded" />
        <Button type="submit" disabled={loading}>{loading ? 'Running...' : 'Run'}</Button>
      </div>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} className="w-full h-28 px-3 py-2 border rounded" />
      <div>
        <div className="font-semibold">Result</div>
        <pre className="mt-2 text-sm text-muted">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </form>
  );
}
