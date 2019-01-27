/**
* Backend app.js
*
**/

var express = require("express");
var bodyParser = require('body-parser')
var app = express();

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

	/*
	TODO: Enter username into database, return userID.
	 */

	var userID = 1234;

	 res.json({
 		status: 'OK',
 		message: 'All good',
		payload: {
			userID: userID,
		},
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
