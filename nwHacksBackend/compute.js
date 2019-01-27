/**
 * Computations to run every five minutes
 */

var frequency = 15; //in seconds
var radius = 300; //in metres

const mysql = require("mysql");
const settings = require("./settings");

const conn = mysql.createConnection(settings.CONN_INFO);

console.log("Running every "+frequency+" seconds...");

/**
 * Gets number of points within a radius of a central point.
 * @param  {int} radius 	Radius constant in metres
 * @param  {float} lon
 * @param  {float} lat
 * @return {int}			Number of requests
 */
function getCount(radius, lon, lat, callback) {
	//Constants
	const r_earth = 6.378e6; //Earth radius
	const dy = radius;
	const dx = radius;

	//Calculate bounds
	const lat_0 = lat - (dy / r_earth) * (180 / Math.PI);
	const lat_1 = lat + (dy / r_earth) * (180 / Math.PI);
	const lon_0 = lon - (dx / r_earth) * (180 / Math.PI) / Math.cos(lat * Math.PI/180);
	const lon_1 = lon + (dx / r_earth) * (180 / Math.PI) / Math.cos(lat * Math.PI/180);

	const q = `SELECT count(*) as count FROM requests WHERE
	startLocLon >= '${lon_0}' AND startLocLon <= '${lon_1}'
	AND startLocLat >= '${lat_0}' AND startLocLat <= '${lat_1}'`;

	console.log('Querying with bounds...');
	conn.query(q, (err, result) => {
		if (err) {
			console.log(err);
			return;
		}
		callback(result[0]['count']);
		return;
	});

}

/**
 * Called once all requests have been analyzed and assigned a count.
 * @param  {Array} rideRequests	Array of requested rides.
 * @return {[type]}              [description]
 */
function assignRides(rideRequests) {
	console.log('finished!');

	//Sort decreasing by count property
	rideRequests.sort(function(a, b) {
		return b['count'] - a['count'];
	});

	return;

}

//Recurring task at frequency.
//setInterval(function() {
	console.log("Running...");

	const q = `SELECT * FROM requests WHERE status = '1';`;

	console.log("Querying requests table...");
	conn.query(q, (err, result) => {
		if (err) {
			res.json({
				status: "ERROR",
				message: "Database error",
				payload: {},
			});
			return;
		}

		//Iterate over all requests.
		var x = 0;
		result.forEach(function(p) {
			getCount(radius, p['startLocLon'], p['startLocLat'], function(count){
				p['count'] = count;
				x++;
				if(x === result.length) {
					assignRides(result);
					return;
				}
			});
		});

		//console.log(result);
	});

//}, frequency * 1000);
