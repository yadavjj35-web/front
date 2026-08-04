import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';
import Button from '../components/UI/Button';
import useDebounce from '../hooks/useDebounce';
import Pagination from '../components/Pagination';
import { useToast } from '../components/Toast/ToastProvider';
import { Link } from 'react-router-dom';

export default function Products() {
  const [q, setQ] = useState('');
  const debouncedQ = useDebounce(q, 350);
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const { push } = useToast();

  useEffect(() => {
    let mounted = true;
    setProducts(null);
    api
      .get(ENDPOINTS.products, { params: { q: debouncedQ, page } })
      .then((r) => {
        if (!mounted) return;
        setProducts(r.data);
      })
      .catch((err) => {
        push({ title: 'Products error', message: err.response?.data?.message || err.message });
        setProducts({ items: [], page: 1, totalPages: 1 });
      });
    return () => (mounted = false);
  }, [debouncedQ, page]);

  if (!products) {
    return (
      <div>
        <Skeleton className="h-8 w-1/3 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-44" />
          <Skeleton className="h-44" />
          <Skeleton className="h-44" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="px-3 py-2 border rounded flex-1" />
        <Button onClick={() => setPage(1)}>Search</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.items.map((p) => (
          <div key={p.id} className="card">
            <img src={p.image || '/assets/icon-192.svg'} alt={p.name} className="h-40 w-full object-cover rounded-md" />
            <div className="mt-2 font-semibold">{p.name}</div>
            <div className="text-sm text-muted">{p.category}</div>
            <div className="mt-2 font-bold">${p.price}</div>
            <div className="mt-2 flex gap-2">
              <Link to={`/products/${p.id}`} className="px-3 py-2 rounded bg-slate-100 dark:bg-slate-700">View</Link>
              <Button onClick={() => push({ title: 'Feature', message: 'Edit product feature to be implemented' })}>Edit</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Pagination page={products.page} total={products.totalPages} onPage={(n) => setPage(n)} />
        <div className="text-sm text-muted">Total: {products.total}</div>
      </div>
    </div>
  );
}
