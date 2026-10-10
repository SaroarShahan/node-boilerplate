# API Reference

This guide lists the currently implemented HTTP endpoints. Unless noted otherwise, combine the
base URL with the route path:

```text
http://localhost:8080/api/v1
```

The health check is the only route outside this base path:

```text
http://localhost:8080/health
```

## Request conventions

JSON requests must send:

```http
Content-Type: application/json
```

Protected endpoints use a bearer token:

```http
Authorization: Bearer <access-token>
```

Request bodies, route parameters, and supported query values are validated with Zod. Invalid
requests are rejected before reaching the controller. List endpoints support pagination through the
validated `page` and `limit` query values; users, permissions, and roles also support their
resource-specific filters.

## Auth

- `POST /auth/register` (rate limited)
- `POST /auth/login` (rate limited)

Registration body:

```json
{
  "username": "new-user",
  "email": "user@example.com",
  "password": "at-least-8-characters",
  "gender": "other",
  "roleId": 1
}
```

The accepted `gender` values are `male`, `female`, and `other`. Login accepts `email` and
`password`. Authentication endpoints are rate limited to protect against repeated attempts.

The login response contains the access token used for protected requests. Keep that token private
and never commit it to source control.

## Users

- `GET /users` (optional authentication)
- `POST /users` (authenticated, requires `users.create`)
- `GET /users/:id` (optional authentication)
- `PATCH /users/:id` (authenticated, requires `users.update`)
- `DELETE /users/:id` (authenticated, requires `users.delete`)

Users list query values include `page`, `limit`, and optional `status` (`active`, `inactive`, or
`blocked`).

Create and update user bodies use fields such as `firstName`, `lastName`, `userName`, `gender`,
`email`, `password`, `status`, and `roleId`. Update requests may send a subset of those fields.

## Roles

- `GET /roles` (optional authentication)
- `POST /roles` (authenticated, requires `roles.create`)
- `GET /roles/:id` (optional authentication)
- `PATCH /roles/:id` (authenticated, requires `roles.update`)
- `DELETE /roles/:id` (authenticated, requires `roles.delete`)

Role creation requires a `name` and at least one permission ID:

```json
{
  "name": "editor",
  "permissions": [1, 2]
}
```

Role lists support `page`, `limit`, and an optional `search` query value.

## Permissions

- `GET /permissions` (optional authentication)
- `POST /permissions` (authenticated, requires `permissions.create`)
- `GET /permissions/:id` (optional authentication)
- `PATCH /permissions/:id` (authenticated, requires `permissions.update`)
- `DELETE /permissions/:id` (authenticated, requires `permissions.delete`)

Create permission body:

```json
{
  "name": "reports.get",
  "label": "View reports",
  "module": "reports"
}
```

Permission lists support `page`, `limit`, and optional `module` and `search` query values.

## Uploads

- `POST /uploads` (authenticated, requires `uploads.create`)

Send the file as multipart form data using the `file` field:

```bash
curl -X POST http://localhost:8080/api/v1/uploads \
  -H "Authorization: Bearer <access-token>" \
  -F "file=@./image.png"
```

Uploaded files are stored in the configured MinIO bucket. Accepted image types are JPEG, PNG, GIF,
WEBP, and SVG. The maximum file size is 5 MB.

## Health check

- `GET /health`

The health endpoint is not under `/api/v1` and returns the process uptime, an `OK` message, and a
timestamp.

## Common status codes

- `200` - successful read or update
- `201` - successful creation
- `400` - invalid request or validation failure
- `401` - missing or invalid access token
- `403` - authenticated user lacks the required permission
- `404` - route or resource not found
- `429` - authentication rate limit exceeded
- `500` - unexpected server error

Error responses include an application error code, message, HTTP status, and request ID when
provided by the error handling middleware.
