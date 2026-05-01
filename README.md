# MFO Portfolio

Award-caliber portfolio site with an "Aviation Control Tower" aesthetic. Features a Solari split-flap departure board, 3D wireframe globe with flight arcs, particle field, and full EN/TR bilingual support.

## Tech Stack

- **Next.js 14** (App Router, static export)
- **TypeScript** (strict mode)
- **Tailwind CSS 3** + CSS custom properties
- **Framer Motion** (UI transitions, scroll reveals)
- **@react-three/fiber + drei** (3D wireframe globe)
- **tsParticles** (ambient particle field)
- **react-type-animation** (typing effect)
- **Lenis** (smooth scroll)
- **Lucide React** (icons)

## Design

- Dark theme: deep void black (#0C0C0E) + aviation amber (#E8A838)
- Typography: Syne (display) + Plus Jakarta Sans (body) + JetBrains Mono (code)
- Signature element: Solari split-flap departure board cycling through systems
- Layered hero: particles + 3D globe + gradient orbs + typography
- Full i18n: English + Turkish with localStorage persistence

## Getting Started

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build   # Static export to /out
```

Deployed on Vercel. The `vercel.json` is pre-configured.

## Structure

```
app/            Next.js App Router (layout, page, globals.css)
components/     All React components
  three/        3D components (Globe3D)
  ui/           Reusable UI primitives (SectionHeading)
lib/i18n/       Translation system (EN + TR + types + context)
public/         Static assets
```

## Environment

No environment variables required for the base site. To enable the contact form, replace the Formspree placeholder URL in `components/Contact.tsx`.
