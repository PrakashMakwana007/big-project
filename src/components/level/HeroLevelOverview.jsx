import React from 'react';
import { User, Circle, CheckCircle2, Lock, BadgeInfo, Sparkles } from 'lucide-react';
import MetricCard from './MetricCard';

function LeftCard() {
  return (
    <div className="rounded-[18px] border border-[#e4e5e7] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-white bg-[#111827] text-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
          <Sparkles size={32} className="text-[#b9a7ff]" />
        </div>
        <div>
          <div className="text-sm text-gray-500">Level</div>
          <div className="text-2xl font-semibold text-gray-900">New</div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">New</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5d4ec] text-[#d06bb4]">
            <CheckCircle2 size={16} />
          </span>
        </div>

        <div className="h-1 w-8 rounded-full bg-[#cfd2d7]" />
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">Lv 1</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500">
            <Lock size={14} />
          </span>
        </div>
        <div className="h-1 w-8 rounded-full bg-[#cfd2d7]" />
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">Lv 2</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500">
            <Lock size={14} />
          </span>
        </div>
        <div className="h-1 w-8 rounded-full bg-[#cfd2d7]" />
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">Top</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500">
            <Lock size={14} />
          </span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="text-lg font-semibold text-gray-900">Progress tracker</div>
        <div className="mt-3 flex items-center justify-center gap-1 text-gray-400">
          {Array.from({ length: 6 }).map((_, index) => (
            <CheckCircle2 key={index} size={14} />
          ))}
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-500">
          Once you qualify for the next level in all 6 metrics, you'll advance to Level 1.
        </p>
      </div>
    </div>
  );
}

export default function HeroLevelOverview() {
  return (
    <section className="rounded-lg overflow-hidden bg-gradient-to-r from-pink-50 via-purple-50 to-white p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Level overview</h1>
          </div>
          <a className="inline-flex items-center gap-1 text-sm font-semibold text-white/95 hover:text-white hover:underline">
            How the level system works <BadgeInfo size={14} />
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <LeftCard />
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MetricCard title="Success score" value="72" subtitle="Improve to reach next level" />
            <MetricCard title="Rating" value="4.8" subtitle="Recent buyer feedback" />
            <MetricCard title="Response rate" value="95%" subtitle="Keep messages timely" />
            <MetricCard title="Orders" value="12" subtitle="Completed in last 90 days" />
            <MetricCard title="Unique clients" value="8" subtitle="Repeat buyers count" />
            <MetricCard title="Earnings" value="$2,400" subtitle="Last 90 days" />
          </div>
        </div>
      </div>
    </section>
  );
}
