import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, X } from 'lucide-react';
import { Reveal, CountUpValue, STUDIO_EASE } from './MotionPrimitives';

interface MetricItem {
  number: string;
  unit: string;
  title: string;
  desc: string;
  proof: string[];
}

const METRICS: MetricItem[] = [
  {
    number: '20',
    unit: '+',
    title: 'Turnkey Stewardship',
    desc: 'Full life-cycle execution from conceptual blueprint to structural sign-off, without aesthetic dilution.',
    proof: [
      'Zero safety incidents or structural compromises across 5 years of operations',
      'Direct commissions for Swire Properties, Hongkong Land, Shui On & UCCA Lab',
      'Integrated supply chain covering 316L steel, kinetic actuators & custom optical glass',
    ],
  },
  {
    number: '80',
    unit: '%',
    title: 'Competitive Tender Capture',
    desc: 'Proven track record winning high-stakes architectural pitches against tier-1 design institutes.',
    proof: [
      'First prize in Yibin State Capital 70-meter cliff landmark national competition',
      'Won Swire Properties Taikoo Hui evening activation tender over 4 rival agencies',
      'Mastered turning demanding site constraints into winning strategic advantages',
    ],
  },
  {
    number: '10–20',
    unit: '',
    title: 'Disciplinary Squad Matrix',
    desc: 'Dynamic squad orchestrating parametric engineers, new media artists, fabricators, and safety inspectors.',
    proof: [
      'Real-time coordination of heavy 6-axis robotics (KUKA) and custom LED curvatures',
      'Dedicated on-site rapid turnaround unit for 48-hour structural revisions',
      'Direct partnerships with top non-standard fabrication yards across China',
    ],
  },
  {
    number: '5',
    unit: 'Yrs',
    title: 'Executive Direction',
    desc: 'Battle-tested experience delivering city-scale monuments on strict deadlines and zero-defect baselines.',
    proof: [
      'Led teams across Shanghai, Chongqing, Wuhan, Nanjing, Hangzhou, and Chengdu',
      'Mastery of municipal permitting, fire codes, wind-tunnel tests, and crowd flow',
      'Consistent translation of artistic vision into measurable retail & civic dividends',
    ],
  },
];

export function MetricsSection() {
  const [selectedMetric, setSelectedMetric] = useState<MetricItem | null>(null);

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-12 max-w-[1600px] mx-auto border-t border-white/10">
      <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="font-mono text-xs tracking-[0.28em] uppercase text-white/50 block mb-2">
            Measurable Stewardship
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Rigorous Proof in Numbers
          </h2>
        </div>
        <p className="font-mono text-xs text-white/45 tracking-wide">
          Select any indicator to inspect methodology &amp; verified audit cases
        </p>
      </Reveal>

      {/* Unified Architectural 4-Column Ledger */}
      <Reveal delay={0.08}>
        <div className="rounded-2xl border border-white/10 bg-[#0A0A0F] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10 overflow-hidden">
          {METRICS.map((m, index) => {
            const isSelected = selectedMetric?.title === m.title;
            return (
              <button
                key={m.title}
                type="button"
                onClick={() => setSelectedMetric(isSelected ? null : m)}
                aria-expanded={isSelected}
                className={`relative text-left p-7 sm:p-8 transition-colors duration-200 cursor-pointer flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E62A2A] ${
                  isSelected ? 'bg-white/[0.05]' : 'hover:bg-white/[0.025]'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="metric-active-bar"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                    className="absolute top-0 left-0 right-0 h-[2px] bg-[#E62A2A]"
                  />
                )}
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="font-display text-5xl sm:text-6xl font-extrabold text-white tracking-tighter leading-none tabular-nums">
                      <CountUpValue value={m.number} />
                      {m.unit && (
                        <span className="font-editorial font-light text-white/45 text-3xl sm:text-4xl ml-1">
                          {m.unit}
                        </span>
                      )}
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isSelected
                          ? 'rotate-90 text-[#E62A2A]'
                          : 'text-white/35 group-hover:text-white group-hover:translate-x-0.5'
                      }`}
                    />
                  </div>

                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/85 font-semibold border-t border-white/10 pt-5 mt-6">
                    {m.title}
                  </div>

                  <p className="mt-2.5 text-sm text-white/65 font-light leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className={isSelected ? 'text-[#E62A2A]' : 'text-white/45 group-hover:text-white/75'}>
                    {isSelected ? 'Hide Audit Proof' : 'View Audit Proof'}
                  </span>
                  <span className="text-white/35 tabular-nums">0{index + 1}</span>
                </div>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Expandable Audit Proof Readout */}
      <AnimatePresence mode="wait">
        {selectedMetric && (
          <motion.div
            key={selectedMetric.title}
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.32, ease: STUDIO_EASE }}
            className="overflow-hidden"
          >
            <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-[#0D0D14] border border-[#E62A2A]/35">
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#E62A2A]">
                    Audit Verification · Direct Report
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1 tabular-nums">
                    {selectedMetric.title} — {selectedMetric.number}
                    {selectedMetric.unit}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedMetric(null)}
                  aria-label="Close audit verification"
                  className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {selectedMetric.proof.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: i * 0.06, ease: STUDIO_EASE }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#E62A2A] shrink-0 mt-0.5" />
                    <span className="text-sm text-white/80 leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
