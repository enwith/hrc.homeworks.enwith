import { Router } from 'express';

import { notFoundHandler } from '../middlewares';
import usersRoute from './users.route';

export function createRouter(): Router {
  const router = Router();

  router.use(usersRoute.path, usersRoute.createRouter());

  router.use(notFoundHandler);

  return router;
}

export default {
  createRouter,
};
