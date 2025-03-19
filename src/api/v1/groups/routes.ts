import { Router } from 'express';
import * as controller from './controller.js';
import { router as todosRouter } from '../todos/routes.js';

export const router = Router();

/*
 * /api/groups/ POST - Create
 * /api/groups/ GET - Read all
 * /api/groups/:id GET - Read one
 * /api/groups/:id PUT - Update
 * /api/groups/:id DELETE - Delete
 */

router.route('/').post(controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.one)
  .put(controller.update)
  .delete(controller.remove);

router.use('/:groupId/todos', todosRouter);
