import React, { FC, useState } from 'react'
import { motion } from 'framer-motion'
import Footer from '../../components/dashboard/Footer'
import DashboardNavbar from '../../components/dashboard/DashboardNavbar'

const PlaceholderImage: FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-gray-100/60 flex items-center justify-center ${className}`}>
    <svg width="120" height="80" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" rx="2" fill="#E5E7EB" />
      <path d="M9 6l4 2-4 2V6z" fill="#9CA3AF" />
    </svg>
  </div>
)

const BenefitCard: FC<{ title: string; desc: string; icon?: React.ReactNode }> = ({ title, desc, icon }) => (
  <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className="flex items-start gap-4">
      <div className="h-12 w-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">{icon || '✓'}</div>
      <div>
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        <p className="mt-2 text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  </div>
)

const AccordionItem: FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-lg border border-gray-100 bg-white">
      <button className="w-full px-4 py-3 text-left" onClick={() => setOpen((s) => !s)}>
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">{q}</span>
          <span className="text-gray-500">{open ? '−' : '+'}</span>
        </div>
      </button>
      <motion.div initial={{ height: 0, opacity: 0 }} animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }} className="px-4">
        <div className="py-3 text-sm text-gray-600">{a}</div>
      </motion.div>
    </div>
  )
}

const KickstartProgram: FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardNavbar />

      <main className="flex-1">
        
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 to-green-600 px-6 py-20 text-white">
          <div className="mx-auto max-w-7xl grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold leading-tight">Grow faster with Nexlance Kickstart</h1>
              <p className="mt-4 max-w-xl text-lg">Access tools, feedback and premium insights to accelerate your first orders and long-term traction on Nexlance.</p>
              <div className="mt-6 flex items-center gap-3">
                <button className="rounded-md bg-white/90 px-5 py-3 text-sm font-semibold text-emerald-700">Join Program</button>
                <button className="rounded-md border border-white/30 px-4 py-3 text-sm text-white/90">Learn more</button>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="w-full max-w-md rounded-xl overflow-hidden shadow-lg bg-black/40">
                <div className="relative">
                  <PlaceholderImage className="h-56 w-full" />
                  <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-emerald-700">
                    ▶
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-gray-900">Program benefits</h2>
          <p className="mt-2 text-sm text-gray-600">Designed to give sellers a fast path to visibility and sales.</p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <BenefitCard title="Faster Growth" desc="Priority exposure to buyers and onboarding guidance." />
            <BenefitCard title="Better Visibility" desc="Featured placements and marketing boosts." />
            <BenefitCard title="AI Recommendations" desc="AI suggestions to improve your gig, title and tags." />
            <BenefitCard title="Marketplace Insights" desc="Actionable analytics to find the right niche." />
          </div>
        </section>

        
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Onboard in a breeze</h3>
              <p className="mt-4 text-gray-600">Join live onboarding sessions and step-by-step guidance tailored to sellers new to the platform.</p>
            </div>
            <div className="flex items-center justify-center">
              <PlaceholderImage className="h-56 w-full rounded-lg" />
            </div>
          </div>
        </section>

        
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
                <div className="inline-block rounded-full bg-pink-50 px-3 py-1 text-sm font-semibold text-pink-700">Kickstart</div>
                <h4 className="mt-4 text-xl font-semibold text-gray-900">Optimize your Gig title</h4>
                <p className="mt-2 text-gray-600">Your title is clear, but it could be more impactful. Consider action words and benefits to grab attention.</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Get advice from AI</h4>
              <p className="mt-3 text-gray-600">AI-powered insights suggest improvements to your gig and provide recommendations to boost buyer conversions.</p>
            </div>
          </div>
        </section>

        
        <section className="mx-auto mt-8 w-full bg-emerald-50 px-6 py-12">
          <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Ready to get ahead?</h3>
              <p className="mt-2 text-sm text-gray-700">Access exclusive tools designed to help new sellers get their first order faster.</p>
            </div>
            <div>
              <button className="rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white">Join now</button>
            </div>
          </div>
        </section>

        
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <PlaceholderImage className="h-56 w-full rounded-lg" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900">Master your market</h4>
              <p className="mt-3 text-gray-600">Gain advanced insights from analytics so you can position yourself and your gigs for success.</p>
              <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-600">
                <li>Buyer demand signals</li>
                <li>Top keywords to target</li>
                <li>Pricing benchmarks</li>
              </ul>
            </div>
          </div>
        </section>

        
        <section className="bg-emerald-900/95 px-6 py-20 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Ready to kickstart your Nexlance career?</h2>
            <p className="mt-4 text-lg">Enjoy premium onboarding, AI guidance and analytics for a monthly fee.</p>
            <div className="mt-6">
              <button className="rounded-md bg-white/90 px-6 py-3 text-sm font-semibold text-emerald-700">Join now</button>
            </div>
          </div>
        </section>

        
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h3 className="text-2xl font-semibold text-gray-900">FAQs</h3>
          <div className="mt-6 space-y-3">
            <AccordionItem q="What is the Program?" a="A focused program to accelerate new sellers with onboarding, visibility and tools." />
            <AccordionItem q="How does it work?" a="Join, attend onboarding, apply recommendations and receive program benefits." />
            <AccordionItem q="Is it free?" a="No — it is a premium program with a monthly fee; pricing is shown during signup." />
            <AccordionItem q="Can I leave anytime?" a="Yes — cancel anytime from your account settings." />
            <AccordionItem q="How do benefits help me?" a="Benefits increase visibility, improve conversion and provide actionable insights." />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default KickstartProgram
