import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import { useToast } from '../Toast/ToastProvider';

export default function Conversation({ contact }) {
  const [conversation, setConversation] = useState({ messages: [] });
  const [typing, setTyping] = useState(false);
  const { push } = useToast();

  useEffect(() => {
    let mounted = true;
    if (!contact) return;
    api
      .get(`${ENDPOINTS.whatsapp}/convo/${encodeURIComponent(contact)}`)
      .then((r) => mounted && setConversation(r.data))
      .catch((err) => push({ title: 'Conversation error', message: err.response?.data?.message || err.message }));
    return () => (mounted = false);
  }, [contact]);

  async function handleSend(text) {
    if (!contact) return;
    setTyping(true);
    try {
      await api.post(`${ENDPOINTS.whatsapp}/send`, { to: contact, text });
      const r = await api.get(`${ENDPOINTS.whatsapp}/convo/${encodeURIComponent(contact)}`);
      setConversation(r.data);
    } catch (err) {
      push({ title: 'Send failed', message: err.response?.data?.message || err.message });
    } finally {
      setTyping(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <MessageList messages={conversation.messages || []} />
      </div>

      <div className="p-3 border-t dark:border-slate-700 bg-white dark:bg-slate-800">
        {typing && <TypingIndicator />}
        <MessageInput onSend={handleSend} placeholder="Type a message or /command" />
      </div>
    </div>
  );
}
