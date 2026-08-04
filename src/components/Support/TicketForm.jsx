import React, { useState } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import { useToast } from '../Toast/ToastProvider';

export default function TicketForm() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const { push } = useToast();

  async function submit() {
    try {
      await api.post(`${ENDPOINTS.profile}/tickets`, { subject, body });
      push({ title: 'Ticket submitted', message: 'Support will reach out shortly' });
      setSubject(''); setBody('');
    } catch (err) {
      push({ title: 'Error', message: err.message });
    }
  }

  return (
    <div className="card">
      <Input label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <textarea className="w-full px-3 py-2 border rounded mt-2" value={body} onChange={(e) => setBody(e.target.value)} />
      <div className="mt-2">
        <Button onClick={submit}>Submit</Button>
      </div>
    </div>
  );
}
