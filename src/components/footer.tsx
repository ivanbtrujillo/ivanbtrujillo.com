import Link from 'next/link'

import { Container } from '@/components/container'
import { SocialIcon } from '@/components/icons'

type SocialLinkProps = {
  href: string
  'aria-label': string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon: Icon, ...props }) => (
  <Link
    target="_blank"
    rel="noopener noreferrer"
    className="group -m-1 p-1"
    {...props}
  >
    <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-accent" />
  </Link>
)

type Footer = React.FC
export const Footer: Footer = () => {
  return (
    <footer className="mt-32">
      <Container.Outer>
        {/* Accent top border */}
        <div aria-hidden className="h-px w-full bg-accent" />
        <div className="pt-10 pb-16">
          <Container.Inner>
            <div className="flex flex-col gap-8">
              {/* Top row — name + tagline / social */}
              <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-heading text-2xl uppercase tracking-tight text-white">
                    Iván Trujillo
                  </p>
                  <p className="mt-2 max-w-sm text-pretty text-base text-zinc-400">
                    Building at the intersection of front-end engineering and AI.
                  </p>
                </div>
                <div className="flex items-center gap-6">
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
              {/* Bottom row — copyright */}
              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <p className="text-sm text-zinc-400">
                  &copy; {new Date().getFullYear()} Iván Trujillo. All rights
                  reserved.
                </p>
              </div>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
