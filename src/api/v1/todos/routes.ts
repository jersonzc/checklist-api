import { Router } from 'express';

export const router = Router();

router.route('/').get((req, res, next) => {
  res.json({
    message: 'GET all todos',
  });
});
