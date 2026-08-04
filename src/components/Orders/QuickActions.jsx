import React from 'react';
import Button from '../UI/Button';

export default function QuickActions({ onExport, onRefresh }) {
  return (
    <div className="flex gap-2">
      <Button onClick={onRefresh}>Refresh</Button>
      <Button onClick={onExport}>Export CSV</Button>
    </div>
  );
}
