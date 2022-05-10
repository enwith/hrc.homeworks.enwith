import { HttpStatus } from '../enums';
import { isObject, isString } from '../util/types';

export type HttpExceptionResponse = { [key: string]: string | number };

export class HttpException extends Error {
  constructor(
    public status: HttpStatus,
    public response: HttpExceptionResponse,
  ) {
    super(response.message as string);

    Error.captureStackTrace(this, this.constructor);
  }

  protected static prepare(
    message: string | string[] | object,
    status: HttpStatus,
  ) {
    if (isString(message)) {
      return { status, message };
    }

    return isObject(message) && !Array.isArray(message)
      ? { status, ...message }
      : { status, messages: message };
  }
}
