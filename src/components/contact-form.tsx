"use client";

import { startTransition, useState } from "react";
import { ArrowRight, Send } from "lucide-react";

type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export function ContactForm() {
  const [state, setState] = useState<ContactState>({ status: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitForm(payload: Record<string, string>, form: HTMLFormElement) {
    setIsSubmitting(true);
    setState({ status: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(data.message || "Unable to send message.");
      }

      form.reset();
      setState({
        status: "success",
        message: "Message sent. I’ll get back to you soon.",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send message.";
      setState({ status: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="surface-card space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const payload = {
          name: String(formData.get("name") || ""),
          email: String(formData.get("email") || ""),
          company: String(formData.get("company") || ""),
          message: String(formData.get("message") || ""),
        };

        startTransition(() => {
          void submitForm(payload, form);
        });
      }}
    >
      <div>
        <p className="eyebrow">Send a message</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[rgb(var(--ink))]">
          Reach out directly.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="field">
          <span>Name</span>
          <input name="name" type="text" required placeholder="Your name" />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" required placeholder="you@company.com" />
        </label>
      </div>

      <label className="field">
        <span>Company</span>
        <input name="company" type="text" placeholder="Optional" />
      </label>

      <label className="field">
        <span>Message</span>
        <textarea
          name="message"
          required
          rows={7}
          placeholder="Tell me what you're building, the role, and what you want to talk about."
        />
      </label>

      <button type="submit" className="button-primary" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <ArrowRight className="h-4 w-4 animate-pulse" />
            Sending
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send message
          </>
        )}
      </button>

      {state.status !== "idle" ? (
        <p
          className={
            state.status === "success"
              ? "text-sm text-[rgb(var(--accent-strong))]"
              : "text-sm text-[rgb(var(--danger))]"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
