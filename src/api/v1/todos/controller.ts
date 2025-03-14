import express from 'express';
import { prisma } from '../../../app/database.js';

export const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { body = {} } = req;
  try {
    const data = await prisma.todo.create({ data: body });
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

export const all = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { query = {} } = req;
  const { limit = 10, offset = 0 } = query;
  res.json({
    meta: {
      limit,
      offset,
    },
  });
};

export const one = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { params = {} } = req;
  const { id = '' } = params;
  res.json({
    data: {
      id,
    },
  });
};

export const update = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.json({});
};

export const remove = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.json({});
};
