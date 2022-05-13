/* eslint-disable consistent-return */
import Joi, { Schema, ValidationError } from 'joi';

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().alphanum().required(),
});

const validate = (schema: Schema, body: any) =>
  schema.validate(body, {
    convert: true,
    allowUnknown: false,
    abortEarly: false,
  });

async function start() {
  const { value, error } = validate(createUserSchema, {
    email: '',
    username: '',
    password: '',
  });

  console.log(value);
}
start();
