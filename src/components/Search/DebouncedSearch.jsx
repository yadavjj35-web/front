import React, { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';

export default function DebouncedSearch({ value = '', onChange, delay = 300, placeholder = 'Search...' }) {
  const [q, setQ] = useState(value);
  const debounced = useDebounce(q, delay);

  useEffect(() => {
    if (onChange) onChange(debounced);
  }, [debounced]);

  useEffect(() => setQ(value), [value]);

  return (
    <input
      value={q}
      onChange={(e) => setQ(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded border bg-white dark:bg-slate-700"
    />
  );
}
