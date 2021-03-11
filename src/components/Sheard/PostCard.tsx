import axios from "axios";
import cc from "classcat";
import { format } from "date-fns";
import marked from "marked";
import Link from "next/link";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "src/lib/atom";

type Props = {
  post: PostType;
};

export const PostCard: VFC<Props> = ({ post }) => {
  const [isLikes, setIsLikes] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const user = useRecoilValue(userState);
  useEffect(() => {
    if (user.accessToken) {
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

  const handleLike = async () => {
    if (user.accessToken) {
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
    <div className="bg-white w-full rounded-lg shadow mb-2 md:mb-4 p-2 md:p-4">
      <div className="flex items-center">
        <div className="overflow-hidden rounded-full w-4 md:w-6 h-4 md:h-6 mr-2 md:mr-3 ">
          <img
            src="/blank-profile-picture-973460_1280.png"
            alt=""
            className="w-4 md:w-6 h-4 md:h-6 object-cover object-center"
          />
        </div>
        <p className="text-xs md:text-sm font-bold">{post.user.name}</p>
        <span className="text-base md:text-lg">・</span>
        <p className="text-xs md:text-sm text-gray-500">
          {format(new Date(post.createdAt), "yyyy年M月d日")}
        </p>
      </div>
      <h2 className="md:text-2xl font-bold line-clamp-1 mb-1 md:mb-2">
        <Link
          href="/users/[user_id]/posts/[post_id]"
          as={`/users/${post.userId}/posts/${post.id}`}
        >
          {post.title}
        </Link>
      </h2>
      <p className="text-sm md:text-base line-clamp-2">
        {marked(post.body)
          .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
          .substr(0, 150)}
      </p>
      <div className="flex items-center justify-between border-t mt-2 pt-1">
        <ul className="flex items-center mb-1">
          <li className="text-xs md:text-sm font-light line-clamp-1 mr-1">
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
          <li className="text-xs md:text-sm font-light line-clamp-1 mr-1">
            <a>aaa</a>
          </li>
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
