import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { PERSPECTIVES, Perspective, PROJECTS } from '../data/portfolioData';
import { Sparkles, ArrowDown } from 'lucide-react';
import { STUDIO_EASE } from './MotionPrimitives';

interface HeroSectionProps {
  activeRole: string;
  onChangeRole: (role: string) => void;
  onExploreWorks: () => void;
}

export function HeroSection({ activeRole, onChangeRole, onExploreWorks }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const currentPerspective: Perspective = PERSPECTIVES[activeRole] || PERSPECTIVES.director;

  const coverSlides = useMemo(
    () =>
      PROJECTS.map((p) => ({
        id: p.id,
        title: p.title,
        year: p.year,
        location: p.location,
        heroImage: p.heroImage,
        fallbackHeroImage: p.fallbackHeroImage,
      })),
    []
  );

  const [slideIndex, setSlideIndex] = useState(0);
  const [fallbackUsed, setFallbackUsed] = useState<Record<string, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = coverSlides[slideIndex] || coverSlides[0];
  const currentSrc =
    fallbackUsed[currentSlide.id] && currentSlide.fallbackHeroImage
      ? currentSlide.fallbackHeroImage
      : currentSlide.heroImage;

  // Auto-advance project cover carousel
  useEffect(() => {
    if (coverSlides.length <= 1 || isPaused) return;
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % coverSlides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [coverSlides.length, isPaused]);

  // Preload next project cover for flicker-free crossfades
  useEffect(() => {
    if (coverSlides.length <= 1) return;
    const nextSlide = coverSlides[(slideIndex + 1) % coverSlides.length];
    if (nextSlide?.heroImage) {
      const img = new Image();
      img.src = nextSlide.heroImage;
    }
  }, [slideIndex, coverSlides]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '-36px']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-screen w-full flex flex-col overflow-hidden bg-[#08080C]"
    >
      {/* Full-Bleed Background Cinematic Visual Carousel with Scroll Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#08080C]">
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="w-full h-full will-change-transform relative"
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={`${currentSlide.id}-${currentSrc}`}
              src={currentSrc}
              alt={`${currentSlide.title} — Cover Archive`}
              referrerPolicy="no-referrer"
              onError={() => {
                if (currentSlide.fallbackHeroImage && !fallbackUsed[currentSlide.id]) {
                  setFallbackUsed((prev) => ({ ...prev, [currentSlide.id]: true }));
                }
              }}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.05, ease: STUDIO_EASE }}
              className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.42] contrast-[1.08]"
            />
          </AnimatePresence>
        </motion.div>

        {/* Legibility Gradient Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-[#08080C]/45 to-black/65 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,8,12,0.52)_0%,transparent_72%)] pointer-events-none" />
        <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />

        {/* Ambient Subtle Red Accent Glow */}
        <div className="absolute top-1/4 -right-12 w-96 h-96 bg-[#E62A2A]/15 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      </div>

      {/* Foreground Content Aligned to Site 1600px Grid */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-12 pt-24 sm:pt-24 pb-6 sm:pb-8 flex-1 flex flex-col justify-between">
        {/* Center Segment: Massive Typography Manifesto */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="max-w-5xl mx-auto text-center pt-2 sm:pt-4 pb-6 mb-auto"
        >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPerspective.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: STUDIO_EASE }}
          >
            {/* Tagline / Subtitle */}
            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-white/70 mb-3.5 sm:mb-4 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E62A2A]" />
              <span>{currentPerspective.tagline}</span>
            </div>

            {/* Hero Main Headline */}
            <h1
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-extrabold text-white leading-[1.08] tracking-tight text-balance max-w-4xl mx-auto"
              dangerouslySetInnerHTML={{ __html: currentPerspective.titleHtml }}
            />

            {/* Perspective Manifesto & Proof Statement */}
            <p className="mt-3.5 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base font-light text-white/80 leading-relaxed">
              {currentPerspective.manifesto}
            </p>

            <div className="mt-3.5 sm:mt-4 flex items-center justify-center gap-2 text-xs font-mono text-[#EFECE6]/60 tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#E62A2A]" />
              <span>{currentPerspective.statHighlight}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

        {/* Bottom Segment: Perspective Switcher & Scroll Anchor */}
        <div className="flex flex-col gap-4 sm:gap-5 pt-2">
          {/* Interactive Perspective Switcher with Shared Spring Pill */}
          <div className="flex flex-col items-center justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 shadow-2xl">
              {Object.values(PERSPECTIVES).map((p) => {
                const isActive = p.key === activeRole;
                return (
                  <button
                    key={p.key}
                    onClick={() => onChangeRole(p.key)}
                    className={`relative px-5 sm:px-6 py-2 rounded-full font-mono text-[11px] sm:text-xs tracking-widest uppercase transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="hero-perspective-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-[#E62A2A] shadow-[0_0_18px_rgba(230,42,42,0.5)] -z-10"
                      />
                    )}
                    <span className="relative z-10">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Navigation & Scroll Anchor */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/10 text-white/50 font-mono text-[11px] uppercase tracking-[0.25em]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#E62A2A] animate-ping" />
              <span>SHANGHAI BASE // AVAILABLE FOR NATIONWIDE COMMISSIONS</span>
            </div>

            <button
              onClick={onExploreWorks}
              className="flex items-center gap-2 text-white/70 hover:text-white hover:border-white transition-all border-b border-white/30 pb-0.5 cursor-pointer"
            >
              <span>Explore 27 Monographs</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
