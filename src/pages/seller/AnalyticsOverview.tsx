

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Footer from '../../components/dashboard/Footer';
import { HelpCircle, Lock, ChevronDown, MapPin } from 'lucide-react';
import api from '../../services/api';

const RANGE_OPTIONS = [
  { label: 'Last 7 days', value: '7' },
  { label: 'Last 30 days', value: '30' },
  { label: 'Last 90 days', value: '90' },
  { label: 'Last year', value: '365' },
];


function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data, 1);
  const W = 400;
  const H = 200;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - (v / max) * H;
    return `${x},${y}`;
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full">
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

interface ChartPoint {
  sales?: number;
  cancelled?: number;
  completed?: number;
  newOrders?: number;
  date: string;
}

interface MapPoint {
  lng: number;
  lat: number;
  country: string;
}

export default function AnalyticsOverview() {
  const [chartRange, setChartRange] = useState('30');
  const [rangeOpen, setRangeOpen] = useState(false);

  
  const overviewQuery = useQuery({
    queryKey: ['analytics-overview'],
    queryFn: api.analytics.getOverview,
  });

  const chartQuery = useQuery({
    queryKey: ['analytics-chart', chartRange],
    queryFn: () => api.analytics.getChart(chartRange),
  });

  const mapQuery = useQuery({
    queryKey: ['analytics-map'],
    queryFn: api.analytics.getMap,
  });

  
  const overview = (overviewQuery.data || {}) as any;
  const chartPoints = (chartQuery.data || []) as ChartPoint[];
  const mapPoints = (mapQuery.data || []) as MapPoint[];

  const totalSales = chartPoints.reduce((s: number, p: ChartPoint) => s + (p.sales || 0), 0);
  const totalCancelled = chartPoints.reduce((s: number, p: ChartPoint) => s + (p.cancelled || 0), 0);
  const totalCompleted = chartPoints.reduce((s: number, p: ChartPoint) => s + (p.completed || 0), 0);
  const totalNewOrders = chartPoints.reduce((s: number, p: ChartPoint) => s + (p.newOrders || 0), 0);

  const salesData = chartPoints.map((p: ChartPoint) => p.sales || 0);
  const completedData = chartPoints.map((p: ChartPoint) => p.completed || 0);

  
  const xLabels: string[] = [];
  const step = Math.max(1, Math.floor(chartPoints.length / 8));
  chartPoints.forEach((p: ChartPoint, i: number) => {
    if (i % step === 0 || i === chartPoints.length - 1) {
      const d = new Date(p.date);
      xLabels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
  });

  
  const yMax = Math.max(...salesData, 1);
  const yTicks = [yMax, Math.round(yMax * 0.75), Math.round(yMax * 0.5), Math.round(yMax * 0.25), 0];

  const selectedRangeLabel = RANGE_OPTIONS.find((o) => o.value === chartRange)?.label || 'Last 30 days';

  
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7]">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">

        
        <h1 className="text-[32px] font-bold text-[#404145] mb-8 tracking-tight">Analytics</h1>

        
        <div className="flex items-center gap-8 border-b border-[#e4e5e7] mb-8">
          <div className="pb-3 text-[15px] font-semibold text-[#1dbf73] border-b-2 border-[#1dbf73] cursor-pointer">
            Overview
          </div>
          <Link to="/seller/analytics/repeat-business" className="pb-3 text-[15px] font-semibold text-[#b5b6ba] hover:text-[#7a7d85] transition-colors">
            Repeat business
          </Link>
          <div className="pb-3 text-[15px] font-semibold text-[#b5b6ba] flex items-center gap-2 cursor-pointer hover:text-[#7a7d85] transition-colors">
            Keyword research <Lock size={14} className="mb-0.5" />
          </div>
        </div>

        
        {overviewQuery.isLoading && (
          <div className="text-center py-10 text-[#74767e]">Loading analytics…</div>
        )}

        
        {overviewQuery.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded p-4 mb-6">
            Could not load analytics data: {overviewQuery.error?.message}
          </div>
        )}

        
        <div className="bg-white border border-[#e4e5e7] rounded-sm mb-8 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#e4e5e7]">

          <div className="flex-1 py-8 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#404145] mb-3">
              Earnings to date <HelpCircle size={14} className="text-[#b5b6ba]" />
            </div>
            <div className="text-[28px] font-bold text-[#404145]">
              ₹{(overview.totalEarnings ?? 0).toLocaleString()}
            </div>
          </div>

          <div className="flex-1 py-8 flex flex-col items-center justify-center text-center">
            <div className="text-[13px] font-bold text-[#404145] mb-3">
              Avg. selling price
            </div>
            <div className="text-[28px] font-bold text-[#404145]">
              ₹{(overview.avgSellingPrice ?? 0).toLocaleString()}
            </div>
          </div>

          <div className="flex-1 py-8 flex flex-col items-center justify-center text-center">
            <div className="text-[13px] font-bold text-[#404145] mb-3">
              On-time delivery
            </div>
            <div className="text-[28px] font-bold text-[#404145]">
              {overview.deliveryRate ?? 100}%
            </div>
          </div>

          <div className="flex-1 py-8 flex flex-col items-center justify-center text-center">
            <div className="text-[13px] font-bold text-[#404145] mb-3">
              Orders completed
            </div>
            <div className="text-[28px] font-bold text-[#404145]">
              {overview.ordersCompleted ?? 0}
            </div>
          </div>

          <div className="flex-1 py-8 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#404145] mb-3">
              Earned in {currentMonth} <HelpCircle size={14} className="text-[#b5b6ba]" />
            </div>
            <div className="text-[28px] font-bold text-[#404145]">
              ₹{(overview.monthlyEarnings ?? 0).toLocaleString()}
            </div>
          </div>

        </div>

        
        <div className="bg-white border border-[#e4e5e7] rounded-sm mb-8">
          <div className="p-6 border-b border-[#e4e5e7] flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-[#404145]">Overview</h3>

            
            <div className="relative">
              <button
                onClick={() => setRangeOpen((o) => !o)}
                className="flex items-center gap-2 text-[14px] text-[#404145] font-semibold"
              >
                {selectedRangeLabel} <ChevronDown size={14} className="text-[#62646a]" />
              </button>
              {rangeOpen && (
                <div className="absolute right-0 top-full mt-1 z-10 w-44 bg-white border border-[#e4e5e7] rounded shadow-md">
                  {RANGE_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => { setChartRange(o.value); setRangeOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#f7f7f7] transition-colors ${chartRange === o.value ? 'text-[#1dbf73] font-semibold' : 'text-[#404145]'}`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-6 pt-4">
            
            <div className="flex flex-wrap items-center gap-6 mb-10 pl-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#49c5e3]"></div>
                <span className="text-[13px] text-[#62646a]">Sales <span className="font-bold text-[#404145]">₹{totalSales.toLocaleString()}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#b5b6ba]"></div>
                <span className="text-[13px] text-[#62646a]">Cancelled <span className="font-bold text-[#404145]">₹{totalCancelled.toLocaleString()}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1432c3]"></div>
                <span className="text-[13px] text-[#62646a]">Completed <span className="font-bold text-[#404145]">{totalCompleted.toLocaleString()}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1dbf73]"></div>
                <span className="text-[13px] text-[#62646a]">New Orders <span className="font-bold text-[#404145]">{totalNewOrders.toLocaleString()}</span></span>
              </div>
            </div>

            
            {chartQuery.isLoading ? (
              <div className="h-[250px] flex items-center justify-center text-[#b5b6ba] text-sm">Loading chart…</div>
            ) : (
              <div className="relative h-[250px] ml-12 border-l border-b border-[#b5b6ba] pb-2 pl-2 pr-4">

                
                <div className="absolute -left-10 top-0 w-9 text-right text-[11px] text-[#b5b6ba] font-medium flex flex-col justify-between h-full pb-2">
                  {yTicks.map((v) => (
                    <span key={v}>₹{v}</span>
                  ))}
                </div>

                
                <div className="absolute inset-0 top-0 bottom-0 left-0 flex flex-col justify-between pointer-events-none">
                  {yTicks.slice(0, -1).map((_, i) => (
                    <div key={i} className="w-full border-t border-dashed border-[#e4e5e7]" />
                  ))}
                  <div className="w-full" />
                </div>

                
                <div className="absolute inset-0 bottom-1 left-1 right-2">
                  <Sparkline data={salesData} color="#49c5e3" />
                </div>

                
                <div className="absolute -bottom-8 left-0 w-full flex justify-between px-2 text-[11px] text-[#b5b6ba] font-medium">
                  {xLabels.map((label, i) => (
                    <div key={i} className="text-center leading-tight">{label}</div>
                  ))}
                </div>
              </div>
            )}

            <div className="h-10" />
          </div>
        </div>

        
        <div className="bg-white border border-[#e4e5e7] rounded-sm p-8 mb-8 flex flex-col items-center">
          <div className="w-full text-left mb-8">
            <h3 className="text-[16px] font-bold text-[#404145]">
              World Domination {mapPoints.length > 0 ? `${mapPoints.length} countr${mapPoints.length === 1 ? 'y' : 'ies'}` : '0%'}
            </h3>
          </div>

          <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center py-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
              alt="World Map"
              className="w-full h-auto"
              style={{ filter: 'brightness(0) opacity(0.15)' }}
            />

            
            {mapPoints.map((point: MapPoint, i: number) => {
              
              
              const xPct = ((point.lng + 180) / 360) * 100;
              const yPct = ((90 - point.lat) / 180) * 100;
              return (
                <div
                  key={i}
                  title={point.country}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${xPct}%`, top: `${yPct}%` }}
                >
                  <MapPin size={18} className="text-[#49c5e3] fill-current drop-shadow" strokeWidth={1.5} />
                </div>
              );
            })}

            
            {mapPoints.length === 0 && (
              <div className="absolute left-[69%] top-[43%] -translate-x-1/2 -translate-y-1/2">
                <MapPin size={20} className="text-[#49c5e3] fill-current" strokeWidth={1.5} />
              </div>
            )}
          </div>

          {mapPoints.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {mapPoints.map((p, i) => (
                <span key={i} className="text-[12px] text-[#74767e] bg-[#f7f7f7] border border-[#e4e5e7] px-2.5 py-1 rounded-full">
                  {p.country}
                </span>
              ))}
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}
