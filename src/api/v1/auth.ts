import { Payload } from '../../types.js';
import jwt from 'jsonwebtoken';

import { configuration } from '../../config.js';

const { token } = configuration;
const { secret, expires } = token;

export const signToken = (payload: Payload, expiresIn: string = expires) =>
  jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn,
  });
