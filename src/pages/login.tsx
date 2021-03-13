import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useSetRecoilState } from "recoil";
import { userState } from "src/lib/atom";

const Login = () => {
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  const handleLogin = () => {
    let accessToken: string;
    const childwin = window.open("https://sfeedy.tk/api/v1/auth/google");
    window.addEventListener("message", (e) => {
      if (e.data.message) {
        accessToken = e.data.message;
      }
    });
    const timeId = setInterval(() => {
      if (childwin?.closed && accessToken !== "") {
        clearInterval(timeId);
        setCookie(null, "auth", accessToken);
        axios
          .get("/api/v1/users/info", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            setUser({
              id: res.data.id,
              name: res.data.name,
              email: res.data.email,
              image: res.data.image,
              accessToken: accessToken,
            });
            setCookie(
              null,
              "user",
              `${JSON.stringify({ ...res.data, accessToken })}`
            );
          });
        router.push("/");
      }
    }, 1000);
  };
  return (
    <div className="bg-white shadow text-center mt-20 px-2 py-4 rounded-lg w-full max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-8">ログイン</h1>
      <div>
        <button onClick={handleLogin}>
          <img src="/btn_google_signin_dark_focus_web.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Login;
