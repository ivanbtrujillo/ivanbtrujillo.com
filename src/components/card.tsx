import Link, { LinkProps } from 'next/link'
import clsx from 'clsx'
import { ChevronIcon } from './icons'

type CardProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}

type Card = React.FC<CardProps> & {
  Link: CardLink
  Title: CardTitle
  Description: CardDescription
  Cta: CardCta
  Eyebrow: CardEyebrow
}

export const Card: Card = ({ as: Component = 'div', className, children }) => {
  return (
    <Component
      className={clsx(className, 'group relative flex flex-col items-start')}
    >
      {children}
    </Component>
  )
}

type CardLinkProps = LinkProps & {
  children: React.ReactNode
}
type CardLink = React.FC<CardLinkProps>

const CardLink: CardLink = ({ children, ...props }) => {
  return (
    <>
      <div className="absolute -inset-y-6 -inset-x-4 z-0 border border-transparent opacity-0 transition group-hover:border-white/10 group-hover:opacity-100 sm:-inset-x-6" />
      <Link {...props}>
        <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

type CardTitleProps = {
  as?: React.ElementType
  href?: string
  children: React.ReactNode
}

type CardTitle = React.FC<CardTitleProps>

const CardTitle: CardTitle = ({ as: Component = 'h2', href, children }) => {
  return (
    <Component className="text-lg font-semibold tracking-tight text-zinc-100">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  )
}

type CardDescriptionProps = {
  children: React.ReactNode
}

type CardDescription = React.FC<CardDescriptionProps>

const CardDescription: CardDescription = ({ children }) => {
  return (
    <p className="relative z-10 mt-2 text-base text-zinc-400">
      {children}
    </p>
  )
}

type CardCtaProps = {
  children: React.ReactNode
}

type CardCta = React.FC<CardCtaProps>

const CardCta: CardCta = ({ children }) => {
  return (
    <div
      aria-hidden="true"
      className="font-hud relative z-10 mt-4 flex items-center text-sm font-medium uppercase tracking-wider text-zinc-200"
    >
      {children}
      <ChevronIcon.Right className="ml-1 h-4 w-4 stroke-current" />
    </div>
  )
}

type CardEyebrowProps = {
  as?: React.ElementType
  decorate?: boolean
  className?: string
  children: React.ReactNode
} & React.AllHTMLAttributes<HTMLElement>

type CardEyebrow = React.FC<CardEyebrowProps>

const CardEyebrow: CardEyebrow = ({
  as: Component = 'p',
  decorate = false,
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-500',
        decorate && 'pl-3.5'
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-3 w-px bg-white" />
        </span>
      )}
      {children}
    </Component>
  )
}

Card.Link = CardLink
Card.Title = CardTitle
Card.Description = CardDescription
Card.Cta = CardCta
Card.Eyebrow = CardEyebrow
