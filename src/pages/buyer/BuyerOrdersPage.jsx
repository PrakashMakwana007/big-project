import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Heart, Star, ClipboardList, Monitor, MonitorPlay, MonitorSmartphone, Compass } from 'lucide-react';
import BuyerNavbar from '../../components/buyer/BuyerNavbar';
import BuyerCategoryNav from '../../components/buyer/BuyerCategoryNav';
import Footer from '../../components/Footer';
import api from '../../services/api';


const recommendedGigs = [
  { id: 1, seller: 'Oyinola H', level: 'Level 2', image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=400&auto=format&fit=crop', title: 'I will do book cover design, ebook cover, kindle book cover and...', rating: 4.9, reviews: 33, price: '₹1,004' },
  { id: 2, seller: 'Zen Noah', level: 'Level 2', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop', title: 'I will do amazon book promotion and ebook marketing with...', rating: 5.0, reviews: 31, price: '₹5,521' },
  { id: 3, seller: 'Prem B', level: 'Level 2', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop', title: 'I will build responsive react js and asp net website', rating: null, reviews: null, price: '₹8,031' },
  { id: 4, seller: 'Ft Agung N...', level: 'Top Rated', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop', title: 'I will design erotica or romance ebook cover less than 24 hours', rating: 4.9, reviews: '1k+', price: '₹502' },
];

const proGigs = [
  { id: 1, seller: 'Valeria T', badge: 'Vetted Pro', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop', title: 'I will design a heart winning book or ebook cover for you', rating: 5.0, reviews: 77, price: '₹27,605' },
  { id: 2, seller: 'Miky R.', badge: 'Vetted Pro', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop', title: 'I will do book and ebook formatting, cover design, upload...', rating: 4.9, reviews: 358, price: '₹39,149' },
  { id: 3, seller: 'Hmdpublishing', badge: 'Vetted Pro', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop', title: 'Our agency will design professional book cover and...', rating: 4.7, reviews: '1k+', price: '₹19,575', hasVideoCall: true },
  { id: 4, seller: 'Brandon Daniel', badge: 'Vetted Pro', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop', title: 'I will design any book expertly for print PDF and ebook with...', rating: 5.0, reviews: 266, price: '₹22,586' },
];

const popularGigs = [
  { id: 1, seller: 'Walt W.', level: 'Top Rated', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop', title: 'I will format your book for print layout for amazon KDP with style', rating: 4.9, reviews: '1k+', price: '₹14,556' },
  { id: 2, seller: 'Nour E.', level: 'Level 2', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop', title: 'I will design professional book cover or ebook cover', rating: 4.9, reviews: '1k+', price: '₹1,004' },
  { id: 3, seller: 'Shohidul Islam', level: 'Level 2', image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=400&auto=format&fit=crop', title: 'I will create book cover design, book design and ebook cover...', rating: 4.9, reviews: 755, price: '₹2,008' },
  { id: 4, seller: 'Khatoon B.', level: 'Top Rated', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop', title: 'I will do kindle ebook cover design and KDP print book cover design', rating: 4.8, reviews: '1k+', price: '₹2,008' },
  { id: 5, seller: 'Safeer Ahmed', level: 'Level 2', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop', title: 'I will design modern KDP book cover designs and ebook', rating: 4.9, reviews: 889, price: '₹7,027' },
];

const moreGigs = [
  { id: 1, seller: 'John D.', level: 'Top Rated', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop', title: 'I will build a responsive react website from scratch', rating: 5.0, reviews: 412, price: '₹15,000' },
  { id: 2, seller: 'Sarah M.', level: 'Level 2', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop', title: 'I will do complete SEO optimization for your website', rating: 4.9, reviews: '2k+', price: '₹4,500' },
  { id: 3, seller: 'Alex R.', level: 'Level 2', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop', title: 'I will design a modern minimalist business logo', rating: 4.8, reviews: 934, price: '₹2,500' },
  { id: 4, seller: 'Emma S.', level: 'Top Rated', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop', title: 'I will write high converting sales copy and emails', rating: 4.9, reviews: '1k+', price: '₹8,000' },
  { id: 5, seller: 'David K.', level: 'Level 2', image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=400&auto=format&fit=crop', title: 'I will edit your youtube videos professionally', rating: 5.0, reviews: 156, price: '₹3,000' },
];

const GigCard = ({ gig, isPro }) => (
  <div className="flex flex-col group cursor-pointer bg-white border border-[#e4e5e7] rounded-lg overflow-hidden hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow relative">
    <div className="relative aspect-[4/3] overflow-hidden">
      <img src={gig.image} alt={gig.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      <button className="absolute top-3 right-3 text-white hover:text-red-500 transition-colors z-10">
        <Heart size={20} className="drop-shadow-md" />
      </button>
    </div>
    
    <div className="p-3.5 flex flex-col flex-1">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden shrink-0">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${gig.seller}`} alt="" className="w-full h-full" />
        </div>
        <div className="flex items-center flex-wrap gap-1">
          <span className="text-[14px] font-bold text-[#404145] hover:underline truncate max-w-[120px]">{gig.seller}</span>
          {isPro ? (
            <span className="text-[11px] font-bold text-[#4a73e8] bg-[#e8f0fe] px-1.5 py-0.5 rounded">Vetted Pro</span>
          ) : gig.level ? (
            <span className="text-[12px] text-[#74767e]">{gig.level}</span>
          ) : null}
        </div>
      </div>
      
      <h3 className="text-[14px] text-[#404145] leading-[20px] mb-3 line-clamp-2 hover:underline flex-1 font-medium">
        {gig.title}
      </h3>
      
      <div className="mt-auto pt-2 border-t border-[#e4e5e7] flex items-center justify-between">
        {gig.rating ? (
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-[#ffb33e] text-[#ffb33e]" />
            <span className="text-[14px] font-bold text-[#404145]">{gig.rating}</span>
            <span className="text-[14px] text-[#b5b6ba]">({gig.reviews})</span>
          </div>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold text-[#74767e] uppercase">From</span>
          <span className="font-bold text-[16px] text-[#404145]">{gig.price}</span>
        </div>
      </div>
    </div>
  </div>
);

export default function BuyerOrdersPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Keep exploring');
  const user = api.auth.getSavedUser() || { name: 'Buyer' };

  
  let displayedGigs = recommendedGigs;
  if (activeCategory === 'Website Development') {
    displayedGigs = [...recommendedGigs].reverse();
  } else if (activeCategory === 'WordPress') {
    displayedGigs = [...recommendedGigs.slice(1), recommendedGigs[0]];
  } else if (activeCategory === 'Custom Websites') {
    displayedGigs = [...moreGigs].slice(0, 4);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BuyerNavbar onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <BuyerCategoryNav isMobileOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full pb-20">
        
        
        <div className="bg-gradient-to-r from-[#f0f4f0] to-[#e4f0e4] pt-12 pb-16 relative">
          <div className="max-w-[1400px] mx-auto px-6">
            <h1 className="text-[32px] md:text-[40px] font-bold text-[#404145] mb-8 font-serif">
              Welcome back, {user.name}
            </h1>
            
            <div className="flex flex-col">
              <div className="bg-white rounded-xl shadow-sm border border-[#e4e5e7] p-5 inline-flex flex-col md:flex-row md:items-center justify-between gap-6 w-full max-w-[550px]">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#b5b6ba] uppercase tracking-widest mb-3">RECOMMENDED FOR YOU</span>
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-50 w-12 h-12 rounded border border-gray-100 flex items-center justify-center shrink-0">
                      <ClipboardList className="text-[#62646a]" size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[16px] text-[#404145] mb-0.5">Post a project brief</h3>
                      <p className="text-[14px] text-[#74767e]">Get tailored offers for your needs.</p>
                    </div>
                  </div>
                </div>
                <div className="md:ml-auto w-full md:w-auto mt-2 md:mt-0">
                  <Link to="/buyer/briefs" className="border border-[#404145] text-[#404145] font-bold text-[14px] px-6 py-2 rounded hover:bg-gray-50 transition-colors whitespace-nowrap block text-center">
                    Get started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-bold text-[#404145]">Based on what you might be looking for</h2>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            
            <div className="w-full lg:w-64 shrink-0 flex flex-col gap-2">
              <button 
                onClick={() => setActiveCategory('Keep exploring')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeCategory === 'Keep exploring' ? 'bg-[#f4f4f4]' : 'bg-transparent border border-transparent hover:bg-gray-50'}`}
              >
                <div className="text-[#222325]"><Compass size={20} strokeWidth={1.5} /></div>
                <span className="font-bold text-[#222325] text-[15px]">Keep exploring</span>
              </button>
              
              <button 
                onClick={() => setActiveCategory('Website Development')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeCategory === 'Website Development' ? 'bg-[#f4f4f4]' : 'bg-transparent border border-transparent hover:bg-gray-50'}`}
              >
                <div className="text-[#222325]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                    <polyline points="9 8 6 11 9 14"></polyline>
                    <polyline points="15 8 18 11 15 14"></polyline>
                  </svg>
                </div>
                <span className="font-bold text-[#222325] text-[15px]">Website Development</span>
              </button>
              
              <button 
                onClick={() => setActiveCategory('WordPress')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeCategory === 'WordPress' ? 'bg-[#f4f4f4]' : 'bg-transparent border border-transparent hover:bg-gray-50'}`}
              >
                <div className="text-[#222325]">
                  <div className="w-5 h-5 rounded-full bg-[#222325] text-white flex items-center justify-center font-serif text-[12px] font-bold leading-none pt-0.5">
                    W
                  </div>
                </div>
                <span className="font-bold text-[#222325] text-[15px]">WordPress</span>
              </button>
              
              <button 
                onClick={() => setActiveCategory('Custom Websites')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-[#222325] transition-colors text-left ${activeCategory === 'Custom Websites' ? 'bg-[#f4f4f4]' : 'bg-transparent hover:bg-gray-50'}`}
              >
                <div className="text-[#222325]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <path d="M14.5 18.5l4-4a1.5 1.5 0 0 0-2-2l-4 4-1.5 1.5v2h2z"></path>
                    <line x1="12" y1="14" x2="12" y2="14.01"></line>
                  </svg>
                </div>
                <span className="font-bold text-[#222325] text-[15px]">Custom Websites</span>
              </button>
            </div>
            
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {displayedGigs.map((gig, index) => (
                <GigCard key={`${gig.id}-${index}`} gig={gig} />
              ))}
            </div>
          </div>
        </div>

        
        <div className="max-w-[1400px] mx-auto px-6 mb-16">
          <div className="bg-[#f5f5f5] rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[24px] font-bold text-[#404145]">Verified Pro services in Book Design</h2>
                <p className="text-[15px] text-[#74767e] mt-1">Hand-vetted talent for all your professional needs.</p>
              </div>
              <Link to="#" className="text-[#4a73e8] font-semibold text-[15px] hover:underline flex items-center gap-1">
                Show All <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {proGigs.map(gig => (
                <GigCard key={gig.id} gig={gig} isPro={true} />
              ))}
            </div>
          </div>
        </div>

        
        <div className="max-w-[1400px] mx-auto px-6 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-bold text-[#404145]">Most popular Gigs in Book Design</h2>
            <Link to="#" className="text-[#4a73e8] font-semibold text-[15px] hover:underline flex items-center gap-1">
              Show All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {popularGigs.map(gig => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
            <button className="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-center text-gray-600 hover:text-black z-10 hidden lg:flex">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        
        <div className="max-w-[1400px] mx-auto px-6 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-bold text-[#404145]">Gigs you may like</h2>
            <Link to="#" className="text-[#4a73e8] font-semibold text-[15px] hover:underline flex items-center gap-1">
              Show All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {moreGigs.map(gig => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
