import React, { useState } from 'react';
import Button from '../UI/Button';
import FileUpload from '../UI/FileUpload';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import { useToast } from '../Toast/ToastProvider';

export default function BroadcastComposer({ onSent }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targets, setTargets] = useState('');
  const [sending, setSending] = useState(false);
  const { push } = useToast();

  async function handleSend() {
    if (!message.trim()) {
      push({ title: 'Validation', message: 'Message cannot be empty' });
      return;
    }
    setSending(true);
    try {
      const payload = { title, message, targets: targets.split(',').map((s) => s.trim()).filter(Boolean) };
      const res = await api.post(`${ENDPOINTS.whatsapp}/broadcast`, payload);
      push({ title: 'Broadcast started', message: `Broadcast ID: ${res.data.broadcastId}` });
      onSent && onSent(res.data);
      setTitle(''); setMessage(''); setTargets('');
    } catch (err) {
      push({ title: 'Broadcast failed', message: err.response?.data?.message || err.message });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="card">
      <h4 className="font-semibold mb-2">Compose Broadcast</h4>
      <div className="space-y-3">
        <input placeholder="Title (optional)" className="w-full px-3 py-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Message" className="w-full px-3 py-2 border rounded h-28" value={message} onChange={(e) => setMessage(e.target.value)} />
        <input placeholder="Targets (comma separated phone numbers)" className="w-full px-3 py-2 border rounded" value={targets} onChange={(e) => setTargets(e.target.value)} />
        <FileUpload onDone={() => {}} />
        <div className="flex gap-2">
          <Button onClick={handleSend} disabled={sending}>{sending ? 'Sending...' : 'Send Broadcast'}</Button>
          <Button className="bg-slate-200 text-slate-900" onClick={() => { setTitle(''); setMessage(''); setTargets(''); }}>Clear</Button>
        </div>
      </div>
    </div>
  );
}
