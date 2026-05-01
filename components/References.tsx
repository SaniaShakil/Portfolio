'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import SectionHeading from './ui/SectionHeading';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.08,
    },
  }),
};

export default function References(): React.ReactElement {
  const { t } = useLanguage();

  return (
    <section id="references" className="py-32">
      <div className="section-wrapper">
        <SectionHeading label={t.references.label} heading={t.references.heading} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.references.entries.map((ref, i) => (
            <motion.div
              key={ref.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="bg-bg-card border border-border rounded-xl p-6 hover:border-accent/30 transition-all duration-300"
            >
              <h3 className="text-text-primary font-display font-semibold text-base mb-1">
                {ref.name}
              </h3>
              <p className="text-accent text-sm mb-1">{ref.title}</p>
              <p className="text-text-secondary text-sm">{ref.institution}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
