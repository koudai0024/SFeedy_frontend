import axios from "axios";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { parseCookies } from "nookies";
import type { VFC } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "src/lib/atom";

type Props = {
  posts: PostType[];
  count: number;
};

const Dashboard: VFC<Props> = ({ posts }) => {
  const user = useRecoilValue(userState);
  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.getAttribute("data-post-id");
    const title = e.currentTarget.getAttribute("data-post-title");
    // eslint-disable-next-line no-console
    console.log(id, title);
    if (confirm(`${title}を削除いたします`)) {
      axios
        .delete(`/api/v1/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        })
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          alert(`${title}の削除に失敗しました。`);
        });
    }
  };
  return (
    <div className="w-full xl:w-11/12 max-w-screen-xl mx-auto mt-4 md:mt-8 px-2 xl:px-0">
      <table className="w-full shadow rounded overflow-hidden ">
        <thead className=" w-full bg-black border-b border-black">
          <tr className="p-4">
            <th
              scope="col"
              className="text-left text-xs font-bold text-white px-4 py-2"
            >
              TITLE
            </th>
            <th
              scope="col"
              className="text-right text-xs font-medium text-gray-500 px-4 py-2"
            >
              <span className="sr-only">編集</span>
            </th>
            <th
              scope="col"
              className="text-right text-xs font-medium text-gray-500 px-4 py-2"
            >
              <span className="sr-only">削除</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr
                key={post.id}
                className=" bg-gray-200 border-b-2 border-white"
              >
                <td className="px-4 py-2r">
                  <Link
                    href="/[userId]/posts/[postId]"
                    as={`/${post.userId}/posts/${post.id}`}
                  >
                    <a className="line-clamp-1">{post.title}</a>
                  </Link>
                </td>
                <td className="text-right block py-2">
                  <Link href="/dashboard/[postId]" as={`/dashboard/${post.id}`}>
                    <a className="inline-block whitespace-nowrap bg-blue-400 px-4 py-1 text-xs text-white rounded-full">
                      編集
                    </a>
                  </Link>
                </td>
                <td className="text-right py-2 pr-2 w-20">
                  <button
                    data-post-id={post.id}
                    data-post-title={post.title}
                    onClick={handleDelete}
                    className="bg-red-400 px-4 py-1 text-xs text-white rounded-full"
                  >
                    削除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  if (!cookies.auth) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
  } else {
    const res = await axios.get("/api/v1/users/posts", {
      headers: {
        Authorization: `Bearer ${cookies.auth}`,
      },
    });
    const { posts, count } = await res.data;
    return {
      props: {
        posts,
        count,
      },
    };
  }
  return {
    props: {
      posts: [],
      count: 0,
    },
  };
};

export default Dashboard;
