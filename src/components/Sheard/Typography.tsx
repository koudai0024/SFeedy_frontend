import type { ReactNode, VFC } from "react";

type MainHeadingProps = {
  children: ReactNode;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  className?: string;
};
export const MainHeading: VFC<MainHeadingProps> = ({
  children,
  variant,
  className,
}) => {
  const TagName = variant;
  return (
    <TagName className={`text-2xl md:text-4xl font-bold ${className}`}>
      {children}
    </TagName>
  );
};
