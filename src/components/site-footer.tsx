import Link from "next/link";

import { profile } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(84,69,52,0.1)] py-12">
      <div className="mx-auto flex w-[92%] max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="eyebrow">Stay in touch</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[rgb(var(--ink))]">
            Building strong products starts with clear engineering.
          </h2>
          <p className="mt-3 text-base leading-7 text-[rgb(var(--muted-ink))]">
            {profile.availability}
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-[rgb(var(--muted-ink))] md:items-end">
          {profile.socialLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[rgb(var(--ink))]">
              {link.label}
            </Link>
          ))}
          <p>{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
