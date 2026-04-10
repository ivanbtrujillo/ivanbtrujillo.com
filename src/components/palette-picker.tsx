import { useEffect, useRef, useState } from 'react'

type Palette = {
  name: string
  g1: string; g2: string; g3: string; g4: string; g5: string
  g1Light: string; g2Light: string; g4Light: string
  accentRgb: string; accentLightRgb: string; accentSecondaryRgb: string
}

const palettes: Palette[] = [
  // Default
  {
    name: 'Lavender',
    g1: '#c084fc', g2: '#a78bfa', g3: '#818cf8', g4: '#f0abfc', g5: '#f472b6',
    g1Light: '#d8b4fe', g2Light: '#c4b5fd', g4Light: '#f5d0fe',
    accentRgb: '167 139 250', accentLightRgb: '196 181 253', accentSecondaryRgb: '240 171 252',
  },
  // Warm
  {
    name: 'Ember',
    g1: '#ef4444', g2: '#f97316', g3: '#fb923c', g4: '#4ade80', g5: '#22c55e',
    g1Light: '#fca5a5', g2Light: '#fdba74', g4Light: '#86efac',
    accentRgb: '249 115 22', accentLightRgb: '253 186 116', accentSecondaryRgb: '74 222 128',
  },
  {
    name: 'Solar',
    g1: '#f59e0b', g2: '#eab308', g3: '#facc15', g4: '#a3e635', g5: '#84cc16',
    g1Light: '#fcd34d', g2Light: '#fde047', g4Light: '#bef264',
    accentRgb: '234 179 8', accentLightRgb: '253 224 71', accentSecondaryRgb: '163 230 53',
  },
  {
    name: 'Sunset',
    g1: '#ef4444', g2: '#f97316', g3: '#facc15', g4: '#fb923c', g5: '#ef4444',
    g1Light: '#fca5a5', g2Light: '#fdba74', g4Light: '#fcd34d',
    accentRgb: '249 115 22', accentLightRgb: '253 186 116', accentSecondaryRgb: '250 204 21',
  },
  {
    name: 'Magma',
    g1: '#dc2626', g2: '#ef4444', g3: '#f97316', g4: '#facc15', g5: '#fde047',
    g1Light: '#fca5a5', g2Light: '#fdba74', g4Light: '#fef08a',
    accentRgb: '239 68 68', accentLightRgb: '252 165 165', accentSecondaryRgb: '250 204 21',
  },
  // Cool
  {
    name: 'Violet',
    g1: '#a78bfa', g2: '#818cf8', g3: '#6366f1', g4: '#60a5fa', g5: '#38bdf8',
    g1Light: '#c4b5fd', g2Light: '#a5b4fc', g4Light: '#93c5fd',
    accentRgb: '167 139 250', accentLightRgb: '196 181 253', accentSecondaryRgb: '96 165 250',
  },
  {
    name: 'Ocean',
    g1: '#14b8a6', g2: '#06b6d4', g3: '#22d3ee', g4: '#38bdf8', g5: '#0ea5e9',
    g1Light: '#5eead4', g2Light: '#67e8f9', g4Light: '#7dd3fc',
    accentRgb: '6 182 212', accentLightRgb: '103 232 249', accentSecondaryRgb: '56 189 248',
  },
  {
    name: 'Aurora',
    g1: '#22c55e', g2: '#06b6d4', g3: '#6366f1', g4: '#a78bfa', g5: '#e879f9',
    g1Light: '#86efac', g2Light: '#67e8f9', g4Light: '#c4b5fd',
    accentRgb: '99 102 241', accentLightRgb: '165 180 252', accentSecondaryRgb: '34 197 94',
  },
  {
    name: 'Ice',
    g1: '#e0f2fe', g2: '#bae6fd', g3: '#7dd3fc', g4: '#38bdf8', g5: '#0ea5e9',
    g1Light: '#f0f9ff', g2Light: '#e0f2fe', g4Light: '#bae6fd',
    accentRgb: '56 189 248', accentLightRgb: '125 211 252', accentSecondaryRgb: '186 230 253',
  },
  // Floral / Pastel
  {
    name: 'Sakura',
    g1: '#fb7185', g2: '#f472b6', g3: '#e879f9', g4: '#c084fc', g5: '#a78bfa',
    g1Light: '#fda4af', g2Light: '#f9a8d4', g4Light: '#d8b4fe',
    accentRgb: '244 114 182', accentLightRgb: '249 168 212', accentSecondaryRgb: '192 132 252',
  },
  {
    name: 'Rose',
    g1: '#e11d48', g2: '#f43f5e', g3: '#fb7185', g4: '#fda4af', g5: '#ffe4e6',
    g1Light: '#fb7185', g2Light: '#fda4af', g4Light: '#fecdd3',
    accentRgb: '244 63 94', accentLightRgb: '253 164 175', accentSecondaryRgb: '251 113 133',
  },
  // Neutral / Special
  {
    name: 'Matrix',
    g1: '#052e16', g2: '#166534', g3: '#22c55e', g4: '#4ade80', g5: '#bbf7d0',
    g1Light: '#166534', g2Light: '#22c55e', g4Light: '#86efac',
    accentRgb: '34 197 94', accentLightRgb: '74 222 128', accentSecondaryRgb: '187 247 208',
  },
  {
    name: 'Mono',
    g1: '#e4e4e7', g2: '#a1a1aa', g3: '#71717a', g4: '#d4d4d8', g5: '#f4f4f5',
    g1Light: '#f4f4f5', g2Light: '#e4e4e7', g4Light: '#fafafa',
    accentRgb: '161 161 170', accentLightRgb: '212 212 216', accentSecondaryRgb: '228 228 231',
  },
  {
    name: 'Gold',
    g1: '#92400e', g2: '#b45309', g3: '#d97706', g4: '#f59e0b', g5: '#fbbf24',
    g1Light: '#d97706', g2Light: '#f59e0b', g4Light: '#fcd34d',
    accentRgb: '217 119 6', accentLightRgb: '245 158 11', accentSecondaryRgb: '251 191 36',
  },
  // Flags
  {
    name: 'Canarias',
    g1: '#f8fafc', g2: '#3b82f6', g3: '#facc15', g4: '#60a5fa', g5: '#fde047',
    g1Light: '#ffffff', g2Light: '#93c5fd', g4Light: '#fef08a',
    accentRgb: '59 130 246', accentLightRgb: '147 197 253', accentSecondaryRgb: '250 204 21',
  },
  {
    name: 'Tenerife',
    g1: '#f0f9ff', g2: '#38bdf8', g3: '#e0f2fe', g4: '#0ea5e9', g5: '#bae6fd',
    g1Light: '#f8fafc', g2Light: '#7dd3fc', g4Light: '#38bdf8',
    accentRgb: '14 165 233', accentLightRgb: '56 189 248', accentSecondaryRgb: '186 230 253',
  },
  {
    name: 'Spain',
    g1: '#dc2626', g2: '#facc15', g3: '#ef4444', g4: '#fbbf24', g5: '#dc2626',
    g1Light: '#fca5a5', g2Light: '#fde047', g4Light: '#fcd34d',
    accentRgb: '239 68 68', accentLightRgb: '252 165 165', accentSecondaryRgb: '250 204 21',
  },
]

function applyPalette(p: Palette) {
  const root = document.documentElement.style
  root.setProperty('--g1', p.g1)
  root.setProperty('--g2', p.g2)
  root.setProperty('--g3', p.g3)
  root.setProperty('--g4', p.g4)
  root.setProperty('--g5', p.g5)
  root.setProperty('--g1-light', p.g1Light)
  root.setProperty('--g2-light', p.g2Light)
  root.setProperty('--g4-light', p.g4Light)
  root.setProperty('--accent-rgb', p.accentRgb)
  root.setProperty('--accent-light-rgb', p.accentLightRgb)
  root.setProperty('--accent-secondary-rgb', p.accentSecondaryRgb)
}

const PaletteIcon = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2Z" />
  </svg>
)

export const PalettePicker = () => {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="pointer-events-auto fixed right-4 top-3 z-[60] sm:right-8">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 items-center justify-center border border-white/10 bg-zinc-900/90 text-zinc-400 backdrop-blur transition hover:border-white/20 hover:text-white"
        aria-label="Change color palette"
      >
        <PaletteIcon className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-52 border border-white/10 bg-zinc-950/95 py-1 backdrop-blur-md">
          <div className="px-3 py-1.5">
            <span className="font-hud text-[9px] uppercase tracking-[0.2em] text-zinc-500">
              Color palette
            </span>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {palettes.map((p, i) => (
              <button
                key={p.name}
                onClick={() => {
                  setActive(i)
                  applyPalette(p)
                }}
                className={
                  'flex w-full items-center gap-3 px-3 py-1.5 font-hud text-[11px] uppercase tracking-wider transition ' +
                  (active === i
                    ? 'bg-white/10 text-white'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200')
                }
              >
                <span
                  className="h-3 w-8 shrink-0 rounded-sm"
                  style={{
                    background: `linear-gradient(90deg, ${p.g1}, ${p.g3}, ${p.g5})`,
                  }}
                />
                <span>{p.name}</span>
                {active === i && (
                  <span className="ml-auto text-[9px] text-zinc-500">&check;</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
