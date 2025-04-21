import { Router } from 'express';
import * as controller from './controller.js';
import { auth, owner } from '../auth.js';

export const router = Router({ mergeParams: true });

/*
 * /api/todos/ POST - Create
 * /api/todos/ GET - Read all
 * /api/todos/:id GET - Read one
 * /api/todos/:id PUT - Update
 * /api/todos/:id DELETE - Delete
 */

router.route('/').post(auth, controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.one)
  .put(auth, owner, controller.update)
  .delete(auth, owner, controller.remove);
