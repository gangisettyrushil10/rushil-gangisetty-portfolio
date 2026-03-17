"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, LoaderCircle, Sparkles, Zap } from "lucide-react";

import { Reveal } from "@/components/reveal";

type CopilotHighlight = {
  title: string;
  href: string;
  type: "project" | "experience" | "page";
  reason: string;
};

type CopilotResponse = {
  answer: string;
  mode: "grounded-local";
  highlights: CopilotHighlight[];
};

const suggestedQuestions = [
  "What should a backend recruiter look at first?",
  "Which project is strongest for AI roles?",
  "What proves product engineering depth here?",
];

export function PortfolioCopilot() {
  const [question, setQuestion] = useState(suggestedQuestions[0]);
  const [response, setResponse] = useState<CopilotResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function askCopilot(nextQuestion?: string) {
    const prompt = (nextQuestion ?? question).trim();
    if (!prompt) return;

    setQuestion(prompt);
    setError(null);
    setIsLoading(true);

    try {
      const result = await fetch("/api/portfolio-copilot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: prompt }),
      });

      const data = (await result.json()) as CopilotResponse | { error: string };
      if (!result.ok || "error" in data) {
        throw new Error("error" in data ? data.error : "Unable to answer right now.");
      }

      setResponse(data);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to answer right now.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="section-shell">
      <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <Reveal>
          <div className="surface-card-alt relative overflow-hidden">
            <div className="arcade-glow arcade-glow-primary" />
            <p className="eyebrow text-[rgba(215,244,255,0.72)]">AI Layer</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.06em] text-[rgb(var(--surface))] md:text-5xl">
              Portfolio copilot for recruiters, founders, and hiring managers.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[rgba(214,236,255,0.74)]">
              Ask what fits a backend role, what proves AI depth, or where the strongest product signal lives.
              The answers stay grounded in the portfolio content instead of inventing new claims.
            </p>

            <div className="mt-8 grid gap-3">
              {suggestedQuestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => void askCopilot(item)}
                  className="arcade-chip justify-start text-left"
                >
                  <Zap className="h-4 w-4" />
                  {item}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="terminal-panel h-full">
            <div className="terminal-header">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[rgb(var(--signal-blue))]">
                <Bot className="h-4 w-4" />
                Recruiter Copilot
              </div>
              <span className="terminal-pill">grounded-local</span>
            </div>

            <div className="mt-6 grid gap-4">
              <label className="field">
                <span>Ask a question</span>
                <textarea
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  rows={4}
                  placeholder="What should a hiring manager review first for backend roles?"
                  className="terminal-input min-h-32"
                />
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void askCopilot()}
                  className="button-primary"
                  disabled={isLoading}
                >
                  {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Ask copilot
                </button>
                <Link href="/projects" className="button-secondary">
                  Explore case studies
                </Link>
              </div>

              {error ? <p className="text-sm text-[rgb(var(--danger))]">{error}</p> : null}

              <div className="terminal-response">
                <p className="terminal-label">Response</p>
                <p className="text-base leading-8 text-[rgb(var(--surface))]">
                  {response?.answer ??
                    "Ask about backend work, AI projects, product engineering depth, or which case study to start with."}
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {(response?.highlights ?? []).map((highlight) => (
                  <Link key={`${highlight.type}-${highlight.title}`} href={highlight.href} className="terminal-card">
                    <p className="terminal-label">{highlight.type}</p>
                    <p className="mt-2 text-lg font-semibold text-[rgb(var(--surface))]">{highlight.title}</p>
                    <p className="mt-3 text-sm leading-7 text-[rgba(214,236,255,0.72)]">{highlight.reason}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
