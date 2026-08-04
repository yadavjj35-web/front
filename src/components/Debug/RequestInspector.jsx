import React, { useState } from 'react';
import api from '../../services/api';
import Button from '../UI/Button';

export default function RequestInspector() {
  const [path, setPath] = useState('/api/');
  const [method, setMethod] = useState('GET');
  const [result, setResult] = useState(null);

  async function run() {
    try {
      const res = await api.request({ method, url: path });
      setResult({ ok: true, status: res.status, data: res.data });
    } catch (err) {
      setResult({ ok: false, error: err.message });
    }
  }

  return (
    <div className="card">
      <div className="flex gap-2 mb-2">
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="px-3 py-2 border rounded">
          <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
        </select>
        <input value={path} onChange={(e) => setPath(e.target.value)} className="flex-1 px-3 py-2 border rounded" />
        <Button onClick={run}>Run</Button>
      </div>
      <pre className="text-sm text-muted">{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
