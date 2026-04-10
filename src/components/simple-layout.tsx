import { Container } from '@/components/container'

type SimpleLayoutProps = {
  title: string
  intro: string
  children?: React.ReactNode
}

type SimpleLayout = React.FC<SimpleLayoutProps>

export const SimpleLayout: SimpleLayout = ({ title, intro, children }) => {
  return (
    <Container className="mt-9">
      <div className="bg-black">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-base text-zinc-400">
            {intro}
          </p>
        </header>
        <div className="mt-16 sm:mt-20">{children}</div>
      </div>
    </Container>
  )
}
