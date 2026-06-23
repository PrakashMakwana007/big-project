import React from 'react';
import DropdownContainer from './DropdownContainer';
import InboxMessageCard from './InboxMessageCard';

export default function InboxDropdown({ open }) {
  return (
    <DropdownContainer open={open} className="right-0 w-[26rem] max-w-[calc(100vw-1.5rem)]">
      <div className="border-b border-[#e4e5e7] px-4 py-3">
        <div className="text-sm font-semibold text-[#404145]">Inbox (0)</div>
      </div>

      <div className="max-h-72 overflow-y-auto px-1 py-2">
        <InboxMessageCard
          name="Nexlance Support"
          preview="Thanks for reaching out. Please share a few more details and we’ll help you right away."
          time="2h ago"
          unread={true}
          avatarUrl="https://i.pravatar.cc/40?u=1"
        />
        <InboxMessageCard
          name="Muhammad A"
          preview="You have a new message."
          time="2 weeks"
          unread={false}
          avatarUrl="https://i.pravatar.cc/40?u=2"
        />
      </div>

      <div className="border-t border-[#e4e5e7] px-4 py-3 text-right">
        <button type="button" className="text-sm font-medium text-[#1dbf73] transition-colors duration-150 hover:underline">
          See All In Inbox
        </button>
      </div>
    </DropdownContainer>
  );
}
