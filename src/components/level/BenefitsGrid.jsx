import React from 'react';
import BenefitCard from './BenefitCard';
import {
  Flag,
  Layers3,
  PlaySquare,
  BriefcaseBusiness,
  BadgeCheck,
  MessagesSquare,
  Rocket,
  Repeat,
  Megaphone,
  CalendarClock,
  Users,
  Banknote,
  TimerReset,
  Headphones,
  CircleDollarSign,
} from 'lucide-react';

const BENEFITS = [
  { title: 'Milestones', desc: 'Set predefined order goals, each with its own deadline, delivery, and payment.', badge: 'LEVEL 1', icon: Flag },
  { title: 'Active Gigs', desc: 'Offer 4 Gigs on the marketplace to keep your profile active and visible.', badge: 'LEVEL 1', icon: Layers3 },
  { title: 'Intro video', desc: 'Introduce yourself and let buyers know why they should work with you.', badge: 'LEVEL 1', icon: PlaySquare },
  { title: 'Portfolio', desc: 'Earn trust by showcasing your skills and past projects.', badge: 'LEVEL 2', icon: BriefcaseBusiness },
  { title: 'Get more as a Vetted Pro', desc: 'Access all level benefits, appear in an exclusive catalog, and get a Vetted Pro badge.', badge: 'VETTED PRO', icon: BadgeCheck, featured: true, actionLabel: 'Check application status' },
  { title: 'Personal Assistant', desc: 'Be available around the clock with a tool to help manage chats, scheduling, and more.', badge: 'LEVEL 1', icon: MessagesSquare },
  { title: 'Join Seller Plus Standard', desc: 'Jumpstart your growth with exclusive tools and insights.', badge: 'LEVEL 1', icon: Rocket },
  { title: 'Subscriptions', desc: 'Generate steady work and reliable income with recurring orders.', badge: 'LEVEL 1', icon: Repeat },
  { title: 'Nexlance Ads', desc: 'Increase your visibility and gain more orders.', badge: 'LEVEL 1', icon: Megaphone },
  { title: 'Join Seller Plus Premium', desc: 'Optimize your performance with this paid program.', badge: 'LEVEL 2', icon: CircleDollarSign },
  { title: 'Consultations', desc: 'Help buyers reach their goals with paid video call consultations.', badge: 'LEVEL 2', icon: CalendarClock },
  { title: 'Top clients', desc: 'Build credibility by featuring past clients and brands you’ve worked with.', badge: 'LEVEL 2', icon: Users },
  { title: 'Early payout', desc: 'Access funds sooner and improve your cash flow.', badge: 'LEVEL 2', icon: Banknote },
  { title: 'Faster payments', desc: 'Get paid with quicker withdrawal options.', badge: 'LEVEL 2', icon: TimerReset },
  { title: 'Priority support', desc: 'Get faster help when you need assistance.', badge: 'LEVEL 2', icon: Headphones },
];

export default function BenefitsGrid() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {BENEFITS.map((b) => (
        <BenefitCard key={b.title} title={b.title} desc={b.desc} badge={b.badge} icon={b.icon} featured={b.featured} actionLabel={b.actionLabel} />
      ))}
    </div>
  );
}
