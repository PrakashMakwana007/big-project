import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Heart, Star, Search, Lock, Share2, MoreHorizontal, ClipboardList, Users, UserPlus, X } from 'lucide-react';
import BuyerNavbar from '../../components/buyer/BuyerNavbar';
import BuyerCategoryNav from '../../components/buyer/BuyerCategoryNav';
import Footer from '../../components/Footer';
import api from '../../services/api';

const recommendedGigs = [
  { id: 1, seller: 'Prakash', level: 'Level 2', image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=400&auto=format&fit=crop', title: 'I will convert kindle or ebook cover to KDP paperback cover', rating: 4.9, reviews: '1k+', price: '₹1,004' },
  { id: 2, seller: 'Prakash', level: 'Level 2', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop', title: 'I will design modern KDP book cover designs and ebook', rating: 4.9, reviews: 899, price: '₹7,027' },
  { id: 3, seller: 'Prakash', level: 'Top Rated', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop', title: 'I will fix error, modify, resize, edit book cover, ebook cover,KDP...', rating: 4.9, reviews: 838, price: '₹502' },
  { id: 4, seller: 'Prakash', level: 'Top Rated', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop', title: 'I will book formatting, interior layout design for KDP, ingramspa...', rating: 4.9, reviews: '1k+', price: '₹9,537' },
  { id: 5, seller: 'Prakash', level: 'Level 2', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop', title: 'I will do book formatting, ebook formatting and book layout for...', rating: 4.9, reviews: '1k+', price: '₹1,004' },
];

const GigCard = ({ gig }) => (
  <div className="flex flex-col group cursor-pointer bg-white border border-[#e4e5e7] rounded-lg overflow-hidden hover:shadow-md transition-shadow relative">
    <div className="relative aspect-[4/3] overflow-hidden">
      <img src={gig.image} alt={gig.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      <button className="absolute top-3 right-3 text-white hover:text-red-500 transition-colors z-10">
        <Heart size={20} className="drop-shadow-md" />
      </button>
    </div>

    <div className="p-3 flex flex-col flex-1">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden shrink-0">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${gig.seller}`} alt="" className="w-full h-full" />
        </div>
        <div className="flex items-center flex-wrap gap-1">
          <span className="text-[14px] font-bold text-[#404145] hover:underline truncate max-w-[100px]">{gig.seller}</span>
          {gig.level && (
            <span className="text-[12px] text-[#74767e]">{gig.level}</span>
          )}
        </div>
      </div>

      <h3 className="text-[14px] text-[#404145] leading-snug mb-3 line-clamp-2 hover:underline flex-1">
        {gig.title}
      </h3>

      <div className="mt-auto">
        <div className="flex items-center gap-1 mb-3">
          <Star size={14} className="fill-black text-black" />
          <span className="text-[14px] font-bold text-[#404145]">{gig.rating}</span>
          <span className="text-[14px] text-[#b5b6ba]">({gig.reviews})</span>
        </div>
        <div className="font-bold text-[16px] text-[#404145]">
          From {gig.price}
        </div>
      </div>
    </div>
  </div>
);

export default function BuyerListDetailsPage() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [listData, setListData] = useState(null);
  const [activeTab, setActiveTab] = useState('Gigs');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState(null);
  const user = api.auth.getSavedUser() || { name: 'Buyer' };

  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem('myLists') || '[]');
    const foundList = savedLists.find(l => l.id.toString() === listId);
    if (foundList) {
      setListData(foundList);
    } else {
      setListData({ name: 'My List', desc: '' }); 
    }
  }, [listId]);

  if (!listData) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BuyerNavbar onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <BuyerCategoryNav isMobileOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full pb-0">

        <div className="max-w-[1400px] mx-auto px-6 pt-6 pb-4">
          
          <div className="flex items-center gap-2 text-[13px] text-[#74767e] mb-6">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={14} />
            <Link to="/buyer/lists" className="hover:underline">My Lists</Link>
          </div>

          
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-[32px] font-bold text-[#404145]">{listData.name}</h1>
                <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#74767e] bg-gray-100 px-2.5 py-1 rounded-full">
                  <Lock size={12} />
                  Private list
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#62646a] text-[14px]">
                <div className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-[10px]">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <span>Created by {user.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-500">
              <button className="hover:bg-gray-100 p-2 rounded-full transition-colors">
                <Share2 size={20} />
              </button>
              <button className="hover:bg-gray-100 p-2 rounded-full transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>

          
          <div className="flex items-center gap-8 border-b border-gray-200 mt-8">
            <button className="text-[#1dbf73] font-bold text-[15px] pb-3 border-b-2 border-[#1dbf73]">
              Gigs (0)
            </button>
            <button className="text-[#74767e] font-bold text-[15px] pb-3 hover:text-[#404145] transition-colors">
              Sellers (0)
            </button>
          </div>
        </div>

        
        <div className="max-w-[1400px] mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
          <div className="mb-4">
            <Search size={48} className="text-[#c5c6c9]" strokeWidth={1} />
          </div>
          <h2 className="text-[18px] font-bold text-[#404145] mb-1">Keep everything you like right here!</h2>
          <p className="text-[15px] text-[#74767e]">Here are some ideas to get started</p>
        </div>

        
        <div className="max-w-[1400px] mx-auto px-6 mb-20">
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {recommendedGigs.map(gig => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
            <button className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-center text-gray-600 hover:text-black z-10 hidden lg:flex">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        
        <div className="bg-[#fafafa] py-16 border-t border-gray-200 mt-8">
          <div className="max-w-[1400px] mx-auto px-6">
            <h2 className="text-[20px] font-bold text-[#404145] mb-8">Find freelance talent — your way</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 p-6 rounded-lg flex flex-col h-full">
                <div className="mb-4 text-[#404145]"><ClipboardList size={28} /></div>
                <h3 className="text-[18px] font-bold text-[#404145] mb-2">Post a project brief</h3>
                <p className="text-[15px] text-[#62646a] mb-8 flex-1">
                  Generate a brief with AI to receive a curated shortlist of freelancer offers.
                </p>
                <div className="flex justify-end mt-auto">
                  <button onClick={() => setActiveDrawer('brief')} className="border border-[#404145] text-[#404145] font-bold px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Post a brief
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-lg flex flex-col h-full">
                <div className="mb-4 text-[#404145]"><UserPlus size={28} /></div>
                <h3 className="text-[18px] font-bold text-[#404145] mb-2">Let us find your freelancer</h3>
                <p className="text-[15px] text-[#62646a] mb-8 flex-1">
                  Save the endless search — we'll source, interview, and vet freelancers for you.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[#74767e] text-[13px]">Only ₹19,976</span>
                  <button onClick={() => setActiveDrawer('freelancer')} className="border border-[#404145] text-[#404145] font-bold px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Get started
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-lg flex flex-col h-full">
                <div className="mb-4 text-[#404145]"><Users size={28} /></div>
                <h3 className="text-[18px] font-bold text-[#404145] mb-2">Get a team built for you</h3>
                <p className="text-[15px] text-[#62646a] mb-8 flex-1">
                  Big project? No problem. We'll build a freelance team and fully execute your project.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[#74767e] text-[13px]">Custom pricing</span>
                  <Link to="/buyer/managed-projects" className="border border-[#404145] text-[#404145] font-bold px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Book free consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />

      
      {activeDrawer && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setActiveDrawer(null)}></div>
          <div className="relative w-full max-w-[400px] bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-[20px] font-bold text-[#404145]">
                {activeDrawer === 'brief' ? 'Post a Project Brief' : 'Let us find your freelancer'}
              </h2>
              <button onClick={() => setActiveDrawer(null)} className="text-[#b5b6ba] hover:text-[#62646a] transition-colors">
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              {activeDrawer === 'brief' ? (
                <div>
                  <p className="text-[#62646a] text-[15px] mb-6">Describe your project and we'll match you with the best talent.</p>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-[15px] font-bold text-[#404145] mb-2">Project Title</label>
                      <input type="text" className="w-full border border-gray-300 rounded p-3 outline-none focus:border-black text-[15px]" placeholder="E.g. Build an e-commerce website" />
                    </div>
                    <div>
                      <label className="block text-[15px] font-bold text-[#404145] mb-2">Description</label>
                      <textarea className="w-full border border-gray-300 rounded p-3 outline-none focus:border-black h-[120px] resize-none text-[15px]" placeholder="What are your goals?"></textarea>
                    </div>
                    <button className="mt-4 w-full bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold py-3 rounded transition-colors text-[16px]">Continue</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-[#62646a] text-[15px] mb-6">Tell us what you need and our experts will handpick the best freelancers for you.</p>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-[15px] font-bold text-[#404145] mb-2">What service do you need?</label>
                      <input type="text" className="w-full border border-gray-300 rounded p-3 outline-none focus:border-black text-[15px]" placeholder="E.g. Graphic Design" />
                    </div>
                    <div>
                      <label className="block text-[15px] font-bold text-[#404145] mb-2">Budget Range</label>
                      <select className="w-full border border-gray-300 rounded p-3 outline-none focus:border-black text-[15px]">
                        <option>Select budget</option>
                        <option>Under ₹5,000</option>
                        <option>₹5,000 - ₹20,000</option>
                        <option>Over ₹20,000</option>
                      </select>
                    </div>
                    <button className="mt-4 w-full bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold py-3 rounded transition-colors text-[16px]">Submit Request</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
