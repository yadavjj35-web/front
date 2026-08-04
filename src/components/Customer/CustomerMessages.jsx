import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import { Skeleton } from '../UI/Skeleton';
import Conversation from '../Chat/Conversation';

export default function CustomerMessages({ customerId }) {
  const [conversations, setConversations] = useState(null);

  useEffect(() => {
    api.get(`${ENDPOINTS.customers}/${encodeURIComponent(customerId)}/messages`).then((r) => setConversations(r.data.conversations || [])).catch(() => setConversations([]));
  }, [customerId]);

  if (!conversations) return <Skeleton className="h-40" />;

  const contact = conversations[0]?.contact;

  return (
    <div className="card">
      <h4 className="font-semibold mb-2">Messages</h4>
      {contact ? <Conversation contact={contact} /> : <div className="text-muted">No conversation found</div>}
    </div>
  );
}
