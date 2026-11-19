import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenCommission: () => void;
}

export function Footer({ onOpenCommission }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 sm:py-20 border-t border-white/10 bg-[#040407] text-[11px] font-mono text-white/50 px-6 sm:px-12">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 uppercase tracking-[0.25em]">
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#E62A2A]" />
          <span className="text-white/80">© 2026 LI CHENSHU</span>
          <span className="text-white/20">|</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>

        {/* Central Motto */}
        <div className="hidden lg:flex items-center space-x-6 text-center text-white/40">
          <span>ARCHITECTURAL CURATION</span>
          <span>•</span>
          <span>ZERO-DEFECT GOVERNANCE</span>
        </div>

        {/* Back to top & inquiry */}
        <div className="flex items-center gap-6">
          <button
            onClick={onOpenCommission}
            className="text-white/70 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-0.5 cursor-pointer"
          >
            Initiate Dialogue →
          </button>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full border border-white/15 hover:border-white text-white/60 hover:text-white transition-colors cursor-pointer"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
