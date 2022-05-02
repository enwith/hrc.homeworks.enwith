import type { Request, Response } from 'express';

import { HttpStatus } from '../common/enums/http-status.enum';
import { User } from '../common/interfaces/user.interface';
import usersData from '../data/users.data';

export default {
  async create(req: Request, res: Response) {
    const { username } = req.body;

    let user: User;
    try {
      user = await usersData.create({ username });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }

    return res.status(HttpStatus.CREATED).json(user);
  },

  findAll(req: Request, res: Response) {
    const users: User[] = usersData.getAll();

    return res.status(HttpStatus.OK).json(users);
  },

  find(req: Request, res: Response) {
    const { userId } = req.params;

    const user: User = usersData.findById(userId);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    return res.status(HttpStatus.OK).json(user);
  },

  async update(req: Request, res: Response) {
    const { userId } = req.params;
    const { username } = req.body;

    let user: User;
    try {
      user = await usersData.update(userId, { username });
    } catch {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    return res.status(HttpStatus.OK).json(user);
  },

  async delete(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      await usersData.delete(userId);
    } catch {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    return res.status(HttpStatus.OK).end();
  },
};
