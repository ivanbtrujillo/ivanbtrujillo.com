import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/container'
import { HudBracket, HudCross, HudDots, HudBarcode } from '@/components/hud'
import { SocialIcon } from '@/components/icons'
import portraitImage from '@/images/portrait-2.jpeg'
import type { NextPage } from 'next'

type SocialLinkProps = {
  href: string
  className?: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  children: React.ReactNode
}

const SocialLink: React.FC<SocialLinkProps> = ({ className, href, children, icon: Icon }) => {
  return (
    <li className={className}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 text-sm font-medium text-zinc-300 transition hover:text-white"
      >
        <Icon className="h-5 w-5 flex-none fill-zinc-500 transition group-hover:fill-zinc-200" />
        <span>{children}</span>
      </Link>
    </li>
  )
}

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About - Iván Trujillo</title>
        <meta
          name="description"
          content="I'm Iván Trujillo, a software consultant and tech lead specializing in front-end architecture, design systems, and engineering leadership."
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
                  About<span className="text-accent-secondary"> · </span><span className="text-accent">Profile</span>
                </p>
                <HudBracket flip />
                <HudDots className="ml-2 hidden sm:inline-flex" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                I&apos;m Iván Trujillo
              </h1>
              <p>
                A software consultant and tech lead specializing in front-end architecture, design systems, and engineering leadership.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.05] px-2 py-1 font-hud text-[10px] uppercase tracking-widest text-zinc-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" aria-hidden />
                  15+ years in tech
                </span>
                <span className="font-hud text-[10px] text-zinc-200">FE / AI / Leadership</span>
                <HudBarcode colorful className="ml-auto hidden sm:block" />
              </div>

            </div>
            <div className="relative mx-auto mt-12 w-full max-w-xs shrink-0 lg:mx-0 lg:mt-0 lg:max-w-none lg:justify-self-end">
              <span className="mb-3 block font-hud text-[10px] uppercase tracking-[0.35em] text-zinc-200 lg:text-right">
                Profile
              </span>
              <div className="relative aspect-square w-full overflow-hidden bg-zinc-900 ring-1 ring-white/10">
                {/* Corner target markers */}
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



      {/* Story section */}
      <Container className="mt-12 md:mt-16">
        <div className="mb-10 flex items-center gap-4 border-b border-white/10 pb-3">
          <HudCross className="text-sm" />
          <span className="holo-text font-hud text-2xl uppercase tracking-[0.05em] bg-black">
            My Story
          </span>
        </div>
        <div className="animate-on-scroll max-w-3xl bg-black">
          <div className="relative border border-white/10 bg-grid-fine p-6 sm:p-8">
            {/* Colored top accent */}
            <div aria-hidden className="absolute left-0 top-0 h-0.5 w-full holo-bar-h" />
            {/* Corner brackets */}
            <div aria-hidden className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-white/15" />
            <div aria-hidden className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-white/15" />
            <div className="space-y-6 text-base leading-relaxed text-zinc-400">
              <p>
                I&apos;ve loved technology for as long as I can remember. It all
                started when I was 10 years old and my father brought home a PC
                from his company — a humble machine running Windows Me. That was
                enough to spark something that never faded.
              </p>
              <p>
                My family was always humble, struggling every month. Thanks to
                my grandpa and grandma, I was able to keep studying and pursue a
                career in tech. When I was 19, I had to choose between
                university and a job. I chose the job, but kept studying during
                afternoons and nights. My girlfriend back then — my wife now —
                helped me become who I am today.
              </p>
              <p>
                My father worked as a mechanic and truck driver, and that&apos;s
                where my passion for motorsport comes from. I&apos;m a big F1 fan —
                you&apos;ll probably find me talking about it on social media or
                racing go-karts with friends.
              </p>
              <p>
                Today, I&apos;m a tech lead who has worked with amazing companies and
                talented people across the globe. After 15+ years in the
                industry, I&apos;m still driven by the same curiosity that got me
                started — always learning, always building, always pushing
                forward.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Holographic divider */}
      <div aria-hidden className="mx-auto mt-20 h-1 max-w-5xl holo-bar-h rounded-full md:mt-24" />

      {/* Connect section */}
      <Container className="mt-12 md:mt-16">
        <div className="mb-10 flex items-center gap-4 border-b border-white/10 pb-3">
          <HudCross className="text-sm" />
          <span className="holo-text font-hud text-2xl uppercase tracking-[0.05em] bg-black">
            Connect
          </span>
        </div>
        <div className="animate-on-scroll max-w-md bg-black">
          <div className="relative border border-white/10 bg-grid-fine p-6">
            {/* Colored top accent */}
            <div aria-hidden className="absolute left-0 top-0 h-0.5 w-full holo-bar-h" />
            <div aria-hidden className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-white/15" />
            <div aria-hidden className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-white/15" />
            <div className="mb-4 flex items-center gap-3">
              <span className="bg-zinc-950 px-2 py-1 font-hud text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                Social
              </span>
              <span aria-hidden className="ml-auto font-hud text-[9px] tracking-[0.2em] text-accent-light">
                _NET;
              </span>
            </div>
            <ul className="space-y-4">
              <SocialLink
                href="https://twitter.com/ivanbtrujillo"
                icon={SocialIcon.Twitter}
              >
                Follow on Twitter
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/ivanbtrujillo.dev/"
                icon={SocialIcon.Instagram}
              >
                Follow on Instagram
              </SocialLink>
              <SocialLink
                href="https://github.com/ivanbtrujillo"
                icon={SocialIcon.GitHub}
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/ivanbtrujillo/"
                icon={SocialIcon.LinkedIn}
              >
                Follow on LinkedIn
              </SocialLink>
            </ul>
          </div>
          {/* CTA */}
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
      </Container>
    </>
  )
}

export default About
