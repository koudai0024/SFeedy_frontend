import cc from "classcat";
import type { ReactNode, VFC } from "react";

export type MainHeadingProps = {
  children: ReactNode;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  fontSize?: "small" | "medium" | "large";
  textColor?: "red" | "blue" | "green" | "gray" | "black" | "white";
  className?: string;
};
export const MainHeading: VFC<MainHeadingProps> = (props) => {
  const TagName = props.variant;
  return (
    <TagName
      className={cc([
        "text-2xl md:text-3xl font-bold text-gray-500",
        props.className,
        {
          //fontSize
          "md:text-lg": props.fontSize === "small",
          "text-2xl md:text-3xl": props.fontSize === "medium",
          "text-3xl md:text-4xl": props.fontSize === "large",

          //textColor
          "text-red-500": props.textColor === "red",
          "text-blue-500": props.textColor === "blue",
          "text-green-500": props.textColor === "green",
          "text-gray-500": props.textColor === "gray",
          "text-black": props.textColor === "black",
          "text-white": props.textColor === "white",
        },
      ])}
    >
      {props.children}
    </TagName>
  );
};
