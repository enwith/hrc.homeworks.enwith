import Joi from 'joi';

import { Regexes } from '../constants';
import { Gender } from '../enums';
import { IUser } from '../interfaces';
import { isNumber } from '../util/types';

export const userCreateSchema = Joi.object<IUser>({
  email: Joi.string().regex(Regexes.EMAIL).trim().lowercase().required(),
  username: Joi.string().alphanum().min(2).max(30).required(),
  password: Joi.string().regex(Regexes.PASSWORD).min(6).max(24).required(),
  gender: Joi.number().valid(...Object.values(Gender).filter(isNumber)),
});

export const userUpdateSchema = Joi.object<IUser>({
  username: Joi.string().alphanum().min(2).max(30).required(),
  gender: Joi.number().valid(...Object.values(Gender).filter(isNumber)),
});
