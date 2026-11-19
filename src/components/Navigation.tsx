import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { ScrollProgressBar } from './MotionPrimitives';

interface NavigationProps {
  onOpenCommission: () => void;
}

const NAV_ITEMS = [
  { href: '#works', id: 'works', label: 'Monographs' },
  { href: '#principles', id: 'principles', label: 'The Code' },
  { href: '#trajectory', id: 'trajectory', label: 'Capabilities' },
] as const;

export function Navigation({ onOpenCommission }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const offsets = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        return { id: item.id, top: el.getBoundingClientRect().top };
      });

      const current = offsets
        .filter((o) => o.top <= window.innerHeight * 0.42)
        .pop();

      setActiveSection(current ? current.id : '');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'py-4 px-6 sm:px-12 bg-[#08080C]/90 backdrop-blur-md border-b border-white/10 shadow-2xl'
            : 'py-6 sm:py-7 px-6 sm:px-12'
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            className="flex items-center gap-3 font-display font-bold text-base sm:text-lg tracking-[0.08em] uppercase text-white whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
          >
            <span className="w-2 h-2 bg-[#E62A2A] shadow-[0_0_10px_#E62A2A]" />
            <span>LI CHENSHU</span>
          </a>

          {/* Zone 2: Unified Architectural Navigation Links */}
          <nav className="hidden lg:flex items-center gap-9 xl:gap-12 text-sm font-sans font-medium tracking-[0.08em] uppercase">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`group relative py-2 transition-colors duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-white'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-200 ${
                      isActive
                        ? 'bg-[#E62A2A] opacity-100'
                        : 'bg-white/40 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Compact Rounded Action Button */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              onClick={onOpenCommission}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-sans font-medium uppercase tracking-[0.12em] text-white bg-white/[0.08] hover:bg-[#E62A2A] border border-white/20 hover:border-[#E62A2A] rounded-full transition-all duration-200 hover:shadow-[0_0_18px_rgba(230,42,42,0.45)] whitespace-nowrap cursor-pointer"
            >
              <span>Commission / Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/75 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Continuous Scroll Depth Progress Track */}
        <ScrollProgressBar />
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#08080C]/95 backdrop-blur-2xl pt-24 px-8 pb-12 flex flex-col justify-between lg:hidden border-b border-white/10 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-6 font-display text-2xl font-bold tracking-tight">
            <a
              href="#works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/70 hover:text-white"
            >
              01. Monographs Index
            </a>
            <a
              href="#principles"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/70 hover:text-white"
            >
              02. The Non-Negotiable Code
            </a>
            <a
              href="#trajectory"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/70 hover:text-white"
            >
              03. Capabilities &amp; Squad
            </a>
          </nav>

          <div className="pt-8 border-t border-white/10 flex flex-col gap-4 font-mono text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommission();
              }}
              className="w-full py-3.5 text-center text-white bg-[#E62A2A] hover:bg-[#ff3b3b] rounded-full font-bold uppercase tracking-widest shadow-lg transition-colors"
            >
              Commission / Talk
            </button>
            <div className="text-white/40 text-center tracking-widest">
              SHANGHAI // NATIONWIDE
            </div>
          </div>
        </div>
      )}
    </>
  );
}
