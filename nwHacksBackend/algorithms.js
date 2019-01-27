class Location {
	constructor (lat, lon) {
		this.lat = lat;
		this.lon = lon;
	}
}

/**
 * Finds the shortest path between a cluster of start locations
 * and a cluster of end locations
 *
 * @param {Array.<Location>} startLocs
 * @param {Array.<Location>} endLocs
 *
 * @returns {Object{start<Location>, end<Location>}}
 */
function shortest_path(startLocs, endLocs) {
	const startLats = startLocs.map(loc => loc.lat);
	const startLons = startLocs.map(loc => loc.lon);

	const endLats = endLocs.map(loc => loc.lat);
	const endLons = endLocs.map(loc => loc.lon);

	const startLatAvg = startLats.reduce((total, next) => total + next) / startLats.length;
	const startLonAvg = startLons.reduce((total, next) => total + next) / startLons.length;

	const endLatAvg = endLats.reduce((total, next) => total + next) / endLats.length;
	const endLonAvg = endLons.reduce((total, next) => total + next) / endLons.length;

	return {
		start: new Location(startLatAvg, startLonAvg),
		end: new Location(endLatAvg, endLonAvg),
	};
}

/**
 * Finds the midpoint
 *
 * @param {Array.<Location>} locs
 *
 * @returns {midpoint<Location>,}
 */
function shortest_path(locs) {
	const startLats = locs.map(loc => loc.lat);
	const startLons = locs.map(loc => loc.lon);

	const latAvg = lats.reduce((total, next) => total + next) / lats.length;
	const lonAvg = lons.reduce((total, next) => total + next) / lons.length;

	return new Location(latAvg, lonAvg);
}

module.exports = {
	Location,
	shortest_path,
	midpoint,
};
