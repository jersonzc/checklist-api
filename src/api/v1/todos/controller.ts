import express from 'express';
import { prisma } from '../../../app/database.js';
import { parsePaginationParams } from '../../../app/utils.js';

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

export const all = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { query = {} } = req;
  const { limit, offset } = parsePaginationParams(query);

  try {
    const data = await prisma.todo.findMany({
      skip: offset,
      take: limit,
    });
    res.json({
      data,
      meta: {
        limit,
        offset,
      },
    });
  } catch (error) {
    next(error);
  }
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
