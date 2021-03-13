import cc from "classcat";
import Link from "next/link";
import type { DOMAttributes, ReactNode, VFC } from "react";
import type { Url } from "url";

type Common = {
  children: ReactNode;
  className?: string;
};

type Button = Common & {
  button: boolean;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
};

type Link = Common & {
  linkProps: { href: Url; as?: string };
};

const isButton = (props: Button | Link): props is Button => {
  return "Button" in props;
};

export const CommonButton: VFC<Button | Link> = (
  props,
  { children, className }
) => {
  const classes = cc([className]);
  return isButton(props) ? (
    <button type="button" onClick={props.onClick} className={classes}>
      {children}
    </button>
  ) : (
    <Link {...props.linkProps}>
      <a className={classes}>{children}</a>
    </Link>
  );
};
