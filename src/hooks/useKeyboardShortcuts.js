import { useEffect } from 'react';

export default function useKeyboardShortcuts(map = {}) {
  useEffect(() => {
    function handler(e) {
      const key = [];
      if (e.ctrlKey) key.push('ctrl');
      if (e.metaKey) key.push('meta');
      if (e.altKey) key.push('alt');
      if (e.shiftKey) key.push('shift');
      key.push(e.key.toLowerCase());
      const str = key.join('+');
      if (map[str]) {
        e.preventDefault();
        map[str](e);
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [map]);
}
