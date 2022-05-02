import { Router } from 'express';

import usersRoute from './users.route';

export default {
  createRouter() {
    const router = Router();

    router.use(usersRoute.path, usersRoute.createRouter());

    router.use((req, res, next) => {
      res
        .status(404)
        .json({ status: 404, message: 'Not Found' });
    });

    return router;
  },
};
