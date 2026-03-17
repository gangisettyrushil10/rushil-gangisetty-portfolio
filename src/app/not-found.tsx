import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="hero-shell">
      <div className="hero-panel border-b-0">
        <div className="hero-grid-lines" />
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />

        <div className="relative z-10 mx-auto flex min-h-[78vh] w-[92%] max-w-5xl flex-col items-center justify-center gap-8 py-20 text-center">
          <div className="status-chip">
            <Search className="h-4 w-4" />
            lost in the arcade
          </div>
          <p className="eyebrow text-[rgb(var(--signal-blue))]">404</p>
          <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-[-0.08em] text-[rgb(var(--surface))] md:text-7xl">
            That page does not exist,
            {" "}
            <span className="arcade-gradient-text">but the strong projects do.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[rgba(214,236,255,0.72)]">
            Head back to the portfolio and start with the flagship case studies, resume, or contact page.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="button-primary">
              <Home className="h-4 w-4" />
              Go home
            </Link>
            <Link href="/projects" className="button-secondary">
              <ArrowLeft className="h-4 w-4" />
              View projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
