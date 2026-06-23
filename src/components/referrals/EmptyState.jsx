import React from 'react';
import { motion } from 'framer-motion';
import { UsersRound } from 'lucide-react';

export default function EmptyState({ activeTab }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mx-auto max-w-xl text-center"
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 text-gray-400 ring-1 ring-[#e4e5e7]">
        <UsersRound size={34} />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-gray-900">
        {activeTab === 'given' ? "You haven't made any referrals yet" : "No one has referred you yet"}
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-600">
        {activeTab === 'given'
          ? 'Once you start referring freelancers, you\'ll see their details here.'
          : 'Once a freelancer refers you, you\'ll see their details here.'}
      </p>
    </motion.div>
  );
}
