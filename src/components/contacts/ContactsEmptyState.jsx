import React from 'react';
import { UsersRound } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactsEmptyState({ activeTab }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 text-gray-400 ring-1 ring-[#e4e5e7]">
        <UsersRound size={34} />
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-gray-900">
        {activeTab === 'buyers' ? 'You have yet to receive any Gig orders ...' : 'You have yet to send any Gig orders ...'}
      </h2>
      <p className="mt-3 text-sm leading-6 text-gray-500">
        {activeTab === 'buyers'
          ? 'Once buyers start interacting with your gigs, their details will appear here.'
          : 'Once you place orders with sellers, their details will appear here.'}
      </p>
    </motion.div>
  );
}
