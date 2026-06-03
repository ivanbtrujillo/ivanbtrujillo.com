import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/container'
import { CtaBand } from '@/components/cta-band'
import { HudCross } from '@/components/hud'
import { SocialIcon } from '@/components/icons'
import portraitImage from '@/images/portrait-2.jpeg'
import type { NextPage } from 'next'

type SocialLinkProps = {
  href: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  children: React.ReactNode
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, children, icon: Icon }) => {
  return (
    <li>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 text-sm font-medium text-zinc-300 transition hover:text-white"
      >
        <Icon className="h-5 w-5 flex-none fill-zinc-500 transition group-hover:fill-accent" />
        <span>{children}</span>
      </Link>
    </li>
  )
}

const About: NextPage = () => {
  const yearsExperience = new Date().getFullYear() - 2010

  return (
    <>
      <Head>
        <title>About - Iván Trujillo</title>
        <meta
          name="description"
          content="I'm Iván Trujillo, a software consultant and tech lead specializing in front-end architecture, design systems, and engineering leadership."
        />
      </Head>

      {/* Hero */}
      <Container className="mt-9 sm:mt-[86px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-[75px]">
          {/* Intro */}
          <div>
            <p className="font-hud text-sm uppercase tracking-[0.25em] text-zinc-400">
              About me
            </p>
            <h1 className="mt-4 font-heading text-5xl uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
              I&apos;m Iván
              <br />
              Trujillo
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              A software consultant and tech lead specializing in front-end
              architecture, design systems, and engineering leadership.
            </p>
            <div className="mt-8 flex flex-col gap-2 font-hud text-[11px] uppercase tracking-[0.2em] text-zinc-400 sm:flex-row sm:items-center sm:gap-5">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
                {yearsExperience}+ years in tech
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
                Front-end · AI · Leadership
              </span>
            </div>
          </div>
          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none lg:justify-self-end">
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
        </div>
      </Container>

      {/* Story section */}
      <Container className="mt-20 md:mt-24">
        <div className="mb-10 flex items-center gap-4 border-b border-white/10 pb-3">
          <HudCross className="text-sm" />
          <span className="font-heading text-3xl uppercase tracking-tight text-white bg-black">
            My Story
          </span>
        </div>
        <div className="animate-on-scroll text-pretty text-base leading-relaxed text-zinc-400 lg:columns-2 lg:gap-14 [&>p:not(:last-child)]:mb-6 [&>p]:break-inside-avoid">
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
            talented people across the globe. After {yearsExperience}+ years in the
            industry, I&apos;m still driven by the same curiosity that got me
            started — always learning, always building, always pushing
            forward.
          </p>
        </div>
      </Container>

      {/* Connect section */}
      <Container className="mt-20 md:mt-24">
        <div className="mb-10 flex items-center gap-4 border-b border-white/10 pb-3">
          <HudCross className="text-sm" />
          <span className="font-heading text-3xl uppercase tracking-tight text-white bg-black">
            Connect
          </span>
        </div>
        <div className="animate-on-scroll">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      </Container>
      <CtaBand
        left={{
          eyebrow: "Let's work together",
          title: 'Start a project',
          href: 'https://www.linkedin.com/in/ivanbtrujillo/',
          external: true,
        }}
        right={{
          eyebrow: 'More to explore',
          title: 'Read my writing',
          href: '/articles',
        }}
      />
    </>
  )
}

export default About
