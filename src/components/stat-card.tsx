type StatCardProps = {
  value: string;
  label: string;
};

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="surface-card flex min-h-32 flex-col justify-between">
      <p className="text-4xl font-semibold tracking-[-0.06em] text-[rgb(var(--ink))]">
        {value}
      </p>
      <p className="max-w-[14ch] text-sm uppercase tracking-[0.2em] text-[rgb(var(--muted-ink))]">
        {label}
      </p>
    </div>
  );
}
