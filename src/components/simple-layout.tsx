import { Container } from '@/components/container'

type SimpleLayoutProps = {
  title: string
  intro: string
  children?: React.ReactNode
}

type SimpleLayout = React.FC<SimpleLayoutProps>

export const SimpleLayout: SimpleLayout = ({ title, intro, children }) => {
  return (
    <Container className="mt-9 sm:mt-[86px]">
      <div className="bg-black">
        <header className="max-w-3xl">
          <h1 className="text-balance font-heading text-4xl uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400">
            {intro}
          </p>
        </header>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </Container>
  )
}
