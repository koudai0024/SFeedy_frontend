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
        setCookie(null, "auth", res.data.token, { maxAge: 60 * 60 * 24 * 60 });
        setCookie(
          null,
          "user",
          `${JSON.stringify({
            id: res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
            image: res.data.user.profile.image,
            accessToken: res.data.token,
          })}`,
          { maxAge: 60 * 60 * 24 * 60 }
        );
        router.push("/");
      });
    return;
  };
  return (
    <div className="bg-blue-100 block relative text-center w-full mx-auto h-full flex-1 ">
      <div className="w-full absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4">
        <h1 className="text-2xl font-bold mb-8">ログイン</h1>
        <div className="w-full">
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            render={(renderProps) => {
              return (
                <button
                  className="bg-white flex items-center justify-center space-x-2 font-bold rounded-full w-11/12 max-w-xl mx-auto px-4 py-3"
                  // eslint-disable-next-line react/jsx-handler-names
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <svg
                    className="w-6 h-auto "
                    viewBox="0 0 256 262"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                  >
                    <path
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      fill="#4285F4"
                    />
                    <path
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      fill="#34A853"
                    />
                    <path
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                      fill="#FBBC05"
                    />
                    <path
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      fill="#EB4335"
                    />
                  </svg>
                  <span>Googleでログイン</span>
                </button>
              );
            }}
            theme="dark"
            style={{}}
            className="rounded-full"
            buttonText="Googleでログイン"
            onSuccess={handleGoogle}
            onFailure={handleGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
