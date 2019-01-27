/**
* Backend app.js
*
**/

var express = require("express");
var bodyParser = require('body-parser')
var app = express();

const mysql = require("mysql");

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'rideshare',
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

var port = 8080; //Port to run webserver on.

app.listen(port, () => {
	console.log("Server running on port "+port);
});

/**
 * Initial signon request
 * Requires:
 * 	username(string)
 */
app.post("/api/signin", (req, res, next) => {
	var param = req.body;

	console.log(JSON.stringify(param, null, 3));

	if (!('username' in param)) {
		res.json({
			status: 'ERROR',
			message: 'Insufficient parameters provided.',
			payload: {},
		});
		return;
	}

	const q = `SELECT * FROM users WHERE username = '${param.username}';`;

	console.log('Querying users table...');
    conn.query(q, (err, result) => {
        if (err) {
            throw err;
			res.json({
				status: 'ERROR',
				message: 'Database error',
				payload: {},
			});
			return;
        }
		
		//Check if user already exists by username
		if (result.length == 0) {
			const q = `INSERT INTO users (username, rating) VALUES ('${param.username}', 8);`;

			console.log('Creating new user...');
		    conn.query(q, (err, result) => {
				if (err) {
		            throw err;
					res.json({
						status: 'ERROR',
						message: 'Database error',
						payload: {},
					});
					return;
		        }

				//Get new inserted user id.
				const q = `SELECT LAST_INSERT_ID();`;

			    conn.query(q, (err, result) => {
					if (err) {
			            throw err;
						res.json({
							status: 'ERROR',
							message: 'Database error',
							payload: {},
						});
						return;
			        }

					res.json({
						status: 'OK',
						message: 'All good',
						payload: {
							username: param.username,
							userID: result[0]['LAST_INSERT_ID()']
						},
					});

				});
			});

		} else {
			res.json({
				status: 'OK',
				message: 'All good',
				payload: {
					username: result[0].username,
					userID: result[0].id,
				},
			});

		}
    });

	return;
});

/**
 * Retrive existing requests nearby
 * Requires:
 * 	radius(int)
 * 	location.lon(float)
 * 	location.lat(float)
 */
app.post("/api/getRequests", (req, res, next) => {
	var param = req.body;

	console.log(JSON.stringify(param, null, 3));

	if (!('radius' in param)|| !('loc' in param)) {
		res.json({
			status: 'ERROR',
			message: 'Insufficient parameters provided.',
			payload: {},
		});
		return;
	}

	var loc = param.loc;
	if (!('lon' in loc)|| !('lat' in loc)) {
		res.json({
			status: 'ERROR',
			message: 'Insufficient parameters provided!',
			payload: {},
		});
		return;
	}

	const r_earth = 6378 * 1000; //Earth radius
	const dy = dx = param.radius;
	console.log(loc.lat, dy, r_earth, Math.PI);
	var lat_0 = loc.lat - (dy / r_earth) * (180 / Math.PI);
	var lat_1 = loc.lat + (dy / r_earth) * (180 / Math.PI);
	var lon_0 = loc.lon - (dx / r_earth) * (180 / Math.PI) / Math.cos(loc.lat * Math.PI/180);
	var lon_1 = loc.lon + (dx / r_earth) * (180 / Math.PI) / Math.cos(loc.lat * Math.PI/180);

	//SELECT * FROM requests WHERE startLocLon > lon_0 AND startLocLon < lon_1 AND startLocLat > lat_0 AND startLocLat < lat_1;

	console.log('Original lat:', loc.lat);
	console.log('New lat:', lat_0, lat_1);

	/*
	TODO: Query db, return valid requests.
	 */

	var requests = [];

	/*
	TODO: Return array of requests.
	 */

	 res.json({
 		status: 'OK',
 		message: 'All good',
		payload: {
			requests: requests,
		},
 	});
	return;
});
