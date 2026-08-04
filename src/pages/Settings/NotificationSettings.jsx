import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import Button from '../../components/UI/Button';
import { useToast } from '../../components/Toast/ToastProvider';

export default function NotificationSettings() {
  const [cfg, setCfg] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    api.get(ENDPOINTS.profile).then((r) => setCfg(r.data.settings?.notifications || {})).catch(() => setCfg({}));
  }, []);

  function save() {
    api.put(ENDPOINTS.profile, { settings: { notifications: cfg } }).then(() => push({ title: 'Saved', message: 'Notification settings saved' })).catch((err) => push({ title: 'Error', message: err.message }));
  }

  if (!cfg) return <div className="card">Loading...</div>;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={cfg.email || false} onChange={(e) => setCfg((c) => ({ ...c, email: e.target.checked }))} />
        <div>Email notifications</div>
      </div>
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={cfg.push || false} onChange={(e) => setCfg((c) => ({ ...c, push: e.target.checked }))} />
        <div>Push notifications</div>
      </div>
      <div className="mt-3">
        <Button onClick={save}>Save</Button>
      </div>
    </div>
  );
}
