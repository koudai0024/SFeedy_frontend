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
    const childwin = window.open("http://localhost:5000/api/v1/auth/google");
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
            });
            setCookie(null, "user", `${JSON.stringify(res.data)}`);
            // eslint-disable-next-line no-console
            console.log(res.data);
          });
        router.push("/login");
      }
    }, 1000);
  };
  return (
    <div>
      <h1>Hello World!!!</h1>
      <button onClick={handleLogin}>login</button>
    </div>
  );
};

export default Login;
