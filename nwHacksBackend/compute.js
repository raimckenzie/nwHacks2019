/**
 * Computations to run every five minutes
 */


var frequency = 15; //in seconds

const mysql = require("mysql");

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'rideshare',
});

//Recurring task at frequency.
setInterval(function() {
	console.log('Running...');

}, frequency * 10000);
