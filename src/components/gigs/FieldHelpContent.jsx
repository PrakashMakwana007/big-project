import React, { useEffect, useState } from 'react';

const helpByField = {
  gigTitle: {
    title: 'Are you including the right keywords?',
    badge: 'Plus',
    description: 'The best Gig titles include keywords buyers search for.',
    bullets: [
      'Keep your title clear and specific.',
      'Use the main service keyword near the start.',
      'Avoid vague words that do not explain value.',
    ],
    linkLabel: 'Join Seller Plus Kickstart',
  },
  category: {
    title: 'Choose the most accurate category',
    description: 'Correct category and subcategory help your Gig appear in the right buyer searches.',
    bullets: [
      'Match your core service to buyer intent.',
      'Pick the closest subcategory for discoverability.',
      'Avoid broad categories if your offer is specific.',
    ],
    linkLabel: 'Learn category best practices',
  },
  description: {
    title: 'Write a clear, trust-building description',
    description: 'Your description should explain outcomes, process, and what the buyer receives.',
    bullets: [
      'Start with value and expected result.',
      'Use concise language and readable structure.',
      'Include relevant keywords naturally for SEO.',
    ],
    linkLabel: 'See high-converting descriptions',
  },
  searchTags: {
    title: 'Improve search visibility with tags',
    description: 'Smart tags connect your Gig to buyer search terms and increase impressions.',
    bullets: [
      'Use service-specific keywords buyers type.',
      'Mix short and long-tail phrases.',
      'Avoid repeating the same keyword variation.',
    ],
    linkLabel: 'Explore keyword ideas',
  },
  default: {
    title: 'Start Defining Your Gig',
    description: 'Use each section to make your Gig clearer and easier to discover by buyers.',
    bullets: ['Create a catchy title', 'Choose proper category', 'Add metadata', 'Add search tags'],
    linkLabel: 'General Gig Policy',
  },
};

export default function FieldHelpContent({ activeField = 'default' }) {
  const [visible, setVisible] = useState(false);
  const content = helpByField[activeField] || helpByField.default;

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, [activeField]);

  return (
    <div className={`transform transition-all duration-200 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-2xl font-semibold text-gray-900 leading-tight">{content.title}</h3>
        {content.badge && (
          <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">{content.badge}</span>
        )}
      </div>

      <p className="mt-3 text-sm text-gray-600">{content.description}</p>

      <ul className="mt-4 space-y-2">
        {content.bullets.map((item) => (
          <li key={item} className="text-sm text-gray-600">• {item}</li>
        ))}
      </ul>

      <button type="button" className="mt-5 text-sm font-medium text-[#22c55e] transition-all duration-200 hover:underline cursor-pointer">
        {content.linkLabel}
      </button>
    </div>
  );
}