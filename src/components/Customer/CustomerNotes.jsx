import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import Button from '../UI/Button';

export default function CustomerNotes({ customerId }) {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    api.get(`${ENDPOINTS.customers}/${encodeURIComponent(customerId)}/notes`).then((r) => setNotes(r.data.notes || [])).catch(() => setNotes([]));
  }, [customerId]);

  async function addNote() {
    if (!text.trim()) return;
    const res = await api.post(`${ENDPOINTS.customers}/${encodeURIComponent(customerId)}/notes`, { text });
    setNotes((s) => [res.data.note, ...s]);
    setText('');
  }

  return (
    <div className="card">
      <h4 className="font-semibold mb-2">Notes</h4>
      <textarea className="w-full px-3 py-2 border rounded mb-2" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="flex gap-2">
        <Button onClick={addNote}>Add Note</Button>
      </div>
      <ul className="mt-3 space-y-2">
        {notes.map((n) => (
          <li key={n.id} className="text-sm">
            <div className="font-medium">{n.author}</div>
            <div className="text-muted text-xs">{new Date(n.createdAt).toLocaleString()}</div>
            <div className="mt-1">{n.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
