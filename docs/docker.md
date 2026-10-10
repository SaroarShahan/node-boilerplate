# Docker Guide

## Configure environment variables

Copy `.env.example` to `.env` and set the database credentials. The Compose configuration
overrides `DB_HOST` to `db` and `DB_PORT` to `5432` for the API container.

The PostgreSQL database is exposed on host port `5432` by default. If that port is already in use,
change the host mapping in `docker-compose.yml`.

## Build and start the containers

```bash
docker compose up --build -d
```

This starts:

- `api`: the TypeScript Express application in development mode
- `db`: a PostgreSQL 18 database with a persistent named volume

The API is available at `http://localhost:8080`.

## Run migrations

```bash
docker compose exec api npm run migrate
```

## Seed demo data

```bash
docker compose exec api npm run seed
```

## View logs

```bash
docker compose logs -f api
```

## Stop the containers

```bash
docker compose down
```

To stop the containers and remove the PostgreSQL volume:

```bash
docker compose down -v
```

## Typical Docker flow

```bash
docker compose up --build -d
docker compose exec api npm run migrate
docker compose exec api npm run seed
docker compose logs -f api
```
