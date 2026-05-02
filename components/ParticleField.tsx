'use client';

import { useCallback, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine, Container, ISourceOptions } from '@tsparticles/engine';

// ---------------------------------------------------------------------------
// Particle configuration
// ---------------------------------------------------------------------------

const PARTICLE_COUNT_DESKTOP = 50;
const PARTICLE_COUNT_MOBILE  = 15;
const MOBILE_BREAKPOINT      = 768;

/** Builds the tsParticles options object with a dynamic particle count. */
function buildParticlesOptions(count: number): ISourceOptions {
  return {
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
      color: { value: '#10B981' },
      number: {
        value: count,
        density: { enable: false },
      },
      size: {
        value: { min: 1, max: 2 },
      },
      opacity: {
        value: { min: 0.15, max: 0.35 },
      },
      move: {
        enable: true,
        speed: { min: 0.3, max: 0.5 },
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'bounce' },
      },
      links: {
        enable: true,
        color: '#10B981',
        opacity: 0.06,
        distance: 120,
        width: 1,
      },
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: {
          enable: true,
          mode: 'grab',
        },
        resize: { enable: true },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            // Slightly raised opacity when grabbing so the effect is perceptible
            opacity: 0.2,
          },
        },
      },
    },
    detectRetina: true,
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * ParticleField — a subtle ambient particle background intended for the Hero
 * section. Must be dynamically imported with `ssr: false` to avoid hydration
 * mismatches and to keep the tsParticles engine out of the SSR bundle.
 */
export default function ParticleField(): JSX.Element | null {
  const [engineReady, setEngineReady] = useState(false);
  const [particleCount, setParticleCount] = useState(PARTICLE_COUNT_DESKTOP);

  // Initialise the slim tsParticles engine once on the client
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setEngineReady(true);
    });
  }, []);

  // Detect mobile viewport and reduce particle count to keep performance acceptable
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setParticleCount(
        window.innerWidth < MOBILE_BREAKPOINT
          ? PARTICLE_COUNT_MOBILE
          : PARTICLE_COUNT_DESKTOP
      );
    }
  }, []);

  /**
   * Stable async callback matching the required signature:
   * `(container?: Container) => Promise<void>`
   * The engine is already loaded via initParticlesEngine, so nothing extra
   * needs to happen here.
   */
  const handleParticlesLoaded = useCallback(
    async (_container?: Container): Promise<void> => {
      // no-op — engine initialised in the useEffect above
    },
    []
  );

  if (!engineReady) return null;

  return (
    <Particles
      id="particle-field"
      options={buildParticlesOptions(particleCount)}
      particlesLoaded={handleParticlesLoaded}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        // pointer-events must stay active for the grab hover interactivity.
        // Visually inert elements above this layer handle their own pointer-events.
        pointerEvents: 'none',
      }}
    />
  );
}
