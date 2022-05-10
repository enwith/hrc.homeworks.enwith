import { Gender } from '../enums';

export interface IUser {
  username: string;
  email: string;
  gender: Gender;
}
