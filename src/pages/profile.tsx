import axios from "axios";
import cc from "classcat";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import type { ChangeEventHandler } from "react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { CommonContainer } from "src/components/Sheard/CommonContainer";
import { userState } from "src/lib/atom";

const Profile: NextPage = () => {
  const router = useRouter();

  /**
   * ユーザーの情報を取得
   */
  const user = useRecoilValue(userState);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  /**
   * loadingの状態
   */
  const [isLoad, setIsLoad] = useState(false);

  // ===================================
  // 各stateに初期値を入れる
  // ===================================
  useEffect(() => {
    if (user) {
      setImage(`${user.image}`);
      setName(`${user.name}`);
      axios
        .get("/api/v1/users/detail", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          setDescription(res.data.profile?.description);
        })
        .catch(() => {
          return;
        });
    }
  }, []);

  // ===================================
  // ログインしていなければトップページにリダイレクト
  // ===================================
  if (!user) {
    router.push("/");
  }

  // ===================================
  // 変更ボタンをクリック時情報をapiに送信
  // ===================================
  const handleSend = () => {
    const data = {
      image: image,
      description: description,
      name: name,
    };
    const oldUser = user;

    // ===================================
    // データを送信して、情報を更新
    // ===================================
    axios
      .post("/api/v1/profile", data, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then(() => {
        setCookie(
          null,
          "user",
          `${JSON.stringify({
            ...oldUser,
            name: data.name,
            image: data.image,
          })}`
        );
        router.push("/").then(() => {
          location.reload();
        });
        return;
      })
      .catch(() => {
        return;
      });
  };

  // ===================================
  // 画像のアップロード処理
  // ===================================
  const handleUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files?.[0]) {
      setIsLoad(false);
      return;
    }
    const files = e.target.files?.[0];
    const formData = new FormData();
    formData.append("image", files);
    setIsLoad(true);

    // ===================================
    // 画像をAPIに送信
    // ===================================
    axios
      .post("/api/v1/upload/profile", formData, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => {
        setImage(res.data.url);
        setIsLoad(false);
      })
      .catch(() => {
        setIsLoad(false);
      });
  };

  // ===================================
  // ステートの更新処理
  // ===================================
  const handleName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };
  const handleDesc: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDescription(e.target.value);
  };

  return (
    <CommonContainer>
      <div className="bg-white flex flex-col items-center w-full rounded-lg mx-auto mt-4 md:mt-8 py-4 px-2 md:px-4">
        <div className="w-40 md:w-60 h-40 md:h-60 overflow-hidden rounded-full mx-auto mb-8">
          <img
            src={image}
            alt=""
            className={cc([
              "w-40 md:w-60 h-40 md:h-60 object-cover object-center ",
              {
                "animate-pulse": isLoad,
              },
            ])}
          />
        </div>
        <label
          htmlFor="file_photo"
          className={cc([
            "text-white bg-red-400 px-4 py-2 rounded-full mb-8",
            {
              "bg-gray-400 pointer-events-none": isLoad,
            },
          ])}
        >
          画像を変更
          <input
            className="hidden"
            id="file_photo"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleUpload}
          />
        </label>

        <input
          type="text"
          placeholder="name"
          className="bg-gray-200 text-xl w-full border-2 rounded-full px-4 py-2 mb-4"
          value={name}
          onChange={handleName}
        />
        <textarea
          placeholder="自己紹介、スキル、etc..."
          className="bg-gray-200 text-xl w-full h-60 max-h-80 border-2 rounded-2xl px-4 py-2 mb-3"
          value={description}
          onChange={handleDesc}
        />
        <button
          onClick={handleSend}
          className={cc([
            "bg-blue-400 text-white font-bold px-8 py-2 rounded-full",
            {
              "bg-gray-400 pointer-events-none": isLoad,
            },
          ])}
        >
          変更
        </button>
      </div>
    </CommonContainer>
  );
};

export default Profile;
