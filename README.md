# node-boilerplate

Node.js REST API boilerplate built with TypeScript, Express, Sequelize, and PostgreSQL.

## Stack

- Node.js 24
- TypeScript
- Express
- Sequelize
- PostgreSQL
- JWT authentication via `jose`
- Password hashing with `bcrypt`
- Zod request validation
- Biome formatting and linting
- MinIO object storage for uploads

## Features

- User registration and login
- JWT-protected routes
- Role-based access control with roles and permissions
- Centralized request validation with Zod
- Baseline API hardening with Helmet and CORS
- Rate limiting for authentication endpoints
- Request tracing and structured error handling
- User, role, and permission management
- File upload support with MinIO
- Sequelize migrations and seeders
- Docker Compose development environment
- Health check endpoint

## Docs

- [Getting Started](docs/getting-started.md)
- [Docker Guide](docs/docker.md)
- [API Reference](docs/api.md)
- [RBAC Guide](docs/rbac.md)
- [Scripts](docs/scripts.md)
- [Project Structure](docs/project-structure.md)

## Quick Start

### Install dependencies

```bash
npm install
```

### Configure environment variables

Copy `.env.example` to `.env` and update the database and storage values for your environment:

```bash
cp .env.example .env
```

The default PostgreSQL settings are:

```env
DB_NAME=node_boilerplate
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_DIALECT=postgres
DB_PORT=5432
PORT=8080
CORSURL=http://localhost:3000
```

## License

MIT
