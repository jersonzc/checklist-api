## Checklist API

### Play
```sh
docker-compose up --build
```
The Swagger documentation is located at [http://localhost:{{PORT}}/api/v1/docs/](http://localhost:{{PORT}}/api/v1/docs/)

### Install
Copy the `.env.example` file to `.env` to set up environment variables.
```sh
cp .env.example .env
pnpm install
npx prisma db push
```

### Development

```sh
pnpm run dev
```

### Build & Start

```sh
pnpm run build
```

```sh
pnpm run start
```

### Lint

```sh
pnpm run lint
```
