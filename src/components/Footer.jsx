import React from 'react';
import { COPYRIGHT } from '../constants/strings';

export default function Footer() {
  return (
    <footer className="mt-8 py-6 text-center text-sm text-muted">
      {COPYRIGHT} · <span>WA‑AI Platform</span>
    </footer>
  );
}
