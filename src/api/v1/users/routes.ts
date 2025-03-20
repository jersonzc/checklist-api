import { Router } from 'express';
import * as controller from './controller.js';

export const router = Router();

/*
 * /api/users/signup POST - Create
 * /api/users/signin POST - Login
 * /api/users/ GET - Read all
 * /api/users/:id GET - Read one
 * /api/users/:id PUT - Update
 * /api/users/:id DELETE - Delete
 */

router.route('/').get(controller.all);
router.route('/signup').post(controller.create);
router.route('/signin').post(controller.signin);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.one)
  .put(controller.update)
  .delete(controller.remove);
