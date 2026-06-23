import React, { useState } from 'react';
import { Mail, Phone, Globe, DollarSign, MessageCircle, Send, Share2, Rss } from 'lucide-react';
import LanguageModal from '../modals/LanguageModal';
import CurrencyModal from '../modals/CurrencyModal';

const footerColumns = [
  {
    title: 'Categories',
    links: ['Web Development', 'Design', 'Writing', 'Marketing'],
  },
  {
    title: 'For Clients',
    links: ['How It Works', 'Pricing', 'FAQs', 'Project Management'],
  },
  {
    title: 'For Freelancers',
    links: ['Join Now', 'Resources', 'Community', 'Earnings'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'Trust & Safety', 'Contact Us', 'Terms'],
  },
];

export default function Footer() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrOpen, setIsCurrOpen] = useState(false);

  return (
    <footer className="mt-16 border-t border-gray-200 bg-white text-gray-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-5">
          <div className="xl:col-span-1">
            <h4 className="text-2xl font-bold tracking-tight text-[#22c55e]">Nexlance</h4>
            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
              A refined marketplace experience for serious clients and freelancers.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h5 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-900">{column.title}</h5>
              <ul className="mt-4 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors duration-200 hover:text-gray-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 bg-slate-950 text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="text-slate-400">© 2026 Nexlance. All rights reserved.</span>
            <a href="#" className="transition-colors duration-200 hover:text-white">Privacy</a>
            <a href="#" className="transition-colors duration-200 hover:text-white">Terms</a>
            <a href="#" className="transition-colors duration-200 hover:text-white">Cookies</a>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <a href="#" className="rounded-full p-2 transition-colors duration-200 hover:bg-white/10 hover:text-white" aria-label="Community"><MessageCircle size={16} /></a>
              <a href="#" className="rounded-full p-2 transition-colors duration-200 hover:bg-white/10 hover:text-white" aria-label="Updates"><Send size={16} /></a>
              <a href="#" className="rounded-full p-2 transition-colors duration-200 hover:bg-white/10 hover:text-white" aria-label="Resources"><Rss size={16} /></a>
              <a href="#" className="rounded-full p-2 transition-colors duration-200 hover:bg-white/10 hover:text-white" aria-label="Share"><Share2 size={16} /></a>
            </div>

            <button 
              onClick={() => setIsLangOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            >
              <Globe size={15} /> English
            </button>
            <button 
              onClick={() => setIsCurrOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            >
              <DollarSign size={15} /> USD
            </button>

            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/10">
              <Mail size={15} /> Newsletter
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/10">
              <Phone size={15} /> Support
            </button>
          </div>
        </div>
      </div>

      <LanguageModal isOpen={isLangOpen} onClose={() => setIsLangOpen(false)} />
      <CurrencyModal isOpen={isCurrOpen} onClose={() => setIsCurrOpen(false)} />
    </footer>
  );
}
