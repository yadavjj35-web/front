import React, { createContext, useContext, useState, useCallback } from 'react';
import { FiX } from 'react-icons/fi';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((toast) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, ...toast }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, toast.duration || 6000);
  }, []);

  const remove = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  return (
    <ToastContext.Provider value={{ push, remove }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <div key={t.id} className="w-80 p-3 rounded-md bg-white dark:bg-slate-800 shadow-lg border dark:border-slate-700">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="font-semibold">{t.title}</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">{t.message}</div>
              </div>
              <button onClick={() => remove(t.id)} className="p-1">
                <FiX />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
