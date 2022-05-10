import type { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import { BadRequestException, ConflictException } from '../exceptions';
import { User } from '../models';

export async function checkUniqueEmail(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
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
}

export async function validateUserId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
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
}
