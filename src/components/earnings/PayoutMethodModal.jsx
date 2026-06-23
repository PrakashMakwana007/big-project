import { useMemo, useState } from 'react';
import { Banknote, ChevronDown, CircleDot, CircleEllipsis, CreditCard, X } from 'lucide-react';
import ModalShell from '../profile/ui/ModalShell';
import FormSelect from '../profile/ui/FormSelect';

function MethodIcon({ method }) {
  if (method === 'payoneer') {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white">
        <span className="h-6 w-6 rounded-full bg-[conic-gradient(from_180deg,#ff4d4f, #ffd666, #52c41a, #1677ff, #eb2f96)] p-[3px]">
          <span className="block h-full w-full rounded-full bg-white" />
        </span>
      </span>
    );
  }

  if (method === 'bank') {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600">
        <Banknote size={22} />
      </span>
    );
  }

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#2563eb]">
      <CreditCard size={22} />
    </span>
  );
}

function MethodRow({ method, title, subtitle, selected, currency, onSelect, onCurrencyChange, disabled = false }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(method)}
      className={`flex w-full items-start justify-between gap-4 border-b border-gray-200 px-5 py-5 text-left transition-colors duration-150 last:border-b-0 hover:bg-gray-50 ${
        selected ? 'bg-white' : 'bg-white'
      }`}
    >
      <div className="flex min-w-0 items-start gap-3">
        <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${selected ? 'border-gray-900' : 'border-gray-400'}`}>
          {selected ? <CircleDot size={14} className="text-gray-900" /> : <span className="h-2 w-2 rounded-full bg-transparent" />}
        </span>

        <MethodIcon method={method} />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-[18px] font-medium text-gray-900">{title}</p>
            {method === 'bank' ? <span className="text-sm font-medium text-gray-500">Powered by Payoneer</span> : null}
          </div>
          <ul className="mt-3 space-y-1 text-[17px] leading-7 text-gray-900">
            <li className="ml-5 list-disc">Up to {method === 'bank' ? '3 business days' : '1 business day'}</li>
            <li className="ml-5 list-disc">Fees may apply</li>
          </ul>
        </div>
      </div>

      <div className="shrink-0 pt-1">
        <div className={`${disabled ? 'opacity-55' : ''} w-[108px]`}>
          <FormSelect
            label=""
            value={currency}
            onChange={(event) => onCurrencyChange(method, event.target.value)}
            disabled={disabled}
            className="h-12 rounded-xl text-[17px] font-medium text-gray-900"
          >
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>INR</option>
          </FormSelect>
        </div>
      </div>
    </button>
  );
}

export default function PayoutMethodModal({ isOpen, onClose }) {
  const [selectedMethod, setSelectedMethod] = useState('payoneer');
  const [currencies, setCurrencies] = useState({
    payoneer: 'USD',
    bank: 'USD',
    paypal: 'USD',
  });

  const methods = useMemo(
    () => [
      { id: 'payoneer', title: 'Payoneer account' },
      { id: 'bank', title: 'Bank transfer' },
      { id: 'paypal', title: 'PayPal account' },
    ],
    [],
  );

  function updateCurrency(method, value) {
    setCurrencies((current) => ({ ...current, [method]: value }));
  }

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Add payout method" sizeClass="max-w-[720px]" showCloseButton={false}>
      <div className="flex max-h-[88vh] flex-col overflow-hidden rounded-[12px] bg-white">
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5 sm:px-8 sm:py-6">
          <div>
            <h2 className="text-[32px] font-semibold tracking-tight text-gray-900 sm:text-[36px]">Add payout method</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900"
            aria-label="Close payout method modal"
          >
            <X size={26} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 sm:px-8">
          <p className="text-[18px] leading-7 text-gray-900">Choose payout method and currency</p>

          <div className="mt-5 overflow-hidden rounded-[12px] border border-gray-300 bg-white">
            {methods.map((method) => (
              <MethodRow
                key={method.id}
                method={method.id}
                title={method.title}
                subtitle=""
                selected={selectedMethod === method.id}
                currency={currencies[method.id]}
                onSelect={setSelectedMethod}
                onCurrencyChange={updateCurrency}
                disabled={method.id === 'bank' && selectedMethod !== 'bank'}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 border-t border-gray-100 bg-white px-6 py-5 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-5 py-3 text-[17px] font-semibold text-gray-900 transition-colors duration-200 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-xl bg-gray-900 px-5 py-3 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-black"
          >
            Continue
          </button>
        </div>
      </div>
    </ModalShell>
  );
}