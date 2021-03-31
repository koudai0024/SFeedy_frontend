import type { ReactNode, VFC } from "react";

export type CommonContainerProps = {
  children: ReactNode;
};

export const CommonContainer: VFC<CommonContainerProps> = ({ children }) => {
  return (
    <div className="w-full xl:w-11/12 max-w-screen-xl mx-auto px-2 xl:px-0">
      {children}
    </div>
  );
};
