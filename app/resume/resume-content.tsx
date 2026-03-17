'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Download, Mail, MapPin, Github, Linkedin, ArrowRight, Building2, GraduationCap, Code2, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section, SectionHeader } from '@/components/section'
import { personalInfo, experiences, recruiterSummary, skills, projects } from '@/lib/data'

export function ResumeContent() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-30" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
          className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block text-xs font-mono tracking-wider text-primary uppercase mb-4">
                  Resume
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                  {personalInfo.name}
                </h1>
                <p className="mt-2 text-xl text-primary font-medium">
                  {personalInfo.title}
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl"
              >
                Most of my work sits at the intersection of product, backend, and data. That usually means building something useful, making the API sane, and handling the messy edges that show up once real data is involved.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap items-center gap-4 mt-8"
              >
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="/resume.pdf" download>
                    <Download className="mr-2 w-4 h-4" />
                    Download Resume
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    <Mail className="mr-2 w-4 h-4" />
                    Contact Me
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Right Column - Quick Facts */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6">Quick Facts</h2>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary text-primary">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground">{personalInfo.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary text-primary">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-foreground">Open to software, backend, data, and systems roles</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary text-primary">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Focus</p>
                    <p className="text-foreground">Backend APIs, data workflows, .NET, product software</p>
                  </div>
                </div>

                <hr className="border-border my-2" />

                <div className="flex items-center gap-4">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <Section className="bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Work History"
            title="Professional Experience"
            description="Production experience across startups, enterprise systems, and academic institutions."
          />

          <div className="flex flex-col gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-secondary text-primary">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{exp.company}</h3>
                      <p className="text-muted-foreground">{exp.role}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">{exp.period}</span>
                </div>

                <ul className="flex flex-col gap-3 mb-6">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                      <span className="text-muted-foreground">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {exp.stack && (
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono bg-muted text-muted-foreground rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Expertise"
            title="Technical Skills"
            description="The tools and technologies I reach for most often."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key: 'languages', label: 'Languages', icon: Code2 },
              { key: 'frontend', label: 'Frontend & Product', icon: Code2 },
              { key: 'backend', label: 'Backend APIs', icon: Code2 },
              { key: 'systems', label: 'Business Systems', icon: Code2 },
              { key: 'data', label: 'Data & Analytics', icon: Code2 },
              { key: 'tools', label: 'Tools', icon: Code2 },
            ].map((category, index) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <h3 className="font-semibold text-foreground mb-4">{category.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills[category.key as keyof typeof skills].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Featured Projects Section */}
      <Section className="bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <SectionHeader
              badge="Portfolio"
              title="Featured Projects"
              description="Proof of execution across multiple engineering domains."
              className="mb-0"
            />
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <span className="text-xs font-mono text-primary">{project.category}</span>
                <h3 className="mt-2 text-lg font-bold text-foreground">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm text-primary hover:underline"
                >
                  View Case Study
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-mono tracking-wider text-primary uppercase mb-4">
              Ready to Connect
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Interested in working together?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              I'm open to software engineering roles where I can contribute to meaningful products 
              with a team that values technical excellence and user impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/contact">
                  <Mail className="mr-2 w-4 h-4" />
                  Get in Touch
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/resume.pdf" download>
                  <Download className="mr-2 w-4 h-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  )
}
