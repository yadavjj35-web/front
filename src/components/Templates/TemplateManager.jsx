import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import Button from '../UI/Button';
import { useToast } from '../Toast/ToastProvider';

export default function TemplateManager() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get(`${ENDPOINTS.whatsapp}/templates`).then((r) => mounted && setTemplates(r.data.templates || [])).catch(() => mounted && setTemplates([])).finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  async function saveTemplate(t) {
    try {
      const res = t.id ? await api.put(`${ENDPOINTS.whatsapp}/templates/${encodeURIComponent(t.id)}`, t) : await api.post(`${ENDPOINTS.whatsapp}/templates`, t);
      push({ title: 'Saved', message: 'Template saved' });
      setEditing(null);
      // refresh
      const r = await api.get(`${ENDPOINTS.whatsapp}/templates`);
      setTemplates(r.data.templates || []);
    } catch (err) {
      push({ title: 'Error', message: err.response?.data?.message || err.message });
    }
  }

  async function removeTemplate(id) {
    try {
      await api.delete(`${ENDPOINTS.whatsapp}/templates/${encodeURIComponent(id)}`);
      setTemplates((s) => s.filter((x) => x.id !== id));
      push({ title: 'Deleted', message: 'Template removed' });
    } catch (err) {
      push({ title: 'Error', message: err.response?.data?.message || err.message });
    }
  }

  if (loading) return <div className="card">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Message Templates</h3>
        <Button onClick={() => setEditing({ name: '', body: '' })}>New Template</Button>
      </div>

      {editing ? (
        <div className="card">
          <input className="w-full px-3 py-2 border rounded mb-2" placeholder="Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
          <textarea className="w-full px-3 py-2 border rounded mb-2" placeholder="Body" value={editing.body} onChange={(e) => setEditing({ ...editing, body: e.target.value })} />
          <div className="flex gap-2">
            <Button onClick={() => saveTemplate(editing)}>Save</Button>
            <Button className="bg-slate-200 text-slate-900" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {templates.map((t) => (
          <div key={t.id} className="card">
            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-muted mt-1">{t.body}</div>
            <div className="mt-3 flex gap-2">
              <Button onClick={() => setEditing(t)}>Edit</Button>
              <Button className="bg-red-600" onClick={() => removeTemplate(t.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
