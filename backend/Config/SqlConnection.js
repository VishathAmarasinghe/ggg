import mysql from 'mysql2';


//db Configurations
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

//db connection establishment
const  connection = mysql.createConnection(config);

export default connection;

