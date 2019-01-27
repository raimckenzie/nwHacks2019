class Position {
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
        start: new Position(startLatAvg, startLonAvg),
        end: new Position(endLatAvg, endLonAvg),
    };
}

module.exports = {
    Position,
    shortest_path,
}