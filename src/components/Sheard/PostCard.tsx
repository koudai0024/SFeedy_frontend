import axios from "axios";
import cc from "classcat";
import { format } from "date-fns";
import marked from "marked";
import Image from "next/image";
import Link from "next/link";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "src/lib/atom";

/**
 * propsの型定義
 */
type PostCardProps = {
  post: PostType;
};

export const PostCard: VFC<PostCardProps> = (props) => {
  const post = props.post;

  /**
   * ユーザー情報の取得
   */
  const user = useRecoilValue(userState);

  /**
   * いいねの状態と数のステート
   */
  const [isLikes, setIsLikes] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);

  /**
   * ロード時にログインしていれば受け取ったpropsの記事がいいねされているか判定
   */
  useEffect(() => {
    if (user) {
      axios
        .get(`/api/v1/likes/${post.id}/is_likes`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          setIsLikes(res.data.result);
        });
    }
  }, []);

  /**
   * いいねボタンを押した時の処理
   */
  const handleLike = async () => {
    if (user) {
      const res = await axios.get(`/api/v1/likes/set/${post.id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      const data: { operation: string; like: LikeType } = res.data;

      if (data.operation === "delete") {
        setIsLikes(false);
        const oldCount = likeCount;
        setLikeCount(oldCount - 1);
      }
      if (data.operation === "create") {
        setIsLikes(true);
        const oldCount = likeCount;
        setLikeCount(oldCount + 1);
      }
    } else {
      alert("ログインしてください");
    }
  };

  return (
    <div className="bg-gray-200 w-full rounded-xl shadow mb-2 md:mb-4 p-2 md:p-4">
      <div>
        <Link href="/users/[userId]" as={`/users/${post.userId}`}>
          <a className="flex items-center mb-1 md:mb-2 py-1">
            <div className="flex items-center justify-center overflow-hidden rounded-full w-5 md:w-6 h-5 md:h-6 mr-2 md:mr-3 ">
              <Image
                src={post.user?.profile.image}
                alt="ユーザー画像"
                className="w-5 md:w-6 h-5 md:h-6 object-cover object-center"
                width="24"
                height="24"
                loading="lazy"
              />
            </div>
            <p className="text-xs md:text-sm font-bold">{post.user?.name}</p>
            <span className="text-base md:text-lg">・</span>
            <p className="text-xs md:text-sm text-gray-600">
              {format(new Date(post.createdAt), "yyyy年M月d日")}
            </p>
          </a>
        </Link>
      </div>
      <Link
        href="/users/[userId]/posts/[postId]"
        as={`/users/${post.userId}/posts/${post.id}`}
      >
        <a>
          <h2 className="md:text-2xl font-bold line-clamp-1 mb-1 md:mb-2">
            {post.title}
          </h2>
          <p className="text-sm md:text-base line-clamp-2">
            {marked(post.body)
              .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
              .substr(0, 150)}
          </p>
        </a>
      </Link>
      <div className="flex items-center justify-between border-t border-black mt-2 pt-1">
        <ul className="flex items-center mb-1 py-1 space-x-2">
          <li className="text-xs md:text-sm font-light line-clamp-1 ">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              ></path>
            </svg>
          </li>
          {post.tags.map((tag) => {
            return (
              <li
                key={tag.id}
                className="text-xs md:text-sm font-light line-clamp-1 "
              >
                <Link href="/tags/[tagId]/posts" as={`/tags/${tag.id}/posts`}>
                  <a>{tag.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center">
          <button
            className={cc([
              "block ml-auto text-gray-400",
              {
                "text-pink-400": isLikes,
              },
            ])}
            onClick={handleLike}
            aria-label="Like Button"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <span className="text-xs ml-1">{likeCount}</span>
        </div>
      </div>
    </div>
  );
};
