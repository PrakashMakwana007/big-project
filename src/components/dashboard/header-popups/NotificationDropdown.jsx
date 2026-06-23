import React from 'react';
import { BellRing, Settings2, Volume2 } from 'lucide-react';
import DropdownContainer from './DropdownContainer';
import NotificationCard from './NotificationCard';

export default function NotificationDropdown({ open }) {
  return (
    <DropdownContainer open={open} className="right-0 w-[26rem] max-w-[calc(100vw-1.5rem)]">
      <div className="border-b border-[#e4e5e7] px-4 py-3">
        <div className="text-sm font-semibold text-[#404145]">Notifications (1)</div>
      </div>

      <div className="max-h-72 overflow-y-auto px-1 py-2">
        <NotificationCard
          title="Your order has a new update"
          message="A buyer replied to your order and the conversation is waiting for your review."
          time="12m ago"
        />
      </div>

      <div className="flex items-center justify-between border-t border-[#e4e5e7] px-3 py-2">
        <div className="flex items-center gap-2 text-[#74767e]">
          <button type="button" className="rounded-full p-2 transition-colors duration-150 hover:bg-[#f5f5f5] hover:text-[#404145]" aria-label="Notification sound">
            <Volume2 size={16} />
          </button>
          <button type="button" className="rounded-full p-2 transition-colors duration-150 hover:bg-[#f5f5f5] hover:text-[#404145]" aria-label="Notification settings">
            <Settings2 size={16} />
          </button>
        </div>

        <button type="button" className="rounded-md px-3 py-2 text-sm font-medium text-[#1dbf73] transition-colors duration-150 hover:bg-[#f5f5f5]">
          See all
        </button>
      </div>
    </DropdownContainer>
  );
}
