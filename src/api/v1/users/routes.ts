import { Router } from 'express';
import * as controller from './controller.js';
import { auth, limit, me } from '../auth.js';

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
router.route('/signup').post(limit, controller.create);
router.route('/signin').post(limit, controller.signin);

router.param('id', controller.id);

router
  .route('/:id')
  .get(auth, me, controller.one)
  .put(auth, me, controller.update)
  .delete(auth, me, controller.remove);
