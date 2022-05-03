import { Router } from "express";

export const path = '';

export function createRouter(): Router {
  const router = Router();

  router.get('/', (_, res) => {
    res.render('welcome', { title: 'party!' });
  });

  router.get('/error', () => {
    throw new Error('Test error');
  });

  return router;
}

export default {
  path,
  createRouter,
};
