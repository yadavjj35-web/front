import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { useToast } from '../../components/Toast/ToastProvider';

export default function RedisSettings() {
  const [cfg, setCfg] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    api.get(ENDPOINTS.profile).then((r) => setCfg(r.data.settings?.redis || {})).catch(() => setCfg({}));
  }, []);

  function save() {
    api.put(ENDPOINTS.profile, { settings: { redis: cfg } }).then(() => push({ title: 'Saved', message: 'Redis settings saved' })).catch((err) => push({ title: 'Error', message: err.message }));
  }

  if (!cfg) return <div className="card">Loading...</div>;

  return (
    <div className="space-y-3">
      <Input label="Redis URL" value={cfg.url || ''} onChange={(e) => setCfg((c) => ({ ...c, url: e.target.value }))} />
      <Input label="Password (optional)" value={cfg.password || ''} onChange={(e) => setCfg((c) => ({ ...c, password: e.target.value }))} />
      <div className="mt-3">
        <Button onClick={save}>Save</Button>
      </div>
    </div>
  );
}
