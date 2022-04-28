import type { Gender } from "./gender.enum";

export interface IProfile {
  id: string;
  name: string;
  gender: Gender;
}
