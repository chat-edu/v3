import { Pool } from 'pg';

let pool: Pool;

export const getPool = () => {
    if (!pool) {
        pool = new Pool({
            max: 300,
            connectionTimeoutMillis: 5000,
            host: process.env.POSTGRES_HOST as string,
            port: 5432,
            user: process.env.POSTGRES_USER as string,
            password: process.env.POSTGRES_PASSWORD as string,
            database: process.env.POSTGRES_DB as string,
            ssl: true,
        });
    }
    return pool;
}
