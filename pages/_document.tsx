import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@ivanbtrujillo" />
          <meta name="twitter:creator" content="@ivanbtrujillo" />
          <meta
            name="twitter:title"
            content="Iván Trujillo - Desarrollador Frontend"
          />
          <meta
            name="twitter:description"
            content="Aventuras de un desarrollador Frontend"
          />
          <meta
            name="twitter:image"
            content="https://images.unsplash.com/photo-1579895399528-aad62224c0d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript>
            <h3>Parece que estas usando un navegador sin javascript.</h3>
          </noscript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
