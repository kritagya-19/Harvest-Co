import { Leaf } from 'lucide-react';

interface FooterProps {
  onNavigateToCategory: (slug: string) => void;
}

export default function Footer({ onNavigateToCategory }: FooterProps) {
  return (
    <footer id="why-choose-and-footer" className="bg-[#FAF6F0] text-neutral-900 border-t border-neutral-200/50 pt-16 pb-8 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="md:col-span-5 lg:col-span-6">
            <div className="flex items-center gap-[1px] mb-2">
              <Leaf className="h-5 w-5 text-emerald-600 fill-emerald-600/20 rotate-[12deg]" />
              <Leaf className="h-4.5 w-4.5 text-emerald-700 fill-emerald-700/10 -rotate-[35deg] -ml-1" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 leading-none mb-4">
              Harvest & Co.
            </h3>
            <p className="font-sans text-sm text-neutral-600 leading-relaxed font-light max-w-md">
              A premium organic food brand dedicated to delivering the freshest, healthiest, and highest-quality fruits and natural products directly to consumers. We make healthy eating simple, convenient, and enjoyable.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="font-serif text-base font-bold text-neutral-950 mb-5 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Shop Fresh Fruits', slug: 'fruits' },
                { name: 'Premium Nuts', slug: 'nuts' },
                { name: 'Fresh Fruit Salads', slug: 'salads' },
                { name: '100% Natural Juices', slug: 'juices' },
              ].map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => item.slug ? onNavigateToCategory(item.slug) : document.getElementById('shop-categories')?.scrollIntoView({ behavior: 'smooth' })}
                    className="font-sans text-sm text-neutral-600 hover:text-[#D45B0C] hover:underline transition-colors font-normal cursor-pointer bg-transparent border-none p-0 text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support & Social */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="font-serif text-base font-bold text-neutral-950 mb-5 tracking-wide">
              Support & Social
            </h4>
            <ul className="space-y-3">
              {['Contact Us', 'FAQs', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-sm text-neutral-600 hover:text-[#D45B0C] hover:underline transition-colors font-normal">
                    {item}
                  </a>
                </li>
              ))}
              <li className="pt-2 flex items-center gap-4">
                <a href="#" className="text-xl hover:scale-110 transition-transform">📸</a>
                <a href="#" className="text-xl hover:scale-110 transition-transform">👥</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Center Row */}
        <div className="border-t border-neutral-200/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-neutral-500 font-normal">
            © {new Date().getFullYear()} Harvest & Co. All Rights Reserved.
          </p>
          
          {/* Payment badges */}
          <div className="flex items-center gap-2 select-none opacity-80">
            <div className="bg-[#1A1F71] text-white font-sans text-[10px] font-bold px-2.5 py-1.5 rounded-md flex items-center justify-center border border-neutral-300/40 shadow-2xs">
              <span className="italic tracking-widest text-[#F7B600]">VISA</span>
            </div>
            <div className="bg-white px-2.5 py-1.5 rounded-md flex items-center justify-center gap-0.5 border border-neutral-300/50 shadow-2xs">
              <div className="h-3 w-3 rounded-full bg-[#EB001B]" />
              <div className="h-3 w-3 rounded-full bg-[#F79E1B] -ml-1.5 opacity-90" />
            </div>
            <div className="bg-white border border-neutral-300/60 rounded-md px-2 py-1.5 flex items-center justify-center gap-0.5 shadow-2xs">
              <span className="font-sans text-[9px] font-bold italic tracking-tight text-[#097939]">U</span>
              <span className="font-sans text-[9px] font-bold italic tracking-tight text-[#0255A5]">P</span>
              <span className="font-sans text-[9px] font-bold italic tracking-tight text-[#EF7E22]">I</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
