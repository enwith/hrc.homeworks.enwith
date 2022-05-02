import { Router } from "express";

export default {
  createRouter() {
    const router = Router();

    router.get('/', (req, res) => {
      res.render('welcome', { title: 'party!' });
    });

    router.get('/error', (req, res) => {
      throw new Error('Test error');
    });

    return router;
  },
};
