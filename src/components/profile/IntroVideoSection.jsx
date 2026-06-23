import React from 'react';
import { PlayCircle } from 'lucide-react';

export default function IntroVideoSection({ onAddIntroVideo }) {
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <h2 className="text-xl font-semibold text-gray-900">Intro Video</h2>
      <div className="mt-4 flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#22c55e] shadow-sm">
            <PlayCircle size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Introduce yourself and make a connection with potential clients.</p>
          </div>
        </div>

        <button type="button" onClick={onAddIntroVideo} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-white cursor-pointer">
          Add Intro Video
        </button>
      </div>
    </section>
  );
}