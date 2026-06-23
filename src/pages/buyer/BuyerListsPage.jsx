import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Heart, Star, X, Plus, ClipboardList, Users, UserPlus, Lock, MoreHorizontal } from 'lucide-react';
import BuyerNavbar from '../../components/buyer/BuyerNavbar';
import BuyerCategoryNav from '../../components/buyer/BuyerCategoryNav';
import Footer from '../../components/Footer';

const popularGigs = [
  { id: 1, seller: 'Kayode Ja...', level: 'Top Rated', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop', title: 'I will design high converting amazon KDP ebook and...', rating: 4.9, reviews: '1k+', price: '₹3,012' },
  { id: 2, seller: 'Lamar H', level: 'Level 2', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop', title: 'I will create a urban book cover design, fantasy or fiction', rating: 4.9, reviews: '1k+', price: '₹3,514' },
  { id: 3, seller: 'Okasha S.', level: 'Top Rated', image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=400&auto=format&fit=crop', title: 'I will design digital product mockup, ecover bundle, and...', rating: 4.9, reviews: '1k+', price: '₹1,004' },
  { id: 4, seller: 'Ft Agung Nu...', level: 'Top Rated', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop', title: 'I will design erotica or romance ebook cover less than 24 hours', rating: 4.9, reviews: '1k+', price: '₹502' },
  { id: 5, seller: 'Khatoon B.', level: 'Top Rated', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop', title: 'I will do kindle ebook cover design and KDP print book cover design', rating: 4.8, reviews: '1k+', price: '₹2,008' },
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

export default function BuyerListsPage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listName, setListName] = useState('My first list');
  const [listDesc, setListDesc] = useState('');
  const [savedLists, setSavedLists] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editingListId, setEditingListId] = useState(null);
  const [activeDrawer, setActiveDrawer] = useState(null);

  useEffect(() => {
    const lists = JSON.parse(localStorage.getItem('myLists') || '[]');
    setSavedLists(lists);
  }, []);

  const handleDelete = (id) => {
    const updatedLists = savedLists.filter(l => l.id !== id);
    setSavedLists(updatedLists);
    localStorage.setItem('myLists', JSON.stringify(updatedLists));
  };

  const handleEditClick = (list) => {
    setEditingListId(list.id);
    setListName(list.name);
    setListDesc(list.desc || '');
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const openCreateModal = () => {
    setEditingListId(null);
    setListName('My first list');
    setListDesc('');
    setIsModalOpen(true);
  };

  const handleSaveList = () => {
    if (!listName.trim()) return;
    
    if (editingListId) {
      const updatedLists = savedLists.map(l => 
        l.id === editingListId ? { ...l, name: listName, desc: listDesc } : l
      );
      localStorage.setItem('myLists', JSON.stringify(updatedLists));
      setSavedLists(updatedLists);
      setIsModalOpen(false);
      setEditingListId(null);
    } else {
      const newList = { id: Date.now(), name: listName, desc: listDesc };
      const updatedLists = [newList, ...savedLists]; 
      localStorage.setItem('myLists', JSON.stringify(updatedLists));
      setSavedLists(updatedLists);
      setIsModalOpen(false);
      navigate(`/buyer/lists/${newList.id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BuyerNavbar onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <BuyerCategoryNav isMobileOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full pb-20">
        
        
        <div className="max-w-[1400px] mx-auto px-6 pt-12 pb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-[32px] font-bold text-[#404145] mb-2">My lists</h1>
              <p className="text-[16px] text-[#74767e] max-w-[400px] leading-relaxed">
                Organize your go-to freelancers and favorite services into custom lists you can easily access and share with your team.
              </p>
            </div>
            <div>
              <button 
                onClick={openCreateModal}
                className="bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold text-[15px] px-5 py-2.5 rounded transition-colors"
              >
                + Create a List
              </button>
            </div>
          </div>
        </div>

        
        {savedLists.length > 0 ? (
          <div className="max-w-[1400px] mx-auto px-6 mb-16 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {savedLists.map(list => (
              <div key={list.id} className="relative">
                <Link to={`/buyer/lists/${list.id}`} className="flex flex-col group cursor-pointer bg-white border border-[#e4e5e7] rounded hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow">
                  <div className="h-[180px] w-full flex bg-white rounded-t overflow-hidden">
                    <div className="w-[65%] h-full bg-[#e4e5e7]"></div>
                    <div className="w-[35%] h-full flex flex-col border-l-2 border-white">
                      <div className="flex-1 bg-[#e4e5e7] border-b-2 border-white"></div>
                      <div className="flex-1 bg-[#e4e5e7]"></div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-1">
                    <h3 className="font-bold text-[#404145] text-[16px] truncate">{list.name}</h3>
                    <div className="text-[13px] text-[#74767e]">
                      Gigs (0) • Sellers (0)
                    </div>
                    <div className="mt-4 flex items-center justify-between text-[#b5b6ba]">
                      <Lock size={14} />
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveDropdown(activeDropdown === list.id ? null : list.id);
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors text-[#404145]"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                </Link>

                {activeDropdown === list.id && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)}></div>
                    <div className="absolute right-0 bottom-10 w-48 bg-white border border-gray-200 rounded shadow-lg py-2 z-50">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveDropdown(null); }}
                        className="w-full text-left px-4 py-2.5 text-[15px] text-[#62646a] hover:bg-gray-50 transition-colors"
                      >
                        Public sharing
                      </button>
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleEditClick(list); }}
                        className="w-full text-left px-4 py-2.5 text-[15px] text-[#62646a] hover:bg-gray-50 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(list.id); setActiveDropdown(null); }}
                        className="w-full text-left px-4 py-2.5 text-[15px] text-[#62646a] hover:bg-gray-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-[1400px] mx-auto px-6 mb-16">
            <button 
              onClick={openCreateModal}
              className="w-full sm:w-[280px] h-[280px] border border-gray-200 rounded-lg flex flex-col items-center justify-center hover:shadow-md transition-shadow group bg-white"
            >
              <div className="text-[#4a73e8] group-hover:bg-[#f5f7fc] p-3 rounded-full transition-colors mb-2">
                <Plus size={32} />
              </div>
              <span className="text-[#4a73e8] font-medium text-[16px]">Create a List</span>
            </button>
          </div>
        )}

        
        <div className="max-w-[1400px] mx-auto px-6 mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-bold text-[#404145]">Most popular Gigs in <span className="text-[#4a73e8]">Book Design</span></h2>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {popularGigs.map(gig => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
            <button className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-center text-gray-600 hover:text-black z-10 hidden lg:flex">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        
        <div className="bg-[#fafafa] py-16 border-t border-gray-200">
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

      
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 px-4">
          <div className="bg-white w-full max-w-[500px] rounded shadow-xl">
            <div className="flex items-start justify-between p-6 pb-2">
              <h2 className="text-[22px] font-bold text-[#404145]">
                {editingListId ? 'Edit List' : 'Create a new list'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#b5b6ba] hover:text-[#62646a] transition-colors mt-1">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
            
            {!editingListId && (
              <div className="px-6 pb-6 text-[#62646a] text-[16px]">
                Create a list around a project, a topic or for inspiration.
              </div>
            )}
            
            <div className={`px-6 pb-4 flex flex-col gap-6 ${editingListId ? 'pt-4' : ''}`}>
              <div>
                <div className="text-[15px] font-bold text-[#404145] mb-2">List name</div>
                <div className="relative">
                  <input 
                    type="text" 
                    maxLength={60}
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    placeholder="My first list"
                    className="w-full border border-gray-300 rounded p-3 pt-2 pb-2 text-[15px] text-[#404145] outline-none focus:border-black transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#b5b6ba]">{listName.length}/60</span>
                </div>
              </div>

              <div>
                <div className="text-[15px] font-bold text-[#404145] mb-2">Description <span className="text-[#b5b6ba] font-normal">(Optional)</span></div>
                <div className="relative">
                  <textarea 
                    maxLength={330}
                    value={listDesc}
                    onChange={(e) => setListDesc(e.target.value)}
                    placeholder='For example, "Great designers for our marketing campaigns"'
                    className="w-full border border-gray-300 rounded p-3 text-[15px] text-[#404145] h-[120px] resize-none outline-none focus:border-black transition-colors"
                  />
                  <span className="absolute right-3 bottom-3 text-[13px] text-[#b5b6ba]">{listDesc.length}/330</span>
                </div>
              </div>
            </div>

            {editingListId && (
              <div className="px-6 pb-4 flex items-center justify-between">
                <span className="text-[15px] font-bold text-[#404145]">Private list <span className="font-normal text-[#62646a]">(visible only to me)</span></span>
                <button className="w-11 h-6 bg-[#1dbf73] rounded-full relative cursor-pointer focus:outline-none">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-[2px] top-[2px] shadow-sm"></div>
                </button>
              </div>
            )}

            <div className="p-6 flex items-center justify-end gap-3 pt-4">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 bg-[#e4e5e7] hover:bg-[#d5d6d8] text-[#404145] font-bold rounded transition-colors text-[15px]">Cancel</button>
              <button onClick={handleSaveList} className="px-5 py-2 bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold rounded transition-colors text-[15px]">
                {editingListId ? 'Save' : 'Create List'}
              </button>
            </div>
          </div>
        </div>
      )}

      
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
