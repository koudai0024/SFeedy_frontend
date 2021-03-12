import axios from "axios";
import cc from "classcat";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { CommonContainer } from "src/components/Sheard/CommonContainer";
import { userState } from "src/lib/atom";

const Profile = () => {
  const user = useRecoilValue(userState);
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (user.accessToken) {
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

  if (!user.id) {
    router.push("/");
  }

  const handleSend = () => {
    const data = {
      image: image,
      description: description,
      name: name,
    };
    const oldUser = user;

    axios
      .post("/api/v1/profile", data, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
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
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) {
      setIsLoad(false);
      return;
    }
    const files = e.target.files?.[0];
    const formData = new FormData();
    formData.append("image", files);
    setIsLoad(true);

    axios
      .post("/api/v1/upload/profile", formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
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
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
          className="text-xl w-full border-2 rounded px-2 py-1 mb-4"
          value={name}
          onChange={handleName}
        />
        <textarea
          placeholder="自己紹介、スキル、etc..."
          className="text-xl w-full h-60 max-h-80 border-2 rounded px-2 py-2 mb-3"
          value={description}
          onChange={handleDesc}
        />
        <button
          onClick={handleSend}
          className={cc([
            "bg-indigo-400 text-white font-bold px-8 py-2 rounded",
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
