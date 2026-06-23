import { useState, useEffect } from 'react';
import { getCategories } from '../services/gigMetadataService';

export default function PopularCategories({ handleProtectedAction }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Popular Categories</h2>
            <p className="text-gray-500 text-sm">Explore services across different industries</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat._id}
              type="button"
              className="bg-white hover:bg-gray-50 rounded-lg p-4 flex flex-col items-center text-center gap-2 transition-all duration-300 cursor-pointer group hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 border border-gray-200"
            >
              <p className="font-semibold text-gray-800 text-sm leading-tight">{cat.name}</p>
              <p className="text-xs text-gray-500">{cat.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
