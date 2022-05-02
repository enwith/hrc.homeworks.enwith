import { Router } from 'express';

import usersController from '../controllers/users.controller';

export default {
  path: '/users',

  createRouter() {
    const router = Router();

    router.post('/', usersController.create);
    router.get('/', usersController.findAll);
    router.get('/:userId', usersController.find);
    router.patch('/:userId', usersController.update);
    router.delete('/:userId', usersController.delete);

    return router;
  },
}
