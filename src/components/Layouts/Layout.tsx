import type { ReactChild, VFC } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
  children: ReactChild;
};

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </div>
    </>
  );
};
