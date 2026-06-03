import { useEffect, useRef } from 'react'
import { Anton, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import clsx from 'clsx'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { PalettePicker } from '@/components/palette-picker'

import '@/styles/tailwind.css'
import { AppProps } from 'next/app'

const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const fontHeading = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-heading',
  display: 'swap',
})

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

type App = React.FC<AppProps>

const App: App = ({ Component, pageProps, router }) => {
  const previousPathname = usePrevious(router.pathname)

  // Scroll-triggered animations — re-run when route changes so new DOM elements get observed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => { observer.observe(el) })
    return () => observer.disconnect()
  }, [router.pathname])

  return (
    <>
      <div
        className={clsx(
          fontDisplay.variable,
          fontMono.variable,
          fontHeading.variable,
          'font-display antialiased'
        )}
      >
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl">
            <div className="bg-grid-hud w-full bg-zinc-950/80 ring-1 ring-white/10" />
          </div>
        </div>
        <div className="relative z-[1]">
          <Header />
          <PalettePicker />
          <main className="pt-16">
            <Component
              previousPathname={previousPathname}
              {...pageProps}
            />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
