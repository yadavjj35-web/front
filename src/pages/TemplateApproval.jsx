import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import Button from '../components/UI/Button';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast/ToastProvider';

export default function TemplateApproval() {
  const [templates, setTemplates] = useState(null);
  const [active, setActive] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    let mounted = true;
    api
      .get(`${ENDPOINTS.whatsapp}/templates/pending`)
      .then((r) => mounted && setTemplates(r.data.templates || []))
      .catch(() => mounted && setTemplates([]));
    return () => (mounted = false);
  }, []);

  async function decide(id, decision, notes = '') {
    try {
      await api.post(`${ENDPOINTS.whatsapp}/templates/${encodeURIComponent(id)}/decide`, { decision, notes });
      push({ title: 'Template', message: `Template ${decision}` });
      setTemplates((t) => t.filter((x) => x.id !== id));
      setActive(null);
    } catch (err) {
      push({ title: 'Error', message: err.message || 'Failed' });
    }
  }

  if (!templates) return <div className="card">Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Template Approvals</h2>
      {templates.length === 0 ? (
        <div className="card">No pending templates</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((t) => (
            <div key={t.id} className="card">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted">{t.language}</div>
              </div>
              <div className="mt-2 text-sm">{t.body}</div>
              <div className="mt-3 flex gap-2">
                <Button onClick={() => setActive(t)}>Review</Button>
                <Button className="bg-red-600" onClick={() => decide(t.id, 'rejected')}>Reject</Button>
                <Button onClick={() => decide(t.id, 'approved')}>Approve</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!active} onClose={() => setActive(null)} title="Review Template">
        {active && (
          <div>
            <div className="font-semibold">{active.name}</div>
            <div className="text-sm text-muted">Lang: {active.language}</div>
            <pre className="mt-3 bg-slate-50 dark:bg-slate-700 p-3 rounded">{active.body}</pre>
            <div className="mt-3 flex gap-2">
              <Button onClick={() => decide(active.id, 'approved')}>Approve</Button>
              <Button className="bg-red-600" onClick={() => decide(active.id, 'rejected')}>Reject</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
