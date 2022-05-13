import type { HttpStatus } from '../enums';
import { isObject, isString } from '../util/types';

export type HttpExceptionResponse = Record<string, unknown>;

export class HttpException extends Error {
  constructor(
    public status: HttpStatus,
    public response: HttpExceptionResponse,
  ) {
    super(response.message as string);
  }

  protected static prepare(
    message: string | object,
    status?: HttpStatus,
  ): HttpExceptionResponse {
    if (isString(message)) {
      return { status, message };
    }

    return isObject(message) && Array.isArray(message)
      ? { status, messages: message }
      : { status, ...message };
  }
}
