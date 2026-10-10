# RBAC Guide

## Overview

The application uses role-based access control with these core tables:

- `roles`
- `permissions`
- `role_permissions`
- `users.role_id`

A user has one role, and a role can have many permissions.

## Permission shape

Permissions are stored with:

- `name`
- `label`
- `module`

Example:

```json
{
  "id": 1,
  "name": "users.create",
  "label": "Create users",
  "module": "users"
}
```

The seeded permission names include:

- `permissions.create`
- `permissions.get`
- `permissions.update`
- `permissions.delete`
- `roles.create`
- `roles.get`
- `roles.update`
- `roles.delete`
- `users.create`
- `users.get`
- `users.update`
- `users.delete`

## Role shape

Roles are stored with:

- `id`
- `name`

Permissions are attached through the `role_permissions` join table.

## Authentication flow

Authenticated requests must include a bearer access token. The authentication middleware loads:

- the user
- the user's role
- the role's permissions

It then attaches the authenticated user's ID, username, email, role ID, role name, and permission
names to the request.

## Authorization

Protected routes use permission-based authorization middleware:

```ts
hasPermission('users.create');
hasPermission('roles.update');
hasPermission('permissions.delete');
```

The seeded `admin` role bypasses individual permission checks. Other roles must have the required
permission assigned through `role_permissions`.

## Seeded roles

- `admin`

## Notes

- Protected routes require an `Authorization: Bearer <access-token>` header.
- Request payloads and route parameters are validated with centralized Zod middleware.
- Security middleware includes `helmet` and configured `cors`.
- Authentication endpoints use rate limiting.
- Request tracing is enabled with `cls-rtracer`.
- Controllers delegate business logic to service modules under `src/services`.
- Pre-commit checks are enforced by Husky and lint-staged with Biome.
