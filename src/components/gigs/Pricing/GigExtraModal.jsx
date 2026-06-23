import { useState } from 'react';

export default function GigExtraModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      id: `custom-extra-${Date.now()}`,
      name: title,
      description,
      defaultPrice: price,
      deliveryDays,
    });
    setTitle('');
    setDescription('');
    setPrice('');
    setDeliveryDays('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-[#404145]">Add Extra Service</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="mb-1 block text-sm font-semibold text-[#404145]">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="I will..."
              className="w-full rounded border border-gray-300 px-3 py-2 text-[15px] focus:border-black focus:outline-none"
              maxLength={40}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-[#404145]">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you are offering"
              rows={3}
              className="w-full rounded border border-gray-300 px-3 py-2 text-[15px] focus:border-black focus:outline-none resize-none"
              maxLength={100}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-semibold text-[#404145]">Price ($)</label>
              <input
                type="number"
                min="5"
                step="5"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="5"
                className="w-full rounded border border-gray-300 px-3 py-2 text-[15px] focus:border-black focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-sm font-semibold text-[#404145]">Additional Days</label>
              <input
                type="number"
                min="1"
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                placeholder="1"
                className="w-full rounded border border-gray-300 px-3 py-2 text-[15px] focus:border-black focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded px-4 py-2 text-[15px] font-semibold text-[#404145] hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="rounded bg-black px-6 py-2 text-[15px] font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
          >
            Save Extra
          </button>
        </div>
      </div>
    </div>
  );
}
