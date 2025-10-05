const sql = require('mssql');
require('dotenv').config({ path: './config.env' });

const config = {
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_DATABASE || 'crud_api_db',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

let pool;

const connectDB = async () => {
    try {
        if (pool) {
            return pool;
        }
        
        pool = await sql.connect(config);
        console.log('Connected to Microsoft SQL Server');
        
        // Create users table if it doesn't exist
        await createUsersTable();
        
        return pool;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

const createUsersTable = async () => {
    try {
        const createTableQuery = `
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
            CREATE TABLE users (
                id INT IDENTITY(1,1) PRIMARY KEY,
                name NVARCHAR(255) NOT NULL,
                email NVARCHAR(255) UNIQUE NOT NULL,
                created_at DATETIME2 DEFAULT GETDATE()
            )
        `;
        
        await pool.request().query(createTableQuery);
        console.log('Users table created or already exists');
    } catch (error) {
        console.error('Error creating users table:', error.message);
    }
};

const getPool = () => {
    if (!pool) {
        throw new Error('Database not connected. Call connectDB() first.');
    }
    return pool;
};

const closeDB = async () => {
    try {
        if (pool) {
            await pool.close();
            pool = null;
            console.log('Database connection closed');
        }
    } catch (error) {
        console.error('Error closing database connection:', error.message);
    }
};

module.exports = {
    connectDB,
    getPool,
    closeDB,
    sql
};
