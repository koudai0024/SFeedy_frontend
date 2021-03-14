import NextDocument, { Head, Html, Main, NextScript } from "next/document";

class Document extends NextDocument {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <title>SFeedy - 簡単に始められる技術ブログ</title>
          <meta name="description" content="簡単に始められる技術ブログ" />
          <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
