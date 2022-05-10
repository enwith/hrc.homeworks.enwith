import type { Handler } from 'express';
import { Types } from 'mongoose';

import { BadRequestException, ConflictException } from '../exceptions';
import { User } from '../models';

const userCheckUniqueEmail: Handler = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }).exec();
    if (user) {
      throw new ConflictException('Email already exists');
    }

    next();
  } catch (err) {
    next(err);
  }
};

const userValidateObjectId: Handler = (req, res, next) => {
  try {
    const { userId } = req.params;

    const isValid = Types.ObjectId.isValid(userId);
    if (!isValid) {
      throw new BadRequestException(`Invalid user id (${userId})`);
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default {
  userCheckUniqueEmail,
  userValidateObjectId,
};
