import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { CommonButton } from "src/components/Sheard/Button";
import { CommonContainer } from "src/components/Sheard/CommonContainer";
import { userState } from "src/lib/atom";

import { Editor } from "../components/Sheard/Editor";

const PostNew = () => {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  if (!user) {
    router.push("/");
  }

  const data = {
    title: title,
    body: body,
    tags:
      tags?.trim() !== ""
        ? Array.from(new Set(tags.trim().split(/\s+/, 5)))
        : null,
  };

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

    return;
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
      {/* <button
        onClick={handleSend}
        className="bg-blue-400 block rounded-full text-sm md:text-base text-white ml-auto mr-8 mb-2 px-4 py-2"
      >
        送信
      </button> */}
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
