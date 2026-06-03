import Head from 'next/head'

import { Card } from '@/components/card'
import { CtaBand } from '@/components/cta-band'
import { SimpleLayout } from '@/components/simple-layout'
import { formatDate } from '@/lib/format-date'
import { getAllArticles } from '@/lib/get-all-articles'

type ArticleProps = {
  article: Domain.Article
}

type Article = React.FC<ArticleProps>

const Article: Article = ({ article }) => (
  <Card as="article">
    <Card.Eyebrow as="time" dateTime={article.date} decorate>
      {formatDate(article.date)}
    </Card.Eyebrow>
    <Card.Title href={`/articles/${article.slug}`}>
      {article.title}
    </Card.Title>
    <Card.Description>{article.description}</Card.Description>
    <Card.Cta>Read article</Card.Cta>
  </Card>
)

type ArticlesIndexProps = {
  articles: Domain.Article[]
}

type ArticlesIndex = React.FC<ArticlesIndexProps>

const ArticlesIndex: ArticlesIndex = ({ articles }) => {
  return (
    <>
      <Head>
        <title>Articles - Ivan Trujillo</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership and more, collected in chronological order"
        />
      </Head>
      <SimpleLayout
        title="Writing on software development, good practices, and the software industry."
        intro="All of my long-form thoughts on programming, leadership and more, collected in chronological order"
      >
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 md:gap-y-20">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </SimpleLayout>
      <CtaBand
        left={{
          eyebrow: 'Work with me',
          title: 'Have a project in mind?',
          href: 'https://www.linkedin.com/in/ivanbtrujillo/',
          external: true,
        }}
        right={{
          eyebrow: 'Stay in the loop',
          title: 'Subscribe via RSS',
          href: '/rss/feed.xml',
        }}
      />
    </>
  )
}

export default ArticlesIndex

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  }
}
