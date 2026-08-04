import React, { useState } from 'react';
import Button from '../UI/Button';
import Modal from '../Modal';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import { useToast } from '../Toast/ToastProvider';

export default function ApprovalCard({ approval }) {
  const [open, setOpen] = useState(false);
  const { push } = useToast();

  async function decide(decision) {
    try {
      await api.post(`${ENDPOINTS.approvals}/${encodeURIComponent(approval.approvalId)}/decide`, { decision, notes: '' });
      push({ title: 'Success', message: `${decision} recorded` });
      setOpen(false);
      window.location.reload();
    } catch (err) {
      push({ title: 'Error', message: err.response?.data?.message || err.message });
    }
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">{approval.metadata?.title || approval.approvalId}</div>
          <div className="text-sm text-muted">Requested by: {approval.requestedBy}</div>
        </div>
        <div className="text-sm text-muted">{new Date(approval.requestedAt).toLocaleString()}</div>
      </div>
      <div className="mt-2 text-sm">{approval.metadata?.summary || approval.decision || 'No additional info'}</div>
      <div className="mt-3 flex gap-2">
        <Button onClick={() => setOpen(true)}>View</Button>
        <Button className="bg-red-600" onClick={() => decide('rejected')}>Reject</Button>
        <Button onClick={() => decide('approved')}>Approve</Button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Approval Details" size="lg">
        <div className="space-y-3">
          <div className="text-sm">{approval.metadata?.description || 'No description'}</div>
          <div className="text-sm text-muted">AI Recommendation: {approval.metadata?.aiRecommendation || '—'}</div>
          <div className="text-sm text-muted">Risk Level: {approval.metadata?.riskLevel || 'medium'}</div>

          <div className="flex gap-2 mt-4">
            <Button onClick={() => decide('approved')}>Approve</Button>
            <Button className="bg-red-600" onClick={() => decide('rejected')}>Reject</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
