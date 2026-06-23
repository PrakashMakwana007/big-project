import { useState } from 'react';
import { ChevronDown, HelpCircle, X } from 'lucide-react';
import ModalShell from '../profile/ui/ModalShell';
import api from '../../services/api';

const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const yearOptions = ['2025', '2024', '2023', '2022', '2021'];

export default function StatementEarningsModal({ isOpen, onClose }) {
  const [month, setMonth] = useState('January');
  const [year, setYear] = useState('2025');
  const user = api.auth.getSavedUser() || {};
  const displayName = user.name || (user.email ? user.email.split('@')[0] : 'username');

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Get your statement of earnings" sizeClass="max-w-[760px]" showCloseButton={false}>
      <div className="flex max-h-[90vh] flex-col overflow-hidden rounded-[12px] bg-white">
        <div className="flex items-start justify-between gap-4 px-6 py-5 sm:px-8 sm:py-6">
          <h2 className="text-[34px] font-semibold tracking-tight text-gray-900">Get your statement of earnings</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900"
            aria-label="Close statement modal"
          >
            <X size={26} />
          </button>
        </div>

        <div className="px-6 pb-6 sm:px-8">
          <p className="max-w-3xl text-[18px] leading-7 text-gray-600">
            Select a month and year your statement will cover a 12-month period.
            <br />
            Check your billing info to make sure your statement shows the correct details.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            <label className="block">
              <span className="flex items-center gap-2 text-[20px] font-semibold text-gray-900">
                12-month period from
                <HelpCircle size={18} className="text-gray-500" />
              </span>
              <div className="relative mt-3">
                <select
                  value={month}
                  onChange={(event) => setMonth(event.target.value)}
                  className="h-14 w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 pr-12 text-[18px] text-gray-700 outline-none transition-colors duration-150 focus:border-gray-500"
                >
                  {monthOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </label>

            <label className="block">
              <span className="flex items-center gap-2 text-[20px] font-semibold text-gray-900">
                Year
                <HelpCircle size={18} className="text-gray-500" />
              </span>
              <div className="relative mt-3">
                <select
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                  className="h-14 w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 pr-12 text-[18px] text-gray-700 outline-none transition-colors duration-150 focus:border-gray-500"
                >
                  {yearOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </label>
          </div>

          <hr className="my-10 border-gray-200" />

          <div>
            <div className="flex items-center gap-3 text-[18px] font-semibold text-gray-900">
              <span>Billing info</span>
              <a href="#" className="font-semibold text-gray-900 underline decoration-gray-900 decoration-1 underline-offset-4">
                Update
              </a>
            </div>

            <div className="mt-4 space-y-2 text-[18px] leading-7 text-gray-700">
              <p>{displayName}</p>
              <p>Gujarat</p>
              <p>India</p>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-end gap-4 px-6 py-6 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-6 py-3 text-[18px] font-semibold text-gray-900 transition-colors duration-200 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg bg-black px-6 py-3 text-[18px] font-semibold text-white transition-colors duration-200 hover:bg-gray-900"
          >
            Download Statement
          </button>
        </div>
      </div>
    </ModalShell>
  );
}