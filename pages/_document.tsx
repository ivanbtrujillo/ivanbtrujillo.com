import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="es">
        <Head />
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
