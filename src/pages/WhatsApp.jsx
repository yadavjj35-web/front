import React, { useEffect, useState, useRef } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';
import Button from '../components/UI/Button';

function ChatBubble({ fromMe, text, time }) {
  return (
    <div className={`max-w-xl ${fromMe ? 'ml-auto text-right' : 'mr-auto'}`}>
      <div className={`inline-block px-3 py-2 rounded-md ${fromMe ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>{text}</div>
      <div className="text-xs text-slate-400 mt-1">{time}</div>
    </div>
  );
}

export default function WhatsApp() {
  const [conversations, setConversations] = useState(null);
  const [active, setActive] = useState(null);
  const [text, setText] = useState('');
  const listRef = useRef();

  useEffect(() => {
    api.get(ENDPOINTS.whatsapp).then((r) => {
      setConversations(r.data.conversations || []);
      setActive(r.data.conversations?.[0] || null);
    });
  }, []);

  function sendMessage() {
    if (!active) return;
    api.post(`${ENDPOINTS.whatsapp}/send`, { to: active.contact, text }).then((r) => {
      setText('');
      // refresh
      api.get(`${ENDPOINTS.whatsapp}/convo/${active.contact}`).then((res) => {
        setActive(res.data);
      });
    });
  }

  if (!conversations) {
    return <Skeleton className="h-96" />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-md p-3">
        <h4 className="font-semibold mb-2">Conversations</h4>
        <div className="space-y-2 overflow-y-auto max-h-[60vh]">
          {conversations.map((c) => (
            <div key={c.contact} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer" onClick={() => setActive(c)}>
              <div className="font-medium">{c.name || c.contact}</div>
              <div className="text-sm text-slate-500">{c.lastMessageSnippet}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-md p-3 flex flex-col">
        {active ? (
          <>
            <div className="flex-1 overflow-y-auto space-y-3" ref={listRef}>
              {active.messages.map((m) => (
                <ChatBubble key={m.id} fromMe={m.fromMe} text={m.text} time={new Date(m.ts).toLocaleTimeString()} />
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input className="flex-1 px-3 py-2 rounded-md border bg-white dark:bg-slate-700" value={text} onChange={(e) => setText(e.target.value)} />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </>
        ) : (
          <div>Select a conversation</div>
        )}
      </div>
    </div>
  );
}
