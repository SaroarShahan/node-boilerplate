# Docker Guide

Docker Compose provides a reproducible development environment with the API and PostgreSQL. Use
this guide when you do not want to install PostgreSQL locally.

## Requirements

- Docker Engine with Compose support
- A free host port `8080` for the API
- A free host port `5432` for PostgreSQL

## Configure environment variables

Copy `.env.example` to `.env` and set the database credentials. The Compose configuration
overrides `DB_HOST` to `db` and `DB_PORT` to `5432` for the API container.

The PostgreSQL database is exposed on host port `5432` by default. If that port is already in use,
change the host mapping in `docker-compose.yml`.

The API container reads `.env`. The database container uses `DB_USER`, `DB_PASSWORD`, and `DB_NAME`
to initialize PostgreSQL, with fallback values defined in `docker-compose.yml`.

## Build and start the containers

```bash
docker compose up --build -d
```

This starts:

- `api`: the TypeScript Express application in development mode
- `db`: a PostgreSQL 18 database with a persistent named volume

The API is available at `http://localhost:8080`.

The first build may take a few minutes because dependencies are installed inside the image.

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

Check service status:

```bash
docker compose ps
```

## Stop the containers

```bash
docker compose down
```

To stop the containers and remove the PostgreSQL volume:

```bash
docker compose down -v
```

`docker compose down -v` permanently removes the local database data stored in the named volume.
Use it only when you intentionally want a clean database.

## Troubleshooting

- **Port already in use:** stop the process using port `8080` or `5432`, or change the
  corresponding host mapping in `docker-compose.yml`.
- **API cannot connect to PostgreSQL:** use `DB_HOST=db` only inside the Compose network; `localhost`
  refers to the API container itself.
- **Environment changes are ignored:** recreate the containers after changing `.env`:

  ```bash
  docker compose down
  docker compose up --build -d
  ```

- **Need a clean schema:** remove the volume with `docker compose down -v`, start the stack again,
  and rerun migrations and seeders.

## Typical Docker flow

```bash
docker compose up --build -d
docker compose exec api npm run migrate
docker compose exec api npm run seed
docker compose logs -f api
```
