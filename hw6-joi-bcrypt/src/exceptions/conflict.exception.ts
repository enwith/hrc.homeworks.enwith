import { HttpStatus } from '../enums';
import { HttpException } from './http.exception';

export class ConflictException extends HttpException {
  constructor(message: string | object = 'Conflict') {
    super(
      HttpStatus.CONFLICT,
      HttpException.prepare(message, HttpStatus.CONFLICT),
    );
  }
}
