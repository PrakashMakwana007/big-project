import MetadataGroup from './MetadataGroup';

function MetadataSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
      <div className="mt-5 space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
            <div className="space-y-2">
              <div className="h-9 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-9 w-full animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-500">Loading metadata...</p>
    </div>
  );
}

export default function GigMetadata({ metadata, selectedMetadata, onSelectMetadata, isLoading, error }) {
  if (isLoading) {
    return <MetadataSkeleton />;
  }

  if (error) {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
        {error}
      </section>
    );
  }

  if (!metadata.length) {
    return null;
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900">Gig metadata</h2>

      <div className="mt-4">
        {metadata.map((group) => (
          <MetadataGroup
            key={group.id}
            group={group}
            selectedValue={selectedMetadata[group.id]}
            onSelect={onSelectMetadata}
          />
        ))}
      </div>
    </section>
  );
}