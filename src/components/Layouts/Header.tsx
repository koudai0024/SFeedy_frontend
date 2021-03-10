import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "src/lib/atom";

export const Header = () => {
  const user = useRecoilValue(userState);
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(user);
  }, []);
  return (
    <header>
      <div>
        <h1>hello</h1>
        <div className="flex items-center">
          {user.id && <div>hey!!</div>}
          {!user.id && (
            <button
              // onClick={handleSignin}
              className="bg-indigo-400 block border-2 border-indigo-400 rounded text-sm md:text-base text-white ml-4 px-4 py-2"
            >
              ログイン
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
