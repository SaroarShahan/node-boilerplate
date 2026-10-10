# Scripts

Run commands from the repository root. npm automatically uses the scripts in `package.json`.
Commands that modify the database should be run only after the database connection values in
`.env` are configured. See [Getting Started](getting-started.md) for the recommended order.

## Development

Start the development server:

```bash
npm run dev
```

The development command runs `tsx watch`, so TypeScript changes restart the API automatically.

Build the application:

```bash
npm run build
```

The compiled output is written to `dist/`. The production start command runs the compiled
application and should be used only after a successful build.

Start the production server:

```bash
npm start
```

Run the type checker:

```bash
npm run typecheck
```

Run the linter:

```bash
npm run lint
```

Format the project:

```bash
npm run format
```

Biome formats the repository in place. Review the resulting changes before committing.

## Sequelize Commands

Sequelize CLI uses `.sequelizerc` to load the TypeScript configuration and locate the models,
migrations, and seeders.

Run migrations:

```bash
npm run migrate
```

Undo the latest migration:

```bash
npm run migrate:undo
```

Undo all migrations:

```bash
npm run migrate:undo:all
```

This reverts every applied migration. Use it only when intentionally rebuilding the local schema.

Generate a migration:

```bash
npm run migration:gen -- create-users
```

Generate a model:

```bash
npm run model:gen -- User --attributes name:string,email:string
```

## Seeder Commands

Run seeders:

```bash
npm run seed
```

Seeders create the initial RBAC data and admin user. Set `SEED_ADMIN_PASSWORD` before running
`npm run seed` when you do not want the default local password.

Undo the latest seeder:

```bash
npm run seed:undo
```

Undo all seeders:

```bash
npm run seed:undo:all
```

## Recommended first-run sequence

```bash
npm install
cp .env.example .env
npm run migrate
npm run seed
npm run dev
```

For a clean local rebuild:

```bash
npm run seed:undo:all
npm run migrate:undo:all
npm run migrate
npm run seed
```

## Command summary

```bash
npm run dev
npm start
npm run build
npm run typecheck
npm run lint
npm run format
npm run migrate
npm run migrate:undo
npm run migrate:undo:all
npm run seed
npm run seed:undo
npm run seed:undo:all
```
