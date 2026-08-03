import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ children, onClick, className = '', type = 'button', ...rest }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      type={type}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white hover:brightness-95 ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
