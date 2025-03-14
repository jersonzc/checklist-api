import express from 'express';

export const create = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.json({});
};

export const all = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.json({});
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
