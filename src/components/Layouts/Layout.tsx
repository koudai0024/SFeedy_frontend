import type { ReactChild, VFC } from "react";

// Components
import { Header } from "./Header";

type Props = {
  children: ReactChild;
};

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <>
      <div className="bg-gray-300 flex flex-col w-full min-h-screen">
        <Header />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};
