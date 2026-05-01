'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      delay: i * 0.06,
    },
  }),
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2 },
  },
};

export default function Skills() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategory = t.skills.categories[activeIndex];

  return (
    <section id="skills" className="py-32">
      <div className="section-wrapper">
        <SectionHeading label={t.skills.label} heading={t.skills.heading} />

        {/* Category tab bar */}
        <div
          className="flex gap-6 mb-12 border-b border-border pb-4 overflow-x-auto"
          role="tablist"
          aria-label="Skill categories"
        >
          {t.skills.categories.map((category, index) => (
            <button
              key={category.name}
              role="tab"
              aria-selected={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={[
                'shrink-0 pb-1 text-sm font-medium transition-colors duration-200 focus:outline-none',
                activeIndex === index
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-text-secondary hover:text-text-primary border-b-2 border-transparent',
              ].join(' ')}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills grid with AnimatePresence for tab-switch animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {activeCategory.items.map((skill, i) => (
              <motion.div
                key={skill.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="bg-bg-card border border-border rounded-xl p-5 hover:border-accent/30 transition-all duration-300 group"
                style={{ willChange: 'box-shadow' }}
                whileHover={{
                  // Subtle amber glow on hover
                  boxShadow: '0 0 0 1px rgba(232, 115, 42, 0.15), 0 4px 24px rgba(232, 115, 42, 0.08)',
                }}
              >
                <p className="text-text-primary font-medium text-base mb-1">
                  {skill.name}
                </p>
                <p className="text-text-secondary text-sm">{skill.context}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
