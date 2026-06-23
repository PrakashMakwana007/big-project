import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ openModal, isLoggedIn, userRole, onLogout, handleProtectedAction }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleStartSelling() {
    if (!isLoggedIn) {
      openModal('register');
    } else {
      navigate(userRole === 'buyer' ? '/buyer/dashboard' : '/seller/dashboard');
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        
        <Link to="/" className="flex-shrink-0 text-2xl font-bold text-gray-900 tracking-tight transition-colors duration-200 hover:text-[#22c55e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">
          Nexlance<span className="text-[#22c55e]">.</span>
        </Link>

        
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="flex w-full border border-gray-300 rounded-full overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
            <input
              type="text"
              placeholder="Search for services..."
              className="flex-1 px-4 py-2 text-sm outline-none text-gray-700 bg-white"
            />
            <button className="bg-[#22c55e] text-white px-5 py-2 text-sm font-semibold transition-all duration-200 hover:bg-[#16a34a] hover:shadow-md hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">
              Search
            </button>
          </div>
        </div>

        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <a href="#" className="transition-colors duration-200 hover:text-[#22c55e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">Discover</a>
          <button type="button" onClick={handleStartSelling} className="transition-colors duration-200 hover:text-[#22c55e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">Start Selling</button>
          
          {isLoggedIn ? (
            <>
              <Link to={userRole === 'buyer' ? "/buyer/dashboard" : "/seller/dashboard"} className="transition-colors duration-200 hover:text-[#22c55e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">Dashboard</Link>
              <button
                type="button"
                onClick={onLogout}
                className="border border-[#22c55e] text-[#22c55e] px-4 py-1.5 rounded-full font-semibold transition-all duration-200 hover:border-red-500 hover:bg-red-50 hover:text-red-600 hover:shadow-sm hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => openModal('login')} className="transition-colors duration-200 hover:text-[#22c55e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">Sign In</button>
              <button
                type="button"
                onClick={() => openModal('register')}
                className="border border-[#22c55e] text-[#22c55e] px-4 py-1.5 rounded-full font-semibold transition-all duration-200 hover:bg-[#22c55e] hover:text-white hover:shadow-md hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        
        <button
          className="md:hidden text-gray-700 p-1 transition-all duration-200 hover:text-gray-900 hover:bg-gray-100 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
          <div className="flex border border-gray-300 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for services..."
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <button className="bg-[#22c55e] text-white px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-[#16a34a] hover:shadow-md hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">Search</button>
          </div>
          <a href="#" className="transition-colors duration-200 hover:text-[#22c55e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">Discover</a>
          <button type="button" onClick={handleStartSelling} className="text-left transition-colors duration-200 hover:text-[#22c55e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">Start Selling</button>
          
          {isLoggedIn ? (
            <>
              <Link to={userRole === 'buyer' ? "/buyer/dashboard" : "/seller/dashboard"} className="transition-colors duration-200 hover:text-[#22c55e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">Dashboard</Link>
              <button
                type="button"
                onClick={() => { onLogout(); setMenuOpen(false); }}
                className="bg-red-50 text-red-600 text-center px-4 py-2 rounded-full font-semibold transition-all duration-200 hover:bg-red-100 hover:shadow-sm hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => { openModal('login'); setMenuOpen(false); }} className="text-left transition-colors duration-200 hover:text-[#22c55e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">Sign In</button>
              <button type="button" onClick={() => { openModal('register'); setMenuOpen(false); }} className="bg-[#22c55e] text-white text-center px-4 py-2 rounded-full font-semibold transition-all duration-200 hover:bg-[#16a34a] hover:shadow-md hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">
                Get Started
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
