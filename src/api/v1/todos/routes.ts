import { Router } from 'express';
import * as controller from './controller.js';

export const router = Router();

/*
 * /api/todos/ POST - Create
 * /api/todos/ GET - Read all
 * /api/todos/:id GET - Read one
 * /api/todos/:id PUT - Update
 * /api/todos/:id DELETE - Delete
 */

router.route('/').post(controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.one)
  .put(controller.update)
  .delete(controller.remove);
