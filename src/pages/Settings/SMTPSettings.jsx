import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { useToast } from '../../components/Toast/ToastProvider';

export default function SMTPSettings() {
  const [cfg, setCfg] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    api.get(ENDPOINTS.profile).then((r) => setCfg(r.data.settings?.smtp || {})).catch(() => setCfg({}));
  }, []);

  function save() {
    api.put(ENDPOINTS.profile, { settings: { smtp: cfg } }).then(() => push({ title: 'Saved', message: 'SMTP settings saved' })).catch((err) => push({ title: 'Error', message: err.message }));
  }

  if (!cfg) return <div className="card">Loading...</div>;

  return (
    <div className="space-y-3">
      <Input label="SMTP Host" value={cfg.host || ''} onChange={(e) => setCfg((c) => ({ ...c, host: e.target.value }))} />
      <Input label="SMTP Port" value={cfg.port || ''} onChange={(e) => setCfg((c) => ({ ...c, port: e.target.value }))} />
      <Input label="User" value={cfg.user || ''} onChange={(e) => setCfg((c) => ({ ...c, user: e.target.value }))} />
      <Input label="From Email" value={cfg.from || ''} onChange={(e) => setCfg((c) => ({ ...c, from: e.target.value }))} />
      <div className="mt-3">
        <Button onClick={save}>Save</Button>
      </div>
    </div>
  );
}
