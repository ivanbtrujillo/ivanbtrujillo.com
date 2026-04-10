import Head from 'next/head'
import { useRouter } from 'next/compat/router'

import { Container } from '@/components/container'
import { Prose } from '@/components/prose'
import { formatDate } from '@/lib/format-date'
import { ArrowIcon } from './icons'

type ArticleLayoutProps = {
  children: React.ReactNode
  meta: {
    title: string
    description: string
    date: string
  }
  isRssFeed?: boolean
  previousPathname?: string
}

type ArticleLayout = React.FC<ArticleLayoutProps>

export const ArticleLayout: ArticleLayout = ({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
}) => {
  const router = useRouter()

  if (isRssFeed) {
    return <>{children}</>
  }

  return (
    <>
      <Head>
        <title>{`${meta.title} - Iván Trujillo`}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className=" bg-black px-6 py-8 sm:px-8">
            {previousPathname && (
              <button
                type="button"
                onClick={() => router?.back()}
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-800 shadow-md shadow-zinc-800/5 ring-1 ring-white/10 transition hover:border-zinc-700 hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
              >
                <ArrowIcon.Left className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-400" />
              </button>
            )}
            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
                  {meta.title}
                </h1>
                <time
                  dateTime={meta.date}
                  className="order-first flex items-center text-base text-zinc-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-500" />
                  <span className="ml-3">{formatDate(meta.date)}</span>
                </time>
              </header>
              <Prose className="mt-8">{children}</Prose>
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}
