import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/container'
import { SocialIcon } from '@/components/icons'
import portraitImage from '@/images/portrait-2.jpeg'
import type { NextPage } from 'next'

type SocialLinkProps = {
  href: string
  className?: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  children: React.ReactNode
}

type SocialLink = React.FC<SocialLinkProps>

const SocialLink: SocialLink = ({ className, href, children, icon: Icon }) => {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        target="blank"
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-zinc-900 dark:group-hover:fill-zinc-200" />
        <span className="ml-4">{children}</span>
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
      <Container className="mt-16">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I'm Iván Trujillo, a software consultant and tech lead based in
              the Canary Islands.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                I’ve loved technology for as long as I can remember. It all
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
                My father worked as a mechanic and truck driver, and that’s
                where my passion for motorsport comes from. I’m a big F1 fan —
                you’ll probably find me talking about it on social media or
                racing go-karts with friends.
              </p>
              <p>
                Today, I’m a tech lead who has worked with amazing companies and
                talented people across the globe. After 15+ years in the
                industry, I’m still driven by the same curiosity that got me
                started — always learning, always building, always pushing
                forward.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul>
              <SocialLink
                href="https://twitter.com/ivanbtrujillo"
                icon={SocialIcon.Twitter}
              >
                Follow on Twitter
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/ivanbtrujillo.dev/"
                icon={SocialIcon.Instagram}
                className="mt-4"
              >
                Follow on Instagram
              </SocialLink>
              <SocialLink
                href="https://github.com/ivanbtrujillo"
                icon={SocialIcon.GitHub}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/ivanbtrujillo/"
                icon={SocialIcon.LinkedIn}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}

export default About
