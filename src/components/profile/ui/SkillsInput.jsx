import React, { useState } from 'react';

export default function SkillsInput({ value = [], onChange }) {
  const [input, setInput] = useState('');

  const addTag = (tag) => {
    const t = tag.trim();
    if (!t) return;
    if (value.includes(t)) return;
    const next = [...value, t];
    onChange?.(next);
    setInput('');
  };

  const removeTag = (idx) => {
    const next = value.filter((_, i) => i !== idx);
    onChange?.(next);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    }
    if (e.key === 'Backspace' && !input && value.length) {
      removeTag(value.length - 1);
    }
  };

  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">Skills (Optional)</span>
      <div className="mt-2 flex items-center gap-2 flex-wrap">
        {value.map((tag, idx) => (
          <span key={tag + idx} className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
            <span>{tag}</span>
            <button type="button" onClick={() => removeTag(idx)} className="-mr-1 ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200">
              ×
            </button>
          </span>
        ))}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => addTag(input)}
          placeholder="Add a skill and press Enter"
          className="h-12 min-w-[160px] rounded-md border border-[#dadbdd] bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-150 focus:border-[#1dbf73] focus:ring-2 focus:ring-[#1dbf73]/15"
        />
      </div>
    </label>
  );
}
