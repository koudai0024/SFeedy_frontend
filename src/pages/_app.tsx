import "../styles/tailwind.css";
import "github-markdown-css";
import "highlight.js/styles/github-gist.css";
import "nprogress/nprogress.css";

import algoliasearch from "algoliasearch";
import axios from "axios";
import type { NextPageContext } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import nprogress from "nprogress";
import type { ReactChild, VFC } from "react";
import { useEffect } from "react";
import { InstantSearch } from "react-instantsearch-dom";
import { RecoilRoot } from "recoil";
import { Layout } from "src/components/Layouts/Layout";
import * as gtag from "src/lib/analytics/google";
import { GA_TRACKING_ID } from "src/lib/analytics/google";
import { SWRConfig } from "swr";

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_KEY
);

//axios default state
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
if (
  typeof parseCookies(null).auth !== "undefined" &&
  typeof window !== "undefined"
) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    parseCookies(null).auth
  }`;
}

const SafeHydrate: VFC<{ children: ReactChild }> = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 });

const MyApp = ({ Component, pageProps }: AppProps, ctx: NextPageContext) => {
  if (process.browser) {
    // バーの表示開始
    nprogress.start();
  }
  useEffect(() => {
    nprogress.done();
  });
  const initializeState = ({ set }: any) => {
    const cookie = parseCookies(ctx);
    if (cookie?.user) {
      const user = JSON.parse(cookie.user);

      if (user) {
        set({ key: "userInfoState" }, user);
      }
    }
  };

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Gib - 簡単に始められる技術ブログ</title>
        <meta name="description" content="簡単に始められる技術ブログ" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL} />
        <meta
          name="msapplication-square70x70logo"
          content="/site-tile-70x70.png"
        />
        <meta
          name="msapplication-square150x150logo"
          content="/site-tile-150x150.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="/site-tile-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="/site-tile-310x310.png"
        />
        <meta name="msapplication-TileColor" content="#fff" />
        {/* safari */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#fff" />
        <meta name="apple-mobile-web-app-title" content="Gib" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon-180x180.png"
        />
        {/* 一般 */}
        <meta name="application-name" content="Gib" />
        <meta name="theme-color" content="#fff" />
        <meta name="description" content="this is Gib" />
        <link rel="icon" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          property="og:title"
          content={"Gib - 簡単に始められる技術ブログ"}
        />
        <meta property="og:description" content="" />
        <meta property="og:title" content="Gib - 簡単に始められる技術ブログ" />
        <meta property="og:description" content="" />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://gib-jp.com" />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/dg1y5peif/image/upload/l_text:Sawarabi Gothic_50_bold:Gib - 簡単に始められる技術ブログ,co_rgb:333,w_500,c_fit/v1614235864/ogp/IzebX4sI_ah0pt1.png`}
        />
        <meta
          property="og:site_name"
          content="Gib - 簡単に始められる技術ブログ"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@tcr_jp" />
        <meta
          name="twitter:url"
          content={`https://res.cloudinary.com/dg1y5peif/image/upload/l_text:Sawarabi Gothic_50_bold:Gib - 簡単に始められる技術ブログ,co_rgb:333,w_500,c_fit/v1614235864/ogp/IzebX4sI_ah0pt1.png`}
        />
        <meta name="twitter:title" content="Gib - 簡単に始められる技術ブログ" />
        <meta name="twitter:description" content="" />
        <meta
          name="twitter:image"
          content={`https://res.cloudinary.com/dg1y5peif/image/upload/l_text:Sawarabi Gothic_50_bold:Gib - 簡単に始められる技術ブログ,co_rgb:333,w_500,c_fit/v1614235864/ogp/IzebX4sI_ah0pt1.png`}
        />
        <script
          async={true}
          defer={true}
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          defer={true}
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

      <RecoilRoot initializeState={initializeState}>
        <SWRConfig
          value={{
            fetcher: (url: string) => {
              return axios(url)
                .then((r) => {
                  return r.data;
                })
                .catch(() => {
                  return;
                });
            },
          }}
        >
          <SafeHydrate>
            <InstantSearch
              indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX}
              searchClient={algoliaClient}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </InstantSearch>
          </SafeHydrate>
        </SWRConfig>
      </RecoilRoot>
    </>
  );
};

export default MyApp;
