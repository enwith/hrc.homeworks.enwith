import { Router } from 'express';

import usersController from '../controllers/users.controller';
import usersMiddleware from '../middlewares/users.middleware';
import { userCreateSchema } from '../schemas';
import validator from '../middlewares/validator.middleware';

export const path = '/users';

export function createRouter(): Router {
  const router = Router();

  router.post(
    '/',
    validator.body(userCreateSchema),
    usersMiddleware.userCheckUniqueEmail,
  );
  router.patch('/:userId', validator.body(userCreateSchema));
  router.all('/:userId', usersMiddleware.userValidateObjectId);

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
