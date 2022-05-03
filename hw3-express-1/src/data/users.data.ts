import { readFile, writeFile } from 'fs/promises';
import { User } from '../common/interfaces/user.interface';
import { PATH_DATA_USERS } from '../constants';

class UsersData {
  public users: User[] = [];

  public constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    const data = await readFile(PATH_DATA_USERS, 'utf-8');
    const users: User[] = JSON.parse(data);

    this.users = users;
  }

  private async save(): Promise<void> {
    const data = JSON.stringify(this.users, null, 2);

    return writeFile(PATH_DATA_USERS, data, 'utf-8');
  }

  public getAll(): User[] {
    return this.users;
  }

  public findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public async create(partial: Partial<User>): Promise<User> {
    const id = Math.random().toString(36).slice(2);
    const user = Object.assign({}, partial, { id }) as User;

    this.users.push(user);

    await this.save();

    return user;
  }

  public async update(id: string, partial: Partial<User>): Promise<User> {
    const user = this.findById(id);
    if (!user) {
      throw new Error('User not exists');
    }

    Object.assign(user, partial);

    await this.save();

    return user;
  }

  public async delete(id: string): Promise<User> {
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
