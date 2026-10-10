# Project Structure

This project follows a layered Express architecture. HTTP routes receive requests, middleware
handles cross-cutting concerns, controllers coordinate request handling, and services contain
application logic that works with repositories and Sequelize models.

## Repository layout

```text
.
├── .env.example
├── .sequelizerc
├── Dockerfile
├── Dockerfile.dev
├── README.md
├── biome.json
├── docker-compose.yml
├── migrations/
├── package.json
├── seeders/
├── src/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── respository/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── validations/
│   ├── app.ts
│   ├── Index.ts
│   └── server.ts
├── tsconfig.json
└── package-lock.json
```

## Root files

- `.env.example` - template for database, API, CORS, and MinIO environment variables.
- `.sequelizerc` - points Sequelize CLI to the TypeScript configuration, models, migrations, and
  seeders.
- `biome.json` - Biome formatter and linter configuration.
- `docker-compose.yml` - development services for the API and PostgreSQL.
- `Dockerfile` - production-oriented container image definition.
- `Dockerfile.dev` - development container image used by Docker Compose.
- `package.json` - dependency manifest and npm scripts.
- `package-lock.json` - locked npm dependency versions.
- `tsconfig.json` - TypeScript compiler configuration.

## Database directories

### `migrations/`

Sequelize schema changes that are applied in order. Current migrations create:

- `permissions`
- `roles`
- `role_permissions`
- `users`

Run them with `npm run migrate`.

### `seeders/`

Initial and demo data for permissions, roles, role-permission mappings, and the seeded admin user.
Run them with `npm run seed`.

## Application source

### `src/config/`

Runtime configuration and database initialization:

- `config.ts` - environment-based API, CORS, database, and MinIO settings.
- `db.ts` - Sequelize database connection.

### `src/constants/`

Shared constants such as application codes, HTTP status codes, logger contexts, and role values.

### `src/controllers/`

HTTP-facing controller classes. Controllers read validated request data, call services, and return
formatted responses. They should not contain reusable database or business rules.

### `src/middlewares/`

Express middleware for cross-cutting request behavior:

- authentication and optional authentication
- permission checks
- request validation
- authentication rate limiting
- file upload handling
- exception and not-found handling

### `src/models/`

Sequelize model definitions and associations for users, roles, permissions, and their join table.
`models/index.ts` creates the Sequelize instance, registers models, and initializes associations.

### `src/respository/`

Database access and query-building modules grouped by domain. The directory name is retained as
`respository` to match the existing project path.

Current domains include:

- `Users/`
- `Roles/`
- `Permissions/`

Repositories should keep database query details out of controllers and services.

### `src/routes/`

Express route definitions grouped by resource. `routes/index.ts` mounts these route groups under
the configured `/api/v1` base URI.

Current route groups include:

- `AuthRoutes.ts`
- `UsersRoutes.ts`
- `RolesRoutes.ts`
- `PermissionsRoutes.ts`
- `UploadRoutes.ts`

### `src/services/`

Application and business logic grouped by domain. Services coordinate repositories, models,
authentication, authorization, and file storage operations.

### `src/types/`

Shared TypeScript types and global Express request declarations, including the authenticated user
shape attached by authentication middleware.

### `src/utils/`

Reusable infrastructure helpers for errors, responses, JWT handling, logging, authorization,
MinIO, and base controller behavior.

### `src/validations/`

Zod schemas for request bodies, route parameters, and query values. The validation middleware uses
these schemas before requests reach controllers.

## Application entry points

### `src/app.ts`

Builds the Express application and registers JSON parsing, request tracing, CORS, Helmet, the
health check, API routes, and error handling.

### `src/server.ts`

Creates the HTTP server, authenticates the database connection, starts listening on `PORT`, and
handles graceful shutdown.

### `src/Index.ts`

The process entry point. Starts the server and registers handlers for termination, uncaught
exceptions, and unhandled promise rejections.

## Request flow

Typical authenticated API requests follow this path:

```text
Client
  -> src/server.ts
  -> src/app.ts
  -> src/routes/
  -> src/middlewares/
  -> src/controllers/
  -> src/services/
  -> src/respository/ or src/models/
  -> PostgreSQL / MinIO
```