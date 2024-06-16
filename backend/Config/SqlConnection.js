import mysql from 'mysql2';

const config = {
    host: 'sid-sql.mysql.database.azure.com',
    user: 'Master01',
    password: 'Password123!',
    database: 'sid',
    port: 3306,
    ssl: {
      rejectUnauthorized: false
    },
    connectTimeout: 10000 // Timeout in milliseconds
};


const  connection = mysql.createConnection(config);

export default connection;

