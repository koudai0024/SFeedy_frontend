import Link from "next/link";
import type { VFC } from "react";

type Prosp = {
  path: string;
  count: number;
  currentPage: number;
};

export const Pagination: VFC<Prosp> = ({ path, count, currentPage }) => {
  const limit = 10;
  const page = Math.ceil(count / limit);
  if (page <= 1) {
    return null;
  }
  if (currentPage === 1) {
    return (
      <Link href={`${path}/?page=${currentPage + 1}`}>
        <a className="bg-blue-400 flex items-center justify-center mx-auto text-sm text-white rounded-full w-32 h-9">
          次のページ＞
        </a>
      </Link>
    );
  }
  if (currentPage === page) {
    return (
      <Link href={`${path}/?page=${currentPage - 1}`}>
        <a className="bg-blue-400 flex items-center justify-center mx-auto text-sm text-white rounded-full w-32 h-9">
          ＜前のページ
        </a>
      </Link>
    );
  }
  return (
    <div className="flex justify-center w-full mx-auto space-x-2">
      <Link href={`${path}/?page=${currentPage - 1}`}>
        <a className="bg-blue-400 flex items-center justify-center text-sm text-white rounded-full w-32 h-9 ">
          ＜前のページ
        </a>
      </Link>
      <Link href={`${path}/?page=${currentPage + 1}`}>
        <a className="bg-blue-400 flex items-center justify-center text-sm text-white rounded-full w-32 h-9 ">
          次のページ＞
        </a>
      </Link>
    </div>
  );
};
