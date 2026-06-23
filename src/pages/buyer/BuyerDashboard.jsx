import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Heart, Star, ClipboardList, Monitor, MonitorPlay, MonitorSmartphone } from 'lucide-react';
import BuyerNavbar from '../../components/buyer/BuyerNavbar';
import BuyerCategoryNav from '../../components/buyer/BuyerCategoryNav';
import Footer from '../../components/Footer';
import api from '../../services/api';

const recommendedGigs = [
  { id: 1, seller: 'Oyinola H', level: 'Level 2', image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=400&auto=format&fit=crop', title: 'I will do book cover design, ebook cover, kindle book cover and...', rating: 4.9, reviews: 33, price: '₹1,004' },
  { id: 2, seller: 'Zen Noah', level: 'Level 2', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop', title: 'I will do amazon book promotion and ebook marketing with...', rating: 5.0, reviews: 31, price: '₹5,521' },
  { id: 3, seller: 'Prem B', level: 'Level 2', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop', title: 'I will build responsive react js and asp net website', rating: null, reviews: null, price: '₹8,031' },
  { id: 4, seller: 'Ft Agung N...', level: 'Top Rated', image: 'https://images.unsplash.com/photo-1612459284970-e8f0275cd867?q=80&w=400&auto=format&fit=crop', title: 'I will design erotica or romance ebook cover less than 24 hours', rating: 4.9, reviews: '1k+', price: '₹502' },
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
  { id: 4, seller: 'Khatoon B.', level: 'Top Rated', image: 'https://images.unsplash.com/photo-1612459284970-e8f0275cd867?q=80&w=400&auto=format&fit=crop', title: 'I will do kindle ebook cover design and KDP print book cover design', rating: 4.8, reviews: '1k+', price: '₹2,008' },
  { id: 5, seller: 'Safeer Ahmed', level: 'Level 2', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop', title: 'I will design modern KDP book cover designs and ebook', rating: 4.9, reviews: 889, price: '₹7,027' },
];

const GigCard = ({ gig, isPro }) => (
  <div className="flex flex-col group cursor-pointer bg-white border border-[#e4e5e7] rounded-lg overflow-hidden hover:shadow-md transition-shadow relative">
    <div className="relative aspect-[4/3] overflow-hidden">
      <img src={gig.image} alt={gig.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      <button className="absolute top-3 right-3 text-white hover:text-red-500 transition-colors z-10">
        <Heart size={20} className="drop-shadow-md" />
      </button>
    </div>
    
    <div className="p-4 flex flex-col flex-1">
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
      
      <h3 className="text-[15px] text-[#404145] leading-snug mb-3 line-clamp-2 hover:underline flex-1">
        {gig.title}
      </h3>
      
      <div className="mt-auto">
        {gig.rating && (
          <div className="flex items-center gap-1 mb-3">
            <Star size={14} className="fill-black text-black" />
            <span className="text-[14px] font-bold text-[#404145]">{gig.rating}</span>
            <span className="text-[14px] text-[#b5b6ba]">({gig.reviews})</span>
          </div>
        )}
        <div className="font-bold text-[16px] text-[#404145]">
          From {gig.price}
        </div>
      </div>
    </div>
  </div>
);

export default function BuyerDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = api.auth.getSavedUser() || { name: 'Buyer' };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BuyerNavbar onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <BuyerCategoryNav isMobileOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full pb-20">
        
        <div className="bg-gradient-to-r from-[#f6fcf8] to-[#e4f0e4] pt-12 pb-16 relative">
          <div className="max-w-[1400px] mx-auto px-6">
            <h1 className="text-[32px] md:text-[40px] font-bold text-[#404145] mb-8 font-serif">
              Welcome back, {user.name}
            </h1>
            
            <div className="bg-white rounded-lg p-5 shadow-sm inline-flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 border border-gray-100">
              <div className="text-[11px] font-bold text-[#b5b6ba] uppercase tracking-wider absolute -mt-9 bg-white px-2 rounded-t-lg">Recommended for you</div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded border border-gray-100 shrink-0">
                  <ClipboardList className="text-[#62646a]" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-[#404145]">Post a project brief</h3>
                  <p className="text-[14px] text-[#74767e]">Get tailored offers for your needs.</p>
                </div>
              </div>
              <Link to="/buyer/briefs" className="border border-[#404145] text-[#404145] font-bold text-[14px] px-6 py-2 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap ml-0 sm:ml-4">
                Get started
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-bold text-[#404145]">Based on what you might be looking for</h2>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                <ChevronLeft size={18} />
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-64 shrink-0 flex flex-col gap-2">
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-[#1dbf73] bg-[#f0fcf5] text-left">
                <div className="text-[#404145]"><Monitor size={20} /></div>
                <span className="font-bold text-[#404145] text-[15px]">Keep exploring</span>
              </button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:bg-gray-50 text-left transition-colors">
                <div className="text-[#62646a]"><MonitorPlay size={20} /></div>
                <span className="font-semibold text-[#62646a] text-[15px]">Website Development</span>
              </button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:bg-gray-50 text-left transition-colors">
                <div className="text-[#62646a]"><ClipboardList size={20} /></div>
                <span className="font-semibold text-[#62646a] text-[15px]">WordPress</span>
              </button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:bg-gray-50 text-left transition-colors">
                <div className="text-[#62646a]"><MonitorSmartphone size={20} /></div>
                <span className="font-semibold text-[#62646a] text-[15px]">Custom Websites</span>
              </button>
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedGigs.map(gig => (
                <GigCard key={gig.id} gig={gig} />
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
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {popularGigs.map(gig => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
            <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-black z-10 hidden lg:flex">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
