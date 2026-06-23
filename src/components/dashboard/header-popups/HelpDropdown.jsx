import React from 'react';
import { HelpCircle, BookOpen, MessageSquare, PenSquare, Headphones } from 'lucide-react';
import DropdownContainer from './DropdownContainer';

const HELP_ITEMS = [
  { label: 'Help Center', icon: HelpCircle },
  { label: 'Nexlance Forum', icon: MessageSquare },
  { label: 'Nexlance Blog', icon: BookOpen },
  { label: 'Ask the Community', icon: PenSquare },
  { label: 'Contact Support', icon: Headphones },
];

export default function HelpDropdown({ open }) {
  return (
    <DropdownContainer open={open} className="right-0 w-64">
      <div className="py-2">
        {HELP_ITEMS.map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#404145] transition-colors duration-150 hover:bg-[#f5f5f5]"
          >
            <item.icon size={16} className="text-[#74767e]" />
            {item.label}
          </button>
        ))}
      </div>
    </DropdownContainer>
  );
}
