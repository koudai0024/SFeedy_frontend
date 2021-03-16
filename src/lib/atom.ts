import { atom } from "recoil";

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  accessToken: string;
};

export const userState = atom<User | null>({
  key: "userInfoState",
  default: null,
});
// id: "",
//     name: "",
//     email: "",
//     image: "",
//     accessToken: "",
