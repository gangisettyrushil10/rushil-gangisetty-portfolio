export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="hero-grid absolute inset-0 opacity-70" />
      <div className="grid-pattern absolute inset-0 opacity-30" />
      <div className="scanline-layer absolute inset-0 opacity-20" />
      <div className="noise-layer absolute inset-0 opacity-[0.12]" />
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
    </div>
  );
}
