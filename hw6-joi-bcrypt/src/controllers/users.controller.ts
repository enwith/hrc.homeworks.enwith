import type { Handler } from 'express';

import { HttpStatus } from '../enums';
import { NotFoundException } from '../exceptions';
import { hashPassword } from '../helpers/password-hasher.helper';
import { User } from '../models';
import { wrap } from '../util';

const userCreate: Handler = wrap(async (req, res) => {
  const { password } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = new User({ ...req.body, password: hashedPassword });
  await user.save();

  res.status(HttpStatus.CREATED).json(user);
});

const userFindAll: Handler = wrap(async (req, res) => {
  let { limit = 20, page = 1 } = req.query;

  limit = parseInt(limit as string, 10);
  page = parseInt(page as string, 10);

  const skip = (page - 1) * limit;

  const users = await User.find().limit(limit).skip(skip).exec();
  const count = await User.count();

  res.json({
    page,
    perPage: limit,
    data: users,
    count,
  });
});

const userFind: Handler = wrap(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).exec();
  if (!user) {
    throw new NotFoundException('User not found');
  }

  res.json(user);
});

const userModify: Handler = wrap(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  }).exec();
  if (!user) {
    throw new NotFoundException('User not found');
  }

  res.json(user);
});

const userDelete: Handler = wrap(async (req, res) => {
  const { userId } = req.params;

  const user = User.findByIdAndDelete(userId).exec();
  if (!user) {
    throw new NotFoundException('User not found');
  }

  res.status(HttpStatus.NO_CONTENT).send();
});

export default {
  userCreate,
  userFindAll,
  userFind,
  userModify,
  userDelete,
};
