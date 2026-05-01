'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import SectionHeading from './ui/SectionHeading';

/** Parses the numeric portion from a stat value string like "4.8K+" or "3+" */
function parseStatNumber(value: string): number {
  // Strip non-numeric suffix characters (K+, +) and handle decimal
  const raw = value.replace(/[^0-9.]/g, '');
  return parseFloat(raw) || 0;
}

/** Animated counter that counts from 0 to `target` when it enters the viewport. */
function AnimatedCounter({ value }: { value: string }) {
  const target = parseStatNumber(value);
  // Preserve the suffix (everything after the number) for display
  const suffix = value.replace(/^[0-9.]+/, '');

  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;

    const controls = animate(motionVal, target, {
      duration: 1.6,
      ease: 'easeOut',
    });

    // Subscribe to value changes to format the display string
    const unsubscribe = motionVal.on('change', (latest) => {
      // Match original formatting: show one decimal if target has one (e.g. 4.8)
      const formatted =
        target % 1 !== 0
          ? latest.toFixed(1)
          : Math.round(latest).toString();
      setDisplay(formatted);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [inView, motionVal, target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32">
      <div className="section-wrapper">
        <SectionHeading label={t.about.label} heading={t.about.heading} />

        <div className="md:grid md:grid-cols-5 gap-16">
          {/* Left column — bio paragraphs */}
          <motion.div
            className="col-span-3 mb-12 md:mb-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {t.about.bio.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={paragraphVariants}
                className="text-text-secondary text-lg leading-relaxed mb-6"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* Right column — stats grid */}
          <motion.div
            className="col-span-2 grid grid-cols-2 gap-4 content-start"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {t.about.stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300"
              >
                <div className="text-4xl font-display font-bold text-accent mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
