import { Gender, UserRole } from '../enums';

export interface IUser {
  username: string;
  password: string;
  email: string;
  gender: Gender;
  role: UserRole;
}
