const mysql = require('mysql2');

//DEV
module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'worker',
    port:3307
});

