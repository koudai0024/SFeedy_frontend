import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { CommonContainer } from "src/components/Sheard/CommonContainer";
import { Pagination } from "src/components/Sheard/Pagination";
import { PostCard } from "src/components/Sheard/PostCard";

// ===================================
// propsの型を設定
// ===================================
type UserPostsProps = {
  user: UserType;
  posts: PostType[];
  count: number;
};

const UserPosts: NextPage<UserPostsProps> = (props) => {
  const { user, posts, count } = props;
  const router = useRouter();
  const currentPage = parseInt(`${router.query.page}`) || 1;
  return (
    <CommonContainer>
      <h2 className="text-3xl font-bold mb-4 md:mb-6">
        {user.name}さんの投稿一覧
      </h2>
      <div className="w-full">
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
        <Pagination
          count={count}
          currentPage={currentPage}
          path={`/users/${user.id}/posts`}
        />
      </div>
    </CommonContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const page: number = Number(ctx.query.page) || 1;
  const limit = 10;
  const offset = page * limit - limit;
  const res = await axios.get(
    `/api/v1/users/${ctx.query.userId}/posts?offset=${offset}&limit=${limit}`
  );
  const { user, posts, count } = await res.data;

  return {
    props: {
      user: user,
      posts: posts,
      count: count,
    },
  };
};

export default UserPosts;
