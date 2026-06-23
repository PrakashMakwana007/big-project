import { useState } from 'react';
import { X } from 'lucide-react';

function normalizeTag(tag) {
  return String(tag || '').trim();
}

export default function TagChipsInput({
  id,
  label,
  description,
  tags,
  onChange,
  placeholder,
  active,
  onFocus,
}) {
  const [inputValue, setInputValue] = useState('');

  const commitTag = () => {
    const nextTag = normalizeTag(inputValue);
    if (!nextTag) {
      return;
    }

    const existing = Array.isArray(tags) ? tags : [];
    if (existing.some((tag) => tag.toLowerCase() === nextTag.toLowerCase())) {
      setInputValue('');
      return;
    }

    onChange([...existing, nextTag]);
    setInputValue('');
  };

  const removeTag = (tagToRemove) => {
    onChange((Array.isArray(tags) ? tags : []).filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      commitTag();
    }

    if (event.key === 'Backspace' && !inputValue && (tags || []).length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <span className="text-xs text-gray-500">{(tags || []).length} / 5 max</span>
      </div>
      {description ? <p className="mb-3 text-sm text-gray-500">{description}</p> : null}

      <div
        className={`rounded-md border px-3 py-2 transition-all duration-200 focus-within:border-[#22c55e] focus-within:ring-2 focus-within:ring-[#22c55e]/20 ${
          active ? 'border-[#22c55e]' : 'border-gray-300'
        }`}
      >
        <div className="flex flex-wrap gap-2">
          {(tags || []).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
            >
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="cursor-pointer rounded-full p-0.5 hover:bg-emerald-100" aria-label={`Remove ${tag}`}>
                <X size={12} />
              </button>
            </span>
          ))}
          <input
            id={id}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onBlur={commitTag}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            placeholder={placeholder}
            className="min-w-[220px] flex-1 border-0 bg-transparent p-1 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
      </div>

      <p className="mt-2 text-xs text-gray-500">Press Enter or comma to add a tag.</p>
    </div>
  );
}
