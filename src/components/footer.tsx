import { Container } from '@/components/container'

type Footer = React.FC
export const Footer: Footer = () => {
  return (
    <footer className="mt-32">
      <Container.Outer>
        {/* Holographic top border */}
        <div aria-hidden className="mx-auto h-0.5 max-w-5xl holo-bar-h rounded-full opacity-60" />
        <div className="pt-10 pb-16">
          <Container.Inner>
            <div className="flex flex-col gap-8 bg-black">
              {/* Top row — tagline + back to top */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-hud text-[10px] uppercase tracking-[0.35em] text-zinc-200">
                    Iván Trujillo
                  </p>
                  <p className="mt-2 max-w-sm text-base text-zinc-200">
                    Building at the intersection of front-end engineering and AI.
                  </p>
                </div>
              </div>
              {/* Decorative row */}
              <div
                aria-hidden
                className="flex items-center gap-4 border-t border-white/10 pt-6"
              >
                <span className="font-hud text-[10px] tracking-[0.15em] text-zinc-700">
                  [+]
                </span>
                <div className="barcode-holo h-3 w-20 opacity-30" />
                <div className="ml-auto flex gap-1.5">
                  <div className="h-1 w-1 rounded-full bg-white/10" />
                  <div className="h-1 w-1 rounded-full bg-accent/10" />
                  <div className="h-1 w-1 rounded-full bg-white/10" />
                  <div className="h-1 w-1 rounded-full bg-white/10" />
                </div>
                <span className="font-hud text-[10px] tracking-[0.15em] text-zinc-700">
                  [+]
                </span>
              </div>
              {/* Bottom row — copyright */}
              <div className="flex items-center justify-between">
                <p className="text-base text-zinc-200">
                  &copy; {new Date().getFullYear()} Iván Trujillo. All rights
                  reserved.
                </p>
                
              </div>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
