import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import AddingCrossPageLoader from '@/content/articles/adding-a-cross-page-loader-in-nextjs.mdx'
import HighQualitySoftware from '@/content/articles/the-path-to-high-quality-software/index.mdx'
import StateMachinesReact from '@/content/articles/state-machines-and-react-js.mdx'
import WhatToDeliver from '@/content/articles/what-to-deliver-and-what-to-keep-in-the-age-of-ai.mdx'
import LeaderAgentsNeed from '@/content/articles/the-leader-that-ai-agents-need.mdx'
import EmployeeExperience from '@/content/articles/employee-experience-and-the-cost-of-ignoring-your-best-people.mdx'
import TraditionalCompanies from '@/content/articles/why-traditional-companies-fail-at-ai-adoption.mdx'
import IntegrityOverDemos from '@/content/articles/integrity-over-demos-building-trust-in-tech.mdx'

const articlesBySlug: Record<string, React.ComponentType> = {
  'adding-a-cross-page-loader-in-nextjs': AddingCrossPageLoader,
  'the-path-to-high-quality-software': HighQualitySoftware,
  'state-machines-and-react-js': StateMachinesReact,
  'what-to-deliver-and-what-to-keep-in-the-age-of-ai': WhatToDeliver,
  'the-leader-that-ai-agents-need': LeaderAgentsNeed,
  'employee-experience-and-the-cost-of-ignoring-your-best-people': EmployeeExperience,
  'why-traditional-companies-fail-at-ai-adoption': TraditionalCompanies,
  'integrity-over-demos-building-trust-in-tech': IntegrityOverDemos,
}

type ArticlePageProps = {
  slug: string
}

const ArticlePage: NextPage<ArticlePageProps> = ({ slug }) => {
  const Article = articlesBySlug[slug]
  return <Article />
}

export default ArticlePage

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: Object.keys(articlesBySlug).map((slug) => ({
    params: { slug },
  })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({
  params,
}) => ({
  props: {
    slug: params!.slug as string,
  },
})
