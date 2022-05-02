import { NextFunction, Request, Response } from 'express';

import { HttpStatus } from '../common/enums/http-status.enum';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .render('error', {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: err.message,
      stack: err.stack,
    });
}
