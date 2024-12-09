require('dotenv').config(); // Cargar las variables de entorno desde .env

module.exports = {
    development: {
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || 'recuperatorio',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432
    },
    test: {
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME_TEST || 'database_test',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432
    }
};
