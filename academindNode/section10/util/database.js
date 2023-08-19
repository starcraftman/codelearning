const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'bot',
    password: 'bottest',
    database: 'nodecomplete',
    port: 3306,
})

module.exports = pool.promise();