'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, GitCommit, ExternalLink } from 'lucide-react'

interface RepoInfo {
  name: string
  description: string | null
  pushed_at: string
  html_url: string
  stargazers_count: number
}

interface GithubData {
  publicRepos: number
  repos: RepoInfo[]
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

export function GithubActivity() {
  const [data, setData] = useState<GithubData | null>(null)

  useEffect(() => {
    async function fetchGithub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/gangisettyrushil10', { next: { revalidate: 3600 } } as RequestInit),
          fetch('https://api.github.com/users/gangisettyrushil10/repos?sort=pushed&per_page=5', { next: { revalidate: 3600 } } as RequestInit),
        ])

        if (!userRes.ok || !reposRes.ok) return

        const user = await userRes.json()
        const repos: RepoInfo[] = await reposRes.json()

        setData({
          publicRepos: user.public_repos,
          repos: repos.slice(0, 4),
        })
      } catch {
        // Fail silently — component just won't render
      }
    }

    fetchGithub()
  }, [])

  if (!data) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
    >
      <div className="flex items-center gap-2">
        <Github className="h-4 w-4 text-foreground/70" />
        <span className="text-sm text-muted-foreground">
          {data.publicRepos} public repos · most recently active:
        </span>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {data.repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between rounded-xl border border-white/8 bg-white/[0.02] p-3 transition-colors hover:border-white/16 hover:bg-white/[0.04]"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <GitCommit className="h-3 w-3 shrink-0 text-[#43d7ff]/60" />
                <span className="truncate text-sm font-medium text-foreground group-hover:text-[#43d7ff] transition-colors">
                  {repo.name}
                </span>
              </div>
              {repo.description && (
                <p className="mt-1 truncate text-xs text-muted-foreground/70">{repo.description}</p>
              )}
            </div>
            <div className="ml-2 flex shrink-0 items-center gap-1 text-[0.65rem] font-mono text-muted-foreground/50">
              {timeAgo(repo.pushed_at)}
              <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        ))}
      </div>
    </motion.div>
  )
}
