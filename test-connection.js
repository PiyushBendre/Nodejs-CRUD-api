// Quick database connection test
const sql = require('mssql');
require('dotenv').config({ path: './config.env' });

const config = {
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_DATABASE || 'crud_api_db',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'piyush@2004',
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
    }
};

async function testConnection() {
    try {
        console.log('🔍 Testing database connection...');
        console.log('Config:', {
            server: config.server,
            database: config.database,
            user: config.user,
            port: config.port
        });
        
        const pool = await sql.connect(config);
        console.log('✅ Database connection successful!');
        
        // Test creating database if it doesn't exist
        await pool.request().query(`
            IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'crud_api_db')
            CREATE DATABASE crud_api_db
        `);
        console.log('✅ Database crud_api_db created or already exists');
        
        await pool.close();
        console.log('🎉 All tests passed! Your database is ready.');
        
    } catch (error) {
        console.log('❌ Database connection failed:');
        console.log('Error:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Make sure SQL Server is running');
        console.log('2. Check if TCP/IP protocol is enabled');
        console.log('3. Verify your password is correct');
        console.log('4. Try using Docker: docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=piyu@2004" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest');
    }
}

testConnection();

