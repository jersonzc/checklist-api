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
    const [data, total] = await Promise.all([
      prisma.todo.findMany({
        skip: offset,
        take: limit,
      }),
      prisma.todo.count(),
    ]);

    res.json({
      data,
      meta: {
        limit,
        offset,
        total,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const one = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { params = {} } = req;
  const { id = '' } = params;

  try {
    const data = await prisma.todo.findUnique({
      where: { id },
    });
    if (data === null) {
      return next({
        message: 'todo not found',
        status: 404,
      });
    }
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { body = {}, params = {} } = req;
  const { id = '' } = params;

  try {
    const data = await prisma.todo.update({
      where: { id },
      data: { ...body, updatedAt: new Date() },
    });
    if (data === null) {
      return next({
        message: 'todo not found',
        status: 404,
      });
    }
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { params = {} } = req;
  const { id = '' } = params;

  try {
    const data = await prisma.todo.delete({
      where: { id },
    });

    if (data === null) {
      return next({
        message: 'todo not found',
        status: 404,
      });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
