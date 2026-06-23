import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MarketplaceGigCard({ gig }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    if (gig.images && currentImageIdx < gig.images.length - 1) {
      setCurrentImageIdx(prev => prev + 1);
    }
  };

  const prevImage = (e) => {
    e.preventDefault();
    if (gig.images && currentImageIdx > 0) {
      setCurrentImageIdx(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col group relative">
      
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-gray-100 group/slider">
        <Link to={`/gig/${gig.id || Math.floor(Math.random() * 1000)}`} state={{ gig }}>
          <div 
            className="flex w-full h-full transition-transform duration-300 ease-in-out" 
            style={{ transform: `translateX(-${currentImageIdx * 100}%)` }}
          >
            {gig.images && gig.images.length > 0 ? (
              gig.images.map((img, idx) => (
                <img 
                  key={idx}
                  src={img} 
                  alt={`${gig.title} ${idx}`} 
                  className="w-full h-full object-cover shrink-0"
                />
              ))
            ) : (
              <img 
                src={gig.thumbnail} 
                alt={gig.title} 
                className="w-full h-full object-cover shrink-0"
              />
            )}
          </div>
        </Link>
        
        
        {gig.isPro && (
          <div className="absolute top-3 left-3 bg-black text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm z-10">
            PRO
          </div>
        )}

        <button className="absolute top-3 right-3 p-1.5 rounded-full bg-transparent hover:bg-black/10 transition-colors z-10 text-white">
          <Heart size={20} strokeWidth={2.5} />
        </button>

        
        {gig.images && gig.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className={`absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md transition-opacity duration-200 z-10 hover:bg-gray-50 ${currentImageIdx === 0 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/slider:opacity-100'}`}
            >
              <ChevronLeft size={20} className="text-gray-700 -ml-0.5" />
            </button>
            <button 
              onClick={nextImage}
              className={`absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md transition-opacity duration-200 z-10 hover:bg-gray-50 ${currentImageIdx === gig.images.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/slider:opacity-100'}`}
            >
              <ChevronRight size={20} className="text-gray-700 ml-0.5" />
            </button>
          </>
        )}
      </div>

      
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 shrink-0">
          <img src={gig.seller.avatar} alt={gig.seller.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center flex-wrap gap-1 text-[14px]">
          <Link to={`/gig/${gig.id || Math.floor(Math.random() * 1000)}`} state={{ gig }} className="font-bold text-[#404145] hover:underline">
            {gig.seller.name}
          </Link>
          <span className="text-[#62646a] text-xs font-semibold px-1 py-0.5 bg-[#f5f5f5] rounded">
            {gig.seller.level}
          </span>
        </div>
      </div>

      
      <Link to={`/gig/${gig.id || Math.floor(Math.random() * 1000)}`} state={{ gig }} className="text-[16px] leading-snug text-[#404145] hover:underline line-clamp-2 mb-2">
        {gig.title}
      </Link>

      
      <div className="flex items-center gap-1 text-[14px] font-bold text-[#404145] mb-2">
        <Star size={14} className="fill-[#222325] text-[#222325]" />
        <span>{gig.rating}</span>
        <span className="text-[#62646a] font-normal">({gig.reviewCount})</span>
      </div>

      
      <div className="mt-auto pt-2">
        <p className="font-bold text-[#404145]">
          From ₹{gig.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
