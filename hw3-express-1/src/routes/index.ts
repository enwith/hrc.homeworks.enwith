import { Router } from 'express';

import { HttpStatus } from '../common/enums/http-status.enum';
import usersRoute from './users.route';

export default {
  createRouter() {
    const router = Router();

    router.use(usersRoute.path, usersRoute.createRouter());

    router.use((req, res, next) => {
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: HttpStatus.NOT_FOUND, message: 'Not Found' });
    });

    return router;
  },
};
