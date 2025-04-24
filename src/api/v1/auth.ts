import { Payload } from '../../types.js';
import jwt from 'jsonwebtoken';

import { configuration } from '../../config.js';
import express from 'express';
import { StringValue } from 'ms';

const { token } = configuration;
const { secret, expires } = token;

export const signToken = (payload: Payload, expiresIn: StringValue = expires) =>
  jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn,
  });

export const auth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  let token = req.headers.authorization || '';
  if (token.startsWith('Bearer ')) {
    token = token.substring(7);
  }

  if (!token) {
    return next({
      message: 'unauthorized',
      status: 401,
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return next({
        message: 'unauthorized',
        status: 401,
      });
    } else {
      res.locals.decoded = decoded;
      next();
    }
  });
};

export const me = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { params = {} } = req;
  const { id } = params;
  const { locals = {} } = res;
  const { decoded = {} } = locals;
  const { id: userId } = decoded;

  if (id !== userId) {
    next({
      message: 'forbidden',
      status: 403,
    });
  } else {
    next();
  }
};

export const owner = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { locals = {} } = res;
  const { decoded = {} } = locals;
  const { id: userId } = decoded;
  const { data = {} } = locals;
  const { userId: ownerId } = data;

  if (userId !== ownerId) {
    next({
      message: 'forbidden',
      status: 403,
    });
  } else {
    next();
  }
};
