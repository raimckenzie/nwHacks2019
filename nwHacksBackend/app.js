/**
* Backend app.js
*
**/

var express = require("express");
var app = express();
var port = 8080; //Port to run webserver on.

app.listen(port, () => {
	console.log("Server running on port "+port);
});

/**
 * Initial signon request
 * Requires:
 * 	username(string)
 */
app.get("/api/signin", (req, res, next) => {
	var param = req.query;

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
app.get("/api/getRequests", (req, res, next) => {
	var param = req.query;

	if (!('radius' in param)|| !('location' in param)) {
		res.json({
			status: 'ERROR',
			message: 'Insufficient parameters provided.',
			payload: {},
		});
		return;
	}

	var loc = parma.location;
	if (!('lon' in loc)|| !('lat' in loc)) {
		res.json({
			status: 'ERROR',
			message: 'Insufficient parameters provided.',
			payload: {},
		});
		return;
	}

	const r_earth = 6378 * 1000; //Earth radius
	const dy = dx = param.radius;
	var lat_0  = loc.lat - (dy / r_earth) * (180 / Math.pi());
	var lat_1  = loc.lat + (dy / r_earth) * (180 / Math.pi());
	var new_lon_0 = loc.lon - (dx / r_earth) * (180 / Math.pi()) / cos(loc.lat * Math.pi()/180);
	var new_lon_1 = loc.lon + (dx / r_earth) * (180 / Math.pi()) / cos(loc.lat * Math.pi()/180);

	//SELECT * FROM requests WHERE startLocLon > lon_0 AND startLocLon < lon_1 AND startLocLat > lat_0 AND startLocLat < lat_1;

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
