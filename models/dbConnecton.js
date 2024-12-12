const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lafdig'
});

module.exports = db; // Pastikan Anda mengekspor db