const mysql = require('mysql')
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "samplemydb"
});

module.exports = {con};