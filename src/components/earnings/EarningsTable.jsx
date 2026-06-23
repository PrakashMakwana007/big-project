function EmptyState() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-8 flex items-end gap-4">
        <div className="h-28 w-20 rounded-3xl border border-gray-200 bg-white shadow-sm" />
        <div className="relative h-36 w-28 rounded-[28px] border border-gray-200 bg-white shadow-sm">
          <div className="absolute left-4 top-4 h-10 w-10 rounded-2xl bg-gray-100" />
          <div className="absolute bottom-4 right-4 h-16 w-10 rounded-2xl bg-gray-100" />
        </div>
        <div className="h-24 w-18 rounded-3xl border border-gray-200 bg-white shadow-sm" />
      </div>

      <h3 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-[28px]">Beginnings are so exciting!</h3>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-[15px]">
        You&apos;ll find all your earnings info here once you complete your first order.
      </p>
    </div>
  );
}

export default function EarningsTable({ columns, rows }) {
  return (
    <section className="overflow-hidden rounded-[12px] border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 sm:px-6"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {rows && rows.length > 0 ? (
              rows.map((row) => (
                <tr key={row.id} className="transition-colors duration-150 hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-900 sm:px-6">{row.date}</td>
                  <td className="px-4 py-4 text-sm text-gray-700 sm:px-6">{row.activity}</td>
                  <td className="px-4 py-4 text-sm text-gray-700 sm:px-6">{row.description}</td>
                  <td className="px-4 py-4 text-sm text-gray-700 sm:px-6">{row.from}</td>
                  <td className="px-4 py-4 text-sm text-gray-700 sm:px-6">{row.order}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900 sm:px-6">{row.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-0 py-0">
                  <EmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}