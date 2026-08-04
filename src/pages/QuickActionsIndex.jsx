import React from 'react';
import QuickActions from '../components/Orders/QuickActions';

export default function QuickActionsIndex() {
  function handleExport() { alert('Export action triggered'); }
  function handleRefresh() { window.location.reload(); }
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
      <QuickActions onExport={handleExport} onRefresh={handleRefresh} />
    </div>
  );
}
