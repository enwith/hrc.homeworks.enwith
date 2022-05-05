import { NextFunction, Request, Response } from 'express';

import { HttpException, InternalServerErrorException } from '../exceptions';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const ex =
    err instanceof HttpException
      ? err
      : new InternalServerErrorException(err.message);

  res.status(ex.status).json(ex.response);
}
