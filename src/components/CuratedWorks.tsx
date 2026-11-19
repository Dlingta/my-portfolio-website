import { useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { PROJECTS, Project } from '../data/portfolioData';
import { LayoutGrid, List, Search, ArrowUpRight, Image as ImageIcon } from 'lucide-react';
import { Reveal, STUDIO_EASE } from './MotionPrimitives';

interface CuratedWorksProps {
  activeRole: string;
  onOpenProject: (projectId: string) => void;
}

export function CuratedWorks({ activeRole, onOpenProject }: CuratedWorksProps) {
  // Default to 'grid' to showcase photography first as requested!
  const [viewMode, setViewMode] = useState<'grid' | 'index'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [failedHeroImages, setFailedHeroImages] = useState<Record<string, boolean>>({});

  // Floating Index Preview spring coordinates (Hyperiux Vault style)
  const previewX = useMotionValue(0);
  const previewY = useMotionValue(0);
  const springPreviewX = useSpring(previewX, { stiffness: 260, damping: 28, mass: 0.5 });
  const springPreviewY = useSpring(previewY, { stiffness: 260, damping: 28, mass: 0.5 });

  const handleIndexPointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    previewX.set(e.clientX + 28);
    previewY.set(e.clientY - 120);
  };

  const categories = useMemo(() => [
    { key: 'all', label: 'All Monographs (27)' },
    { key: 'commercial', label: 'Commercial Activation (10)' },
    { key: 'brand', label: 'Brand & Pop-Up (3)' },
    { key: 'exhibition', label: 'Museums & Pavilions (10)' },
    { key: 'event', label: 'Live Scenography (2)' },
    { key: 'virtual', label: 'Virtual & Cross-Media (2)' },
  ], []);

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (selectedCategory !== 'all' && p.categoryKey !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchClient = p.client.toLowerCase().includes(query);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(query));
        const matchLocation = p.location.toLowerCase().includes(query);
        const matchCategory = p.categoryName.toLowerCase().includes(query);
        if (!matchTitle && !matchClient && !matchTags && !matchLocation && !matchCategory) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="works" className="relative py-28 sm:py-36 border-t border-white/10 overflow-hidden">
      {/* Subtle Ambient Architectural Aura */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#08080C] z-0" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[35vw] bg-[#E62A2A]/[0.025] rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 px-6 sm:px-12 max-w-[1600px] mx-auto w-full">
        {/* Section Header */}
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-6 border-b border-white/15 gap-8">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E62A2A]" />
              <span>Project Catalog</span>
              <span>·</span>
              <span>27 Visual Monographs</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
              Selected Works
            </h2>
          </div>

          {/* Controls: Search, View Mode Toggle */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by project, client, city..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/[0.05] border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 font-mono tracking-wider transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-mono cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Switcher (Gallery vs Index) with Spring Pill */}
            <div className="flex items-center p-1 rounded-full bg-white/[0.06] border border-white/10 font-mono text-xs">
              <button
                onClick={() => {
                  setViewMode('grid');
                  setHoveredProject(null);
                }}
                className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'text-black font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {viewMode === 'grid' && (
                  <motion.span
                    layoutId="works-view-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                  />
                )}
                <LayoutGrid className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">Gallery</span>
              </button>
              <button
                onClick={() => setViewMode('index')}
                className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'index'
                    ? 'text-black font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {viewMode === 'index' && (
                  <motion.span
                    layoutId="works-view-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                  />
                )}
                <List className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">Index</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* Category Filter Tabs (3 per row on medium/large screens, single row on 2xl) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:flex 2xl:flex-wrap items-center gap-2.5 sm:gap-3 mb-10 font-mono text-xs">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`relative px-4 py-2.5 rounded-full whitespace-nowrap text-center transition-colors cursor-pointer border ${
                  isActive
                    ? 'border-white/40 text-white font-medium shadow-sm'
                    : 'bg-white/[0.02] border-white/10 text-white/50 hover:text-white hover:border-white/20'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="works-category-pill"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-white/15 -z-10"
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ==================== VIEW MODE 1: VISUAL BENTO GRID (DEFAULT) ==================== */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' && (
            <motion.div
              key={`grid-${selectedCategory}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: STUDIO_EASE }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredProjects.map((p, index) => {
                const isLarge = index === 0 || index === 5;
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.24), ease: STUDIO_EASE }}
                    onClick={() => onOpenProject(p.id)}
                    className={`group relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/40 transition-all duration-500 cursor-pointer flex flex-col justify-between bg-[#0E0E14] hover:shadow-2xl hover:-translate-y-1 ${
                      isLarge ? 'md:col-span-2' : 'col-span-1'
                    }`}
                  >
                    {/* Master Visual Frame */}
                    <div className={`relative w-full overflow-hidden bg-black/60 ${isLarge ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
                      {!failedHeroImages[p.id] ? (
                        <img
                          src={p.heroImage}
                          alt={p.title}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            if (p.fallbackHeroImage && !e.currentTarget.src.endsWith(p.fallbackHeroImage)) {
                              e.currentTarget.src = p.fallbackHeroImage;
                            } else {
                              setFailedHeroImages((prev) => ({ ...prev, [p.id]: true }));
                            }
                          }}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.9] group-hover:brightness-100"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex flex-col justify-between p-6 select-none relative overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${p.gradientColors[0]} 0%, ${p.gradientColors[1]} 100%)`,
                          }}
                        >
                          <div
                            className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{
                              backgroundImage:
                                'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%), linear-gradient(0deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                              backgroundSize: '100% 100%, 24px 24px, 24px 24px',
                            }}
                          />
                          <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-white/50 uppercase tracking-widest">
                            <span>{p.categoryName}</span>
                            <span>{p.location}</span>
                          </div>
                          <div className="relative z-10 my-auto text-center space-y-2">
                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 block">
                              ARCHITECTURAL MONOGRAPH
                            </span>
                            <h4 className="font-serif text-xl sm:text-2xl text-white font-medium tracking-wide">
                              {p.title}
                            </h4>
                            <span className="text-[11px] font-mono text-white/60">
                              {p.client}
                            </span>
                          </div>
                          <div className="relative z-10 font-mono text-[10px] text-white/40 flex items-center justify-between">
                            <span>SCALE // {p.specs.scale}</span>
                            <span>{p.year}</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E14] via-black/20 to-black/30 pointer-events-none" />

                      {/* Category, Client & Plates Counter Bar (Flex-separated to prevent overlap) */}
                      <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 right-3.5 sm:right-4 flex items-start justify-between gap-2.5 font-mono text-[10px] uppercase tracking-wider pointer-events-none">
                        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-white/85 truncate max-w-full">
                            {p.categoryName}
                          </span>
                          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-[#E62A2A]/35 text-white/95 truncate max-w-[160px] sm:max-w-[200px]">
                            {p.client}
                          </span>
                        </div>

                        {/* Gallery Plates Counter Badge */}
                        <div className="shrink-0 whitespace-nowrap flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-white/90">
                          <ImageIcon className="w-3 h-3 text-[#E62A2A]" />
                          <span>{p.gallery.length} Plates</span>
                        </div>
                      </div>
                    </div>

                    {/* Concise Card Text (Streamlined & Punchy) */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                      <div>
                        <div className="flex items-center justify-between gap-3 text-xs font-mono text-white/50 mb-2.5">
                          <span className="text-white/60 truncate">{p.location}</span>
                          <span className="shrink-0 text-[#E62A2A] font-semibold">{p.year}</span>
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                          {p.title}
                        </h3>
                        {/* One-Sentence Hook */}
                        <p className="mt-3 text-xs sm:text-sm text-white/70 line-clamp-2 font-light leading-relaxed">
                          "{p.hook}"
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/35 mb-1">
                            Role
                          </span>
                          <p className="text-xs font-sans text-white/65 group-hover:text-white/90 leading-relaxed transition-colors">
                            {p.role}
                          </p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 shrink-0 text-[#E62A2A] opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* ==================== VIEW MODE 2: MINIMALIST INDEX LIST WITH FLOATING PREVIEW ==================== */}
          {viewMode === 'index' && (
            <motion.div
              key={`index-${selectedCategory}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: STUDIO_EASE }}
              onMouseMove={handleIndexPointerMove}
              onMouseLeave={() => setHoveredProject(null)}
              className="relative flex flex-col w-full border-t border-white/10"
            >
              {filteredProjects.map((p, i) => {
                const num = String(i + 1).padStart(2, '0');
                const isHovered = p.id === hoveredProject?.id;
                const matchesRole = p.perspectiveCategory === activeRole;

                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.025, 0.2), ease: STUDIO_EASE }}
                    onMouseEnter={() => setHoveredProject(p)}
                    onClick={() => onOpenProject(p.id)}
                    className={`group relative flex flex-col md:flex-row md:items-center justify-between py-8 sm:py-12 border-b border-white/10 cursor-pointer transition-all duration-300 ${
                      isHovered ? 'pl-4 sm:pl-6 bg-white/[0.02]' : ''
                    }`}
                  >
                    {/* Left: Number + Title */}
                    <div className="flex items-baseline space-x-6 sm:space-x-10">
                      <span className="font-mono text-xs sm:text-sm text-white/30 group-hover:text-[#E62A2A] transition-colors duration-300">
                        {num}
                      </span>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold text-white/60 group-hover:text-white transition-colors duration-300 tracking-tight uppercase leading-none">
                            {p.title}
                          </h3>
                          {matchesRole && (
                            <span
                              className="hidden sm:inline-block w-2 h-2 rounded-full bg-[#E62A2A] animate-pulse"
                              title="Highlights active perspective role"
                            />
                          )}
                        </div>
                        <div className="mt-2 text-xs font-mono text-white/40 flex items-center gap-2">
                          <span>{p.client}</span>
                          <span>·</span>
                          <span>{p.location}</span>
                          <span>·</span>
                          <span>{p.gallery.length} Plates</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Category + Year + Arrow */}
                    <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-6 font-mono text-xs uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors duration-300">
                      <span className="text-white/60">{p.categoryName}</span>
                      <span className="text-white/20">//</span>
                      <span>{p.year}</span>
                      <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#E62A2A] group-hover:bg-[#E62A2A] group-hover:text-white transition-all">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Floating Cursor-Tracking Preview Plate (Desktop Index Mode) */}
              <AnimatePresence>
                {hoveredProject && !failedHeroImages[hoveredProject.id] && (
                  <motion.div
                    aria-hidden="true"
                    style={{ x: springPreviewX, y: springPreviewY }}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.2, ease: STUDIO_EASE }}
                    className="hidden lg:block fixed top-0 left-0 z-30 w-80 aspect-[16/10] rounded-2xl overflow-hidden border border-white/25 bg-[#0A0A0F] shadow-[0_24px_60px_rgba(0,0,0,0.85)] pointer-events-none"
                  >
                    <img
                      src={hoveredProject.heroImage}
                      alt={hoveredProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between font-mono text-[10px] text-white/90 uppercase tracking-wider">
                      <span className="truncate pr-2">{hoveredProject.location}</span>
                      <span className="text-[#E62A2A] font-bold shrink-0">
                        {hoveredProject.gallery.length} Plates
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state when searching */}
        {filteredProjects.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-mono text-sm text-white/50 tracking-wider">
              No monographs match your search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-6 py-2 rounded-full border border-white/20 text-xs font-mono text-white hover:bg-white/10 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
