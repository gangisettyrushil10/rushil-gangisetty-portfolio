import Link from "next/link";

import { navLinks, profile } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(84,69,52,0.08)] bg-[rgba(247,243,234,0.78)] backdrop-blur-xl">
      <div className="mx-auto flex w-[92%] max-w-7xl flex-wrap items-center justify-between gap-4 py-4">
        <div>
          <Link
            href="/"
            className="font-heading text-lg font-semibold tracking-[-0.04em] text-[rgb(var(--ink))]"
          >
            {profile.name}
          </Link>
          <p className="text-sm text-[rgb(var(--muted-ink))]">{profile.title}</p>
        </div>

        <nav aria-label="Primary" className="flex flex-wrap items-center gap-3 text-sm">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[rgb(var(--muted-ink))] transition-colors hover:bg-[rgb(var(--surface))] hover:text-[rgb(var(--ink))]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
