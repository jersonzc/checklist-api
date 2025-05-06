## Checklist API

### Play

```sh
docker-compose up --build
```

The Swagger documentation is located at [http://localhost:3001/api/v1/docs/](http://localhost:3001/api/v1/docs/)

### Develop

#### Install

Copy the `.env.example` file to `.env` to set up environment variables.

```sh
cp .env.example .env
pnpm install
npx prisma db push
```

#### Run

```sh
pnpm run dev
```

#### Build & Start

```sh
pnpm run build
```

```sh
pnpm run start
```

#### Lint

```sh
pnpm run lint
```

### Inspirations

Part of this code is inspired by the classes taught by [Gustavo Morales](https://github.com/gmoralesc)
and his excellent book [API with Node.js, Express and Prisma](https://leanpub.com/api-with-nodejs-express-and-prisma).

### Contributions

Thank you for considering contributing to this project. It's awesome of you!
