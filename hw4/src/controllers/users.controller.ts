import type { Request, Response } from 'express';

import { HttpStatus } from '../enums';
import { NotFoundException } from '../exceptions';
import { User } from '../models';

async function create(req: Request, res: Response): Promise<void> {
  const user = new User(req.body);
  await user.save();

  res.status(HttpStatus.CREATED).json(user);
}

async function findAll(req: Request, res: Response): Promise<void> {
  const users = await User.find().exec();

  res.status(HttpStatus.OK).json(users);
}

async function find(req: Request, res: Response): Promise<void> {
  const { userId } = req.params;

  const user = await User.findById(userId).exec();
  if (!user) {
    throw new NotFoundException('User not found');
  }

  res.status(HttpStatus.OK).json(user);
}

async function update(req: Request, res: Response): Promise<void> {
  const { userId } = req.params;

  const user = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  }).exec();
  if (!user) {
    throw new NotFoundException('User not found');
  }

  res.status(HttpStatus.OK).json(user);
}

async function remove(req: Request, res: Response): Promise<void> {
  const { userId } = req.params;

  const user = User.findByIdAndDelete(userId).exec();
  if (!user) {
    throw new NotFoundException('User not found');
  }

  res.status(HttpStatus.NO_CONTENT).send();
}

export default {
  create,
  findAll,
  find,
  update,
  remove,
};
