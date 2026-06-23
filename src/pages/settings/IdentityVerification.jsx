import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, ShieldAlert, ShieldX, FileText } from 'lucide-react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Footer from '../../components/dashboard/Footer';

export default function IdentityVerification() {
  
  const [verificationState, setVerificationState] = useState('verified');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link to="/settings" className="inline-flex items-center text-[15px] font-semibold text-green-500 hover:text-green-600 transition-colors">
            <ChevronLeft size={16} className="mr-1" /> Back to Account Settings
          </Link>
          
          
          <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
            {['verified', 'pending', 'rejected', 'not_verified'].map(s => (
              <button 
                key={s}
                onClick={() => setVerificationState(s)}
                className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded ${verificationState === s ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">Identity Verification</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          
          
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 flex flex-col items-center justify-center min-h-[450px] text-center">
              
              {verificationState === 'verified' && (
                <>
                  <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 border-4 border-green-100">
                    <ShieldCheck size={48} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Your identity has been verified</h2>
                  <p className="text-[16px] text-gray-600 mb-8 max-w-md leading-relaxed">
                    Thank you for completing the verification process. This badge gives buyers peace of mind and builds trust in your services.
                  </p>
                  <Link to="/seller/dashboard" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-[15px]">
                    Go To Dashboard
                  </Link>
                </>
              )}

              {verificationState === 'pending' && (
                <>
                  <div className="w-24 h-24 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mb-6 border-4 border-yellow-100">
                    <ShieldAlert size={48} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Verification is pending</h2>
                  <p className="text-[16px] text-gray-600 mb-8 max-w-md leading-relaxed">
                    We are currently reviewing your documents. This process usually takes up to 48 hours. We'll email you once it's complete.
                  </p>
                  <button disabled className="bg-gray-200 text-gray-400 font-semibold py-3 px-8 rounded-lg text-[15px] cursor-not-allowed">
                    Review in Progress...
                  </button>
                </>
              )}

              {verificationState === 'rejected' && (
                <>
                  <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 border-4 border-red-100">
                    <ShieldX size={48} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Verification failed</h2>
                  <p className="text-[16px] text-gray-600 mb-8 max-w-md leading-relaxed">
                    We couldn't verify your identity with the provided documents. Please ensure the image is clear, in focus, and all details are legible.
                  </p>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-[15px]">
                    Try Again
                  </button>
                </>
              )}

              {verificationState === 'not_verified' && (
                <>
                  <div className="w-24 h-24 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-6 border-4 border-gray-100">
                    <FileText size={48} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Please verify your identity</h2>
                  <p className="text-[16px] text-gray-600 mb-8 max-w-md leading-relaxed">
                    To keep our community safe, we need to verify your identity. You'll need a government-issued ID and a smartphone.
                  </p>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-[15px]">
                    Verify ID Now
                  </button>
                </>
              )}

            </div>
          </div>

          
          <div className="w-full lg:w-[320px]">
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-[17px] font-bold text-gray-900 mb-4">Why is verification important?</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                  <p className="text-[14px] text-gray-600 leading-relaxed">Builds trust with buyers, increasing your chances of getting hired.</p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                  <p className="text-[14px] text-gray-600 leading-relaxed">Helps us keep the marketplace safe from fraud and bad actors.</p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                  <p className="text-[14px] text-gray-600 leading-relaxed">Allows you to withdraw your earnings without restrictions.</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your privacy is our priority. We use advanced encryption to protect your data. We never share your ID with buyers.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
