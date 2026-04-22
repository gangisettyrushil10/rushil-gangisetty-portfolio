'use client'

import Image from 'next/image'
import { useReveal } from '@/hooks/use-reveal'
import { cn } from '@/lib/utils'

export interface IMessageParticipant {
  id: string
  name: string
  side: 'left' | 'right'
}

export interface IMessageAttachment {
  type: 'image'
  src: string
  alt: string
}

export interface IMessageMessage {
  fromId: string
  text?: string
  timestamp?: string
  readReceipt?: boolean
  attachment?: IMessageAttachment
}

interface IMessageThreadProps {
  header?: string
  participants: IMessageParticipant[]
  messages: IMessageMessage[]
  live?: boolean
  className?: string
}

function Bubble({
  side,
  children,
  showTail,
  delay,
}: {
  side: 'left' | 'right'
  children: React.ReactNode
  showTail: boolean
  delay: number
}) {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={cn(
        'imsg-bubble-reveal flex',
        side === 'right' ? 'justify-end' : 'justify-start'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          'relative max-w-[78%] rounded px-3.5 py-2 text-[15px] leading-[1.3]',
          side === 'right'
            ? 'bg-[linear-gradient(180deg,#0A84FF_0%,#0065db_100%)] text-white'
            : 'bg-[#3a3a3c] text-white',
          showTail && side === 'right' && 'imsg-tail-right',
          showTail && side === 'left' && 'imsg-tail-left'
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function IMessageThread({
  header,
  participants,
  messages,
  live = false,
  className,
}: IMessageThreadProps) {
  const byId = new Map(participants.map((p) => [p.id, p]))

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[380px] overflow-hidden rounded-md border border-(--pill-border) bg-[#0b0d14]',
        className
      )}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between border-b border-dashed border-(--pill-border) px-4 py-2">
        <div className="flex items-center gap-2">
          {live && <span className="pill-dot" />}
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle-foreground">
            iMessage
          </span>
        </div>
        <span className="font-mono text-[11px] tabular-nums text-subtle-foreground">
          {header ?? ''}
        </span>
      </div>

      {/* Participant strip */}
      <div className="flex items-center justify-center gap-2 border-b border-dashed border-(--pill-border) px-4 py-3">
        <div className="flex -space-x-2">
          {participants.map((p) => (
            <div
              key={p.id}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-(--pill-border) bg-bg-card-muted text-[10px] font-medium text-foreground"
              title={p.name}
            >
              {p.name.slice(0, 1).toUpperCase()}
            </div>
          ))}
        </div>
        <span className="text-[13px] font-medium text-foreground">
          {participants.map((p) => p.name).join(', ')}
        </span>
      </div>

      {/* Thread body */}
      <div className="flex flex-col gap-1 px-3 py-4">
        {messages.map((msg, idx) => {
          const participant = byId.get(msg.fromId)
          if (!participant) return null

          const side = participant.side
          const prev = idx > 0 ? messages[idx - 1] : undefined
          const next = idx < messages.length - 1 ? messages[idx + 1] : undefined
          const isRunStart = !prev || prev.fromId !== msg.fromId
          const isRunEnd = !next || next.fromId !== msg.fromId
          const delay = idx * 90

          return (
            <div key={idx} className="flex flex-col gap-0.5">
              {isRunStart && side === 'left' && (
                <div className="mt-2 px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                  {participant.name}
                </div>
              )}

              {msg.text && (
                <Bubble side={side} showTail={isRunEnd} delay={delay}>
                  {msg.text}
                </Bubble>
              )}

              {msg.attachment && (
                <Bubble side={side} showTail={false} delay={delay}>
                  <div className="overflow-hidden rounded-sm">
                    <Image
                      src={msg.attachment.src}
                      alt={msg.attachment.alt}
                      width={260}
                      height={200}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </Bubble>
              )}

              {msg.timestamp && (
                <div className="my-1 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
                  {msg.timestamp}
                </div>
              )}

              {msg.readReceipt && isRunEnd && side === 'right' && (
                <div className="pr-1 text-right font-mono text-[10px] text-subtle-foreground">
                  Read
                </div>
              )}
            </div>
          )
        })}
      </div>

      <style>{`
        .imsg-bubble-reveal {
          opacity: 0;
          transform: translateY(6px);
          transition: opacity var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out);
        }
        .imsg-bubble-reveal.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .imsg-tail-right::after {
          content: '';
          position: absolute;
          right: -2px;
          bottom: 0;
          width: 14px;
          height: 16px;
          background: #0065db;
          border-bottom-left-radius: 14px;
          z-index: -1;
        }
        .imsg-tail-left::after {
          content: '';
          position: absolute;
          left: -2px;
          bottom: 0;
          width: 14px;
          height: 16px;
          background: #3a3a3c;
          border-bottom-right-radius: 14px;
          z-index: -1;
        }
      `}</style>
    </div>
  )
}
