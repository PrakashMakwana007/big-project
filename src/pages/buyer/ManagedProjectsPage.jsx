import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, PlayCircle, Plus, Minus, Settings, Shield, User, Clock, CheckCircle2, MapPin, Calendar } from 'lucide-react';
import BuyerNavbar from '../../components/buyer/BuyerNavbar';
import Footer from '../../components/Footer';

export default function ManagedProjectsPage() {
  const [activeTab, setActiveTab] = useState('Website');
  const [openFaq, setOpenFaq] = useState(null);

  const tabs = ['Website', 'Video marketing', 'Brand strategy', 'App development', 'Software development'];

  const faqs = [
    { q: 'Who is a Nexlance Pro Project Manager?', a: 'A Nexlance Pro Project Manager is a vetted expert who oversees your entire project from start to finish.' },
    { q: 'How does the matchmaking process work?', a: 'We analyze your project requirements and match you with the best-fit project manager from our exclusive pool of experts.' },
    { q: 'How is this different from regular freelance hiring?', a: 'This is a fully managed service where a dedicated professional handles freelancer sourcing, communication, and delivery.' },
    { q: 'Can I request multiple projects at once?', a: 'Yes, our project managers are equipped to handle complex and multiple parallel projects.' },
    { q: 'What happens if I need changes to the final delivery?', a: 'Your project manager will coordinate all revisions and ensure the final product meets your exact specifications.' },
    { q: 'How secure is my data?', a: 'We use enterprise-grade encryption and strict NDAs to protect your confidential information.' },
    { q: 'What if I am not satisfied with the final result?', a: 'We offer a satisfaction guarantee and will work to make it right or provide a full refund.' }
  ];

  const managers = [
    { name: 'Diana P.', role: 'Project Manager', rating: 5.0, rate: '$80', from: 'United States', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana' },
    { name: 'David L.', role: 'Project Manager', rating: 5.0, rate: '$120', from: 'Canada', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
    { name: 'Sarah M.', role: 'Project Manager', rating: 4.9, rate: '$95', from: 'United Kingdom', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BuyerNavbar />

      
      <section className="bg-[#00391b] text-white pt-20 pb-24 px-6 overflow-hidden">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-12 relative">
          <div className="flex-1 z-10 relative">
            <h1 className="text-[40px] md:text-[56px] font-bold leading-[1.1] mb-6">
              Your projects managed and delivered for you
            </h1>
            <p className="text-[18px] md:text-[20px] mb-10 max-w-[500px] opacity-90 leading-relaxed">
              An end-to-end service where a dedicated expert project manages your project from strategy to execution.
            </p>
            <div className="flex items-center gap-2 mb-10 text-[15px] font-bold">
              <CheckCircle2 size={20} className="text-[#1dbf73]" /> All-inclusive managed service
            </div>
            <button className="bg-white text-[#404145] hover:bg-gray-100 font-bold py-3.5 px-8 rounded-lg transition-colors text-[16px]">
              Book a free consultation
            </button>
          </div>
          
          <div className="flex-1 relative z-10 hidden lg:block">
            
            <div className="relative w-full max-w-[450px] mx-auto aspect-[4/5] bg-[#0a4a27] rounded-full overflow-hidden flex items-end justify-center pt-10 border-4 border-[#125e36]">
               <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="Professional" className="w-[85%] object-cover object-top h-full" />
            </div>
            
            <div className="absolute top-10 -right-4 bg-white text-[#404145] p-4 rounded-lg shadow-2xl w-56 rotate-3 transform">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={18} className="text-[#1dbf73]" /> <span className="font-bold text-[15px]">May 2026</span>
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({length: 28}).map((_, i) => (
                  <div key={i} className={`h-4 rounded-sm ${i === 14 ? 'bg-[#1dbf73]' : 'bg-gray-100'}`}></div>
                ))}
              </div>
            </div>
          </div>
          
          
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#034f27] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
        </div>
      </section>

      
      <section className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[#b5b6ba] text-[14px] font-bold uppercase tracking-wider mb-8">Trusted by the world's best companies</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale">
            {['Meta', 'Google', 'Netflix', 'P&G', 'PayPal'].map(brand => (
              <span key={brand} className="text-3xl font-black font-sans tracking-tighter">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Benefits Grid */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto text-center">
        <h2 className="text-[32px] md:text-[44px] font-bold text-[#404145] mb-20 max-w-[700px] mx-auto leading-tight">
          The benefits of working with an expert project manager
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12 text-left">
          {[
            { title: 'Expert matching', desc: 'We handpick the perfect project manager for your specific needs.', icon: <User size={40} className="text-[#1dbf73]" /> },
            { title: 'Dedicated partner', desc: 'One single point of contact who understands your business goals.', icon: <Shield size={40} className="text-[#1dbf73]" /> },
            { title: 'Agile delivery', desc: 'Fast, iterative execution to get your project to market sooner.', icon: <Clock size={40} className="text-[#1dbf73]" /> },
            { title: 'Milestone tracking', desc: 'Full transparency into project progress and financial status.', icon: <CheckCircle2 size={40} className="text-[#1dbf73]" /> },
            { title: 'Quality assurance', desc: 'Rigorous vetting and review of all deliverables.', icon: <Star size={40} className="text-[#1dbf73]" /> },
            { title: 'Secure transactions', desc: 'Enterprise-grade security and NDAs for peace of mind.', icon: <Settings size={40} className="text-[#1dbf73]" /> }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-[20px] font-bold text-[#404145] mb-3">{item.title}</h3>
              <p className="text-[#62646a] text-[16px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <button className="mt-20 bg-[#222325] hover:bg-[#404145] text-white font-bold py-3.5 px-8 rounded-lg transition-colors text-[16px]">
          Book a free consultation
        </button>
      </section>

      {/* SECTION 4: Strategy to Execution */}
      <section className="bg-[#fafafa] py-24 px-6 border-y border-[#e4e5e7]">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-[32px] md:text-[44px] font-bold text-[#404145] mb-12 text-center">
            We build your project from strategy to execution
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 mb-16 border-b border-[#e4e5e7] pb-6">
            {tabs.map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full font-bold text-[15px] transition-colors border ${activeTab === tab ? 'bg-[#222325] text-white border-[#222325]' : 'bg-white text-[#62646a] border-[#e4e5e7] hover:border-[#404145]'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 w-full bg-[#1dbf73] rounded-2xl p-8 aspect-[4/3] flex items-center justify-center relative overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop" alt="Laptop" className="w-[85%] rounded-md shadow-2xl z-10" />
            </div>
            <div className="flex-1">
              <h3 className="text-[28px] font-bold text-[#404145] mb-6">{activeTab}</h3>
              <p className="text-[16px] text-[#62646a] mb-6 leading-relaxed">
                From simple landing pages to complex e-commerce platforms, our project managers oversee the entire {activeTab.toLowerCase()} lifecycle.
              </p>
              <p className="text-[16px] text-[#62646a] leading-relaxed">
                We coordinate with designers, developers, and QA testers to ensure your site is beautiful, functional, and optimized for success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Pricing Cards */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto">
        <h2 className="text-[32px] md:text-[44px] font-bold text-[#404145] mb-16 text-center">
          Unlock professional project talent
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
          {/* Card 1 */}
          <div className="border border-[#e4e5e7] rounded-xl p-10 bg-white flex flex-col hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-[28px] font-bold text-[#404145] mb-4">Manage your projects</h3>
            <p className="text-[16px] text-[#62646a] mb-10 min-h-[48px] leading-relaxed">Ideal for clients who have their own freelancers but need expert management.</p>
            <ul className="space-y-5 mb-12 flex-1">
              <li className="flex items-start gap-4"><Check size={24} className="text-[#1dbf73] shrink-0" /><span className="text-[#404145] font-semibold text-[16px]">Expert project manager</span></li>
              <li className="flex items-start gap-4"><Check size={24} className="text-[#1dbf73] shrink-0" /><span className="text-[#404145] font-semibold text-[16px]">Timeline & budget tracking</span></li>
              <li className="flex items-start gap-4"><Check size={24} className="text-[#1dbf73] shrink-0" /><span className="text-[#404145] font-semibold text-[16px]">Quality assurance reviews</span></li>
            </ul>
            <button className="w-full bg-[#222325] hover:bg-[#404145] text-white font-bold py-4 rounded-lg transition-colors text-[16px]">
              Explore projects
            </button>
          </div>
          
          {/* Card 2 */}
          <div className="border-2 border-[#1dbf73] rounded-xl p-10 bg-white flex flex-col shadow-lg relative transform md:-translate-y-4">
            <div className="absolute top-0 right-10 bg-[#1dbf73] text-white text-[13px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-b-md shadow-md">Recommended</div>
            <h3 className="text-[28px] font-bold text-[#404145] mb-4 mt-2">Full-scale management</h3>
            <p className="text-[16px] text-[#62646a] mb-10 min-h-[48px] leading-relaxed">For complex needs: we source the talent and manage everything end-to-end.</p>
            <ul className="space-y-5 mb-12 flex-1">
              <li className="flex items-start gap-4"><Check size={24} className="text-[#1dbf73] shrink-0" /><span className="text-[#404145] font-semibold text-[16px]">Expert project manager</span></li>
              <li className="flex items-start gap-4"><Check size={24} className="text-[#1dbf73] shrink-0" /><span className="text-[#404145] font-semibold text-[16px]">Premium talent sourcing</span></li>
              <li className="flex items-start gap-4"><Check size={24} className="text-[#1dbf73] shrink-0" /><span className="text-[#404145] font-semibold text-[16px]">Custom team building</span></li>
              <li className="flex items-start gap-4"><Check size={24} className="text-[#1dbf73] shrink-0" /><span className="text-[#404145] font-semibold text-[16px]">End-to-end execution</span></li>
            </ul>
            <button className="w-full bg-[#222325] hover:bg-[#404145] text-white font-bold py-4 rounded-lg transition-colors text-[16px]">
              Book a free consultation
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6: Video Walkthrough */}
      <section className="bg-[#fafafa] py-24 px-6 border-y border-[#e4e5e7]">
        <h2 className="text-[32px] md:text-[44px] font-bold text-[#404145] mb-16 text-center">How does it work?</h2>
        <div className="max-w-[900px] mx-auto bg-[#0a4a27] aspect-video rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer shadow-2xl">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
          <div className="text-center z-10">
             <h3 className="text-white text-[32px] md:text-[56px] font-bold mb-8 italic drop-shadow-lg">Got a project<br/>on your hands?</h3>
             <PlayCircle size={80} className="text-white mx-auto opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform drop-shadow-lg" />
          </div>
        </div>
      </section>

      {/* SECTION 7: PM Showcase */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto">
        <h2 className="text-[32px] md:text-[44px] font-bold text-[#404145] mb-16 text-center">Meet top freelance project managers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {managers.map((pm, idx) => (
            <div key={idx} className="border border-[#e4e5e7] rounded-xl p-8 bg-white hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-5 border-b border-[#e4e5e7] pb-6 mb-6">
                <img src={pm.img} alt={pm.name} className="w-20 h-20 rounded-full border-2 border-gray-100" />
                <div className="pt-1">
                  <h3 className="font-bold text-[20px] text-[#404145] mb-1 flex items-center gap-2">
                    {pm.name} 
                    <span className="text-[#1dbf73] text-[11px] font-black uppercase bg-[#1dbf73]/10 px-2 py-0.5 rounded tracking-wider">Pro</span>
                  </h3>
                  <p className="text-[#62646a] text-[15px] mb-2">{pm.role}</p>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-[#ffb33e] text-[#ffb33e]" />
                    <span className="font-bold text-[#404145] text-[15px]">{pm.rating}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 mb-8 text-[15px] text-[#404145]">
                <div className="flex items-center gap-3"><MapPin size={18} className="text-[#62646a]" /> {pm.from}</div>
                <div className="flex items-center gap-3 font-bold"><span className="text-[#62646a] font-normal">Rate:</span> {pm.rate} / hr</div>
              </div>
              <button className="w-full border border-[#404145] text-[#404145] font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors text-[16px]">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: Testimonial & Form */}
      <section className="bg-[#fff6ef] py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Testimonial */}
          <div className="text-center mb-32 max-w-[900px] mx-auto">
            <h2 className="text-[18px] font-bold text-[#404145] uppercase tracking-widest mb-10 opacity-60">Client success stories</h2>
            <div className="bg-white rounded-[2rem] p-12 md:p-20 shadow-xl relative">
              <div className="absolute top-0 left-12 -translate-y-1/2 bg-[#ffb33e] text-white p-4 rounded-full shadow-lg">
                <Star size={32} className="fill-white" />
              </div>
              <p className="text-[22px] md:text-[32px] text-[#404145] leading-[1.4] font-serif italic mb-12">
                "We managed to complete our entire rebrand in record time. The project manager took care of everything from hiring the designers to setting the deadlines. It was seamless."
              </p>
              <div className="flex items-center justify-center gap-5">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Karen" alt="Karen" className="w-16 h-16 rounded-full border-2 border-[#ffb33e] shadow-sm" />
                <div className="text-left">
                  <h4 className="font-bold text-[#404145] text-[18px]">Karen White</h4>
                  <p className="text-[#62646a] text-[15px]">Marketing Director, TechFlow</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="max-w-[650px] mx-auto bg-white rounded-[2rem] p-12 shadow-2xl border border-[#e4e5e7]">
            <h2 className="text-[36px] font-bold text-[#404145] mb-3 text-center">Ready to team up with a pro?</h2>
            <p className="text-[#62646a] text-[18px] text-center mb-12">Book a free consultation</p>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[15px] font-bold text-[#404145] mb-2">First name *</label>
                  <input type="text" className="w-full border border-[#e4e5e7] rounded-lg p-3.5 focus:outline-none focus:border-[#404145] transition-colors" />
                </div>
                <div>
                  <label className="block text-[15px] font-bold text-[#404145] mb-2">Last name *</label>
                  <input type="text" className="w-full border border-[#e4e5e7] rounded-lg p-3.5 focus:outline-none focus:border-[#404145] transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[15px] font-bold text-[#404145] mb-2">Work email *</label>
                  <input type="email" className="w-full border border-[#e4e5e7] rounded-lg p-3.5 focus:outline-none focus:border-[#404145] transition-colors" />
                </div>
                <div>
                  <label className="block text-[15px] font-bold text-[#404145] mb-2">Phone number</label>
                  <input type="tel" className="w-full border border-[#e4e5e7] rounded-lg p-3.5 focus:outline-none focus:border-[#404145] transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-[15px] font-bold text-[#404145] mb-2">Company name *</label>
                <input type="text" className="w-full border border-[#e4e5e7] rounded-lg p-3.5 focus:outline-none focus:border-[#404145] transition-colors" />
              </div>
              <div>
                <label className="block text-[15px] font-bold text-[#404145] mb-2">Tell us about your needs *</label>
                <textarea rows={4} className="w-full border border-[#e4e5e7] rounded-lg p-3.5 focus:outline-none focus:border-[#404145] transition-colors" placeholder="What kind of project are you looking to run?"></textarea>
              </div>
              
              <button type="button" className="w-full bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold py-4 rounded-lg transition-colors text-[18px] mt-6 shadow-md">
                Submit request
              </button>
              <p className="text-[13px] text-[#b5b6ba] text-center mt-6">
                By submitting this form, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQs */}
      <section className="py-24 px-6 max-w-[900px] mx-auto w-full">
        <h2 className="text-[36px] font-bold text-[#404145] mb-12">FAQs</h2>
        <div className="border-t border-[#e4e5e7]">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-[#e4e5e7]">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-8 flex items-center justify-between text-left focus:outline-none group"
              >
                <span className="font-bold text-[20px] text-[#404145] pr-8 group-hover:text-[#1dbf73] transition-colors">{faq.q}</span>
                <span className="text-[#62646a] shrink-0">
                  {openFaq === idx ? <Minus size={28} /> : <Plus size={28} />}
                </span>
              </button>
              {openFaq === idx && (
                <div className="pb-8 text-[18px] text-[#62646a] leading-relaxed pr-12">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Find freelance talent */}
      <section className="bg-white py-16 px-6 border-t border-[#e4e5e7]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[20px] font-bold text-[#404145] mb-6">Find freelance talent — your way</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-[#e4e5e7] rounded-lg p-6 flex flex-col shadow-sm">
              <div className="w-10 h-10 mb-4 bg-white flex items-center justify-center rounded border border-gray-200">
                <Settings size={20} className="text-[#62646a]" />
              </div>
              <h3 className="text-[18px] font-bold text-[#404145] mb-2">Post a project brief</h3>
              <p className="text-[15px] text-[#62646a] mb-8 leading-relaxed flex-1">
                Generate a brief with AI to receive a curated shortlist of freelancer offers.
              </p>
              <div className="flex justify-end">
                <button className="border border-[#404145] text-[#404145] font-bold text-[15px] px-6 py-2 rounded hover:bg-gray-50 transition-colors">
                  Post a brief
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#e4e5e7] rounded-lg p-6 flex flex-col shadow-sm">
              <div className="w-10 h-10 mb-4 bg-white flex items-center justify-center rounded border border-gray-200">
                <User size={20} className="text-[#62646a]" />
              </div>
              <h3 className="text-[18px] font-bold text-[#404145] mb-2">Let us find your freelancer</h3>
              <p className="text-[15px] text-[#62646a] mb-8 leading-relaxed flex-1">
                Save the endless search — we'll source, interview, and vet freelancers for you.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#62646a] text-[14px]">Only ₹19,975</span>
                <button className="border border-[#404145] text-[#404145] font-bold text-[15px] px-6 py-2 rounded hover:bg-gray-50 transition-colors">
                  Get started
                </button>
              </div>
            </div>

            
            <div className="bg-white border border-[#e4e5e7] rounded-lg p-6 flex flex-col shadow-sm">
              <div className="w-10 h-10 mb-4 bg-white flex items-center justify-center rounded border border-gray-200">
                <Shield size={20} className="text-[#62646a]" />
              </div>
              <h3 className="text-[18px] font-bold text-[#404145] mb-2">Get a team built for you</h3>
              <p className="text-[15px] text-[#62646a] mb-8 leading-relaxed flex-1">
                Big project? No problem. We'll build a freelance team and fully execute your project.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#62646a] text-[14px]">Custom pricing</span>
                <button className="border border-[#404145] text-[#404145] font-bold text-[15px] px-6 py-2 rounded hover:bg-gray-50 transition-colors">
                  Book free consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
