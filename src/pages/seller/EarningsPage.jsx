import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Download, FileText, ShieldCheck } from 'lucide-react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Footer from '../../components/dashboard/Footer';
import DropdownSelect from '../../components/earnings/DropdownSelect';
import EarningsSummaryCard from '../../components/earnings/EarningsSummaryCard';
import EarningsFiltersBar from '../../components/earnings/EarningsFiltersBar';
import EarningsTable from '../../components/earnings/EarningsTable';
import PayoutMethodModal from '../../components/earnings/PayoutMethodModal';
import StatementEarningsModal from '../../components/earnings/StatementEarningsModal';

export default function EarningsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('All time');
  const [activityFilter, setActivityFilter] = useState('All activity');
  const [viewMode, setViewMode] = useState('grid');
  const [earningsScope, setEarningsScope] = useState('Since joining');
  const [statementDateRangeOpen, setStatementDateRangeOpen] = useState(false);
  const [statementMonth, setStatementMonth] = useState('Select a month');
  const [statementFrom, setStatementFrom] = useState('');
  const [statementTo, setStatementTo] = useState('');
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);

  const summaryRows = [
    {
      label: 'Balance available for use',
      value: '$0.00',
      helper: 'Ready to withdraw after payouts are enabled',
    },
  ];

  const futurePaymentsRows = [
    {
      label: 'Payments being cleared',
      value: '$0.00',
      helper: 'Funds move here after order completion',
    },
    {
      label: 'Payments for active orders',
      value: '$0.00',
      helper: 'Released when active orders are marked complete',
    },
  ];

  const earningsRows = [
    {
      label: 'Earnings to date',
      value: '$0.00',
      helper: 'Track total revenue earned on Nexlance',
    },
    {
      label: 'Expenses to date',
      value: '$0.00',
      helper: 'Platform fees and related deductions',
    },
  ];

  const tableColumns = ['Date', 'Activity', 'Description', 'From', 'Order', 'Amount'];
  const tableRows = [];

  const statementMonths = ['Select a month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function renderOverview() {
    return (
      <div className="space-y-6">
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <EarningsSummaryCard
            title="Available funds"
            description="Balance available for use"
            value="$0.00"
            actionLabel="Add payout method"
            actionVariant="dark"
            actionOnClick={() => setPayoutModalOpen(true)}
          >
            {summaryRows.map((row) => (
              <div key={row.label} className="space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-gray-700">{row.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{row.value}</p>
                </div>
                <p className="text-xs leading-5 text-gray-500">{row.helper}</p>
              </div>
            ))}
          </EarningsSummaryCard>

          <EarningsSummaryCard title="Future payments" description="Payments being cleared">
            {futurePaymentsRows.map((row, index) => (
              <div key={row.label}>
                {index > 0 && <div className="my-4 border-t border-gray-200" />}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-gray-700">{row.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{row.value}</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-500">{row.helper}</p>
                </div>
              </div>
            ))}
          </EarningsSummaryCard>

          <EarningsSummaryCard
            title="Earnings & expenses"
            description="Overview of your earnings and costs"
            trailingAction={
              <DropdownSelect
                value={earningsScope}
                onChange={setEarningsScope}
                options={['Since joining', 'Last 30 days', 'This year', 'All time']}
                align="right"
                className="min-w-[160px]"
              />
            }
          >
            {earningsRows.map((row, index) => (
              <div key={row.label}>
                {index > 0 && <div className="my-4 border-t border-gray-200" />}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-gray-700">{row.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{row.value}</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-500">{row.helper}</p>
                </div>
              </div>
            ))}
          </EarningsSummaryCard>
        </section>

        <EarningsFiltersBar
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          activityFilter={activityFilter}
          onActivityFilterChange={setActivityFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <EarningsTable columns={tableColumns} rows={tableRows} />
      </div>
    );
  }

  function renderFinancialDocuments() {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="rounded-[12px] border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[20px] font-semibold tracking-tight text-gray-900">Statement of earnings</h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-gray-600">
                Choose a date range and download a statement summarizing your yearly earnings.
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-500">
              <FileText size={20} />
            </div>
          </div>

          <div className="relative mt-10">
            <button
              type="button"
              onClick={() => setStatementDateRangeOpen((current) => !current)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-900 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-50"
            >
              Choose date range
              <ChevronDown size={16} className={`transition-transform duration-200 ${statementDateRangeOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:border-gray-300 hover:bg-gray-50"
              >
                <Download size={16} />
                Download statement
              </button>
            </div>

          </div>
        </section>

        <section className="rounded-[12px] border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[20px] font-semibold tracking-tight text-gray-900">Form W-9</h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-gray-600">
                You&apos;ve declared you&apos;re not a U.S. person, so you aren&apos;t required to complete a Form W-9.
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-500">
              <ShieldCheck size={20} />
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-900 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-50"
            >
              Update your declaration
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6f7] text-gray-900">
      <DashboardNavbar />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-[44px] sm:leading-tight">
                Earnings
              </h1>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
            >
              Learn more about this page
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="mb-7 border-b border-gray-200">
            <div className="flex items-center gap-8 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'documents', label: 'Financial documents' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-b border-black text-black'
                      : 'border-b border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'documents' ? renderFinancialDocuments() : renderOverview()}
        </div>
      </main>

      <Footer />
      <PayoutMethodModal isOpen={payoutModalOpen} onClose={() => setPayoutModalOpen(false)} />
      <StatementEarningsModal isOpen={statementDateRangeOpen} onClose={() => setStatementDateRangeOpen(false)} />
    </div>
  );
}
