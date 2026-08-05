import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { Skeleton } from '../../components/UI/Skeleton';
import { useToast } from '../../components/Toast/ToastProvider';

export default function Meetings() {
  const [meetings, setMeetings] = useState(null);
  const [title, setTitle] = useState('');
  const [when, setWhen] = useState('');
  const [participants, setParticipants] = useState('');
  const { push } = useToast();

  useEffect(() => {
    api.get(`${ENDPOINTS.crm}/meetings`).then((r) => setMeetings(r.data.meetings || [])).catch(() => setMeetings([]));
  }, []);

  async function schedule() {
    try {
      const payload = { title, when, participants: participants.split(',').map((s) => s.trim()).filter(Boolean) };
      const r = await api.post(`${ENDPOINTS.crm}/meetings`, payload);
      setMeetings((m) => [r.data.meeting, ...(m || [])]);
      setTitle(''); setWhen(''); setParticipants('');
      push({ title: 'Scheduled', message: 'Meeting scheduled' });
    } catch (err) {
      push({ title: 'Error', message: err.message || 'Scheduling failed' });
    }
  }

  if (!meetings) return <Skeleton className="h-40" />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Meetings</h2>
      <div className="card mb-4">
        <div className="space-y-2">
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input label="When (ISO datetime)" value={when} onChange={(e) => setWhen(e.target.value)} />
          <Input label="Participants (comma-separated emails)" value={participants} onChange={(e) => setParticipants(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={schedule}>Schedule</Button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {meetings.map((m) => (
          <div key={m.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{m.title}</div>
                <div className="text-sm text-muted">{new Date(m.when).toLocaleString()}</div>
              </div>
              <div className="text-sm text-muted">{(m.participants || []).join(', ')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
