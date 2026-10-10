# Getting Started

This guide takes you from a fresh checkout to a running local API. Complete the steps in order:
install dependencies, configure services, create the database schema, seed initial access data, and
start the server.

## Requirements

- Node.js 24
- npm
- PostgreSQL
- MinIO, if you use the upload endpoint

Check your installed versions:

```bash
node --version
npm --version
psql --version
```

## Install dependencies

```bash
npm install
```

## Configure environment variables

Copy `.env.example` to `.env` and fill in the database credentials:

```bash
cp .env.example .env
```

```env
DB_NAME=node_boilerplate
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_DIALECT=postgres
DB_PORT=5432
PORT=8080
CORSURL=http://localhost:3000
```

MinIO settings are optional and default to a local MinIO instance:

```env
MINIO_USE_SSL=false
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=node-boilerplate
```

`DB_HOST` should normally be `localhost` for a locally installed PostgreSQL server. When the API
runs through Docker Compose, the Compose service overrides it to `db`; see the
[Docker Guide](docker.md).

`PORT` controls the HTTP port, `CORSURL` controls the allowed browser origin, and the `MINIO_*`
values configure object storage. Keep credentials and production secrets outside source control.

## Create the database

Create the database named by `DB_NAME` before running migrations. For the example configuration:

```bash
createdb -U postgres node_boilerplate
```

If the database already exists, continue to the migration step. If your PostgreSQL installation
uses a different user, host, or port, update `.env` and pass the matching options to `createdb`.

## Run migrations

```bash
npm run migrate
```

## Run seeders

```bash
npm run seed
```

The seeders create the initial permissions, the `admin` role, role-permission mappings, and an
admin user. The default seeded credentials are:

- Username: `admin`
- Email: `admin@example.com`
- Password: `Admin@12345`

Set `SEED_ADMIN_PASSWORD` before running the seeders to use a different password.

Seeders are intended for a new local database. If you need to rebuild local data, undo the seeders
and migrations before running them again; see [Scripts](scripts.md).

## Start the server

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

The API starts on the port from `PORT`, or falls back to `4000`.

## Health check

```http
GET http://localhost:8080/health
```

Expected response fields include `uptime`, `message`, and `timestamp`. The health endpoint does
not require authentication and is mounted outside `/api/v1`.

## First authenticated request

Register or use the seeded admin account, then send the returned access token as a bearer token to
an authenticated endpoint:

```http
Authorization: Bearer <access-token>
```

See the [API Reference](api.md) for endpoint paths and the [RBAC Guide](rbac.md) for permission
behavior.

## Quality checks

Run the type checker and linter:

```bash
npm run typecheck
npm run lint
```

Run a production-style local check before deployment:

```bash
npm run build
npm start
```

## Troubleshooting

- **Database connection refused:** confirm PostgreSQL is running, `DB_HOST` and `DB_PORT` are
  correct, and the database named by `DB_NAME` exists.
- **Migration authentication failed:** verify `DB_USER` and `DB_PASSWORD` in `.env`.
- **Port already in use:** change `PORT` to an available port and use that port in requests.
- **Upload fails:** start MinIO, verify the `MINIO_*` values, and ensure the request uses the
  `file` multipart field with a supported image type.
