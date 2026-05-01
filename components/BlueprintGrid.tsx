'use client';

export default function BlueprintGrid(): JSX.Element {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Main grid - small squares */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(232,115,42,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,115,42,1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Major grid - larger squares */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(232,115,42,1) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(232,115,42,1) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '200px 200px',
        }}
      />
      {/* Decorative dimension markers */}
      <div className="absolute top-20 left-8 md:left-16 flex items-center gap-2 opacity-[0.08]">
        <div className="w-px h-32 bg-accent" />
        <span className="font-mono text-[10px] text-accent rotate-90 origin-left translate-y-4">1:100</span>
      </div>
      <div className="absolute bottom-32 right-8 md:right-16 flex items-center gap-2 opacity-[0.08]">
        <div className="w-px h-24 bg-accent" />
        <span className="font-mono text-[10px] text-accent rotate-90 origin-left translate-y-4">A-A</span>
      </div>
      {/* Crosshair at center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]">
        <div className="w-px h-16 bg-accent absolute left-1/2 -translate-x-1/2" />
        <div className="h-px w-16 bg-accent absolute top-1/2 -translate-y-1/2" />
        <div className="w-3 h-3 border border-accent rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, rgba(28,28,30,0.8) 100%)',
        }}
      />
    </div>
  );
}
