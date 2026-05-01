'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Translation } from './types';
import { en } from './en';
import { it } from './it';

type Language = 'en' | 'it';

interface LanguageContextType {
  language: Language;
  t: Translation;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const translations: Record<Language, Translation> = { en, it };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-lang') as Language | null;
    if (stored && (stored === 'en' || stored === 'it')) {
      setLanguage(stored);
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'en' ? 'it' : 'en';
      localStorage.setItem('portfolio-lang', next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, t: translations[language], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
