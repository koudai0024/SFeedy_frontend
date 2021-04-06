import { atom } from "recoil";

export type AtomUserType = {
  id: string;
  name: string;
  email: string;
  image: string;
  accessToken: string;
};

export const userState = atom<AtomUserType | null>({
  key: "userInfoState",
  default: null,
});
