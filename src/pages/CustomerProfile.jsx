import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomer } from '../services/customersService';
import { Skeleton } from '../components/UI/Skeleton';
import CustomerNotes from '../components/Customer/CustomerNotes';
import CustomerOrdersList from '../components/Customer/CustomerOrdersList';
import CustomerMessages from '../components/Customer/CustomerMessages';
import Button from '../components/UI/Button';
import { useToast } from '../components/Toast/ToastProvider';

export default function CustomerProfile() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    let mounted = true;
    setCustomer(null);
    getCustomer(id)
      .then((r) => mounted && setCustomer(r))
      .catch((err) => {
        push({ title: 'Customer load error', message: err.response?.data?.message || err.message });
        mounted && setCustomer({ error: true });
      });
    return () => (mounted = false);
  }, [id]);

  if (!customer) return <Skeleton className="h-64" />;

  if (customer.error) return <div className="card">Unable to load customer</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{customer.name}</h2>
          <div className="text-sm text-muted">{customer.email}</div>
        </div>
        <div className="flex gap-2">
          <Button>Message</Button>
          <Button className="bg-slate-200">Edit</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <CustomerOrdersList customerId={id} />
          <CustomerMessages customerId={id} />
        </div>
        <div>
          <CustomerNotes customerId={id} />
        </div>
      </div>
    </div>
  );
}
