import React from 'react';

export default function EnvViewer() {
  const env = {
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_DEFAULT_THEME: import.meta.env.VITE_DEFAULT_THEME
  };

  return (
    <div className="card">
      <h4 className="font-semibold">Client Environment</h4>
      <pre className="mt-2 text-sm text-muted">{JSON.stringify(env, null, 2)}</pre>
    </div>
  );
}
