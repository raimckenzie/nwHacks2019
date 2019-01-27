/**
* Backend app.js
*
**/

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const settings = require("./settings");
const app = express();

const Status = Object.freeze({
	COMPLETED: 0,
	WAITING: 1,
	INPROGRESS: 2,
	DELETED: 3,
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.listen(settings.PORT, () => {
	console.log("Server running on port " + settings.PORT);
});

/**
 * Initial signon request
 * Requires:
 * 	username(string)
 */
app.post("/api/signin", (req, res, next) => {
	var param = req.body;

	console.log(JSON.stringify(param, null, 3));

	if (!("username" in param)) {
		res.json({
			status: "ERROR",
			message: "Insufficient parameters provided.",
			payload: {},
		});
		return;
	}

	/*
	TODO: Enter username into database, return userID.
	 */

	const userID = 1234;

	res.json({
		status: "OK",
		message: "All good",
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
 * 	loc.lon(float)
 * 	loc.lat(float)
 */
app.post("/api/getRequests", (req, res, next) => {
	var param = req.body;

	console.log(JSON.stringify(param, null, 3));

	if (!("radius" in param)|| !("loc" in param)) {
		res.json({
			status: "ERROR",
			message: "Insufficient parameters provided.",
			payload: {},
		});
		return;
	}

	const loc = param.loc;
	if (!("lon" in loc)|| !("lat" in loc)) {
		res.json({
			status: "ERROR",
			message: "Insufficient parameters provided!",
			payload: {},
		});
		return;
	}

	const r_earth = 6.378e6; //Earth radius
	const dy = param.radius;
	const dx = param.radius;

	const lat_0 = loc.lat - (dy / r_earth) * (180 / Math.PI);
	const lat_1 = loc.lat + (dy / r_earth) * (180 / Math.PI);
	const lon_0 = loc.lon - (dx / r_earth) * (180 / Math.PI) / Math.cos(loc.lat * Math.PI/180);
	const lon_1 = loc.lon + (dx / r_earth) * (180 / Math.PI) / Math.cos(loc.lat * Math.PI/180);

	const conn = mysql.createConnection(settings.CONN_INFO);
	let requestResult = [];

	conn.connect((err) => {
		if (err) {
			console.log(err);
			res.json({
				status: "ERROR",
				message: "Database error",
				payload: {},
			});
			conn.end();
			return;
		}

		const getRequest = `SELECT * FROM requests WHERE 
		startLocLon > ${lon_0} AND startLocLon < ${lon_1}
		AND startLocLat > ${lat_0} AND startLocLat < ${lat_1}`;
		
		conn.query(getRequest, (err, result) => {
			if (err) {
				console.log(err);
				res.json({
					status: "ERROR",
					message: "Database error",
					payload: {},
				});
				conn.end();
				return;
			}
			requestResult = result;
		});

		conn.end();
	});

	res.json({
		status: "OK",
		message: "All good",
		payload: {
			requestResult,
		},
	});
	return;
});

/**
 * Submits a request to join or create a new ride
 * Requires:
 * 	startLoc.lon(float)
 *  startLoc.lat(float)
 * 	endLoc.lon(float)
 *  endLoc.lat(float)
 * 	expires(int) (min)
 */
app.post("/api/requestRide", (req, res, next) => {
	const param = req.body;

	if (!("startLoc" in param) || !("endLoc" in param) || !("expires" in param)) {
		res.json({
			status: "ERROR",
			message: "Insufficient parameters provided.",
			payload: {},
		});
		return;
	}

	const startLoc = param.startLoc;
	const endLoc = param.startLoc;
	if (!("lon" in startLoc) || !("lat" in startLoc) ||
		!("lon" in endLoc) || !("lat" in endLoc)) {
		res.json({
			status: "ERROR",
			message: "Insufficient parameters provided!",
			payload: {},
		});
		return;
	}

	const conn = mysql.createConnection(settings.CONN_INFO);

	conn.connect((err) => {
		if (err) {
			console.log(err);
			res.json({
				status: "ERROR",
				message: "Database error",
				payload: {},
			});
			//conn.end();
			return;
		}

		const requestRide = `INSERT INTO requests 
		(created_at, startLocLon, startLocLat, endLocLon, endLocLat, expire_at, status) VALUES
		(${conn.escape(new Date())}, ${startLoc.lon}, ${startLoc.lat}, ${endLoc.lon}, ${endLoc.lat},
		 ${conn.escape(new Date(Date.now() + param.expires * 60e3))}, ${Status.WAITING})`;

		conn.query(requestRide, (err) => {
			if (err) {
				console.log(err);
				res.json({
					status: "ERROR",
					message: "Database error",
					payload: {},
				});
				//conn.end();
				return;
			}
		});

		res.json({
			status: "OK",
			message: "All good",
			payload: {},
		});

		conn.end();
	});
});