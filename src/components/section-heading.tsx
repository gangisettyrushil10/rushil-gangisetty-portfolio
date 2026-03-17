import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] text-[rgb(var(--ink))] md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-[rgb(var(--muted-ink))]">
        {description}
      </p>
    </div>
  );
}
