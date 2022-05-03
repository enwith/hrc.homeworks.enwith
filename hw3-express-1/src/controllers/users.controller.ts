import type { Request, Response } from 'express';

import usersData from '../data/users.data';

export async function create(req: Request, res: Response): Promise<void> {
  const { username } = req.body;

  const user = await usersData.create({ username });

  res.status(201).json(user);
}

export function findAll(req: Request, res: Response): void {
  const users = usersData.getAll();

  res.status(200).json(users);
}

export function find(req: Request, res: Response): void {
  const { userId } = req.params;

  const user = usersData.findById(userId);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json(user);
}

export async function update(req: Request, res: Response): Promise<void> {
  const { userId } = req.params;

  let user = usersData.findById(userId);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user = await usersData.update(userId, req.body);

  res.status(200).json(user);
}

export async function remove(req: Request, res: Response): Promise<void> {
  const { userId } = req.params;

  let user = usersData.findById(userId);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user = await usersData.delete(userId);

  res.status(200).json(user);
}

export default {
  create,
  findAll,
  find,
  update,
  remove,
};
