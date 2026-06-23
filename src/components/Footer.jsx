import { useState, useEffect } from 'react';
import { getCategories } from '../services/gigMetadataService';

const FOOTER_LINKS = {
  "For Clients": ["Post a Job", "Browse Talent", "How It Works", "Success Stories", "Enterprise", "Pricing"],
  "For Freelancers": ["Start Selling", "Learn & Grow", "Success Stories", "Community", "Mobile App"],
  Business: ["About Us", "Careers", "Press", "Blog", "Contact"],
  Company: ["Terms of Service", "Privacy Policy", "Cookies", "Accessibility", "Security"],
};

const TRUST_LOGOS = ["Google", "Microsoft", "Amazon", "Apple"];

export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-400">
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {categories.length > 0 && (
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Categories</h4>
              <ul className="flex flex-col gap-2">
                {categories.slice(0, 5).map((cat) => (
                  <li key={cat._id}>
                    <a href="#" className="text-sm transition-all duration-200 hover:text-[#22c55e] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">{cat.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{heading}</h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                      <a href="#" className="text-sm transition-all duration-200 hover:text-[#22c55e] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
              <a href="/" className="text-xl font-bold text-white">
                Nexlance<span className="text-[#22c55e]">.</span>
            </a>
              <p className="text-xs text-gray-500 mt-1">© 2025 Nexlance. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Trusted by businesses worldwide:</span>
            {TRUST_LOGOS.map((logo) => (
              <span key={logo} className="text-gray-300 font-semibold">{logo}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
