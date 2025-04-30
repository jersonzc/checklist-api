import request from 'supertest';

import { app } from '../app/index.js';
import { resetDb } from './helpers/reset-db.js';
import { generateUser } from './fixtures/users.js';
import { generateTodo } from './fixtures/todos.js';

describe('Users signup', () => {
  beforeEach(async () => {
    await resetDb();
  });

  test('signin user and create a task', async () => {
    const agent = request(app);

    const { name, email, password } = generateUser();
    const { title, description, completed, dueDate } = generateTodo();

    const body = {
      name,
      email,
      password,
    };
    const signup = await agent.post('/api/users/signup').send(body);
    expect(signup.status).toBe(200);

    const signin = await agent.post('/api/users/signin').send({
      email,
      password,
    });
    expect(signin.status).toBe(200);

    const token = signin.body.meta.token;
    const todo = await agent
      .post('/api/todos')
      .send({ title, description, completed, dueDate })
      .set('Authorization', `Bearer ${token}`);
    expect(todo.status).toBe(200);

    const { id } = todo.body.data;
    const myTodo = await agent.get(`/api/todos/${id}`);
    expect(myTodo.status).toBe(200);

    const todos = await agent.get(`/api/todos`);
    expect(todos.status).toBe(200);
  });
});
