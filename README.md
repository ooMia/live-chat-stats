## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
pnpm install
```

## Development

```bash
# run server: watch mode as default
pnpm run start

# debug & type-check
pnpm run start:debug

# build and run in production mode without docker
pnpm run start:prod
```

### Testing

```bash
# unit tests
pnpm run test

# watch mode
pnpm run test:watch

# test coverage
pnpm run test:cov

# debug mode
pnpm run test:debug

# e2e tests
pnpm run test:e2e
```

## Maintenance

```bash
# eslint linting
pnpm run lint

# prettier formatting
pnpm run format
```

### Git Commands

```bash
# undo last commit
pnpm run git:undo

# hard reset on origin
pnpm run git:reset:origin
```

### Docker Commands

```bash
# start dependencies on docker
pnpm run docker:start:deps

pnpm run docker:build

pnpm run docker:status

pnpm run docker:down

pnpm run docker:reset
```

### Deployment
