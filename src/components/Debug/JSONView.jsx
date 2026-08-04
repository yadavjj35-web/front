import React from 'react';

/**
 * JSONView - compact prettified JSON viewer with copy button
 */
import CopyButton from '../CopyButton';

export default function JSONView({ data, title = 'Data' }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        <CopyButton text={JSON.stringify(data || {}, null, 2)} label="Copy JSON" />
      </div>
      <pre className="mt-3 text-sm text-muted max-h-[40vh] overflow-auto">{JSON.stringify(data || {}, null, 2)}</pre>
    </div>
  );
}
