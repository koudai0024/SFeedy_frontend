import cc from "classcat";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { DOMAttributes, ReactNode, VFC } from "react";

export type CommonButtonType = {
  children: ReactNode;
  bgColor?: "red" | "blue" | "green" | "gray";
  size: "small" | "medium" | "large";
  className?: string;
};

type ButtonType = CommonButtonType & {
  button: boolean;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
};

type LinkType = CommonButtonType & {
  linkProps: LinkProps;
};

const isButton = (props: ButtonType | LinkType): props is ButtonType => {
  return "button" in props;
};

export const CommonButton: VFC<ButtonType | LinkType> = (props) => {
  const classes = cc([
    "rounded-full",
    props.className,
    {
      // bgColor
      "bg-red-500 text-white": props.bgColor === "red",
      "bg-blue-500 text-white": props.bgColor === "blue",
      "bg-green-500 text-white": props.bgColor === "green",
      "bg-gray-500 text-white": props.bgColor === "gray",

      // size
      "px-3 py-1": props.size === "small",
      "px-4 py-2": props.size === "medium",
      "px-8 py-2": props.size === "large",
    },
  ]);
  return isButton(props) ? (
    <button type="button" onClick={props.onClick} className={classes}>
      {props.children}
    </button>
  ) : (
    <Link {...props.linkProps}>
      <a className={classes}>{props.children}</a>
    </Link>
  );
};
