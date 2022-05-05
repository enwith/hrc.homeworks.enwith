import { HttpException } from './http.exception';
import { HttpStatus } from '../enums';

export class BadRequestException extends HttpException {
  constructor(message = 'Bad Request') {
    super(
      HttpStatus.BAD_REQUEST,
      HttpException.prepare(message, HttpStatus.BAD_REQUEST),
    );
  }
}
