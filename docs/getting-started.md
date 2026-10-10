# Getting Started

## Requirements

- Node.js 24
- npm
- PostgreSQL
- MinIO, if you use the upload endpoint

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

## Quality checks

Run the type checker and linter:

```bash
npm run typecheck
npm run lint
```
