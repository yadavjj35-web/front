import React from 'react';
import Orders from './Orders';
import OrderDetail from './OrderDetail';

export default function OrdersIndex() {
  // Router-level decision handled in main router; this export ensures grouped pages available
  return <Orders />;
}
