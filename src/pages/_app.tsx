import { useEffect, useRef } from 'react'
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google'
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
          'font-display antialiased'
        )}
      >
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl">
            <div className="bg-grid-hud w-full bg-zinc-950/80 ring-1 ring-white/10" />
          </div>
        </div>
        {/* Floating particles */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {[
            { left: '10%', delay: '0s', duration: '18s', size: 'h-1 w-1', color: 'bg-accent/20' },
            { left: '25%', delay: '3s', duration: '22s', size: 'h-0.5 w-0.5', color: 'bg-white/15' },
            { left: '40%', delay: '7s', duration: '20s', size: 'h-1 w-1', color: 'bg-accent-secondary/15' },
            { left: '55%', delay: '2s', duration: '25s', size: 'h-0.5 w-0.5', color: 'bg-accent/15' },
            { left: '70%', delay: '5s', duration: '19s', size: 'h-1 w-1', color: 'bg-white/10' },
            { left: '85%', delay: '9s', duration: '23s', size: 'h-0.5 w-0.5', color: 'bg-accent/15' },
            { left: '15%', delay: '12s', duration: '21s', size: 'h-0.5 w-0.5', color: 'bg-white/10' },
            { left: '60%', delay: '15s', duration: '17s', size: 'h-1 w-1', color: 'bg-accent/15' },
            { left: '35%', delay: '8s', duration: '24s', size: 'h-0.5 w-0.5', color: 'bg-accent-secondary/10' },
            { left: '80%', delay: '1s', duration: '20s', size: 'h-0.5 w-0.5', color: 'bg-white/15' },
          ].map((p, i) => (
            <div
              key={`particle-${JSON.stringify(p)}`}
              className={clsx('absolute bottom-0 rounded-full', p.size, p.color)}
              style={{
                left: p.left,
                animation: `float-particle ${p.duration} ${p.delay} ease-in-out infinite`,
              }}
            />
          ))}
        </div>
        {/* Large decorative HUD symbols on the sides */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden xl:block"
        >
          {/* ═══════════ LEFT SIDE ═══════════ */}

          {/* Giant X — top */}
          <div className="hud-float-3 absolute left-[5%] top-16 font-hud text-[160px] font-black leading-none text-white/[0.2]">
            &#x2716;
          </div>
          {/* Medium X with gradient */}
          <div className="hud-float-1 absolute left-[15%] top-[22%] font-hud text-[64px] font-bold leading-none text-accent/25">
            &#x2716;
          </div>
          {/* Holo vertical bar — tall */}
          <div className="hud-float-pulse absolute left-[8%] top-[18%] h-40 w-1.5 holo-bar rounded-full opacity-80" />
          {/* Radar reticle — left */}
          <svg className="hud-float-2 absolute left-[12%] top-[33%] h-28 w-28 opacity-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
            <circle cx="50" cy="50" r="40" className="text-white" />
            <circle cx="50" cy="50" r="25" className="text-white" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="10" className="text-accent" />
            <line x1="50" y1="5" x2="50" y2="95" className="text-white" strokeWidth="0.5" />
            <line x1="5" y1="50" x2="95" y2="50" className="text-white" strokeWidth="0.5" />
            <line x1="18" y1="18" x2="82" y2="82" className="text-white" strokeWidth="0.3" strokeDasharray="3 5" />
            <line x1="82" y1="18" x2="18" y2="82" className="text-white" strokeWidth="0.3" strokeDasharray="3 5" />
            <circle cx="50" cy="50" r="3" className="text-accent" fill="rgb(var(--accent-rgb) / 0.3)" />
          </svg>
          {/* Dashed circle — large */}
          <div className="hud-float-4 absolute left-[20%] top-[28%] h-24 w-24 rounded-full border-2 border-dashed border-white/[0.18]" />
          {/* Solid small square */}
          <div className="hud-float-5 absolute left-[25%] top-[48%] h-4 w-4 bg-white/[0.18]" />
          <div className="hud-float-1 absolute left-[28%] top-[48%] h-4 w-4 border border-white/[0.2]" />
          {/* Diamond — nested */}
          <div className="hud-float-rotate absolute left-[10%] top-[55%] h-20 w-20 border-2 border-white/[0.18]">
            <div className="absolute inset-3 border border-dashed border-accent/25" />
          </div>
          {/* Stacked horizontal bars */}
          <div className="hud-float-2 absolute left-[18%] top-[68%] flex flex-col gap-1">
            <div className="h-2 w-14 bg-white/[0.18]" />
            <div className="h-2 w-10 bg-white/[0.14]" />
            <div className="h-2 w-14 bg-white/[0.18]" />
            <div className="h-2 w-8 bg-accent/18" />
            <div className="h-2 w-14 bg-white/[0.18]" />
            <div className="h-2 w-12 bg-white/[0.14]" />
          </div>
          {/* Small X cluster */}
          <div className="hud-float-5 absolute left-[6%] top-[78%] font-hud text-4xl text-white/[0.18]">
            &#x2716;
          </div>
          <div className="hud-float-1 absolute left-[22%] top-[80%] font-hud text-xl text-accent/25">
            &#x2716;
          </div>
          {/* Dot grid */}
          <div className="hud-float-3 absolute left-[14%] top-[85%] flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-white/[0.22]" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/[0.22]" />
              <div className="h-1.5 w-1.5 rounded-full bg-accent/22" />
            </div>
            <div className="flex gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-white/[0.22]" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/[0.22]" />
            </div>
            <div className="flex gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent/22" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/[0.22]" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/[0.22]" />
            </div>
          </div>
          {/* Holo bar — bottom */}
          <div className="hud-float-pulse absolute left-[8%] top-[90%] h-20 w-1 holo-bar rounded-full opacity-70" />
          {/* Technical label */}
          <div className="absolute left-[3%] top-[95%] font-hud text-[9px] tracking-[0.3em] text-zinc-500">
            _SYS.L;
          </div>

          {/* ═══════════ RIGHT SIDE ═══════════ */}

          {/* Giant X — top right */}
          <div className="hud-float-2 absolute right-[5%] top-8 font-hud text-[180px] font-black leading-none text-white/[0.18]">
            &#x2716;
          </div>
          {/* Holo vertical bar — tall */}
          <div className="hud-float-pulse absolute right-[8%] top-[12%] h-48 w-1.5 holo-bar rounded-full opacity-80" />
          {/* Barcode — tall colorful */}
          <div className="hud-float-4 absolute right-[15%] top-[35%] h-20 w-4 barcode-holo opacity-60" />
          {/* Hex circuit — right */}
          <svg className="hud-float-3 absolute right-[12%] top-[24%] h-32 w-24 opacity-20" viewBox="0 0 80 120" fill="none" stroke="currentColor" strokeWidth="0.8">
            {/* Top hexagon */}
            <polygon points="40,4 54,12 54,28 40,36 26,28 26,12" className="text-white" />
            <circle cx="40" cy="20" r="3" className="text-accent" fill="rgb(var(--accent-rgb) / 0.25)" />
            {/* Middle hexagon */}
            <polygon points="40,44 54,52 54,68 40,76 26,68 26,52" className="text-white" strokeDasharray="4 2" />
            <circle cx="40" cy="60" r="2" className="text-white" fill="rgb(255 255 255 / 0.15)" />
            {/* Bottom hexagon */}
            <polygon points="40,84 54,92 54,108 40,116 26,108 26,92" className="text-accent" />
            <circle cx="40" cy="100" r="3" className="text-accent" fill="rgb(var(--accent-rgb) / 0.25)" />
            {/* Connecting lines */}
            <line x1="40" y1="36" x2="40" y2="44" className="text-accent" strokeWidth="0.5" />
            <line x1="40" y1="76" x2="40" y2="84" className="text-accent" strokeWidth="0.5" />
            {/* Side nodes */}
            <circle cx="14" cy="40" r="2" className="text-white" />
            <line x1="26" y1="28" x2="14" y2="40" className="text-white" strokeWidth="0.4" strokeDasharray="2 3" />
            <circle cx="66" cy="80" r="2" className="text-white" />
            <line x1="54" y1="68" x2="66" y2="80" className="text-white" strokeWidth="0.4" strokeDasharray="2 3" />
          </svg>
          {/* Medium X — gradient */}
          <div className="hud-float-5 absolute right-[20%] top-[45%] font-hud text-[72px] font-bold leading-none text-accent/22">
            &#x2716;
          </div>
          {/* Crosshair */}
          <div className="hud-float-1 absolute right-[25%] top-[55%]">
            <div className="h-10 w-px bg-white/[0.12]" />
            <div className="absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 bg-white/[0.12]" />
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.2]" />
          </div>
          {/* Stacked bars — right */}
          <div className="hud-float-4 absolute right-[10%] top-[62%] flex flex-col gap-1">
            <div className="ml-auto h-2 w-16 bg-white/[0.18]" />
            <div className="ml-auto h-2 w-12 bg-accent/18" />
            <div className="ml-auto h-2 w-16 bg-white/[0.18]" />
            <div className="ml-auto h-2 w-10 bg-white/[0.14]" />
            <div className="ml-auto h-2 w-14 bg-accent-secondary/15" />
            <div className="ml-auto h-2 w-16 bg-white/[0.18]" />
          </div>
          {/* Diamond — large nested */}
          <div className="hud-float-rotate absolute right-[18%] top-[72%] h-24 w-24 border-2 border-dashed border-white/[0.18]">
            <div className="absolute inset-4 border border-accent/25" />
            <div className="absolute inset-7 border border-dashed border-white/[0.18]" />
          </div>
          {/* Small X cluster */}
          <div className="hud-float-2 absolute right-[6%] top-[84%] font-hud text-3xl text-white/[0.2]">
            &#x2716;
          </div>
          <div className="hud-float-5 absolute right-[22%] top-[86%] font-hud text-lg text-accent/25">
            &#x2716;
          </div>
          {/* Dot grid — right */}
          <div className="hud-float-3 absolute right-[14%] top-[90%] flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent/22" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/[0.22]" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/[0.22]" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/[0.22]" />
            </div>
            <div className="flex gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-white/[0.22]" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/[0.22]" />
              <div className="h-1.5 w-1.5 rounded-full bg-accent/22" />
            </div>
          </div>
          {/* Circle — bottom right */}
          <div className="hud-float-1 absolute right-[16%] top-[95%] h-8 w-8 rounded-full border border-white/[0.2]" />
          {/* Technical label */}
          <div className="absolute right-[3%] top-[97%] font-hud text-[9px] tracking-[0.3em] text-zinc-500">
            _SYS.R;
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
