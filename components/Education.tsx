'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import SectionHeading from './ui/SectionHeading';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Education(): React.ReactElement {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-32">
      <div className="section-wrapper">
        <SectionHeading label={t.education.label} heading={t.education.heading} />

        <div className="flex flex-col gap-6">
          {t.education.entries.map((entry, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="bg-bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-accent/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={24} className="text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <h3 className="font-display font-semibold text-xl text-text-primary">
                      {entry.degree}
                    </h3>
                    <span className="font-mono text-text-muted text-xs px-3 py-1 bg-bg-surface rounded-full border border-border">
                      {entry.period}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-accent text-base font-medium">{entry.institution}</span>
                    <span className="text-text-muted text-sm">&mdash; {entry.location}</span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">
                    {entry.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {entry.courses.map((course) => (
                      <span
                        key={course}
                        className="bg-bg-surface text-text-secondary text-xs px-3 py-1 rounded-full border border-border"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Languages card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="bg-bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-accent/20 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Globe size={24} className="text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-xl text-text-primary mb-4">
                  {t.education.languages.label}
                </h3>
                <div className="flex flex-col gap-3">
                  {t.education.languages.items.map((item) => (
                    <div key={item.language} className="flex items-center justify-between">
                      <span className="text-text-primary text-sm font-medium">{item.language}</span>
                      <span className="text-text-secondary text-sm">{item.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
