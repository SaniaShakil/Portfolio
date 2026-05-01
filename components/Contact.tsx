'use client';

import { motion } from 'framer-motion';
import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Contact(): JSX.Element {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-32">
      <div className="section-wrapper">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient amber glow orb behind heading */}
          <div className="relative mb-6">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                style={{
                  background:
                    'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(232,168,56,0.12) 0%, transparent 70%)',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>

            <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-0">
              {t.contact.heading}
            </h2>
          </div>

          <p className="text-text-secondary text-lg mb-12 max-w-lg mx-auto">
            {t.contact.subheading}
          </p>

          {/* Contact form */}
          <form
            action="#"
            method="POST"
            className="bg-bg-card border border-border rounded-2xl p-8 text-left mb-8"
          >
            {/* Name field */}
            <div className="mb-5">
              <label
                htmlFor="contact-name"
                className="text-text-secondary text-sm mb-2 block"
              >
                {t.contact.form.name}
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                placeholder={t.contact.form.name}
                className="bg-bg-surface border border-border rounded-xl px-4 py-3 text-text-primary w-full focus:border-accent focus:outline-none transition-colors font-body text-sm"
              />
            </div>

            {/* Email field */}
            <div className="mb-5">
              <label
                htmlFor="contact-email"
                className="text-text-secondary text-sm mb-2 block"
              >
                {t.contact.form.emailField}
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                placeholder={t.contact.form.emailField}
                className="bg-bg-surface border border-border rounded-xl px-4 py-3 text-text-primary w-full focus:border-accent focus:outline-none transition-colors font-body text-sm"
              />
            </div>

            {/* Message field */}
            <div className="mb-6">
              <label
                htmlFor="contact-message"
                className="text-text-secondary text-sm mb-2 block"
              >
                {t.contact.form.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder={t.contact.form.message}
                className="bg-bg-surface border border-border rounded-xl px-4 py-3 text-text-primary w-full focus:border-accent focus:outline-none transition-colors font-body text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-bg-primary font-medium py-3 rounded-xl hover:bg-accent-hover transition-colors font-display"
            >
              {t.contact.form.send}
            </button>
          </form>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <a
              href="https://www.linkedin.com/in/kerim-girgin-0b63b7237"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-bg-card border border-border text-text-secondary hover:text-accent hover:border-accent/30 transition-all"
            >
              <Linkedin size={20} />
            </a>

            <a
              href="https://wa.me/905434632096"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-bg-card border border-border text-text-secondary hover:text-accent hover:border-accent/30 transition-all"
            >
              <Phone size={20} />
            </a>

            <a
              href="mailto:kerimgirgin@outlook.com"
              aria-label="Email"
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-bg-card border border-border text-text-secondary hover:text-accent hover:border-accent/30 transition-all"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Location tag */}
          <p className="text-text-muted text-sm mt-8 flex items-center justify-center gap-1.5">
            <MapPin size={14} />
            {t.contact.location}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
