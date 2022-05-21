import dotenv from 'dotenv';
dotenv.config({ path: '.env.example' });
const { DB_NAME, DB_PASSWORD, DB_USERNAME, DB_HOST, DB_PORT = 33069 } = process.env;
module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        port: +DB_PORT,
        dialect: 'mysql',
        logging: true
    },
};
