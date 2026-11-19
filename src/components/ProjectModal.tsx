import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, PROJECTS } from '../data/portfolioData';
import { STUDIO_EASE } from './MotionPrimitives';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  Compass,
  Layers,
  Clock,
  Sparkles,
  Shield,
  Activity,
  Sliders,
  SunMoon,
} from 'lucide-react';

interface ProjectModalProps {
  projectId: string | null;
  onClose: () => void;
  onSelectProject: (id: string) => void;
}

interface PlateDefinition {
  index: number;
  label: string;
  category: string;
  tagline: string;
}

const PLATES_CONFIG: PlateDefinition[] = [
  { index: 0, label: 'Master View', category: 'Field Photography', tagline: 'Principal Monumental Field Archive' },
  { index: 1, label: 'Elevation CAD', category: 'Structural Axis', tagline: 'Parametric Morphology & Elevation Section' },
  { index: 2, label: 'Circulation Flow', category: 'Site Blueprint', tagline: 'Pedestrian Vector & Ground Zoning Matrix' },
  { index: 3, label: 'DMX Lighting', category: 'Photometrics', tagline: 'Programmable Sequences & Luminaire Topology' },
  { index: 4, label: 'Tectonic Specs', category: 'Materials', tagline: 'Alloy Assemblies & Cross-Section Detail' },
  { index: 5, label: 'Day / Night Lux', category: 'Atmosphere', tagline: 'Photometric Shift & Daylight Gradient Study' },
  { index: 6, label: 'Safety Protocol', category: 'Operations Loop', tagline: 'Automated Turnstile & Closed-Loop Flow' },
];

export function ProjectModal({ projectId, onClose, onSelectProject }: ProjectModalProps) {
  const currentIndex = PROJECTS.findIndex((p) => p.id === projectId);
  const project: Project | undefined = PROJECTS[currentIndex];

  const hasPhotoGallery = Boolean(project?.gallery && project.gallery.length > 1);

  // Derive active plates dynamically based on project gallery or PLATES_CONFIG fallback
  const activePlates: PlateDefinition[] = (hasPhotoGallery && project?.gallery)
    ? project.gallery.map((g, idx) => ({
        index: idx,
        label: g.category || `Plate ${String(idx + 1).padStart(2, '0')}`,
        category: g.category || (project?.categoryName ?? 'Field Photography'),
        tagline: g.caption,
      }))
    : PLATES_CONFIG;

  const totalPlates = activePlates.length;

  // Selected plate index (0 to totalPlates - 1)
  const [selectedPlateIndex, setSelectedPlateIndex] = useState<number>(0);

  // Fullscreen high-res lightbox state (null or 0..totalPlates - 1)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Track image load failures per plate index to prevent fallback looping or showing duplicate images
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  // Reset selected plate index and failure cache when changing projects
  useEffect(() => {
    setSelectedPlateIndex(0);
    setLightboxIndex(null);
    setFailedImages({});
  }, [projectId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          onClose();
        }
      } else if (lightboxIndex !== null && project) {
        // Keyboard navigation inside lightbox
        if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : totalPlates - 1));
        } else if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev !== null && prev < totalPlates - 1 ? prev + 1 : 0));
        }
      } else if (lightboxIndex === null) {
        // Monograph navigation when lightbox is closed
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
          onSelectProject(PROJECTS[currentIndex - 1].id);
        } else if (e.key === 'ArrowRight' && currentIndex < PROJECTS.length - 1) {
          onSelectProject(PROJECTS[currentIndex + 1].id);
        }
      }
    };

    if (projectId) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projectId, currentIndex, lightboxIndex, project, totalPlates, onClose, onSelectProject]);

  if (!project) return null;

  const isTmall = project.id === 'tmall-good-lawn';
  const isGuochao = project.id === 'guochao-cultural-expo';
  const isGuochaoRetail = project.id === 'guochao-pop-up-retail';
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  const handleThumbnailClick = (index: number) => {
    setSelectedPlateIndex(index);
  };

  const handleHeroPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPlateIndex((prev) => (prev > 0 ? prev - 1 : totalPlates - 1));
  };

  const handleHeroNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPlateIndex((prev) => (prev < totalPlates - 1 ? prev + 1 : 0));
  };

  // Helper to render the Vector Blueprint Plate
  const renderVectorBlueprint = (plateIdx: number, isLightbox: boolean = false) => {
    const curPlate = activePlates[plateIdx] || PLATES_CONFIG[plateIdx] || PLATES_CONFIG[1];

    if (isTmall) {
      return (
        <div
          className={`w-full h-full relative flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden bg-gradient-to-br from-[#064e3b]/90 via-[#022c22] to-[#040407]`}
        >
          {/* Glowing Botanical Background Matrix */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.25) 0%, transparent 70%), linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '100% 100%, 28px 28px, 28px 28px',
            }}
          />

          {/* Top Curatorial Monograph Header */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/70 border-b border-emerald-500/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-emerald-500 text-black font-bold text-[10px] tracking-widest uppercase shadow-md shadow-emerald-500/30">
                PLATE #{String(plateIdx + 1).padStart(2, '0')} // EXHIBITION
              </span>
              <span className="text-emerald-300 font-semibold tracking-wider">{curPlate.category}</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-emerald-400/80 tracking-widest uppercase">
              <span>SITE // {project.location}</span>
              <span>·</span>
              <span>CURATION // TMALL GLOBAL</span>
            </div>
          </div>

          {/* Center Botanical Labyrinth Visual */}
          <div className="relative z-10 my-auto py-6 sm:py-8 max-w-5xl mx-auto w-full text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>SPATIAL CURATION ARCHIVE · FIELD RECORD</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium max-w-2xl mx-auto tracking-wide leading-snug">
              {curPlate.tagline}
            </h3>

            {/* Custom Architectural Botanical SVG */}
            <svg viewBox="0 0 800 220" className="w-full max-w-3xl mx-auto h-auto text-emerald-400/90">
              <defs>
                <linearGradient id="grassGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#052e16" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <line x1="40" y1="190" x2="760" y2="190" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />
              {/* Soaring Grass Arches */}
              <path d="M 100 190 Q 150 20, 200 190" fill="none" stroke="url(#grassGrad)" strokeWidth="4" />
              <path d="M 180 190 Q 240 10, 300 190" fill="none" stroke="url(#grassGrad)" strokeWidth="4" />
              <path d="M 280 190 Q 350 25, 420 190" fill="none" stroke="url(#grassGrad)" strokeWidth="4" />
              <path d="M 400 190 Q 480 15, 560 190" fill="none" stroke="url(#grassGrad)" strokeWidth="4" />
              <path d="M 540 190 Q 610 20, 680 190" fill="none" stroke="url(#grassGrad)" strokeWidth="4" />
              {/* Display Mirror Pedestals & Terrarium Spheres */}
              <rect x="230" y="110" width="36" height="80" rx="4" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="1.5" />
              <rect x="370" y="90" width="44" height="100" rx="4" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1.5" />
              <rect x="510" y="120" width="36" height="70" rx="4" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="1.5" />
              <circle cx="392" cy="65" r="14" fill="rgba(255,255,255,0.1)" stroke="#34d399" strokeWidth="1.5" />
              <circle cx="248" cy="85" r="10" fill="rgba(255,255,255,0.08)" stroke="#34d399" strokeWidth="1.2" />
              <circle cx="528" cy="95" r="10" fill="rgba(255,255,255,0.08)" stroke="#34d399" strokeWidth="1.2" />
              {/* Ideogram Grass Labels */}
              <text x="210" y="105" fill="#34d399" fontSize="11" fontFamily="monospace">cǎo 种草</text>
              <text x="350" y="85" fill="#a7f3d0" fontSize="12" fontFamily="monospace" fontWeight="bold">TOP 20 新品</text>
              <text x="495" y="115" fill="#34d399" fontSize="11" fontFamily="monospace">香氛微景观</text>
            </svg>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-emerald-300/80 pt-2">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 shadow-sm">
                🌿 原片已完整收录于本项目画廊
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 shadow-sm">
                🎨 高清摄影档案已录入 · 支持点击上方缩略图全屏检视
              </span>
            </div>
          </div>

          {/* Bottom Monograph Footer */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-emerald-400/60 border-t border-emerald-500/20 pt-4">
            <div>SPATIAL SYSTEM // CURVED BOTANICAL MAZE</div>
            <div className="text-emerald-400">A GOOD PITCH · LI CHENSHU ARCHIVAL DOSSIER</div>
          </div>
        </div>
      );
    }

    if (isGuochao) {
      return (
        <div
          className={`w-full h-full relative flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden bg-gradient-to-br from-[#451010]/95 via-[#1c0808] to-[#080404]`}
        >
          {/* Imperial Vermilion & Gold Lattice Matrix */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at 50% 35%, rgba(220,38,38,0.25) 0%, transparent 70%), linear-gradient(0deg, rgba(234,179,8,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.06) 1px, transparent 1px)',
              backgroundSize: '100% 100%, 32px 32px, 32px 32px',
            }}
          />

          {/* Top Curatorial Monograph Header */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/70 border-b border-red-500/30 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-red-600 text-white font-bold text-[10px] tracking-widest uppercase shadow-md shadow-red-600/40">
                PLATE #{String(plateIdx + 1).padStart(2, '0')} // GUOCHAO EXPO
              </span>
              <span className="text-amber-300 font-semibold tracking-wider">{curPlate.category}</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-amber-400/80 tracking-widest uppercase">
              <span>SITE // {project.location}</span>
              <span>·</span>
              <span>CLIENT // 武汉市文旅局</span>
            </div>
          </div>

          {/* Center Guochao CAD Visual */}
          <div className="relative z-10 my-auto py-6 sm:py-8 max-w-5xl mx-auto w-full text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-amber-400/30 text-amber-300 font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>GUOCHAO CULTURAL EXPO · ARCHITECTURAL CAD SCHEMATIC</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium max-w-2xl mx-auto tracking-wide leading-snug">
              {curPlate.tagline}
            </h3>

            {/* Custom Architectural Guochao Flower Umbrella SVG */}
            <svg viewBox="0 0 800 220" className="w-full max-w-3xl mx-auto h-auto text-amber-400/90">
              <defs>
                <linearGradient id="guochaoGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#450a0a" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <line x1="40" y1="190" x2="760" y2="190" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" />
              {/* Central Mosaic Totem Column & Facet Core */}
              <rect x="385" y="70" width="30" height="120" rx="3" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth="1.8" />
              <polygon points="400,30 425,55 400,80 375,55" fill="rgba(239,68,68,0.4)" stroke="#ef4444" strokeWidth="2" />
              {/* Kinetic Flower Umbrella Scissor Ribs */}
              <line x1="400" y1="55" x2="160" y2="100" stroke="url(#goldGrad)" strokeWidth="3" />
              <line x1="400" y1="55" x2="640" y2="100" stroke="url(#goldGrad)" strokeWidth="3" />
              <line x1="400" y1="55" x2="260" y2="140" stroke="url(#goldGrad)" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="400" y1="55" x2="540" y2="140" stroke="url(#goldGrad)" strokeWidth="2" strokeDasharray="3 3" />
              {/* Suspended Umbrella Fabric Petals */}
              <path d="M 160 100 Q 280 80, 400 55" fill="none" stroke="#ef4444" strokeWidth="2" />
              <path d="M 640 100 Q 520 80, 400 55" fill="none" stroke="#ef4444" strokeWidth="2" />
              {/* Entrance Gate & Curved Translucent Partitions */}
              <rect x="80" y="120" width="60" height="70" rx="4" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1.5" />
              <rect x="660" y="120" width="60" height="70" rx="4" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1.5" />
              {/* Chinese Typographic Labels */}
              <text x="82" y="112" fill="#f59e0b" fontSize="11" fontFamily="monospace">国潮文创 门头</text>
              <text x="350" y="24" fill="#fcd34d" fontSize="12" fontFamily="monospace" fontWeight="bold">机械花伞穹顶</text>
              <text x="645" y="112" fill="#f59e0b" fontSize="11" fontFamily="monospace">非遗好物仓</text>
            </svg>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-amber-300/90 pt-2">
              <span className="px-3.5 py-1.5 rounded-full bg-red-950/80 border border-amber-500/30 shadow-sm">
                🏛️ CCMMdia_compressed 已严格设为主封面与首图
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-red-950/80 border border-amber-500/30 shadow-sm">
                📂 9 张展板已全部入库 · 支持全屏灯箱高精度检视
              </span>
            </div>
          </div>

          {/* Bottom Monograph Footer */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-amber-400/60 border-t border-red-500/20 pt-4">
            <div>SPATIAL SYSTEM // KINETIC FLOWER UMBRELLA & MODULAR MATRIX</div>
            <div className="text-amber-400">GUOCHAO CULTURAL EXPO PAVILION · LI CHENSHU ARCHIVAL DOSSIER</div>
          </div>
        </div>
      );
    }

    if (isGuochaoRetail) {
      return (
        <div
          className={`w-full h-full relative flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden bg-gradient-to-br from-[#7c2d12]/95 via-[#431407] to-[#0c0402]`}
        >
          {/* Vibrant Orange & Vermilion Matrix */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at 50% 35%, rgba(249,115,22,0.3) 0%, transparent 70%), linear-gradient(0deg, rgba(251,146,60,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(251,146,60,0.08) 1px, transparent 1px)',
              backgroundSize: '100% 100%, 28px 28px, 28px 28px',
            }}
          />

          {/* Top Curatorial Monograph Header */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/70 border-b border-orange-500/30 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-orange-500 text-black font-bold text-[10px] tracking-widest uppercase shadow-md shadow-orange-500/40">
                PLATE #{String(plateIdx + 1).padStart(2, '0')} // POP-UP RETAIL
              </span>
              <span className="text-orange-200 font-semibold tracking-wider">{curPlate.category}</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-orange-300/80 tracking-widest uppercase">
              <span>SITE // WUHAN MIXC (武汉万象城)</span>
              <span>·</span>
              <span>CURATION // 故宫文创 · 十方文创</span>
            </div>
          </div>

          {/* Center Guochao Retail CAD Visual */}
          <div className="relative z-10 my-auto py-6 sm:py-8 max-w-5xl mx-auto w-full text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-400/30 text-orange-200 font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>GUOCHAO POP-UP RETAIL · ARCHITECTURAL SCHEMATIC</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium max-w-2xl mx-auto tracking-wide leading-snug">
              {curPlate.tagline}
            </h3>

            {/* Custom Architectural Pop-Up Cube SVG */}
            <svg viewBox="0 0 800 220" className="w-full max-w-3xl mx-auto h-auto text-orange-400/90">
              <defs>
                <linearGradient id="cubeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#431407" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <line x1="40" y1="190" x2="760" y2="190" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" />
              {/* Outer Monolithic Pop-up Cube */}
              <rect x="120" y="45" width="560" height="145" rx="8" fill="rgba(194,65,12,0.2)" stroke="#f97316" strokeWidth="2" />
              {/* Service Counter & '十方文创' Window Opening */}
              <rect x="160" y="80" width="480" height="75" rx="4" fill="rgba(251,146,60,0.25)" stroke="#fb923c" strokeWidth="1.5" />
              {/* Central Palace Museum Pegboard Partition */}
              <rect x="330" y="90" width="140" height="60" rx="3" fill="rgba(220,38,38,0.35)" stroke="#ef4444" strokeWidth="1.5" />
              <text x="350" y="125" fill="#fef08a" fontSize="11" fontFamily="monospace" fontWeight="bold">故宫博物院文创</text>
              <text x="210" y="170" fill="#fed7aa" fontSize="12" fontFamily="monospace" fontWeight="bold">十方文创 一次集结</text>
              <text x="495" y="170" fill="#fcd34d" fontSize="10" fontFamily="monospace">Wuhan MixC 万象城</text>
            </svg>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-orange-200/90 pt-2">
              <span className="px-3.5 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/30 shadow-sm">
                🏬 WUHAN MIXC · 武汉万象城国潮快闪店
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/30 shadow-sm">
                📂 GUOCHAO POP-UP RETAIL · 实景展板设计档案
              </span>
            </div>
          </div>

          {/* Bottom Monograph Footer */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-orange-300/60 border-t border-orange-500/20 pt-4">
            <div>SPATIAL SYSTEM // COLOR-BLOCK POP-UP CUBE & MODULAR SHELVING</div>
            <div className="text-orange-400">GUOCHAO POP-UP RETAIL · LI CHENSHU ARCHIVAL DOSSIER</div>
          </div>
        </div>
      );
    }

    const pConfig = PLATES_CONFIG[plateIdx] || PLATES_CONFIG[1];
    return (
      <div
        className={`w-full h-full relative flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden ${
          isLightbox ? 'bg-[#06060A]' : 'bg-[#090910]'
        }`}
      >
        {/* Architectural CAD Blueprint Grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(230,42,42,0.12) 0%, transparent 75%), linear-gradient(0deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '100% 100%, 32px 32px, 32px 32px',
          }}
        />

        {/* Ambient Top Blueprint Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/60 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#E62A2A] text-white font-bold text-[10px] tracking-widest uppercase">
              ARCH-DWG // #{String(plateIdx + 1).padStart(2, '0')}
            </span>
            <span className="text-white font-medium tracking-wider">{pConfig.tagline}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-white/40 tracking-widest uppercase">
            <span>SCALE // {project.specs.scale}</span>
            <span>·</span>
            <span>SITE // {project.location}</span>
          </div>
        </div>

        {/* Center Technical Schematic Graphic */}
        <div className="relative z-10 my-auto py-6 sm:py-10 max-w-5xl mx-auto w-full">
          {plateIdx === 1 && (
            /* Plate 02: Structural Elevation & Morphology CAD */
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-[11px] text-white/50 border-b border-white/5 pb-2">
                <span>AXIS [X-Y-Z] ELEVATION SECTION</span>
                <span className="text-[#E62A2A]">DATUM 0.00m → PEAK ELEVATION</span>
              </div>
              <svg viewBox="0 0 800 240" className="w-full h-auto text-white/80">
                <line x1="40" y1="200" x2="760" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 60 190 Q 200 40, 400 120 T 740 190" fill="none" stroke="#E62A2A" strokeWidth="2.5" />
                <path d="M 60 200 L 220 70 L 400 130 L 580 80 L 740 200" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="60" cy="190" r="4" fill="#E62A2A" />
                <circle cx="220" cy="70" r="4" fill="white" />
                <circle cx="400" cy="120" r="5" fill="#E62A2A" />
                <circle cx="580" cy="80" r="4" fill="white" />
                <circle cx="740" cy="190" r="4" fill="#E62A2A" />
                <text x="65" y="175" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace">ORIGIN PORTAL (+4.20m)</text>
                <text x="360" y="105" fill="#E62A2A" fontSize="11" fontFamily="monospace" fontWeight="bold">CANTILEVER MIDSPAN (+3.50m)</text>
                <text x="640" y="175" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace">DECELERATION BASIN (0.00m)</text>
              </svg>
              <div className="grid grid-cols-3 gap-4 font-mono text-[11px] pt-4 border-t border-white/10 text-white/70">
                <div><span className="text-white/40 block">STRUCTURAL ALLOY:</span> {project.specs.medium}</div>
                <div><span className="text-white/40 block">CRITICAL LOAD:</span> Wind Dynamic Deflection &lt; L/400</div>
                <div><span className="text-white/40 block">FASTENERS:</span> Zero-Weld High-Tensile Bolts M24</div>
              </div>
            </div>
          )}

          {plateIdx === 2 && (
            /* Plate 03: Ground Plane Circulation & Zoning */
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-[11px] text-white/50 border-b border-white/5 pb-2">
                <span>CIRCULATION VECTOR // SITE TOPOLOGY</span>
                <span className="text-[#E62A2A]">PEDESTRIAN PRESSURE BUFFERING</span>
              </div>
              <svg viewBox="0 0 800 240" className="w-full h-auto text-white/80">
                <rect x="50" y="40" width="700" height="160" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" />
                <circle cx="160" cy="120" r="48" fill="rgba(230,42,42,0.08)" stroke="#E62A2A" strokeWidth="1.5" />
                <circle cx="400" cy="120" r="64" fill="rgba(255,255,255,0.05)" stroke="white" strokeWidth="1.5" />
                <circle cx="640" cy="120" r="48" fill="rgba(230,42,42,0.08)" stroke="#E62A2A" strokeWidth="1.5" />
                <line x1="208" y1="120" x2="336" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="464" y1="120" x2="592" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                <text x="120" y="125" fill="white" fontSize="10" fontFamily="monospace">STAGE A: ENTRY</text>
                <text x="350" y="125" fill="#E62A2A" fontSize="11" fontFamily="monospace" fontWeight="bold">STAGE B: MONUMENT</text>
                <text x="600" y="125" fill="white" fontSize="10" fontFamily="monospace">STAGE C: DISCHARGE</text>
              </svg>
              <div className="grid grid-cols-3 gap-4 font-mono text-[11px] pt-4 border-t border-white/10 text-white/70">
                <div><span className="text-white/40 block">THROUGHPUT:</span> 3,000–5,000 Visitors / Day</div>
                <div><span className="text-white/40 block">QUEUE BUFFER:</span> 120m Serpentine Perimeter</div>
                <div><span className="text-white/40 block">ACCESSIBILITY:</span> Barrier-Free Egress Path 1:12</div>
              </div>
            </div>
          )}

          {plateIdx === 3 && (
            /* Plate 04: Photometric & DMX Lighting Architecture */
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-[11px] text-white/50 border-b border-white/5 pb-2">
                <span>DMX512 NETWORK TOPOLOGY // 4000K-RGBW</span>
                <span className="text-[#E62A2A]">SYNCHRONIZED LIGHT CURVES</span>
              </div>
              <svg viewBox="0 0 800 240" className="w-full h-auto text-white/80">
                <line x1="50" y1="180" x2="750" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                {/* 3 Sequences: Meteor, Pulse, River */}
                <path d="M 60 170 Q 200 20, 350 170" fill="none" stroke="#E62A2A" strokeWidth="2.5" />
                <path d="M 250 170 C 300 110, 450 110, 500 170" fill="none" stroke="#FFB800" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M 450 170 Q 580 80, 720 170" fill="none" stroke="#00E5FF" strokeWidth="2" />
                <text x="140" y="90" fill="#E62A2A" fontSize="10" fontFamily="monospace">SEQ 01: 'METEOR PLUNGE' (120 BPM)</text>
                <text x="320" y="130" fill="#FFB800" fontSize="10" fontFamily="monospace">SEQ 02: 'HALO BREATH' (60 BPM)</text>
                <text x="540" y="110" fill="#00E5FF" fontSize="10" fontFamily="monospace">SEQ 03: 'LIQUID RIVER' (GRADIENT)</text>
              </svg>
              <div className="grid grid-cols-3 gap-4 font-mono text-[11px] pt-4 border-t border-white/10 text-white/70">
                <div><span className="text-white/40 block">CONTROLLER:</span> GrandMA3 onPC / ArtNet Node</div>
                <div><span className="text-white/40 block">ADDRESS SPACE:</span> 8 Universes / 4,096 Ch</div>
                <div><span className="text-white/40 block">IP RATING:</span> IP68 Submersible Enclosures</div>
              </div>
            </div>
          )}

          {plateIdx === 4 && (
            /* Plate 05: Tectonic Assemblies & Material Specification */
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-[11px] text-white/50 border-b border-white/5 pb-2">
                <span>TECTONIC ANATOMY // MATERIAL SPECIFICATION</span>
                <span className="text-[#E62A2A]">METALLURGICAL TOLERANCE ±0.5mm</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 font-mono text-xs">
                  <div className="text-[#E62A2A] font-bold">CORE SUBSTRUCTURE</div>
                  <div className="text-white/90">Q355B Galvanized Steel Square Tube</div>
                  <div className="text-white/50 text-[11px]">200×200×8mm main columns with thermal expansion expansion joints.</div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 font-mono text-xs">
                  <div className="text-[#E62A2A] font-bold">SURFACE SKIN</div>
                  <div className="text-white/90">Mirror Stainless Steel 316L (8K)</div>
                  <div className="text-white/50 text-[11px]">3.0mm thickness, CNC seamless argon arc welded with zero distortion.</div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 font-mono text-xs">
                  <div className="text-[#E62A2A] font-bold">OPTICAL DIFFUSER</div>
                  <div className="text-white/90">Dichroic Optical Polycarbonate</div>
                  <div className="text-white/50 text-[11px]">UV-resistant micro-prismatic layer for anti-glare civic eye safety.</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 font-mono text-[11px] pt-4 border-t border-white/10 text-white/70">
                <div><span className="text-white/40 block">CORROSION GRADE:</span> C5-M Marine Atmospheric</div>
                <div><span className="text-white/40 block">FIRE RATING:</span> Class A Non-Combustible</div>
                <div><span className="text-white/40 block">WARRANTY:</span> 25-Year Structural Longevity</div>
              </div>
            </div>
          )}

          {plateIdx === 5 && (
            /* Plate 06: Environmental & Day-to-Night Photometrics */
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-[11px] text-white/50 border-b border-white/5 pb-2">
                <span>PHOTOMETRIC DELTA // DAYLIGHT VS MUNICIPAL NIGHTSCAPE</span>
                <span className="text-[#E62A2A]">CIVIC GLARE THRESHOLD &lt; 500 cd/m²</span>
              </div>
              <svg viewBox="0 0 800 240" className="w-full h-auto text-white/80">
                <line x1="50" y1="200" x2="750" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="50" y1="40" x2="50" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                {/* 24-Hour Lux Curve */}
                <path d="M 50 190 Q 220 50, 400 60 T 750 190" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 50 195 L 350 195 Q 550 90, 750 110" fill="none" stroke="#E62A2A" strokeWidth="2.5" />
                <text x="60" y="55" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">SOLAR AMBIENT (10,000–80,000 LUX)</text>
                <text x="560" y="80" fill="#E62A2A" fontSize="10" fontFamily="monospace">MONUMENT ARTIFICIAL LUMINANCE</text>
                <text x="70" y="215" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">06:00 (DAWN)</text>
                <text x="380" y="215" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">12:00 (NOON)</text>
                <text x="680" y="215" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">22:00 (NIGHT)</text>
              </svg>
              <div className="grid grid-cols-3 gap-4 font-mono text-[11px] pt-4 border-t border-white/10 text-white/70">
                <div><span className="text-white/40 block">CIVIC COMPLIANCE:</span> JGJ/T 163-2008 Standard</div>
                <div><span className="text-white/40 block">AUTOMATIC DIMMING:</span> Astro-Clock Synchronized</div>
                <div><span className="text-white/40 block">COLOR DRIFT:</span> MacAdam Ellipse 3-Step SDCM</div>
              </div>
            </div>
          )}

          {plateIdx === 6 && (
            /* Plate 07: Operational Flow & Automated Safety Protocol */
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-[11px] text-white/50 border-b border-white/5 pb-2">
                <span>OPERATIONAL SAFETY LOOP // AUTOMATED GATEWAY</span>
                <span className="text-[#E62A2A]">FAIL-SAFE INTERLOCK SYSTEM</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                  <span className="text-[10px] text-[#E62A2A] font-bold block">STEP 01</span>
                  <div className="text-white font-medium mt-1">QR Code Scan</div>
                  <div className="text-[11px] text-white/40 mt-1">Digital safety waiver agreement signature.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                  <span className="text-[10px] text-[#E62A2A] font-bold block">STEP 02</span>
                  <div className="text-white font-medium mt-1">Suit Checkout</div>
                  <div className="text-[11px] text-white/40 mt-1">RFID sliding protective gear verification.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                  <span className="text-[10px] text-[#E62A2A] font-bold block">STEP 03</span>
                  <div className="text-white font-medium mt-1">Descent Ride</div>
                  <div className="text-[11px] text-white/40 mt-1">25° velocity descent with infrared radar tracking.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                  <span className="text-[10px] text-[#E62A2A] font-bold block">STEP 04</span>
                  <div className="text-white font-medium mt-1">Exit Optical Beam</div>
                  <div className="text-[11px] text-white/40 mt-1">Discharge sensor verifies basin is clear.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                  <span className="text-[10px] text-[#E62A2A] font-bold block">STEP 05</span>
                  <div className="text-white font-medium mt-1">Gate Unlock</div>
                  <div className="text-[11px] text-white/40 mt-1">Next rider green status indicator illuminates.</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 font-mono text-[11px] pt-4 border-t border-white/10 text-white/70">
                <div><span className="text-white/40 block">WEATHER OVERRIDE:</span> Auto-Lock if Rain &gt; 0.5mm/h</div>
                <div><span className="text-white/40 block">VIDEO ARCHIVE:</span> 4K CCTV AI Fall Detection</div>
                <div><span className="text-white/40 block">DISCHARGE TIME:</span> 18.4s Average Ride Duration</div>
              </div>
            </div>
          )}

          {/* Master Site Plan & Geometric Matrices CAD (for Plate 01 or Plates 8..10) */}
          {(plateIdx === 0 || plateIdx >= 7) && (
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-[11px] text-white/50 border-b border-white/5 pb-2">
                <span>MASTER SITE PLAN & GEOMETRIC MATRICES</span>
                <span className="text-[#E62A2A]">AXONOMETRIC ORIENTATION // DATUM +0.00</span>
              </div>
              <svg viewBox="0 0 800 240" className="w-full h-auto text-white/80">
                <rect x="60" y="30" width="680" height="180" rx="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 120 180 L 260 60 L 540 60 L 680 180 Z" fill="rgba(230,42,42,0.04)" stroke="#E62A2A" strokeWidth="2" />
                <line x1="260" y1="60" x2="260" y2="180" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="540" y1="60" x2="540" y2="180" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="400" cy="120" r="36" fill="rgba(255,255,255,0.06)" stroke="white" strokeWidth="1.5" />
                <circle cx="400" cy="120" r="4" fill="#E62A2A" />
                <text x="320" y="125" fill="white" fontSize="11" fontFamily="monospace">CENTRAL PAVILION CORE</text>
                <text x="140" y="195" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">PRIMARY CIVIC ACCESS</text>
                <text x="560" y="195" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">LANDSCAPE BUFFER ZONE</text>
              </svg>
              <div className="grid grid-cols-3 gap-4 font-mono text-[11px] pt-4 border-t border-white/10 text-white/70">
                <div><span className="text-white/40 block">SPATIAL FOOTPRINT:</span> {project.specs.scale}</div>
                <div><span className="text-white/40 block">MATERIALITY:</span> {project.specs.medium}</div>
                <div><span className="text-white/40 block">TIMELINE:</span> {project.specs.duration}</div>
              </div>
            </div>
          )}
        </div>

        {/* Ambient Bottom Blueprint Footer */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-white/40 border-t border-white/10 pt-4">
          <div>CLIENT // {project.client}</div>
          <div className="text-[#E62A2A]">CONFIDENTIAL ARCHIVAL BLUEPRINT · LI CHENSHU STUDIO</div>
        </div>
      </div>
    );
  };

  const activePlate = activePlates[selectedPlateIndex] || activePlates[0];
  const activePlateUrl = (hasPhotoGallery && project.gallery[selectedPlateIndex]?.url) || project.heroImage;
  const activePlateCaption = activePlate?.tagline || project.title;
  const activePlateCategory = activePlate?.category || project.categoryName;
  const activeFallbackUrl = (hasPhotoGallery && project.gallery[selectedPlateIndex]?.fallbackUrl) || project.fallbackHeroImage;
  const hasPhotoForSelectedPlate = hasPhotoGallery
    ? Boolean(project.gallery[selectedPlateIndex]) && !failedImages[selectedPlateIndex]
    : selectedPlateIndex === 0 && !failedImages[0];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: STUDIO_EASE }}
        className="fixed inset-0 z-50 overflow-y-auto bg-[#040407] backdrop-blur-2xl custom-scroll"
      >
        {/* Floating Top Navigation Header */}
        <header className="sticky top-0 z-40 w-full flex items-center justify-between px-6 sm:px-12 py-3.5 bg-[#08080C]/90 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
            <span className="text-[#E62A2A] font-bold">
              MONOGRAPH // {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span>·</span>
            <span className="text-white/80 font-medium">{project.title}</span>
            <span className="hidden md:inline">·</span>
            <span className="text-white/50 hidden md:inline">{project.client}</span>
          </div>

          <div className="flex items-center gap-3">

            <div className="hidden sm:flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => prevProject && onSelectProject(prevProject.id)}
                disabled={!prevProject}
                className={`p-2 rounded-full border border-white/10 ${
                  prevProject ? 'hover:bg-white/10 text-white cursor-pointer' : 'opacity-20 cursor-not-allowed text-white/30'
                }`}
                title="Previous monograph (Left arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => nextProject && onSelectProject(nextProject.id)}
                disabled={!nextProject}
                className={`p-2 rounded-full border border-white/10 ${
                  nextProject ? 'hover:bg-white/10 text-white cursor-pointer' : 'opacity-20 cursor-not-allowed text-white/30'
                }`}
                title="Next monograph (Right arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-[#E62A2A] text-white font-mono text-xs uppercase tracking-widest transition-all cursor-pointer shadow-sm"
            >
              <span>Close Dossier</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ========================================================
            PART 1: [最炸的现场大图 / 效果图]
            Full Horizontal Width Panoramic Master Field Hero
            Spans edge-to-edge across the screen
            ======================================================== */}
        <section className="w-full relative bg-[#09090E] border-b border-white/15 overflow-hidden group">
          <div
            onClick={() => setLightboxIndex(selectedPlateIndex)}
            className="w-full h-[54vh] sm:h-[68vh] lg:h-[76vh] min-h-[420px] max-h-[860px] relative cursor-pointer overflow-hidden select-none"
            title="Click to inspect in full-screen high-res lightbox"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${project.id}-${selectedPlateIndex}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.28, ease: STUDIO_EASE }}
                className="w-full h-full"
              >
                {hasPhotoForSelectedPlate ? (
                  /* Authentic Photography Plate */
                  <img
                    key={activePlateUrl}
                    src={activePlateUrl}
                    alt={activePlateCaption}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (activeFallbackUrl && !e.currentTarget.src.endsWith(activeFallbackUrl)) {
                        e.currentTarget.src = activeFallbackUrl;
                      } else {
                        setFailedImages((prev) => ({ ...prev, [selectedPlateIndex]: true }));
                      }
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                  />
                ) : (
                  /* High-Res Vector Blueprint Drawing */
                  renderVectorBlueprint(selectedPlateIndex, false)
                )}
              </motion.div>
            </AnimatePresence>

            {/* Subtle Gradient Overlays for Photo View */}
            {hasPhotoForSelectedPlate && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-[#040407] via-transparent to-black/35 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
                <div className="absolute inset-0 grain-overlay opacity-25 pointer-events-none" />
              </>
            )}

            {/* Top Left: Monograph Category & Client Tag */}
            <div className="absolute top-6 left-6 sm:left-12 flex items-center gap-3">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/90 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20">
                {project.categoryName} · {project.client}
              </span>
            </div>

            {/* Top Right: Fullscreen Enlarge Affordance */}
            <div className="absolute top-6 right-6 sm:right-12 flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(selectedPlateIndex);
                }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-[#E62A2A] backdrop-blur-md border border-white/20 text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg"
              >
                <ZoomIn className="w-3.5 h-3.5 text-[#E62A2A] group-hover:text-white" />
                <span className="hidden sm:inline">Enlarge Visual Plate</span>
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* In-Hero Prev / Next Arrows */}
            <button
              onClick={handleHeroPrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white/80 hover:text-white backdrop-blur-md transition-all cursor-pointer opacity-0 group-hover:opacity-100"
              title="Previous visual plate"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={handleHeroNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white/80 hover:text-white backdrop-blur-md transition-all cursor-pointer opacity-0 group-hover:opacity-100"
              title="Next visual plate"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Bottom Left: Plate Indicator */}
            <div className="absolute bottom-5 sm:bottom-6 left-4 sm:left-12 right-4 sm:right-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pointer-events-none">
              <div className="max-w-4xl bg-black/75 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E62A2A] mb-1">
                  PLATE {String(selectedPlateIndex + 1).padStart(2, '0')} // {activePlateCategory}
                </div>
                <div className="font-mono text-[11px] sm:text-xs text-white/95 leading-relaxed whitespace-normal break-words">
                  {activePlateCaption}
                </div>
              </div>

              <div className="shrink-0 whitespace-nowrap font-mono text-[11px] sm:text-xs text-white/60 bg-black/75 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full">
                {selectedPlateIndex + 1} / {totalPlates} PLATES
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            [5-7张小图展示，点击小图可以放大观看]
            Interactive Thumbnail Strip Right Below Master Hero
            ======================================================== */}
        <div className="w-full bg-[#08080C] border-b border-white/15 px-4 sm:px-8 lg:px-12 py-5">
          <div className="max-w-[1500px] mx-auto">
            <div className="flex items-center justify-between mb-3.5 font-mono text-xs">
              <div className="flex items-center gap-2.5 text-white/70 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#E62A2A] animate-pulse" />
                <span className="font-semibold text-white">Visual Monograph Plates</span>
                <span className="text-white/30">({totalPlates} Dedicated Visual Plates)</span>
              </div>
              <div className="text-white/40 text-[11px] uppercase tracking-wider hidden sm:flex items-center gap-2">
                <ZoomIn className="w-3.5 h-3.5 text-[#E62A2A]" />
                <span>Click thumbnail to switch & inspect in high-res lightbox</span>
              </div>
            </div>

            {/* Thumbnails Grid */}
            <div
              className={`grid gap-3 sm:gap-4 ${
                totalPlates === 5
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
                  : totalPlates === 6 || totalPlates === 12 || totalPlates === 18
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6'
                  : totalPlates === 8
                  ? 'grid-cols-2 sm:grid-cols-4 md:grid-cols-8'
                  : totalPlates === 9
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-9'
                  : totalPlates === 10
                  ? 'grid-cols-2 sm:grid-cols-5 md:grid-cols-10'
                  : totalPlates <= 4
                  ? 'grid-cols-2 sm:grid-cols-4'
                  : 'grid-cols-2 sm:grid-cols-4 md:grid-cols-7'
              }`}
            >
              {activePlates.map((p, idx) => {
                const isSelected = selectedPlateIndex === idx;
                const thumbPhoto = hasPhotoGallery && project.gallery[idx] ? project.gallery[idx] : null;
                const thumbLabel = thumbPhoto ? thumbPhoto.category : p.label;

                return (
                  <button
                    key={idx}
                    onClick={() => handleThumbnailClick(idx)}
                    className={`group/thumb relative rounded-xl overflow-hidden border transition-all duration-300 aspect-[16/10] bg-[#0E0E14] cursor-pointer text-left ${
                      isSelected
                        ? 'border-[#E62A2A] ring-2 ring-[#E62A2A]/50 scale-[1.02] shadow-lg shadow-[#E62A2A]/20'
                        : 'border-white/15 hover:border-white/50 opacity-75 hover:opacity-100 hover:scale-[1.02]'
                    }`}
                    title={`Plate ${idx + 1}: ${thumbLabel} (Click to inspect)`}
                  >
                    {((thumbPhoto || idx === 0) && !failedImages[idx]) ? (
                      <img
                        key={thumbPhoto ? thumbPhoto.url : project.heroImage}
                        src={thumbPhoto ? thumbPhoto.url : project.heroImage}
                        alt={thumbPhoto ? thumbPhoto.caption : project.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const fb = thumbPhoto?.fallbackUrl || (idx === 0 ? project.fallbackHeroImage : undefined);
                          if (fb && !e.currentTarget.src.endsWith(fb)) {
                            e.currentTarget.src = fb;
                          } else {
                            setFailedImages((prev) => ({ ...prev, [idx]: true }));
                          }
                        }}
                        className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full p-2 flex flex-col justify-between relative overflow-hidden ${
                        isTmall
                          ? 'bg-gradient-to-br from-[#064e3b]/95 via-[#022c22] to-[#040407] border border-emerald-500/30'
                          : isGuochao
                          ? 'bg-gradient-to-br from-[#451010]/95 via-[#1c0808] to-[#080404] border border-red-500/30'
                          : isGuochaoRetail
                          ? 'bg-gradient-to-br from-[#7c2d12]/95 via-[#431407] to-[#0c0402] border border-orange-500/30'
                          : 'bg-[#0B0B12]'
                      }`}>
                        {/* Mini Blueprint Graphic */}
                        <div
                          className="absolute inset-0 opacity-20 pointer-events-none"
                          style={{
                            backgroundImage:
                              'linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                            backgroundSize: '12px 12px',
                          }}
                        />
                        <div className="relative z-10 flex items-center justify-between font-mono text-[8px] text-white/70">
                          <span className={isTmall ? "text-emerald-400 font-bold" : isGuochao ? "text-red-400 font-bold" : isGuochaoRetail ? "text-orange-400 font-bold" : ""}>
                            {isTmall ? "🌿 SEEDING" : isGuochao ? "🏛️ EXPO" : isGuochaoRetail ? "🏬 POP-UP" : "CAD-DWG"}
                          </span>
                          <span className={isTmall ? "text-emerald-300 font-bold" : isGuochao ? "text-amber-300 font-bold" : isGuochaoRetail ? "text-orange-300 font-bold" : "text-[#E62A2A]"}>
                            P.{idx + 1}
                          </span>
                        </div>
                        <div className="relative z-10 my-auto text-center font-mono text-[9px] text-white/95 font-bold uppercase truncate px-1">
                          {p.label}
                        </div>
                        <div className={`relative z-10 font-mono text-[8px] truncate ${
                          isTmall ? "text-emerald-300/80" : isGuochao ? "text-amber-300/80" : isGuochaoRetail ? "text-orange-300/80" : "text-white/40"
                        }`}>
                          {p.category}
                        </div>
                      </div>
                    )}
                    {!failedImages[idx] && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    )}

                    {/* Active Red Tag or Index */}
                    <div className="absolute top-1.5 left-1.5 font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-white/90">
                      #{String(idx + 1).padStart(2, '0')}
                    </div>

                    {/* Magnify Icon on Hover */}
                    <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 text-white/70 group-hover/thumb:text-[#E62A2A] group-hover/thumb:scale-110 transition-all opacity-0 group-hover/thumb:opacity-100">
                      <ZoomIn className="w-3 h-3" />
                    </div>

                    {/* Thumbnail Caption */}
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 font-mono text-[10px] text-white/90 truncate">
                      {thumbLabel}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================
            EDITORIAL DOSSIER FLOW (STRICT 8-PART STRUCTURE)
            ======================================================== */}
        <article className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
          {/* ========================================================
              PART 2 & 3: TITLE & QUIET METADATA ROW
              项目名（大标题）
              时间 · 地点 · 客户 · 我的角色（小字一行）
              ======================================================== */}
          <div className="border-b border-white/15 pb-8">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.02]">
              {project.title}
            </h1>

            {/* Quiet metadata line */}
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm text-white/60 tracking-wider">
              <span className="text-white">{project.year}</span>
              <span className="text-white/30">·</span>
              <span className="text-white">{project.location}</span>
              <span className="text-white/30">·</span>
              <span className="text-white font-medium">{project.client}</span>
              <span className="text-white/30">·</span>
              <span className="text-[#E62A2A] font-semibold">{project.role}</span>
            </div>
          </div>

          {/* ========================================================
              PART 4: 一句话钩子（这个项目最有意思的点）
              The Punchy Hook
              ======================================================== */}
          <div className="py-8 sm:py-12 border-b border-white/10">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#E62A2A] mb-3">
              THE PROVOCATION // HOOK
            </div>
            <p className="font-editorial text-2xl sm:text-4xl text-white font-normal leading-[1.3] text-balance max-w-5xl">
              "{project.hook}"
            </p>
          </div>

          {/* ========================================================
              PART 5, 6, 7: BACKGROUND / WHAT I DID / OUTCOME
              The 3 Structural Pillars (Visual-Forward Layout)
              ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-12 border-b border-white/10">
            {/* Background: 2-3 sentences (Col-span-4) */}
            <div className="lg:col-span-4 space-y-4 pr-4">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/40 pb-2 border-b border-white/10 flex items-center justify-between">
                <span>01 // Context</span>
                <span className="text-[10px] text-white/20">THE PROBLEM</span>
              </div>
              <p className="text-sm text-white/80 font-light leading-relaxed">
                {project.background}
              </p>
            </div>

            {/* What I Did: 4-5 sentences (Col-span-5) */}
            <div className="lg:col-span-5 space-y-4 px-0 lg:px-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#E62A2A] pb-2 border-b border-white/10 flex items-center justify-between">
                <span>02 // What I Did</span>
                <span className="text-[10px] text-[#E62A2A]/50">SPATIAL EXECUTION</span>
              </div>
              <p className="text-sm text-white/90 font-light leading-relaxed">
                {project.whatIDid}
              </p>
            </div>

            {/* Outcome: 1-2 sentences (Col-span-3) */}
            <div className="lg:col-span-3 space-y-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 pl-0 lg:pl-4">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/40 pb-2 border-b border-white/10 flex items-center justify-between">
                <span>03 // Outcome</span>
                <span className="text-[10px] text-white/20">MEASURABLE RESULT</span>
              </div>
              <p className="text-sm text-white font-medium leading-relaxed">
                {project.outcome}
              </p>

              {/* Quick Specs Box */}
              <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 font-mono text-[11px] text-white/60">
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#E62A2A]" />
                  <span>{project.specs.scale}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#E62A2A]" />
                  <span>{project.specs.medium}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#E62A2A]" />
                  <span>{project.specs.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              PART 8: [标签] (Clean unboxed tags)
              ======================================================== */}
          <div className="py-6 flex flex-wrap items-center gap-3 font-mono text-xs text-white/50 border-b border-white/10">
            <span className="text-white/30 uppercase tracking-widest mr-2">INDEX TAGS:</span>
            {project.tags.map((tag, idx) => (
              <span key={idx} className="flex items-center gap-3">
                <span className="text-white/80 hover:text-white transition-colors">#{tag}</span>
                {idx < project.tags.length - 1 && <span className="text-white/20">·</span>}
              </span>
            ))}
          </div>

          {/* Bottom Next/Prev Monograph Navigator */}
          <div className="pt-12 pb-20 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
            {prevProject ? (
              <button
                onClick={() => onSelectProject(prevProject.id)}
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <div className="text-[10px] text-white/30 uppercase">Previous Monograph</div>
                  <div className="font-bold text-white">{prevProject.title}</div>
                </div>
              </button>
            ) : <div />}

            {nextProject ? (
              <button
                onClick={() => onSelectProject(nextProject.id)}
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group cursor-pointer text-right"
              >
                <div className="text-right">
                  <div className="text-[10px] text-white/30 uppercase">Next Monograph</div>
                  <div className="font-bold text-white">{nextProject.title}</div>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : <div />}
          </div>
        </article>
      </motion.div>

      {/* ========================================================
          FULLSCREEN LIGHTBOX ZOOM MODAL
          (点击小图可以放大观看)
          ======================================================== */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-60 bg-black/98 backdrop-blur-3xl p-4 sm:p-6 lg:p-8 flex flex-col justify-between items-center animate-in fade-in duration-200 select-none"
        >
          {/* Top Bar inside Lightbox */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-7xl flex justify-between items-center text-white/70 font-mono text-xs pb-3 border-b border-white/10"
          >
            <div className="flex items-center gap-3">
              <span className="text-[#E62A2A] font-bold uppercase tracking-widest">
                PLATE {String(lightboxIndex + 1).padStart(2, '0')} OF {String(totalPlates).padStart(2, '0')}
              </span>
              <span>·</span>
              <span className="uppercase tracking-widest text-white/60">
                {activePlates[lightboxIndex]?.category || project.categoryName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLightboxIndex(null)}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-[#E62A2A] text-white cursor-pointer transition-colors text-xs font-mono uppercase tracking-widest"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Main High-Resolution View with Left/Right Arrows */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 w-full max-w-7xl flex items-center justify-center my-4 overflow-hidden"
          >
            {/* Prev Arrow */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : totalPlates - 1))}
              className="absolute left-2 sm:left-4 z-10 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-[#E62A2A] border border-white/20 text-white transition-all cursor-pointer shadow-2xl"
              title="Previous plate (Left arrow key)"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev !== null && prev < totalPlates - 1 ? prev + 1 : 0))}
              className="absolute right-2 sm:right-4 z-10 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-[#E62A2A] border border-white/20 text-white transition-all cursor-pointer shadow-2xl"
              title="Next plate (Right arrow key)"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Enlarged Plate */}
            <div className="max-h-[74vh] w-full max-w-6xl h-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0A0A0F]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`lb-${project.id}-${lightboxIndex}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: STUDIO_EASE }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {(hasPhotoGallery ? Boolean(project.gallery[lightboxIndex]) && !failedImages[lightboxIndex] : lightboxIndex === 0 && !failedImages[0]) ? (
                    <img
                      key={hasPhotoGallery && project.gallery[lightboxIndex] ? project.gallery[lightboxIndex].url : project.heroImage}
                      src={hasPhotoGallery && project.gallery[lightboxIndex] ? project.gallery[lightboxIndex].url : project.heroImage}
                      alt={hasPhotoGallery && project.gallery[lightboxIndex] ? project.gallery[lightboxIndex].caption : project.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const fb = (hasPhotoGallery && project.gallery[lightboxIndex]?.fallbackUrl) || project.fallbackHeroImage;
                        if (fb && !e.currentTarget.src.endsWith(fb)) {
                          e.currentTarget.src = fb;
                        } else {
                          setFailedImages((prev) => ({ ...prev, [lightboxIndex]: true }));
                        }
                      }}
                      className="max-h-[72vh] max-w-[88vw] object-contain"
                    />
                  ) : (
                    renderVectorBlueprint(lightboxIndex, true)
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Bar: Caption + Quick Thumbnail Bar inside Lightbox */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-7xl flex flex-col items-center gap-3 pt-3 border-t border-white/10"
          >
            {/* Caption */}
            <div className="font-mono text-[11px] sm:text-xs text-white/90 tracking-wide leading-relaxed text-center max-w-5xl px-2">
              {activePlates[lightboxIndex]?.tagline || project.title}
            </div>

            {/* Thumbnail Strip inside Lightbox */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 custom-scroll">
              {activePlates.map((thumb, tIdx) => {
                const lbThumb = hasPhotoGallery && project.gallery[tIdx] ? project.gallery[tIdx] : null;
                const lbLabel = lbThumb ? lbThumb.category : thumb.label;

                return (
                  <button
                    key={tIdx}
                    onClick={() => {
                      setLightboxIndex(tIdx);
                      setSelectedPlateIndex(tIdx);
                    }}
                    className={`w-16 sm:w-20 h-11 rounded-md overflow-hidden border transition-all cursor-pointer shrink-0 ${
                      lightboxIndex === tIdx
                        ? 'border-[#E62A2A] ring-2 ring-[#E62A2A]/50 scale-105'
                        : 'border-white/20 opacity-50 hover:opacity-100'
                    }`}
                    title={lbLabel}
                  >
                    {((lbThumb || tIdx === 0) && !failedImages[tIdx]) ? (
                      <img
                        src={lbThumb ? lbThumb.url : project.heroImage}
                        alt={lbThumb ? lbThumb.caption : project.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const fb = lbThumb?.fallbackUrl || project.fallbackHeroImage;
                          if (fb && !e.currentTarget.src.endsWith(fb)) {
                            e.currentTarget.src = fb;
                          } else {
                            setFailedImages((prev) => ({ ...prev, [tIdx]: true }));
                          }
                        }}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#11111B] flex flex-col items-center justify-center font-mono text-[8px] text-white/80 uppercase">
                        <span className="text-[#E62A2A]">#{tIdx + 1}</span>
                        <span className="truncate px-1">{thumb.label}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
