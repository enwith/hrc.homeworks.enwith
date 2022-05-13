import { hash, compare } from 'bcrypt';

export const hashPassword = (password: string): Promise<string> =>
  hash(password, 10);

export const comparePassword = (
  password: string,
  hash: string,
): Promise<boolean> => compare(password, hash);
