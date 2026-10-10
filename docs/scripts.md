# Scripts

## Development

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

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

## Sequelize Commands

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

Undo the latest seeder:

```bash
npm run seed:undo
```

Undo all seeders:

```bash
npm run seed:undo:all
```

## Command Summary

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