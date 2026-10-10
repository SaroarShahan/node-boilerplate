# API Reference

Base URL: `/api/v1`

Authentication uses a bearer token:

```http
Authorization: Bearer <access-token>
```

## Auth

- `POST /auth/register` (rate limited)
- `POST /auth/login` (rate limited)

Request payloads are validated with Zod. Registration and login fields are defined in
`src/validations/authValidation.ts`.

## Users

- `GET /users` (optional authentication)
- `POST /users` (authenticated, requires `users.create`)
- `GET /users/:id` (optional authentication)
- `PATCH /users/:id` (authenticated, requires `users.update`)
- `DELETE /users/:id` (authenticated, requires `users.delete`)

## Roles

- `GET /roles` (optional authentication)
- `POST /roles` (authenticated, requires `roles.create`)
- `GET /roles/:id` (optional authentication)
- `PATCH /roles/:id` (authenticated, requires `roles.update`)
- `DELETE /roles/:id` (authenticated, requires `roles.delete`)

## Permissions

- `GET /permissions` (optional authentication)
- `POST /permissions` (authenticated, requires `permissions.create`)
- `GET /permissions/:id` (optional authentication)
- `PATCH /permissions/:id` (authenticated, requires `permissions.update`)
- `DELETE /permissions/:id` (authenticated, requires `permissions.delete`)

## Uploads

- `POST /uploads` (authenticated, requires `uploads.create`)

Send the file as multipart form data using the `file` field:

```bash
curl -X POST http://localhost:8080/api/v1/uploads \
  -H "Authorization: Bearer <access-token>" \
  -F "file=@./image.png"
```

Uploaded files are stored in the configured MinIO bucket.

## Health check

- `GET /health`

The health endpoint is not under `/api/v1` and returns the process uptime, an `OK` message, and a
timestamp.
