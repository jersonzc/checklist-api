import merge from 'lodash/merge.js';
import users from './users/docs.json' with { type: 'json' };
import todos from './todos/docs.json' with { type: 'json' };
import groups from './groups/docs.json' with { type: 'json' };

export const swaggerDefinition = merge(
  {
    openapi: '3.1.0',
    info: {
      title: 'Checklist API',
      version: '1.0',
    },
    servers: [
      {
        url: `${process.env.API_URL}/v1`,
      },
    ],
    tags: [
      {
        name: "users",
        description: "Create and list users",
      },
      {
        name: "todos",
        description: "Create and list todos",
      },
      {
        name: "groups",
        description: "Create and list groups",
      }
    ]
  },
  users,
  todos,
  groups,
);
