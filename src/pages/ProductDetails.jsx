import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { ENDPOINTS } from '../constants/config';
import { Skeleton } from '../components/UI/Skeleton';
import Button from '../components/UI/Button';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let mounted = true;
    api.get(`${ENDPOINTS.products}/${encodeURIComponent(id)}`)
      .then((r) => mounted && setProduct(r.data))
      .catch(() => mounted && setProduct(null));
    return () => (mounted = false);
  }, [id]);

  if (product === null) {
    return <Skeleton className="h-80" />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <img src={product.image || '/assets/icon-192.svg'} alt={product.name} className="w-full h-64 object-cover rounded-md" />
        </div>
        <div className="md:col-span-2 space-y-3">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <div className="text-muted">{product.category}</div>
          <div className="mt-2 text-3xl font-bold">${product.price}</div>
          <div className="mt-4">{product.description}</div>
          <div className="mt-4 flex gap-2">
            <Button>Update Stock</Button>
            <Button className="bg-red-600">Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
