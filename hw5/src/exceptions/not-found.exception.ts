import { HttpException } from './http.exception';
import { HttpStatus } from '../enums';

export class NotFoundException extends HttpException {
  constructor(message = 'Not Found') {
    super(
      HttpStatus.NOT_FOUND,
      HttpException.prepare(message, HttpStatus.NOT_FOUND),
    );
  }
}
