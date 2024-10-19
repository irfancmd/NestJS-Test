/**
 * This file is not used currently. But may come in handy for migrations.
 * TypeORM migrations only work with COMPILED FILES. So, we have to build the project
 * before creating/running migrations. Now, since migration JS files are TypeORM
 * specific and outside NestJS ecosystem, they can't have features like dependency
 * injecton. So, we can put necessary databse info for them in a file like this if necessary.
 * 
 * TypeORM allows us to create empty migration files that we can populate manually with our scripts.
 * These CAN BE CREATED before compiling the project.
 * 
 * Check the Readme.md file for migration commands.
 * 
 * Why use migration?
 * Ans: Because as said before we MUST SET 'synchronize' to false in TypeORM config in PRODUCTION,
 * since syncrhonization will cause loss of data as it will delete entire column alonsgside data if
 * we attempt to change the column name (It removes the old and creates a new column). So, to avoid
 * such scenario, we can use migratoins to automatically and safely apply database changes.
 */
module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    usename: 'postgres',
    password: 'toor',
    databse: 'test_nestjs',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/task/migrations/*.js'],
    cli: {
        migrationsDir: 'src/migrations'
    }
}