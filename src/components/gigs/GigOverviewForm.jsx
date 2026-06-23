import { useMemo } from 'react';
import GigMetadata from './GigMetadata';
import TagChipsInput from './TagChipsInput';

export default function GigOverviewForm({
  onSaveContinue,
  activeField,
  setActiveField,
  categories,
  subcategories,
  metadata,
  selectedCategory,
  selectedSubcategory,
  selectedMetadata,
  metadataLoading,
  metadataError,
  categoriesLoading,
  categoriesError,
  subcategoriesLoading,
  subcategoriesError,
  onCategoryChange,
  onSubcategoryChange,
  onMetadataSelect,
  gigTitle,
  setGigTitle,
  description,
  setDescription,
  searchTags,
  setSearchTags,
  positiveKeywords,
  setPositiveKeywords,
}) {
  const titleCount = gigTitle.length;
  const normalizedCategories = useMemo(() => categories || [], [categories]);
  const normalizedSubcategories = useMemo(() => subcategories || [], [subcategories]);

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-md">
      <h1 className="text-2xl font-semibold text-gray-900">Gig Overview</h1>

      <div className="mt-8 space-y-8">
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label htmlFor="gigTitle" className="text-sm font-medium text-gray-700">
              Gig title
            </label>
            <span className="text-xs text-gray-500">{titleCount} / 80 max</span>
          </div>
          <p className="mb-3 text-sm text-gray-500">
            As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.
          </p>
          <input
            id="gigTitle"
            type="text"
            value={gigTitle}
            maxLength={80}
            onChange={(event) => setGigTitle(event.target.value)}
            onFocus={() => setActiveField('gigTitle')}
            onClick={() => setActiveField('gigTitle')}
            placeholder="I will do something I'm really good at"
            className={`h-12 w-full rounded-md border px-4 text-sm text-gray-800 placeholder:text-gray-400 transition-all duration-200 focus:border-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 ${
              activeField === 'gigTitle' ? 'border-[#22c55e]' : 'border-gray-300'
            }`}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(event) => onCategoryChange(event.target.value)}
              onFocus={() => setActiveField('category')}
              onClick={() => setActiveField('category')}
              disabled={categoriesLoading}
              className={`h-12 w-full rounded-md border bg-white px-3 text-sm text-gray-700 transition-all duration-200 focus:border-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 ${
                activeField === 'category' ? 'border-[#22c55e]' : 'border-gray-300'
              }`}
            >
              <option value="">{categoriesLoading ? 'Loading categories...' : 'Select a category'}</option>
              {normalizedCategories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            {categoriesError ? <p className="mt-2 text-xs text-red-600">{categoriesError}</p> : null}
          </div>

          <div>
            <label htmlFor="subcategory" className="mb-2 block text-sm font-medium text-gray-700">
              Subcategory
            </label>
            <select
              id="subcategory"
              value={selectedSubcategory}
              onChange={(event) => onSubcategoryChange(event.target.value)}
              onFocus={() => setActiveField('category')}
              onClick={() => setActiveField('category')}
              disabled={subcategoriesLoading || !selectedCategory}
              className={`h-12 w-full rounded-md border bg-white px-3 text-sm text-gray-700 transition-all duration-200 focus:border-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 ${
                activeField === 'category' ? 'border-[#22c55e]' : 'border-gray-300'
              }`}
            >
              <option value="">{subcategoriesLoading ? 'Loading subcategories...' : 'Select a subcategory'}</option>
              {normalizedSubcategories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            {subcategoriesError ? <p className="mt-2 text-xs text-red-600">{subcategoriesError}</p> : null}
          </div>
        </div>

        <GigMetadata
          metadata={metadata}
          selectedMetadata={selectedMetadata}
          onSelectMetadata={onMetadataSelect}
          isLoading={metadataLoading}
          error={metadataError}
        />

        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>
          <p className="mb-3 text-sm text-gray-500">Briefly describe what buyers will get and how your service stands out.</p>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            onFocus={() => setActiveField('description')}
            onClick={() => setActiveField('description')}
            rows={5}
            placeholder="Describe your offer, process, and delivery outcome..."
            className={`w-full rounded-md border px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 transition-all duration-200 focus:border-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 ${
              activeField === 'description' ? 'border-[#22c55e]' : 'border-gray-300'
            }`}
          />
        </div>

        <TagChipsInput
          id="searchTags"
          label="Search tags"
          description="Tag your Gig with words buyers are likely to search for."
          tags={searchTags}
          onChange={setSearchTags}
          placeholder="Type and press Enter"
          active={activeField === 'searchTags'}
          onFocus={() => setActiveField('searchTags')}
        />

        <TagChipsInput
          id="positiveKeywords"
          label="Positive keywords"
          description="Add keywords that describe your strongest positioning and outcomes."
          tags={positiveKeywords}
          onChange={setPositiveKeywords}
          placeholder="Add a keyword"
          active={activeField === 'positiveKeywords'}
          onFocus={() => setActiveField('positiveKeywords')}
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onSaveContinue}
            className="rounded-md bg-[#222325] px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-black cursor-pointer"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </section>
  );
}
