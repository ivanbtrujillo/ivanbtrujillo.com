import * as React from 'react'

type SectionProps = {
  title?: string
  children: React.ReactNode
}

type Section = React.FC<SectionProps>

export const Section: Section = ({ title, children }) => {
  const id = React.useId()

  return (
    <section
      aria-labelledby={title ? id : undefined}
      className="md:border-l md:border-zinc-700/40 md:pl-6"
    >
      <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        {title && (
          <h2
            id={id}
            className="text-sm font-semibold text-zinc-100"
          >
            {title}
          </h2>
        )}
        <div className="md:col-span-3">{children}</div>
      </div>
    </section>
  )
}
