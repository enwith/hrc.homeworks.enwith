import { Router } from 'express';

import usersRoute from './users.route';

export function createRouter(): Router {
  const router = Router();

  router.use(usersRoute.path, usersRoute.createRouter());

  router.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
  });

  return router;
}

export default {
  createRouter,
};
