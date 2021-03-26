import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "src/lib/atom";

export const Header = () => {
  const user = useRecoilValue(userState);

  return (
    <header className="w-full mb-4">
      <div className="flex items-center justify-between w-full xl:w-11/12 max-w-screen-xl mx-auto px-2 xl:px-0 pt-2">
        <div className="flex items-center">
          <div className="">
            <Link href="/">
              <a>
                <Image
                  src="/image/gib-black.png"
                  width="50"
                  height="50"
                  alt="gib"
                />
              </a>
            </Link>
          </div>
          {/* <Link href="/search">
            <a className="text-indigo-500 border-2 border-indigo-500 rounded ml-4">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </Link> */}
        </div>
        <div className="flex items-center">
          {user && <HeaderLogined />}
          {!user && (
            <Link href="/login">
              <a className="bg-blue-500 block border-2 border-blue-500 rounded-full text-sm md:text-base text-white ml-4 px-4 py-2">
                ログイン
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

const HeaderLogined = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const user = useRecoilValue(userState);
  const resetUser = useResetRecoilState(userState);
  useEffect(() => {
    window.onclick = (e: any) => {
      const target: any = e.target;
      if (target.id !== "image-btn") {
        setIsOpen(false);
      }
    };
  }, []);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleSignOut = () => {
    destroyCookie(null, "auth");
    destroyCookie(null, "user");
    resetUser();
    router.push("/");
    return;
  };
  return (
    <div className=" flex items-center  sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <div className="ml-3 relative">
        <div>
          <button
            className="bg-gray-800 flex text-sm md:w-12 w-8 md:h-12 h-8 overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            id="user-menu"
            aria-haspopup="true"
            onClick={handleIsOpen}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="object-cover object-center md:w-12 w-8 md:h-12 h-8"
              src={user?.image}
              width="48"
              height="48"
              id="image-btn"
              alt="ユーザープロフィール画像"
              loading="lazy"
            />
          </button>
        </div>

        <Transition
          appear={true}
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <Link href="/mypage">
              <a
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                マイページ
              </a>
            </Link>
            <Link href="/profile">
              <a
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                プロフィール編集
              </a>
            </Link>
            <Link href="/dashboard">
              <a
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                管理
              </a>
            </Link>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              ログアウト
            </button>
          </div>
        </Transition>
      </div>
      <Link href="/new">
        <a className="block text-white font-bold border border-blue-500 bg-blue-500 hover:bg-blue-300 md:py-2 py-1 md:px-4 px-2 rounded-full md:ml-4 ml-2">
          Add New
        </a>
      </Link>
    </div>
  );
};
