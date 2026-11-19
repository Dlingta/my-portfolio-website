import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRINCIPLES } from '../data/portfolioData';
import { Plus, Minus } from 'lucide-react';
import { Reveal, STUDIO_EASE } from './MotionPrimitives';

export function PrinciplesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="principles" className="py-20 sm:py-28 border-t border-white/10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/50 block mb-3">
              THE NON-NEGOTIABLE CODE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Principles
            </h2>
          </div>
          <p className="font-mono text-xs text-white/45 tracking-wider uppercase">
            Field-Tested Methodology · Execution Integrity
          </p>
        </Reveal>

        {/* The 5 Kinetic Typography Rows */}
        <div className="flex flex-col border-t border-b border-white/10 divide-y divide-white/10">
          {PRINCIPLES.map((item, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.05, ease: STUDIO_EASE }}
                className="py-7 sm:py-9 group cursor-pointer transition-colors duration-300"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-baseline gap-4 sm:gap-8 group-hover:translate-x-3 sm:group-hover:translate-x-5 transition-transform duration-500 ease-out">
                    <span
                      className={`font-mono text-xs sm:text-sm transition-colors ${
                        isExpanded
                          ? 'text-[#E62A2A] font-bold'
                          : 'text-white/30 group-hover:text-[#E62A2A]'
                      }`}
                    >
                      {item.number}
                    </span>
                    <h3
                      className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight transition-colors ${
                        isExpanded
                          ? 'text-white'
                          : 'text-white/60 group-hover:text-white'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isExpanded
                        ? 'border-[#E62A2A] bg-[#E62A2A] text-white rotate-180'
                        : 'border-white/15 text-white/40 group-hover:border-white/40 group-hover:text-white'
                    }`}
                    aria-label="Toggle principle explanation"
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expandable Editorial Insight */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.32, ease: STUDIO_EASE }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pl-8 sm:pl-14 pr-4 max-w-4xl">
                        <div className="p-5 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10">
                          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E62A2A] mb-2.5">
                            OPERATIONAL RATIONALE
                          </div>
                          <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
