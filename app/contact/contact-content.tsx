'use client'

import { useState } from 'react'
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { personalInfo } from '@/lib/data'

export function ContactContent() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const subject = encodeURIComponent(formState.subject || `Portfolio inquiry from ${formState.name}`)
    const body = encodeURIComponent(
      [`Name: ${formState.name}`, `Email: ${formState.email}`, '', formState.message].join('\n')
    )

    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
  }

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-18 pt-32 sm:px-6 sm:pb-22 sm:pt-40 lg:px-8">
        <div className="absolute inset-0 aurora-backdrop opacity-80" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <span className="section-label">Contact</span>
              <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-foreground sm:text-[5rem]">
                Open to thoughtful conversations about the right role.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-[1.06rem]">
                If you are hiring for software engineering, backend, or product-oriented full-stack roles, I would be glad to connect.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="glass-panel block rounded-[28px] p-5 transition hover:border-white/18"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/18 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-foreground">Email</p>
                  <p className="mt-2 text-sm text-muted-foreground">{personalInfo.email}</p>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel block rounded-[28px] p-5 transition hover:border-white/18"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-foreground">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-foreground">LinkedIn</p>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                    Connect here
                    <ArrowUpRight className="h-4 w-4" />
                  </p>
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel block rounded-[28px] p-5 transition hover:border-white/18"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-foreground">
                    <Github className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-foreground">GitHub</p>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                    See public work
                    <ArrowUpRight className="h-4 w-4" />
                  </p>
                </a>

                <div className="glass-panel rounded-[28px] p-5">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-foreground">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-foreground">Location</p>
                  <p className="mt-2 text-sm text-muted-foreground">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            <div className="glass-panel-strong rounded-[32px] p-6 sm:p-7">
              <p className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-primary/90">Send a note</p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                This form opens a pre-filled email draft to make outreach quick and straightforward.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Name
                    </label>
                    <Input
                      id="name"
                      value={formState.name}
                      onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                      placeholder="Your name"
                      required
                      className="border-white/10 bg-black/18"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                      placeholder="you@company.com"
                      required
                      className="border-white/10 bg-black/18"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    value={formState.subject}
                    onChange={(event) => setFormState({ ...formState, subject: event.target.value })}
                    placeholder="Role, project, or introduction"
                    required
                    className="border-white/10 bg-black/18"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    rows={7}
                    value={formState.message}
                    onChange={(event) => setFormState({ ...formState, message: event.target.value })}
                    placeholder="A brief note is perfect."
                    required
                    className="resize-none border-white/10 bg-black/18"
                  />
                </div>

                <Button type="submit" size="lg" className="mt-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="mr-2 h-4 w-4" />
                  Open email draft
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
