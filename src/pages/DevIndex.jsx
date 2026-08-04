import React from 'react';
import DevTools from './DevTools';
import DevToolbar from '../components/Dev/DevToolbar';
import EnvViewer from '../components/Dev/EnvViewer';

export default function DevIndex() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Developer Utilities</h2>
        <DevToolbar />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <DevTools />
        </div>
        <div>
          <EnvViewer />
        </div>
      </div>
    </div>
  );
}
