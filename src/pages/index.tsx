import { useEffect, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { Card } from '@/components/card'
import { Container } from '@/components/container'
import { HudCross } from '@/components/hud'
import { ArrowIcon, SocialIcon } from '@/components/icons'
import { Typewriter } from '@/components/typewriter'

import portraitImage from '@/images/portrait-2.jpeg'
import { formatDate } from '@/lib/format-date'
import { generateRssFeed } from '@/lib/generate-rss-feed'
import { getAllArticles } from '@/lib/get-all-articles'
import { NextPage } from 'next'

const byMostRecentDate = (a: { date: string }, b: { date: string }) =>
  new Date(b.date).getTime() - new Date(a.date).getTime()

type ArticleCardProps = {
  article: Domain.Article
}

type ArticleCard = React.FC<ArticleCardProps>

const ArticleCard: ArticleCard = ({ article }) => {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        <Typewriter text={article.title} />
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

type SocialLinkProps = {
  icon: IconComponent
  href: string
} & PropsFrom<typeof Link>

type SocialLink = React.FC<SocialLinkProps>

const SocialLink: SocialLink = ({ icon: Icon, ...props }) => {
  return (
    <Link className="social-glow group -m-1 p-1 transition" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition" />
    </Link>
  )
}

type Home = NextPage<{ articles: Domain.Article[] }>

const Home: Home = ({ articles }) => {
  const yearsExperience = new Date().getFullYear() - 2010
  const whatIDoRef = useRef<HTMLDivElement>(null)

  /* "What I do" boxes spin up into place, staggered, scrubbed directly to the
     scroll position: every scroll frame recomputes the grid's progress through
     the viewport and writes each box's transform itself. Because nothing is
     played on a timer, scrolling fast lands the boxes exactly where the user
     stops — they track the scrollbar. No fade. Skips under reduced-motion,
     leaving the boxes in their resting position. */
  useEffect(() => {
    const grid = whatIDoRef.current
    if (!grid) return

    const cards = Array.from(grid.children) as HTMLElement[]
    if (!cards.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    /* Start each box well below the fold (off the page) so it visibly travels
       up into its slot while rotating, rather than spinning in place. */
    const enterOffset = Math.max(320, Math.round(window.innerHeight * 0.6))

    /* outBack easing — overshoots past the target then settles, matching the
       spring-like feel of anime's outBack(1.3). */
    const overshoot = 1.70158 * 1.3
    const outBack = (x: number) =>
      1 + (overshoot + 1) * Math.pow(x - 1, 3) + overshoot * Math.pow(x - 1, 2)

    /* Fraction of the overall scroll progress by which each successive box's
       reveal is delayed, so they spin in one-by-one instead of all together. */
    const stagger = 0.18
    const total = 1 + (cards.length - 1) * stagger

    cards.forEach((card) => {
      card.style.transformOrigin = 'center'
      card.style.willChange = 'transform'
      /* Initial hidden state: below the fold, rotated, slightly shrunk. */
      card.style.transform = `translateY(${enterOffset}px) rotate(-90deg) scale(0.8)`
    })

    let raf = 0
    let maxProgress = 0
    let done = false
    let teardown = () => {}

    const render = () => {
      raf = 0
      if (done) return
      const rect = grid.getBoundingClientRect()
      const vh = window.innerHeight
      /* Global progress: 0 when the grid's top is at the viewport bottom (just
         peeking in), 1 when the grid's centre meets the viewport centre. */
      const span = vh * 0.5 + rect.height * 0.5
      const gp =
        span <= 0 ? 1 : Math.min(1, Math.max(0, (vh - rect.top) / span))
      /* Play once: progress only ever moves forward, so a box that has spun in
         never reverses, and scrolling back up leaves the grid at rest. */
      if (gp <= maxProgress) return
      maxProgress = gp
      cards.forEach((card, i) => {
        const local = Math.min(1, Math.max(0, maxProgress * total - i * stagger))
        const eased = outBack(local)
        const ty = enterOffset * (1 - eased)
        const rot = -90 * (1 - eased)
        const scale = 0.8 + 0.2 * eased
        card.style.transform = `translateY(${ty}px) rotate(${rot}deg) scale(${scale})`
      })
      if (maxProgress >= 1) {
        /* Fully revealed — drop the boxes to their natural resting transform
           and stop listening, so the reveal never replays for this mount. */
        done = true
        cards.forEach((card) => {
          card.style.transform = ''
          card.style.willChange = ''
        })
        teardown()
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(render)
    }

    /* The page scrolls on <body> (html is overflow:hidden), so a window scroll
       listener never fires. Capture-phase on document catches scroll from
       whichever element actually scrolls. */
    document.addEventListener('scroll', onScroll, {
      passive: true,
      capture: true,
    })
    window.addEventListener('resize', onScroll)
    teardown = () => {
      document.removeEventListener('scroll', onScroll, { capture: true })
      window.removeEventListener('resize', onScroll)
    }
    render()

    return () => {
      teardown()
      if (raf) cancelAnimationFrame(raf)
      cards.forEach((card) => {
        card.style.transform = ''
        card.style.willChange = ''
      })
    }
  }, [])

  const stats: { value: string; label: string }[] = [
    {
      value: `${yearsExperience}+`,
      label: 'Years crafting software for clients around the world.',
    },
    {
      value: '9',
      label:
        'International clients delivered for, across finance, pharma and telecom.',
    },
    {
      value: '3',
      label: 'Core industries served end-to-end, from architecture to delivery.',
    },
    {
      value: '100%',
      label: 'Remote — collaborating with distributed teams worldwide.',
    },
  ]

  return (
    <>
      <Head>
        <title>Iván Trujillo - Software Consultant, Tech Lead &amp; AI Engineer</title>
        <meta
          name="description"
          content="I'm Iván Trujillo — software consultant, tech lead, and AI engineer specializing in front-end architecture, generative UI, and engineering leadership."
        />
      </Head>
      <Container className="mt-9 sm:mt-[86px]">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-[75px]">
          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 ring-1 ring-white/10">
              <Image
                src={portraitImage}
                alt="Iván Trujillo"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 20rem, 20rem"
                priority
              />
            </div>
          </div>
          {/* Intro */}
          <div className="relative">
            <p className="font-hud text-sm uppercase tracking-[0.25em] text-zinc-400">
              Hey there, I&apos;m
            </p>
            <h1 className="mt-4 font-heading text-6xl uppercase leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Iván
              <br />
              Trujillo
            </h1>
            <div className="mt-6 flex flex-col gap-2 font-hud text-[11px] uppercase tracking-[0.2em] text-zinc-400 sm:flex-row sm:items-center sm:gap-5">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
                Software Consultant &amp; Tech Lead
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
                <span className="text-accent ">🇮🇨 Canary Islands</span> · Remote
              </span>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="https://www.linkedin.com/in/ivanbtrujillo/"
                target="_blank"
                className="group inline-flex items-center gap-3 bg-accent px-6 py-3 font-hud text-xs font-semibold uppercase tracking-[0.2em] text-on-accent transition hover:opacity-90"
              >
                Let&apos;s talk
                <ArrowIcon.UpRight
                  aria-hidden
                  className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="#work"
                className="group inline-flex items-center gap-3 border border-white/20 px-6 py-3 font-hud text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200 transition hover:border-white/40 hover:text-white"
              >
                Read my writing
                <ArrowIcon.UpRight
                  aria-hidden
                  className="h-4 w-4 text-accent transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* About — light section */}
      <section className="mt-20 bg-white py-20 sm:mt-24 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="flex items-center gap-2 font-hud text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                <span className="h-2 w-2 bg-accent" aria-hidden />
                About me
              </p>
              <h2 className="mt-6 font-heading text-4xl uppercase leading-none tracking-tight text-zinc-900 sm:text-5xl">
                I build ambitious web products with AI at the core
              </h2>
              <p className="mt-8 font-hud text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                Social media
              </p>
              <div className="mt-4 flex items-center gap-6">
                <SocialLink
                  href="https://twitter.com/ivanbtrujillo"
                  aria-label="Follow on Twitter"
                  icon={SocialIcon.Twitter}
                />
                <SocialLink
                  href="https://www.instagram.com/ivanbtrujillo.dev/"
                  aria-label="Follow on Instagram"
                  icon={SocialIcon.Instagram}
                />
                <SocialLink
                  href="https://github.com/ivanbtrujillo"
                  aria-label="Follow on GitHub"
                  icon={SocialIcon.GitHub}
                />
                <SocialLink
                  href="https://www.linkedin.com/in/ivanbtrujillo/"
                  aria-label="Follow on LinkedIn"
                  icon={SocialIcon.LinkedIn}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-hud text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                {yearsExperience}+ years of front-end &amp; AI engineering
              </p>
              <p className="mt-5 text-base leading-relaxed text-zinc-600">
                I&apos;m Iván, a software consultant and tech lead with{' '}
                {yearsExperience}+ years of experience crafting modern web
                applications. I specialize in front-end architecture, generative
                UI, and AI-powered interfaces — and in building high-performing
                engineering teams. From concept to delivery, I obsess over
                quality, performance, and developer experience.
              </p>
              <Link
                href="/about"
                className="group mt-8 inline-flex w-fit items-center gap-3 bg-zinc-900 px-6 py-3 font-hud text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-zinc-800"
              >
                More about me
                <ArrowIcon.UpRight
                  aria-hidden
                  className="h-4 w-4 text-accent transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 md:mt-20">
            <p className="flex items-center gap-2 font-hud text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
              <span className="h-2 w-2 bg-accent" aria-hidden />
              My expertise in numbers
            </p>
            <dl className="mt-6 grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={clsx('p-8', index === 0 ? 'bg-zinc-900' : 'bg-white')}
                >
                  <dt
                    className={clsx(
                      'font-heading text-5xl leading-none sm:text-6xl',
                      index === 0 ? 'text-accent' : 'text-zinc-900'
                    )}
                  >
                    {stat.value}
                  </dt>
                  <dd
                    className={clsx(
                      'mt-4 leading-relaxed',
                      index === 0 ? 'text-zinc-300' : 'text-zinc-500'
                    )}
                  >
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Horizontal divider */}
      <div aria-hidden className="mx-auto mt-20 h-1 max-w-5xl holo-bar-h rounded-full md:mt-24" />
      <Container className="mt-12 md:mt-16">
        <div className="mb-10 flex items-center gap-4 border-b border-white/10 pb-3 ">
          <HudCross className="text-sm" />
          <span className="font-heading text-3xl uppercase tracking-tight text-white bg-black">
            What I do
          </span>
        </div>
        <p className="animate-on-scroll mb-10 max-w-3xl text-lg leading-relaxed text-zinc-400 bg-black">
          I help companies build ambitious products at the intersection of
          front-end engineering and artificial intelligence. Here&apos;s where I
          focus my energy.
        </p>
        <div
          ref={whatIDoRef}
          className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              title: 'AI & Generative UI',
              description:
                'Building AI-powered interfaces and generative UI systems that turn structured data into dynamic, context-aware components that are generated dynamically based on the user\'s interaction.',
            },
            {
              title: 'Front-End Architecture',
              description:
                'Designing scalable TypeScript monorepos, component libraries, and design systems that help teams ship fast without sacrificing quality. Robust and scalable architecture that is easy to maintain and scale.',
            },
            {
              title: 'Engineering Leadership',
              description:
                'Leading cross-functional teams with a focus on developer experience, TDD culture, code review practices, and continuous delivery. Building high-performing engineering teams that are able to ship high-quality code quickly and efficiently.',
            },
            {
              title: 'Design Systems',
              description:
                'Creating cohesive component catalogs, style guides, and design tokens that ensure visual consistency across products. Ensuring that the design system is easy to use and maintain.',
            },
            {
              title: 'AX Experience',
              description:
                'Designing for Agentic Experience (AX) — apps that AI agents love to use. I structure interfaces, semantics, and actions so agents can reliably do what users ask, the way good UX serves people.',
            },
            {
              title: 'Developer Tooling',
              description:
                'Crafting custom AI-assisted workflows, automated code review pipelines, and tools that multiply team productivity. Tools that help teams ship high-quality code quickly and efficiently.',
            },
          ].map((item, index) => {
            const isDark = index === 0
            return (
              <div
                key={item.title}
                className={clsx(
                  'group p-8 transition-colors',
                  isDark
                    ? 'bg-zinc-900 hover:bg-zinc-800'
                    : 'bg-white hover:bg-zinc-50'
                )}
              >
                <span
                  aria-hidden
                  className="font-heading text-3xl leading-none text-accent"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3
                  className={clsx(
                    'mt-4 font-hud text-base font-semibold uppercase tracking-[0.15em]',
                    isDark ? 'text-white' : 'text-zinc-900'
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={clsx(
                    'mt-3 text-base leading-relaxed',
                    isDark ? 'text-zinc-400' : 'text-zinc-600'
                  )}
                >
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
      {/* Holographic horizontal divider */}
      <div aria-hidden className="mx-auto mt-20 h-1 max-w-5xl holo-bar-h rounded-full md:mt-24" />
      <Container id="work" className="mt-12 scroll-mt-24 md:mt-16">
        <div className="mb-10 flex items-center gap-4 border-b border-white/10 pb-3">
          <HudCross className="text-sm" />
          <span className="font-heading text-3xl uppercase tracking-tight text-white bg-black">
            Latest writing
          </span>
        </div>
        <div className="animate-on-scroll grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
          {[...articles]
            .sort(byMostRecentDate)
            .slice(0, 4)
            .map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
        </div>
      </Container>

      {/* Closing CTA — accent band */}
      <section className="mt-20 bg-accent py-20 sm:mt-24 md:py-28">
        <Container>
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-hud text-xs font-bold uppercase tracking-[0.25em] text-on-accent/70">
                Let&apos;s work together
              </p>
              <h2 className="mt-4 font-heading text-4xl uppercase leading-none tracking-tight text-on-accent sm:text-5xl lg:text-6xl">
                Have a project in mind?
                <br />
                Let&apos;s build it.
              </h2>
            </div>
            <Link
              href="https://www.linkedin.com/in/ivanbtrujillo/"
              target="_blank"
              className="group inline-flex shrink-0 items-center gap-3 bg-zinc-950 px-8 py-4 font-hud text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-zinc-800"
            >
              Let&apos;s talk
              <ArrowIcon.UpRight
                aria-hidden
                className="h-5 w-5 text-accent transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Home

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
