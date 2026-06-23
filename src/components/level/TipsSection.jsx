import React from 'react';
import ArticleCard from './ArticleCard';

const ARTICLES = [
  { title: 'Grab more attention with your Gig', category: 'Gigs', subtitle: 'Tips to make your gig stand out' },
  { title: 'First things first', category: 'Getting started', subtitle: 'How to set up your profile' },
  { title: 'Get to know the level system', category: 'Levels', subtitle: 'Understand how levels work' },
  { title: 'The success score explained', category: 'Metrics', subtitle: 'What affects your success score' },
];

export default function TipsSection() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Tips for success</h2>
        <div className="text-sm text-gray-500">Grow your freelancing business with tips from experts and successful sellers.</div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ARTICLES.map((a) => (
          <ArticleCard key={a.title} title={a.title} category={a.category} subtitle={a.subtitle} />
        ))}
      </div>
    </div>
  );
}
