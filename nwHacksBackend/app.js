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

	/*
	TODO: Calculate max/min border for db search query of location.
	 */

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
