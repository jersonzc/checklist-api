import request from 'supertest';

import { app } from '../app/index.js';
import { resetDb } from './helpers/reset-db.js';

describe('Users signup', () => {
  beforeEach(async () => {
    await resetDb();
  });

  test('signed in successfully', async () => {
    const agent = request(app);
    const body = {
      name: 'Juanita',
      email: 'juanita@gmail.com',
      password: 'Aa123456',
    };
    const signup = await agent.post('/api/users/signup').send(body);
    expect(signup.status).toBe(200);

    const signin = await agent.post('/api/users/signin').send({
      email: body.email,
      password: body.password,
    });
    expect(signin.status).toBe(200);
  });
});
