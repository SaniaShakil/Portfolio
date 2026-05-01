'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label: string;
  heading: string;
}

export default function SectionHeading({ label, heading }: SectionHeadingProps): JSX.Element {
  return (
    <div className="mb-16">
      <motion.p
        className="text-xs uppercase tracking-[0.2em] text-accent font-mono mb-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {label}
      </motion.p>

      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
      >
        {heading}
      </motion.h2>
    </div>
  );
}
