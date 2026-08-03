import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';
import Button from '../components/UI/Button';

export default function WooCommerce() {
  const [q, setQ] = useState('');
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    load();
  }, [page]);

  function load() {
    api.get(`${ENDPOINTS.woo}/products`, { params: { q, page } }).then((r) => setProducts(r.data));
  }

  if (!products) return <Skeleton className="h-96" />;

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input className="flex-1 rounded px-3 py-2 border bg-white dark:bg-slate-700" placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)} />
        <Button onClick={() => { setPage(1); load(); }}>Search</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.items.map((p) => (
          <div key={p.id} className="p-3 bg-white dark:bg-slate-800 rounded-md border">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded" />
            <div className="mt-2 font-semibold">{p.name}</div>
            <div className="text-sm text-slate-500">{p.category}</div>
            <div className="mt-2 text-lg font-bold">${p.price}</div>
            <div className="mt-2 text-sm">Stock: {p.stock}</div>
            <div className="mt-3">
              <Button>View</Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>Page {products.page} of {products.totalPages}</div>
        <div className="flex gap-2">
          <Button onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
          <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      </div>
    </div>
  );
}
