import { useState } from 'react';

export default function CTASection({ handleProtectedAction }) {
  const [text, setText] = useState('');

  function handleGenerateBrief() {
    
    
    handleProtectedAction(() => {
      console.log('Navigate to /create-project');
      
    });
  }

  return (
    <section className="py-20 bg-[#22c55e]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-3">Tell us what you need</h2>
        <p className="text-white/80 text-base mb-8">
          Describe your project and let expert freelancers submit proposals
        </p>
        <div className="bg-white rounded-2xl p-6 shadow-2xl text-left">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Describe your project
          </label>
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe your project, required skills, timeline, and budget..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none resize-none focus:border-[#22c55e] transition"
            style={{ boxShadow: 'none' }}
          />
          <button
            type="button"
            onClick={handleGenerateBrief}
            className="mt-4 w-full bg-[#22c55e] text-white py-3 rounded-xl font-bold text-base hover:bg-[#16a34a] transition-colors"
          >
            Generate Brief →
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            ✓ Free to post &nbsp;•&nbsp; ✓ Quick responses &nbsp;•&nbsp; ✓ Secure payments
          </p>
        </div>
      </div>
    </section>
  );
}
