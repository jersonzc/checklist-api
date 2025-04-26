import express from 'express';
import { prisma } from '../../../app/database.js';
import { parsePaginationParams, parseSortParams } from '../../../app/utils.js';
import { fields, GroupSchema } from './model.js';
import { ZodIssue } from 'zod';

export const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { body = {} } = req;
  const { locals = {} } = res;
  const { decoded = {} } = locals;
  const { id: userId } = decoded;
  try {
    const { success, error, data } = await GroupSchema.safeParseAsync(body);

    const errorMessage = error
      ? error?.errors.map((item: ZodIssue) => item.message).join(',')
      : '';

    if (!success) {
      return next({
        message: `validation error: ${errorMessage}`,
        status: 400,
        error,
      });
    }

    const group = await prisma.group.create({ data: { ...data, userId } });
    res.json({ data: group });
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
  const { orderBy, direction } = parseSortParams({ fields, ...query });

  try {
    const [data, total] = await Promise.all([
      prisma.group.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        include: {
          _count: {
            select: {
              todos: true,
            },
          },
        },
      }),
      prisma.group.count(),
    ]);

    res.json({
      data,
      meta: {
        limit,
        offset,
        total,
        orderBy,
        direction,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const id = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { params = {} } = req;
  const { id = '' } = params;

  try {
    const data = await prisma.group.findUnique({
      where: { id },
    });
    if (data === null) {
      return next({
        message: 'group not found',
        status: 404,
      });
    } else {
      res.locals.data = data;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const one = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { locals = {} } = res;
  const { data } = locals;

  res.json({ data });
};

export const update = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { body = {}, params = {} } = req;
  const { id = '' } = params;

  try {
    const { success, error, data } =
      await GroupSchema.partial().safeParseAsync(body);

    const errorMessage = error
      ? error?.errors.map((item: ZodIssue) => item.message).join(',')
      : '';

    if (!success) {
      return next({
        message: `validation error: ${errorMessage}`,
        status: 400,
        error,
      });
    }

    const group = await prisma.group.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
      include: {
        _count: {
          select: {
            todos: true,
          },
        },
      },
    });
    res.json({ data: group });
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
    await prisma.group.delete({
      where: { id },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
