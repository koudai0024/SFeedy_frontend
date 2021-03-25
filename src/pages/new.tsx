import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
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
      <button
        onClick={handleSend}
        className="bg-blue-400 block rounded-full text-sm md:text-base text-white ml-auto mr-8 mb-2 px-4 py-2"
      >
        送信
      </button>
      <Editor
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
