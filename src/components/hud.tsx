import clsx from 'clsx'

export const HudBracket = ({
  className = '',
  flip = false,
}: {
  className?: string
  flip?: boolean
}) => (
  <span
    aria-hidden
    className={clsx(
      'pointer-events-none font-hud text-[10px] leading-none text-zinc-300',
      flip && 'scale-x-[-1]',
      className
    )}
  >
    [+]
  </span>
)

export const HudCross = ({ className = '' }: { className?: string }) => (
  <span
    aria-hidden
    className={clsx(
      'pointer-events-none inline-block font-hud text-lg leading-none text-accent-light',
      className
    )}
  >
    &#x2716;
  </span>
)

export const HudDots = ({ className = '' }: { className?: string }) => (
  <span
    aria-hidden
    className={clsx(
      'pointer-events-none inline-flex gap-1',
      className
    )}
  >
    {[...Array(4)].map((_, i) => (
      <span
        key={`dots-${i}`}
        className="h-1 w-1 rounded-full bg-zinc-300"
        aria-hidden
      />
    ))}
  </span>
)

export const HudBarcode = ({
  className = '',
  colorful = false,
}: {
  className?: string
  colorful?: boolean
}) => (
  <div
    aria-hidden
    className={clsx(
      'pointer-events-none h-3 w-16',
      colorful ? 'barcode-holo' : 'barcode text-zinc-200',
      className
    )}
  />
)
