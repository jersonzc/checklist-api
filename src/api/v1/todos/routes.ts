import { Router } from 'express';

export const router = Router();

/*
 * /api/todos/ POST - Create
 * /api/todos/ GET - Read all
 * /api/todos/:id GET - Read one
 * /api/todos/:id PUT - Update
 * /api/todos/:id DELETE - Delete
 */

router
  .route('/')
  .post((req, res, next) => {})
  .get((req, res, next) => {});

router
  .route('/:id')
  .get((req, res, next) => {})
  .put((req, res, next) => {})
  .delete((req, res, next) => {});
