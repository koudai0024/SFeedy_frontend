import axios from "axios";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import type { VFC } from "react";
import { CommonContainer } from "src/components/Sheard/CommonContainer";
import { PostCard } from "src/components/Sheard/PostCard";
import { MainHeading } from "src/components/Sheard/Typography";

type Props = {
  user: UserType;
  posts: PostType[];
  count: number;
  tags: TagType[];
};

const UserPage: VFC<Props> = ({ user, posts, count, tags }) => {
  return (
    <CommonContainer>
      <div className="w-full flex flex-col justify-center items-center mb-8">
        <div className="w-40 h-40 rounded-full overflow-hidden mb-2">
          <img
            src={user.profile.image}
            alt="usericon"
            className="w-40 h-40 object-cover object-center"
          />
        </div>
        <p className="text-2xl font-bold mb-2">{user?.name}</p>
        <p className="text-base">{user?.profile?.description}</p>
      </div>
      <MainHeading variant="h2" className="mb-4">
        {user?.name}さんの投稿
      </MainHeading>
      <div className="flex flex-col lg:flex-row items-start justify-between w-full">
        <div className="flex-1 w-full">
          {posts?.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
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
      </div>
    </CommonContainer>
    // <CommonContainer>
    //   <div className="flex flex-col lg:flex-row">
    //     <div className="w-full lg:w-72 mt-8 lg:mt-0 mr-0 lg:mr-4">
    //       <div className="bg-gray-200 rounded flex flex-col items-center p-8 mb-4 lg:mb-0">
    //         <div className="w-40 h-40 rounded-full overflow-hidden mb-1">
    //           <img
    //             className="w-40 h-40 object-cover object-center"
    //             src={user?.profile.image}
    //             alt=""
    //           />
    //         </div>
    //         <p className="text-2xl font-bold mb-2">{user?.name}</p>
    //         <p className="text-base">{user?.profile?.description}</p>
    //       </div>
    //     </div>
    //     <div className="flex-1">
    //       <h2 className="text-xl md:text-2xl font-bold mb-4">
    //         {user?.name}さんの投稿
    //       </h2>
    //       {posts.map((post) => {
    //         return <PostCard key={post.id} post={post} />;
    //       })}
    //       {count > 10 && (
    //         <div className="w-full text-center">
    //           <Link href="/">
    //             <a className="inline-block bg-blue-400 font-bold text-white text-center rounded-full px-4 py-2">
    //               {user?.name}さんの投稿一覧
    //             </a>
    //           </Link>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </CommonContainer>
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
  const tags = await (await axios.get("/api/v1/tags?limit=10")).data;
  return {
    props: { user, posts, count, tags },
    revalidate: 60,
  };
};

export default UserPage;
