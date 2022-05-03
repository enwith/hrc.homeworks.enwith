import { Router } from 'express';

import usersController from '../controllers/users.controller';
import { wrap } from '../util/wrap.util';

export const path = '/users';

export function createRouter(): Router {
  const router = Router();

  router.post('/', wrap(usersController.create));
  router.get('/', wrap(usersController.findAll));
  router.get('/:userId', wrap(usersController.find));
  router.patch('/:userId', wrap(usersController.update));
  router.delete('/:userId', wrap(usersController.remove));

  return router;
}

export default {
  path,
  createRouter,
}
