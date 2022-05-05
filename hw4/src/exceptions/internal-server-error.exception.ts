import { HttpException } from './http.exception';
import { HttpStatus } from '../enums';

export class InternalServerErrorException extends HttpException {
  constructor(message = 'Internal Server Error') {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      HttpException.prepare(message, HttpStatus.INTERNAL_SERVER_ERROR),
    );
  }
}
