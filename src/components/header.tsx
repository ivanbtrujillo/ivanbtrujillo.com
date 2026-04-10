import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/compat/router'
import {
  CloseButton,
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/container'
import { CloseIcon, MenuBarsIcon } from './icons'

type MobileNavItemProps = {
  href: string
  children: React.ReactNode
}

type MobileNavItem = React.FC<MobileNavItemProps>

const MobileNavItem: MobileNavItem = ({ href, children }) => {
  return (
    <li>
      <Link
        href={href}
        className="block py-2 text-zinc-300"
      >
        {children}
      </Link>
    </li>
  )
}

type MobileNavigation = React.FC<PropsFrom<typeof Popover>>

const MobileNavigation: MobileNavigation = (props) => {
  const router = useRouter()
  const [menuKey, setMenuKey] = React.useState(0)

  React.useEffect(() => {
    if (!router) return
    const closeMenuOnNavigate = () => {
      setMenuKey((k) => k + 1)
    }
    router.events.on('routeChangeStart', closeMenuOnNavigate)
    return () => router.events.off('routeChangeStart', closeMenuOnNavigate)
  }, [router])

  return (
    <Popover key={menuKey} {...props}>
      <PopoverButton
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center border border-white/10 bg-zinc-900/90 text-zinc-200 backdrop-blur transition hover:border-white/20 hover:text-white"
      >
        <MenuBarsIcon className="h-5 w-5 stroke-current" />
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition duration-150 data-[closed]:opacity-0"
      />
      <PopoverPanel
        focus
        transition
        className="fixed inset-x-4 top-8 z-50 origin-top border border-white/10 bg-zinc-900 p-8 transition duration-150 data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <div className="flex flex-row-reverse items-center justify-between">
          <CloseButton aria-label="Close menu" className="-m-1 p-1">
            <CloseIcon className="h-6 w-6 text-zinc-400" />
          </CloseButton>
          <h2 className="text-sm font-medium text-zinc-400">
            Navigation
          </h2>
        </div>
        <nav className="mt-6">
          <ul className="-my-2 divide-y divide-zinc-100/5 text-base text-zinc-300">
            <MobileNavItem href="/">Main</MobileNavItem>
            <MobileNavItem href="/about">About</MobileNavItem>
            <MobileNavItem href="/articles">Articles</MobileNavItem>
          </ul>
        </nav>
      </PopoverPanel>
    </Popover>
  )
}

type NavItemProps = {
  href: string
  children: React.ReactNode
}

type NavItemWithIndexProps = NavItemProps & {
  index: string
  currentPath: string
}

const NavItem: React.FC<NavItemWithIndexProps> = ({
  href,
  children,
  index,
  currentPath,
}) => {
  const isActive =
    href === '/'
      ? currentPath === '/'
      : currentPath === href || currentPath.startsWith(`${href}/`)

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'font-hud relative flex items-baseline gap-2 px-3 py-2 text-xs uppercase tracking-[0.2em] transition',
          isActive
            ? 'text-accent'
            : 'text-zinc-400 hover:text-white'
        )}
      >
        <span className={clsx('text-[10px]', isActive ? 'text-accent-light' : 'text-zinc-500')}>
          {index}
        </span>
        <span>{children}</span>
        {isActive && (
          <span className="absolute inset-x-2 -bottom-px h-px holo-bar-h" />
        )}
      </Link>
    </li>
  )
}

type DesktopNavigationProps = React.ComponentPropsWithoutRef<'nav'>
type DesktopNavigation = React.FC<DesktopNavigationProps>

const DesktopNavigation: DesktopNavigation = (props) => {
  const router = useRouter()
  const pathname = router?.pathname ?? '/'

  return (
    <nav {...props}>
      <ul className="flex border border-white/10 bg-zinc-900/90 px-1 backdrop-blur">
        <NavItem href="/" index="00" currentPath={pathname}>
          Main
        </NavItem>
        <NavItem href="/articles" index="01" currentPath={pathname}>
          Articles
        </NavItem>
        <NavItem href="/about" index="02" currentPath={pathname}>
          About
        </NavItem>
      </ul>
    </nav>
  )
}

type Header = React.FC
export const Header: Header = () => {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-zinc-950/95 backdrop-blur-md">
      <Container className="py-3">
        <div className="relative flex items-center justify-end md:justify-center">
          <MobileNavigation className="pointer-events-auto md:hidden" />
          <DesktopNavigation className="pointer-events-auto hidden md:block" />
        </div>
      </Container>
    </header>
  )
}
