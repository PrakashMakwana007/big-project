import { Grid2X2, List, Mail } from 'lucide-react';
import DropdownSelect from './DropdownSelect';

export default function EarningsFiltersBar({
  dateRange,
  onDateRangeChange,
  activityFilter,
  onActivityFilterChange,
  viewMode,
  onViewModeChange,
}) {
  return (
    <section className="rounded-[12px] border border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <DropdownSelect
            value={dateRange}
            onChange={onDateRangeChange}
            options={['All time', 'Last 7 days', 'Last 30 days', 'This year']}
            className="w-full sm:w-48"
          />

          <DropdownSelect
            value={activityFilter}
            onChange={onActivityFilterChange}
            options={['All activity', 'Available funds', 'Future payments', 'Expenses']}
            className="w-full sm:w-48"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200 ${
                viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
              aria-label="Grid view"
            >
              <Grid2X2 size={16} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md transition-all duration-200 ${
                viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
              aria-label="List view"
            >
              <List size={16} />
            </button>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
          >
            <Mail size={16} />
            Email activity report
          </button>
        </div>
      </div>
    </section>
  );
}