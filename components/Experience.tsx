'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import SectionHeading from './ui/SectionHeading';

/**
 * Work experience timeline section.
 * Renders a vertical amber-glowing timeline with animated card entries.
 */
export default function Experience(): React.ReactElement {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-32">
      <div className="section-wrapper">
        <SectionHeading label={t.experience.label} heading={t.experience.heading} />

        {/* Timeline container — left gutter holds the vertical line */}
        <div className="relative pl-8 md:pl-12">
          {/* Glowing vertical amber line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-0.5"
            style={{
              background: 'linear-gradient(to bottom, transparent, #E8A838, transparent)',
              opacity: 0.6,
            }}
          />

          <div className="flex flex-col gap-10">
            {t.experience.entries.map((entry, index) => (
              <motion.div
                key={`${entry.company}-${index}`}
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className="relative"
              >
                {/* Timeline dot — centered on the left line */}
                <div className="absolute -left-8 md:-left-12 top-8 flex items-center justify-center">
                  {entry.current ? (
                    /* Current role: filled dot with pulsing ring */
                    <span className="relative flex items-center justify-center">
                      {/* Pulsing ring */}
                      <span
                        className="absolute inline-flex rounded-full bg-accent opacity-40 animate-ping"
                        style={{ width: '20px', height: '20px' }}
                      />
                      {/* Solid dot */}
                      <span
                        className="relative inline-block rounded-full bg-accent"
                        style={{ width: '12px', height: '12px' }}
                      />
                    </span>
                  ) : (
                    /* Past role: hollow dot */
                    <span
                      className="inline-block rounded-full bg-bg-card border-2 border-accent"
                      style={{ width: '12px', height: '12px' }}
                    />
                  )}
                </div>

                {/* Card */}
                <div className="bg-bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-accent/20 transition-all duration-300">
                  {/* Top row: title + period badge */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <h3 className="font-display font-semibold text-xl text-text-primary">
                      {entry.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {entry.current && (
                        <span className="bg-accent/10 text-accent text-xs px-3 py-1 rounded-full font-mono">
                          Current
                        </span>
                      )}
                      <span className="font-mono text-text-muted text-xs px-3 py-1 bg-bg-surface rounded-full border border-border">
                        {entry.period}
                      </span>
                    </div>
                  </div>

                  {/* Company + location */}
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span className="text-accent text-base font-medium">{entry.company}</span>
                    <span className="text-text-muted text-sm">&mdash; {entry.location}</span>
                  </div>

                  {/* Highlights bullet list */}
                  <ul className="flex flex-col gap-2 mb-6">
                    {entry.highlights.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        {/* Amber bullet dot */}
                        <span
                          className="mt-1.5 flex-shrink-0 rounded-full bg-accent"
                          style={{ width: '5px', height: '5px' }}
                        />
                        <span className="text-text-secondary text-sm leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2">
                    {entry.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-bg-surface text-text-secondary text-xs px-3 py-1 rounded-full border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                    {entry.certificate && (
                      <a
                        href={entry.certificate}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-accent text-xs px-3 py-1 rounded-full border border-accent/30 hover:border-accent hover:text-accent-hover transition-colors"
                      >
                        <ExternalLink size={13} />
                        <span>View certificate</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
