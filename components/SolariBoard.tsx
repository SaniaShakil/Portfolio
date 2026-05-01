'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SolariBoardEntry {
  dest: string;
  status: string;
  gate: string;
}

interface SolariBoardProps {
  entries: SolariBoardEntry[];
  /** Column header labels */
  labels?: { dest: string; status: string; gate: string };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// Characters that cycle during the scramble animation
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789./:@#-';
const CHARS_PER_STEP = 2;    // how many characters resolve per tick
const TICK_MS = 40;          // ms between scramble ticks
const SCRAMBLE_ROUNDS = 8;   // scramble cycles before each character settles
const BATCH_SIZE = 4;        // entries visible at once
const CYCLE_INTERVAL_MS = 5000; // rotate batch every 5 s
const ENTRY_STAGGER_MS = 180;  // delay between each row appearing

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Pad / truncate a string to an exact character count. */
function padTo(str: string, len: number): string {
  if (str.length >= len) return str.slice(0, len);
  return str + ' '.repeat(len - len + str.length).padEnd(len - str.length, ' ').slice(0, len - str.length);
}

function randomChar(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

/** Derive status colour class. */
function statusClass(status: string): string {
  const s = status.toUpperCase();
  if (s === 'LIVE' || s === 'CANLI' || s === 'ACTIVE' || s === 'AKT\u0130F' || s === 'AKTIF') return 'text-terminal';
  return 'text-accent'; // DONE / FIXED / TAMAM
}

// ---------------------------------------------------------------------------
// Sub-component: a single row of flip-flap characters
// ---------------------------------------------------------------------------

interface FlipRowProps {
  target: string;
  colWidth: number;
  animate: boolean;
  colorClass?: string;
  isHeader?: boolean;
}

function FlipRow({ target, colWidth, animate, colorClass, isHeader }: FlipRowProps) {
  const padded = padTo(target.toUpperCase(), colWidth);
  const [displayed, setDisplayed] = useState<string[]>(() =>
    Array.from({ length: colWidth }, () => ' ')
  );
  const [flipping, setFlipping] = useState<boolean[]>(() =>
    Array(colWidth).fill(false)
  );

  const resolvedRef = useRef<number>(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runAnimation = useCallback(() => {
    if (!animate) return;
    resolvedRef.current = 0;
    let round = 0;

    tickRef.current = setInterval(() => {
      round += 1;

      setDisplayed((prev) => {
        const next = [...prev];
        const newFlipping = Array(colWidth).fill(false);

        for (let i = 0; i < colWidth; i++) {
          if (i < resolvedRef.current) {
            // Already settled — show target
            next[i] = padded[i];
          } else {
            // Still scrambling
            next[i] = randomChar();
            newFlipping[i] = true;
          }
        }

        return next;
      });

      setFlipping((prev) => {
        const next = [...prev];
        for (let i = 0; i < colWidth; i++) {
          next[i] = i >= resolvedRef.current;
        }
        return next;
      });

      // After enough scramble rounds, resolve the next batch of characters
      if (round % SCRAMBLE_ROUNDS === 0) {
        resolvedRef.current = Math.min(
          resolvedRef.current + CHARS_PER_STEP,
          colWidth
        );
      }

      // All characters resolved — stop
      if (resolvedRef.current >= colWidth) {
        setDisplayed(Array.from(padded));
        setFlipping(Array(colWidth).fill(false));
        if (tickRef.current) clearInterval(tickRef.current);
      }
    }, TICK_MS);
  }, [animate, padded, colWidth]);

  useEffect(() => {
    if (tickRef.current) clearInterval(tickRef.current);

    if (!animate) {
      // Reset to blank so next animation starts fresh
      setDisplayed(Array.from({ length: colWidth }, () => ' '));
      setFlipping(Array(colWidth).fill(false));
      resolvedRef.current = 0;
      return;
    }

    runAnimation();
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [animate, runAnimation, colWidth]);

  if (isHeader) {
    return (
      <span className="font-mono text-text-muted text-xs tracking-widest uppercase">
        {target}
      </span>
    );
  }

  return (
    <span className={`font-mono text-sm ${colorClass ?? 'text-text-primary'}`}>
      {displayed.map((ch, i) => (
        <span
          key={i}
          className={`solari-char${flipping[i] ? ' solari-flipping' : ''}`}
          style={{ display: 'inline-block' }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function SolariBoard({ entries, labels }: SolariBoardProps) {
  // The index of the first entry in the currently visible batch
  const [batchStart, setBatchStart] = useState<number>(0);
  // Which rows in the current batch are actively animating
  const [activeRows, setActiveRows] = useState<boolean[]>(Array(BATCH_SIZE).fill(false));
  // Track the batch that was just staged (to prevent stale-closure issues)
  const batchRef = useRef<number>(0);

  const colWidths = { dest: 22, status: 8, gate: 6 };

  /** Trigger rows to animate one-by-one with a stagger delay. */
  const triggerBatch = useCallback((start: number) => {
    batchRef.current = start;
    setActiveRows(Array(BATCH_SIZE).fill(false));

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    for (let row = 0; row < BATCH_SIZE; row++) {
      const t = setTimeout(() => {
        // Only apply if this batch is still current
        if (batchRef.current !== start) return;
        setActiveRows((prev) => {
          const next = [...prev];
          next[row] = true;
          return next;
        });
      }, row * ENTRY_STAGGER_MS);
      timeouts.push(t);
    }

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Fire the initial batch on mount
  useEffect(() => {
    const cleanup = triggerBatch(0);
    return cleanup;
  }, [triggerBatch]);

  // Cycle batches every CYCLE_INTERVAL_MS
  useEffect(() => {
    const id = setInterval(() => {
      setBatchStart((prev) => {
        const next = (prev + BATCH_SIZE) % Math.max(entries.length, 1);
        triggerBatch(next);
        return next;
      });
    }, CYCLE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [entries.length, triggerBatch]);

  // Slice the 4 entries for the current batch (wrap-around)
  const visibleEntries: SolariBoardEntry[] = Array.from({ length: BATCH_SIZE }, (_, i) => {
    const idx = (batchStart + i) % entries.length;
    return entries[idx] ?? { dest: '', status: '', gate: '' };
  });

  const headerLabels = labels ?? { dest: 'SYSTEM', status: 'STATUS', gate: 'STACK' };

  return (
    <div
      className="rounded-xl bg-bg-card border border-border glow-amber overflow-hidden w-full"
      style={{ boxShadow: '0 0 40px rgba(232, 115, 42, 0.06), 0 0 0 1px rgba(232, 115, 42, 0.08)' }}
      role="region"
      aria-label="Project status board"
    >
      {/* Top bar — decorative airport-style header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-bg-surface">
        <div className="w-2 h-2 rounded-full bg-terminal opacity-80" />
        <span className="font-mono text-xs text-text-muted tracking-widest uppercase">
          PROJECT BOARD
        </span>
        <div className="ml-auto flex gap-1.5">
          {[0, 1, 2].map((d) => (
            <div key={d} className="w-1.5 h-1.5 rounded-full bg-border" />
          ))}
        </div>
      </div>

      {/* Column headers */}
      <div className="grid px-4 py-2 border-b border-border"
        style={{ gridTemplateColumns: '1fr 90px 60px' }}>
        <FlipRow
          target={headerLabels.dest}
          colWidth={colWidths.dest}
          animate={false}
          isHeader
        />
        <FlipRow
          target={headerLabels.status}
          colWidth={colWidths.status}
          animate={false}
          isHeader
        />
        <FlipRow
          target={headerLabels.gate}
          colWidth={colWidths.gate}
          animate={false}
          isHeader
        />
      </div>

      {/* Data rows */}
      <div className="divide-y divide-border">
        {visibleEntries.map((entry, i) => (
          <div
            key={`${batchStart}-${i}`}
            className="grid items-center px-4 py-2.5 hover:bg-bg-card-hover transition-colors duration-150"
            style={{ gridTemplateColumns: '1fr 90px 60px' }}
          >
            <FlipRow
              target={entry.dest}
              colWidth={colWidths.dest}
              animate={activeRows[i] ?? false}
            />
            <FlipRow
              target={entry.status}
              colWidth={colWidths.status}
              animate={activeRows[i] ?? false}
              colorClass={statusClass(entry.status)}
            />
            <FlipRow
              target={entry.gate}
              colWidth={colWidths.gate}
              animate={activeRows[i] ?? false}
              colorClass="text-accent"
            />
          </div>
        ))}
      </div>

      {/* Footer: batch indicator dots */}
      <div className="flex items-center justify-center gap-1.5 py-2 border-t border-border bg-bg-surface">
        {Array.from({ length: Math.ceil(entries.length / BATCH_SIZE) }, (_, i) => {
          const isActive = i === Math.floor(batchStart / BATCH_SIZE);
          return (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                isActive ? 'w-4 bg-accent' : 'w-1 bg-border'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
