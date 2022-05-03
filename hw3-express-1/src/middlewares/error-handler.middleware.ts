import { NextFunction, Request, Response } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  res
    .status(500)
    .render('error', {
      status: 500,
      message: 'Internal Server Error',
      error: err.message,
      stack: err.stack,
    });
}
