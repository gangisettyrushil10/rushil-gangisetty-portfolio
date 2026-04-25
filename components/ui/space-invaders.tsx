'use client'

import type { ReactElement } from 'react'

/**
 * SpaceInvadersBand — original pixel-alien sprites in a marching band.
 * Three sprite shapes (squid, crab, octopus) + a UFO, rendered as SVG rects.
 * No external artwork — all grids are drawn here.
 */

// 8-column x 8-row bitmap strings. "1" = filled pixel.
const SPRITES = {
  squid: [
    '00011000',
    '00111100',
    '01111110',
    '11011011',
    '11111111',
    '01011010',
    '10100101',
    '01000010',
  ],
  crab: [
    '10000001',
    '01000010',
    '01111110',
    '11011011',
    '11111111',
    '10111101',
    '10100101',
    '01011010',
  ],
  octopus: [
    '00111100',
    '01111110',
    '11111111',
    '11011011',
    '11111111',
    '00100100',
    '01011010',
    '10000001',
  ],
  ufo: [
    '00011110000',
    '00111111100',
    '01111111110',
    '11101110111',
    '11111111111',
    '00011111000',
    '00010101000',
    '00100000100',
  ],
}

type SpriteKey = keyof typeof SPRITES

function Sprite({ kind, color, px = 3 }: { kind: SpriteKey; color: string; px?: number }) {
  const grid = SPRITES[kind]
  const cols = grid[0].length
  const rows = grid.length
  const cells: ReactElement[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        cells.push(
          <rect key={`${r}-${c}`} x={c * px} y={r * px} width={px} height={px} fill={color} />
        )
      }
    }
  }
  return (
    <svg
      width={cols * px}
      height={rows * px}
      viewBox={`0 0 ${cols * px} ${rows * px}`}
      shapeRendering="crispEdges"
    >
      {cells}
    </svg>
  )
}

export function SpaceInvadersBand({ count = 8 }: { count?: number }) {
  const row1 = Array<SpriteKey>(count).fill('squid')
  const row2 = Array<SpriteKey>(count).fill('crab')
  const row3 = Array<SpriteKey>(count).fill('octopus')

  return (
    <div className="invaders-wrap relative w-full overflow-hidden py-4">
      {/* UFO occasionally flies across the top */}
      <div className="invaders-ufo absolute left-0 top-0">
        <Sprite kind="ufo" color="#ffcc33" px={3} />
      </div>

      <div className="invaders-march mx-auto flex max-w-fit flex-col items-center gap-2 sm:gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-5">
          {row1.map((k, i) => (
            <Sprite key={`r1-${i}`} kind={k} color="#b347ff" />
          ))}
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          {row2.map((k, i) => (
            <Sprite key={`r2-${i}`} kind={k} color="#4dd4ff" />
          ))}
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          {row3.map((k, i) => (
            <Sprite key={`r3-${i}`} kind={k} color="#ff3366" />
          ))}
        </div>
      </div>

      {/* Ground line — pixelated dashes */}
      <div className="mt-4 flex w-full items-center justify-center">
        <div
          className="h-[3px] w-full max-w-3xl"
          style={{
            background:
              'repeating-linear-gradient(90deg, #4dd4ff 0 6px, transparent 6px 12px)',
            opacity: 0.6,
          }}
        />
      </div>

      <style>{`
        .invaders-wrap svg {
          width: 18px;
          height: 18px;
        }
        @media (min-width: 640px) {
          .invaders-wrap svg {
            width: 22px;
            height: 22px;
          }
        }
        @media (min-width: 1024px) {
          .invaders-wrap svg {
            width: 28px;
            height: 28px;
          }
        }
        .invaders-march {
          animation: invaders-step 1.2s steps(2, end) infinite alternate;
        }
        @keyframes invaders-step {
          0% { transform: translateX(-10px); }
          100% { transform: translateX(10px); }
        }
        .invaders-ufo {
          animation: invaders-ufo 18s linear infinite;
          opacity: 0.9;
        }
        @keyframes invaders-ufo {
          0%, 85%, 100% { transform: translateX(-120px); opacity: 0; }
          88% { opacity: 0.95; }
          99% { transform: translateX(120vw); opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          .invaders-march { animation: none; }
          .invaders-ufo { animation: none; opacity: 0; }
        }
      `}</style>
    </div>
  )
}
