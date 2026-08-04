import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { useToast } from '../../components/Toast/ToastProvider';

export default function AiSettings() {
  const [settings, setSettings] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    api.get(ENDPOINTS.profile).then((r) => setSettings(r.data.settings?.ai || {})).catch(() => setSettings({}));
  }, []);

  function save() {
    api.put(ENDPOINTS.profile, { settings: { ai: settings } }).then(() => push({ title: 'Saved', message: 'AI settings saved' })).catch((err) => push({ title: 'Error', message: err.message }));
  }

  if (!settings) return <div className="card">Loading...</div>;

  return (
    <div className="space-y-3">
      <Input label="Default Model" value={settings.defaultModel || ''} onChange={(e) => setSettings((s) => ({ ...s, defaultModel: e.target.value }))} />
      <Input label="Token Limit" value={settings.tokenLimit || 1000} onChange={(e) => setSettings((s) => ({ ...s, tokenLimit: Number(e.target.value) }))} />
      <div className="mt-3">
        <Button onClick={save}>Save AI Settings</Button>
      </div>
    </div>
  );
}
