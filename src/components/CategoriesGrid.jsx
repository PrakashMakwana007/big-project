import { useState, useEffect } from 'react';
import { getCategories } from '../services/gigMetadataService';

function CategoryCard({ category }) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
        <p className="text-sm text-gray-600 flex-1">{category.description || 'Explore services in this category'}</p>
        <button className="w-full border border-gray-300 text-sm font-semibold py-2 rounded-full hover:bg-gray-50 transition-colors text-gray-700">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default function CategoriesGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();

        console.log("API RESPONSE:", data);


        if (Array.isArray(data)) {
          setCategories(data);
        } else if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else if (Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          console.error("Unexpected format:", data);
          setCategories([]);
        }

      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500">Loading categories...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Explore Categories</h2>
          <p className="text-gray-500 text-sm">Choose your service category and get started today</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(categories) && categories.map((cat) => (
            <CategoryCard key={cat._id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
