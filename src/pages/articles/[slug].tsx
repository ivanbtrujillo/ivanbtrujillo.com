import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import AddingCrossPageLoader from '@/content/articles/adding-a-cross-page-loader-in-nextjs.mdx'
import CraftingDesignSystem from '@/content/articles/crafting-a-design-system-for-a-multiplanetary-future/index.mdx'
import RewritingCosmos from '@/content/articles/rewriting-the-cosmos-kernel-in-rust.mdx'

const articlesBySlug: Record<string, React.ComponentType> = {
  'adding-a-cross-page-loader-in-nextjs': AddingCrossPageLoader,
  'crafting-a-design-system-for-a-multiplanetary-future': CraftingDesignSystem,
  'rewriting-the-cosmos-kernel-in-rust': RewritingCosmos,
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
