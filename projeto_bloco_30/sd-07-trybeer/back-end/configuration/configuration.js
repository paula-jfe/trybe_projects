require('dotenv').config();

// get the client
const mysql = require('mysql2/promise');

// create the connection to database
const connection = mysql.createPool({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  database: 'Trybeer',
});

module.exports = connection;
