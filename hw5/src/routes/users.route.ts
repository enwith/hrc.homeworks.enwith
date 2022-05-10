import { Router } from 'express';

// import {
//   userCreate,
//   userList,
//   userGet,
//   userUpdate,
//   userDelete,
// } from '../controllers/users.controller';

import usersController from '../controllers/users.controller';

import { validateUserId } from '../middlewares/users.middleware';

export const path = '/users';

export function createRouter(): Router {
  const router = Router();

  router.all('/:userId', validateUserId);

  router.post('/', usersController.userCreate);
  router.get('/', usersController.userFindAll);
  router.get('/:userId', usersController.userFind);
  router.patch('/:userId', usersController.userModify);
  router.delete('/:userId', usersController.userDelete);

  return router;
}

export default {
  path,
  createRouter,
};
