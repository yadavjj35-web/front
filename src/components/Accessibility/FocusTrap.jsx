import React, { useEffect, useRef } from 'react';

/**
 * FocusTrap - when visible, traps tab key inside children
 * Usage:
 * <FocusTrap active={modalOpen}><div>modal contents</div></FocusTrap>
 */
export default function FocusTrap({ active = false, children }) {
  const ref = useRef();

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;
    const focusable = el.querySelectorAll('a[href],button,textarea,input,select,[tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function onKey(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKey);
    const prev = document.activeElement;
    if (first) first.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      try {
        prev && prev.focus();
      } catch {}
    };
  }, [active]);

  return <div ref={ref} aria-hidden={!active}>{children}</div>;
}
