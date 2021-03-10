import axios from "axios";
import type { NextPageContext } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import type { ReactChild, VFC } from "react";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { Layout } from "src/components/Layouts/Layout";

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

const noCheckUrl = ["/", "/signin", "/login"];

const MyApp = ({ Component, pageProps }: AppProps, ctx: NextPageContext) => {
  const router = useRouter();
  const cookies = parseCookies(ctx);
  useEffect(() => {
    router.beforePopState((url) => {
      if (!noCheckUrl.includes(`${url}`)) {
        if (typeof cookies.auth === "undefined") {
          // CSR用リダイレクト処理
          window.location.href = "/";
          return false;
        }
      }
      return true;
    });
    return;
  }, []);

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
      <SafeHydrate>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SafeHydrate>
    </RecoilRoot>
  );
};

MyApp.getInitialProps = async (appContext: any) => {
  // SSR用認証チェック

  const cookies = parseCookies(appContext.ctx);
  // ログイン画面とエラー画面遷移時のみ認証チェックを行わない
  if (!noCheckUrl.includes(appContext.ctx.pathname)) {
    if (typeof cookies.auth === "undefined") {
      // SSR or CSRを判定
      const isServer = typeof window === "undefined";
      if (isServer) {
        appContext.ctx.res.statusCode = 302;
        appContext.ctx.res.setHeader("Location", "/");
        return {};
      } else {
        return;
      }
    }
  }
  return {
    pageProps: {
      ...(appContext.Component.getInitialProps
        ? await appContext.Component.getInitialProps(appContext.ctx)
        : {}),
      pathname: appContext.ctx.pathname,
    },
  };
};

export default MyApp;
