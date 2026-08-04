import React from 'react';
import Modal from './Modal';
import Button from '../components/UI/Button';

export default function ConfirmModal({ open, onClose, onConfirm, title = 'Confirm', message = 'Are you sure?', confirmLabel = 'Confirm', cancelLabel = 'Cancel', loading }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="space-y-4">
        <div className="text-sm text-slate-600 dark:text-slate-300">{message}</div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 rounded bg-slate-100 dark:bg-slate-700"> {cancelLabel} </button>
          <Button onClick={onConfirm} disabled={loading}>{loading ? 'Processing...' : confirmLabel}</Button>
        </div>
      </div>
    </Modal>
  );
}
