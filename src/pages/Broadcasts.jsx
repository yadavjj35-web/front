import React from 'react';
import BroadcastComposer from '../components/Broadcast/BroadcastComposer';
import { Skeleton } from '../components/UI/Skeleton';

export default function Broadcasts() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Broadcasts</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <BroadcastComposer onSent={() => {}} />
        </div>
        <div>
          <div className="card">
            <h4 className="font-semibold">Recent Broadcasts</h4>
            <div className="mt-3 text-sm text-muted">Feature requires backend mapping to list broadcasts. Placeholder below:</div>
            <Skeleton className="h-32 mt-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
