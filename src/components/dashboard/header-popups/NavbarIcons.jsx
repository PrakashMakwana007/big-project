import React from 'react';
import { Bell, MessageCircle, HelpCircle } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import InboxDropdown from './InboxDropdown';
import HelpDropdown from './HelpDropdown';

function IconTrigger({ active, onClick, label, children, hasDot = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={active}
      className="relative rounded-full p-2 text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 hover:scale-[1.03]"
    >
      {children}
      {hasDot ? <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" /> : null}
    </button>
  );
}

export default function NavbarIcons({ openPopup, setOpenPopup, onInteract }) {
  const isOpen = (name) => openPopup === name;

  return (
    <div className="hidden items-center gap-4 lg:flex">
      <div className="relative">
        <IconTrigger
          active={isOpen('notifications')}
          label="Notifications"
          hasDot
          onClick={() => {
            onInteract?.();
            setOpenPopup(isOpen('notifications') ? null : 'notifications');
          }}
        >
          <Bell size={20} />
        </IconTrigger>
        <NotificationDropdown open={isOpen('notifications')} />
      </div>

      <div className="relative">
        <IconTrigger
          active={isOpen('inbox')}
          label="Inbox"
          onClick={() => {
            onInteract?.();
            setOpenPopup(isOpen('inbox') ? null : 'inbox');
          }}
        >
          <MessageCircle size={20} />
        </IconTrigger>
        <InboxDropdown open={isOpen('inbox')} />
      </div>

      <div className="relative">
        <IconTrigger
          active={isOpen('help')}
          label="Help"
          onClick={() => {
            onInteract?.();
            setOpenPopup(isOpen('help') ? null : 'help');
          }}
        >
          <HelpCircle size={20} />
        </IconTrigger>
        <HelpDropdown open={isOpen('help')} />
      </div>
    </div>
  );
}
