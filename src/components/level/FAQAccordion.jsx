import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const FAQS = [
  { q: 'How does the level system affect me?', a: 'Levels reflect your activity and quality on the platform.' },
  { q: 'How can I move up to the next level?', a: 'Complete milestones, maintain strong metrics and keep delivering quality.' },
  { q: 'Can I move down to a lower level?', a: 'Yes, performance drops can affect your level.' },
  { q: 'How is the level system reflected in the marketplace?', a: 'Higher levels may improve visibility and trust.' },
  { q: 'How often can my level change?', a: 'Levels are evaluated periodically based on recent activity.' },
  { q: 'How are these levels related to Pro?', a: 'Pro is a separate vetted program.' },
  { q: 'How is my success score calculated and how can I improve?', a: 'It is calculated from orders, ratings, response and other signals.' },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="rounded-lg border border-[#e4e5e7] bg-white p-4">
      <h3 className="text-lg font-semibold text-gray-900">Level system FAQ</h3>

      <div className="mt-4 divide-y divide-gray-100">
        {FAQS.map((f, i) => (
          <div key={f.q} className="py-3">
            <button type="button" className="flex w-full items-center justify-between text-left" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              <div className="text-sm font-medium text-gray-800">{f.q}</div>
              <motion.span animate={{ rotate: openIndex === i ? 180 : 0 }} className="text-gray-500"><ChevronDown size={18} /></motion.span>
            </button>

            <motion.div initial={false} animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }} transition={{ duration: 0.18 }} className="overflow-hidden">
              <div className="mt-3 text-sm text-gray-600">{f.a}</div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
