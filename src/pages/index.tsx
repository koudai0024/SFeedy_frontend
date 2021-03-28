import axios from "axios";
import type { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { CommonContainer } from "src/components/Sheard/CommonContainer";
import { Pagination } from "src/components/Sheard/Pagination";
import { PostCard } from "src/components/Sheard/PostCard";
import { MainHeading } from "src/components/Sheard/Typography";
import useSWR from "swr";

type Props = {
  posts: PostType[];
  count: number;
};

const Home: VFC<Props> = (props) => {
  const router = useRouter();

  const currentPage = parseInt(`${router.query.page}`) || 1;
  const page: number = Number(router.query.page) || 1;
  const limit = 10;
  const offset = page * limit - limit;

  const { data: postsInfo } = useSWR(
    `/api/v1/posts?offset=${offset}&limit=${limit}`,
    {
      initialData: { posts: props.posts, count: props.count },
      shouldRetryOnError: true,
    }
  );
  const posts = postsInfo?.posts;
  const count = postsInfo?.count || 1;
  const { data: users } = useSWR<UserType[]>("/api/v1/users?limit=10", {
    shouldRetryOnError: true,
  });
  const { data: tags } = useSWR<TagType[]>("/api/v1/tags?limit=10", {
    shouldRetryOnError: true,
  });

  return (
    <CommonContainer>
      <MainHeading variant="h1" className="mb-4">
        トレンド
      </MainHeading>
      <div className="flex flex-col lg:flex-row items-start justify-between w-full">
        <div className="flex-1 w-full">
          {posts?.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
          <Pagination count={count} currentPage={currentPage} path="" />
        </div>
        <div className="w-full lg:w-72 mt-8 lg:mt-0 ml-0 lg:ml-4">
          <div className="bg-gray-200 w-full rounded-2xl shadow p-4 mb-4">
            <h2 className="text-lg font-bold border-b-4 border-white mb-2">
              タグ
            </h2>
            <ul className="px-2">
              {tags?.map((tag) => {
                return (
                  <li key={tag.id}>
                    <Link
                      href="/tags/[tagId]/posts"
                      as={`/tags/${tag.id}/posts`}
                    >
                      <a className="flex justify-between items-center text-sm py-1 mb-1">
                        <span>{tag.name}</span>
                        <span>{tag.postCount}件</span>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="bg-gray-200 w-full rounded-2xl shadow p-4 mb-4">
            <h2 className="text-lg font-bold border-b-4 border-white mb-2">
              ユーザー
              <span className="text-xs font-light ml-2">(週間)</span>
            </h2>
            <ul className="px-2">
              {users?.map((user) => {
                return (
                  <li key={user.id}>
                    <Link href="/users/[userId]" as={`/users/${user.id}`}>
                      <a className="flex justify-between items-center text-sm py-1 mb-1">
                        <span>{user.name}</span>
                        <span>{user.postCount}件</span>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </CommonContainer>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get("/api/v1/posts?offset=0&limit=10");
  const { posts, count } = await res.data;
  return {
    props: { posts, count },
    revalidate: 60,
  };
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const page: number = Number(ctx.query.page) || 1;
//   const limit = 10;
//   const offset = page * limit - limit;
//   const res = await axios.get(`/api/v1/posts?offset=${offset}&limit=${limit}`);
//   const { posts, count } = await res.data;

//   return {
//     props: {
//       posts: posts,
//       count: count,
//     },
//   };
// };

export default Home;
