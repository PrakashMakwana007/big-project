import React from 'react';
import { MailOpen } from 'lucide-react';

export default function NotificationCard({ title, message, time }) {
  return (
    <div className="flex items-start gap-3 rounded-lg px-3 py-3 transition-colors duration-150 hover:bg-[#f5f5f5]">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4f4f4] text-gray-500 ring-1 ring-[#e4e5e7]">
        <div className="h-3 w-3 rounded-full bg-[#1dbf73]" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium leading-5 text-[#404145]">{title}</div>
        <div className="mt-0.5 text-xs leading-5 text-[#74767e]">{message}</div>
        <div className="mt-1 text-xs text-[#74767e]">{time}</div>
      </div>

      <button type="button" aria-label="Mark notification as read" className="mt-1 shrink-0 rounded-full p-1 text-[#74767e] transition-colors duration-150 hover:bg-white hover:text-[#404145]">
        <MailOpen size={16} />
      </button>
    </div>
  );
}
