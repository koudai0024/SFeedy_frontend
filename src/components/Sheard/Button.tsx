import cc from "classcat";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { DOMAttributes, ReactNode, VFC } from "react";

export type CommonButtonType = {
  children: ReactNode;
  bgColor?: "red" | "blue" | "green" | "gray";
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
    props.className,
    {
      "bg-red-500 text-white": props.bgColor === "red",
      "bg-blue-500 text-white": props.bgColor === "blue",
      "bg-green-500 text-white": props.bgColor === "green",
      "bg-gray-500 text-white": props.bgColor === "gray",
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
