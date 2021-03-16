import axios from "axios";
import cheerio from "cheerio";
import cc from "classcat";
import hljs from "highlight.js";
import marked from "marked";
import type { ChangeEvent, Dispatch, SetStateAction, VFC } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "src/lib/atom";

type Props = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
  tags: string;
  setTags: Dispatch<SetStateAction<string>>;
};

export const Editor: VFC<Props> = ({
  title,
  setTitle,
  body,
  setBody,
  tags,
  setTags,
}) => {
  const [isLoad, setIsLoad] = useState(false); //Todo Loading Icon 追加
  const user = useRecoilValue(userState);

  const [isMode, setIsMode] = useState<"edit" | "preview">("edit");

  const handleMode = () => {
    isMode === "edit" ? setIsMode("preview") : setIsMode("edit");
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) {
      setIsLoad(false);
      return;
    }
    setIsLoad(true);
    const files = e.target.files?.[0] || "";
    const formData = new FormData();
    formData.append("image", files);
    axios
      .post("/api/v1/upload/article", formData, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) => {
        const oldValue = body;
        setBody(oldValue + `![](${res.data.url})`);
        setIsLoad(false);
      })
      .catch(() => {
        setIsLoad(false);
      });
    return;
  };
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleTags = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };
  const handleBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  marked.setOptions({
    headerIds: false,
  });
  const $ = cheerio.load(marked(body));
  $("a").each((_, elm) => {
    $(elm).attr("rel", "noopener noreferrer");
    $(elm).attr("target", "_blank");
  });
  $("img").each((_, elm) => {
    $(elm).attr("loading", "lazy");
  });
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });
  return (
    <>
      <input
        type="text"
        placeholder="タイトルを入力"
        value={title}
        onChange={handleTitle}
        className="bg-white text-xl md:text-2xl w-full h-10 rounded p-2 mb-2"
      />
      <input
        type="text"
        placeholder="タグを入力 空白で区切り5つまで設定できます"
        value={tags}
        onChange={handleTags}
        className="bg-white text-sm md:text-base w-full h-10 rounded p-2 mb-2"
      />
      <div className="bg-white flex border-t border-b border-black ">
        <div className="box-border order-2 md:order-1 overflow-hidden w-2/4 md:border-r border-black">
          <div className="flex justify-end md:justify-start w-full px-2 py-1">
            <label
              htmlFor="photoBtn"
              className={cc([
                {
                  "pointer-events-none animate-pulse": isLoad,
                },
              ])}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="hidden"
                type="file"
                id="photoBtn"
                accept=".png, .jpg, .jpeg"
                onChange={handleImage}
              />
            </label>
          </div>
        </div>
        <div className="overflow-hidden w-2/4 order-1">
          <div className="hidden md:block w-full px-2 py-1">
            <p>Preview</p>
          </div>
          <div className="md:hidden w-full px-2 py-1">
            <button
              className={cc([
                "text-sm rounded px-2 py-0.5 mr-1",
                {
                  "bg-pink-500 text-white": isMode !== "preview",
                  "bg-gray-200 pointer-events-none": isMode === "preview",
                },
              ])}
              onClick={handleMode}
            >
              Preview
            </button>
            <button
              className={cc([
                "text-sm rounded px-2 py-0.5 ",
                {
                  "bg-pink-500 text-white": isMode !== "edit",
                  "bg-gray-200 pointer-events-none": isMode === "edit",
                },
              ])}
              onClick={handleMode}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white flex h-content mb-4">
        <div
          className={cc([
            "box-border overflow-hidden w-full md:w-2/4 h-full md:border-r border-black",
            {
              "hidden md:block": isMode !== "edit",
            },
          ])}
        >
          <textarea
            placeholder="本文を入力してください"
            value={body}
            onChange={handleBody}
            className={cc([
              "resize-none overflow-scroll box-border w-full h-full p-4",
              {
                "pointer-events-none animate-pulse": isLoad,
              },
            ])}
          ></textarea>
        </div>
        <div
          className={cc([
            "overflow-hidden w-full md:w-2/4 h-full",
            {
              "hidden md:block": isMode !== "preview",
            },
          ])}
        >
          <div
            className="markdown-body overflow-scroll w-full h-full p-4 "
            dangerouslySetInnerHTML={{ __html: $.html() }}
          ></div>
        </div>
      </div>
    </>
  );
};
