import React from 'react';
import Modal from '../Modal';

export default function ShortcutHelp({ open, onClose }) {
  const shortcuts = [
    { keys: 'Ctrl+K', action: 'Open Global Search' },
    { keys: '/', action: 'Focus search input' },
    { keys: 'g d', action: 'Go to dashboard' }
  ];
  return (
    <Modal open={open} onClose={onClose} title="Keyboard Shortcuts">
      <div className="space-y-2">
        {shortcuts.map((s) => (
          <div key={s.keys} className="flex justify-between">
            <div>{s.action}</div>
            <div className="text-sm text-muted">{s.keys}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
