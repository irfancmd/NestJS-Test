import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  // This will sync Type ORM entities with database, which means it will generate
  // SQL table for all entity classes that are found. This is useful for
  // development. Make sure to TURN IT OFF during PRODUCTION.
  synchronize: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/task/migrations/*.js'],
  migrationsTableName: 'task_migrations',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
