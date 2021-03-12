import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Editor } from "src/components/Sheard/Editor";
import { userState } from "src/lib/atom";

const UpdatePost = () => {
  const router = useRouter();
  const user = useRecoilValue(userState);

  useEffect(() => {
    setIsLoad(true);
    if (user.accessToken) {
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
    return;
  }, []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  if (!user.id) {
    router.push("/");
  }

  if (isLoad) null;

  const data = {
    title: title,
    body: body,
    tags:
      tags?.trim() !== "" ? Array.from(new Set(tags?.split(/\s+/, 5))) : null,
  };

  const handleSend = () => {
    axios
      .put(`/api/v1/posts/${router.query.post_id}`, data, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
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
