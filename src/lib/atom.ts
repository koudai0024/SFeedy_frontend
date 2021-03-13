import { atom } from "recoil";

export const userState = atom({
  key: "userInfoState",
  default: {
    id: "",
    name: "",
    email: "",
    image: "",
    accessToken: "",
  },
});
