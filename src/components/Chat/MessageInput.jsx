import React, { useState } from 'react';
import Button from '../UI/Button';

export default function MessageInput({ onSend, placeholder = 'Type a message...' }) {
  const [value, setValue] = useState('');
  const send = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue('');
  };
  return (
    <div className="flex gap-2">
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} className="flex-1 px-3 py-2 rounded border bg-white dark:bg-slate-700" />
      <Button onClick={send}>Send</Button>
    </div>
  );
}
