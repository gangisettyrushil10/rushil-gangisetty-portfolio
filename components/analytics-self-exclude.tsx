'use client'

import { Analytics } from '@vercel/analytics/next'

export function AnalyticsSelfExclude() {
  return (
    <Analytics
      beforeSend={(event) => {
        if (typeof window !== 'undefined' && window.localStorage.getItem('rushil:exclude-self') === '1') {
          return null
        }
        return event
      }}
    />
  )
}
