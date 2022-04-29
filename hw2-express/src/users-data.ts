import { readFile } from "fs/promises";
import { resolve } from "path";
import { User } from "./interfaces/user.interface";

export class UsersData {
  private users: User[] = [];

  constructor() {
    this.loadUsers();
  }

  private async loadUsers() {
    this.users = JSON.parse(
      (await readFile(resolve(__dirname, "../data/users.json"))).toString()
    );
  }

  get(index?: number) {
    return index ? this.users[index] : this.users;
  }
}
