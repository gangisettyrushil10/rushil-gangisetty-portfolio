'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

interface RepoInfo {
  name: string
  description: string | null
  pushed_at: string
  html_url: string
  language: string | null
}

interface WeekActivity {
  week: number
  days: number[]
}

interface GithubData {
  publicRepos: number
  repos: RepoInfo[]
  commitActivity: WeekActivity[]
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

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  'C#': '#178600',
  Java: '#b07219',
}

export function GithubActivity() {
  const [data, setData] = useState<GithubData | null>(null)

  useEffect(() => {
    async function fetchGithub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/gangisettyrushil10'),
          fetch('https://api.github.com/users/gangisettyrushil10/repos?sort=pushed&per_page=6'),
        ])

        if (!userRes.ok || !reposRes.ok) return

        const user = await userRes.json()
        const repos: RepoInfo[] = await reposRes.json()

        // Try to fetch commit activity for the top repo
        let commitActivity: WeekActivity[] = []
        try {
          const activityRes = await fetch(
            `https://api.github.com/repos/gangisettyrushil10/Buzzr/stats/commit_activity`
          )
          if (activityRes.ok) {
            const raw = await activityRes.json()
            if (Array.isArray(raw)) {
              commitActivity = raw.slice(-12).map((w: { week: number; days: number[] }) => ({
                week: w.week,
                days: w.days,
              }))
            }
          }
        } catch {
          // Commit activity not available — fine
        }

        setData({
          publicRepos: user.public_repos,
          repos: repos.slice(0, 5),
          commitActivity,
        })
      } catch {
        // Fail silently
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
        <span className="text-sm font-medium text-foreground">GitHub</span>
        <span className="text-sm text-muted-foreground">
          · {data.publicRepos} public repos
        </span>
      </div>

      {/* Contribution heatmap */}
      {data.commitActivity.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <div className="flex gap-[3px]">
            {data.commitActivity.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.days.map((count, di) => (
                  <div
                    key={di}
                    className="h-[11px] w-[11px] rounded-[2px]"
                    style={{
                      backgroundColor:
                        count === 0
                          ? 'rgba(255,255,255,0.06)'
                          : count <= 2
                            ? 'rgba(67, 215, 255, 0.25)'
                            : count <= 5
                              ? 'rgba(67, 215, 255, 0.45)'
                              : count <= 10
                                ? 'rgba(67, 215, 255, 0.65)'
                                : 'rgba(67, 215, 255, 0.9)',
                    }}
                    title={`${count} commit${count !== 1 ? 's' : ''}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[0.6rem] text-muted-foreground/50">
            <span>Less</span>
            {[0.06, 0.25, 0.45, 0.65, 0.9].map((opacity) => (
              <div
                key={opacity}
                className="h-[9px] w-[9px] rounded-[2px]"
                style={{ backgroundColor: opacity === 0.06 ? `rgba(255,255,255,${opacity})` : `rgba(67, 215, 255, ${opacity})` }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      )}

      {/* Repo list */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
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
                {repo.language && (
                  <div
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: LANG_COLORS[repo.language] ?? '#8b949e' }}
                  />
                )}
                <span className="truncate text-sm font-medium text-foreground group-hover:text-[#43d7ff] transition-colors">
                  {repo.name}
                </span>
              </div>
              {repo.description && (
                <p className="mt-1 truncate text-xs text-muted-foreground/60">{repo.description}</p>
              )}
            </div>
            <div className="ml-2 flex shrink-0 items-center gap-1 text-[0.6rem] font-mono text-muted-foreground/40">
              {timeAgo(repo.pushed_at)}
              <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        ))}
      </div>
    </motion.div>
  )
}
