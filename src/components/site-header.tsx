import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { navLinks, profile } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(84,222,255,0.1)] bg-[rgba(5,8,19,0.72)] backdrop-blur-2xl">
      <div className="mx-auto flex w-[92%] max-w-7xl flex-wrap items-center justify-between gap-4 py-4">
        <div>
          <Link
            href="/"
            className="font-heading text-lg font-semibold tracking-[0.12em] text-[rgb(var(--surface))]"
          >
            rushil.exe
          </Link>
          <p className="text-sm text-[rgb(var(--muted-ink))]">{profile.title}</p>
        </div>

        <nav aria-label="Primary" className="flex flex-wrap items-center gap-2 text-sm">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="arcade-chip px-4 py-2 text-[rgb(var(--ink))]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-[rgb(var(--muted-ink))]">
          <Link href="https://github.com/gangisettyrushil10" aria-label="GitHub" className="arcade-chip p-3">
            <Github className="h-4 w-4" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/rushilgangisetty10"
            aria-label="LinkedIn"
            className="arcade-chip p-3"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
          <Link href="mailto:gangisettyrushil@gmail.com" aria-label="Email" className="arcade-chip p-3">
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
