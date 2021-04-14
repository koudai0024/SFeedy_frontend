import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { Pagination } from "src/components/Sheard/Pagination";
import { PostCard } from "src/components/Sheard/PostCard";
import { MainHeading } from "src/components/Sheard/Typography";

// ===================================
// propsの型を設定
// ===================================
type TagPostsProps = {
  posts: PostType[];
  tags: TagType[];
  tag: TagType;
  count: number;
};
const TagPosts: NextPage<TagPostsProps> = (props) => {
  const { posts, tags, tag, count } = props;
  const router = useRouter();

  /**
   * ページネーション用に現在のページを取得
   */
  const currentPage = parseInt(`${router.query.page}`) || 1;

  return (
    <div className="w-full xl:w-11/12 max-w-screen-xl mx-auto mt-4 md:mt-8 px-2 xl:px-0">
      <MainHeading variant="h2" className="mb-4">
        {tag?.name}の投稿一覧
      </MainHeading>
      <div className="flex flex-col lg:flex-row items-start justify-between w-full">
        <div className="flex-1 w-full">
          {posts.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
          <Pagination
            count={count}
            currentPage={currentPage}
            path={`/tags/${tag?.id}/posts`}
          />
        </div>
        <div className="w-full lg:w-72 lg:ml-4">
          <div className="bg-gray-200 w-full rounded-2xl p-4">
            <h2 className="text-lg font-bold border-b-2 border-white mb-2">
              タグ
            </h2>
            <ul className="px-2">
              {tags.map((tag) => {
                return (
                  <li key={tag.id}>
                    <Link
                      href="/tags/[tagId]/posts"
                      as={`/tags/${tag.id}/posts`}
                    >
                      <a className="flex justify-between items-center text-sm mb-1">
                        <span>{tag.name}</span>
                        <span>{tag.postCount}件</span>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const page: number = Number(ctx.query.page) || 1;
  const limit = 10;
  const offset = page * limit - limit;
  const res = await axios.get(
    `/api/v1/tags/${ctx.params?.tagId}/posts?offset=${offset}&limit=${limit}`
  );
  const { posts, count } = await res.data;

  const tag = await (await axios.get(`/api/v1/tags/${ctx.params?.tagId}`)).data;

  const tags = await (await axios.get("/api/v1/tags?limit=10")).data;

  return {
    props: {
      posts: posts,
      tags: tags,
      tag: tag,
      count: count,
    },
  };
};

export default TagPosts;
