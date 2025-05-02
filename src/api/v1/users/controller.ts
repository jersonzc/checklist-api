import express from 'express';
import { prisma } from '../../../app/database.js';
import {
  parsePaginationParams,
  parseSortParams,
  parseZodError,
} from '../../../app/utils.js';
import {
  encryptPassword,
  fields,
  LoginSchema,
  UserSchema,
  verifyPassword,
} from './model.js';
import { signToken } from '../auth.js';
import { ZodIssue } from 'zod';
import { Prisma } from '@prisma/client';
import { PRISMA_ERRORS } from '../../../app/errors.js';

export const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { body = {} } = req;
  try {
    const { success, error, data } = await UserSchema.safeParseAsync(body);

    const errorMessage = error ? parseZodError(error) : '';

    if (!success) {
      return next({
        message: `validation error: ${errorMessage}`,
        status: 400,
        error,
      });
    }

    const password = await encryptPassword(data.password);

    const user = await prisma.user.create({
      data: { ...data, password },
      select: { name: true, email: true },
    });

    res.json({ data: user });
  } catch (error) {
    if (error && error instanceof Prisma.PrismaClientKnownRequestError) {
      const output = error.meta?.target as string[];
      error.message = PRISMA_ERRORS[error.code](output.join(','));
    }
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
      prisma.user.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        select: { id: true, name: true },
      }),
      prisma.user.count(),
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
    const data = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    });
    if (data === null) {
      return next({
        message: 'user not found',
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
      await UserSchema.partial().safeParseAsync(body);

    const errorMessage = error ? parseZodError(error) : '';

    if (!success) {
      return next({
        message: `validation error: ${errorMessage}`,
        status: 400,
        error,
      });
    }

    if (data && data.password) {
      data.password = await encryptPassword(data.password);
    }

    const user = await prisma.user.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
      select: { name: true, email: true },
    });

    res.json({ data: user });
  } catch (error) {
    if (error && error instanceof Prisma.PrismaClientKnownRequestError) {
      const output = error.meta?.target as string[];
      error.message = PRISMA_ERRORS[error.code](output.join(','));
    }
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
    await prisma.user.delete({
      where: { id },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const signin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { body = {} } = req;

  try {
    const { success, error, data } = await LoginSchema.safeParseAsync(body);

    const errorMessage = error ? parseZodError(error) : '';

    if (!success) {
      return next({
        message: `validation error: ${errorMessage}`,
        status: 400,
        error,
      });
    }

    const { email = '', password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, password: true },
    });
    if (!user) {
      return next({
        status: 404,
        message: 'invalid email or password',
      });
    }

    const passwordMatch = await verifyPassword(password, user.password);
    if (!passwordMatch) {
      return next({
        status: 404, // we use 404 to avoid confirming the existence of a user
        message: 'invalid email or password',
      });
    }

    const token = signToken({ id: user.id });

    res.json({
      data: {
        ...user,
        password: undefined,
        id: undefined,
      },
      meta: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
