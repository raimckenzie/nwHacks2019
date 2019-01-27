var Algorithms = require('../algorithms');
var { Position, shortest_path } = Algorithms;

describe("shortest_path", () => {
    test("one point", () => {
        const startLoc = new Position(49.123, -123.123);
        const endLoc = new Position(49.1124, -123.1242);

        const path = shortest_path([startLoc], [endLoc]);
        const shortest_path = shortest_path()

        expect(path).toEqual({
            start: startLoc,
            end: endLoc,
        });
    })

    test("two start points, one end point", () => {
        const startLoc1 = new Position(49.123, -123.123);
        const startLoc2 = new Position(49.127, -123.123);
        const startLocAvg = new Position(49.125, -123.123);
        const endLoc = new Position(49.1124, -123.1242);

        const path = shortest_path([startLoc1, startLoc2], [endLoc, endLoc]);

        expect(path).toEqual({
            start: startLocAvg,
            end: endLoc,
        });
    })

    test("one start point, three end points", () => {
        const startLoc = new Position(49.123, -123.123);
        const endLoc1 = new Position(49.265720, -123.260086);
        const endLoc2 = new Position(49.274142, -123.241771);
        const endLoc3 = new Position(49.255057, -123.236576);
        const endLocAvg = new Position(49.264973, -123.24614433333333);

        const path = shortest_path([startLoc], [endLoc1, endLoc2, endLoc3]);

        expect(path).toEqual({
            start: startLoc,
            end: endLocAvg,
        });
    })
});