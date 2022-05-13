import { Schema } from 'joi';
import { BadRequestException } from '../exceptions';
import { wrap } from '../util';

enum RequestType {
  BODY = 'body',
  QUERY = 'query',
}

const createValidator = (type: RequestType) => (schema: Schema) =>
  wrap(async (req, _, next) => {
    const { error, value } = schema.validate(req[type], {
      convert: true,
      allowUnknown: false,
      abortEarly: false,
    });

    if (error) {
      const messages = error.details.map((item) => item.message);
      throw new BadRequestException({
        error: `Invalid from ${type}`,
        messages,
      });
    }

    req[type] = value;

    next();
  });

export const validateBody = createValidator(RequestType.BODY);
export const validateQuery = createValidator(RequestType.QUERY);

export default {
  body: validateBody,
  query: validateQuery,
};
