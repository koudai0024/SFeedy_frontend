import Link from "next/link";
import type { VFC } from "react";

export type PaginationProsp = {
  path: string;
  count: number;
  currentPage: number;
};

export const Pagination: VFC<PaginationProsp> = (props) => {
  const limit = 10;
  const page = Math.ceil(props.count / limit);
  // eslint-disable-next-line no-console
  console.log(props.path);
  if (page <= 1) {
    return null;
  }
  if (props.currentPage === 1) {
    return (
      <Link href={`${props.path}/?page=${props.currentPage + 1}`}>
        <a className="bg-blue-400 flex items-center justify-center mx-auto text-sm text-white rounded-full w-32 h-9">
          次のページ＞
        </a>
      </Link>
    );
  }
  if (props.currentPage === page) {
    return (
      <Link href={`${props.path}/?page=${props.currentPage - 1}`}>
        <a className="bg-blue-400 flex items-center justify-center mx-auto text-sm text-white rounded-full w-32 h-9">
          ＜前のページ
        </a>
      </Link>
    );
  }
  return (
    <div className="flex justify-center w-full mx-auto space-x-2">
      <Link href={`${props.path}/?page=${props.currentPage - 1}`}>
        <a className="bg-blue-400 flex items-center justify-center text-sm text-white rounded-full w-32 h-9 ">
          ＜前のページ
        </a>
      </Link>
      <Link href={`${props.path}/?page=${props.currentPage + 1}`}>
        <a className="bg-blue-400 flex items-center justify-center text-sm text-white rounded-full w-32 h-9 ">
          次のページ＞
        </a>
      </Link>
    </div>
  );
};
