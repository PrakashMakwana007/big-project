import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function DropdownContainer({ open, className = '', children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className={`absolute top-full z-40 mt-3 overflow-hidden rounded-[14px] border border-[#e4e5e7] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
