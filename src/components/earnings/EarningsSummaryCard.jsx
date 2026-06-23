export default function EarningsSummaryCard({
  title,
  description,
  value,
  actionLabel,
  actionVariant = 'light',
  actionOnClick,
  trailingAction,
  children,
}) {
  return (
    <article className="rounded-[12px] border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>
        </div>
        {trailingAction ? <div className="shrink-0">{trailingAction}</div> : null}
      </div>

      {value ? <div className="mt-5 text-[34px] font-semibold tracking-tight text-gray-900">{value}</div> : null}

      <div className={`mt-5 space-y-4 ${value ? 'pt-5' : 'pt-1'}`}>
        {children}
      </div>

      {actionLabel ? (
        <div className="mt-5">
          <button
            type="button"
            onClick={actionOnClick}
            className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              actionVariant === 'dark'
                ? 'bg-black text-white hover:bg-gray-800 hover:shadow-md'
                : 'border border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {actionLabel}
          </button>
        </div>
      ) : null}
    </article>
  );
}