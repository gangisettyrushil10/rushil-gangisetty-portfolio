import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-14 sm:py-18', className)}
    >
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  badge?: string
  title: string
  description?: string
  className?: string
}

export function SectionHeader({ badge, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-8 max-w-3xl sm:mb-10', className)}>
      {badge && (
        <span className="section-label">
          {badge}
        </span>
      )}
      <h2 className="mt-4 text-2xl font-semibold leading-[0.98] tracking-[-0.05em] text-foreground sm:text-[2.45rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  )
}
