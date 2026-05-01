'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useLenis } from './SmoothScroll';

interface NavLink {
  label: string;
  href: string;
}

export default function Navbar(): JSX.Element {
  const { t, language, toggleLanguage } = useLanguage();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // Apply frosted-glass style once scroll passes threshold
  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinks: NavLink[] = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.education, href: '#education' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.references, href: '#references' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (href: string): void => {
    setMobileOpen(false);
    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(href, { offset: -80 });
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'backdrop-blur-xl bg-bg-primary/80 border-b border-border'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-xl font-bold text-accent tracking-tight"
            onClick={(e) => {
              e.preventDefault();
              if (lenis) lenis.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            KG.
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right-side controls */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              aria-label={`Switch to ${language === 'en' ? 'Turkish' : 'English'}`}
              className="px-3 py-1.5 text-xs font-mono border border-border rounded-full hover:border-accent hover:text-accent transition-all"
            >
              {language === 'en' ? 'EN' : 'TR'}
            </button>

            {/* Let's Talk CTA — hidden on mobile to keep header tight */}
            <a
              href="#contact"
              className="hidden sm:inline-flex px-4 py-2 bg-accent text-bg-primary font-medium text-sm rounded-full hover:bg-accent-hover transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
            >
              {t.nav.letsTalk}
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-1 text-text-secondary hover:text-text-primary transition-colors"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-bg-primary/95 backdrop-blur-xl flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end px-6 pt-5">
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-1 text-text-secondary hover:text-text-primary transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Staggered links */}
            <ul className="flex-1 flex flex-col justify-center items-center gap-8 px-6">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.07, duration: 0.25 }}
                >
                  <a
                    href={link.href}
                    className="text-2xl font-display font-bold text-text-primary hover:text-accent transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}

              {/* Let's Talk inside overlay for mobile */}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: navLinks.length * 0.07, duration: 0.25 }}
              >
                <a
                  href="#contact"
                  className="mt-4 inline-flex px-6 py-3 bg-accent text-bg-primary font-medium text-base rounded-full hover:bg-accent-hover transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }}
                >
                  {t.nav.letsTalk}
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
