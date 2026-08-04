import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { useToast } from '../Toast/ToastProvider';

export default function SettingsForm() {
  const [settings, setSettings] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    api.get(ENDPOINTS.profile).then((r) => setSettings(r.data.settings || {})).catch(() => setSettings({}));
  }, []);

  function save() {
    api.put(ENDPOINTS.profile, { settings }).then(() => push({ title: 'Saved', message: 'Settings saved' })).catch((err) => push({ title: 'Error', message: err.message }));
  }

  if (!settings) return <div>Loading...</div>;

  return (
    <div className="space-y-3">
      <Input label="Company Name" value={settings.company || ''} onChange={(e) => setSettings((s) => ({ ...s, company: e.target.value }))} />
      <Input label="Support Email" value={settings.supportEmail || ''} onChange={(e) => setSettings((s) => ({ ...s, supportEmail: e.target.value }))} />
      <div className="mt-2">
        <Button onClick={save}>Save</Button>
      </div>
    </div>
  );
}
