import React from 'react';
import { Plus } from 'lucide-react';

export default function PortfolioSection({ onAddPortfolio }) {
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Portfolio</h2>
        <span className="text-sm text-gray-500">Showcase your best work</span>
      </div>

      <div className="flex flex-col items-start gap-4 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-gray-200 to-gray-100 text-2xl text-gray-400">
            ▢
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Start portfolio</p>
            <p className="text-sm text-gray-500">Add screenshots, case studies, and examples of your work.</p>
          </div>
        </div>

        <button type="button" aria-label="Add Portfolio Project" onClick={onAddPortfolio} className="inline-flex items-center gap-2 rounded-lg bg-[#22c55e] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-600 cursor-pointer">
          <Plus size={16} />
          Start portfolio
        </button>
      </div>
    </section>
  );
}