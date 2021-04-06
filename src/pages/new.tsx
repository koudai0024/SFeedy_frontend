import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { CommonButton } from "src/components/Sheard/Button";
import { CommonContainer } from "src/components/Sheard/CommonContainer";
import { Editor } from "src/components/Sheard/Editor";
import { userState } from "src/lib/atom";

const PostNew: NextPage = () => {
  const router = useRouter();

  /**
   * ユーザー情報の取得
   */

  const user = useRecoilValue(userState);

  /**
   * ログインしていなければリダイレクト
   */
  if (!user) {
    router.push("/");
  }

  /**
   * 各種ステート
   */
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  /**
   * APIに送信するデータの整形
   */
  const data = {
    title: title,
    body: body,
    tags:
      tags?.trim() !== ""
        ? Array.from(new Set(tags.trim().split(/\s+/, 5)))
        : null,
  };

  /**
   * 送信ボタンクリック時の処理
   */
  const handleSend = () => {
    axios
      .post("/api/v1/posts", data, {
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
  };

  return (
    <div className="mt-4">
      <CommonContainer>
        <CommonButton
          button
          onClick={handleSend}
          bgColor="cyan"
          size="small"
          className="block ml-auto mb-4"
        >
          送信
        </CommonButton>
      </CommonContainer>
      <Editor
        user={user || undefined}
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
        tags={tags}
        setTags={setTags}
      />
    </div>
  );
};

export default PostNew;
