import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import CloseIcon from '../icons/CloseIcon';

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div className="absolute inset-0 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} />
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`relative z-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden ${size === 'lg' ? 'w-11/12 md:w-3/4' : 'w-11/12 md:w-2/3'}`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
          <div className="font-semibold">{title}</div>
          <button onClick={onClose} className="p-1 text-slate-600 dark:text-slate-300">
            <CloseIcon />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </motion.div>
    </div>,
    document.body
  );
}
