import type { DocumentContext } from "next/document";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "src/lib/analytics/google";

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
        <Head>
          <title>SFeedy - 簡単に始められる技術ブログ</title>
          <meta name="description" content="簡単に始められる技術ブログ" />
          <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL} />
          <script
            async={true}
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
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
