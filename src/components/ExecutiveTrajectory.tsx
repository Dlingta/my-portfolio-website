import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CAPABILITY_PILLARS, EXECUTIVE_BIO, PARTNER_SECTORS } from '../data/portfolioData';
import { ArrowLeft, ArrowRight, ArrowUpRight, Compass, Cpu, Layers, ShieldCheck } from 'lucide-react';
import { Reveal, STUDIO_EASE } from './MotionPrimitives';

interface ExecutiveTrajectoryProps {
  onOpenCommission: () => void;
}

const PILLAR_ICONS: Record<string, typeof Compass> = {
  strategy: Compass,
  design: Cpu,
  engineering: Layers,
  delivery: ShieldCheck,
};

interface StageVisualPlate {
  src: string;
  alt: string;
  tag: string;
  caption: string;
}

interface StageVisualConfig {
  shortTitle: string;
  headlineStat: string;
  headlineUnit: string;
  plates: StageVisualPlate[];
}

const STAGE_VISUALS: Record<string, StageVisualConfig> = {
  strategy: {
    shortTitle: 'Tender Strategy',
    headlineStat: '80%',
    headlineUnit: 'Competitive Bid Win Rate',
    plates: [
      {
        src: '/assets/aistudio/The_Door_of_Revolving_Sequence_dia_a2d54472.jpg',
        alt: 'Xintiandi Art Odyssey Axonometric Circulation Diagram',
        tag: 'Site Morphology Diagram',
        caption: 'Wuhan Xintiandi 20th Anniversary — 20-site pedestrian circulation & gate array planning',
      },
      {
        src: '/assets/aistudio/The_Door_of_Block___Sway_02_0d49d8af.jpg',
        alt: 'Monumental 10m Arch Deployment at Wuhan Xintiandi',
        tag: 'Built Civic Anchor',
        caption: 'The Door of Block & Sway — 10m interactive archway translating pitch concept to plaza landmark',
      },
    ],
  },
  design: {
    shortTitle: 'Parametric & Media',
    headlineStat: '750 m²',
    headlineUnit: 'Real-Time AI Media Canopy',
    plates: [
      {
        src: '/assets/aistudio/12_DSC02263-___d4c15eaa.jpg',
        alt: 'The New Observer AI Ceiling Canopy and Cybernetic Sculpture',
        tag: 'Interactive Scenography',
        caption: 'Chongqing Starmall 68 — suspended cybernetic sculpture synced with real-time oceanic LED dome',
      },
      {
        src: '/assets/aistudio/DJI_0311_1_4c2f0a7a.jpg',
        alt: 'Dive in Light Interactive Plaza DMX Array Aerial',
        tag: 'Participatory Light Grid',
        caption: 'Wuhan Tiandi — WeChat dialect engine driving radial DMX plaza light architecture',
      },
    ],
  },
  engineering: {
    shortTitle: 'Structural Engineering',
    headlineStat: '14 m',
    headlineUnit: 'Tensioned Cantilever Span',
    plates: [
      {
        src: '/assets/aistudio/______02_4c35b7d7.jpg',
        alt: 'Dive in Summer 14-meter Tensioned Membrane Canopy Aerial',
        tag: 'Structural Cantilever',
        caption: 'Dive in Summer — wind-calibrated 14m cantilevered membrane roof & modular steel truss',
      },
      {
        src: '/assets/aistudio/RDUVdia2_compressed_2f23052e.jpg',
        alt: 'Modular Exhibition Fixture Axonometric Engineering Taxonomy',
        tag: 'Fabrication Taxonomy',
        caption: 'Red Dot Design Museum — reconfigurable aluminum extrusion & birch joinery modules',
      },
    ],
  },
  delivery: {
    shortTitle: 'Turnkey Delivery',
    headlineStat: '0',
    headlineUnit: 'Safety Incidents · 5 Years',
    plates: [
      {
        src: '/assets/aistudio/_____202409091506553_upscayl_4x_ultramix_balanced_30763bd4.png',
        alt: 'Red Dot Design Museum Vermillion Ribbon Staircase Turnaround',
        tag: '45-Day Museum Handover',
        caption: 'Xiamen Red Dot Museum — emergency construction turnaround from steel rib fabrication to opening',
      },
      {
        src: '/assets/aistudio/DSC08721_69440173.jpg',
        alt: 'Moutai Cultural Experience Hall Multimedia Cosmos',
        tag: '1,800 m² Flagship Handover',
        caption: 'Kunming Moutai Cultural Hall — nine-chapter multi-sensory pavilion delivered end-to-end',
      },
    ],
  },
};

const CREDENTIAL_HIGHLIGHTS = [
  { value: '20+', label: 'Turnkey Commissions' },
  { value: '80%', label: 'Tender Win Rate' },
  { value: '10–20', label: 'Specialist Squad' },
  { value: '0', label: 'Safety Incidents · 5 Yrs' },
];

const PARTNER_LOGOS = [
  { src: '/assets/aistudio/character_01_8d383750.png', alt: 'EIN' },
  { src: '/assets/aistudio/character_02_abe5bfd4.png', alt: 'INXX' },
  { src: '/assets/aistudio/character_03_8af8a9ea.png', alt: 'Juhuasuan 聚划算' },
  { src: '/assets/aistudio/character_04_cb7066b8.png', alt: 'Flagship Partner 04' },
  { src: '/assets/aistudio/character_05_57818560.png', alt: 'Flagship Partner 05' },
  { src: '/assets/aistudio/character_06_21ceb4d0.png', alt: 'Flagship Partner 06' },
  { src: '/assets/aistudio/character_07_23aedc8d.png', alt: 'Flagship Partner 07' },
  { src: '/assets/aistudio/character_08_252789b8.png', alt: 'Flagship Partner 08' },
  { src: '/assets/aistudio/character_09_470f3249.png', alt: 'Flagship Partner 09' },
  { src: '/assets/aistudio/character_10_1661666e.png', alt: 'Flagship Partner 10' },
  { src: '/assets/aistudio/character_11_30809c7f.png', alt: 'Flagship Partner 11' },
  { src: '/assets/aistudio/character_12_8cb2a633.png', alt: 'Flagship Partner 12' },
  { src: '/assets/aistudio/character_13_61dcd049.png', alt: 'Flagship Partner 13' },
  { src: '/assets/aistudio/character_14_c91e9199.png', alt: 'Flagship Partner 14' },
  { src: '/assets/aistudio/character_15_443ce185.png', alt: 'Flagship Partner 15' },
  { src: '/assets/aistudio/character_16_6f7cdbeb.png', alt: 'Flagship Partner 16' },
  { src: '/assets/aistudio/character_17_9f37644b.png', alt: 'Flagship Partner 17' },
  { src: '/assets/aistudio/character_18_f234578a.png', alt: 'Greentown 绿城集团' },
  { src: '/assets/aistudio/character_19_861374e7.png', alt: 'HKRI Taikoo Hui 兴业太古汇' },
  { src: '/assets/aistudio/character_20_fe2a5b9a.png', alt: 'Huafa Group 华发集团' },
  { src: '/assets/aistudio/character_21_ef1eb7b4.png', alt: 'UCCA' },
  { src: '/assets/aistudio/character_22_07cc934f.png', alt: 'Modern Sky 摩登天空' },
  { src: '/assets/aistudio/character_23_6a93823e.png', alt: 'Shanghai Fashion Week 上海时装周' },
  { src: '/assets/aistudio/character_24_85bd1893.png', alt: 'BIE 别的' },
  { src: '/assets/aistudio/character_25_f99c0409.png', alt: 'Flagship Partner 25' },
];

export function ExecutiveTrajectory({ onOpenCommission }: ExecutiveTrajectoryProps) {
  const [activePillarId, setActivePillarId] = useState<string>(CAPABILITY_PILLARS[0].id);
  const [activePlateIdx, setActivePlateIdx] = useState<number>(0);

  const activeIdx = Math.max(
    0,
    CAPABILITY_PILLARS.findIndex((p) => p.id === activePillarId)
  );
  const activePillar = CAPABILITY_PILLARS[activeIdx] ?? CAPABILITY_PILLARS[0];
  const stageVisual = STAGE_VISUALS[activePillar.id] ?? STAGE_VISUALS.strategy;
  const activePlate = stageVisual.plates[activePlateIdx] ?? stageVisual.plates[0];

  const handleSelectStage = (id: string) => {
    setActivePillarId(id);
    setActivePlateIdx(0);
  };

  const handleStepStage = (delta: number) => {
    const nextIdx = (activeIdx + delta + CAPABILITY_PILLARS.length) % CAPABILITY_PILLARS.length;
    handleSelectStage(CAPABILITY_PILLARS[nextIdx].id);
  };

  return (
    <section
      id="trajectory"
      className="py-24 sm:py-36 border-t border-white/10 bg-[#060609]"
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 space-y-16 sm:space-y-20">
        {/* 1. Top Editorial Header: Concise Headline, Bio, Credibility Strip & Large Centered Portrait */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pb-14 border-b border-white/10">
          {/* Left: Short Punchy Title, Bio, 4-Stat Strip & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#E62A2A]">
                Capabilities &amp; Executive Stewardship
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.04]">
                Concept to Granite.
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base text-white/60 font-editorial">
                <span className="text-white font-medium not-italic font-sans">Li Chenshu</span>
                <span aria-hidden="true">·</span>
                <span>{EXECUTIVE_BIO.title}</span>
              </div>
              <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-2xl">
                {EXECUTIVE_BIO.intro}
              </p>
            </div>

            {/* Compact 4-Column Credibility Ledger */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border border-white/10 rounded-xl bg-[#0A0A0F] divide-x divide-y sm:divide-y-0 divide-white/10 overflow-hidden">
              {CREDENTIAL_HIGHLIGHTS.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`p-4 sm:p-5 ${idx < 2 ? 'border-t-0' : ''}`}
                >
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] text-white/55 font-mono tracking-wide leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Primary Actions */}
            <div className="pt-1 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenCommission}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E62A2A] hover:bg-[#ff3b3b] text-white text-xs font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E62A2A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060609]"
              >
                <span>Request Pitch or Commission</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="mailto:lichenshu@email.com"
                className="inline-flex items-center px-4 py-2.5 text-xs font-mono text-white/75 hover:text-white border-b border-white/25 hover:border-white transition-colors whitespace-nowrap shrink-0"
              >
                lichenshu@email.com
              </a>
            </div>
          </div>

          {/* Right: Large Cropped Architectural Monochrome Portrait (Subject Centered) */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full max-w-[460px] mx-auto lg:max-w-none rounded-2xl overflow-hidden border border-white/15 bg-[#0A0A0F] shadow-2xl group">
              <div className="w-full h-full scale-[1.22] origin-[49%_88%] transition-transform duration-700 ease-out group-hover:scale-[1.26]">
                <img
                  src="/assets/aistudio/_____2026-11-09_121956_814_a698295c.jpg"
                  alt="Li Chenshu — Spatial Director & Curator"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[49%_50%]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#060609]/85 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-white/80 pointer-events-none">
                <span>LI CHENSHU</span>
                <span className="text-[#E62A2A] font-semibold">SHANGHAI</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 2. Primary Capability Matrix: Interactive Visual Stage Architecture */}
        <Reveal delay={0.08} className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#E62A2A]">
                Execution Workflow · 01–04
              </p>
              <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Four-Stage Execution Architecture
              </h3>
            </div>
            <span className="text-xs text-white/50">
              Select a stage to inspect site blueprints, media &amp; delivery scope
            </span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0A0A0F] overflow-hidden">
            {/* Compact 4-Stage Pipeline Selector */}
            <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-white/10 divide-x divide-y lg:divide-y-0 divide-white/10 bg-[#08080D]">
              {CAPABILITY_PILLARS.map((pillar) => {
                const Icon = PILLAR_ICONS[pillar.id] ?? Compass;
                const stageMeta = STAGE_VISUALS[pillar.id];
                const isActive = pillar.id === activePillar.id;

                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => handleSelectStage(pillar.id)}
                    aria-pressed={isActive}
                    className={`relative text-left px-5 py-4 sm:px-6 sm:py-5 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E62A2A] ${
                      isActive
                        ? 'bg-white/[0.04]'
                        : 'bg-transparent hover:bg-white/[0.02]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="pillar-active-bar"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E62A2A]"
                      />
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-mono text-xs tabular-nums tracking-widest ${
                          isActive ? 'text-[#E62A2A] font-bold' : 'text-white/40'
                        }`}
                      >
                        Stage {pillar.index}
                      </span>
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-[#E62A2A]' : 'text-white/35'
                        }`}
                      />
                    </div>
                    <div className="mt-2 font-display text-sm sm:text-base font-bold text-white tracking-tight truncate">
                      {stageMeta?.shortTitle ?? pillar.title}
                    </div>
                    <div className="mt-0.5 text-xs text-white/45 truncate">
                      {stageMeta?.headlineStat} · {stageMeta?.headlineUnit}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Split Viewport: Visual Media Frame + Spacious Single-Stage Dossier */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left: Large Visual Proof & Blueprint Flipper (7/12) */}
              <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[460px] overflow-hidden bg-[#0E0E15] border-b lg:border-b-0 lg:border-r border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activePillar.id}-${activePlateIdx}`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.42, ease: STUDIO_EASE }}
                    className="absolute inset-0 media-placeholder"
                  >
                    <img
                      src={activePlate.src}
                      alt={activePlate.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Contrast scrim for legible caption & headline metric */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060609]/95 via-[#060609]/30 to-black/35"
                />

                {/* Top Bar: Quiet Plate Label + Interactive Plate Switcher (01 / 02) */}
                <div className="relative z-10 flex items-center justify-between gap-4 p-5 sm:p-6">
                  <div className="text-xs font-mono tracking-wide text-white/85">
                    <span className="text-[#E62A2A] font-semibold">{activePlate.tag}</span>
                    <span className="mx-2 text-white/30" aria-hidden="true">/</span>
                    <span className="text-white/75">{activePillar.index} of 04</span>
                  </div>

                  <div
                    role="group"
                    aria-label="Stage visual plates"
                    className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#060609]/80 backdrop-blur-md border border-white/15"
                  >
                    {stageVisual.plates.map((plate, idx) => (
                      <button
                        key={plate.src}
                        type="button"
                        onClick={() => setActivePlateIdx(idx)}
                        className={`px-2.5 py-1 rounded-md font-mono text-[11px] tabular-nums transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          activePlateIdx === idx
                            ? 'bg-white text-[#08080C] font-bold'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        0{idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Dominant Quantitative Anchor & Concise Caption */}
                <div className="absolute bottom-0 inset-x-0 z-10 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`caption-${activePillar.id}-${activePlateIdx}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.28, ease: STUDIO_EASE }}
                      className="max-w-lg"
                    >
                      <p className="text-xs sm:text-sm text-white/90 font-light leading-relaxed">
                        {activePlate.caption}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="shrink-0 sm:text-right">
                    <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tabular-nums tracking-tight leading-none">
                      {stageVisual.headlineStat}
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-[#E62A2A] uppercase tracking-wider">
                      {stageVisual.headlineUnit}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Spacious Single-Stage Dossier (5/12) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillar.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: STUDIO_EASE }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="text-xs font-mono text-[#E62A2A] tracking-wide">
                        {activePillar.index} · {activePillar.discipline}
                      </div>
                      <h4 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                        {activePillar.title}
                      </h4>
                      <p className="mt-3 text-sm sm:text-base text-white/75 font-light leading-relaxed">
                        {activePillar.summary}
                      </p>
                    </div>

                    {/* Clean Numbered Deliverables (Whitespace + Hairlines, No Clutter) */}
                    <div className="border-t border-white/10 pt-5 space-y-3">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-white/40">
                        Key Deliverables
                      </div>
                      <ul className="divide-y divide-white/10">
                        {activePillar.deliverables.map((item, idx) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.26,
                              delay: idx * 0.05,
                              ease: STUDIO_EASE,
                            }}
                            className="py-2.5 flex items-baseline gap-3 text-xs sm:text-sm text-white/85 leading-relaxed"
                          >
                            <span className="font-mono text-[11px] text-[#E62A2A] tabular-nums shrink-0">
                              0{idx + 1}
                            </span>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Compact Technical Ledger */}
                    <div className="border-t border-white/10 pt-5 space-y-3 text-xs">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-white/40">
                          Technical Stack
                        </span>
                        <span className="text-white/90 font-medium">{activePillar.tooling}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-white/40">
                          Squad &amp; Benchmark
                        </span>
                        <span className="text-white/80">
                          {activePillar.squadFocus}
                          <span className="mx-2 text-white/30" aria-hidden="true">·</span>
                          <span className="text-white/95 font-medium">{activePillar.benchmark}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Stage Navigation Controls */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => handleStepStage(-1)}
                    className="inline-flex items-center gap-2 text-xs font-mono text-white/65 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <span className="font-mono text-[11px] text-white/40 tabular-nums">
                    Stage {activePillar.index} / 0{CAPABILITY_PILLARS.length}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleStepStage(1)}
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#E62A2A] hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3. Bottom Editorial Band: Specialist Squad & Categorized Partner Roster */}
        <Reveal delay={0.12} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-4">
          {/* Left: Clean Editorial Squad Table */}
          <div className="lg:col-span-5">
            <div className="mb-6">
              <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                Deployable Specialist Squad
              </h3>
              <p className="mt-1 text-xs text-white/50">
                Modular 10–20 person engineering, media, and site execution unit scaled per brief.
              </p>
            </div>

            <div className="border-t border-b border-white/10 divide-y divide-white/10">
              {EXECUTIVE_BIO.squadMatrix.map((item) => (
                <div
                  key={item.label}
                  className="py-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="text-sm text-white/85 font-medium">{item.label}</div>
                    <div className="text-xs text-white/45 mt-0.5">Core Deployable Discipline</div>
                  </div>
                  <div className="font-mono text-base sm:text-lg font-bold text-white tabular-nums shrink-0">
                    {item.count}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Categorized Flagship Partners (Unboxed Clean Typography) */}
          <div className="lg:col-span-7">
            <div className="mb-6">
              <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                Trusted by Flagship Partners
              </h3>
              <p className="mt-1 text-xs text-white/50">
                Direct commissions across commercial developers, civic bureaus, museums, and luxury houses.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 border-t border-white/10 pt-6">
              {PARTNER_SECTORS.map((group) => (
                <div key={group.sector}>
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#E62A2A] mb-3">
                    {group.sector}
                  </h4>
                  <ul className="space-y-1.5 text-sm text-white/75">
                    {group.partners.map((partner) => (
                      <li
                        key={partner}
                        className="hover:text-white transition-colors leading-relaxed"
                      >
                        {partner}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 4. Flagship Partner Identity Marquee (Single-Row Infinite Showcase) */}
        <Reveal delay={0.14} className="pt-10 border-t border-white/10 space-y-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#E62A2A]">
              Partner Marks · Visual Archive
            </p>
            <h3 className="mt-1.5 font-display text-lg sm:text-xl font-bold text-white tracking-tight">
              Selected Client &amp; Institutional Identities
            </h3>
          </div>

          <div className="relative overflow-hidden py-1">
            {/* Edge fade masks matching section background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-[#060609] to-transparent z-10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-[#060609] to-transparent z-10"
            />

            <div className="marquee-track overflow-hidden">
              <div className="flex w-max animate-partner-marquee-left">
                {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, idx) => (
                  <div
                    key={`logo-${idx}-${logo.src}`}
                    className="mr-2.5 sm:mr-3 shrink-0"
                  >
                    <div className="h-11 sm:h-12 w-28 sm:w-32 px-3.5 sm:px-4 rounded-lg bg-[#EFECE6] hover:bg-white transition-colors duration-300 border border-white/15 flex items-center justify-center shadow-sm">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        loading="eager"
                        decoding="async"
                        className="max-h-6 sm:max-h-7 w-auto max-w-full object-contain select-none pointer-events-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
