const mysql = require('mysql');

const db = mysql.createConnection({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'yeonmovie'
});

module.exports = db;