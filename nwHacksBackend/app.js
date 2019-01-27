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
 * 		username(string)
 */
app.get("/api/signin", (req, res, next) => {
	var param = req.query;

	if (!('username' in param)) {
		res.json({
			status: 'ERROR',
			message: 'No username specified.',
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
