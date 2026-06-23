import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, ChevronDown, ChevronRight, ChevronLeft, SlidersHorizontal, ToggleLeft, ToggleRight } from 'lucide-react';
import BuyerNavbar from '../../components/buyer/BuyerNavbar';
import BuyerCategoryNav from '../../components/buyer/BuyerCategoryNav';
import MarketplaceGigCard from '../../components/buyer/MarketplaceGigCard';
import FreelanceTalentSection from '../../components/buyer/FreelanceTalentSection';
import Footer from '../../components/Footer';


import { logoDesignData } from '../../data/categories/logoDesignData';
import { bookDesignData } from '../../data/categories/bookDesignData';
import { webDevelopmentData } from '../../data/categories/webDevelopmentData';
import { seoData } from '../../data/categories/seoData';
import { videoEditingData } from '../../data/categories/videoEditingData';
import { aiServicesData } from '../../data/categories/aiServicesData';
import { categories } from '../../data/categoriesList';

export default function CategoryListingPage() {
  const { categoryId, subcategoryId } = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  
  const [proServices, setProServices] = useState(false);
  const [budgetUpToInput, setBudgetUpToInput] = useState('');
  const [budgetUpTo, setBudgetUpTo] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState('Anytime');
  const [selectedSellerLevels, setSelectedSellerLevels] = useState([]);
  
  
  const [sortBy, setSortBy] = useState('Relevance'); 
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(40);

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(12);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(24);
      } else {
        setItemsPerPage(40);
      }
    };
    
    handleResize(); 
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  const formatTitle = (slug) => {
    if (!slug) return '';
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const categoryName = formatTitle(categoryId) || 'Graphics & Design';
  const subcategoryName = subcategoryId ? formatTitle(subcategoryId) : null;
  const pageTitle = subcategoryName || categoryName;

  const generateSlug = (text) => {
    if (!text) return '';
    return text.toLowerCase().replace(/ & /g, '-').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const currentCategory = categories.find(c => generateSlug(c.label) === categoryId);
  const subcategoryPills = [];
  if (currentCategory && currentCategory.groups) {
    currentCategory.groups.forEach(group => {
      group.items.forEach(item => {
        if (!item.isHeader && subcategoryPills.length < 8) {
          subcategoryPills.push(item.name);
        }
      });
    });
  }
  
  if (subcategoryPills.length === 0) {
    subcategoryPills.push('Logo Design', 'Book Design', 'Website Development', 'SEO', 'Video Editing', 'AI Services');
  }

  
  const generateDynamicGigs = (subCategoryName, categoryId) => {
    const numGigs = 120;
    const gigs = [];
    const seedBase = generateSlug(subCategoryName || categoryId || 'generic');
    
    for (let i = 0; i < numGigs; i++) {
      const isPro = i % 8 === 0;
      const mainImage = `https://picsum.photos/seed/${seedBase}_main_${i}/400/300`;
      const img2 = `https://picsum.photos/seed/${seedBase}_img2_${i}/400/300`;
      const img3 = `https://picsum.photos/seed/${seedBase}_img3_${i}/400/300`;
      
      let price = 1000 + (Math.floor(Math.random() * 50) * 100);
      const deliveryTimes = ['Express 24H', 'Up to 3 days', 'Up to 7 days', 'Anytime'];
      const levels = ['New Seller', 'Level 1', 'Level 2'];
      const sellerLevel = isPro ? 'Top Rated Seller' : levels[Math.floor(Math.random() * levels.length)];
      const sellerName = `Seller_${seedBase}_${i}`;
      
      const adjectives = ['amazing', 'custom', 'professional', 'unique', 'premium', 'high quality', 'modern', 'elegant', 'stunning', 'creative'];
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      
      gigs.push({
        id: `${seedBase}_${i + 1}`,
        title: `I will do ${adj} ${subCategoryName || 'service'} for you`,
        thumbnail: mainImage,
        images: [mainImage, img2, img3],
        isPro: isPro,
        price: price,
        rating: (4.0 + Math.random()).toFixed(1),
        reviewCount: Math.floor(Math.random() * 2500) + 1,
        seller: {
            name: sellerName,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(sellerName)}`,
            level: sellerLevel
        },
        deliveryTime: deliveryTimes[Math.floor(Math.random() * deliveryTimes.length)],
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
      });
    }
    return gigs;
  };

  
  const allGigs = useMemo(() => {
    if (subcategoryId === 'logo-design') return logoDesignData;
    if (subcategoryId === 'book-design' || subcategoryId === 'book-editing') return bookDesignData;
    if (subcategoryId === 'website-development' || subcategoryId === 'web-development') return webDevelopmentData;
    if (subcategoryId === 'seo') return seoData;
    if (subcategoryId === 'video-editing') return videoEditingData;
    if (categoryId === 'ai-services' && !subcategoryId) return aiServicesData;
    
    
    if (subcategoryId) {
        return generateDynamicGigs(subcategoryName, categoryId);
    }

    
    if (categoryId === 'graphics-design') return logoDesignData;
    if (categoryId === 'programming-tech') return webDevelopmentData;
    if (categoryId === 'digital-marketing') return seoData;
    if (categoryId === 'video-animation') return videoEditingData;
    if (categoryId === 'writing-translation') return bookDesignData;
    if (categoryId === 'ai-services') return aiServicesData;
    
    return generateDynamicGigs(categoryName, categoryId);
  }, [categoryId, subcategoryId, subcategoryName, categoryName]);

  
  useEffect(() => {
    setCurrentPage(1);
  }, [allGigs, proServices, budgetUpTo, selectedDelivery, selectedSellerLevels, sortBy]);

  
  const filteredAndSortedGigs = useMemo(() => {
    let result = [...allGigs];

    
    if (proServices) {
      result = result.filter(gig => gig.isPro);
    }

    
    if (budgetUpTo && !isNaN(Number(budgetUpTo))) {
      result = result.filter(gig => gig.price <= Number(budgetUpTo));
    }

    
    if (selectedDelivery !== 'Anytime') {
      result = result.filter(gig => gig.deliveryTime === selectedDelivery);
    }

    
    if (selectedSellerLevels.length > 0) {
      result = result.filter(gig => selectedSellerLevels.includes(gig.seller.level));
    }

    
    switch (sortBy) {
      case 'Highest Rated':
        result.sort((a, b) => Number(b.rating) - Number(a.rating));
        break;
      case 'Lowest Price':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Highest Price':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Best Selling':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'Newest Arrivals':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'Relevance':
      default:
        
        break;
    }

    return result;
  }, [allGigs, proServices, budgetUpTo, selectedDelivery, selectedSellerLevels, sortBy]);

  
  const totalItems = filteredAndSortedGigs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedGigs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedGigs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedGigs, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDropdown = (name) => {
    if (activeDropdown === name) setActiveDropdown(null);
    else setActiveDropdown(name);
  };

  const handleSellerLevelToggle = (level) => {
    setSelectedSellerLevels(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };
  
  const handleDeliveryToggle = (e) => {
    setSelectedDelivery(e.target.value);
  };

  const applyBudget = () => {
    setBudgetUpTo(budgetUpToInput);
    setActiveDropdown(null);
  };

  const clearBudget = () => {
    setBudgetUpToInput('');
    setBudgetUpTo('');
    setActiveDropdown(null);
  };

  const clearSellerLevels = () => {
    setSelectedSellerLevels([]);
    setActiveDropdown(null);
  };

  const clearDelivery = () => {
    setSelectedDelivery('Anytime');
    setActiveDropdown(null);
  };

  
  const getPaginationButtons = () => {
    let pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    
    if (endPage - startPage < 4) {
      if (startPage === 1) endPage = Math.min(totalPages, 5);
      else if (endPage === totalPages) startPage = Math.max(1, totalPages - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white" onClick={() => activeDropdown && setActiveDropdown(null)}>
      <BuyerNavbar onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <BuyerCategoryNav isMobileOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 pb-20">
        
        
        <div className="pt-8 pb-8">
          <div className="max-w-[1400px] mx-auto px-6">
            
            
            <nav className="flex items-center text-[14px] text-[#62646a] mb-6 font-medium">
              <Link to="/" className="hover:underline hover:text-[#404145]">
                <svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="fill-current"><path d="M14.6718 6.00282L8.71866 1.05435C8.30906 0.714441 7.6908 0.714441 7.2812 1.05435L1.32808 6.00282C1.12154 6.17387 1 6.42571 1 6.69532V13.8055C1 14.3547 1.44528 14.8 1.99446 14.8H5.2155V10.2248H10.7844V14.8H14.0054C14.5546 14.8 14.9999 14.3547 14.9999 13.8055V6.69532C14.9999 6.42571 14.8784 6.17387 14.6718 6.00282Z"></path></svg>
              </Link>
              <ChevronRight size={16} className="mx-2" />
              <Link to={`/categories/${categoryId}`} className="hover:underline hover:text-[#404145]">
                {categoryName}
              </Link>
              {subcategoryName && (
                <>
                  <ChevronRight size={16} className="mx-2" />
                  <span className="text-[#404145]">{subcategoryName}</span>
                </>
              )}
            </nav>

            
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
              <h1 className="text-[32px] md:text-[40px] font-bold text-[#404145] leading-tight">
                {pageTitle}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <p className="text-[16px] text-[#62646a]">
                  Allow your creativity to shine with a captivating {pageTitle.toLowerCase()}.
                </p>
                <button className="flex items-center gap-2 text-[14px] font-bold text-[#404145] px-4 py-2 border border-[#e4e5e7] rounded hover:bg-gray-50 transition-colors whitespace-nowrap">
                  <Play size={16} className="fill-current" />
                  How Nexlance Works
                </button>
              </div>
            </div>

            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {subcategoryPills.map((pill, idx) => (
                <Link 
                  key={idx} 
                  to={`/categories/${categoryId}/${pill.toLowerCase().replace(/ /g, '-')}`} 
                  className="px-4 py-2 bg-white border border-[#e4e5e7] text-[#404145] text-[14px] font-semibold rounded-full hover:bg-gray-50 hover:shadow-sm transition-all"
                >
                  {pill}
                </Link>
              ))}
            </div>

          </div>
        </div>

        
        <div className="sticky top-20 z-30 bg-white border-y border-gray-200 py-3 mb-8">
          <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-4">
            
            
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto pb-2 lg:pb-0" onClick={e => e.stopPropagation()}>
              
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('sellerDetails')}
                  className={`flex items-center gap-2 px-4 py-2 border rounded text-[16px] font-semibold transition-colors whitespace-nowrap ${activeDropdown === 'sellerDetails' || selectedSellerLevels.length > 0 ? 'border-gray-900 bg-gray-50 text-[#404145]' : 'border-[#e4e5e7] text-[#404145] hover:bg-gray-50'}`}
                >
                  Seller details {selectedSellerLevels.length > 0 && `(${selectedSellerLevels.length})`} <ChevronDown size={16} className={activeDropdown === 'sellerDetails' ? 'rotate-180' : ''} />
                </button>
                {activeDropdown === 'sellerDetails' && (
                  <div className="absolute top-full left-0 mt-2 w-[400px] bg-white border border-gray-200 shadow-xl rounded-lg z-50 flex flex-col">
                    <div className="p-6 max-h-[300px] overflow-y-auto relative pr-8">
                      <h4 className="font-bold mb-4 text-[#404145] text-[16px]">Seller level</h4>
                      <div className="grid grid-cols-2 gap-y-4 mb-6">
                        {['Top Rated Seller', 'Level 2', 'Level 1', 'New Seller'].map(level => (
                          <label key={level} className="flex items-center gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={selectedSellerLevels.includes(level)}
                              onChange={() => handleSellerLevelToggle(level)}
                              className="w-5 h-5 rounded border-gray-300 text-[#222325] focus:ring-0" 
                            />
                            <span className="text-[#404145] text-[15px] font-semibold">{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-white rounded-b-lg">
                      <button className="text-[#62646a] hover:text-[#404145] font-bold text-[15px]" onClick={clearSellerLevels}>Clear all</button>
                      <button className="bg-[#222325] text-white px-6 py-2.5 rounded-lg font-bold text-[15px] hover:bg-black transition-colors" onClick={() => setActiveDropdown(null)}>Apply</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('budget')}
                  className={`flex items-center gap-2 px-4 py-2 border rounded text-[16px] font-semibold transition-colors whitespace-nowrap ${activeDropdown === 'budget' || budgetUpTo ? 'border-gray-900 bg-gray-50 text-[#404145]' : 'border-[#e4e5e7] text-[#404145] hover:bg-gray-50'}`}
                >
                  Budget {budgetUpTo && `(Up to ₹${budgetUpTo})`} <ChevronDown size={16} className={activeDropdown === 'budget' ? 'rotate-180' : ''} />
                </button>
                {activeDropdown === 'budget' && (
                  <div className="absolute top-full left-0 mt-2 w-[300px] bg-white border border-gray-200 shadow-xl rounded-lg z-50 flex flex-col">
                    <div className="p-6">
                      <label className="block font-bold text-[#62646a] text-[15px] mb-3">Up to</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#404145] font-bold">₹</span>
                        <input 
                          type="number" 
                          value={budgetUpToInput}
                          onChange={(e) => setBudgetUpToInput(e.target.value)}
                          className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded focus:border-[#404145] focus:ring-1 focus:ring-[#404145] outline-none transition-colors" 
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-white rounded-b-lg">
                      <button className="text-[#62646a] hover:text-[#404145] font-bold text-[15px]" onClick={clearBudget}>Clear all</button>
                      <button className="bg-[#222325] text-white px-6 py-2.5 rounded-lg font-bold text-[15px] hover:bg-black transition-colors" onClick={applyBudget}>Apply</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('delivery')}
                  className={`flex items-center gap-2 px-4 py-2 border rounded text-[16px] font-semibold transition-colors whitespace-nowrap ${activeDropdown === 'delivery' || selectedDelivery !== 'Anytime' ? 'border-gray-900 bg-gray-50 text-[#404145]' : 'border-[#e4e5e7] text-[#404145] hover:bg-gray-50'}`}
                >
                  Delivery time {selectedDelivery !== 'Anytime' && `(${selectedDelivery})`} <ChevronDown size={16} className={activeDropdown === 'delivery' ? 'rotate-180' : ''} />
                </button>
                {activeDropdown === 'delivery' && (
                  <div className="absolute top-full left-0 mt-2 w-[300px] bg-white border border-gray-200 shadow-xl rounded-lg z-50 flex flex-col">
                    <div className="p-6 flex flex-col gap-4 max-h-[300px] overflow-y-auto">
                      {['Express 24H', 'Up to 3 days', 'Up to 7 days', 'Anytime'].map(time => (
                        <label key={time} className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="radio" 
                            name="delivery" 
                            value={time}
                            checked={selectedDelivery === time}
                            onChange={handleDeliveryToggle}
                            className="w-5 h-5 border-gray-300 text-[#222325] focus:ring-[#222325]" 
                          />
                          <span className="text-[#404145] text-[15px] font-semibold">{time}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-white rounded-b-lg">
                      <button className="text-[#62646a] hover:text-[#404145] font-bold text-[15px]" onClick={clearDelivery}>Clear all</button>
                      <button className="bg-[#222325] text-white px-6 py-2.5 rounded-lg font-bold text-[15px] hover:bg-black transition-colors" onClick={() => setActiveDropdown(null)}>Apply</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            
            <div className="flex items-center gap-6 shrink-0 w-full lg:w-auto justify-between lg:justify-end" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setProServices(!proServices)}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  {proServices ? (
                    <ToggleRight size={32} className="text-[#1dbf73]" strokeWidth={1.5} />
                  ) : (
                    <ToggleLeft size={32} className="text-gray-300 group-hover:text-gray-400 transition-colors" strokeWidth={1.5} />
                  )}
                  <span className="text-[16px] font-semibold text-[#404145] group-hover:text-black">
                    Pro services
                  </span>
                </button>
              </div>

              <div className="relative">
                <div className="flex items-center gap-2 text-[15px]">
                  <span className="text-[#62646a]">Sort by</span>
                  <button onClick={() => toggleDropdown('sort')} className="font-semibold text-[#404145] flex items-center gap-1 hover:text-black">
                    {sortBy} <ChevronDown size={16} className={activeDropdown === 'sort' ? 'rotate-180' : ''} />
                  </button>
                </div>
                {activeDropdown === 'sort' && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-lg py-2 z-50">
                    {['Relevance', 'Best Selling', 'Newest Arrivals', 'Highest Rated', 'Lowest Price', 'Highest Price'].map(option => (
                      <button 
                        key={option}
                        onClick={() => { setSortBy(option); setActiveDropdown(null); }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${sortBy === option ? 'font-bold text-gray-800 bg-gray-50' : 'text-gray-600'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>

        
        <div className="max-w-[1400px] mx-auto px-6 mb-6 flex justify-between items-center">
          <span className="text-[15px] font-semibold text-[#74767e]">
            {totalItems > 1000 ? '1,000+' : totalItems} results
          </span>
        </div>

        
        <div className="max-w-[1400px] mx-auto px-6 mb-16">
          {paginatedGigs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
              {paginatedGigs.map(gig => (
                <MarketplaceGigCard key={gig.id} gig={gig} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[#62646a]">
              <h2 className="text-2xl font-bold mb-4">No results found</h2>
              <p>Try adjusting your filters or search criteria.</p>
            </div>
          )}
        </div>

        
        {totalPages > 1 && (
          <div className="max-w-[1400px] mx-auto px-6 mb-16 flex justify-center">
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage === 1 ? 'text-[#b5b6ba] cursor-not-allowed' : 'text-[#404145] hover:bg-gray-100 cursor-pointer'}`}
              >
                <ChevronLeft size={20} />
              </button>
              
              {getPaginationButtons().map(page => (
                <button 
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-[16px] transition-colors ${currentPage === page ? 'bg-[#222325] text-white' : 'text-[#404145] hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage === totalPages ? 'text-[#b5b6ba] cursor-not-allowed' : 'text-[#404145] hover:bg-gray-100 cursor-pointer'}`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        <FreelanceTalentSection />

      </main>

      <Footer />
    </div>
  );
}
