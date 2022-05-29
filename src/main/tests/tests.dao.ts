import { Request, Response } from "express";
import dotenv from 'dotenv';
import fs from 'fs';
import mysql from "mysql2";
import mysqlPromise from "mysql2/promise";

if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
} else {
    dotenv.config({ path: '.env.example' });
}

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

export const testsdao = {
    loadAll (req: Request, res: Response)  {
        let connection = mysql.createConnection({
            host : DB_HOST,
            user : DB_USER,
            password : DB_PASSWORD,
            port : Number(DB_PORT),
            database: DB_NAME
          });
          connection.connect();
          connection.query('SELECT * from tests LIMIT 10;', (err, rows, fields) => {
            if (err) throw err;
          
            console.log('The solution is: ', rows);
          });
          
          connection.end();
    },
    async loadAllSync (req: Request, res: Response) {
            let conn;
            try {
                conn = await mysqlPromise.createConnection({
                    host : DB_HOST,
                    user : DB_USER,
                    password : DB_PASSWORD,
                    port : Number(DB_PORT),
                    database: DB_NAME
                })
                const [rows, fields] = await conn.execute('SELECT * from tests LIMIT 10;');
                console.log('The solution is: ', rows);
                return rows;
            } catch (e) {
                console.log(e);
                return '';
            } finally {
                if (conn) {
                    try {conn.end();} catch(e) {console.log(e);}
                }
            }
    },
};


/*
import { promisify } from "util";
import mysql, { PoolConnection, Pool, QueryFunction } from "mysql2";
import Pool from "mysql2/typings/mysql/lib/Pool";

interface IPromisifiedPool extends Omit<Pool, 'query'> {
    query: QueryFunction | Function;
}

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;
const DB_CONNECTION_LIMIT = process.env.DB_CONNECTION_LIMIT;
const db: IPromisifiedPool = mysql.createPool({
    host: `${DB_HOST}`,
    port: DB_PORT,
    user: `${DB_USER}`,
    password: `${DB_PASSWORD}`,
    database: `${DB_NAME}`,
    connectionLimit: DB_CONNECTION_LIMIT,
    charset: 'utf8mb4'
});
async function conn(): Promise<PoolConnection> {
    return await new Promise((resolve, reject) => {
        d

    })
}
*/
