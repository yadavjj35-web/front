import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../constants/config';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { useToast } from '../../components/Toast/ToastProvider';
import { Skeleton } from '../../components/UI/Skeleton';

export default function Tasks() {
  const [tasks, setTasks] = useState(null);
  const [title, setTitle] = useState('');
  const [assignee, setAssignee] = useState('');
  const { push } = useToast();

  useEffect(() => {
    api.get(`${ENDPOINTS.crm}/tasks`).then((r) => setTasks(r.data.tasks || [])).catch(() => setTasks([]));
  }, []);

  async function createTask() {
    if (!title.trim()) return push({ title: 'Validation', message: 'Title required' });
    try {
      const r = await api.post(`${ENDPOINTS.crm}/tasks`, { title, assignee });
      setTasks((t) => [r.data.task, ...(t || [])]);
      setTitle(''); setAssignee('');
      push({ title: 'Created', message: 'Task created' });
    } catch (err) {
      push({ title: 'Error', message: err.message || 'Failed' });
    }
  }

  if (!tasks) return <Skeleton className="h-40" />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Tasks</h2>

      <div className="card mb-4">
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input label="Assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
        <div className="mt-2">
          <Button onClick={createTask}>Create Task</Button>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((t) => (
          <div key={t.id} className="card flex items-center justify-between">
            <div>
              <div className="font-semibold">{t.title}</div>
              <div className="text-sm text-muted">Assignee: {t.assignee || '—'}</div>
            </div>
            <div className="text-sm text-muted">{t.status || 'open'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
