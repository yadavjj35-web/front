import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { useToast } from '../../components/Toast/ToastProvider';

export default function WooSettings() {
  const [cfg, setCfg] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    api.get(ENDPOINTS.profile).then((r) => setCfg(r.data.settings?.woo || {})).catch(() => setCfg({}));
  }, []);

  function save() {
    api.put(ENDPOINTS.profile, { settings: { woo: cfg } }).then(() => push({ title: 'Saved', message: 'WooCommerce settings saved' })).catch((err) => push({ title: 'Error', message: err.message }));
  }

  if (!cfg) return <div className="card">Loading...</div>;

  return (
    <div className="space-y-3">
      <Input label="API Base URL" value={cfg.baseUrl || ''} onChange={(e) => setCfg((c) => ({ ...c, baseUrl: e.target.value }))} />
      <Input label="Consumer Key" value={cfg.key || ''} onChange={(e) => setCfg((c) => ({ ...c, key: e.target.value }))} />
      <Input label="Consumer Secret" value={cfg.secret || ''} onChange={(e) => setCfg((c) => ({ ...c, secret: e.target.value }))} />
      <div className="mt-3">
        <Button onClick={save}>Save</Button>
      </div>
    </div>
  );
}
