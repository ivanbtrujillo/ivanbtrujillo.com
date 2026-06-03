import { useEffect, useRef, useState } from 'react'

type TypewriterProps = {
  text: string
  /** ms between characters */
  speed?: number
  /** ms before typing starts once in view */
  startDelay?: number
}

type Typewriter = React.FC<TypewriterProps>

/*
 * Types `text` out one character at a time once it scrolls into view.
 * The full text is rendered invisibly to reserve its final size, so the
 * surrounding layout never shifts while characters are being typed. A
 * blinking accent caret trails the typed text. Respects reduced-motion and
 * gracefully shows the full text immediately when IntersectionObserver is
 * unavailable.
 */
export const Typewriter: Typewriter = ({
  text,
  speed = 32,
  startDelay = 120,
}) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setCount(text.length)
      return
    }

    let charTimer: ReturnType<typeof setTimeout>
    let startTimer: ReturnType<typeof setTimeout>

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting || started.current) return
        started.current = true
        observer.disconnect()

        const typeNext = (i: number) => {
          setCount(i)
          if (i < text.length) {
            charTimer = setTimeout(() => typeNext(i + 1), speed)
          }
        }
        startTimer = setTimeout(() => typeNext(1), startDelay)
      },
      { threshold: 0.25 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      clearTimeout(charTimer)
      clearTimeout(startTimer)
    }
  }, [text, speed, startDelay])

  const done = count >= text.length

  return (
    <span ref={ref} className="relative inline-block">
      {/* Reserve the final footprint so layout never shifts. */}
      <span aria-hidden className="invisible">
        {text}
      </span>
      {/* Typed overlay, wrapping within the reserved box. */}
      <span className="absolute inset-0">
        {text.slice(0, count)}
        {!done && <span aria-hidden className="tw-caret" />}
      </span>
    </span>
  )
}
