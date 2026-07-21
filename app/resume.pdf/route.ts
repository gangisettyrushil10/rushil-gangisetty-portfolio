import { NextResponse } from 'next/server'

const resumeAssetPath = '/resume/rushil-gangisetty-resume-2026-06.pdf'

export function GET() {
  return new NextResponse(null, {
    status: 307,
    headers: {
      Location: resumeAssetPath,
      'Cache-Control': 'no-store',
    },
  })
}
