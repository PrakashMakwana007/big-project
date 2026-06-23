import React from 'react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Footer from '../../components/dashboard/Footer';
import HeroLevelOverview from '../../components/level/HeroLevelOverview';
import BenefitsGrid from '../../components/level/BenefitsGrid';
import TipsSection from '../../components/level/TipsSection';
import FAQAccordion from '../../components/level/FAQAccordion';

export default function LevelOverview() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardNavbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <HeroLevelOverview />

          <section className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">What you get as a freelancer</h2>
              <button className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700">Compare benefits</button>
            </div>
            <BenefitsGrid />
          </section>

          <section className="mt-8">
            <TipsSection />
          </section>

          <section className="mt-8">
            <FAQAccordion />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
