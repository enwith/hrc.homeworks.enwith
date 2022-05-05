import { NotFoundException } from '../exceptions';

export function notFoundHandler() {
  throw new NotFoundException('Resource not found');
}
