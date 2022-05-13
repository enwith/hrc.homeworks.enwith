import { Document, Schema, model } from 'mongoose';

import { Gender, UserRole } from '../enums';
import { IUser } from '../interfaces';
import { isNumber } from '../util/types';

type User = IUser & Document;

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    gender: {
      type: Number,
      enum: Object.values(Gender).filter(isNumber),
      default: Gender.UNKNOWN,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', userSchema);
