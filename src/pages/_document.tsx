import type { DocumentContext } from "next/document";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
    };
  }
  render() {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
