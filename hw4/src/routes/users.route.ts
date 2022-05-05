import { Router } from 'express';

import usersController from '../controllers/users.controller';
import usersMiddleware from '../middlewares/users.middleware';
import { wrap } from '../util';

export const path = '/users';

export function createRouter(): Router {
  const router = Router();

  router.post(
    '/',
    usersMiddleware.checkUniqueEmail,
    wrap(usersController.create),
  );

  router.get('/', wrap(usersController.findAll));

  router.get(
    '/:userId',
    usersMiddleware.checkValidObjectId,
    wrap(usersController.find),
  );

  router.patch(
    '/:userId',
    usersMiddleware.checkValidObjectId,
    wrap(usersController.update),
  );

  router.delete(
    '/:userId',
    usersMiddleware.checkValidObjectId,
    wrap(usersController.remove),
  );

  return router;
}

export default {
  path,
  createRouter,
};
