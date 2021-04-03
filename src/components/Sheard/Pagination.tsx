import type { VFC } from "react";

import { CommonButton } from "./Button";

export type PaginationProsp = {
  path: string;
  count: number;
  currentPage: number;
};

export const Pagination: VFC<PaginationProsp> = (props) => {
  const limit = 10;
  const page = Math.ceil(props.count / limit);
  if (page <= 1) {
    return null;
  }
  if (props.currentPage === 1) {
    return (
      <div className="flex items-center justify-center mt-4">
        <CommonButton
          linkProps={{ href: `${props.path}/?page=${props.currentPage + 1}` }}
          size="medium"
          bgColor="blue"
          className="mx-auto"
        >
          次のページ＞
        </CommonButton>
      </div>
    );
  }
  if (props.currentPage === page) {
    return (
      <div className="flex items-center justify-center mt-4">
        <CommonButton
          linkProps={{ href: `${props.path}/?page=${props.currentPage - 1}` }}
          size="medium"
          bgColor="blue"
          className="mx-auto"
        >
          ＜前のページ
        </CommonButton>
      </div>
    );
  }
  return (
    <div className="flex justify-center w-full mx-auto space-x-2">
      <CommonButton
        linkProps={{ href: `${props.path}/?page=${props.currentPage + 1}` }}
        size="medium"
        bgColor="blue"
        className="mx-auto"
      >
        次のページ＞
      </CommonButton>
      <CommonButton
        linkProps={{ href: `${props.path}/?page=${props.currentPage - 1}` }}
        size="medium"
        bgColor="blue"
        className="mx-auto"
      >
        ＜前のページ
      </CommonButton>
    </div>
  );
};
