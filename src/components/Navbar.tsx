import { useState, useEffect } from 'react';
import { Leaf, Search, ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  totalCartQuantity: number;
  onCartOpen: () => void;
  onPromoOpen: () => void;
  onSearchOpen: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isCategoryPage?: boolean;
}

export default function Navbar({
  totalCartQuantity,
  onCartOpen,
  onPromoOpen,
  onSearchOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isCategoryPage = false
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Shop', href: '#shop-categories' },
    { name: 'Best Sellers', href: '#best-sellers-section' },
    { name: 'About Us', href: '#why-choose-and-footer' }
  ];

  // Dynamic Class Computations
  const isLightNavbar = isScrolled && isCategoryPage;

  const headerClass = isScrolled
    ? isCategoryPage
      ? "fixed top-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-neutral-200/60 shadow-sm transition-all duration-300"
      : "fixed top-0 left-0 right-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-white/[0.04] shadow-md transition-all duration-300"
    : "absolute top-0 left-0 right-0 z-40 bg-transparent border-b border-white/[0.04] transition-all duration-300";

  const logoTextClass = isLightNavbar
    ? "text-neutral-900 group-hover:text-[#D45B0C]"
    : "text-white group-hover:text-[#EDE0D4]";

  const ampersandClass = isLightNavbar
    ? "text-neutral-900"
    : "text-white";

  const navLinkClass = isLightNavbar
    ? "text-neutral-600 hover:text-neutral-950"
    : "text-neutral-300 hover:text-white";

  const iconButtonClass = isLightNavbar
    ? "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-900/5"
    : "text-neutral-300 hover:text-white hover:bg-white/5";

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo - Styled with leaf accents */}
        <a href="#" className={`flex items-center gap-1.5 font-serif text-2xl font-bold tracking-tight select-none group transition-colors ${logoTextClass}`}>
          <span>Harvest</span>
          <div className="relative flex flex-col items-center justify-center px-1">
            {/* Dual leaf Graphic above the '&' character */}
            <div className="absolute -top-[11px] left-1/2 -translate-x-1/2 flex items-center gap-[0.5px]">
              <Leaf className="h-4 w-4 text-emerald-500 fill-emerald-500/80 rotate-[12deg]" />
              <Leaf className="h-3.5 w-3.5 text-emerald-600 fill-emerald-600/60 -rotate-[35deg] -ml-1 mt-1" />
            </div>
            <span className={`text-xl font-serif transition-colors ${ampersandClass}`}>&</span>
          </div>
          <span>Co.</span>
        </a>

        {/* Desktop Navigation links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${navLinkClass}`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Navigation Actions & Icons */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <button 
            onClick={onSearchOpen}
            className={`p-1.5 rounded-full transition-colors cursor-pointer flex items-center justify-center ${iconButtonClass}`}
            aria-label="Search"
          >
            <Search className="h-5 w-5 stroke-[1.8]" />
          </button>

          {/* Shopping Cart Icon with Badge */}
          <button 
            id="nav-cart-btn"
            onClick={onCartOpen}
            className={`relative p-1.5 rounded-full transition-colors cursor-pointer flex items-center justify-center ${iconButtonClass}`}
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5 stroke-[1.8]" />
            {totalCartQuantity > 0 && (
              <span className={`absolute -top-1 -right-1.5 bg-[#D45B0C] text-white text-[10px] font-bold h-4.5 min-w-4.5 px-1 rounded-full flex items-center justify-center border-2 animate-pulse ${isLightNavbar ? 'border-[#FAF6F0]' : 'border-black'}`}>
                {totalCartQuantity}
              </span>
            )}
          </button>

          {/* Shop Now Primary Button */}
          <button 
            id="nav-shop-now-btn"
            onClick={onPromoOpen}
            className="hidden md:inline-flex items-center justify-center bg-[#D45B0C] hover:bg-[#B84E0A] text-white text-xs lg:text-sm font-semibold px-4.5 py-2.5 rounded-lg tracking-wide transition-all active:scale-95 cursor-pointer"
          >
            Shop Now
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-1.5 rounded-full ${iconButtonClass}`}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t ${isLightNavbar ? 'bg-[#FAF6F0] border-neutral-200' : 'bg-neutral-950 border-white/[0.04]'}`}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name} className={`border-b pb-2 ${isLightNavbar ? 'border-neutral-200/60' : 'border-white/[0.02]'}`}>
                  <a 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-medium block py-1.5 ${isLightNavbar ? 'text-neutral-700 hover:text-neutral-900' : 'text-neutral-300 hover:text-white'}`}
                  >
                    {link.name}
                  </a>
                </div>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <button 
                  onClick={() => { onPromoOpen(); setIsMobileMenuOpen(false); }}
                  className="w-full bg-[#D45B0C] hover:bg-[#B84E0A] text-white text-center font-medium py-3 rounded-xl transition-all"
                >
                  Claim Your Savings
                </button>
                <button 
                  onClick={() => { onCartOpen(); setIsMobileMenuOpen(false); }}
                  className={`w-full text-center font-medium py-3 rounded-xl transition-all border ${isLightNavbar ? 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300' : 'bg-white/5 hover:bg-white/10 text-white border-white/10'}`}
                >
                  View Cart ({totalCartQuantity})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
