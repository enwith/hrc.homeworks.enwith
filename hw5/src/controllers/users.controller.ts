import type { Handler } from 'express';

import { HttpStatus } from '../enums';
import { NotFoundException } from '../exceptions';
import { User } from '../models';

const userCreate: Handler = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(HttpStatus.CREATED).json(user);
  } catch (err) {
    next(err);
  }
};

const userFindAll: Handler = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const page = parseInt(req.query.page as string, 10) || 1;

    const skip = (page - 1) * limit;

    const users = await User.find().limit(limit).skip(skip).exec();

    res.status(HttpStatus.OK).json({
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

const userFind: Handler = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    res.status(HttpStatus.OK).json(user);
  } catch (err) {
    next(err);
  }
};

const userModify: Handler = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    res.status(HttpStatus.OK).json(user);
  } catch (err) {
    next(err);
  }
};

const userDelete: Handler = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = User.findByIdAndDelete(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    res.status(HttpStatus.NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
};

export default {
  userCreate,
  userFindAll,
  userFind,
  userModify,
  userDelete,
};
