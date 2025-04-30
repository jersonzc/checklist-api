import request from 'supertest';

import { app } from '../app/index.js';
import { resetDb } from './helpers/reset-db.js';

describe('Users signup', () => {
  beforeEach(async () => {
    await resetDb();
  });

  test('signin user and create a task', async () => {
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

    const token = signin.body.meta.token;
    const todo = await agent
      .post('/api/todos')
      .send({ title: 'Buy milk' })
      .set('Authorization', `Bearer ${token}`);
    expect(todo.status).toBe(200);

    const { id } = todo.body.data;
    const myTodo = await agent.get(`/api/todos/${id}`);
    expect(myTodo.status).toBe(200);

    const todos = await agent.get(`/api/todos`);
    expect(todos.status).toBe(200);
  });
});
