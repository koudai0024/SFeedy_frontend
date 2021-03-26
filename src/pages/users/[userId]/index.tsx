import axios from "axios";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import type { VFC } from "react";
import { CommonContainer } from "src/components/Sheard/CommonContainer";
import { PostCard } from "src/components/Sheard/PostCard";

type Props = {
  user: UserType;
  posts: PostType[];
  count: number;
};

const UserPage: VFC<Props> = ({ user, posts, count }) => {
  return (
    <CommonContainer>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-72 mt-8 lg:mt-0 mr-0 lg:mr-4">
          <div className="bg-gray-200 rounded flex flex-col items-center p-8 mb-4 lg:mb-0">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-1">
              <img
                className="w-40 h-40 object-cover object-center"
                src={user?.profile.image}
                alt=""
              />
            </div>
            <p className="text-2xl font-bold mb-2">{user?.name}</p>
            <p className="text-base">{user?.profile?.description}</p>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            {user?.name}さんの投稿
          </h2>
          {posts.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
          {count > 10 && (
            <div className="w-full text-center">
              <Link href="/">
                <a className="inline-block bg-blue-400 font-bold text-white text-center rounded-full px-4 py-2">
                  {user?.name}さんの投稿一覧
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </CommonContainer>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get("/api/v1/users");
  const users = await res.data;
  const paths: Array<string> = users.map((repo: UserType) => {
    return `/users/${repo.id}`;
  });
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const res = await axios.get(`/api/v1/users/${ctx.params?.userId}/posts`);
  const { user, posts, count } = await res.data;
  return {
    props: { user, posts, count },
    revalidate: 60,
  };
};

export default UserPage;
