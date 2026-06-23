import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ResourcesSection() {
  const resources = [
    {
      id: 1,
      title: 'How to Write a Winning Service Description',
      description: 'Learn the secrets to attract more clients with compelling service copy',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
      category: 'Guide',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Pricing Strategies for Freelancers',
      description: 'Master the art of pricing your services competitively',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
      category: 'Strategy',
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'Growing Your Client Base in 2026',
      description: 'Effective marketing tactics to expand your freelance business',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
      category: 'Marketing',
      readTime: '6 min read',
    },
    {
      id: 4,
      title: 'Time Management for Busy Freelancers',
      description: 'Productivity tips to handle multiple projects efficiently',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
      category: 'Productivity',
      readTime: '4 min read',
    },
  ];

  return (
    <div>
      
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-gray-900">Resources</h3>
        <p className="mt-1 text-sm text-gray-500">Tips to grow your freelance business</p>
      </div>

      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="group cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
          >
            
            <div className="relative overflow-hidden h-40 bg-gray-200">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-[#22c55e] text-white text-xs font-bold px-3 py-1 rounded-full">
                {resource.category}
              </span>
            </div>

            
            <div className="p-4">
              <h4 className="mb-2 line-clamp-2 font-semibold text-gray-900">{resource.title}</h4>
              <p className="mb-4 line-clamp-2 text-sm text-gray-500">{resource.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{resource.readTime}</span>
                <button className="flex items-center gap-1 text-sm font-medium text-[#22c55e] transition-all hover:gap-2">
                  Read Article
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
