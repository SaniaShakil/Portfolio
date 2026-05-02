'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Footer(): JSX.Element {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-8">
      <div className="section-wrapper">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          {/* Left: logo + full name */}
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-accent">
              {t.footer.name}
            </span>
            <span className="text-text-muted hidden sm:inline">—</span>
            <span className="text-text-secondary hidden sm:inline">
              Sania Shakil
            </span>
          </div>

          {/* Center: location */}
          <span className="text-text-muted">{t.footer.location}</span>

          {/* Right: copyright */}
          <span className="text-text-muted">
            &copy; 2026 {t.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
