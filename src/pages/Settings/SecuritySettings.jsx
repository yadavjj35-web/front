import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { useToast } from '../../components/Toast/ToastProvider';

export default function SecuritySettings() {
  const [cfg, setCfg] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    api.get(ENDPOINTS.profile).then((r) => setCfg(r.data.settings?.security || {})).catch(() => setCfg({}));
  }, []);

  function save() {
    api.put(ENDPOINTS.profile, { settings: { security: cfg } }).then(() => push({ title: 'Saved', message: 'Security settings saved' })).catch((err) => push({ title: 'Error', message: err.message }));
  }

  if (!cfg) return <div className="card">Loading...</div>;

  return (
    <div className="space-y-3">
      <Input label="Allowed IPs (comma separated)" value={cfg.allowedIps || ''} onChange={(e) => setCfg((c) => ({ ...c, allowedIps: e.target.value }))} />
      <Input label="Session Timeout (minutes)" value={cfg.sessionTimeout || 60} onChange={(e) => setCfg((c) => ({ ...c, sessionTimeout: Number(e.target.value) }))} />
      <div className="mt-3">
        <Button onClick={save}>Save</Button>
      </div>
    </div>
  );
}
