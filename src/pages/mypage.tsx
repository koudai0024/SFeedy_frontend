import axios from "axios";
import cc from "classcat";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import type { MouseEvent, ReactElement, VFC } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { PostCard } from "src/components/Sheard/PostCard";
import { userState } from "src/lib/atom";

type Props = {
  user: UserType;
  posts: PostType[];
  count: number;
  likedPosts: PostType[];
  likedPostCount: number;
};

const TABS = [
  {
    id: 1,
    title: "投稿記事",
  },
  {
    id: 2,
    title: "いいね記事",
  },
];

const MyPage: VFC<Props> = ({ user, posts, likedPosts }) => {
  const accessUser = useRecoilValue(userState);
  const router = useRouter();
  const [openTab, setOpenTab] = useState(1);

  if (!accessUser && typeof window !== "undefined") {
    router.push("/");
  }

  const handleTab = (e: MouseEvent<HTMLButtonElement>) => {
    setOpenTab(Number(e.currentTarget.dataset?.tab) || 1);
    return;
  };

  if (user) {
    return (
      <div className="flex flex-col lg:flex-row w-full xl:w-11/12 max-w-screen-xl mx-auto px-2 xl:px-0">
        <div className="w-full lg:w-72 mr-0 lg:mr-4">
          <span className="bg-gray-200 rounded-2xl flex flex-col items-center p-8 mb-4 lg:mb-0">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-1">
              <img
                className="w-40 h-40 object-cover object-center"
                src={user.profile?.image}
                alt=""
              />
            </div>
            <p className="text-2xl font-bold mb-2">{user?.name}</p>
            <p className="text-base mb-2">{user.profile?.description}</p>
            <Link href="/profile">
              <a className=" bg-blue-400 text-sm text-white py-2 px-3 rounded-full">
                プロフィール編集
              </a>
            </Link>
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {TABS.map((tab) => {
              return (
                <button
                  key={tab.id}
                  // className="bg-blue-500 text-white px-3 py-2 rounded mr-1"
                  className={cc([
                    "px-3 py-2 rounded",
                    {
                      "bg-gray-400 text-white": openTab === tab.id,
                      "bg-blue-400 text-white": openTab !== tab.id,
                    },
                  ])}
                  onClick={handleTab}
                  data-tab={tab.id}
                >
                  {tab.title}
                </button>
              );
            })}
          </div>
          <div>
            {openTab === 1 &&
              posts.map<ReactElement>((post) => {
                return <PostCard key={post.id} post={post} />;
              })}
            {openTab === 2 &&
              likedPosts?.map<ReactElement>((post) => {
                return <PostCard key={post.id} post={post} />;
              })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <p>no auth</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  if (!cookies.auth) {
    return { props: {} };
  }

  const fetchPosts = await axios.get("/api/v1/users/posts", {
    headers: {
      Authorization: `Bearer ${cookies.auth}`,
    },
  });
  const fetchLikedPosts = await axios.get("/api/v1/likes/posts", {
    headers: {
      Authorization: `Bearer ${cookies.auth}`,
    },
  });
  const fetchUserInfo = await axios.get("/api/v1/users/detail", {
    headers: {
      Authorization: `Bearer ${cookies.auth}`,
    },
  });
  const { posts, count } = await fetchPosts.data;
  const likedPosts = await fetchLikedPosts.data.posts;
  const likedPostCount = await fetchLikedPosts.data.count;
  const user = await fetchUserInfo.data;
  return {
    props: { user, posts, count, likedPostCount, likedPosts },
  };
};

export default MyPage;
