import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
  secondary:
    'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70',
}

type BaseProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  className?: string
}
type LinkProps = PropsFrom<typeof Link>

type ButtonProps = LinkProps | React.HTMLAttributes<HTMLButtonElement>

type Button = React.FC<BaseProps & ButtonProps>

export const Button: Button = ({
  variant = 'primary',
  className,
  href,
  ...props
}) => {
  const classNameWithVariant = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className
  )

  return href ? (
    <Link
      href={href}
      className={classNameWithVariant}
      {...(props as LinkProps)}
    />
  ) : (
    <button
      className={classNameWithVariant}
      {...(props as React.HTMLAttributes<HTMLButtonElement>)}
    />
  )
}
