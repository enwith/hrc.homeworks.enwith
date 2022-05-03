import type { Handler, NextFunction } from 'express';

type WrappedHandlerOf<F extends Handler> =
  (...args: Parameters<Handler>) => Promise<ReturnType<F> | void>;

export function wrap<F extends Handler>(fn: F): WrappedHandlerOf<F> {
  return (...args: Parameters<Handler>): Promise<ReturnType<F> | void> => {
    return Promise.resolve(fn(...args)).catch(<NextFunction>args.pop());
  };
}
