import { Router } from 'express';

export const router = Router();

router.route('/todos').get((req, res, next) => {
  res.json({
    message: 'GET all todos',
  });
});
