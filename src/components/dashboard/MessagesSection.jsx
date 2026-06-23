import React, { useState } from 'react';
import { MessageCircle, FileText } from 'lucide-react';

export default function MessagesSection() {
  const [activeTab, setActiveTab] = useState('messages');

  const messages = [
    {
      id: 1,
      clientName: 'Emily Johnson',
      clientImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      preview: 'Hi Sarah! Can you start on the homepage design?',
      timeAgo: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      clientName: 'Michael Brown',
      clientImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      preview: 'The latest revision looks great!',
      timeAgo: '5 hours ago',
      unread: false,
    },
  ];

  const briefs = [
    {
      id: 1,
      clientName: 'Startup XYZ',
      title: 'Mobile App Development',
      preview: 'Looking for a React developer for 3-month project',
      timeAgo: '1 day ago',
      budget: '$8,000 - $15,000',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      
      <div className="border-b border-gray-100 px-6 py-4">
        <h3 className="text-xl font-semibold text-gray-900">Respond to clients</h3>
      </div>

      
      <div className="border-b border-gray-100 px-6 flex gap-4 bg-gray-50">
        <button
          onClick={() => setActiveTab('messages')}
          className={`py-3 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'messages'
              ? 'text-[#22c55e] border-[#22c55e]'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          Messages
        </button>
        <button
          onClick={() => setActiveTab('briefs')}
          className={`py-3 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'briefs'
              ? 'text-[#22c55e] border-[#22c55e]'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          Briefs
        </button>
      </div>

      
      <div className="p-6">
        
        {activeTab === 'messages' && (
          <div className="space-y-3">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-lg border p-3 transition-all duration-200 cursor-pointer ${
                    msg.unread
                      ? 'bg-green-50 border-[#22c55e]'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={msg.clientImage}
                      alt={msg.clientName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-gray-900">{msg.clientName}</p>
                        {msg.unread && (
                          <span className="h-2 w-2 bg-[#22c55e] rounded-full flex-shrink-0"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{msg.preview}</p>
                      <p className="text-xs text-gray-400 mt-1">{msg.timeAgo}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-6 text-sm">No messages yet</p>
            )}
          </div>
        )}

        
        {activeTab === 'briefs' && (
          <div className="space-y-3">
            {briefs.length > 0 ? (
              briefs.map((brief) => (
                <div
                  key={brief.id}
                  className="rounded-lg border border-gray-200 p-3 transition-all duration-200 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{brief.clientName}</p>
                      <p className="text-sm font-medium text-gray-900">{brief.title}</p>
                    </div>
                    <span className="text-[#22c55e] font-semibold text-sm">{brief.budget}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{brief.preview}</p>
                  <p className="text-xs text-gray-400 mt-2">{brief.timeAgo}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-6 text-sm">No briefs available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
