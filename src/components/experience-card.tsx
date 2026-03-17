import type { ExperienceEntry } from "@/types/content";

type ExperienceCardProps = {
  experience: ExperienceEntry;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="timeline-card">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="eyebrow">{experience.company}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[rgb(var(--ink))]">
            {experience.title}
          </h3>
        </div>
        <div className="text-sm text-[rgb(var(--muted-ink))] md:text-right">
          <p>{experience.dates}</p>
          <p>{experience.location}</p>
        </div>
      </div>

      <ul className="mt-6 space-y-3 text-base leading-7 text-[rgb(var(--muted-ink))]">
        {experience.bullets.map((bullet) => (
          <li key={`${experience.company}-${bullet}`} className="flex gap-3">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--accent-strong))]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
