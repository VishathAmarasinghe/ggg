export const config = {
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
