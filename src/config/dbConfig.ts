import { createPool, Pool } from 'mysql2/promise';

export class DbConfig {
    private static instance:Pool;

    private constructor() {}

    public static getInstance():Pool{

        if(!DbConfig.instance){
            DbConfig.instance = createPool({
                host: process.env.DB_HOST || 'localhost',
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASS || '',
                database: process.env.DB_NAME || 'cafe',
                waitForConnections: true,
                connectionLimit: 5,
            });
            console.log(`MySQL connected at ${process.env.DB_HOST}.`);
        }

    return DbConfig.instance;

    }
}
