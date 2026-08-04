import React, { useState } from 'react';
import Conversation from '../components/Chat/Conversation';
import BroadcastComposer from '../components/Broadcast/BroadcastComposer';
import TemplateManager from '../components/Templates/TemplateManager';
import MediaGallery from '../components/Uploads/MediaGallery';
import { Skeleton } from '../components/UI/Skeleton';

export default function WhatsAppEnhancements() {
  const [contact, setContact] = useState(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-1 card">
        <h4 className="font-semibold mb-2">Conversations</h4>
        {/* Placeholder list - backend mapping needed */}
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700" onClick={() => setContact('customer1')}>
            Customer #1
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700" onClick={() => setContact('customer2')}>
            Customer #2
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 card">
        {contact ? <Conversation contact={contact} /> : <div className="p-4 text-muted">Select a conversation</div>}
      </div>

      <div className="space-y-4">
        <BroadcastComposer onSent={() => {}} />
        <TemplateManager />
        <div className="card">
          <h4 className="font-semibold mb-2">Media</h4>
          <MediaGallery items={[]} />
        </div>
      </div>
    </div>
  );
}
