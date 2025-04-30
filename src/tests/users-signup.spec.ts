import request from 'supertest';

import { app } from '../app/index.js';
import { resetDb } from './helpers/reset-db.js';

describe('Users signup', () => {
  beforeEach(async () => {
    await resetDb();
  });

  test('signed up successfully', async () => {
    const agent = request(app);
    const body = {
      name: 'Juanita',
      email: 'juanita@gmail.com',
      password: 'Aa123456',
    };
    const user = await agent.post('/api/users/signup').send(body);
    expect(user.status).toBe(200);
  });
});
