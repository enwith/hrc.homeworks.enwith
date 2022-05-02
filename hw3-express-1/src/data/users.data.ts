import { readFile, writeFile } from "fs/promises";
import { User } from "../common/interfaces/user.interface";
import { PATH_DATA_USERS } from "../constants";

class UsersData {
  public users: User[] = [];

  constructor() {
    this.init();
  }

  private async init() {
    const data = await readFile(PATH_DATA_USERS, 'utf-8');
    const users = JSON.parse(data.toString());

    this.users = users;
  }

  private async save() {
    return writeFile(
      PATH_DATA_USERS,
      JSON.stringify(this.users, null, 2),
      'utf-8',
    );
  }

  getAll() {
    return this.users;
  }

  findById(id: string) {
    return this.users.find((user) => user.id === id)!;
  }

  async create(partial: Partial<User>) {
    const id = Math.random().toString(36).slice(2);
    const user: User = Object.assign({}, partial, { id }) as User;

    this.users.push(user);

    await this.save();

    return user;
  }

  async update(id: string, partial: Partial<User>) {
    const user: User = this.findById(id);
    if (!user) {
      throw new Error('User not exists');
    }

    Object.assign(user, partial);

    await this.save();

    return user;
  }

  async delete(id: string) {
    if (!this.findById(id)) {
      throw new Error('User not exists');
    }

    const index = this.users.findIndex((user) => user.id === id);
    const [user] = this.users.splice(index, 1);

    await this.save();

    return user;
  }
}

export default new UsersData();
