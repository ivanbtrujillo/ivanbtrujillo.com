import { Head, Html, Main, NextScript, DocumentProps } from 'next/document'

type Document = React.FC<DocumentProps>
const Document: Document = () => {
  return (
    <Html className="dark h-full overflow-hidden antialiased" lang="en">
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/feed+json"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.json`}
        />
      </Head>
      <body className="flex h-full flex-col overflow-auto bg-zinc-950 text-zinc-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
