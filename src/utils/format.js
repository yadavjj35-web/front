export function currency(n) {
  if (n == null) return '$0.00';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n));
}

export function shortDate(ts) {
  if (!ts) return '-';
  const d = new Date(ts);
  return d.toLocaleString();
}
