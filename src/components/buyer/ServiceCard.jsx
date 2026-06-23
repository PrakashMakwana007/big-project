import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ title, links, imageUrl }) {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      
      <div className="h-48 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>

      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-[#404145] mb-4">{title}</h3>
        
        <ul className="flex-grow space-y-3">
          {links.map((link, index) => (
            <li key={index}>
              <Link 
                to="#" 
                className="text-[15px] text-[#62646a] hover:underline flex items-center group/link"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2">
          <Link to="#" className="text-[15px] font-semibold text-[#1dbf73] hover:underline flex items-center gap-1 group/more">
            Explore All
            <ArrowRight size={16} className="transition-transform group-hover/more:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
