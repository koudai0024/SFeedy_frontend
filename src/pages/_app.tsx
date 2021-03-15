import "../styles/tailwind.css";
import "github-markdown-css";
import "highlight.js/styles/github-gist.css";

import axios from "axios";
import type { NextPageContext } from "next";
import type { AppProps } from "next/app";
import { parseCookies } from "nookies";
import type { ReactChild, VFC } from "react";
import { RecoilRoot } from "recoil";
import { Layout } from "src/components/Layouts/Layout";
import { SWRConfig } from "swr";

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

const MyApp = ({ Component, pageProps }: AppProps, ctx: NextPageContext) => {
  const initializeState = ({ set }: any) => {
    const cookie = parseCookies(ctx);
    if (cookie?.user) {
      const user = JSON.parse(cookie.user);

      if (user) {
        set({ key: "userInfoState" }, user);
      }
    }
  };

  return (
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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SafeHydrate>
      </SWRConfig>
    </RecoilRoot>
  );
};

export default MyApp;
