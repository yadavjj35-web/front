import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user || {});

  useEffect(() => {
    api.get(ENDPOINTS.profile).then((r) => setProfile(r.data.user)).catch(() => {});
  }, []);

  function save() {
    api.put(ENDPOINTS.profile, profile).then(() => {
      alert('Saved');
    });
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Profile</h2>
      <div className="mt-4 max-w-xl space-y-3">
        <Input id="owner" label="Owner Name" value={profile.name || ''} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
        <Input id="company" label="Company" value={profile.company || ''} onChange={(e) => setProfile((p) => ({ ...p, company: e.target.value }))} />
        <Input id="email" label="Email" value={profile.email || ''} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} />
        <Button onClick={save}>Save</Button>
      </div>
    </div>
  );
}
