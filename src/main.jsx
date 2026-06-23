import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import SellerDashboard from './pages/seller/SellerDashboard.jsx'
import OrdersPage from './pages/seller/OrdersPage.jsx'
import BuyerOrdersPage from './pages/buyer/BuyerOrdersPage.jsx'
import BuyerDashboard from './pages/buyer/BuyerDashboard.jsx'
import CategoryListingPage from './pages/buyer/CategoryListingPage.jsx'
import GigDetailsPage from './pages/buyer/GigDetailsPage.jsx'
import BuyerBriefsPage from './pages/buyer/BuyerBriefsPage.jsx'
import BuyerProfilePage from './pages/buyer/BuyerProfilePage.jsx'
import ManagedProjectsPage from './pages/buyer/ManagedProjectsPage.jsx'
import BuyerListsPage from './pages/buyer/BuyerListsPage.jsx'
import BuyerListDetailsPage from './pages/buyer/BuyerListDetailsPage.jsx'
import SupportPage from './pages/buyer/SupportPage.jsx'
import HelpPage from './pages/buyer/HelpPage.jsx'
import MyGigsPage from './pages/seller/MyGigsPage.jsx'
import MyProfile from './pages/seller/MyProfile.jsx'
import EarningsPage from './pages/seller/EarningsPage.jsx'
import LevelOverview from './pages/seller/LevelOverview.jsx'
import Referrals from './pages/seller/Referrals.jsx'
import MyContacts from './pages/seller/MyContacts.jsx'
import CreateGig from './pages/seller/CreateGig.jsx'
import { Suspense, lazy } from 'react'
const KickstartProgram = lazy(() => import('./pages/seller/KickstartProgram.tsx'))
const AnalyticsOverview = lazy(() => import('./pages/seller/AnalyticsOverview.tsx'))
const AnalyticsRepeatBusiness = lazy(() => import('./pages/seller/AnalyticsRepeatBusiness.jsx'))

const AccountSettingsHome = lazy(() => import('./pages/settings/AccountSettingsHome.jsx'))
const PersonalInfo = lazy(() => import('./pages/settings/PersonalInfo.jsx'))
const AccountSecurity = lazy(() => import('./pages/settings/AccountSecurity.jsx'))
const Notifications = lazy(() => import('./pages/settings/Notifications.jsx'))
const IdentityVerification = lazy(() => import('./pages/settings/IdentityVerification.jsx'))
const BillingPayments = lazy(() => import('./pages/seller/BillingPayments.jsx'))

const queryClient = new QueryClient()


window.addEventListener('error', (ev) => {
  try {
    const el = document.getElementById('root')
    if (el) el.innerHTML = `<pre style="white-space:pre-wrap;color:#c53030;background:#fff8f8;padding:16px;border-radius:6px">${String(ev.error || ev.message)}</pre>`
  } catch (e) {
    
  }
})


window.addEventListener('unhandledrejection', (ev) => {
  try {
    const el = document.getElementById('root')
    const msg = ev.reason instanceof Error ? ev.reason.stack || ev.reason.message : String(ev.reason)
    if (el) el.innerHTML = `<pre style="white-space:pre-wrap;color:#c53030;background:#fff8f8;padding:16px;border-radius:6px">${msg}</pre>`
  } catch (e) {}
})

try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/orders" element={<BuyerOrdersPage />} />
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          <Route path="/buyer/briefs" element={<BuyerBriefsPage />} />
          <Route path="/buyer/profile" element={<BuyerProfilePage />} />
          <Route path="/buyer/managed-projects" element={<ManagedProjectsPage />} />
          <Route path="/buyer/lists" element={<BuyerListsPage />} />
          <Route path="/buyer/lists/:listId" element={<BuyerListDetailsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/support/help-center" element={<HelpPage activeTab="help-center" />} />
          <Route path="/support/trust-safety" element={<HelpPage activeTab="trust-safety" />} />
          <Route path="/support/customer-support" element={<HelpPage activeTab="customer-support" />} />
          <Route path="/support/tickets" element={<HelpPage activeTab="tickets" />} />
          <Route path="/support/payments" element={<HelpPage activeTab="payments" />} />
          <Route path="/categories/:categoryId" element={<CategoryListingPage />} />
          <Route path="/categories/:categoryId/:subcategoryId" element={<CategoryListingPage />} />
          <Route path="/gig/:gigId" element={<GigDetailsPage />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/orders" element={<OrdersPage />} />
          <Route path="/seller/gigs" element={<MyGigsPage />} />
          <Route path="/seller/gigs/create" element={<CreateGig />} />
          <Route path="/seller/gigs/create/pricing" element={<CreateGig />} />
          <Route path="/seller/gigs/create/description-faq" element={<CreateGig />} />
          <Route path="/seller/gigs/create/requirements" element={<CreateGig />} />
          <Route path="/seller/gigs/create/gallery" element={<CreateGig />} />
          <Route path="/seller/gigs/create/publish" element={<CreateGig />} />
          <Route path="/seller/profile" element={<MyProfile />} />
          <Route path="/seller/earnings" element={<EarningsPage />} />
          <Route path="/seller/level-overview" element={<LevelOverview />} />
          <Route path="/seller/referrals" element={<Referrals />} />
          <Route path="/seller/contacts" element={<MyContacts />} />
          <Route
            path="/seller/analytics/overview"
            element={
              <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
                <AnalyticsOverview />
              </Suspense>
            }
          />
          <Route
            path="/seller/analytics/repeat-business"
            element={
              <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
                <AnalyticsRepeatBusiness />
              </Suspense>
            }
          />
          <Route
            path="/seller/program"
            element={
              <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
                <KickstartProgram />
              </Suspense>
            }
          />
          <Route path="/settings" element={<Suspense fallback={<div className="p-8 text-center">Loading…</div>}><AccountSettingsHome /></Suspense>} />
          <Route path="/settings/personal-info" element={<Suspense fallback={<div className="p-8 text-center">Loading…</div>}><PersonalInfo /></Suspense>} />
          <Route path="/settings/security" element={<Suspense fallback={<div className="p-8 text-center">Loading…</div>}><AccountSecurity /></Suspense>} />
          <Route path="/settings/notifications" element={<Suspense fallback={<div className="p-8 text-center">Loading…</div>}><Notifications /></Suspense>} />
          <Route path="/settings/verification" element={<Suspense fallback={<div className="p-8 text-center">Loading…</div>}><IdentityVerification /></Suspense>} />
          <Route path="/seller/billing" element={<Suspense fallback={<div className="p-8 text-center">Loading…</div>}><BillingPayments /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
  )
} catch (err) {
  try {
    const el = document.getElementById('root')
    if (el) el.innerHTML = `<pre style="white-space:pre-wrap;color:#c53030;background:#fff8f8;padding:16px;border-radius:6px">${String(err && (err.stack || err.message) || err)}</pre>`
  } catch (e) {}
  throw err
}
