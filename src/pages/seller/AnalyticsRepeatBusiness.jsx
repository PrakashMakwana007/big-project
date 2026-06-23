

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Info, Lock, ChevronDown } from 'lucide-react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Footer from '../../components/dashboard/Footer';
import api from '../../services/api';

const TIPS = [
  {
    title: 'Follow buyer requirements to the detail',
    description:
      'The more you know about what buyers want, the better you can meet (or exceed!) their expectations.',
  },
  {
    title: 'Keep your buyers updated',
    description:
      "Make your buyers feel you've got their back—be quick to respond and share updates on their orders.",
  },
  {
    title: 'Deliver before deadline',
    description:
      'Surprise and delight your buyers by delivering high-quality work ahead of the expected schedule.',
  },
];

export default function AnalyticsRepeatBusiness() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === TIPS.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  
  const subcategoriesQuery = useQuery({
    queryKey: ['analytics-subcategories'],
    queryFn: api.analytics.getSubcategories,
  });

  
  const repeatBusinessQuery = useQuery({
    queryKey: ['analytics-repeat-business', selectedSubcategoryId],
    queryFn: () => api.analytics.getRepeatBusiness(selectedSubcategoryId || undefined),
  });

  const subcategories = subcategoriesQuery.data || [];
  const rb = repeatBusinessQuery.data;

  
  const formatCurrency = (value) =>
    value != null ? `₹${Number(value).toLocaleString()}` : '—';

  
  const formatPct = (value) =>
    value != null ? `${value}%` : '—';

  
  const scoreColor =
    !rb || rb.repeatBusinessScore == null
      ? 'text-[#404145]'
      : rb.repeatBusinessScore >= 70
        ? 'text-[#1dbf73]'
        : rb.repeatBusinessScore >= 40
          ? 'text-[#f5a623]'
          : 'text-[#e74c3c]';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DashboardNavbar />

      <main className="flex-1 w-full pb-20">
        <div className="mx-auto max-w-[1200px] px-6 py-10">

          
          <div className="mb-8">
            <h1 className="text-[32px] font-normal text-[#404145]">Analytics</h1>
          </div>

          
          <div className="flex items-center gap-8 border-b border-[#e4e5e7] mb-12">
            <Link
              to="/seller/analytics/overview"
              className="pb-4 text-[15px] font-bold text-[#74767e] hover:text-[#404145] transition-colors"
            >
              Overview
            </Link>
            <div className="pb-4 text-[15px] font-bold text-[#1dbf73] border-b-[3px] border-[#1dbf73] cursor-pointer">
              Repeat business
            </div>
            <div className="pb-4 text-[15px] font-bold text-[#b5b6ba] flex items-center gap-2 cursor-not-allowed">
              Keyword research <Lock size={14} />
            </div>
          </div>

          <div className="max-w-[850px]">

            
            <div className="mb-12">
              <label className="block text-[15px] font-bold text-[#404145] mb-3">
                Choose a subcategory
              </label>
              <div className="relative inline-block w-[300px]">
                <select
                  value={selectedSubcategoryId}
                  onChange={(e) => setSelectedSubcategoryId(e.target.value)}
                  disabled={subcategoriesQuery.isLoading}
                  className="w-full appearance-none rounded border border-[#c5c6c9] bg-[#f7f7f7] px-4 py-3 text-[14px] text-[#74767e] outline-none hover:border-[#b5b6ba] focus:border-[#404145] transition-all cursor-pointer disabled:opacity-60"
                >
                  <option value="">
                    {subcategoriesQuery.isLoading ? 'Loading…' : '--- All subcategories ---'}
                  </option>
                  {subcategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#74767e]">
                  <ChevronDown size={18} />
                </div>
              </div>

              {subcategoriesQuery.isError && (
                <p className="mt-2 text-[12px] text-red-500">
                  Could not load subcategories: {subcategoriesQuery.error?.message}
                </p>
              )}
            </div>

            
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-[15px] font-bold text-[#404145]">Your repeat business score</h2>
                <div
                  className="text-[#b5b6ba] cursor-help"
                  title="Find out how your repeat business compares to other sellers in your subcategory."
                >
                  <Info size={14} />
                </div>
              </div>
              <p className="text-[13px] text-[#74767e] mb-4">
                Find out how your repeat business compares to other sellers in your subcategory.
              </p>

              <div className="border border-[#e4e5e7] rounded bg-white p-8 min-h-[160px] flex flex-col justify-center">
                {repeatBusinessQuery.isLoading ? (
                  <div className="text-[14px] text-[#74767e]">Loading score…</div>
                ) : repeatBusinessQuery.isError ? (
                  <div className="text-[14px] text-red-500">
                    Could not load repeat business data: {repeatBusinessQuery.error?.message}
                  </div>
                ) : rb && rb.totalOrders > 0 ? (
                  <>
                    <div className={`text-[40px] font-bold mb-1 ${scoreColor}`}>
                      {rb.repeatBusinessScore ?? '—'}
                      <span className="text-[22px] text-[#74767e] font-normal ml-1">/ 100</span>
                    </div>
                    <p className="text-[13px] text-[#74767e]">
                      Based on {rb.totalOrders} completed order{rb.totalOrders !== 1 ? 's' : ''}.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-[24px] font-bold text-[#404145] mb-2">—</div>
                    <p className="text-[14px] text-[#74767e]">
                      There are not enough orders to calculate your score, yet.
                    </p>
                  </>
                )}
              </div>
            </div>

            
            <div className="mb-12">
              <h2 className="text-[15px] font-bold text-[#404145] mb-4">Factors affecting your score</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="border border-[#e4e5e7] rounded bg-white p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-[13px] font-bold text-[#74767e]">Repeat buyers</span>
                      <Info size={14} className="text-[#b5b6ba] cursor-help" />
                    </div>
                    <div className="text-[20px] font-bold text-[#404145]">
                      {repeatBusinessQuery.isLoading ? '…' : (rb?.repeatBuyers ?? 0)}
                    </div>
                  </div>

                  <div className="w-full h-px bg-[#e4e5e7] mb-6" />

                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-[13px] font-bold text-[#74767e]">Repeat buyers (%)</span>
                      <Info size={14} className="text-[#b5b6ba] cursor-help" />
                    </div>
                    <div className="text-[20px] font-bold text-[#404145]">
                      {repeatBusinessQuery.isLoading
                        ? '…'
                        : rb?.repeatBuyerPercentage != null
                          ? `${rb.repeatBuyerPercentage}%`
                          : '—'}
                    </div>
                  </div>
                </div>

                
                <div className="border border-[#e4e5e7] rounded bg-white p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-[13px] font-bold text-[#74767e]">Earnings from repeat buyers</span>
                      <Info size={14} className="text-[#b5b6ba] cursor-help" />
                    </div>
                    <div className="text-[20px] font-bold text-[#404145]">
                      {repeatBusinessQuery.isLoading
                        ? '…'
                        : formatCurrency(rb?.earningsFromRepeatBuyers)}
                    </div>
                  </div>

                  <div className="w-full h-px bg-[#e4e5e7] mb-6" />

                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-[13px] font-bold text-[#74767e]">
                        Earnings from repeat buyers (%)
                      </span>
                      <Info size={14} className="text-[#b5b6ba] cursor-help" />
                    </div>
                    <div className="text-[20px] font-bold text-[#404145]">
                      {repeatBusinessQuery.isLoading ? '…' : formatPct(rb?.earningsPercentage)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <a href="#" className="text-[14px] text-[#4a73e8] hover:underline">
                  Find out more about repeat business score
                </a>
              </div>
            </div>

            
            <div className="mb-10">
              <h2 className="text-[15px] font-bold text-[#404145] mb-4">
                Get more repeat business with these tips:
              </h2>

              <div className="relative border border-[#e4e5e7] rounded bg-white p-8 shadow-sm flex flex-col justify-between min-h-[160px] border-l-[3px] border-l-[#4a73e8]">

                
                <div className="pr-12">
                  <h3 className="text-[15px] font-bold text-[#404145] mb-2">
                    {TIPS[currentSlide].title}
                  </h3>
                  <p className="text-[14px] text-[#74767e] leading-relaxed mb-4">
                    {TIPS[currentSlide].description}
                  </p>
                  <a
                    href="#"
                    className="text-[#4a73e8] font-bold text-[14px] hover:underline flex items-center gap-1"
                  >
                    See more tips <span className="text-[16px] leading-none">&rarr;</span>
                  </a>
                </div>

                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {TIPS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-[#74767e]' : 'bg-[#e4e5e7]'
                        }`}
                    />
                  ))}
                  <button className="w-2 h-2 rounded-full bg-[#e4e5e7] cursor-default" />
                  <button className="w-2 h-2 rounded-full bg-[#e4e5e7] cursor-default" />
                </div>

                
                <div className="absolute -bottom-5 -right-5 w-12 h-12 rounded-full overflow-hidden bg-[#e4e5e7] border-4 border-white shadow-sm flex items-end justify-center z-10">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop"
                    alt="Advisor Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
