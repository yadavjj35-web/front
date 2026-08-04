import React, { useState } from 'react';
import { FiClipboard, FiCheck } from 'react-icons/fi';

export default function CopyButton({ text, label = 'Copy', className = '' }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }
  return (
    <button onClick={handleCopy} className={`inline-flex items-center gap-2 px-3 py-1 rounded ${className}`}>
      {copied ? <FiCheck /> : <FiClipboard />} <span>{copied ? 'Copied' : label}</span>
    </button>
  );
}
