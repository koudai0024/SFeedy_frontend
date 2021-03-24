import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import type {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import GoogleLogin from "react-google-login";
import { useSetRecoilState } from "recoil";
import { userState } from "src/lib/atom";

const Login = () => {
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  // const handleLogin = () => {
  //   let accessToken: string;
  //   const childwin = window.open(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`
  //   );
  //   window.addEventListener("message", (e) => {
  //     if (e.data.message) {
  //       accessToken = e.data.message;
  //     }
  //   });
  //   const timeId = setInterval(() => {
  //     if (childwin?.closed && accessToken !== "") {
  //       clearInterval(timeId);
  //       setCookie(null, "auth", accessToken);
  //       axios
  //         .get("/api/v1/users/info", {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         })
  //         .then((res) => {
  //           setUser({
  //             id: res.data.id,
  //             name: res.data.name,
  //             email: res.data.email,
  //             image: res.data.image,
  //             accessToken: accessToken,
  //           });
  //           setCookie(
  //             null,
  //             "user",
  //             `${JSON.stringify({ ...res.data, accessToken })}`
  //           );
  //           router.push("/");
  //         })
  //         .catch(() => {
  //           alert("login error");
  //         });
  //     }
  //   }, 1000);
  // };

  const handleGoogle = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const googleRes: GoogleLoginResponse = res as GoogleLoginResponse;
    axios
      .post("/api/v1/auth/google", { token: googleRes.tokenId })
      .then((res) => {
        setUser({
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          image: res.data.user.profile.image,
          accessToken: res.data.token,
        });
        setCookie(
          null,
          "user",
          `${JSON.stringify({ ...res.data, accessToken: res.data.token })}`
        );
        router.push("/");
      });
    return;
  };
  return (
    <div className="bg-white shadow text-center mt-20 px-2 py-4 rounded-lg w-full max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-8">ログイン</h1>
      <div>
        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleGoogle}
          onFailure={handleGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};

export default Login;
