import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Editor } from "src/components/Sheard/Editor";
import { userState } from "src/lib/atom";

const UpdatePost: NextPage = () => {
  const router = useRouter();

  /**
   * ユーザー情報の取得
   */
  const user = useRecoilValue(userState);

  /**
   * 各種ステート
   */
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  /**
   * ローディングの状態
   */
  const [isLoad, setIsLoad] = useState(false);

  /**
   * ページロード時にデータを取得する
   */
  useEffect(() => {
    setIsLoad(true);
    if (user) {
      axios
        .get(`/api/v1/users/posts/${router.query.postId}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          setIsLoad(false);
          setTitle(res.data.title);
          setBody(res.data.body);
          setTags(
            res.data.tags
              ?.map((obj: any) => {
                return obj.name;
              })
              .join(" ")
          );
        })
        .catch(() => {
          setIsLoad(false);
          router.push("/dashboard");
        });
    }
  }, [router, user]);

  if (!user) {
    router.push("/");
  }

  /**
   * ローディング中の画面
   */
  if (isLoad) null;

  /**
   * APIに送信するデータを整形
   */
  const handleSend = () => {
    const data = {
      title: title,
      body: body,
      tags:
        tags?.trim() !== ""
          ? Array.from(new Set(tags.trim().split(/\s+/, 5)))
          : null,
    };
    axios
      .put(`/api/v1/posts/${router.query.postId}`, data, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        alert(err);
      });
    return;
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleSend}
        className="bg-indigo-400 block rounded text-sm md:text-base text-white ml-auto mr-8 mb-2 px-4 py-2"
      >
        送信
      </button>
      <Editor
        user={user || undefined}
        title={title || ""}
        setTitle={setTitle}
        body={body || ""}
        setBody={setBody}
        tags={tags || ""}
        setTags={setTags}
      />
    </div>
  );
};

export default UpdatePost;
