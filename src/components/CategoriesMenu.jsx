import { useState, useEffect } from 'react';
import { getCategories } from '../services/gigMetadataService';

export default function CategoriesMenu({ handleProtectedAction }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getCategories();


        const data = response?.data?.data || response?.data || [];

        console.log("CATEGORIES:", data);


        setCategories(Array.isArray(data) ? data : []);

      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) return null;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-[57px] z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-6 overflow-x-auto py-3 scrollbar-hide">


          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((cat) => (
              <button
                key={cat._id}
                type="button"
                className="flex items-center gap-1.5 whitespace-nowrap border-b-2 border-transparent pb-1 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-[#22c55e] hover:text-[#22c55e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer flex-shrink-0"
              >
                <span>{cat.name}</span>
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-400">No categories found</p>
          )}

        </div>
      </div>
    </div>
  );
}