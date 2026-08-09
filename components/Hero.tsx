'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown, Download, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useLenis } from './SmoothScroll';
import BlueprintGrid from './BlueprintGrid';

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

/** Shared fade-up variant used for staggered children. */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

/** Container that staggers its direct children. */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export default function Hero() {
  const { t } = useLanguage();
  const lenis = useLenis();

  // Build the react-type-animation sequence from the translated specializations.
  // The library expects: [string, pauseMs, string, pauseMs, …]
  const typeSequence: (string | number)[] = t.hero.specializations.flatMap(
    (spec) => [spec, 2000]
  );

  return (
    <section
      id="hero"
      className="relative flex flex-col min-h-screen overflow-hidden bg-bg-primary"
      aria-label="Hero section"
    >
      {/* Blueprint grid background */}
      <BlueprintGrid />

      {/* Gradient orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-[2]">
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full animate-float"
          style={{
            background:
              'radial-gradient(circle at center, rgba(16,185,129,0.10) 0%, rgba(16,185,129,0.03) 50%, transparent 70%)',
            animationDelay: '0s',
          }}
        />
        <div
          className="absolute -bottom-60 -right-40 w-[600px] h-[600px] rounded-full animate-float"
          style={{
            background:
              'radial-gradient(circle at center, rgba(34,197,94,0.06) 0%, rgba(34,197,94,0.02) 50%, transparent 70%)',
            animationDelay: '3s',
          }}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-[5] flex flex-col items-center justify-center flex-1 px-6 pt-28 pb-16 section-wrapper w-full mx-auto">
        <motion.div
          className="w-full flex flex-col items-center text-center gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-xs font-mono text-text-muted uppercase tracking-widest"
          >
            {t.hero.greeting}
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-display font-bold text-text-primary text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight"
          >
            {t.hero.name}
          </motion.h1>

          {/* Typing role — no terminal > prefix */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-2 text-lg md:text-2xl font-display font-medium text-accent"
            aria-label={t.hero.role}
          >
            <TypeAnimation
              sequence={typeSequence}
              wrapper="span"
              speed={50}
              deletionSpeed={70}
              repeat={Infinity}
              cursor
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-body text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-wrap items-center justify-center gap-3 mt-1"
          >
            <a
              href="https://drive.google.com/file/d/1ilq-fvk1PslwIUCT7o56l0CqdIilw6fs/view?usp=sharing"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg-primary font-body font-semibold text-sm hover:bg-accent-hover active:scale-95 transition-all duration-200 min-h-[44px]"
              aria-label={t.hero.downloadCv}
            >
              <Download size={16} aria-hidden="true" />
              {t.hero.downloadCv}
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                if (lenis) lenis.scrollTo('#projects', { offset: -80 });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-text-primary font-body font-semibold text-sm hover:border-accent hover:text-accent active:scale-95 transition-all duration-200 min-h-[44px]"
              aria-label={t.hero.viewProjects}
            >
              {t.hero.viewProjects}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.div>

          {/* Engineering Highlights — spec sheet panel */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-3xl mt-8"
          >
            <div className="rounded-xl bg-bg-card/80 backdrop-blur-sm border border-border p-6">
              {/* Panel header */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-terminal opacity-80" />
                <span className="font-mono text-xs text-text-muted tracking-widest uppercase">
                  {t.hero.highlightsTitle}
                </span>
              </div>
              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {t.hero.highlights.map((item, i) => (
                  <div key={i} className="text-center md:text-left">
                    <div className="text-2xl md:text-3xl font-display font-bold text-accent mb-1">
                      {item.value}
                    </div>
                    <div className="text-xs text-text-secondary font-mono uppercase tracking-wide">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-[5] flex flex-col items-center pb-8 gap-1.5" aria-hidden="true">
        <span className="font-mono text-xs text-text-muted tracking-widest uppercase">
          {t.hero.scrollDown}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-accent opacity-70" />
        </motion.div>
      </div>
    </section>
  );
}
