import type { Metadata } from "next";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { canSendContactEmail } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out about roles, projects, and software engineering opportunities.",
};

export default function ContactPage() {
  const isConfigured = canSendContactEmail();

  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Contact"
        title="Reach out about roles, projects, or collaboration."
        description="If the role needs product judgment, backend discipline, and someone who can explain technical tradeoffs clearly, I’m interested."
      />

      <div className="mt-12 grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
        <Reveal>
          <div className="surface-card">
            <p className="eyebrow">Direct links</p>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="mailto:gangisettyrushil@gmail.com" className="button-secondary">
                <Mail className="h-4 w-4" />
                gangisettyrushil@gmail.com
              </Link>
              <Link
                href="https://www.linkedin.com/in/rushilgangisetty10"
                className="button-secondary"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
              <Link href="https://github.com/gangisettyrushil10" className="button-secondary">
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </div>

            {!isConfigured ? (
              <div className="mt-8 rounded-3xl border border-[rgb(var(--line))] bg-[rgb(var(--surface-muted))] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--muted-ink))]">
                  Form status
                </p>
                <p className="mt-3 text-base leading-7 text-[rgb(var(--muted-ink))]">
                  The direct email path is active. The hosted form can be enabled later by adding the Resend environment variables in Vercel.
                </p>
              </div>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          {isConfigured ? (
            <ContactForm />
          ) : (
            <div className="surface-card">
              <p className="eyebrow">Send an email instead</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[rgb(var(--ink))]">
                Direct outreach works right now.
              </h2>
              <p className="mt-4 text-base leading-7 text-[rgb(var(--muted-ink))]">
                The quickest way to reach me is still email or LinkedIn. That keeps this page honest instead of exposing a form that is not fully configured.
              </p>
              <div className="mt-8">
                <Link href="mailto:gangisettyrushil@gmail.com" className="button-primary">
                  <Mail className="h-4 w-4" />
                  Email Rushil
                </Link>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
