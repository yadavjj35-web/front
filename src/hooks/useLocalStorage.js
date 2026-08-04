import { useState } from 'react';

export default function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initial;
    } catch {
      return initial;
    }
  });

  function set(v) {
    setState(v);
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {}
  }

  return [state, set];
}
