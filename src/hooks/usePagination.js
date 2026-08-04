import { useState } from 'react';

export default function usePagination({ initialPage = 1, pageSize = 20 } = {}) {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(pageSize);
  function next() {
    setPage((p) => p + 1);
  }
  function prev() {
    setPage((p) => Math.max(1, p - 1));
  }
  function go(n) {
    setPage(n);
  }
  return { page, size, setSize, next, prev, go, setPage };
}
