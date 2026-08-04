import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { useToast } from '../../components/Toast/ToastProvider';

export default function AmazonSettings() {
  const [cfg, setCfg] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    api.get(ENDPOINTS.profile).then((r) => setCfg(r.data.settings?.amazon || {})).catch(() => setCfg({}));
  }, []);

  function save() {
    api.put(ENDPOINTS.profile, { settings: { amazon: cfg } }).then(() => push({ title: 'Saved', message: 'Amazon settings saved' })).catch((err) => push({ title: 'Error', message: err.message }));
  }

  if (!cfg) return <div className="card">Loading...</div>;

  return (
    <div className="space-y-3">
      <Input label="Seller ID" value={cfg.sellerId || ''} onChange={(e) => setCfg((c) => ({ ...c, sellerId: e.target.value }))} />
      <Input label="Marketplace ID" value={cfg.marketplaceId || ''} onChange={(e) => setCfg((c) => ({ ...c, marketplaceId: e.target.value }))} />
      <Input label="AWS Role ARN" value={cfg.roleArn || ''} onChange={(e) => setCfg((c) => ({ ...c, roleArn: e.target.value }))} />
      <div className="mt-3">
        <Button onClick={save}>Save</Button>
      </div>
    </div>
  );
}
