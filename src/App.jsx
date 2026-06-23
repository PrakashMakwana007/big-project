import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoriesMenu from './components/CategoriesMenu';
import TrendingServices from './components/TrendingServices';
import CategoriesGrid from './components/CategoriesGrid';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import PopularCategories from './components/PopularCategories';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export default function App() {
  const navigate = useNavigate();
  
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [pendingAction, setPendingAction] = useState(null);
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || null;
  });

  
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('userRole', userRole || '');
  }, [isLoggedIn, userRole]);

  
  function handleProtectedAction(action) {
    if (!isLoggedIn) {
      
      setPendingAction(() => action);
      
      setAuthMode('login');
      setIsAuthOpen(true);
    } else {
      
      action();
    }
  }

  function openModal(mode) {
    setAuthMode(mode);
    setIsAuthOpen(true);
  }

  function closeModal() {
    setIsAuthOpen(false);
    setPendingAction(null);
  }

  
  function handleLoginSuccess(role = 'seller') {
    setIsLoggedIn(true);
    setUserRole(role);
    setIsAuthOpen(false);

    
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    } else {
      
      setTimeout(() => {
        if (role === 'buyer') {
          navigate('/buyer/dashboard');
        } else {
          navigate('/seller/dashboard');
        }
      }, 0);
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUserRole(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar
        openModal={openModal}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onLogout={handleLogout}
        handleProtectedAction={handleProtectedAction}
      />
      <HeroSection handleProtectedAction={handleProtectedAction} />
      <CategoriesMenu handleProtectedAction={handleProtectedAction} />
      <TrendingServices />
      <CategoriesGrid />
      <HowItWorks />
      <Testimonials />
      <PopularCategories handleProtectedAction={handleProtectedAction} />
      <CTASection handleProtectedAction={handleProtectedAction} />
      <Footer />
      <AuthModal
        isOpen={isAuthOpen}
        mode={authMode}
        onClose={closeModal}
        onModeChange={setAuthMode}
        onLoginSuccess={handleLoginSuccess}
        pendingAction={pendingAction}
      />
    </div>
  );
}
