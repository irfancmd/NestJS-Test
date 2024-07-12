# TypeORM Migration Commands

## Creates an empty migration file

`npx typeorm migration:create "<path-to-store-migration-files>/<migration-name>"`

## Generates migration codes automatically by looking at entities for changes

`npx typeorm migration:generate -d "<path-to-compiled-data-source-js-file>" "<path-to-store-migration-files>/<migration-name>"`

## Executes pending migrations

`npx typeorm migration:run -d "<path-to-compiled-data-source-js-file>"`

## Reverts the last executed migration

`npx typeorm migration:revert`

# More things worth looking into:

- Configuration factory using ConfigModule where realated configurations can be grouped
  into `.ts` files. (Acceptable for small applications).
- Configuration namespaces. (Useful for large applications).
