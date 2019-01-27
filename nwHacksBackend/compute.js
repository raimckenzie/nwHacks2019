/**
 * Computations to run every five minutes
 *
 * Improvements to be made:
 * 	Currently a lot of sql queries are made - more than nessesary. Implement some sort of caching, to decrease the server queries.
 * 	Determine best radius multiplier - currently set to 2 - this was chosen arbitrarily for now.
 */

var frequency = 15; //in seconds
var radius = 300; //in metres
var riderMin = 2; //amount of rider requests to create a ride.

const mysql = require("mysql");
const settings = require("./settings");
const algorithms = require("./algorithms");

var time_start = 0;

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

	const q = `SELECT * FROM requests WHERE
	startLocLon >= '${lon_0}' AND startLocLon <= '${lon_1}'
	AND startLocLat >= '${lat_0}' AND startLocLat <= '${lat_1}' AND status = '1'`;

	conn.query(q, (err, result) => {
		if (err) {
			console.log(err);
			return;
		}

		//Add nested locations contained in the region to this location entry.
		callback(result.length, result);
		return;
	});

}

/**
 * Called once all requests have been analyzed and assigned a count.
 * @param  {Array} rideRequests	Array of requested rides.
 * @return {[type]}              [description]
 */
function assignRides(callback, rideRequests) {
	console.log('[1/2] Stage One Finished! Continue analysis...');

	//Sort decreasing by count property
	rideRequests.sort(function(a, b) {
		return b['count'] - a['count'];
	});

	//Analyze top point with most ride requests if contains more than threashold amount of children.
	if (rideRequests[0]['requests'].length >= riderMin) {

		//Get midpoint of all contained rides.
		newPoint = algorithms.midpoint(rideRequests[0]['requests'].slice(0,4), 'startLocLat', 'startLocLon');
		newPointEnd = algorithms.midpoint(rideRequests[0]['requests'].slice(0,4), 'endLocLat', 'endLocLon');

		if (newPoint) { //Skip if has no nested rides / no midpoint calculation was possible
			//Get ride requests at radius, r from the new midpoint calculated point.
			getCount(radius, newPoint.lat, newPoint.lon, function(count, results) {
				var requestIDs = results.map(a => a.id); //Ride request IDs that will be included in this "ride".
				var userIDs = results.map(a => a.user_id); //Get requests' user IDs.

				console.log('[2/2] Stage Two Finished! Create new ride...');
				console.log('---Create new Ride with IDs:', requestIDs.slice(0,4));

				if (requestIDs.length != 0) {
					var q = `UPDATE requests SET status = '2' WHERE id IN (`+requestIDs.slice(0,4).join()+`);`;
					console.log("Updating status of ride requests:", requestIDs.slice(0,4));
					conn.query(q, (err, result) => {
						if (err) {
							console.log(err);
							return;
						}

						//Define any empty seats.
						if (typeof requestIDs[1] === "undefined") {
							requestIDs[1] = '';
						}
						if (typeof requestIDs[2] === "undefined") {
							requestIDs[2] = '';
						}
						if (typeof requestIDs[3] === "undefined") {
							requestIDs[3] = '';
						}

						//Add new ride entry.
						const insert = `INSERT INTO rides (status, startLocLat, startLocLon, endLocLat, endLocLon, user_1, user_2, user_3, user_4) VALUES ('1', '${newPoint.lat}', '${newPoint.lon}', '${newPointEnd.lat}', '${newPointEnd.lon}', '${requestIDs[0]}', '${requestIDs[1]}', '${requestIDs[2]}', '${requestIDs[3]}');`;
						conn.query(insert, (err, result) => {
							if (err) {
								console.log(err);
								return;
							}
							console.log('Added ride!');


							//Return ride ID.
							const q = "SELECT LAST_INSERT_ID();";
							conn.query(q, (err, result) => {
								if (err) {
									res.json({
										status: "ERROR",
										message: "Database error",
										payload: {},
									});
									return;
								}

								var ride_id = result[0]["LAST_INSERT_ID()"];
								console.log(userIDs);
								//Update users ride ID.
								var q = `UPDATE users SET currentRideID = '${ride_id}' WHERE id IN (`+userIDs.slice(0,4).join()+`);`;
								console.log(q);
								conn.query(q, (err, result) => {
									if (err) {
										console.log(err);
										return;
									}
									console.log('Updated users');
									analyzeRequests(callback);
									return;
								});

							});

						});

					});
				}

			});
		} else {
			console.log('[2/2] Stage Two Finished! Not enough riders for another ride.');
			callback(); //Done all iterations.
			return;
		}
	} else {
		console.log('[2/2] Stage Two Finished! Not enough riders for another ride.');
		callback(); //Done all iterations.
		return;
	}

	return;

}

function analyzeRequests(callback) {
	console.log("Running...");

	var q = `SELECT * FROM requests WHERE status = '1';`;

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
		let x = 0;
		result.forEach(function(p) {
			getCount(radius*2, p['startLocLon'], p['startLocLat'], function(count, requests){ //Multiply radius by 2 for better results.
				p['count'] = count;
				p['requests'] = requests;
				x++;
				if(x === result.length) {
					assignRides(callback, result);
					return;
				}
			});
		});

	});
}

//Recurring task at frequency.
setInterval(function() {
	time_start = Date.now();
	analyzeRequests(function(){
		console.log('Computation complete. Took ' + (Date.now() - time_start) + ' ms.');
		console.log('');
		return;
	});
}, frequency * 1000);
