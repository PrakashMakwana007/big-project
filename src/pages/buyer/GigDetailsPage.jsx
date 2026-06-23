import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Star, Heart, Share, ChevronRight, ChevronLeft, Clock, RefreshCw, Check, ArrowRight, ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-react';
import BuyerNavbar from '../../components/buyer/BuyerNavbar';
import BuyerCategoryNav from '../../components/buyer/BuyerCategoryNav';
import Footer from '../../components/Footer';
import MarketplaceGigCard from '../../components/buyer/MarketplaceGigCard';

export default function GigDetailsPage() {
  const { gigId } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('basic');
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  
  const passedGig = location.state?.gig;

  
  const enrichGigData = (baseGig) => {
    const seed = baseGig?.id || gigId || 'fallback';
    const isPro = baseGig?.isPro || false;
    const basePrice = baseGig?.price || 2500;
    
    
    const packages = {
      basic: {
        name: 'Basic Startup',
        price: basePrice,
        description: 'Starter package with essential features to get you up and running.',
        deliveryDays: 2,
        revisions: 1,
        features: [
          { name: 'Basic concept', included: true },
          { name: 'Standard quality', included: true },
          { name: 'Source file', included: false },
          { name: 'Commercial use', included: false },
        ]
      },
      standard: {
        name: 'Pro Business',
        price: basePrice * 2.5,
        description: 'Perfect for small businesses. High quality delivery with source files.',
        deliveryDays: 3,
        revisions: 3,
        features: [
          { name: 'Basic concept', included: true },
          { name: 'Standard quality', included: true },
          { name: 'Source file', included: true },
          { name: 'Commercial use', included: false },
        ]
      },
      premium: {
        name: 'VIP Branding',
        price: basePrice * 5,
        description: 'Full premium experience. All features included with unlimited revisions.',
        deliveryDays: 5,
        revisions: 999, 
        features: [
          { name: 'Basic concept', included: true },
          { name: 'Standard quality', included: true },
          { name: 'Source file', included: true },
          { name: 'Commercial use', included: true },
        ]
      }
    };

    const faqs = [
      { q: 'What do you need from me to get started?', a: 'I need a clear brief, any reference materials you have, and your specific requirements for the project.' },
      { q: 'Do you offer custom offers?', a: 'Yes! Please contact me directly with your requirements and I can create a custom offer tailored to your needs.' },
      { q: 'What if I am not happy with the delivery?', a: 'I offer revisions based on the package you choose. We will work together until you are completely satisfied with the result.' }
    ];

    const generateReviews = () => {
      const reviews = [];
      const numReviews = 4;
      for (let i = 0; i < numReviews; i++) {
        reviews.push({
          id: i,
          user: `Client_${seed.substring(0,3)}_${i+1}`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Client_${seed}_${i}`,
          country: ['United States', 'United Kingdom', 'Canada', 'Australia'][i % 4],
          rating: 5,
          date: `${i + 1} months ago`,
          comment: 'Outstanding experience! The communication was excellent, the delivery was fast, and the quality of work exceeded my expectations. Highly recommended!',
          helpfulCount: Math.floor(Math.random() * 20)
        });
      }
      return reviews;
    };

    return {
      id: seed,
      title: baseGig?.title || 'I will deliver outstanding professional services for your project',
      category: 'Services',
      subcategory: 'Professional Service',
      rating: baseGig?.rating || 4.9,
      reviewsCount: baseGig?.reviewCount || 1425,
      ordersInQueue: Math.floor(Math.random() * 20) + 1,
      seller: {
        name: baseGig?.seller?.name || 'creative_pro',
        avatar: baseGig?.seller?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`,
        level: baseGig?.seller?.level || 'Top Rated Seller',
        country: 'United States',
        memberSince: 'Oct 2021',
        avgResponseTime: '1 hour',
        lastDelivery: 'about 2 hours',
        description: 'Hi! I am a professional freelancer dedicated to delivering top-quality results. I pride myself on excellent communication and understanding exactly what my clients need to succeed.'
      },
      images: baseGig?.images || [
        `https://picsum.photos/seed/${seed}_1/800/500`,
        `https://picsum.photos/seed/${seed}_2/800/500`,
        `https://picsum.photos/seed/${seed}_3/800/500`,
      ],
      description: `Welcome to my professional service gig!\n\nI am here to make sure you get a result that you can be proud of.\n\n**Why choose me?**\n- 100% Original and Unique Concepts\n- Fast and professional communication\n- High-resolution delivery\n- Excellent customer support\n\n**My workflow:**\n1. You provide the creative brief.\n2. I research your industry and requirements.\n3. I create the initial draft.\n4. We refine the concept until it's perfect.\n\nLet's create something amazing together! Order now or send me a message if you have any questions.`,
      packages,
      faqs,
      reviews: generateReviews()
    };
  };

  const [gig, setGig] = useState(null);

  useEffect(() => {
    setGig(enrichGigData(passedGig));
    window.scrollTo(0, 0);
  }, [passedGig, gigId]);

  if (!gig) return <div className="min-h-screen bg-white"></div>;

  
  const recommendations = Array.from({length: 4}).map((_, i) => {
    const seed = `${gig.id}_rec_${i}`;
    return {
      id: seed,
      title: `I will provide exceptional service ${i+1}`,
      price: gig.packages.basic.price + (i * 500),
      rating: 4.8 + Number((Math.random() * 0.2).toFixed(1)),
      reviewCount: Math.floor(Math.random() * 500) + 10,
      isPro: i === 0,
      thumbnail: `https://picsum.photos/seed/${seed}/400/300`,
      images: [
        `https://picsum.photos/seed/${seed}/400/300`,
        `https://picsum.photos/seed/${seed}_2/400/300`,
      ],
      seller: {
        name: `Seller_${i+1}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`,
        level: 'Level 2'
      }
    };
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BuyerNavbar />
      <BuyerCategoryNav />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-8">
        
        <div className="text-[14px] text-[#404145] mb-6 flex items-center gap-2">
          <Link to="/" className="hover:underline">Home</Link>
          <ChevronRight size={14} className="text-[#b5b6ba]" />
          <Link to="#" className="hover:underline">{gig.category}</Link>
          <ChevronRight size={14} className="text-[#b5b6ba]" />
          <span className="font-semibold">{gig.subcategory}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 relative items-start">
          
          
          <div className="flex-1 w-full max-w-[800px] overflow-hidden">
            
            <h1 className="text-[28px] md:text-[32px] font-bold text-[#404145] leading-[1.2] mb-6">
              {gig.title}
            </h1>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                <img src={gig.seller.avatar} alt={gig.seller.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2 text-[15px]">
                  <Link to="#" className="font-bold text-[#404145] hover:underline">{gig.seller.name}</Link>
                  <span className="text-[#ffb33e] font-bold">|</span>
                  <span className="text-[#62646a]">{gig.seller.level}</span>
                  <span className="text-[#ffb33e] font-bold">|</span>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-[#222325] text-[#222325]" />
                    <span className="font-bold text-[#404145]">{gig.rating}</span>
                    <span className="text-[#62646a] underline cursor-pointer hover:text-[#404145]">({gig.reviewsCount.toLocaleString()} reviews)</span>
                  </div>
                </div>
                <div className="text-[14px] text-[#62646a] mt-1 font-semibold">
                  {gig.ordersInQueue} Orders in Queue
                </div>
              </div>
            </div>

            
            <div className="mb-12">
              <div className="rounded-lg overflow-hidden border border-[#e4e5e7] bg-gray-50 aspect-[16/10] relative group mb-3">
                <div 
                  className="flex w-full h-full transition-transform duration-300 ease-in-out" 
                  style={{ transform: `translateX(-${currentImageIdx * 100}%)` }}
                >
                  {gig.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover shrink-0" />
                  ))}
                </div>
                
                
                <button 
                  onClick={() => setCurrentImageIdx(prev => Math.max(0, prev - 1))}
                  className={`absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md transition-opacity duration-200 hover:bg-gray-50 ${currentImageIdx === 0 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100'}`}
                >
                  <ChevronLeft size={24} className="text-[#404145] -ml-0.5" />
                </button>
                <button 
                  onClick={() => setCurrentImageIdx(prev => Math.min(gig.images.length - 1, prev + 1))}
                  className={`absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md transition-opacity duration-200 hover:bg-gray-50 ${currentImageIdx === gig.images.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100'}`}
                >
                  <ChevronRight size={24} className="text-[#404145] ml-0.5" />
                </button>
              </div>

              
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                {gig.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIdx(idx)}
                    className={`relative w-[120px] aspect-video rounded overflow-hidden shrink-0 transition-all border ${currentImageIdx === idx ? 'border-[#404145] ring-1 ring-[#404145] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            
            <h2 className="text-[24px] font-bold text-[#404145] mb-6">About this gig</h2>
            <div className="text-[16px] text-[#62646a] leading-relaxed mb-16 whitespace-pre-line pb-8 border-b border-[#e4e5e7]">
              {gig.description}
            </div>

            
            <h2 className="text-[24px] font-bold text-[#404145] mb-6">About the seller</h2>
            <div className="flex gap-5 mb-8">
              <div className="w-[110px] h-[110px] rounded-full overflow-hidden shrink-0 border border-gray-200">
                <img src={gig.seller.avatar} alt={gig.seller.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <Link to="#" className="font-bold text-[20px] text-[#404145] hover:underline mb-1">{gig.seller.name}</Link>
                <p className="text-[#62646a] text-[15px] mb-2 font-medium">{gig.seller.level}</p>
                <div className="flex items-center gap-1 mb-4">
                  <Star size={16} className="fill-[#222325] text-[#222325]" />
                  <span className="font-bold text-[#404145] text-[15px]">{gig.rating}</span>
                  <span className="text-[#62646a] text-[15px]">({gig.reviewsCount.toLocaleString()} reviews)</span>
                </div>
                <button className="border border-[#404145] text-[#404145] px-6 py-2 rounded font-bold text-[15px] hover:bg-gray-50 transition-colors w-fit">
                  Contact Me
                </button>
              </div>
            </div>

            
            <div className="border border-[#e4e5e7] rounded-lg p-6 bg-white mb-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 mb-6">
                <div>
                  <p className="text-[#62646a] text-[15px] mb-1">From</p>
                  <p className="font-bold text-[#404145] text-[16px]">{gig.seller.country}</p>
                </div>
                <div>
                  <p className="text-[#62646a] text-[15px] mb-1">Member since</p>
                  <p className="font-bold text-[#404145] text-[16px]">{gig.seller.memberSince}</p>
                </div>
                <div>
                  <p className="text-[#62646a] text-[15px] mb-1">Avg. response time</p>
                  <p className="font-bold text-[#404145] text-[16px]">{gig.seller.avgResponseTime}</p>
                </div>
                <div>
                  <p className="text-[#62646a] text-[15px] mb-1">Last delivery</p>
                  <p className="font-bold text-[#404145] text-[16px]">{gig.seller.lastDelivery}</p>
                </div>
              </div>
              <div className="pt-6 border-t border-[#e4e5e7] text-[15px] text-[#62646a] leading-relaxed">
                {gig.seller.description}
              </div>
            </div>

            
            <h2 className="text-[24px] font-bold text-[#404145] mb-6">My Portfolio</h2>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar mb-16">
              {Array.from({length: 4}).map((_, i) => (
                <div key={i} className="w-[200px] h-[150px] shrink-0 rounded overflow-hidden border border-gray-200">
                  <img src={`https://picsum.photos/seed/${gig.id}_port_${i}/400/300`} alt="Portfolio" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            
            <h2 className="text-[24px] font-bold text-[#404145] mb-6">Compare packages</h2>
            <div className="border border-[#e4e5e7] rounded mb-16 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-r border-[#e4e5e7] bg-gray-50 text-[#62646a] font-bold w-1/4">Package</th>
                    <th className="p-4 border-b border-r border-[#e4e5e7] text-center w-1/4">
                      <div className="font-bold text-[#404145] text-[18px] mb-2">₹{gig.packages.basic.price.toLocaleString()}</div>
                      <div className="font-bold text-[#404145] text-[16px] mb-2">Basic</div>
                      <div className="font-normal text-[#62646a] text-[14px]">{gig.packages.basic.name}</div>
                    </th>
                    <th className="p-4 border-b border-r border-[#e4e5e7] text-center w-1/4 bg-[#f9faff]">
                      <div className="font-bold text-[#404145] text-[18px] mb-2">₹{gig.packages.standard.price.toLocaleString()}</div>
                      <div className="font-bold text-[#404145] text-[16px] mb-2">Standard</div>
                      <div className="font-normal text-[#62646a] text-[14px]">{gig.packages.standard.name}</div>
                    </th>
                    <th className="p-4 border-b border-[#e4e5e7] text-center w-1/4">
                      <div className="font-bold text-[#404145] text-[18px] mb-2">₹{gig.packages.premium.price.toLocaleString()}</div>
                      <div className="font-bold text-[#404145] text-[16px] mb-2">Premium</div>
                      <div className="font-normal text-[#62646a] text-[14px]">{gig.packages.premium.name}</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[15px] text-[#62646a]">
                  <tr>
                    <td className="p-4 border-b border-r border-[#e4e5e7] font-semibold text-[#404145]">Revisions</td>
                    <td className="p-4 border-b border-r border-[#e4e5e7] text-center">{gig.packages.basic.revisions}</td>
                    <td className="p-4 border-b border-r border-[#e4e5e7] text-center bg-[#f9faff]">{gig.packages.standard.revisions}</td>
                    <td className="p-4 border-b border-[#e4e5e7] text-center">{gig.packages.premium.revisions === 999 ? 'Unlimited' : gig.packages.premium.revisions}</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-r border-[#e4e5e7] font-semibold text-[#404145]">Delivery Time</td>
                    <td className="p-4 border-b border-r border-[#e4e5e7] text-center">{gig.packages.basic.deliveryDays} Days</td>
                    <td className="p-4 border-b border-r border-[#e4e5e7] text-center bg-[#f9faff]">{gig.packages.standard.deliveryDays} Days</td>
                    <td className="p-4 border-b border-[#e4e5e7] text-center">{gig.packages.premium.deliveryDays} Days</td>
                  </tr>
                  
                  {gig.packages.premium.features.map((feature, idx) => (
                    <tr key={idx}>
                      <td className="p-4 border-b border-r border-[#e4e5e7] text-[#62646a]">{feature.name}</td>
                      <td className="p-4 border-b border-r border-[#e4e5e7] text-center text-[#1dbf73]">
                        {gig.packages.basic.features[idx].included ? <Check size={20} className="mx-auto" /> : <span className="text-[#b5b6ba]">-</span>}
                      </td>
                      <td className="p-4 border-b border-r border-[#e4e5e7] text-center text-[#1dbf73] bg-[#f9faff]">
                        {gig.packages.standard.features[idx].included ? <Check size={20} className="mx-auto" /> : <span className="text-[#b5b6ba]">-</span>}
                      </td>
                      <td className="p-4 border-b border-[#e4e5e7] text-center text-[#1dbf73]">
                        {gig.packages.premium.features[idx].included ? <Check size={20} className="mx-auto" /> : <span className="text-[#b5b6ba]">-</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
            <h2 className="text-[24px] font-bold text-[#404145] mb-6">Recommendations for you</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {recommendations.map(r => (
                <div key={r.id} className="w-full">
                  <MarketplaceGigCard gig={r} />
                </div>
              ))}
            </div>

            
            <h2 className="text-[24px] font-bold text-[#404145] mb-6">FAQ</h2>
            <div className="mb-16">
              {gig.faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-[#e4e5e7]">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-bold text-[16px] text-[#404145]">{faq.q}</span>
                    <ChevronDown size={20} className={`text-[#62646a] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="pb-5 text-[15px] text-[#62646a] leading-relaxed pr-8">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            
            <h2 className="text-[24px] font-bold text-[#404145] mb-6">Reviews</h2>
            
            
            <div className="flex flex-col md:flex-row gap-12 mb-10 pb-10 border-b border-[#e4e5e7]">
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-[16px] font-bold text-[#404145]">{gig.reviewsCount.toLocaleString()} reviews for this Gig</h3>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-[#ffb33e] text-[#ffb33e]" />
                    <Star size={16} className="fill-[#ffb33e] text-[#ffb33e]" />
                    <Star size={16} className="fill-[#ffb33e] text-[#ffb33e]" />
                    <Star size={16} className="fill-[#ffb33e] text-[#ffb33e]" />
                    <Star size={16} className="fill-[#ffb33e] text-[#ffb33e]" />
                    <span className="font-bold text-[#ffb33e] ml-1">{gig.rating}</span>
                  </div>
                </div>
                
                {[5,4,3,2,1].map(star => (
                  <div key={star} className="flex items-center gap-3 mb-2">
                    <span className="text-[15px] font-bold text-[#404145] w-[45px]">{star} Stars</span>
                    <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full bg-[#ffb33e] rounded-full" style={{ width: star === 5 ? '90%' : star === 4 ? '8%' : '2%' }}></div>
                    </div>
                    <span className="text-[15px] text-[#62646a] w-10 text-right">
                      {star === 5 ? Math.floor(gig.reviewsCount * 0.9) : star === 4 ? Math.floor(gig.reviewsCount * 0.08) : Math.floor(gig.reviewsCount * 0.02)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="space-y-8 mb-16">
              {gig.reviews.map(review => (
                <div key={review.id} className="border-b border-[#e4e5e7] pb-8">
                  <div className="flex gap-4">
                    <img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-full border border-gray-200 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-[16px] text-[#404145]">{review.user}</span>
                        <span className="text-[14px] text-[#62646a]">{review.country}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-[#ffb33e] text-[#ffb33e]" />)}
                        </div>
                        <span className="text-[#ffb33e] font-bold text-[14px]">{review.rating}</span>
                        <span className="text-[#b5b6ba] text-[14px]">|</span>
                        <span className="text-[#62646a] text-[14px]">{review.date}</span>
                      </div>
                      <p className="text-[15px] text-[#404145] leading-relaxed mb-4">
                        {review.comment}
                      </p>
                      <div className="flex items-center gap-4 text-[#62646a] text-[14px] font-semibold">
                        <span>Helpful?</span>
                        <button className="flex items-center gap-1 hover:text-[#404145] transition-colors">
                          <ThumbsUp size={16} /> Yes
                        </button>
                        <button className="flex items-center gap-1 hover:text-[#404145] transition-colors">
                          <ThumbsDown size={16} /> No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          
          <div className="w-full lg:w-[400px] shrink-0 sticky top-28 z-10 pb-16">
            <div className="border border-[#e4e5e7] rounded-lg bg-white overflow-hidden shadow-sm">
              
              <div className="flex text-[15px] font-bold text-[#62646a] bg-gray-50 border-b border-[#e4e5e7]">
                <button 
                  onClick={() => setActiveTab('basic')}
                  className={`flex-1 py-4 text-center transition-colors ${activeTab === 'basic' ? 'border-b-[3px] border-[#1dbf73] text-[#1dbf73] bg-white' : 'border-b-[3px] border-transparent hover:text-[#404145]'}`}
                >
                  Basic
                </button>
                <button 
                  onClick={() => setActiveTab('standard')}
                  className={`flex-1 py-4 text-center transition-colors ${activeTab === 'standard' ? 'border-b-[3px] border-[#1dbf73] text-[#1dbf73] bg-white' : 'border-b-[3px] border-transparent hover:text-[#404145]'}`}
                >
                  Standard
                </button>
                <button 
                  onClick={() => setActiveTab('premium')}
                  className={`flex-1 py-4 text-center transition-colors ${activeTab === 'premium' ? 'border-b-[3px] border-[#1dbf73] text-[#1dbf73] bg-white' : 'border-b-[3px] border-transparent hover:text-[#404145]'}`}
                >
                  Premium
                </button>
              </div>

              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-[18px] text-[#404145] pr-4">{gig.packages[activeTab].name}</h3>
                  <p className="font-normal text-[22px] text-[#404145] whitespace-nowrap">₹{gig.packages[activeTab].price.toLocaleString()}</p>
                </div>
                <p className="text-[#62646a] text-[15px] mb-6 min-h-[44px]">
                  {gig.packages[activeTab].description}
                </p>

                <div className="flex items-center gap-4 text-[#404145] font-bold text-[14px] mb-6">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{gig.packages[activeTab].deliveryDays} Days Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw size={16} />
                    <span>{gig.packages[activeTab].revisions === 999 ? 'Unlimited' : gig.packages[activeTab].revisions} Revisions</span>
                  </div>
                </div>

                <ul className="mb-8 space-y-2">
                  {gig.packages[activeTab].features.map((feature, idx) => (
                    <li key={idx} className={`flex items-center gap-3 ${feature.included ? 'text-[#404145]' : 'text-[#b5b6ba]'}`}>
                      <Check size={18} strokeWidth={feature.included ? 3 : 2} className={feature.included ? 'text-[#1dbf73]' : 'text-[#b5b6ba]'} />
                      <span className="text-[15px]">{feature.name}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-[16px]">
                  Continue <ArrowRight size={18} />
                </button>
                <button className="w-full mt-3 text-[#1dbf73] hover:text-[#19a463] font-bold py-3 px-4 transition-colors text-[16px]">
                  Compare Packages
                </button>
              </div>
            </div>

            
            <div className="mt-6 flex justify-center gap-6">
              <button className="flex items-center gap-2 text-[#62646a] hover:text-[#404145] font-semibold text-[15px] transition-colors">
                <Heart size={18} /> Save
              </button>
              <button className="flex items-center gap-2 text-[#62646a] hover:text-[#404145] font-semibold text-[15px] transition-colors">
                <Share size={18} /> Share
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
