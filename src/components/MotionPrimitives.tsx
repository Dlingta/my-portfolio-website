import { useEffect, useRef, useState, ReactNode } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useInView,
  animate,
} from 'motion/react';

export const STUDIO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Top hairline scroll progress bar integrated cleanly into the fixed navigation bar.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left bg-gradient-to-r from-[#E62A2A]/70 via-[#E62A2A] to-white/80 pointer-events-none"
    />
  );
}

/**
 * Architectural viewport reveal wrapper.
 */
interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({ children, className = '', delay = 0, y = 22 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: STUDIO_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Viewport-triggered count-up value for key executive metrics.
 */
interface CountUpValueProps {
  value: string;
}

export function CountUpValue({ value }: CountUpValueProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const numericMatch = value.match(/^\d+$/);
  const target = numericMatch ? parseInt(numericMatch[0], 10) : null;
  const [display, setDisplay] = useState<string>(target !== null ? '0' : value);

  useEffect(() => {
    if (!isInView || target === null) return;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: STUDIO_EASE,
      onUpdate: (latest) => {
        setDisplay(String(Math.round(latest)));
      },
    });
    return () => controls.stop();
  }, [isInView, target]);

  return <span ref={ref}>{target !== null ? display : value}</span>;
}
