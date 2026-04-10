import Head from 'next/head'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/card'
import { Container } from '@/components/container'
import { HudBracket, HudCross, HudDots, HudBarcode } from '@/components/hud'
import { BriefCaseIcon, SocialIcon } from '@/components/icons'

import logoInerza from '@/images/logos/inerza.png'
import logoBluesky from '@/images/logos/bluesky.jpeg'
import logoExpero from '@/images/logos/expero.png'
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
        {article.title}
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

type ResumeEntry = {
  company: string
  title: string
  logo: StaticImageData
  start: { label: string; dateTime?: string }
  end: { label: string; dateTime?: string }
}

const resume: ResumeEntry[] = [
  {
    company: 'Expero inc.',
    title: 'Tech lead',
    logo: logoExpero,
    start: { label: '2025' },
    end: {
      label: 'Present',
      dateTime: String(new Date().getFullYear()),
    },
  },
    {
    company: 'Expero inc.',
    title: 'Senior front end developer',
    logo: logoExpero,
    start: { label: '2020' },
    end: {
      label: '2025',
      dateTime: String(new Date().getFullYear()),
    },
  },
    {
    company: 'Expero inc.',
    title: 'Intermediate front end developer',
    logo: logoExpero,
    start: { label: '2018' },
    end: {
      label: '2020',
    },
  },

  {
    company: 'Blue Sky Technology',
    title: 'Full stack web developer',
    logo: logoBluesky,
    start: { label: '2016' },
    end: { label: '2018' },
  },
  {
    company: 'Inerza',
    title: 'Computer Technician',
    logo: logoInerza,
    start: { label: '2010' },
    end: { label: '2016' },
  },
]
const Resume = () => {
  const lastIndex = resume.length - 1

  return (
    <div className="relative border border-white/10 bg-grid-fine p-6">
      {/* Colored right accent */}
      <div aria-hidden className="absolute right-0 top-0 h-full w-1 holo-bar" />
      {/* Corner brackets */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-white/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-white/15"
      />
      <div className="flex items-center gap-3">
        <span className="holo-text bg-zinc-950 px-2 py-1 font-hud text-[19px] font-semibold uppercase tracking-[0.2em]">
          Work
        </span>
        <BriefCaseIcon className="h-5 w-5 flex-none fill-zinc-500 stroke-zinc-500" />
        <span aria-hidden className="ml-auto font-hud text-[12px] tracking-[0.2em] text-accent-light">
          _EXP
        </span>
      </div>
      <ol className="relative mt-8">
        {resume.map((role, roleIndex) => (
          <li
            key={`${role.company}-${role.title}`}
            className="relative flex gap-4  last:pb-0"
          >
            <div className="relative flex w-5 shrink-0 flex-col items-center pt-0.5">
              <div
                className="relative z-10 h-2.5 w-2.5 shrink-0 rounded-full bg-zinc-950 ring-2 ring-accent"
                aria-hidden
              />
              {roleIndex < lastIndex ? (
                <div
                  aria-hidden
                  className="absolute left-1/2 top-[0.875rem] bottom-0 w-px -translate-x-1/2"
                  style={{ background: 'linear-gradient(to bottom, var(--g1), var(--g3), var(--g5))' }}
                />
              ) : null}
            </div>
            <div className="min-w-0 flex-1 space-y-3 pb-10">
              <p className="font-hud text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                {role.start.dateTime ? (
                  <time dateTime={role.start.dateTime}>{role.start.label}</time>
                ) : (
                  <span>{role.start.label}</span>
                )}
                <span aria-hidden="true" className="mx-1.5">
                  —
                </span>
                {role.end.dateTime ? (
                  <time dateTime={role.end.dateTime}>{role.end.label}</time>
                ) : (
                  <span>{role.end.label}</span>
                )}
              </p>
              <div className="flex gap-3">
                <div className="relative mt-0.5 flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-md">
                  <Image src={role.logo} alt="" className="h-12 w-12 object-contain" unoptimized />
                </div>
                <dl className="min-w-0">
                  <dt className="sr-only">Company</dt>
                  <dd className="text-base font-medium tracking-tight text-zinc-100">
                    {role.company}
                  </dd>
                  <dt className="sr-only">Role</dt>
                  <dd className="mt-0.5 text-sm text-zinc-400">
                    {role.title}
                  </dd>
                </dl>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

type Home = NextPage<{ articles: Domain.Article[] }>

const Home: Home = ({ articles }) => {
  return (
    <>
      <Head>
        <title>Iván Trujillo - Software Consultant, Tech Lead &amp; AI Engineer</title>
        <meta
          name="description"
          content="I'm Iván Trujillo — software consultant, tech lead, and AI engineer specializing in front-end architecture, generative UI, and engineering leadership."
        />
      </Head>
      <Container className="mt-9">
        <div className="relative max-w-4xl lg:max-w-6xl bg-black">
          {/* Holographic vertical accent bar */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-8 top-0 hidden h-full w-1 holo-bar rounded-full lg:block"
          />
          <div className="relative gap-10 lg:grid lg:grid-cols-[1fr_minmax(0,18rem)] lg:items-start lg:gap-12 xl:grid-cols-[1fr_minmax(0,20rem)] xl:gap-16">
            <div className="relative">
              {/* Top-left corner bracket */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-4 -top-4 h-10 w-10 border-l-2 border-t-2 border-white/40 sm:-left-6"
              />
              {/* Bottom-right corner bracket */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-4 -right-4 hidden h-10 w-10 border-b-2 border-r-2 border-white/15 lg:block"
              />
              {/* Technical annotations */}
              <div className="mb-4 flex items-center gap-3">
                <HudBracket />
                <p className="font-hud text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-200">
                  Canary  <span className="text-accent-secondary"> Islands · </span><span className="text-accent"> Remote </span>
                </p>
                <HudBracket flip  />
                <HudDots className="ml-2 hidden sm:inline-flex" />
              </div>
              <h1 className="text-5xl font-bold uppercase tracking-tight text-white sm:text-6xl sm:tracking-tight">
                <span className="block tracking-[0.08em]">Iván Trujillo</span>
                <span className="mt-2 block max-w-3xl font-hud text-xl font-normal normal-case tracking-[0.05em] text-zinc-400 sm:text-xl">
                  Software Consultant &middot; Tech Lead &middot; AI Engineer
                </span>
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.05] px-2 py-1 font-hud text-[10px] uppercase tracking-widest text-zinc-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" aria-hidden />
                  Open to consulting
                </span>
                <span className="font-hud text-[10px] text-zinc-200">FE / AI / UI</span>
                <HudBarcode colorful className="ml-auto hidden sm:block" />
              </div>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400">
                I&apos;m Iván, a software consultant and tech lead with 15+ years of
                experience crafting modern web applications. I specialize in
                front-end architecture, generative UI, AI-powered interfaces,
                and building high-performing engineering teams. Based in the
                Canary Islands, working remotely with teams worldwide.
              </p>
              {/* Decorative vertical label */}
              <p
                className="pointer-events-none absolute -right-6 top-8 hidden font-hud text-[10px] uppercase tracking-[0.35em] text-zinc-300 [writing-mode:vertical-rl] lg:block"
                aria-hidden
              >
                Generative UI · AI · Engineering Leadership
              </p>
              <div className="mt-8 flex items-center gap-6">
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
              {/* CTA Button */}
              <Link
                href="https://www.linkedin.com/in/ivanbtrujillo/"
                target="_blank"
                className="holo-border mt-8 inline-flex items-center gap-3 rounded-sm px-6 py-3 font-hud text-xs uppercase tracking-[0.2em] text-zinc-200 transition hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                Let&apos;s work together
                <span aria-hidden className="text-accent">&rarr;</span>
              </Link>
            </div>
            <div className="relative mx-auto mt-12 w-full max-w-xs shrink-0 lg:mx-0 lg:mt-0 lg:max-w-none lg:justify-self-end">
              <span className="mb-3 block font-hud text-[10px] uppercase tracking-[0.35em] text-zinc-200 lg:text-right">
                Profile
              </span>
              <div className=" relative aspect-square w-full overflow-hidden bg-zinc-900 ring-1 ring-white/10">
                {/* Holographic side accent on portrait */}
              
                {/* Corner target markers on portrait */}
                <div aria-hidden className="pointer-events-none absolute left-2 top-2 z-10 h-10 w-10 border-l-2 border-t-2 border-black/90" />
                <div aria-hidden className="pointer-events-none absolute right-3 top-2 z-10 h-10 w-10 border-r-2 border-t-2 border-black/90" />
                <div aria-hidden className="pointer-events-none absolute bottom-2 left-2 z-10 h-10 w-10 border-b-2 border-l-2 border-black/90" />
                <div aria-hidden className="pointer-events-none absolute bottom-2 right-3 z-10 h-10 w-10 border-b-2 border-r-2 border-black/90" />
                
                <Image
                  src={portraitImage}
                  alt="Iván Trujillo"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 20rem, 20rem"
                  priority
                />
              </div>
              <div aria-hidden className="mt-2 flex items-center justify-between">
                <span className="font-hud text-[9px] tracking-[0.2em] text-zinc-300">
                  ID:001
                </span>
                <HudBarcode colorful />
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* Holographic horizontal divider */}
      <div aria-hidden className="mx-auto mt-20 h-1 max-w-5xl holo-bar-h rounded-full md:mt-24" />
      <Container className="mt-12 md:mt-16">
        <div className="mb-10 flex items-center gap-4 border-b border-white/10 pb-3 ">
          <HudCross className="text-sm" />
          <span className="holo-text font-hud text-2xl uppercase tracking-[0.05em] bg-black">
            What I do
          </span>
        </div>
        <p className="animate-on-scroll mb-10 max-w-3xl text-lg leading-relaxed text-zinc-400 bg-black">
          I help companies build ambitious products at the intersection of
          front-end engineering and artificial intelligence. Here&apos;s where I
          focus my energy.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 bg-black">
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
              title: 'Testing & Quality',
              description:
                'Championing test-driven development and end-to-end testing. Building CI pipelines that catch bugs before they reach production.',
            },
            {
              title: 'Developer Tooling',
              description:
                'Crafting custom AI-assisted workflows, automated code review pipelines, and tools that multiply team productivity. Tools that help teams ship high-quality code quickly and efficiently.',
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="animate-on-scroll group relative border border-white/10 bg-grid-fine p-6 transition-colors hover:border-white/25"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Top-left corner bracket */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-white/15 transition-colors group-hover:border-white/30"
              />
              {/* Bottom-right corner bracket */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-white/15 transition-colors group-hover:border-white/30"
              />
              {/* Colored top accent */}
              <div aria-hidden className="absolute left-0 top-0 h-0.5 w-full holo-bar-h" />
              <div className="flex items-center justify-between">
                <span
                  aria-hidden
                  className="font-hud text-[10px] tracking-[0.2em] text-accent"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <HudDots />
              </div>
              <h3 className="mt-3 font-hud text-base font-semibold uppercase tracking-[0.15em] text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
      {/* Holographic horizontal divider */}
      <div aria-hidden className="mx-auto mt-20 h-1 max-w-5xl holo-bar-h rounded-full md:mt-24" />
      <Container className="mt-12 md:mt-16">
        <div className="mb-10 flex items-center gap-4 border-b border-white/10 pb-3">
          <HudCross className="text-sm" />
          <span className="holo-text font-hud text-2xl uppercase tracking-[0.05em] bg-black">
            Latest writing
          </span>
        </div>
        <div className="animate-on-scroll mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2 bg-black">
          <div className="flex flex-col gap-16">
            {[...articles]
              .sort(byMostRecentDate)
              .slice(0, 3)
              .map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24 bg-black">
            <Resume />
          </div>
        </div>
      </Container>
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
