/*
 * Sometimes, it might be a good idea to put all app configurations in a structured javascript
 * object rather than pointing at them indivually from 'process.env'. This file demonstrates such
 * configuration object.
 */

export default () => ({
    environment: process.env.NODE_ENV || 'development',
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    }
});