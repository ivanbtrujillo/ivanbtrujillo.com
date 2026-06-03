import Link from 'next/link'
import clsx from 'clsx'

import { ArrowIcon } from '@/components/icons'

type CtaPanel = {
  eyebrow: string
  title: React.ReactNode
  href: string
  external?: boolean
}

type CtaBandProps = {
  /* Orange panel — primary action. */
  left: CtaPanel
  /* Black panel — secondary action. */
  right: CtaPanel
  className?: string
}

type Panel = React.FC<{ panel: CtaPanel; tone: 'orange' | 'dark' }>

const Panel: Panel = ({ panel, tone }) => {
  const isOrange = tone === 'orange'
  const external = panel.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Link
      href={panel.href}
      {...external}
      className={clsx(
        'group flex items-center justify-between gap-6 px-8 py-14 transition sm:px-12 sm:py-16 lg:px-16',
        isOrange
          ? 'bg-accent hover:opacity-95'
          : 'bg-zinc-950 hover:bg-zinc-900'
      )}
    >
      <div>
        <p
          className={clsx(
            'font-hud text-xs font-bold uppercase tracking-[0.25em]',
            isOrange ? 'text-on-accent/70' : 'text-accent'
          )}
        >
          {panel.eyebrow}
        </p>
        <p
          className={clsx(
            'mt-3 font-heading text-3xl uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl',
            isOrange ? 'text-on-accent' : 'text-white'
          )}
        >
          {panel.title}
        </p>
      </div>
      <ArrowIcon.UpRight
        aria-hidden
        className={clsx(
          'h-8 w-8 shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1',
          isOrange ? 'text-on-accent' : 'text-accent'
        )}
      />
    </Link>
  )
}

type CtaBand = React.FC<CtaBandProps>

/* McLaren-style split CTA: an orange panel and a black panel sitting side by
   side, flush to the gray frame lines (max-w-7xl, no inner padding). Each half
   is its own action. Stacks vertically on mobile. */
export const CtaBand: CtaBand = ({ left, right, className }) => {
  return (
    <section className={clsx('mt-20 sm:mt-24 sm:px-8', className)}>
      <div className="mx-auto grid max-w-7xl overflow-hidden md:grid-cols-2">
        <Panel panel={left} tone="orange" />
        <Panel panel={right} tone="dark" />
      </div>
    </section>
  )
}
