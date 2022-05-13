import type { Handler } from 'express';

type WrappedHandlerOf<H extends Handler> =
  (...args: Parameters<Handler>) => Promise<ReturnType<H> | void>;

export function wrap<H extends Handler>(handler: H): WrappedHandlerOf<H> {
  return (req, res, next): Promise<ReturnType<H> | void> =>
    Promise.resolve(handler(req, res, next)).catch(next);
}
