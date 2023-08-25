// dbHelper.ts
import mysql, {ConnectionOptions} from 'mysql2/promise';


const connectionOptions: ConnectionOptions = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    }

const SQLQuery = async (sql: string, params?: any[]) => {

    const connection = await mysql.createConnection(connectionOptions)

    try {
        const results = await connection.query(sql, params);
        return results;
    } finally {
        await connection.end();
    }
}

const getConnection = async () => {
    return await mysql.createConnection(connectionOptions)
}

export {SQLQuery, getConnection}

