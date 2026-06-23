import React, { useState } from 'react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Footer from '../../components/dashboard/Footer';
import AlertBanner from '../../components/referrals/AlertBanner';
import StatCard from '../../components/referrals/StatCard';
import ReferralProgramCard from '../../components/referrals/ReferralProgramCard';
import TabsComponent from '../../components/referrals/TabsComponent';
import EmptyState from '../../components/referrals/EmptyState';
import { motion } from 'framer-motion';
import { GitFork, ShoppingCart, CircleCheck, WalletCards, UsersRound, BadgeDollarSign, BriefcaseBusiness } from 'lucide-react';

export default function Referrals() {
  const [activeTab, setActiveTab] = useState('given');

  const givenStats = [
    { label: 'Total referrals given', value: '0', icon: GitFork },
    { label: 'Orders created', value: '0', icon: ShoppingCart },
    { label: 'Orders completed', value: '0', icon: CircleCheck },
    { label: 'Credits received', value: '$0', icon: WalletCards },
  ];

  const receivedStats = [
    { label: 'Freelancers who referred me', value: '0', icon: UsersRound },
    { label: 'Total referrals received', value: '0', icon: BadgeDollarSign },
    { label: 'Orders I’ve completed', value: '0', icon: BriefcaseBusiness },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f8] text-[#404145]">
      <DashboardNavbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Referrals</h1>
            <p className="text-sm text-gray-600">Track your referral activity, related orders, and earned benefits.</p>
          </div>

          <div className="mt-5">
            <AlertBanner />
          </div>

          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Referrals I&apos;ve given</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {givenStats.map((stat) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} />
              ))}
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Referrals I&apos;ve received</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {receivedStats.map((stat) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} />
              ))}
            </div>
          </section>

          <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ReferralProgramCard />

            <div className="rounded-[14px] border border-[#e4e5e7] bg-[#eef4ff] p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Meet the freelancer referral program</h3>

              <ol className="mt-5 space-y-5">
                {[
                  ['1', 'Refer a freelancer', 'Share your referral link and invite a freelancer to join.'],
                  ['2', 'Track referral activity', 'Monitor whether your referrals create and complete orders.'],
                  ['3', 'Enjoy the benefits', 'Earn credits and rewards once the program requirements are met.'],
                ].map(([num, title, desc]) => (
                  <li key={num} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#1dbf73] shadow-sm ring-1 ring-[#d6e0ff]">
                      {num}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{title}</div>
                      <div className="mt-1 text-sm leading-6 text-gray-600">{desc}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <a href="#" className="mt-6 inline-flex items-center text-sm font-semibold text-[#1dbf73] hover:underline">
                Learn more about the program
              </a>
            </div>
          </section>

          <section className="mt-8 rounded-[14px] border border-[#e4e5e7] bg-white shadow-sm">
            <div className="border-b border-[#e4e5e7] px-6 pt-5">
              <h2 className="text-lg font-semibold text-gray-900">Referral history</h2>
              <div className="mt-4">
                <TabsComponent activeTab={activeTab} onChange={setActiveTab} />
              </div>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="px-6 py-10"
            >
              <EmptyState activeTab={activeTab} />
            </motion.div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
