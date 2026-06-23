import { Play } from 'lucide-react';

export default function HelpVideoCard() {
  return (
    <div className="sticky top-6 w-full max-w-[300px]">
      <div className="relative rounded bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-100 p-6 pt-8 mt-4">
        
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#e4f7fc] shadow-sm">
          <svg className="h-4 w-4 text-[#1dbf73]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
        </div>

        <h3 className="mb-4 text-[15px] font-bold text-[#404145]">Set your packages</h3>
        
        
        <div className="relative mb-5 aspect-[16/9] w-full cursor-pointer overflow-hidden rounded bg-gray-200 group">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80" 
            alt="Video thumbnail" 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <Play className="h-5 w-5 ml-1 text-gray-900" fill="currentColor" />
            </div>
          </div>
        </div>

        <ul className="space-y-3 text-[13px] leading-snug text-[#62646a]">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#62646a]"></span>
            <span>Set the prices for your 3 packages</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#62646a]"></span>
            <span>Select the elements you want to include in each offer</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#62646a]"></span>
            <span>Add Extras to increase your order value</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
