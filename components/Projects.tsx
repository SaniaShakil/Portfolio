'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Ruler, User } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import SectionHeading from './ui/SectionHeading';

/** Badge color variants keyed by the badge string in the translation data. */
const BADGE_STYLES: Record<string, string> = {
  // English badge values
  'Graduation Project': 'bg-terminal/10 text-terminal',
  Academic: 'bg-accent/10 text-accent',
  // Turkish badge values
  'Bitirme Projesi': 'bg-terminal/10 text-terminal',
  Akademik: 'bg-accent/10 text-accent',
};

function getBadgeStyle(badge: string): string {
  return BADGE_STYLES[badge] ?? 'bg-bg-surface text-text-secondary';
}

/**
 * Projects showcase section with filterable grid and animated cards.
 * Filter state uses the translated filter label as the key so it naturally
 * matches item.category, which is also translated in the same locale.
 */
export default function Projects(): React.ReactElement {
  const { t } = useLanguage();

  // 'all' is a sentinel that bypasses category matching entirely.
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const isAll = activeFilter === 'all';

  const filteredItems = isAll
    ? t.projects.items
    : t.projects.items.filter((item) => item.category === activeFilter);

  return (
    <section id="projects" className="py-32">
      <div className="section-wrapper">
        <SectionHeading label={t.projects.label} heading={t.projects.heading} />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {/* "All" tab */}
          <button
            onClick={() => setActiveFilter('all')}
            className={[
              'px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer',
              isAll
                ? 'bg-accent text-bg-primary'
                : 'bg-bg-card text-text-secondary border border-border hover:border-accent/20',
            ].join(' ')}
          >
            {t.projects.filterAll}
          </button>

          {/* Per-category filter tabs */}
          {t.projects.filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={[
                  'px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer',
                  isActive
                    ? 'bg-accent text-bg-primary'
                    : 'bg-bg-card text-text-secondary border border-border hover:border-accent/20',
                ].join(' ')}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Project grid — layout-animated so cards reflow smoothly on filter change */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((project, index) => {
              const isFeatured = project.featured;

              return (
                <motion.div
                  key={project.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
                  // Featured projects span both columns on md+
                  className={isFeatured ? 'md:col-span-2' : ''}
                >
                  <div
                    className={[
                      'bg-bg-card border border-border rounded-2xl group',
                      'hover:border-accent/20 hover:-translate-y-1 transition-all duration-300',
                      isFeatured ? 'p-7 md:p-10' : 'p-6 md:p-8',
                      // Subtle amber ambient glow on hover for featured cards
                      isFeatured
                        ? 'hover:shadow-[0_0_40px_rgba(232,115,42,0.06)]'
                        : '',
                    ].join(' ')}
                  >
                    {/* Badge */}
                    <span
                      className={[
                        'text-xs px-3 py-1 rounded-full font-mono',
                        getBadgeStyle(project.badge),
                      ].join(' ')}
                    >
                      {project.badge}
                    </span>

                    {/* Project name */}
                    <h3 className="text-xl font-display font-semibold text-text-primary mt-4 mb-2 group-hover:text-accent transition-colors">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="bg-bg-surface text-text-muted text-xs px-2.5 py-1 rounded-md border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Role and Scale */}
                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-border">
                      <div className="flex items-center gap-1.5 text-text-muted text-xs">
                        <User size={14} className="text-accent" />
                        <span>{project.role}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-text-muted text-xs">
                        <Ruler size={14} className="text-accent" />
                        <span>{project.scale}</span>
                      </div>
                      {project.researchPaper && (
                        <a
                          href={project.researchPaper}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-accent text-xs hover:text-accent-hover transition-colors"
                        >
                          <ExternalLink size={14} />
                          <span>Read research paper</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
