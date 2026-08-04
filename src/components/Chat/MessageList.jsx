import React, { useEffect, useRef } from 'react';

export default function MessageList({ messages = [] }) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);
  return (
    <div ref={ref} className="space-y-3 overflow-y-auto max-h-[60vh] p-3">
      {messages.map((m) => (
        <div key={m.id} className={`flex ${m.fromMe ? 'justify-end' : 'justify-start'}`}>
          <div className={`rounded px-3 py-2 ${m.fromMe ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
            {m.text}
            {m.attachments?.map((a) => (
              <div key={a.url} className="mt-2">
                <a href={a.url} target="_blank" rel="noreferrer" className="text-sm underline">{a.name || 'Attachment'}</a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
